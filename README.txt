TMS STEM Site — Cloudflare Deploy (Worker + Sheet-Driven Media)

This ZIP contains:
- The full website (index + 15 project pages + assets)
- A Cloudflare Worker in `/worker` that serves:
  - GET /api/overview?project=<Project Name>
  - It fetches playlist/video metadata from YouTube Data API v3.

IMPORTANT SECURITY NOTE
- The YouTube API key must be stored as a **Cloudflare Worker Secret** named:
    YOUTUBE_API_KEY
- Do not paste the key into front-end JS files.

Docs:
- docs/API_KEY_SETUP.md

Data files:
- assets/playlists.json  (playlist IDs and required videos)
- assets/media-links.json (legacy; still supported)

Ordering:
- pinned=true items first
- then higher priority numbers first
