# YouTube Playlist Integration - Setup Guide

This guide explains how to populate your project overview scrollers with YouTube playlist videos automatically.

## Architecture Overview

```
┌─────────────────┐
│  Project Pages  │
│  (HTML files)   │
└────────┬────────┘
         │
         │ fetch playlist data
         ▼
┌──────────────────────┐
│  Cloudflare Worker   │
│  (youtube-playlist-  │
│   worker.js)         │
└────────┬─────────────┘
         │
         │ YouTube API calls (cached)
         ▼
┌──────────────────────┐
│   YouTube Data API   │
│   (playlists)        │
└──────────────────────┘
```

## What This Does

1. **Fetches playlist videos** from YouTube using the official API
2. **Caches results** for 1 hour to minimize API calls
3. **Combines project + global playlists** automatically
4. **Formats data** for your existing thumbCard styling
5. **Updates automatically** when you add/remove videos in YouTube

## Files Included

- `youtube-playlist-worker.js` - Cloudflare Worker (serverless function)
- `playlist-loader.js` - Client-side script for project pages
- `playlists.json` - Configuration mapping (reference)
- `SETUP.md` - This file

---

## Step 1: Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **YouTube Data API v3**
4. Create credentials → API Key
5. Restrict the key to YouTube Data API v3 (recommended)
6. Save your API key

**Note:** Free tier includes 10,000 quota units/day. Each playlist fetch costs ~1-3 units.

---

## Step 2: Deploy Cloudflare Worker

### Option A: Cloudflare Dashboard (Easiest)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** → **Create Application** → **Create Worker**
3. Name it: `tms-youtube-playlists`
4. Click **Deploy**, then **Edit Code**
5. Replace the default code with contents of `youtube-playlist-worker.js`
6. Click **Save and Deploy**

### Add Environment Variable

1. In the Worker settings, go to **Settings** → **Variables**
2. Add environment variable:
   - Name: `YOUTUBE_API_KEY`
   - Value: Your API key from Step 1
   - Type: Secret (encrypted)
3. Click **Save**

Your worker is now live at: `https://tms-youtube-playlists.YOUR-SUBDOMAIN.workers.dev`

### Option B: Wrangler CLI (Advanced)

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create wrangler.toml
cat > wrangler.toml <<EOF
name = "tms-youtube-playlists"
main = "youtube-playlist-worker.js"
compatibility_date = "2024-01-01"

[vars]
# Public variables go here

# Add secret via CLI:
# wrangler secret put YOUTUBE_API_KEY
EOF

# Deploy
wrangler deploy

# Add your API key (will prompt securely)
wrangler secret put YOUTUBE_API_KEY
```

---

## Step 3: Test the Worker

Test that your worker is functioning:

```bash
# Check configuration
curl https://tms-youtube-playlists.YOUR-SUBDOMAIN.workers.dev/config

# Fetch a project's videos
curl "https://tms-youtube-playlists.YOUR-SUBDOMAIN.workers.dev/?project=digital-art"
```

Expected response:
```json
{
  "project": "digital-art",
  "videos": [
    {
      "title": "Video Title",
      "href": "https://www.youtube.com/watch?v=VIDEO_ID",
      "thumb": "https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg",
      "type": "Video",
      "meta": "",
      "videoId": "VIDEO_ID"
    }
  ],
  "projectCount": 5,
  "globalCount": 3,
  "totalCount": 8,
  "timestamp": "2026-01-30T12:00:00.000Z"
}
```

---

## Step 4: Update Project Pages

### Method A: Add Script Tag (Recommended)

Add to each project page's `<head>` section:

```html
<script>
  // Configure the worker URL BEFORE loading the script
  window.TMS_WORKER_URL = 'https://tms-youtube-playlists.YOUR-SUBDOMAIN.workers.dev';
</script>
<script src="assets/playlist-loader.js"></script>
```

Then update `playlist-loader.js` to use this config:

```javascript
const WORKER_URL = window.TMS_WORKER_URL || "https://tms-youtube-playlists.YOUR-SUBDOMAIN.workers.dev";
```

### Method B: Direct Integration

Replace the existing overview scroller code in your project pages:

```javascript
// BEFORE (old static data approach)
var items = (PAGE_DATA && (PAGE_DATA.inspiration || PAGE_DATA.overviewMedia)) || [];

