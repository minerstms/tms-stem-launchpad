# YouTube API Key (Cloudflare Secret) — Setup

**Do NOT paste the YouTube API key into any .js file.**
This site fetches video data via the Worker endpoint `/api/overview`, so the API key must live **only** in the Cloudflare Worker as a **Secret**.

## Option A — Cloudflare Dashboard (recommended)
1. Cloudflare Dashboard → **Workers & Pages**
2. Open the Worker project: `tms-stem-youtube-api` (folder: `/worker`)
3. **Settings → Variables**
4. Add **Environment Variable**
   - Name: `YOUTUBE_API_KEY`
   - Value: *(paste your key)*
   - Type: **Secret**
5. Save, then **Deploy** the Worker.

## Option B — Wrangler CLI
From the `/worker` folder:

```bash
wrangler secret put YOUTUBE_API_KEY
# paste your key when prompted
wrangler deploy
```

## Verify
After deploy, visit:

`https://YOURDOMAIN.COM/api/overview?project=Digital%20Art`

You should get JSON with `overviewMedia` containing `href`, `src`, `label`.

If you see:
- `Missing YOUTUBE_API_KEY secret` → secret not set on the Worker
- `REQUEST_DENIED` / `403` → YouTube Data API v3 not enabled or key restrictions wrong
