export async function onRequest(context) {
  const { request, env } = context;

  const API_KEY = env.YOUTUBE_API_KEY;
  if (!API_KEY) {
    return new Response(
      JSON.stringify({ error: "Missing YOUTUBE_API_KEY" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const url = new URL(request.url);
  const project = url.searchParams.get("project") || "Digital Art";

  // TEMP mapping — replace playlist IDs as needed
  const PLAYLISTS = {
    "Digital Art": "PLXXXXX_DIGITAL_ART",
    "Photography": "PLXXXXX_PHOTO",
    "CNC": "PLXXXXX_CNC"
  };

  const playlistId = PLAYLISTS[project];
  if (!playlistId) {
    return new Response(
      JSON.stringify({ overviewMedia: [] }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  const ytUrl =
    "https://www.googleapis.com/youtube/v3/playlistItems" +
    "?part=snippet" +
    "&maxResults=50" +
    "&playlistId=" + playlistId +
    "&key=" + API_KEY;

  const ytRes = await fetch(ytUrl);
  const ytData = await ytRes.json();

  const overviewMedia = (ytData.items || []).map(it => ({
    href: "https://www.youtube.com/watch?v=" + it.snippet.resourceId.videoId,
    src: "https://i.ytimg.com/vi/" + it.snippet.resourceId.videoId + "/hqdefault.jpg",
    label: it.snippet.title
  }));

  return new Response(JSON.stringify({ overviewMedia }), {
    headers: { "Content-Type": "application/json" }
  });
}
