// TMS STEM Launchpad — Tools Registry + Project Page Renderer
// Designed to be shared by ALL project pages.
// Each project page sets: <body data-project="project-01"> (or other key)

(function(){
  // ----------------------------
  // Utils
  // ----------------------------
  function escapeHtml(str){
    return String(str||"")
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/\"/g,"&quot;")
      .replace(/'/g,"&#39;");
  }


  function getDomainFromUrl_(u){
    try{
      return new URL(u).hostname.replace(/^www\./,'');
    }catch(e){
      return '';
    }
  }

  function logoCandidates_(siteUrl){
    const d = getDomainFromUrl_(siteUrl);
    if(!d) return [];
    // 1) Often nicer brand mark (can fail for some domains)
    const clearbit = `https://logo.clearbit.com/${d}`;
    // 2) Very reliable favicon (works for most domains)
    const gFavicon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(d)}&sz=64`;
    return [clearbit, gFavicon];
  }

  function makeLogoImg_(siteUrl, title){
    const img = document.createElement('img');
    img.className = 'toolLogo';
    img.alt = (title ? `${title} logo` : 'logo');
    img.loading = 'lazy';

    const fallbackLocal = 'assets/default-tool.png';
    const candidates = logoCandidates_(siteUrl);
    let i = 0;

    function tryNext(){
      if(i < candidates.length){
        img.src = candidates[i++];
      }else{
        img.src = fallbackLocal;
      }
    }

    img.onerror = function(){ tryNext(); };
    tryNext();
    return img;
  }

  // ----------------------------
  // Registry (edit here)
  // ----------------------------
  const TOOLS = [
    // Digital Art — Core
    { id:"canva", title:"Canva", badge:"Core", url:"https://www.canva.com/",
      desc:"Fast posters, slides, logos, and templates. Great for quick wins.",
      tags:["Templates","Poster","Logo","Drag & drop"],
      projects:["project-01"]
    },
    { id:"adobe-express", title:"Adobe Express", badge:"Core", url:"https://www.adobe.com/express/",
      desc:"Design + video + quick edits. Nice presets and easy exports.",
      tags:["Poster","Flyer","Video"],
      projects:["project-01"]
    },
    { id:"photopea", title:"Photopea", badge:"Photo editor", url:"https://www.photopea.com/",
      desc:"Photoshop-style editor in a browser. Layers, cutouts, text, effects.",
      tags:["Layers","Cutout","PNG"],
      projects:["project-01"]
    },
    { id:"pixlr", title:"Pixlr", badge:"Photo editor", url:"https://pixlr.com/",
      desc:"Simple photo editing, filters, backgrounds, and quick adjustments.",
      tags:["Filters","Retouch","Background"],
      projects:["project-01"]
    },
    { id:"google-drawings", title:"Google Drawings", badge:"School-safe", url:"https://docs.google.com/drawings/",
      desc:"Super reliable for diagrams, icons, labels, and quick designs.",
      tags:["Shapes","Diagram","Export PNG"],
      projects:["project-01"]
    },
    // Digital Art — Support tools
    { id:"coolors", title:"Coolors Color Palette", badge:"Colors", url:"https://coolors.co/",
      desc:"Generate awesome color palettes and copy hex codes.",
      tags:["Palette","Hex","Color"],
      projects:["project-01"]
    },
    { id:"removebg", title:"remove.bg", badge:"Cutout", url:"https://www.remove.bg/",
      desc:"Remove photo backgrounds quickly (use wisely; check privacy rules).",
      tags:["Background remove","PNG"],
      projects:["project-01"]
    },
    { id:"fontpair", title:"FontPair", badge:"Fonts", url:"https://fontpair.co/",
      desc:"Pick font combinations that look professional.",
      tags:["Fonts","Typography"],
      projects:["project-01"]
    },
    { id:"nounproject", title:"The Noun Project", badge:"Icons", url:"https://thenounproject.com/",
      desc:"Find simple icons (always follow license rules).",
      tags:["Icons","Symbols"],
      projects:["project-01"]
    },
  ];

  // marker for debugging / reassurance
  window.TMSCO_TOOLS_MARKER = "LOADED assets/tools.js ✅";
  window.TMSCO_TOOLS = TOOLS;

  // ----------------------------
  // Renderer
  // ----------------------------
  function qs(sel){ return document.querySelector(sel); }
  function el(tag, cls){ const n=document.createElement(tag); if(cls) n.className=cls; return n; }

  function renderToolCard(t){
    const card = el("div","toolCard");

    const head = el("div","toolHead");
    const left = el("div","toolLeft");
    const logo = makeLogoImg_(t.url, t.title);
    const title = el("div","toolTitle");
    title.textContent = t.title;
    left.appendChild(logo);
    left.appendChild(title);

    const badge = el("div","toolBadge");
    badge.textContent = t.badge || "Tool";

    head.appendChild(left);
    head.appendChild(badge);

    const body = el("div","toolBody");
    const desc = el("div","toolDesc");
    desc.textContent = t.desc || "";
    body.appendChild(desc);

    const tags = el("div","toolTags");
    (t.tags||[]).forEach(tag=>{
      const tg = el("div","tag");
      tg.textContent = tag;
      tags.appendChild(tg);
    });
    body.appendChild(tags);

    const actions = el("div","toolActions");
    const btn = el("button","openBtn");
    btn.type="button";
    btn.textContent="Open";
    btn.addEventListener("click", ()=>{
      window.open(t.url, "_blank", "noopener,noreferrer");
    });

    const note = el("div","smallNote");
    note.textContent = "Opens in new tab";

    actions.appendChild(btn);
    actions.appendChild(note);
    body.appendChild(actions);

    card.appendChild(head);
    card.appendChild(body);

    return card;
  }

  function projectKey(){
    const b = document.body;
    return (b && b.getAttribute("data-project")) ? b.getAttribute("data-project") : "";
  }

  // ----------------------------
  // Project metadata (keys match <body data-project="...">)
  // ----------------------------
  const PROJECT_META = {
    "project-01": { name:"Digital Art", keywords:["digital-art","design","digital","ai","photo-editing","creative-coding"] },
    "project-02": { name:"Photography", keywords:["photography","photo-editing","camera","composition","digital-art"] },
    "project-03": { name:"Music Production", keywords:["music-production","audio","tts","sound","beats"] },
    "project-04": { name:"Language & Website Design", keywords:["website-design","writing","web","coding","language"] },
    "project-05": { name:"Video Production", keywords:["video-production","video","editing","tts","ai"] },
    "project-06": { name:"Coding & Programming", keywords:["coding","programming","game-dev","web","creative-coding"] },
    "project-07": { name:"Circuitry & Electronics", keywords:["circuits","electronics","engineering","robotics"] },
    "project-08": { name:"Robotics", keywords:["robotics","coding","engineering","ai"] },
    "project-09": { name:"Flight / Rockets / Projectiles", keywords:["flight","rockets","projectiles","physics","simulation"] },
    "project-10": { name:"3D Printing & Design", keywords:["3d-printing","design","engineering","digital-art"] },
    "project-11": { name:"Construction & Engineering", keywords:["construction","engineering","physics","simulation"] },
    "project-12": { name:"Laser Engraving", keywords:["laser-engraving","design","photo-editing","digital-art"] },
    "project-13": { name:"Resource Development", keywords:["resource-development","research","economics","systems"] },
    "project-14": { name:"Cricut Design", keywords:["cricut-design","design","digital-art","templates"] },
    "project-15": { name:"CNC Milling", keywords:["cnc-milling","engineering","design","construction"] }
  };

  function ensureControls_(gridEl, projectName){
    if(qs("#toolControls")) return;

    const wrap = el("div","toolControls");
    wrap.id = "toolControls";

    wrap.innerHTML = `
      <div class="toolControlsRow">
        <div class="toolControlsLeft">
          <label class="ctlLabel">View</label>
          <select id="toolView" class="ctlSelect" aria-label="Choose view">
            <option value="recommended">Recommended</option>
            <option value="trusted">Old Website Links</option>
            <option value="new">Explore More</option>
          </select>

          <label class="ctlLabel">Difficulty</label>
          <select id="fDiff" class="ctlSelect" aria-label="Max difficulty">
            <option value="beginner">Beginner</option>
            <option value="intermediate" selected>Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <label class="ctlCheck">
            <input id="fFree" type="checkbox">
            <span>Free only</span>
          </label>

          <label class="ctlCheck">
            <input id="fPaid" type="checkbox">
            <span>Include paid</span>
          </label>
        </div>

        <div class="toolControlsRight">
          <input id="toolSearch" class="ctlSearch" type="search"
                 placeholder="Search tools (ex: sim, tts, ai, photo)..."
                 aria-label="Search tools">
        </div>
      </div>
      <div class="toolControlsHint">
        <b>${escapeHtml(projectName||"Project")}</b> • High confidence = links from the old website. New additions start at medium/low.
      </div>
    `;

    gridEl.parentNode.insertBefore(wrap, gridEl);

    // Wire control events immediately (controls are created dynamically)
    if(!wrap.__wired){
      wrap.__wired = true;
      wrap.addEventListener("input", onControlsChange_);
      wrap.addEventListener("change", onControlsChange_);
    }
  }

  function sectionHeader_(label){
    const h = el("div","toolSection");
    h.textContent = label;
    return h;
  }

  function renderResourceCard_(r){
    const card = el("div","toolCard");

    const head = el("div","toolHead");
    const left = el("div","toolLeft");
    const logo = makeLogoImg_(r.url, r.title);
    const title = el("div","toolTitle");
    left.appendChild(logo);
    title.textContent = r.title || "Resource";
    left.appendChild(title);

    const badge = el("div","toolBadge");
    const conf = (r.confidence||"").toLowerCase();
    const cost = (r.cost||"").toLowerCase();
    const diff = (r.difficulty||"").toLowerCase();
    badge.textContent = `${conf || "unknown"} • ${cost || "?"} • ${diff || "?"}`;

    head.appendChild(left);
    head.appendChild(badge);

    const body = el("div","toolBody");

    const desc = el("div","toolDesc");
    const cats = (r.categories||[]).join(", ");
    const tags = (r.projectTags||[]).join(", ");
    desc.textContent = cats ? `Categories: ${cats}` : (tags ? `Tags: ${tags}` : "External resource");
    body.appendChild(desc);

    const trow = el("div","toolTags");
    const chips = []
      .concat(r.categories||[])
      .concat(r.projectTags||[])
      .concat([r.ageRange, r.cost, r.difficulty])
      .filter(Boolean)
      .slice(0, 8);

    chips.forEach(tag=>{
      const tg = el("div","tag");
      tg.textContent = tag;
      trow.appendChild(tg);
    });
    body.appendChild(trow);

    const actions = el("div","toolActions");
    const btn = el("button","openBtn");
    btn.type="button";
    btn.textContent="Open";
    btn.addEventListener("click", ()=> window.open(r.url, "_blank", "noopener,noreferrer"));

    const note = el("div","smallNote");
    note.textContent = "Opens in new tab";

    actions.appendChild(btn);
    actions.appendChild(note);
    body.appendChild(actions);

    card.appendChild(head);
    card.appendChild(body);

    return card;
  }

  function render(){
    const grid = qs("#toolsGrid");
    const sub = qs("#subline");
    const marker = qs("#markerLine");

    if(marker){
      const resMark = (window.TMSCO_RESOURCES && window.TMSCO_RESOURCES.length)
        ? ` • resources:${window.TMSCO_RESOURCES.length}`
        : " • resources:0";
      marker.textContent = (window.TMSCO_TOOLS_MARKER || "LOADED tools.js") + resMark;
    }

    if(!grid) return;

    const key = projectKey();
    const meta = PROJECT_META[key] || { name:key, keywords:[] };
    const projectTools = (window.TMSCO_TOOLS||[]).filter(t => (t.projects||[]).includes(key));

    // Ensure controls exist (insert once)
    ensureControls_(grid, meta.name);

    // Read controls
    const view = (qs("#toolView") && qs("#toolView").value) || "recommended";
    const q = (qs("#toolSearch") && qs("#toolSearch").value.trim().toLowerCase()) || "";
    const onlyFree = !!(qs("#fFree") && qs("#fFree").checked);
    const allowPaid = !!(qs("#fPaid") && qs("#fPaid").checked);
    const maxDifficulty = (qs("#fDiff") && qs("#fDiff").value) || "intermediate";

    // Build resource lists
    const allRes = (window.TMSCO_RESOURCES||[]).slice();
    const trusted = allRes.filter(r => (r.confidence||"").toLowerCase()==="high");
    const newer = allRes.filter(r => (r.confidence||"").toLowerCase()!=="high");

    function passCost(r){
      if(onlyFree) return (r.cost||"").toLowerCase()==="free";
      if(!allowPaid) return (r.cost||"").toLowerCase()!=="paid";
      return true;
    }
    function diffRank(d){
      d = (d||"").toLowerCase();
      return d==="beginner" ? 1 : (d==="intermediate" ? 2 : 3);
    }
    function passDiff(r){
      const limit = diffRank(maxDifficulty);
      return diffRank(r.difficulty) <= limit;
    }
    function passSearch(r){
      if(!q) return true;
      const blob = (r.title+" "+(r.categories||[]).join(" ")+" "+(r.projectTags||[]).join(" ")).toLowerCase();
      return blob.includes(q);
    }

    function matchProject(r){
      const kw = new Set((meta.keywords||[]).map(s=>String(s).toLowerCase()));
      const tags = new Set(((r.projectTags||[]).concat(r.categories||[])).map(s=>String(s).toLowerCase()));
      if(tags.has(key.toLowerCase())) return true;
      for(const k of kw){ if(tags.has(k)) return true; }
      return false;
    }

    function score(r){
      let s = 0;
      const conf = (r.confidence||"").toLowerCase();
      if(conf==="high") s += 50;
      else if(conf==="medium") s += 20;
      else s += 10;

      if(matchProject(r)) s += 30;

      const cost = (r.cost||"").toLowerCase();
      if(cost==="free") s += 10;
      else if(cost==="freemium") s += 5;

      const d = (r.difficulty||"").toLowerCase();
      if(d==="beginner") s += 8;
      else if(d==="intermediate") s += 4;

      if(r.defaultVisible) s += 6;
      return s;
    }

    function pick(list){
      return list
        .filter(r => passCost(r) && passDiff(r) && passSearch(r))
        .sort((a,b)=> score(b)-score(a));
    }

    const pickedTrusted = pick(trusted);
    const pickedNew = pick(newer);

    // Decide what to show
    let resToShow = [];
    if(view==="trusted"){
      resToShow = pickedTrusted;
    }else if(view==="new"){
      resToShow = pickedNew;
    }else{
      // recommended: project tools + trusted matches (then new matches)
      const trustedMatches = pickedTrusted.filter(matchProject);
      const newMatches = pickedNew.filter(matchProject);
      resToShow = trustedMatches.concat(newMatches);
    }

    // Render
    grid.innerHTML = "";

    // Section 1: Project Tools (curated)
    if(projectTools.length){
      grid.appendChild(sectionHeader_("Project Tools (curated)"));
      projectTools.forEach(t => grid.appendChild(renderToolCard(t)));
    }

    // Section 2: External Resources
    const cap = (view==="recommended") ? 18 : 9999;
    const shown = resToShow.slice(0, cap);

    if(shown.length){
      const label = view==="trusted"
        ? "Old Website Links (High confidence)"
        : (view==="new" ? "Explore More (Medium/Low confidence)" : "Recommended Links (ranked)");
      grid.appendChild(sectionHeader_(label));
      shown.forEach(r => grid.appendChild(renderResourceCard_(r)));
    }else{
      grid.appendChild(sectionHeader_("No matches"));
      const empty = el("div","toolDesc");
      empty.textContent = "Try removing filters or searching a different keyword.";
      grid.appendChild(empty);
    }

    if(sub){
      const nRes = shown.length;
      sub.textContent = `Showing ${projectTools.length} curated tools • ${nRes} links`;
    }
  }

  function onControlsChange_(){
    // Re-render with updated filters
    render();
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    // Hook controls (once)
    const root = qs("#toolControls");
    if(root && !root.__wired){
      root.__wired = true;
      root.addEventListener("input", onControlsChange_);
      root.addEventListener("change", onControlsChange_);
    }
    render();
  });
})();