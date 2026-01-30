// ===================== assets/site.js (TOP) =====================
(function(){
  const data = window.TMSCO_DATA || { projects:[], quickLaunch:[] };

  /* ======================================================
     QUICK LAUNCH — IMAGE ICON CARDS
     ====================================================== */
  const qWrap = document.getElementById('quickLaunch');
  const qLeft = document.getElementById('qLeft');
  const qRight = document.getElementById('qRight');

  const QUICK_ICON_IMG = {
    "Daily Work Submit": "assets/quick-icons/daily-work.png",
    "Hall Pass": "assets/quick-icons/hall-pass.png",
    "Student Writing App": "assets/quick-icons/stwrapp.png",
    "MineShaft Web Apps & Games": "assets/quick-icons/mineshaft.png",
    "Microsoft Office": "assets/quick-icons/office.png",
    "BlueTube Videos App": null
  };

  function bluePlaySvg(){
    return `
      <svg viewBox="0 0 28 20" width="28" height="20" aria-hidden="true" style="display:block">
        <rect x="0" y="0" width="28" height="20" rx="6" fill="#2b6cff"/>
        <polygon points="11,6 11,14 18,10" fill="#ffffff"/>
      </svg>
    `;
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function quickCardHTML(item){
    const src = QUICK_ICON_IMG[item.title];
    const iconHtml = src ? `<img src="${src}" alt="">` : bluePlaySvg(); // BlueTube
    const displayTitle = ({
      "Daily Work Submit": "Daily Work",
      "Hall Pass": "Hall Pass",
      "Student Writing App": "STWRAPP",
      "MineShaft Web Apps & Games": "MineShaft",
      "BlueTube Videos App": "BlueTube",
      "Microsoft Office": "Office"
    }[item.title] || item.title);

    return `
      <a class="qcard" href="${item.url}" target="_blank" rel="noopener">
        <div class="qIcon">${iconHtml}</div>
        <div class="qMeta">
          <div class="qTitle">${escapeHtml(displayTitle)}</div>
          <div class="qHint">Open tool</div>
        </div>
        <div class="qGo">↗</div>
      </a>
    `;
  }

  if(qWrap){
    qWrap.innerHTML = data.quickLaunch.map(quickCardHTML).join('');
  }

  function scrollQuick(dir){
    if(!qWrap) return;
    const step = Math.max(260, Math.floor(qWrap.clientWidth * 0.85));
    qWrap.scrollBy({ left: dir * step, behavior: 'smooth' });
  }

  function updateQuickArrows(){
    if(!qWrap || !qLeft || !qRight) return;
    const max = qWrap.scrollWidth - qWrap.clientWidth;
    const x = qWrap.scrollLeft;
    qLeft.disabled = x <= 2;
    qRight.disabled = x >= max - 2;
  }

  if(qLeft && qRight && qWrap){
    qLeft.addEventListener('click', ()=>scrollQuick(-1));
    qRight.addEventListener('click', ()=>scrollQuick(1));
    qWrap.addEventListener('scroll', ()=>requestAnimationFrame(updateQuickArrows));
    window.addEventListener('resize', ()=>requestAnimationFrame(updateQuickArrows));
    requestAnimationFrame(updateQuickArrows);
  }

  /* ======================================================
     PROJECTS + FILTERS
     ====================================================== */
  const pills = document.getElementById('pills');
  const search = document.getElementById('search');
  const scroller = document.getElementById('projectScroller');
  const countEl = document.getElementById('count');

  const TAGS = ["All","Creative Tech","Computing","Engineering","Fabrication"];
  let activeTag = "All";

  if(pills){
    pills.innerHTML = TAGS.map(t => `
      <div class="pill ${t==="All"?"active":""}" data-tag="${t}">${t}</div>
    `).join('');

    pills.addEventListener('click', e=>{
      const pill = e.target.closest('.pill');
      if(!pill) return;
      activeTag = pill.dataset.tag;
      pills.querySelectorAll('.pill')
        .forEach(p=>p.classList.toggle('active', p.dataset.tag===activeTag));
      render();
    });
  }

  function matches(p, q){
    if(!q) return true;
    return (p.title + p.blurb + p.tag).toLowerCase().includes(q.toLowerCase());
  }

  function filterProjects(){
    const q = (search?.value || "").trim();
    return data.projects.filter(p => (activeTag==="All" || p.tag===activeTag) && matches(p, q) );
  }

  function cardHTML(p){
    return `
      <a class="card" href="${p.url}" target="_blank" rel="noopener">
        <div class="imgWrap">
          <img class="tileImg" src="${p.image}" alt="${escapeHtml(p.title)}">
        </div>
        <div class="kicker">
          <span>Project ${p.id}</span>
          <span class="badge" data-tag="${p.tag}">${escapeHtml(p.tag)}</span>
        </div>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.blurb)}</p>
        <div class="go">
          <span>Open project page</span>
          <span>↗</span>
        </div>
      </a>
    `;
  }

  function render(){
    const items = filterProjects();
    if(countEl) countEl.textContent = `${items.length} projects`;
    if(scroller) scroller.innerHTML = items.map(cardHTML).join('');
  }

  if(search){
    let t;
    search.addEventListener('input', ()=>{
      clearTimeout(t);
      t = setTimeout(render, 80);
    });
  }

  render();
})();
// ===================== assets/site.js (BOTTOM) =====================
