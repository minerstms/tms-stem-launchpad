// ===================== assets/registry.js (TOP) =====================
/*
  TMS STEM — Registry + Marquee (v1)
  Source of truth: Google Sheet 1-SVEtDNnxj3GRybvDdUZEstjCBGIlxe2937h4woR_x0
  Columns expected (by header name): createdAt, title, url, type, projects, imageViewUrl, thumbUrl, marquee
  Notes:
  - Uses Google Visualization (gviz) JSON feed (no API key).
  - Sheet must be shared as Viewer to "Anyone with the link".
*/
(function(){
  "use strict";

  const SHEET_ID = "1-SVEtDNnxj3GRybvDdUZEstjCBGIlxe2937h4woR_x0";
  const SHEET_GID = "0";
  // IMPORTANT: headers=1 makes the first sheet row become column labels in the gviz feed.
  // Without this, Google may label columns as A,B,C... and our header-name mapping won't work.
  const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?gid=${SHEET_GID}&headers=1&tqx=out:json`;

  function $(sel, root){
    return (root||document).querySelector(sel);
  }
  function $all(sel, root){
    return Array.from((root||document).querySelectorAll(sel));
  }

  function cleanText(v){
    if(v==null) return "";
    return String(v).replace(/\s+/g," ").trim();
  }

  function parseGviz(text){
    // gviz returns: /*O_o*/\ngoogle.visualization.Query.setResponse(<json>);
    const m = text.match(/setResponse\(({[\s\S]*})\)\s*;?\s*$/);
    if(!m) throw new Error("GVIZ_PARSE_FAIL");
    return JSON.parse(m[1]);
  }

  function rowToObj(table, row){
    const obj={};
    for(let c=0;c<table.cols.length;c++) {
      const col = table.cols[c];
      const key = cleanText(col.label || col.id || "").toLowerCase();
      if(!key) continue;
      const cell = row.c[c];
      // Prefer formatted, then value
      const val = cell ? (cell.f != null ? cell.f : cell.v) : "";
      obj[key] = val;
    }
    return obj;
  }

  function normalizeRow(r){
    const o={};
    for(const k in r){
      o[k.toLowerCase()] = r[k];
    }
    // Normalize common names
    o.createdat = o.createdat || o.created_at || "";
    o.imageviewurl = o.imageviewurl || o.imageview || o.image || "";
    o.thumburl = o.thumburl || o.thumb || "";
    o.projects = o.projects || o.project || "";
    o.type = (o.type || "").toString().toLowerCase();
    return o;
  }

  async function fetchRegistry(){
    const res = await fetch(GVIZ_URL, { cache: "no-store" });
    const text = await res.text();
    const json = parseGviz(text);
    const table = json.table;
    const rows = (table.rows || []).map(r => normalizeRow(rowToObj(table, r)));
    // For marquee we need ALL rows; cards will be filtered later.
    return rows;
}

  function pickLatestMarquee(rows){
    // Prefer the last non-empty marquee value in sheet order.
    // This supports "marquee-only" rows where other columns are blank (including createdAt).
    for(let i=rows.length-1;i>=0;i--){
      const t = cleanText(rows[i].marquee);
      if(t) return t;
    }
    return "";
  }

  function normalizeProjectName(name){
    return cleanText(name).toLowerCase();
  }

  function rowHasProject(row, projectName){
    const p = normalizeProjectName(projectName);
    const cell = cleanText(row.projects);
    if(!cell) return false;
    // Allow comma-separated or newline-separated lists
    const parts = cell.split(/[,\n]/).map(s=>normalizeProjectName(s)).filter(Boolean);
    return parts.includes(p);
  }


// ---------- YouTube thumb fallback (safe, overview scroller only) ----------
function extractYouTubeId(url){
  url = cleanText(url);
  if(!url) return "";

  // youtu.be/VIDEOID
  let m = url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/i);
  if(m && m[1]) return m[1];

  // youtube.com/watch?v=VIDEOID
  m = url.match(/[?&]v=([A-Za-z0-9_-]{6,})/i);
  if(m && m[1]) return m[1];

  // youtube.com/embed/VIDEOID
  m = url.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/i);
  if(m && m[1]) return m[1];

  // youtube.com/shorts/VIDEOID
  m = url.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/i);
  if(m && m[1]) return m[1];

  return "";
}

function isYouTubeRow(r){
  const u = cleanText(r && r.url).toLowerCase();
  const t = cleanText(r && r.type).toLowerCase();
  return t.includes("youtube") || u.includes("youtube.com") || u.includes("youtu.be");
}

function youtubeThumbFromUrl(url){
  const id = extractYouTubeId(url);
  if(!id) return "";
  return "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
}

  function makeRegistryCard(r){
    const a = document.createElement("a");
    a.className = "card registryCard";
    a.href = r.url;
    a.target = "_blank";
    a.rel = "noopener";

let imgSrc = cleanText(r.thumburl) || cleanText(r.imageviewurl) || "";

// If it’s a YouTube row and no thumb was provided, generate a reliable YouTube thumb
if(!imgSrc && isYouTubeRow(r)){
  imgSrc = youtubeThumbFromUrl(r.url);
}

if(!imgSrc) imgSrc = "assets/default-tool.png";

    const typeLabel = (r.type || "").toString().toLowerCase();
    let badgeText = "Registry";
    if(typeLabel.includes("youtube")) badgeText = "YouTube";
    else if(typeLabel.includes("gimkit")) badgeText = "Gimkit";
    else if(typeLabel.includes("tool")) badgeText = "Tool";

    a.innerHTML = `
      <div class="imgWrap">
        <img class="tileImg" src="${imgSrc}" alt="${cleanText(r.title).replace(/"/g,'&quot;')}" loading="lazy"
             onerror="this.onerror=null;this.src='assets/default-tool.png';" />
      </div>
      <div class="kicker">
        <span>${cleanText(r.title)}</span>
        <span class="badge" data-tag="Creative Tech">${badgeText}</span>
      </div>
      <div class="blurb">${cleanText(r.projects) ? cleanText(r.projects) : "Added to registry"}</div>
    `;
    return a;
  }

  function renderIntoTrack(trackEl, rows, limit){
    if(!trackEl) return;
    const list = rows.slice().sort((a,b)=>{
      const da = Date.parse(a.createdat || "") || 0;
      const db = Date.parse(b.createdat || "") || 0;
      return db - da;
    });
    const top = (limit ? list.slice(0, limit) : list);
    trackEl.innerHTML = "";
    top.forEach(r => trackEl.appendChild(makeRegistryCard(r)));
  }

  function getCurrentProjectName(){
    // Prefer explicit marker if present
    const meta = document.documentElement.getAttribute("data-project");
    if(meta) return meta.trim();
    // h1 text (project pages)
    const h1 = $("h1");
    if(h1 && cleanText(h1.textContent)) return cleanText(h1.textContent);
    // Fallback to document title before " — "
    const t = (document.title || "").split(" — ")[0].trim();
    return t || "";
  }

  function setMarqueeText(text, isError){
    const el = $("#marqueeText");
    if(!el) return;
    if(text){
      el.textContent = text;
      el.classList.remove("marqueeError");
    } else {
      el.textContent = isError ? "(Marquee unavailable — sheet not public yet)" : "(No marquee text yet)";
      el.classList.add("marqueeError");
    }
  }

  async function boot(){
    // If no marquee element, don't do anything.
    if(!$("#marqueeBar")) return;

    try {
      const rows = await fetchRegistry();
      // Marquee
      const m = pickLatestMarquee(rows);
      setMarqueeText(m, false);
      // Debug hint in DOM (view source / devtools)
      try{ $("#marqueeBar").setAttribute("data-registry-rows", String(rows.length)); $("#marqueeBar").setAttribute("data-registry-has-marquee", m ? "1":"0"); }catch(e){}

      // Home latest uploads (only rows with title+url)
      const cardRows = rows.filter(r => cleanText(r.title) && cleanText(r.url));
      renderIntoTrack($("#registryScroller"), cardRows, 30);
      const rc = $("#registryCount");
      if(rc) rc.textContent = `${cardRows.length} uploads`;

      // Project page uploads (filtered)
      const projName = getCurrentProjectName();
      const filtered = projName ? cardRows.filter(r => rowHasProject(r, projName)) : [];
      renderIntoTrack($("#registryProjectScroller"), filtered, 30);
      const pc = $("#registryProjectCount");
      if(pc) pc.textContent = `${filtered.length} uploads`;
      const pn = $all(".registryProjectName");
      pn.forEach(x => x.textContent = projName || "this project");

    } catch (e) {
      setMarqueeText("", true);
      // Leave scrollers empty quietly
      const rc = $("#registryCount"); if(rc) rc.textContent = "0 uploads";
      const pc = $("#registryProjectCount"); if(pc) pc.textContent = "0 uploads";
      console.warn("Registry fetch failed:", e);
    }
  }

  if(document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
// ===================== assets/registry.js (BOTTOM) =====================
