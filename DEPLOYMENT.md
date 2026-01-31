# TMS STEM - YouTube Playlist Integration (UPDATED)

## ✅ What Was Done

All project pages have been updated to:

1. **Remove hardcoded videos** - Cleaned out `inspiration` and `overviewMedia` arrays from `PAGE_DATA`
2. **Fetch from API** - Overview scroller now fetches from `/api/overview?project=<slug>`
3. **Show placeholders** - Proper loading states and error handling
4. **Use existing worker** - Works with your `_worker.js` that uses YouTube Atom feeds (no API key needed!)

## 📦 Files Updated

### Project Pages (all 15)
- ✅ digital-art.html
- ✅ project-02.html through project-15.html

**Changes:**
- `PAGE_DATA.inspiration = []` (cleaned)
- `PAGE_DATA.overviewMedia = []` (cleaned)
- New `async renderOverview()` function that fetches from API
- Loading placeholders: "Loading videos from playlists..."
- Error placeholders: "Playlist videos coming soon"

### New Files Created
- ✅ **playlists.json** - Configuration mapping projects to playlist IDs

## 🚀 Deployment Steps

### 1. Add playlists.json to assets folder

```
your-site/
├── assets/
│   ├── playlists.json  ← Add this file
│   ├── style.css
│   └── ...
```

The file maps each project to its YouTube playlist ID:

```json
{
  "globalsPlaylistId": "PLIvHxxWt49qskxUGBvoyYEEpGd2fG_s9R",
  "projects": {
    "digital-art": {
      "playlistId": "PLIvHxxWt49qvdxoI0nUS97hvAgEjjdes7"
    },
    ...
  }
}
```

### 2. Deploy to Cloudflare Pages

Your existing `_worker.js` is already set up correctly! It:
- Uses YouTube Atom feeds (no API key needed)
- Fetches from `/assets/playlists.json`
- Returns `overviewMedia` array
- Caches for 10 minutes
- Combines project + global playlists

Just upload:
1. Updated HTML files (all 15 project pages)
2. playlists.json in assets/
3. Existing _worker.js

### 3. Test the API

After deployment:

```bash
# Test the API directly
curl "https://your-site.pages.dev/api/overview?project=digital-art"

# Should return:
{
  "ok": true,
  "project": "digital-art",
  "overviewMedia": [
    {
      "label": "Video Title",
      "href": "https://www.youtube.com/watch?v=...",
      "src": "https://i.ytimg.com/vi/.../hqdefault.jpg",
      "priority": 1
    }
  ]
}
```

### 4. Check the UI

Visit any project page:
- Should show "Loading videos from playlists..." briefly
- Then display video thumbnails from the playlist
- If no videos yet: "Playlist videos coming soon"
- If API fails: "Unable to load videos"

## 🎯 How It Works

```
User visits project page
         ↓
Page loads with placeholder
         ↓
JavaScript fetches /api/overview?project=digital-art
         ↓
Worker reads /assets/playlists.json
         ↓
Worker fetches YouTube Atom feed (no API key!)
         ↓
Worker returns formatted overviewMedia array
         ↓
Page renders video thumbnails
```

## 📝 Managing Playlists

### Adding/Removing Videos

1. Go to YouTube Studio
2. Edit the playlist
3. Add/remove/reorder videos
4. Changes appear on site after 10 minutes (cache expiry)

### Adding New Projects

Edit `assets/playlists.json`:

```json
{
  "projects": {
    "project-16": {
      "playlistId": "YOUR_PLAYLIST_ID_HERE"
    }
  }
}
```

Redeploy the site.

### Changing Global Videos

Edit the global playlist ID in playlists.json:

```json
{
  "globalsPlaylistId": "PLIvHxxWt49qskxUGBvoyYEEpGd2fG_s9R"
}
```

These videos appear on **all** project pages.

## 🔍 Troubleshooting

### No videos showing

**Check browser console:**
```javascript
// F12 → Console
// Look for errors like:
// "Failed to load overview videos: ..."
```

**Test API directly:**
```bash
curl "https://your-site.pages.dev/api/overview?project=digital-art"
```

**Common issues:**
- playlists.json not in assets/ folder → 404 error
- Wrong project slug → empty results
- Playlist is private → no videos returned
- YouTube Atom feed down (rare) → timeout

### Placeholders showing instead of videos

1. **Check playlist ID is correct** in playlists.json
2. **Check playlist is PUBLIC** (not unlisted or private)
3. **Check playlist has videos**
4. **Wait for cache** - may take up to 10 minutes after first deployment

