/**
 * ALTERNATIVE APPROACH: Static JSON File (No Worker)
 * 
 * If you don't want to set up a Cloudflare Worker and YouTube API,
 * you can manually export playlist data to a static JSON file.
 * 
 * This is simpler but requires manual updates when playlists change.
 */

// ==================== MANUAL EXPORT SCRIPT ====================

/**
 * Run this in your browser console on a YouTube playlist page to export data.
 * Then save the output to assets/playlist-data.json
 */

function exportPlaylistData() {
  const videos = [];
  const items = document.querySelectorAll('ytd-playlist-video-renderer');
  
  items.forEach(item => {
    const titleEl = item.querySelector('#video-title');
    const thumbEl = item.querySelector('img');
    const videoId = item.getAttribute('data-video-id') || 
                   titleEl?.href?.match(/v=([^&]+)/)?.[1];
    
    if (videoId && titleEl) {
      videos.push({
        title: titleEl.textContent.trim(),
        href: `https://www.youtube.com/watch?v=${videoId}`,
        thumb: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        type: "Video",
        meta: "",
        videoId: videoId
      });
    }
  });
  
  console.log(JSON.stringify(videos, null, 2));
  return videos;
}

// Usage:
// 1. Open YouTube playlist
// 2. Scroll to load all videos
// 3. Run: exportPlaylistData()
// 4. Copy console output to assets/playlist-data.json

// ==================== PLAYLIST DATA STRUCTURE ====================

/**
 * Example assets/playlist-data.json structure:
 */

const EXAMPLE_PLAYLIST_DATA = {
  "digital-art": {
    "project": [
      {
        "title": "Introduction to Digital Art",
        "href": "https://www.youtube.com/watch?v=abc123",
        "thumb": "https://i.ytimg.com/vi/abc123/hqdefault.jpg",
        "type": "Video",
        "meta": "",
        "videoId": "abc123"
      }
    ],
    "global": [
      // Global videos appended here
    ]
  },
  "project-02": {
    "project": [],
    "global": []
  }
  // ... etc for all projects
};

// ==================== CLIENT-SIDE LOADER (STATIC JSON) ====================

/**
 * Alternative playlist-loader.js that reads from static JSON
 * Use this instead of the API-based version
 */

(function() {
  'use strict';

  const DATA_FILE = "assets/playlist-data.json";

  async function fetchStaticPlaylistData(projectSlug) {
    try {
      const response = await fetch(DATA_FILE);
      if (!response.ok) {
        throw new Error(`Failed to load ${DATA_FILE}`);
      }
      
      const allData = await response.json();
      const projectData = allData[projectSlug];
      
      if (!projectData) {
        console.warn(`No playlist data for ${projectSlug}`);
        return [];
      }
      
      // Combine project videos + global videos
      const projectVideos = projectData.project || [];
      const globalVideos = projectData.global || [];
      
      return [...projectVideos, ...globalVideos];
      
    } catch (error) {
      console.error("Failed to load playlist data:", error);
      return [];
    }
  }

  async function loadPlaylistOverview() {
    const projectSlug = getProjectSlug();
    if (!projectSlug) {
      console.warn("Could not determine project slug");
      return;
    }

    const thumbRow = document.getElementById("thumbRow");
    if (!thumbRow) {
      console.warn("thumbRow element not found");
      return;
    }

    thumbRow.innerHTML = '<div class="thumbCard" style="padding:20px;text-align:center;">Loading...</div>';

    const videos = await fetchStaticPlaylistData(projectSlug);
    
    thumbRow.innerHTML = "";

    if (!videos || videos.length === 0) {
      showPlaceholder(thumbRow);
      return;
    }

    videos.forEach(video => {
      const card = createVideoCard(video);
      thumbRow.appendChild(card);
    });
  }

  function createVideoCard(video) {
    const card = document.createElement("div");
    card.className = "thumbCard";
    
    const type = (video.type || "Video").toUpperCase();
    const meta = video.meta || "";
    
    card.innerHTML = `
      <img src="${video.thumb}" alt="${escapeHtml(video.title)}" loading="lazy">
      <div class="thumbOverlay">
        <div class="thumbTitle">${escapeHtml(video.title)}</div>
        <div class="thumbMeta">
          <span class="badge">${type}</span>
          ${meta ? `<span class="badge">${meta}</span>` : ''}
        </div>
      </div>
    `;
    
    if (video.href && video.href !== "#") {
      card.style.cursor = "pointer";
      card.addEventListener("click", function() {
        window.open(video.href, "_blank", "noopener,noreferrer");
      });
    }
    
    return card;
  }

  function showPlaceholder(container) {
    for (let i = 0; i < 3; i++) {
      const placeholder = document.createElement('div');
      placeholder.className = 'thumbCard';
      placeholder.innerHTML = `
        <div style="height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:12px;background:linear-gradient(180deg, rgba(79,134,198,.15), rgba(0,0,0,.70));">
          <div style="font-weight:1000">Videos coming soon</div>
          <div style="margin-top:4px;font-size:12px;font-weight:800;color:rgba(255,255,255,.78)">Add to playlist data</div>
        </div>
      `;
      container.appendChild(placeholder);
    }
  }

  function getProjectSlug() {
    const htmlProject = document.documentElement.getAttribute('data-project');
    if (htmlProject) {
      return htmlProject.toLowerCase().replace(/\s+/g, '-');
    }

    const path = window.location.pathname;
    const match = path.match(/\/([\w-]+)\.html/);
    if (match) {
      return match[1];
    }

    if (window.PAGE_DATA && window.PAGE_DATA.slug) {
      return window.PAGE_DATA.slug;
    }

    return null;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadPlaylistOverview);
    } else {
      loadPlaylistOverview();
    }
  }

  window.TMSPlaylist = {
    load: loadPlaylistOverview,
    fetch: fetchStaticPlaylistData
  };

  init();

})();

