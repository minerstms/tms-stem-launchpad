// ============================================================
// Cloudflare Pages Advanced Mode Worker
// Provides: /api/overview?project=<key>
// Source of truth: /assets/playlists.json
// Fetch strategy: scrape https://www.youtube.com/playlist?list=... for videoIds
// NOTE: Use env.ASSETS.fetch for all local assets to avoid recursion (Error 1019).
// ============================================================

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);

      // CORS preflight
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: corsHeaders()
        });
      }

      if (url.pathname === "/api/overview") {
        return await handleOverview(url, env);
      }

      // Everything else: serve static site
      return env.ASSETS.fetch(request);
    } catch (err) {
      // Last-resort: never break the site
      return new Response("Worker error", { status: 500 });
    }
  }
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store"
  };
}

async function readJsonAsset(env, path) {
  const req = new Request("https://internal" + path);
  const res = await env.ASSETS.fetch(req, { cf: { cacheTtl: 0, cacheEverything: false } });
  if (!res.ok) throw new Error("Asset not found: " + path);
  return await res.json();
}

function uniqPush(arr, set, v) {
  if (!v) return;
  if (set.has(v)) return;
  set.add(v);
  arr.push(v);
}

async function fetchPlaylistVideoMeta(listId, limit = 24) {
  const ids = [];
  const titles = Object.create(null);
  const seen = new Set();
  const url = "https://www.youtube.com/playlist?list=" + encodeURIComponent(listId) + "&hl=en";

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; TMS-STEM-Launchpad/1.0; +https://pages.dev/)",
      "Accept-Language": "en-US,en;q=0.9"
    }
  });

  if (!res.ok) return { ids, titles };

  const html = await res.text();

  // Scrape video IDs + nearby titles from embedded JSON in the playlist page.
  // Regex pairs an id with the closest title text (works well enough for playlist pages).
  const re = /"videoId":"([a-zA-Z0-9_-]{11})"[\s\S]{0,350}?"title":\{"runs":\[\{"text":"([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const id = m[1];
    if (seen.has(id)) continue;

    seen.add(id);
    ids.push(id);

    // Decode JSON-escaped text (e.g., \u0026) safely
    const raw = m[2] || "";
    let title = raw;
    try { title = JSON.parse('"' + raw.replace(/"/g, '\\\"') + '"'); } catch (e) {}
    titles[id] = title;

    if (ids.length >= limit) break;
  }

  // Fallback: if we somehow got ids without titles, at least return ids
  if (!ids.length) {
    const re2 = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
    while ((m = re2.exec(html)) !== null) {
      const id = m[1];
      if (!seen.has(id)) {
        seen.add(id);
        ids.push(id);
        if (ids.length >= limit) break;
      }
    }
  }

  return { ids, titles };
}


async function fetchOembedTitle(videoId) {
  const url = "https://www.youtube.com/oembed?format=json&url=" + encodeURIComponent("https://www.youtube.com/watch?v=" + videoId);
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; TMS-STEM-Launchpad/1.0; +https://pages.dev/)",
      "Accept": "application/json"
    }
  });
  if (!res.ok) return "";
  try {
    const data = await res.json();
    return (data && data.title) ? String(data.title) : "";
  } catch (e) {
    return "";
  }
}

// Simple concurrency-limited async pool
async function asyncPool(limit, arr, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of arr) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    if (limit <= arr.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

async function handleOverview(url, env) {
  const project = (url.searchParams.get("project") || "").trim();
  if (!project) {
    return json({ ok: false, error: "Missing project" }, 400);
  }

  let cfg;
  try {
    cfg = await readJsonAsset(env, "/assets/playlists.json");
  } catch (e) {
    return json({ ok: false, project, error: "Missing playlists.json" }, 200);
  }

  const projCfg = (cfg.projects && cfg.projects[project]) ? cfg.projects[project] : null;
  const playlistIds = projCfg && Array.isArray(projCfg.playlistIds) ? projCfg.playlistIds.slice() : [];

  // Include globals playlist (appended last so global videos appear at right end)
  const globals = cfg.globalsPlaylistId ? [cfg.globalsPlaylistId] : [];

  // Always pin mustVideos to the very front
  const must = (cfg.mustVideos && Array.isArray(cfg.mustVideos[project])) ? cfg.mustVideos[project] : [];

  const ids = [];
  const seen = new Set();
  const titlesById = Object.create(null);

  // 1) Must videos first
  for (const v of must) uniqPush(ids, seen, String(v));

  // 2) Project playlists, then globals playlist (globals render last)
  const playlistOrder = playlistIds.concat(globals);

  // Pull in playlist videos until we have enough
  for (const listId of playlistOrder) {
    if (!listId) continue;
    const meta = await fetchPlaylistVideoMeta(listId, 30);
    const vids = meta.ids;
    Object.assign(titlesById, meta.titles);
    for (const vid of vids) {
      uniqPush(ids, seen, vid);
      if (ids.length >= 12) break;
    }
    if (ids.length >= 12) break;
  }


  // Fill any missing titles via YouTube oEmbed (no API key required)
  const missing = ids.filter(id => !titlesById[id]);
  if (missing.length) {
    await asyncPool(6, missing.slice(0, 24), async (id) => {
      const t = await fetchOembedTitle(id);
      if (t) titlesById[id] = t;
    });
  }

  // Build overviewMedia
  const overviewMedia = ids.slice(0, 12).map((id, idx) => {
    const pinned = must.includes(id);
    return {
      label: (titlesById[id] ? String(titlesById[id]) : (pinned ? ("Pinned Video " + (idx + 1)) : ("Video " + (idx + 1)))),
      href: "https://youtu.be/" + id,
      src: "https://img.youtube.com/vi/" + id + "/hqdefault.jpg",
      priority: pinned ? 1000 : (100 - idx),
      pinned: !!pinned
    };
  });

  return json({ ok: true, project, overviewMedia }, 200);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders()
    }
  });
}