### Videos not updating

YouTube Atom feeds are cached for 10 minutes. Either:
1. Wait 10 minutes
2. Force refresh with `?t=timestamp`: `/api/overview?project=digital-art&t=123456`
3. Purge Cloudflare cache

## 📊 Data Flow

### From YouTube to Your Site

```
YouTube Playlist
    ↓ (Atom Feed - free, no API key)
Cloudflare Worker (_worker.js)
    ↓ (processes XML, formats data)
JSON Response
    ↓ (cached 10 min)
Project Page
    ↓ (renders thumbnails)
User sees videos
```

### What the Worker Does

1. Reads project slug from URL param
2. Loads playlists.json from assets
3. Gets playlist ID for that project
4. Fetches YouTube Atom feed
5. Parses XML to extract video data
6. Also fetches global playlist
7. Combines project + global videos
8. Returns formatted JSON
9. Caches for 10 minutes

## 🎨 Customization

### Change cache duration

Edit `_worker.js`:

```javascript
"cache-control": "public, max-age=600"  // 600 = 10 minutes
```

### Change placeholder text

Edit any project HTML file:

```javascript
function showPlaceholders(message = "Your custom message here"){
  // ...
}
```

### Change video limit

Edit `_worker.js`:

```javascript
const items = parseFeed(xml, 20);  // Change from 20 to your limit
```

### Reverse global order

Edit `_worker.js`:

```javascript
// After combining videos
combined.reverse();
```

## 📋 Current Playlist Mapping

| Project | Playlist ID |
|---------|-------------|
| Digital Art | PLIvHxxWt49qvdxoI0nUS97hvAgEjjdes7 |
| Photography | PLIvHxxWt49qv6s6wQ8j27-3BNLA3vwjZH |
| Music Production | PLIvHxxWt49qspSpr0SrsIEgbXLmsh55l- |
| Language & Web | PLIvHxxWt49qsIcnpr9lSdlPEjj_GBgWaV |
| Video Production | PLIvHxxWt49quUqjbz_V3--_7Ur2aCR7_3 |
| Coding | PLNIdDxctsZe9gVqjHHj_TxzHfElHszdst |
| Circuitry | PLeVrdakJu3M43jB2WqKEL4_Hhn94LpOMT |
| Robotics | PLvEHQwOLYgKeJDqcHzhezVjxaqaRkEJmP |
| Flight/Rockets | PLWvf1nsJgpBKkNs4360VtD2Fkd64_t6r0 |
| 3D Printing | PLWrqQ7NBLxmCXnvjoYdn290c9GsK5qyPm |
| Construction | PLg9lToc61ftpZjtoCJoPZ8gLyXVk1whOV |
| Laser | PL_1I1UNQ4oGa0w55C772Y1mC6F4f3ZcG6 |
| Resource Dev | PLIvHxxWt49qu3w5AYUx9ho-mWQ1VuL3Bt |
| Cricut | PLIvHxxWt49qtqfKxMMiRwvgFdPCQw3hje |
| CNC | PLIvHxxWt49qtwOXlaGww2P32coR4b2od7 |
| **Globals** | PLIvHxxWt49qskxUGBvoyYEEpGd2fG_s9R |

## ✨ Benefits

✅ **No hardcoded videos** - Everything from playlists  
✅ **No API key needed** - Uses YouTube Atom feeds  
✅ **Automatic updates** - Edit playlists, site updates automatically  
✅ **Clean placeholders** - Clear loading/error states  
✅ **Cached for speed** - 10-minute cache reduces requests  
✅ **Global + project videos** - Combines both automatically  
✅ **Clean titles** - Removes "Global -" prefixes  
✅ **Easy maintenance** - Just edit playlists in YouTube  

## 🎓 Next Steps

After deployment:

1. ✅ Check one project page loads correctly
2. ✅ Verify videos appear from playlist
3. ✅ Test adding a video to a playlist
4. ✅ Wait 10 minutes and confirm it appears
5. ✅ Test all 15 project pages
6. ✅ Document for your team how to manage playlists

## 📞 Support

If videos aren't showing:

1. Check browser console (F12)
2. Test API endpoint directly
3. Verify playlists.json is deployed
4. Check playlist IDs are correct
5. Ensure playlists are public
6. Wait for cache to expire (10 min)

---

**Ready to deploy!** Just upload the updated HTML files and playlists.json.