// ==================== PYTHON HELPER SCRIPT ====================

/**
 * Python script to fetch playlist data using YouTube API
 * and generate the static JSON file
 * 
 * Requirements: pip install google-api-python-client
 */

const PYTHON_SCRIPT = `
import json
from googleapiclient.discovery import build

API_KEY = "YOUR_API_KEY_HERE"
PLAYLIST_MAP = {
    "digital-art": ["PLIvHxxWt49qvdxoI0nUS97hvAgEjjdes7"],
    "project-02": ["PLIvHxxWt49qv6s6wQ8j27-3BNLA3vwjZH"],
    # ... add all your playlists
}
GLOBAL_PLAYLIST = "PLIvHxxWt49qskxUGBvoyYEEpGd2fG_s9R"

def fetch_playlist_videos(youtube, playlist_id):
    videos = []
    request = youtube.playlistItems().list(
        part="snippet,contentDetails",
        playlistId=playlist_id,
        maxResults=50
    )
    
    while request:
        response = request.execute()
        
        for item in response['items']:
            snippet = item['snippet']
            video_id = item['contentDetails']['videoId']
            
            videos.append({
                'title': snippet['title'].replace('Global – ', '').replace('Global - ', ''),
                'href': f'https://www.youtube.com/watch?v={video_id}',
                'thumb': snippet['thumbnails']['high']['url'],
                'type': 'Video',
                'meta': '',
                'videoId': video_id
            })
        
        request = youtube.playlistItems().list_next(request, response)
    
    return videos

def main():
    youtube = build('youtube', 'v3', developerKey=API_KEY)
    
    # Fetch global videos once
    global_videos = fetch_playlist_videos(youtube, GLOBAL_PLAYLIST)
    
    output = {}
    
    for project_slug, playlist_ids in PLAYLIST_MAP.items():
        project_videos = []
        
        for playlist_id in playlist_ids:
            videos = fetch_playlist_videos(youtube, playlist_id)
            project_videos.extend(videos)
        
        output[project_slug] = {
            'project': project_videos,
            'global': global_videos
        }
    
    with open('playlist-data.json', 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"Generated playlist-data.json with {len(output)} projects")

if __name__ == '__main__':
    main()
`;

console.log("Python helper script:", PYTHON_SCRIPT);

// ==================== QUICK COMPARISON ====================

const COMPARISON = `
WORKER APPROACH (Recommended):
✅ Auto-updates when playlists change
✅ No manual exports needed
✅ Caching for performance
✅ Centralized management
❌ Requires Cloudflare Worker setup
❌ Requires YouTube API key
❌ Small quota usage

STATIC JSON APPROACH:
✅ Simpler setup (no worker)
✅ No API calls or quota
✅ Works offline
❌ Manual updates required
❌ Need to regenerate JSON when playlists change
❌ No automatic caching

RECOMMENDATION:
- Start with STATIC for quick testing
- Migrate to WORKER for production
`;

console.log(COMPARISON);

