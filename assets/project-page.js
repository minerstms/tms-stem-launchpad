// ============================================================
// TMS STEM — Shared Project Page Extensions (v1)
// Purpose: one place for future global behaviors across ALL project pages.
// Safe: currently does NOT change page behavior.
// ============================================================
// Resolve local asset paths from the site root (works for pretty URLs like
// /project-05 as well as /project-05.html).
function assetUrl(path){
  var ver = window.__TMS_ASSET_VER__ || "1";
  if (!path) return path;
  // Leave absolute URLs untouched
  if (/^(https?:)?\/\//i.test(path)) return path;

  // Normalize to an absolute root path
  var clean = String(path).replace(/^\/+/, "");
  var url = "/" + clean;
  var glue = (url.indexOf("?") >= 0) ? "&" : "?";
  return url + glue + "v=" + encodeURIComponent(ver);
}


// ============================================================
// HARDEN: Allow external thumbnail loads + stop referrer blocking (v1)
// Why: Some hosts block hotlinked thumbnails when a referrer is sent.
// This sets a site-wide no-referrer policy and makes <img> resilient.
// ============================================================
(function(){
  try{
    // Ensure referrer policy is set early (works even when pages are served from CF Pages)
    var existing = document.querySelector('meta[name="referrer"]');
    if (!existing){
      var m = document.createElement("meta");
      m.setAttribute("name","referrer");
      m.setAttribute("content","no-referrer");
      (document.head || document.documentElement).appendChild(m);
    } else {
      existing.setAttribute("content","no-referrer");
    }
  }catch(e){}
})();

(function(){
  // Future: data-driven media scrollers, global heading controls, etc.
})();


// ============================================================
// Data-driven media scrollers (v1)
// Config (legacy): assets/media-links.json
// Config (new): Cloudflare Worker /api/overview + assets/playlists.json
// Supported: Gimkit scroller (.gimkitScroller)
// ============================================================
(function(){
  function getProjectKey(){
    // Prefer explicit override
    if (document.documentElement && document.documentElement.getAttribute("data-project")) {
      return document.documentElement.getAttribute("data-project").trim();
    }
    // Fall back to document title before " — "
    var t = (document.title || "").split(" — ")[0].trim();
    return t || "Digital Art";
  }

  function stripExt(name){
    return (name || "").replace(/\.[^.]+$/, "");
  }

  function baseNameFromPath(p){
    try{
      p = (p || "").split("#")[0].split("?")[0];
      try{ p = decodeURIComponent(p); }catch(e){}
      var parts = p.split("/");
      return stripExt(parts[parts.length-1] || "");
    }catch(e){ return ""; }
  }

  function buildTile(item){
    var a = document.createElement("a");
    a.className = "gimkit-link gimItem";
    a.href = item.href || "#";
    a.target = "_blank";
    a.rel = "noopener";

    var img = document.createElement("img");
    img.loading = "lazy";
    // Harden thumbnail loading (YouTube thumbs often fail when referrers are sent)
    img.referrerPolicy = "no-referrer";
    img.crossOrigin = "anonymous";
    img.src = (item && item.src) ? String(item.src).replace("https://img.youtube.com/","https://i.ytimg.com/") : "";
    var label = item.label || baseNameFromPath(item.src);
    img.alt = label || "";

    a.appendChild(img);

    // filename pill (uses existing page styling)
    var pill = document.createElement("span");
    pill.className = "gimPill";
    pill.textContent = label || "";
    a.appendChild(pill);

    return a;
  }

  function applyGimkit(list){
    var track = document.querySelector(".gimkitScroller .gimTrack");
    if (!track) return;

    // Always clear baked-in tiles so scroller is 100% data-driven
    track.innerHTML = "";

    // If empty, show a single placeholder tile
    if (!Array.isArray(list) || !list.length){
      track.appendChild(buildTile({ href:"#", src:"assets/youtube-thumb.svg", label:"Coming soon", type:"placeholder" }));
      return;
    }

    // Replace with sorted tiles
    var sorted = sortMedia(list);
    for (var i=0;i<sorted.length;i++){
      track.appendChild(buildTile(sorted[i]));
    }
  }

  function normBool(v){ return v===true || v==="true" || v==="TRUE" || v===1 || v==="1"; }
  function normNum(v){ var n = Number(v); return isFinite(n)? n : 0; }

  function sortMedia(list){
    return (list||[]).slice().sort(function(a,b){
      var ap = normBool(a && a.pinned), bp = normBool(b && b.pinned);
      if (ap !== bp) return bp - ap;                 // pinned first
      var apr = normNum(a && a.priority), bpr = normNum(b && b.priority);
      if (apr !== bpr) return bpr - apr;             // higher priority first
      // stable-ish fallback: label/title
      var al = ((a && (a.label || a.title)) || "").toString().toLowerCase();
      var bl = ((b && (b.label || b.title)) || "").toString().toLowerCase();
      if (al < bl) return -1;
      if (al > bl) return 1;
      return 0;
    });
  }

  function applyThumbRow(list){
    var row = document.getElementById("thumbRow");
    if (!row) return;

    // Always clear baked-in tiles so scroller is 100% data-driven
    row.innerHTML = "";

    // If empty, show a single placeholder tile
    if (!Array.isArray(list) || !list.length){
      var ph = buildTile({ href:"#", src:"assets/youtube-thumb.svg", label:"Coming soon", type:"placeholder" });
      ph.classList.add("ovTile");
      row.appendChild(ph);
      return;
    }

    var sorted = sortMedia(list);
    for (var i=0;i<sorted.length;i++){
      var tile = buildTile(sorted[i]);
      tile.classList.add("ovTile");
      row.appendChild(tile);
    }
  }

  // ============================================================
  // Ask Geppetto button (v1)
  // Rule: DO NOT move any existing headings/text. Only ADD the button.
  // Placement: appended inside .gimkitScroller, after the requirement text.
  // Typography: reuses .gimkitTitle so it matches "Gimkit!" exactly.
  // ============================================================
  function ensureAskGeppettoBtn(){
    // Create ONE shared Ask card (outside the Gimkit card) per page.
    var card = document.querySelector(".gimkitCard");
    if (!card) return;

    // If already created, bail.
    if (document.querySelector(".askGeppettoCard")) return;

    // Build wrapper card (matches site card chrome)
    var askCard = document.createElement("div");
    askCard.className = "askGeppettoCard";
    askCard.setAttribute("aria-label", "Ask Geppetto");

    var inner = document.createElement("div");
    inner.className = "askGeppettoInner";
    askCard.appendChild(inner);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "askGeppettoBtn";
    btn.setAttribute("aria-label", "Ask Geppetto");

    // NOTE: We keep the button itself as the clickable hitbox; the card simply frames it.
    btn.addEventListener("click", function(){
      // Placeholder action for now; wire to your bot when ready.
      // For now, we just open the "Ask" target if it exists.
      try{
        var url = window.ASK_GEPETTO_URL || "";
        if (url) window.open(url, "_blank", "noopener");
      }catch(e){}
    });

    var img = document.createElement("img");
    img.alt = "Ask Geppetto!";
    img.src = "assets/ask-geppetto-button.png?v=1";
    img.className = "askGeppettoImg";
    btn.appendChild(img);

    inner.appendChild(btn);

    // Insert the Ask card directly AFTER the Gimkit card (same column),
    // so it is visually its own entity (not part of Gimkit).
    var parent = card.parentNode;
    if (parent){

      // Wrap the Gimkit card + Ask card into a single right-column stack so:
      // - Gimkit card does NOT stretch tall (no empty space inside it)
      // - Ask Geppetto card sits at the bottom, aligning with the left Overview card
      if (!(parent.classList && parent.classList.contains('gimkitStack'))) {
        var stack = document.createElement('div');
        stack.className = 'gimkitStack';

        // No spacer: make the Ask card flex to fill any remaining height in the right column
        parent.insertBefore(stack, card);
        stack.appendChild(card);
        stack.appendChild(askCard);

        // Make sure the Ask card is allowed to grow so we don't leave a dead empty band
        askCard.style.flex = '1 1 auto';
        card.style.flex = '0 0 auto';
      } else {
        // Already wrapped; ensure Ask card is present (idempotent)
        if (!parent.querySelector('.askGeppettoCard')) {
          parent.appendChild(askCard);
          askCard.style.flex = '1 1 auto';
          card.style.flex = '0 0 auto';
        }
      }
    }

    // NOTE: Bottom alignment between the left Overview card and the right stack
    // is handled purely via CSS (flex + spacer + min-height). We previously had
    // a malformed try/catch here that caused a syntax error and broke scrollers
    // on some pages. Intentionally left empty.
  }

  // Add on load, and again after dynamic renders (safe + idempotent)., and again after dynamic renders (safe + idempotent).
  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", ensureAskGeppettoBtn);
  } else {
    ensureAskGeppettoBtn();
  }

  // Also run shortly after scrollers populate.
  setTimeout(ensureAskGeppettoBtn, 250);
  setTimeout(ensureAskGeppettoBtn, 1000);

  function applyCurated(list){
    // Curated grid uses the same "thumb tiles" container if present, otherwise ignore.
    // (Keeps this upgrade non-breaking across all project pages.)
    var wrap = document.getElementById("curatedRow") || document.getElementById("curatedGrid");
    if (!wrap) return;
    if (!Array.isArray(list) || !list.length) return;

    wrap.innerHTML = "";
    var sorted = sortMedia(list);
    for (var i=0;i<sorted.length;i++){
      wrap.appendChild(buildTile(sorted[i]));
    }
  }

  function applyInspiration(list){
    var wrap = document.getElementById("inspirationRow") || document.getElementById("inspireRow");
    if (!wrap) return;
    if (!Array.isArray(list) || !list.length) return;

    wrap.innerHTML = "";
    var sorted = sortMedia(list);
    for (var i=0;i<sorted.length;i++){
      wrap.appendChild(buildTile(sorted[i]));
    }
  }

  function ensureCss(){
    // Minimal focus styling only; avoids fighting your locked CSS
    if (document.getElementById("mediaScrollerSharedCss")) return;
    var css = document.createElement("style");
    css.id = "mediaScrollerSharedCss";
    css.textContent = `
.gimkit-link{ display:block; text-decoration:none; color:inherit; }
.gimkit-link:focus-visible{ outline:3px solid rgba(79,134,198,.8); outline-offset:6px; }
`;
    document.head.appendChild(css);
  }

  async function init(){
    ensureCss();
    var key = getProjectKey();
    var __overviewLoadedFromApi = false;

    // Gimkit (data-driven) — reads assets/gimkit.json and renders ONLY if a join URL exists.
      try{
        var gRes = await fetch(assetUrl("assets/gimkit.json?v=1"), {cache:"no-store"});
        if (gRes.ok){
          var gCfg = await gRes.json();
          var slug = (document.body && document.body.getAttribute("data-project")) || key;
          var gList = (gCfg && gCfg.projects && (gCfg.projects[slug] || gCfg.projects[key])) || [];
          if (Array.isArray(gList) && gList.length){
            
          // ----- Gimkit thumbnail manifest (LOCKED) -----
          var gimkitFiles = [];
          try{
            var mfRes = await fetch(assetUrl("assets/gimkit-manifest.json?v=2"), {cache:"no-store"});
            if (mfRes.ok){
              var mf = await mfRes.json();
              if (mf && Array.isArray(mf.files)) gimkitFiles = mf.files.slice();
            }
          }catch(e){ /* silent */ }

          function hash32(str){
            var h = 0;
            for (var i=0;i<str.length;i++){
              h = ((h<<5) - h) + str.charCodeAt(i);
              h |= 0;
            }
            return h;
          }

          function pickGimkitThumb(joinUrl, idx, slug, files){
            files = Array.isArray(files) ? files : [];
            if (!files.length){
              // fallback to legacy convention (may not exist)
              return (slug + "-" + (idx+1) + ".gif");
            }
            var key = String(joinUrl || ("__NOJOIN__:" + slug + ":" + idx));
            var h = Math.abs(hash32(key));
            return files[h % files.length];
          }

          var tiles = gList.map(function(it, idx){
              return {
                href: it.join,
                // Thumbnails: deterministic pick from assets/gimkit-manifest.json (works for .gif/.webp/.png/.jpg)
                // Ensures the SAME join URL uses the SAME thumbnail across ALL pages.
                src: assetUrl("assets/gimkit/" + pickGimkitThumb(it && it.join, idx, slug, gimkitFiles)),
                label: it.title || ("Gimkit — " + slug + " #" + (idx+1))
              };
            });
            applyGimkit(tiles);
          }
        }
      }catch(e){ /* silent */ }
      
    // ============================================================
// Overview scroller (NEW): Cloudflare Worker playlist aggregator
// Endpoint: /api/overview?project=<key>
// RULE: Overview must be 100% data-driven.
// - Always clear baked-in tiles immediately
// - Always show placeholders if API returns empty or fails
// ============================================================
// Clear any legacy DOM tiles and show placeholder right away
applyThumbRow([]);
__overviewLoadedFromApi = false;

try{
  var wres = await fetch("/api/overview?project=" + encodeURIComponent(key), {cache:"no-store"});
  if (wres && wres.ok){
    var wdata = await wres.json();
    // IMPORTANT: call applyThumbRow even if array is empty (keeps placeholder, never legacy tiles)
    applyThumbRow((wdata && Array.isArray(wdata.overviewMedia)) ? wdata.overviewMedia : []);
    __overviewLoadedFromApi = true;
    // NOTE: curated/inspiration remain supported via legacy JSON if you still use them.
  }
}catch(e){
  // Keep placeholder (already rendered)
}

// ============================================================
// Overview / curated / inspiration (LEGACY: media-links.json)

    // Must never break the page if missing or malformed.
    // Supports both schemas:
    //  A) { "_GLOBAL": {...}, "project-02": {...} }
    //  B) { "projects": { ...same as A... } }
    try{
      var res = await fetch(assetUrl("assets/media-links.json?v=1"), {cache:"no-store"});
      if (res.ok){
        var rawCfg = await res.json();
        var cfg = (rawCfg && rawCfg.projects) ? rawCfg.projects : rawCfg;

        var proj = cfg && cfg[key];
        // Project-level
        if (proj){
          // IMPORTANT: Do NOT overwrite the API-driven Overview scroller if it already loaded.
          // Overview is API-only (no legacy fallback)
          if (proj.curated) applyCurated(proj.curated);
          if (proj.inspiration) applyInspiration(proj.inspiration);
        }

        // Optional global fallbacks
        var glob = cfg && cfg["_GLOBAL"];
        if (glob){
          // Overview is API-only (no legacy fallback)
          if (glob.curated) applyCurated(glob.curated);
          if (glob.inspiration) applyInspiration(glob.inspiration);
        }
      }
    }catch(e){
      // silent: page should still work with baked-in markup
    }
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


// ============================================================
// Overview Media Thumbnail Fallback (v1)
// Purpose: If some YouTube thumbnails fail (private/removed/blocked),
// swap to mqdefault, then to a branded placeholder.
// Scope: Only images inside #thumbRow (the Overview scroller).
// ============================================================
(function(){
  var PLACEHOLDER = assetUrl("assets/youtube-thumb.svg");

  function nextThumb(src){
    if (!src) return PLACEHOLDER;
    // If hqdefault fails, try mqdefault
    if (src.indexOf("/hqdefault.jpg") !== -1) return src.replace("/hqdefault.jpg","/mqdefault.jpg");
    // If mqdefault (or anything else) fails, go placeholder
    return PLACEHOLDER;
  }

  function handleImgError(img){
    try{
      if (!img || img.__tmsThumbFailHandled) return;
      var src = img.getAttribute("src") || "";
      var next = nextThumb(src);

      // Prevent loops: if already placeholder, stop
      if (src.indexOf("assets/youtube-thumb.svg") !== -1) return;

      // Mark if moving to placeholder so we don't loop endlessly
      if (next === PLACEHOLDER) img.__tmsThumbFailHandled = true;

      img.setAttribute("src", next);
    }catch(e){}
  }

  function bindExisting(){
    var row = document.getElementById("thumbRow");
    if (!row) return;

    // Bind per-image onerror (most reliable)
    var imgs = row.querySelectorAll("img");
    imgs.forEach(function(img){
      // If browser already errored before we bind, the capture listener below will still catch.
      img.addEventListener("error", function(){ handleImgError(img); }, true);
    });
  }

  // Capture-phase error listener (error does NOT bubble)
  window.addEventListener("error", function(ev){
    var t = ev && ev.target;
    if (!t || t.tagName !== "IMG") return;

    // Only affect Overview scroller thumbs
    var row = document.getElementById("thumbRow");
    if (!row || !row.contains(t)) return;

    handleImgError(t);
  }, true);

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", bindExisting);
  } else {
    bindExisting();
  }
})();