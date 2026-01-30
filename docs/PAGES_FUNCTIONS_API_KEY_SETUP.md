# Pages Functions + YouTube API Key (Required)

This deployment uses **Cloudflare Pages Functions** to serve:

- `/api/overview?project=Digital%20Art`

The frontend JavaScript calls that endpoint to populate video/playlist tiles.

## 1) Set the YouTube API key as a SECRET

Cloudflare Dashboard → Pages → (your project) → Settings → Variables

Add:

- Name: `YOUTUBE_API_KEY`
- Type: **Secret**
- Value: your YouTube Data API v3 key

(Optional)
- Name: `PLAYLISTS_URL`
- Type: Text
- Value: URL to playlists.json (defaults to `/assets/playlists.json`)

## 2) Deploy

Push/upload this ZIP to your Cloudflare Pages project source and deploy.

## 3) Test

Visit:

`/api/overview?project=Digital%20Art`

Expected: JSON with `overviewMedia` array.

If you see HTML, Pages Functions are not deployed (make sure the `functions/` folder is present at the repo root).
