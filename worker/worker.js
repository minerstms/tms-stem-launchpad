const YT_API = 'https://www.googleapis.com/youtube/v3';

function json(obj, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(obj, null, 2), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=3600',
      ...extraHeaders
    }
  });
}

function bestThumb(t) {
  if (!t) return null;
  const o = t.maxres || t.standard || t.high || t.medium || t.default || {};
  return o.url || null;
}

function cleanLabel(s) {
  s = String(s || '').trim();
  s = s.replace(/^\s*\d{1,2}\s*[-–—:]\s*/i, '');
  s = s.replace(/^\s*global\s*[-–—:]\s*/i, '');
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

async function yt(path, params, key) {
  const u = new URL(YT_API + path);
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    u.searchParams.set(k, String(v));
  });
  u.searchParams.set('key', key);
  const res = await fetch(u.toString(), { headers: { accept: 'application/json' } });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`YouTube API ${res.status}: ${t.slice(0, 200)}`);
  }
  return res.json();
}

async function loadCfg(origin, env) {
  const url = env.PLAYLISTS_URL ? String(env.PLAYLISTS_URL) : `${origin}/assets/playlists.json`;
  const res = await fetch(url, { cf: { cacheTtl: 300, cacheEverything: true } });
  if (!res.ok) throw new Error(`Failed to load playlists.json (${res.status})`);
  return res.json();
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

  // Playlist tiles
  const playlistTiles = [];
  if (ids.length) {
    const meta = await yt('/playlists', { part: 'snippet,contentDetails', id: ids.join(','), maxResults: 50 }, apiKey);
    const byId = new Map();
    (meta.items || []).forEach(it => byId.set(it.id, it));
    for (const id of ids) {
      const it = byId.get(id);
      if (!it || !it.snippet) continue;
      playlistTiles.push({
        kind: 'playlist',
        href: `https://www.youtube.com/playlist?list=${id}`,
        src: bestThumb(it.snippet.thumbnails) || 'assets/youtube-thumb.svg',
        label: cleanLabel(it.snippet.title)
      });
    }
  }

  // Must-have video tiles (optional)
  const must = (cfg && cfg.mustVideos && cfg.mustVideos[projectKey]) ? cfg.mustVideos[projectKey] : [];
  const mustIds = Array.isArray(must) ? must.filter(Boolean) : [];
  const mustTiles = mustIds.map(vid => ({
    kind: 'video',
    href: `https://youtu.be/${vid}`,
    src: `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
    label: ''
  }));

  // Globals playlist expanded as videos appended RIGHT-MOST
  const globalsId = cfg && cfg.globalsPlaylistId ? String(cfg.globalsPlaylistId) : '';
  const globalTiles = [];
  if (globalsId) {
    let pageToken = '';
    for (let guard = 0; guard < 5; guard++) {
      const data = await yt('/playlistItems', { part: 'snippet,contentDetails', playlistId: globalsId, maxResults: 50, pageToken }, apiKey);
      for (const it of (data.items || [])) {
        const vid = (it && it.contentDetails && it.contentDetails.videoId) || (it && it.snippet && it.snippet.resourceId && it.snippet.resourceId.videoId);
        if (!vid) continue;
        globalTiles.push({
          kind: 'video',
          href: `https://youtu.be/${vid}`,
          src: bestThumb(it.snippet && it.snippet.thumbnails) || `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
          label: cleanLabel(it && it.snippet ? it.snippet.title : '')
        });
      }
      pageToken = data.nextPageToken || '';
      if (!pageToken) break;
    }
  }

  return { overviewMedia: [...playlistTiles, ...mustTiles, ...globalTiles] };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET,OPTIONS',
          'access-control-allow-headers': 'content-type'
        }
      });
    }

    if (!url.pathname.startsWith('/api/overview')) {
      return new Response('Not Found', { status: 404 });
    }

    const project = (url.searchParams.get('project') || '').trim();
    if (!project) return json({ error: 'Missing ?project=' }, 400, { 'access-control-allow-origin': '*' });

    const apiKey = env.YOUTUBE_API_KEY;
    if (!apiKey) return json({ error: 'Missing YOUTUBE_API_KEY secret' }, 500, { 'access-control-allow-origin': '*' });

    const origin = url.origin;
    const cacheKey = new Request(`${origin}/api/overview?project=${encodeURIComponent(project)}`);
    const cache = caches.default;
    const hit = await cache.match(cacheKey);
    if (hit) return hit;

    try {
      const cfg = await loadCfg(origin, env);
      const payload = await build(project, cfg, apiKey);
      const res = json(payload, 200, {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,OPTIONS'
      });
      ctx.waitUntil(cache.put(cacheKey, res.clone()));
      return res;
    } catch (e) {
      return json({ error: String(e && e.message ? e.message : e) }, 500, { 'access-control-allow-origin': '*' });
    }
  }
};
