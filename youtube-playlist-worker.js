/**
 * Cloudflare Worker: YouTube Playlist Fetcher
 * 
 * Fetches videos from YouTube playlists and serves them as JSON
 * for the TMS STEM site's overview scrollers.
 * 
 * Setup:
 * 1. Add your YouTube API key as an environment variable: YOUTUBE_API_KEY
 * 2. Deploy this worker to Cloudflare
 * 3. Update your project pages to fetch from this worker
 */

// ==================== CONFIGURATION ====================

const PLAYLIST_MAP = {
  // Project playlists
  "digital-art": ["PLIvHxxWt49qvdxoI0nUS97hvAgEjjdes7"],
  "project-02": ["PLIvHxxWt49qv6s6wQ8j27-3BNLA3vwjZH"],
  "project-03": [
    "PLIvHxxWt49qspSpr0SrsIEgbXLmsh55l-",
    "PLD-nTuvnC1rZJ5ao48pWSVsqLuV_JeWn6"
  ],
  "project-04": ["PLIvHxxWt49qsIcnpr9lSdlPEjj_GBgWaV"],
  "project-05": ["PLIvHxxWt49quUqjbz_V3--_7Ur2aCR7_3"],
  "project-06": [
    "PLNIdDxctsZe9gVqjHHj_TxzHfElHszdst",
    "PLN2aXbvhyOSEnIGVitJlGdh-djSCsZ6fM"
  ],
  "project-07": [
    "PLeVrdakJu3M43jB2WqKEL4_Hhn94LpOMT",
    "PLIvHxxWt49qspSpr0SrsIEgbXLmsh55l-",
    "PLIvHxxWt49qsIcnpr9lSdlPEjj_GBgWaV"
  ],
  "project-08": [
    "PLvEHQwOLYgKeJDqcHzhezVjxaqaRkEJmP",
    "PL65kukZorPdNOxhkBYg9JH_F-9w9Xbp1D",
    "PLIvHxxWt49qsyS9nr5TF3i99oAI4gpUK-"
  ],
  "project-09": [
    "PLWvf1nsJgpBKkNs4360VtD2Fkd64_t6r0",
    "PLNYF3s_qKgfSbOowPVxK6AisLFcX9Lxtj",
    "PLIvHxxWt49qvluRePyUQueBUA7lqMNnyr"
  ],
  "project-10": [
    "PLWrqQ7NBLxmCXnvjoYdn290c9GsK5qyPm",
    "PLtmhShv-_MyKSWR-eIXjCqEVDjkhDoPyY",
    "PL90LC6zq_Lzf9tHyFPzX_9OA35BFTfEBs"
  ],
  "project-11": [
    "PLg9lToc61ftpZjtoCJoPZ8gLyXVk1whOV",
    "PLJdXTDAyIfNcJX6ufABBE77e_i-kmmxaC"
  ],
  "project-12": ["PL_1I1UNQ4oGa0w55C772Y1mC6F4f3ZcG6"],
  "project-13": ["PLIvHxxWt49qu3w5AYUx9ho-mWQ1VuL3Bt"],
  "project-14": ["PLIvHxxWt49qtqfKxMMiRwvgFdPCQw3hje"],
  "project-15": ["PLIvHxxWt49qtwOXlaGww2P32coR4b2od7"]
};

// Global playlist (appended to all projects)
const GLOBAL_PLAYLIST = "PLIvHxxWt49qskxUGBvoyYEEpGd2fG_s9R";

// Cache duration in seconds (1 hour)
const CACHE_TTL = 3600;

// ==================== YOUTUBE API ====================

async function fetchPlaylistItems(playlistId, apiKey, maxResults = 50) {
  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet,contentDetails");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("maxResults", maxResults);
  url.searchParams.set("key", apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.items || [];
}

function formatVideos(items) {
  return items.map(item => {
    const snippet = item.snippet;
    const videoId = item.contentDetails?.videoId || snippet.resourceId?.videoId;
    
    return {
      title: cleanTitle(snippet.title),
      href: `https://www.youtube.com/watch?v=${videoId}`,
      thumb: snippet.thumbnails?.high?.url || 
             snippet.thumbnails?.medium?.url || 
             `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      type: "Video",
      meta: "", // Duration would require additional API call
      videoId: videoId,
      publishedAt: snippet.publishedAt
    };
  });
}

function cleanTitle(title) {
  // Remove common prefixes like "Global – " or "Global - "
  return title
    .replace(/^Global\s*[–-]\s*/i, "")
    .replace(/^Global\s+/i, "")
    .trim();
}

// ==================== MAIN HANDLER ====================

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const projectSlug = url.searchParams.get("project");

  // Return config if requested
  if (url.pathname === "/config") {
    return new Response(JSON.stringify({
      projects: Object.keys(PLAYLIST_MAP),
      globalPlaylist: GLOBAL_PLAYLIST,
      cacheTTL: CACHE_TTL
    }, null, 2), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  // Require project parameter
  if (!projectSlug) {
    return new Response(JSON.stringify({
      error: "Missing 'project' parameter",
      usage: "/?project=digital-art"
    }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Get API key from environment
  const apiKey = env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({
      error: "YouTube API key not configured"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Check cache first
  const cacheKey = `playlist-${projectSlug}`;
  const cache = caches.default;
  const cachedResponse = await cache.match(request.url);
  
  if (cachedResponse) {
    const response = new Response(cachedResponse.body, cachedResponse);
    response.headers.set("X-Cache", "HIT");
    return response;
  }

  try {
    const projectPlaylists = PLAYLIST_MAP[projectSlug] || [];
    const allVideos = [];

    // Fetch project playlists
    for (const playlistId of projectPlaylists) {
      const items = await fetchPlaylistItems(playlistId, apiKey);
      const videos = formatVideos(items);
      allVideos.push(...videos);
    }

    // Fetch global playlist
    const globalItems = await fetchPlaylistItems(GLOBAL_PLAYLIST, apiKey);
    const globalVideos = formatVideos(globalItems);

    // Combine: project videos first, then globals
    const combinedVideos = [...allVideos, ...globalVideos];

    // Create response
    const responseData = {
      project: projectSlug,
      videos: combinedVideos,
      projectCount: allVideos.length,
      globalCount: globalVideos.length,
      totalCount: combinedVideos.length,
      timestamp: new Date().toISOString()
    };

    const response = new Response(JSON.stringify(responseData, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": `public, max-age=${CACHE_TTL}`,
        "X-Cache": "MISS"
      }
    });

    // Cache the response
    const cacheResponse = response.clone();
    await cache.put(request.url, cacheResponse);

    return response;

  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// ==================== CLOUDFLARE WORKER ENTRY ====================

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    return handleRequest(request, env);
  }
};
