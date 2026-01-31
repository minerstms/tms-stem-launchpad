/**
 * TMS STEM - YouTube Playlist Integration
 * 
 * Client-side module to fetch and display YouTube playlist videos
 * in the overview scroller on project pages.
 * 
 * Usage:
 * 1. Include this script in your project pages
 * 2. Call loadPlaylistOverview() when the page loads
 */

(function() {
  'use strict';

  // Configuration
  const WORKER_URL = "https://your-worker.workers.dev"; // UPDATE THIS
  const FALLBACK_ENABLED = true;

  /**
   * Fetch playlist data from the Cloudflare Worker
   */
  async function fetchPlaylistData(projectSlug) {
    try {
      const url = `${WORKER_URL}/?project=${encodeURIComponent(projectSlug)}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Worker returned ${response.status}`);
      }

      const data = await response.json();
      return data.videos || [];
    } catch (error) {
      console.error("Failed to fetch playlist data:", error);
      
      // Return empty array or fallback data
      if (FALLBACK_ENABLED) {
        return getFallbackData();
      }
      return [];
    }
  }

  /**
   * Fallback data when API is unavailable
   */
  function getFallbackData() {
    return [
      {
        title: "Loading playlist videos...",
        href: "#",
        thumb: "assets/youtube-thumb.svg",
        type: "Playlist",
        meta: "Coming soon"
      }
    ];
  }

  /**
   * Populate the overview scroller with playlist videos
   */
  async function loadPlaylistOverview() {
    // Determine project slug from page
    const projectSlug = getProjectSlug();
    if (!projectSlug) {
      console.warn("Could not determine project slug");
      return;
    }

    // Find the thumbRow element
    const thumbRow = document.getElementById("thumbRow");
    if (!thumbRow) {
      console.warn("thumbRow element not found");
      return;
    }

    // Show loading state
    thumbRow.innerHTML = '<div class="thumbCard" style="padding:20px;text-align:center;">Loading videos...</div>';

    // Fetch playlist data
    const videos = await fetchPlaylistData(projectSlug);

    // Clear loading state
    thumbRow.innerHTML = "";

    // If no videos, show placeholder
    if (!videos || videos.length === 0) {
      showPlaceholder(thumbRow);
      return;
    }

    // Populate with videos
    videos.forEach(video => {
      const card = createVideoCard(video);
      thumbRow.appendChild(card);
    });
  }

  /**
   * Create a video card element
   */
  function createVideoCard(video) {
    const card = document.createElement("div");
    card.className = "thumbCard";
    
    const type = (video.type || "Video").toUpperCase();
    const meta = video.meta || "";
    
    card.innerHTML = `
      <img src="${video.thumb}" alt="${video.title}" loading="lazy">
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

  /**
   * Show placeholder when no videos available
   */
  function showPlaceholder(container) {
    for (let i = 0; i < 3; i++) {
      const placeholder = document.createElement('div');
      placeholder.className = 'thumbCard';
      placeholder.innerHTML = `
        <div style="height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:12px;background:linear-gradient(180deg, rgba(79,134,198,.15), rgba(0,0,0,.70));">
          <div style="font-weight:1000">Playlist videos coming soon</div>
          <div style="margin-top:4px;font-size:12px;font-weight:800;color:rgba(255,255,255,.78)">Videos will appear here automatically</div>
        </div>
      `;
      container.appendChild(placeholder);
    }
  }

  /**
   * Get project slug from various page attributes
   */
  function getProjectSlug() {
    // Try data-project attribute on html element
    const htmlProject = document.documentElement.getAttribute('data-project');
    if (htmlProject) {
      // Convert "Digital Art" to "digital-art" or keep existing format
      return htmlProject.toLowerCase().replace(/\s+/g, '-');
    }

    // Try to extract from page filename
    const path = window.location.pathname;
    const match = path.match(/\/([\w-]+)\.html/);
    if (match) {
      return match[1];
    }

    // Try global PAGE_DATA if available
    if (window.PAGE_DATA && window.PAGE_DATA.slug) {
      return window.PAGE_DATA.slug;
    }

    return null;
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Initialize when DOM is ready
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadPlaylistOverview);
    } else {
      loadPlaylistOverview();
    }
  }

  // Export to global scope for manual calling if needed
  window.TMSPlaylist = {
    load: loadPlaylistOverview,
    fetch: fetchPlaylistData,
    configure: function(workerUrl) {
      WORKER_URL = workerUrl;
    }
  };

  // Auto-initialize
  init();

})();
