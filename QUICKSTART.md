# YouTube Playlist Integration - Quick Start Checklist

## Choose Your Approach

### 🚀 Option A: Cloudflare Worker (Recommended)
**Best for:** Production use, automatic updates, minimal maintenance

- [ ] Get YouTube API key from Google Cloud Console
- [ ] Deploy `youtube-playlist-worker.js` to Cloudflare Workers
- [ ] Add `YOUTUBE_API_KEY` environment variable to worker
- [ ] Test worker: `curl "https://YOUR-WORKER.workers.dev/?project=digital-art"`
- [ ] Update `playlist-loader.js` with your worker URL
- [ ] Add `playlist-loader.js` to assets folder
- [ ] Add script tag to project pages
- [ ] Deploy site to Cloudflare Pages
- [ ] Verify videos appear on at least one project page
- [ ] Roll out to all project pages

**Time:** ~30 minutes  
**Maintenance:** Minimal (just update playlists in YouTube)

---

### 📄 Option B: Static JSON File
**Best for:** Quick testing, no worker needed, simpler setup

- [ ] Run Python script or browser console export
- [ ] Save output to `assets/playlist-data.json`
- [ ] Use static version of `playlist-loader.js`
- [ ] Add script tag to project pages
- [ ] Deploy site
- [ ] Test on one project page
- [ ] Roll out to all pages
- [ ] **Important:** Re-export JSON whenever playlists change

**Time:** ~15 minutes  
**Maintenance:** Manual updates when playlists change

---

## Implementation Checklist

### 1. Files to Add
```
your-site/
├── assets/
│   ├── playlist-loader.js          ← Add this
│   └── playlist-data.json          ← Only for static approach
└── project pages/
    ├── digital-art.html            ← Update
    ├── project-02.html             ← Update
    └── ... (all project pages)     ← Update
```

### 2. Project Page Updates

Add to each project page's `<head>`:

**For Worker Approach:**
```html
<script>
  window.TMS_WORKER_URL = 'https://tms-youtube-playlists.YOUR-SUBDOMAIN.workers.dev';
</script>
<script src="assets/playlist-loader.js"></script>
```

**For Static Approach:**
```html
<script src="assets/playlist-loader.js"></script>
```

### 3. Verify Project Slug Detection

Your pages should have one of these:
```html
<!-- Option 1: data-project attribute -->
<html lang="en" data-project="digital-art">

<!-- Option 2: filename -->
<!-- digital-art.html → auto-detects "digital-art" -->

<!-- Option 3: PAGE_DATA object -->
<script>
  window.PAGE_DATA = { slug: "digital-art" };
</script>
```

### 4. Test Checklist

- [ ] Open developer console (F12)
- [ ] Look for any errors
- [ ] Verify `thumbRow` element has video cards
- [ ] Click a video card → should open YouTube in new tab
- [ ] Check thumbnails load correctly
- [ ] Verify project videos appear first, then global videos
- [ ] Test on mobile viewport
- [ ] Test on multiple projects

---

## Playlist Management

### Current Playlists

✅ **Project 01 (Digital Art)**  
`PLIvHxxWt49qvdxoI0nUS97hvAgEjjdes7`

✅ **Project 02 (Photography)**  
`PLIvHxxWt49qv6s6wQ8j27-3BNLA3vwjZH`

✅ **Project 03 (Music Production)**  
`PLIvHxxWt49qspSpr0SrsIEgbXLmsh55l-`  
`PLD-nTuvnC1rZJ5ao48pWSVsqLuV_JeWn6`

✅ **Project 04 (Language & Website)**  
`PLIvHxxWt49qsIcnpr9lSdlPEjj_GBgWaV`

✅ **Project 05 (Video Production)**  
`PLIvHxxWt49quUqjbz_V3--_7Ur2aCR7_3`

✅ **Project 06 (Coding)**  
`PLNIdDxctsZe9gVqjHHj_TxzHfElHszdst`  
`PLN2aXbvhyOSEnIGVitJlGdh-djSCsZ6fM`

✅ **Project 07 (Circuitry)**  
`PLeVrdakJu3M43jB2WqKEL4_Hhn94LpOMT`  
`PLIvHxxWt49qspSpr0SrsIEgbXLmsh55l-`  
`PLIvHxxWt49qsIcnpr9lSdlPEjj_GBgWaV`

✅ **Project 08 (Robotics)**  
`PLvEHQwOLYgKeJDqcHzhezVjxaqaRkEJmP`  
`PL65kukZorPdNOxhkBYg9JH_F-9w9Xbp1D`  
`PLIvHxxWt49qsyS9nr5TF3i99oAI4gpUK-`

✅ **Project 09 (Flight/Rockets)**  
`PLWvf1nsJgpBKkNs4360VtD2Fkd64_t6r0`  
`PLNYF3s_qKgfSbOowPVxK6AisLFcX9Lxtj`  
`PLIvHxxWt49qvluRePyUQueBUA7lqMNnyr`

