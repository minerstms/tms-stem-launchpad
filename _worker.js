// ===================== _worker.js (TOP) =====================
// Cloudflare Pages (Advanced Mode) Worker
// Purpose: Provide /api/overview?project=<project-key> endpoint that
// turns YouTube playlist IDs (from /assets/playlists.json) into
// Overview scroller media items WITHOUT needing a YouTube API key.
// Uses YouTube Atom feeds: https://www.youtube.com/feeds/videos.xml?playlist_id=...

const FEED_BASE = "https://www.youtube.com/feeds/videos.xml?playlist_id=";

// Lightweight XML extraction for YouTube feeds (good enough for Atom feed).
function parseFeed(xmlText, limit=16){
  const items = [];
  if (!xmlText) return items;

  // Split on <entry> blocks
  const entries = xmlText.split("<entry>").slice(1);
  for (const blockRaw of entries){
    if (items.length >= limit) break;
    const block = "<entry>" + blockRaw;

    const idMatch = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/i);
    if (!idMatch) continue;
    const videoId = idMatch[1].trim();

    // Title appears multiple places; pick the <title> inside entry
    const titleMatch = block.match(/<title>([^<]+)<\/title>/i);
    let title = titleMatch ? titleMatch[1] : "";
    title = title.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").trim();

    // Published (optional)
    const pubMatch = block.match(/<published>([^<]+)<\/published>/i);
    const published = pubMatch ? pubMatch[1].trim() : null;

    items.push({
      videoId,
      title,
      published
    });
  }
  return items;
}

function ytThumb(videoId){
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function ytWatch(videoId){
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function cleanLabel(s){
  s = String(s||"").trim();
  // Remove leading "1 - " / "Global - " patterns
  s = s.replace(/^\s*\d{1,2}\s*[-–—:]\s*/,"");
  s = s.replace(/^\s*global\s*[-–—:]\s*/i,"");
  s = s.replace(/\s+/g," ").trim();
  return s;
}

function jsonResponse(obj, status=200, headers={}){
  return new Response(JSON.stringify(obj,null,2), {
    status,
    headers: {
      "content-type":"application/json; charset=utf-8",
      "cache-control":"public, max-age=600",
      ...headers
    }
  });
}

async function fetchJson(url){
  const res = await fetch(url, { cf: { cacheTtl: 600, cacheEverything: true } });
  if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
  return await res.json();
}

async function fetchText(url){
  const res = await fetch(url, { cf: { cacheTtl: 600, cacheEverything: true } });
  if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
  return await res.text();
}

function uniqBy(arr, keyFn){
  const seen = new Set();
  const out = [];
  for (const x of (arr||[])){
    const k = keyFn(x);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(x);
  }
  return out;
}

function orderMustFirst(list, mustIds){
  if (!mustIds || !mustIds.length) return list;
  const mustSet = new Set(mustIds);
  const must = [];
  const rest = [];
  for (const it of list){
    if (mustSet.has(it.videoId)) must.push(it);
    else rest.push(it);
  }
  // Preserve mustIds order
  must.sort((a,b)=> mustIds.indexOf(a.videoId) - mustIds.indexOf(b.videoId));
  return [...must, ...rest];
}

export default {
  async fetch(request, env, ctx){
    try{
      const url = new URL(request.url);
      const path = url.pathname || "/";

      // Only handle our API route; let everything else pass through.
      if (!path.startsWith("/api/overview")){
        return fetch(request);
      }

      const project = (url.searchParams.get("project") || "").trim();
      if (!project){
        return jsonResponse({ ok:false, error:"Missing project" }, 400);
      }

      // Load playlists config from the same origin.
      const origin = url.origin;
      const cfgUrl = origin + "/assets/playlists.json?v=1";
      const cfg = await fetchJson(cfgUrl);

      const projects = (cfg && cfg.projects) || {};
      const globalsPlaylistId = cfg && cfg.globalsPlaylistId;
      const mustVideos = (cfg && cfg.mustVideos && cfg.mustVideos[project]) ? cfg.mustVideos[project] : [];

      const projCfg = projects[project] || {};
      const playlistId = projCfg.playlistId || projCfg.playlist || projCfg.id;

      // Collect feeds: project playlist first, then globals (optional)
      const feeds = [];
      if (playlistId) feeds.push({ kind:"project", playlistId });
      if (globalsPlaylistId) feeds.push({ kind:"global", playlistId: globalsPlaylistId });

      if (!feeds.length){
        return jsonResponse({ ok:true, project, overviewMedia: [] });
      }

      // Pull recent items from each feed
      let combined = [];
      for (const f of feeds){
        try{
          const xml = await fetchText(FEED_BASE + encodeURIComponent(f.playlistId));
          const items = parseFeed(xml, 20);
          // Tag source kind (optional)
          items.forEach(it => it.kind = f.kind);
          combined = combined.concat(items);
        }catch(e){
          // ignore single feed failure
        }
      }

      // De-dup by videoId, keep first appearance (project feed precedence)
      combined = uniqBy(combined, it => it.videoId);

      // Must videos pinned first (if present)
      combined = orderMustFirst(combined, mustVideos);

      // Map to overviewMedia schema expected by project-page.js
      const overviewMedia = combined.slice(0, 16).map((it, idx) => ({
        label: cleanLabel(it.title || "Video"),
        href: ytWatch(it.videoId),
        src: ytThumb(it.videoId),
        priority: (idx+1)
      }));

      return jsonResponse({ ok:true, project, overviewMedia });

    }catch(err){
      return jsonResponse({ ok:false, error:String(err && err.message ? err.message : err) }, 500);
    }
  }
};
// ===================== _worker.js (BOTTOM) =====================
