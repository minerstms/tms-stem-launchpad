// ===================== functions/api/overview.js (TOP) =====================
// Cloudflare Pages Function: /api/overview
// Reads playlists config from /assets/playlists.json and expands it into
// { overviewMedia: [ { href, src, label, kind } ... ] }
//
// IMPORTANT: You MUST set a Cloudflare Pages Secret named YOUTUBE_API_KEY.
// (Settings → Variables → Add variable → Type: Secret)
//
// Optional: You may set PLAYLISTS_URL to override where playlists.json is loaded from.

const YT_API = "https://www.googleapis.com/youtube/v3";

// Simple in-memory cache for playlists.json inside the isolate
let _cfgCache = null;
let _cfgCacheAt = 0;

function json(obj, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(obj, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders
    }
  });
}

function cleanLabel(s) {
  s = (s || "").toString();
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

function bestThumb(t) {
  if (!t) return null;
  // Prefer maxres/high, then medium/default
  return (
    (t.maxres && t.maxres.url) ||
    (t.high && t.high.url) ||
    (t.medium && t.medium.url) ||
    (t.default && t.default.url) ||
    null
  );
}

async function yt(path, params, key) {
  const u = new URL(YT_API + path);
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    u.searchParams.set(k, String(v));
  });
  u.searchParams.set("key", key);

  const res = await fetch(u.toString(), { headers: { accept: "application/json" } });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`YouTube API ${res.status}: ${t.slice(0, 300)}`);
  }
  return res.json();
}

async function loadCfg(origin, env) {
  // Cache for 5 minutes
  const now = Date.now();
  if (_cfgCache && (now - _cfgCacheAt) < 5 * 60 * 1000) return _cfgCache;

  const url = env.PLAYLISTS_URL ? String(env.PLAYLISTS_URL) : `${origin}/assets/playlists.json`;
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`Failed to load playlists.json (${res.status})`);

  _cfgCache = await res.json();
  _cfgCacheAt = now;
  return _cfgCache;
}

async function build(projectKey, cfg, apiKey) {
  const projects = (cfg && cfg.projects) ? cfg.projects : {};
  const p = projects[projectKey] || { playlistIds: [] };

  const idsRaw = Array.isArray(p.playlistIds) ? p.playlistIds : [];
  const seen = new Set();
  const ids = [];
  for (const id of idsRaw) {
    if (!id) continue;
    if (seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }

  // Playlist tiles (playlist thumbnails + title)
  const playlistTiles = [];
  if (ids.length) {
    const meta = await yt("/playlists", { part: "snippet,contentDetails", id: ids.join(","), maxResults: 50 }, apiKey);
    const byId = new Map();
    (meta.items || []).forEach(it => byId.set(it.id, it));

    for (const id of ids) {
      const it = byId.get(id);
      if (!it || !it.snippet) continue;
      playlistTiles.push({
        kind: "playlist",
        href: `https://www.youtube.com/playlist?list=${id}`,
        src: bestThumb(it.snippet.thumbnails) || "/assets/youtube-thumb.svg",
        label: cleanLabel(it.snippet.title)
      });
    }
  }

  // Must-have video tiles (optional) — uses video IDs only
  const must = (cfg && cfg.mustVideos && cfg.mustVideos[projectKey]) ? cfg.mustVideos[projectKey] : [];
  const mustIds = Array.isArray(must) ? must.filter(Boolean) : [];
  const mustTiles = mustIds.map(vid => ({
    kind: "video",
    href: `https://youtu.be/${vid}`,
    src: `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
    label: ""
  }));

  // Globals playlist expanded as videos appended RIGHT-MOST
  const globalsId = (cfg && cfg.globalsPlaylistId) ? String(cfg.globalsPlaylistId) : "";
  const globalTiles = [];
  if (globalsId) {
    let pageToken = "";
    for (let guard = 0; guard < 5; guard++) {
      const data = await yt("/playlistItems", { part: "snippet,contentDetails", playlistId: globalsId, maxResults: 50, pageToken }, apiKey);
      for (const it of (data.items || [])) {
        const vid =
          (it && it.contentDetails && it.contentDetails.videoId) ||
          (it && it.snippet && it.snippet.resourceId && it.snippet.resourceId.videoId);
        if (!vid) continue;

        globalTiles.push({
          kind: "video",
          href: `https://youtu.be/${vid}`,
          src: bestThumb(it.snippet && it.snippet.thumbnails) || `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
          label: cleanLabel(it && it.snippet ? it.snippet.title : "")
        });
      }
      pageToken = data.nextPageToken || "";
      if (!pageToken) break;
    }
  }

  return { overviewMedia: [...playlistTiles, ...mustTiles, ...globalTiles] };
}

function normalizeProjectKey(q) {
  // Accept: "Digital Art" or "project-02" etc.
  const s = (q || "").toString().trim();
  if (!s) return "";
  // If already looks like a key, keep
  if (/^project-\d{2}$/i.test(s) || /^[a-z0-9-]+$/i.test(s) && s.includes("-")) {
    return s.toLowerCase();
  }
  // Convert title to slug
  return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const projectQ = (url.searchParams.get("project") || "").trim();
  if (!projectQ) return json({ error: "Missing ?project=" }, 400);

  const apiKey = env.YOUTUBE_API_KEY;
  if (!apiKey) return json({ error: "Missing YOUTUBE_API_KEY secret" }, 500);

  const origin = url.origin;
  try {
    const cfg = await loadCfg(origin, env);
    const projectKey = normalizeProjectKey(projectQ);

    const result = await build(projectKey, cfg, apiKey);
    return json(result, 200, {
      // Same-origin in normal use; allow cross-origin for debugging / testing if needed:
      "access-control-allow-origin": "*"
    });
  } catch (e) {
    return json({ error: String(e && e.message ? e.message : e) }, 500, {
      "access-control-allow-origin": "*"
    });
  }
}
// ===================== functions/api/overview.js (BOTTOM) =====================