✅ **Project 10 (3D Printing)**  
`PLWrqQ7NBLxmCXnvjoYdn290c9GsK5qyPm`  
`PLtmhShv-_MyKSWR-eIXjCqEVDjkhDoPyY`  
`PL90LC6zq_Lzf9tHyFPzX_9OA35BFTfEBs`

✅ **Project 11 (Construction)**  
`PLg9lToc61ftpZjtoCJoPZ8gLyXVk1whOV`  
`PLJdXTDAyIfNcJX6ufABBE77e_i-kmmxaC`

✅ **Project 12 (Laser)**  
`PL_1I1UNQ4oGa0w55C772Y1mC6F4f3ZcG6`

✅ **Project 13 (Resource Dev)**  
`PLIvHxxWt49qu3w5AYUx9ho-mWQ1VuL3Bt`

✅ **Project 14 (Cricut)**  
`PLIvHxxWt49qtqfKxMMiRwvgFdPCQw3hje`

✅ **Project 15 (CNC)**  
`PLIvHxxWt49qtwOXlaGww2P32coR4b2od7`

✅ **GLOBALS (appended to all)**  
`PLIvHxxWt49qskxUGBvoyYEEpGd2fG_s9R`

---

## Adding New Videos

### For Worker Approach:
1. Open YouTube Studio
2. Go to the appropriate playlist
3. Add/remove/reorder videos
4. Wait ~1 hour for cache to expire (or purge cache)
5. Videos appear automatically on site

### For Static Approach:
1. Update YouTube playlists
2. Re-run export script
3. Update `playlist-data.json`
4. Redeploy site

---

## Troubleshooting

### No Videos Showing

1. **Check console for errors**
   - F12 → Console tab
   - Look for red errors

2. **Verify worker URL** (if using worker)
   ```javascript
   console.log(window.TMS_WORKER_URL);
   ```

3. **Test worker directly**
   ```bash
   curl "https://YOUR-WORKER.workers.dev/?project=digital-art"
   ```

4. **Check project slug detection**
   ```javascript
   console.log(document.documentElement.getAttribute('data-project'));
   ```

5. **Verify thumbRow exists**
   ```javascript
   console.log(document.getElementById('thumbRow'));
   ```

### Videos Show But Don't Click

- Check that `href` values are correct
- Verify click handler is attached
- Look for JavaScript errors

### Thumbnails Not Loading

- Check that YouTube thumbnail URLs are correct
- Verify no CORS issues
- Try opening thumbnail URL directly in browser

### Wrong Videos Showing

- Verify playlist IDs in worker/JSON are correct
- Check that project slug matches
- Clear browser cache

---

## Success Criteria

✅ Videos appear on overview scroller  
✅ Thumbnails load correctly  
✅ Clicking opens YouTube in new tab  
✅ Project videos appear first  
✅ Global videos appear last  
✅ Works on all 15 projects  
✅ Mobile responsive  
✅ No console errors

---

## Maintenance Schedule

### Daily
- No action needed (automatic)

### Weekly
- Review worker metrics (if using worker)
- Check for any errors

### Monthly
- Review playlists for outdated content
- Add new relevant videos
- Remove outdated videos

### As Needed
- Add new projects → Update worker `PLAYLIST_MAP`
- Change cache duration → Update worker `CACHE_TTL`
- Modify video formatting → Update worker or loader

---

## Quick Commands

### Test worker
```bash
curl "https://YOUR-WORKER.workers.dev/?project=digital-art" | jq
```

### Check config
```bash
curl "https://YOUR-WORKER.workers.dev/config"
```

### Deploy worker
```bash
wrangler deploy
```

### Clear cache
Add `?_t=123` to any request or purge via Cloudflare dashboard

---

## Support

**Worker Issues:**
- Cloudflare Dashboard → Workers → Logs
- Check environment variables
- Verify API key is set

**YouTube API Issues:**
- Google Cloud Console → APIs → YouTube Data API v3
- Check quota usage
- Verify API key restrictions

**Site Issues:**
- Browser console (F12)
- Network tab for failed requests
- Check file paths in `<script src="">`

---

## Next Steps After Setup

1. ✅ Test on staging/preview
2. ✅ Verify one project works end-to-end
3. ✅ Roll out to all projects
4. ✅ Monitor for 24-48 hours
5. ✅ Update documentation for your team
6. ✅ Train staff on managing playlists

---

## Benefits You'll Get

✅ **No more manual JSON updates**  
Just update playlists in YouTube

✅ **Automatic video thumbnails**  
Pulled from YouTube automatically

✅ **Clean title formatting**  
"Global – " prefixes removed automatically

✅ **Cached for performance**  
1-hour cache = fast loading

✅ **Easy to maintain**  
Add/remove videos in familiar YouTube interface

✅ **Consistent across all projects**  
Globals appear on every page

✅ **Future-proof**  
Easy to add new projects or change structure

---

**Estimated Total Setup Time:**  
- Worker approach: 30-45 minutes
- Static approach: 15-20 minutes

**Ready to start? Pick your approach and check off the boxes!**