// AFTER (dynamic playlist approach)
// Remove the old code and include playlist-loader.js instead
```

The `playlist-loader.js` script will:
1. Auto-detect the project from `data-project` attribute
2. Fetch videos from your worker
3. Populate the `thumbRow` element automatically

### Integration Points

Your pages already have this HTML:
```html
<div class="thumbRow" id="thumbRow"></div>
```

And this styling (keep as-is):
```css
.daTop .thumbRow { ... }
.daTop .thumbCard { ... }
.daTop .thumbOverlay { ... }
```

The new script populates `thumbRow` just like your current code, so no HTML/CSS changes needed!

---

## Step 5: Deploy Updated Site

1. Add `playlist-loader.js` to your `assets/` folder
2. Update project pages to include the script
3. Zip and upload to Cloudflare Pages (as you normally do)

---

## Managing Playlists

### Adding Videos

1. Go to YouTube Studio
2. Find the appropriate playlist
3. Add/remove/reorder videos
4. Changes appear on your site after cache expires (1 hour) or immediately if you clear cache

### Adding New Projects

Edit the `PLAYLIST_MAP` in `youtube-playlist-worker.js`:

```javascript
const PLAYLIST_MAP = {
  "project-16": ["PLAYLIST_ID_HERE"],
  // ... rest of projects
};
```

Redeploy the worker:
```bash
wrangler deploy
```

### Changing Global Videos

Simply edit the Global playlist in YouTube:
- Playlist ID: `PLIvHxxWt49qskxUGBvoyYEEpGd2fG_s9R`
- Changes apply to ALL projects automatically

---

## Cache Management

### Cache Behavior

- **Duration:** 1 hour (3600 seconds)
- **Scope:** Per unique URL (per project)
- **Headers:** Standard HTTP cache headers

### Clearing Cache

#### Option 1: Wait (1 hour)
Cache expires automatically.

#### Option 2: Purge via Cloudflare Dashboard
1. Go to Worker → **Metrics & Analytics**
2. Click **Purge Cache**

#### Option 3: Add Cache Bust Parameter
```
?project=digital-art&_bust=123
```

#### Option 4: Update Worker
Any code change and redeploy automatically clears cache.

---

## Troubleshooting

### Videos Not Showing

1. **Check browser console** for errors
2. **Verify worker URL** in `playlist-loader.js`
3. **Test worker directly**: `curl "https://YOUR-WORKER.workers.dev/?project=digital-art"`
4. **Check API key**: Go to Worker → Settings → Variables
5. **Check quota**: [Google Cloud Console](https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas)

### Common Errors

**"YouTube API key not configured"**
- Add `YOUTUBE_API_KEY` environment variable in Worker settings

**"YouTube API error: 403"**
- API key invalid or YouTube API not enabled
- Check API key restrictions

**"YouTube API error: 400"**
- Invalid playlist ID in `PLAYLIST_MAP`
- Verify playlist IDs in worker code

**"Missing 'project' parameter"**
- Worker called without `?project=...`
- Check `playlist-loader.js` is detecting project slug correctly

### Debug Mode

Add console logging to `playlist-loader.js`:

```javascript
async function loadPlaylistOverview() {
  const projectSlug = getProjectSlug();
  console.log("Loading playlist for:", projectSlug);
  
  const videos = await fetchPlaylistData(projectSlug);
  console.log("Fetched videos:", videos);
  // ...
}
```

---

## API Quota Management

### Daily Quota: 10,000 units

**Costs per operation:**
- Playlist items list: 1 unit
- With caching: ~15-50 requests/day
- Without caching: Could exhaust quota

**Recommendations:**
1. Keep cache TTL at 1+ hour
2. Monitor usage in Google Cloud Console
3. Request quota increase if needed (usually approved)

### Monitoring Usage

[Google Cloud Console](https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas) → YouTube Data API v3 → Quotas

---

## Advanced Customization

### Change Cache Duration

In `youtube-playlist-worker.js`:
```javascript
const CACHE_TTL = 7200; // 2 hours
```

### Fetch More Videos Per Playlist

```javascript
const items = await fetchPlaylistItems(playlistId, apiKey, 100); // default 50
```

Note: YouTube API max is 50 per request. For >50, requires pagination.

### Custom Video Filtering

Add to `formatVideos()` function:
```javascript
function formatVideos(items) {
  return items
    .filter(item => {
      // Only include videos published this year
      const year = new Date(item.snippet.publishedAt).getFullYear();
      return year === 2026;
    })
    .map(item => {
      // ... rest of formatting
    });
}
```

### Reverse Global Order

In worker, after fetching globals:
```javascript
const globalVideos = formatVideos(globalItems).reverse();
```

---

## Maintenance

### Weekly
- Check worker metrics (requests, errors)
- Monitor API quota usage

### Monthly
- Review playlist content
- Remove outdated videos
- Add new resources

### As Needed
- Update playlist IDs in worker
- Adjust cache duration
- Modify video formatting

---

## Support Resources

- **Cloudflare Workers Docs:** https://developers.cloudflare.com/workers/
- **YouTube Data API:** https://developers.google.com/youtube/v3
- **Your Worker Dashboard:** https://dash.cloudflare.com/workers

---

## Next Steps

After completing setup:

1. ✅ Test on one project page first
2. ✅ Verify videos appear correctly
3. ✅ Check cache is working (X-Cache: HIT header)
4. ✅ Roll out to all project pages
5. ✅ Update playlists in YouTube Studio
6. ✅ Monitor for 24 hours

---

## Quick Reference

**Worker URL Format:**
```
https://YOUR-WORKER.workers.dev/?project=PROJECT-SLUG
```

**Project Slugs:**
- digital-art
- project-02 through project-15

**Global Playlist ID:**
- PLIvHxxWt49qskxUGBvoyYEEpGd2fG_s9R

**Cache TTL:**
- 3600 seconds (1 hour)

**API Quota:**
- 10,000 units/day (free tier)
