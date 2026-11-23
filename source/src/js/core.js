"use strict";
const D=document, R=D.documentElement;
const $=(s,r)=>(r||D).querySelector(s), $$=(s,r)=>Array.from((r||D).querySelectorAll(s));
const PFX="aster:";
const store={get(k,d){try{const v=localStorage.getItem(PFX+k);return v===null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(PFX+k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem(PFX+k)}catch(e){}}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const todayISO=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");};
const fmtDate=iso=>{try{const [y,m,d]=iso.split("-").map(Number);return new Date(y,m-1,d).toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"});}catch(e){return iso;}};
R.setAttribute("lang","en-AU");


/* ---------- Navigation: header pills, the Explore sheet, page heads and keep-reading links ---------- */
const navItem=id=>NAV.find(n=>n.id===id);
const areaOf=id=>{const n=navItem(id);return n&&n.a?AREAS.find(a=>a.id===n.a):null;};
function ico(name,cls){return `<svg class="${cls||"i"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]||""}</svg>`;}
/* A rosette for page heads: twelve round petals around a disc, in the area's colour */
function rosette(icon){let c="";for(let k=0;k<12;k++){const a=k*Math.PI/6;c+=`<circle cx="${(33*Math.cos(a)).toFixed(2)}" cy="${(33*Math.sin(a)).toFixed(2)}" r="17"/>`;}
  return `<svg class="ros" viewBox="-54 -54 108 108" aria-hidden="true" focusable="false"><g class="ros-h" transform="scale(1.07)">${c}<circle r="36"/></g><g class="ros-p">${c}<circle r="36"/></g></svg>${ico(icon,"ros-i")}`;}
$("#areas").innerHTML=`<li><a href="#home" data-area="home">Home</a></li>`+AREAS.map(a=>`<li><a href="#${a.first}" data-area="${a.id}">${a.l}</a></li>`).join("");
$("#exTiles").innerHTML=AREAS.map(a=>`<a href="#${a.first}" data-area="${a.id}" class="${a.t}">${ico(a.i)}<span>${a.full}</span><small>${a.d}</small></a>`).join("");
$("#exMore").innerHTML=["home","bloom","start","family","clinicians","evidence","support"].map(id=>`<li><a href="#${id}" data-id="${id}">${ico(PAGE_ICON[id]||"info")}<span>${navItem(id).l}</span></a></li>`).join("");
$("#fitList").innerHTML=FIT.map(f=>`<a class="fit" href="#${f.go}"><span class="fit-i">${ico(f.i)}</span><span><b>${f.t}</b><small>${f.d}</small></span>${ico("arrow","fit-go")}</a>`).join("")+
  `<p class="small muted fit-help">Need someone now? <a href="#support">Getting help</a> lists crisis lines and services for where you live.</p>`;
const READ=NAV.filter(n=>n.id!=="home");
$$(".view").forEach(v=>{const id=v.dataset.view;if(id==="home")return;const a=areaOf(id);
  v.style.setProperty("--area-m",a?a.m:"var(--gold)");
  const head=v.querySelector(":scope>.vhead");
  if(head){head.style.setProperty("--area",a?`var(--${a.t})`:"var(--gold)");head.style.setProperty("--area-ink",a?`var(--${a.t}-ink)`:"var(--gold-ink)");
    const b=D.createElement("span");b.className="vbadge";b.innerHTML=rosette(a?a.i:(PAGE_ICON[id]||"info"));head.appendChild(b);head.classList.add("has-badge");
    const sibs=a?NAV.filter(n=>n.a===a.id):[];
    if(sibs.length>1){const nv=D.createElement("nav");nv.setAttribute("aria-label","Pages in "+a.full);nv.innerHTML=`<ul class="vtabs">${sibs.map(n=>`<li><a href="#${n.id}"${n.id===id?' aria-current="page"':""}>${n.l}</a></li>`).join("")}</ul>`;head.appendChild(nv);}}
  const i=READ.findIndex(n=>n.id===id);const p=READ[i-1],n=READ[i+1];const nav=D.createElement("nav");nav.className="pager";nav.setAttribute("aria-label","Keep reading");
  nav.innerHTML=(p?`<a class="prev" href="#${p.id}"><span class="dir">Back</span><span>${p.l}</span></a>`:"")+(n?`<a class="next" href="#${n.id}"><span class="dir">Next</span><span>${n.l}</span></a>`:"");
  if(p||n)v.appendChild(nav);});
function markCurrent(id){const ar=areaOf(id);
  $$("#areas a").forEach(a=>{const k=a.dataset.area;const on=k==="home"?id==="home":(ar&&k===ar.id);if(on)a.setAttribute("aria-current",a.getAttribute("href")==="#"+id?"page":"true");else a.removeAttribute("aria-current");});
  $$("#exTiles a").forEach(a=>{if(ar&&a.dataset.area===ar.id)a.setAttribute("aria-current",a.getAttribute("href")==="#"+id?"page":"true");else a.removeAttribute("aria-current");});
  $$("#exMore a").forEach(a=>{if(a.dataset.id===id)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});
  $$(".dock [data-dock]").forEach(a=>{if(a.dataset.dock===id)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});}

/* ---------- Evidence chips ---------- */
function evHTML(g,refs){let h="";if(g==="cons")return `<span class="cn">clinical consensus</span>`;if(g&&GRADE[g])h+=`<span class="g ${GRADE[g][0]}">${GRADE[g][1]}</span>`;const ids=(refs||"").split(/\s+/).filter(Boolean);ids.forEach(id=>{const r=REFS[id];if(r)h+=`<button class="cite" data-r="${id}" aria-haspopup="dialog" aria-expanded="false">${esc(r.s)}</button>`;else console.warn("Missing ref",id);});if(!ids.length&&g)h+=`<span class="cn">clinical consensus</span>`;return h;}
function renderEv(root){$$(".ev",root).forEach(el=>{if(el.dataset.done)return;el.innerHTML=evHTML(el.dataset.g,el.dataset.r);el.dataset.done="1";});}
function wireTerms(root){$$("[data-t]",root).forEach(b=>{if(b.tagName!=="BUTTON")return;b.setAttribute("aria-haspopup","dialog");b.setAttribute("aria-expanded","false");if(!b.type)b.type="button";});}

/* ---------- Popover ---------- */
const pop=$("#pop");let popFor=null;
function refLinks(r){let l="";if(r.p)l+=`<a href="https://pubmed.ncbi.nlm.nih.gov/${r.p}/" target="_blank" rel="noopener">PMID ${r.p}</a>`;if(r.d)l+=`<a href="https://doi.org/${r.d}" target="_blank" rel="noopener">DOI ${esc(r.d)}</a>`;if(r.u)l+=`<a href="${r.u}" target="_blank" rel="noopener">Source</a>`;return l;}
function refPop(id){const r=REFS[id];if(!r)return"<p>Source not found.</p>";return `<h4>${esc(r.s)}</h4><p class="small muted">${esc(r.k)}${r.g?` · <span class="g ${GRADE[r.g][0]}">${GRADE[r.g][1]}</span>`:""}</p><p class="small"><strong>Who:</strong> ${esc(r.pop)}</p><p class="small"><strong>Found:</strong> ${esc(r.f)}</p><p class="small muted">${esc(r.c)}</p><div class="links">${refLinks(r)}<a href="#evidence" data-goref="${id}">Open in library</a></div>`;}
function placePop(t){const r=t.getBoundingClientRect();const pw=pop.offsetWidth,ph=pop.offsetHeight;let left=Math.min(Math.max(12,r.left+r.width/2-pw/2),window.innerWidth-pw-12);let top=r.bottom+8;if(top+ph>window.innerHeight-12)top=Math.max(12,r.top-ph-8);pop.style.left=left+"px";pop.style.top=top+"px";}
function openPop(t,html,label){pop.innerHTML=html;pop.setAttribute("aria-label",label||"Details");pop.hidden=false;popFor=t;t.setAttribute("aria-expanded","true");placePop(t);}
function closePop(){if(popFor)popFor.setAttribute("aria-expanded","false");pop.hidden=true;popFor=null;}
let pendingRef=null;
D.addEventListener("click",e=>{
  const go=e.target.closest("[data-goref]");if(go){pendingRef=go.dataset.goref;closePop();if(location.hash==="#evidence"){flashRef();e.preventDefault();}return;}
  const t=e.target.closest(".t"),c=e.target.closest(".cite");
  if(t){e.preventDefault();if(popFor===t){closePop();return;}const g=GLOSS[t.dataset.t];openPop(t,g?`<h4>${g[0]}</h4><p>${g[1]}</p>`:`<p>${esc(t.textContent)}</p>`,g?g[0]:"Meaning");return;}
  if(c){e.preventDefault();if(popFor===c){closePop();return;}openPop(c,refPop(c.dataset.r),"Source: "+(REFS[c.dataset.r]||{}).s);return;}
  if(popFor&&!pop.contains(e.target))closePop();
});
D.addEventListener("keydown",e=>{if(e.key==="Escape"&&popFor){const f=popFor;closePop();f.focus();}});
window.addEventListener("resize",()=>{if(popFor)placePop(popFor);});
window.addEventListener("scroll",()=>{if(popFor)placePop(popFor);},{passive:true});

/* ---------- Theme and text size ---------- */
let theme=store.get("theme","");
function applyTheme(){if(theme==="light"||theme==="dark")R.setAttribute("data-theme",theme);else R.removeAttribute("data-theme");$$("[data-themeset]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.themeset===(theme||"auto")?"true":"false"));}
applyTheme();
let size=store.get("size","");
function applySize(){if(size)R.setAttribute("data-size",size);else R.removeAttribute("data-size");$$("[data-sizeset]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.sizeset===size?"true":"false"));}
applySize();
const themeHooks=[];function onTheme(f){themeHooks.push(f);}function runThemeHooks(){themeHooks.forEach(f=>{try{f();}catch(e){console.error(e);}});}
try{matchMedia("(prefers-color-scheme: dark)").addEventListener("change",runThemeHooks);}catch(e){}

/* ---------- Toast and copy ---------- */
let toastT=0;function toast(msg){const t=$("#toast");t.textContent=msg;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>{t.hidden=true;},2400);}
function copyText(text,fallbackEl){
  const fail=()=>{if(fallbackEl){fallbackEl.value=text;fallbackEl.hidden=false;fallbackEl.focus();fallbackEl.select();toast("Select the text below and copy it");}else toast("Copy isn't available here");};
  try{navigator.clipboard.writeText(text).then(()=>toast("Copied"),fail);}catch(e){fail();}
}
D.addEventListener("click",e=>{const b=e.target.closest("[data-copy]");if(b)copyText(b.dataset.copy);});
const canPrint=(()=>{try{return window.self===window.top;}catch(e){return false;}})();
/* Inside a framed viewer, downloads are often refused: offer to copy the text instead */
const inFrame=!canPrint;
function saveText(text,filename,what){if(!inFrame){try{const blob=new Blob([text],{type:filename.endsWith(".json")?"application/json":"text/plain"});const a=D.createElement("a");a.href=URL.createObjectURL(blob);a.download=filename;D.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);toast("Downloading "+what);return;}catch(e){}}
  try{navigator.clipboard.writeText(text).then(()=>toast("Copied "+what+". Paste it somewhere private."),()=>toast("Copying isn't allowed here"));}catch(e){toast("Copying isn't allowed here");}}
$$("[data-print]").forEach(b=>{b.hidden=!canPrint;b.addEventListener("click",()=>{$$(".view.on details").forEach(d=>{if(!d.open){d.open=true;d.dataset.reclose="1";}});window.print();});});
window.addEventListener("afterprint",()=>{$$("details[data-reclose]").forEach(d=>{d.open=false;delete d.dataset.reclose;});});

/* ---------- Motion: flowing or still, and always still if the device asks ---------- */
const reduceMQ=matchMedia("(prefers-reduced-motion: reduce)");
function motionOK(){if(store.get("motion","flow")==="still")return false;try{return !reduceMQ.matches;}catch(e){return true;}}
const motionHooks=[];function onMotion(f){motionHooks.push(f);}
function setMotion(){R.classList.toggle("motion",motionOK());motionHooks.forEach(f=>{try{f();}catch(e){console.error(e);}});}
try{reduceMQ.addEventListener("change",setMotion);}catch(e){}

/* ---------- Plays only while on screen (diagrams, figures, hero) ---------- */
function whenVisible(el,cb){if(!el)return;if(!("IntersectionObserver" in window)){cb(true);return;}new IntersectionObserver(es=>{cb(es[es.length-1].isIntersecting);},{threshold:.08}).observe(el);}

/* ---------- Evidence library ---------- */
let refTopic="all";
function initLibrary(){
  $("#refTopics").innerHTML=Object.keys(TOPICS).map(k=>`<button type="button" class="chip" data-topic="${k}" aria-pressed="${k==="all"}">${TOPICS[k]}</button>`).join("");
  $("#refList").innerHTML=Object.keys(REFS).map(id=>{const r=REFS[id];return `<article class="ref" id="ref-${id}" data-topic="${r.t}" data-text="${esc((r.s+" "+r.c+" "+r.f+" "+r.pop+" "+(TOPICS[r.t]||"")).toLowerCase())}"><div class="meta"><span>${TOPICS[r.t]||""}</span><span>${esc(r.k)}</span>${r.g?`<span class="g ${GRADE[r.g][0]}">${GRADE[r.g][1]}</span>`:""}</div><h4>${esc(r.s)}</h4><p>${esc(r.f)}</p><p class="small muted"><strong>Who:</strong> ${esc(r.pop)}</p><p class="small">${esc(r.c)}</p><div class="meta">${refLinks(r)}</div></article>`;}).join("");
  $("#refTopics").addEventListener("click",e=>{const b=e.target.closest("[data-topic]");if(!b)return;refTopic=b.dataset.topic;$$("#refTopics .chip").forEach(c=>c.setAttribute("aria-pressed",c===b?"true":"false"));filterRefs();});
  $("#refQ").addEventListener("input",filterRefs);filterRefs();
}
function filterRefs(){const q=$("#refQ").value.trim().toLowerCase();let n=0;$$("#refList .ref").forEach(a=>{const ok=(refTopic==="all"||a.dataset.topic===refTopic)&&(!q||q.split(/\s+/).every(w=>a.dataset.text.includes(w)));a.hidden=!ok;if(ok)n++;});$("#refCount").textContent=n+" of "+Object.keys(REFS).length+" sources";}
function flashRef(){if(!pendingRef)return;const el=D.getElementById("ref-"+pendingRef);pendingRef=null;if(!el)return;refTopic="all";$("#refQ").value="";$$("#refTopics .chip").forEach(c=>c.setAttribute("aria-pressed",c.dataset.topic==="all"?"true":"false"));filterRefs();setTimeout(()=>{el.scrollIntoView({block:"center",behavior:motionOK()?"smooth":"auto"});el.classList.remove("flash");void el.offsetWidth;el.classList.add("flash");},60);}

/* ---------- Router ---------- */
const views=$$(".view"),ids=views.map(v=>v.dataset.view);
const viewHooks={};function onView(id,f){(viewHooks[id]=viewHooks[id]||[]).push(f);}
const leaveHooks=[];function onLeave(f){leaveHooks.push(f);}
let current=null;
function show(id,focus){if(!ids.includes(id))id="home";
  if(current&&current!==id)leaveHooks.forEach(f=>{try{f(current,id);}catch(e){console.error(e);}});
  views.forEach(v=>v.classList.toggle("on",v.dataset.view===id));markCurrent(id);closePop();
  $$("dialog[open]").forEach(d=>{try{d.close();}catch(e){}});
  window.scrollTo(0,0);current=id;
  const vt=navItem(id);D.title=(vt&&id!=="home"?vt.l+" · ":"")+"Aster";
  if(focus){const h=$(".view.on h1, .view.on h2");if(h){h.setAttribute("tabindex","-1");h.focus({preventScroll:true});}}
  if(id==="evidence")flashRef();
  afterShow(id);}
function route(f){show((location.hash||"").replace("#","")||"home",f);}
window.addEventListener("hashchange",()=>route(true));
function openDlg(d){if(!d)return;try{d.showModal();}catch(e){d.setAttribute("open","");}const h=d.querySelector(".dlg-head h2");if(h){h.setAttribute("tabindex","-1");h.focus({preventScroll:true});}}
$("#exploreBtn").addEventListener("click",()=>openDlg($("#navDlg")));$("#dockExplore").addEventListener("click",()=>openDlg($("#navDlg")));
["#navDlg","#fitDlg"].forEach(s=>{const d=$(s);d.addEventListener("click",e=>{if(e.target.closest("a[href^='#']")||e.target===d)d.close();});});
D.addEventListener("click",e=>{if(e.target.closest("[data-open-fit]"))openDlg($("#fitDlg"));});
function closeSearch(f){const s=$("#searchBox");if(!s.classList.contains("open"))return;s.classList.remove("open");$("#searchToggle").setAttribute("aria-expanded","false");if(f)$("#searchToggle").focus();}
$("#searchToggle").addEventListener("click",()=>{const s=$("#searchBox");if(s.classList.contains("open")){closeSearch(false);return;}s.classList.add("open");$("#searchToggle").setAttribute("aria-expanded","true");$("#q").focus();});
D.addEventListener("click",e=>{const c=e.target.closest("dialog [data-close]");if(c){const d=c.closest("dialog");if(d)d.close();}});

/* ---------- Search ---------- */
const IDX=[];const extraIndex=[];function addToIndex(f){extraIndex.push(f);}
function buildIndex(){IDX.length=0;
  views.forEach(v=>{const vid=v.dataset.view,vl=(NAV.find(n=>n.id===vid)||{}).l||"";
    $$("h1,h2,h3,h4,p,li,.s-title,dt,dd,td,figcaption",v).forEach(el=>{
      if(el.closest(".pager,#refList,.no-index,svg,.vtabs"))return;
      if(/^(P|LI|DD|TD)$/.test(el.tagName)&&el.querySelector("p,li,ul,ol,dl,table"))return;
      const txt=el.textContent.replace(/\s+/g," ").trim();if(txt.length<3)return;
      IDX.push({k:"el",v:vid,vl,el,t:txt,low:txt.toLowerCase(),h:/^H[1-4]$/.test(el.tagName)||el.classList.contains("s-title")});});});
  extraIndex.forEach(f=>{try{f(IDX);}catch(e){console.error(e);}});
  Object.keys(REFS).forEach(id=>{const r=REFS[id];IDX.push({k:"ref",id,vl:"Evidence library",t:r.s+": "+r.f,low:(r.s+" "+r.c+" "+r.f).toLowerCase(),h:false});});}
function snippet(t,words){const low=t.toLowerCase();let i=low.indexOf(words[0]);if(i<0)i=0;let s=Math.max(0,i-50),e=Math.min(t.length,i+110);let out=(s>0?"…":"")+t.slice(s,e)+(e<t.length?"…":"");out=esc(out);words.forEach(w=>{if(w.length<2)return;out=out.replace(new RegExp("("+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","ig"),"<mark>$1</mark>");});return out;}
let hits=[],sel=-1;const qEl=$("#q"),qRes=$("#qres");
function runSearch(){const q=qEl.value.trim().toLowerCase();if(q.length<2){qRes.hidden=true;qEl.setAttribute("aria-expanded","false");return;}
  const words=q.split(/\s+/).filter(Boolean);
  hits=IDX.filter(x=>words.every(w=>x.low.includes(w))).map(x=>({x,sc:(x.h?3:0)+(x.low.startsWith(words[0])?2:0)+(x.k!=="el"?1:0)-x.t.length/600})).sort((a,b)=>b.sc-a.sc).slice(0,9).map(o=>o.x);
  sel=-1;qEl.removeAttribute("aria-activedescendant");qRes.innerHTML=hits.length?hits.map((h,i)=>`<button type="button" role="option" id="qr-${i}" data-i="${i}" aria-selected="false"><span class="rv">${esc(h.vl)}</span><span class="rs">${snippet(h.t,words)}</span></button>`).join(""):`<p class="empty">No matches. Try a simpler word, such as "voice", "binding" or "bone".</p>`;
  qRes.hidden=false;qEl.setAttribute("aria-expanded","true");}
function openHit(h){qRes.hidden=true;qEl.setAttribute("aria-expanded","false");closeSearch(false);
  if(h.k==="ref"){pendingRef=h.id;if(location.hash==="#evidence")flashRef();else location.hash="evidence";return;}
  if(h.k==="fn"){h.go();return;}
  if(location.hash!=="#"+h.v)location.hash=h.v;
  setTimeout(()=>{let d=h.el.closest("details");while(d){d.open=true;d=d.parentElement&&d.parentElement.closest("details");}
    h.el.scrollIntoView({block:"center",behavior:motionOK()?"smooth":"auto"});h.el.classList.remove("flash-t");void h.el.offsetWidth;h.el.classList.add("flash-t");},90);}
qEl.addEventListener("input",runSearch);qEl.addEventListener("focus",()=>{if(qEl.value.trim().length>1)runSearch();});
qEl.addEventListener("keydown",e=>{const btns=$$("button",qRes);if(e.key==="ArrowDown"||e.key==="ArrowUp"){if(!btns.length)return;e.preventDefault();sel=(sel+(e.key==="ArrowDown"?1:-1)+btns.length)%btns.length;btns.forEach((b,i)=>b.setAttribute("aria-selected",i===sel?"true":"false"));qEl.setAttribute("aria-activedescendant","qr-"+sel);btns[sel].scrollIntoView({block:"nearest"});}
  else if(e.key==="Enter"){e.preventDefault();if(hits.length)openHit(hits[sel<0?0:sel]);}
  else if(e.key==="Escape"){e.stopPropagation();if(!qRes.hidden){qRes.hidden=true;qEl.setAttribute("aria-expanded","false");}else closeSearch(true);}});
qRes.addEventListener("click",e=>{const b=e.target.closest("[data-i]");if(b)openHit(hits[+b.dataset.i]);});
D.addEventListener("click",e=>{if(!e.target.closest("#searchBox")&&!e.target.closest("#searchToggle")){qRes.hidden=true;qEl.setAttribute("aria-expanded","false");closeSearch(false);}});

/* ---------- Where you live: services and emergency numbers ---------- */
let region=store.get("region",null);const regionChosen=!!(region&&REGIONS[region]);if(!regionChosen)region=guessRegion();
function svcCard(s){let host="";if(s.u){try{host=new URL(s.u).hostname.replace(/^www\./,"");}catch(e){host=s.u;}}
  return `<div class="card svc">${s.who?`<span class="who">${s.who}</span>`:""}<h3>${s.o}</h3><p class="muted">${s.d}</p>${s.ph?`<p><strong class="phone">${s.ph}</strong> <button type="button" class="mini" data-copy="${s.ph}" aria-label="Copy ${s.o} number">Copy</button></p>`:""}${s.h?`<p class="hrs">${s.h}</p>`:""}${s.u?`<p class="lnk"><a href="${s.u}" target="_blank" rel="noopener">${host}</a></p>`:""}</div>`;}
function renderRegion(){const g=REGIONS[region]||REGIONS.au;
  $$("[data-region-chips]").forEach(c=>{c.innerHTML=RORDER.map(k=>`<button type="button" class="chip" data-region="${k}" aria-pressed="${k===region}">${REGIONS[k].n}</button>`).join("");});
  $$("[data-em]").forEach(el=>el.textContent=g.em?g.em:"your local emergency number");
  $$("[data-region-name]").forEach(el=>el.textContent=g.n);
  const hint=$("#regionHint");if(hint)hint.textContent=regionChosen||store.get("region",null)?"":"Chosen from your device's time zone. Pick another place if it's wrong.";
  const L=$("#svcList");if(L){L.innerHTML=g.groups.map(gr=>`<section class="stack"><h3>${gr.t}</h3><div class="grid">${gr.items.map(s=>svcCard(s)).join("")}</div></section>`).join("");L.classList.remove("swap");void L.offsetWidth;L.classList.add("swap");}
}
D.addEventListener("click",e=>{const b=e.target.closest("[data-region]");if(!b)return;region=b.dataset.region;store.set("region",region);renderRegion();buildIndex();toast("Showing services for "+REGIONS[region].n);});

/* ---------- Where you were: a gentle "carry on" on the home page ---------- */
let seen=new Set(store.get("seen",[]));
function markSeen(id){if(!seen.has(id)){seen.add(id);store.set("seen",[...seen]);}if(id!=="home")store.set("last",id);}
function renderResume(){const box=$("#resume");if(!box)return;const last=store.get("last",null),nv=navItem(last);
  if(!nv||last==="home"||seen.size<3){box.hidden=true;return;}$("#resumeName").textContent=nv.l;$("#resumeBtn").setAttribute("href","#"+nv.id);box.hidden=false;}

/* ---------- Reading progress ---------- */
const rpBar=$("#readProg");let rafS=0;const topEl=$(".top");
function onScroll(){rafS=0;if(topEl)topEl.classList.toggle("compact",scrollY>30);const h=D.documentElement.scrollHeight-innerHeight;if(rpBar)rpBar.style.transform="scaleX("+(h>0?Math.min(1,Math.max(0,scrollY/h)):0).toFixed(4)+")";}
addEventListener("scroll",()=>{if(!rafS)rafS=requestAnimationFrame(onScroll);},{passive:true});
addEventListener("resize",onScroll);

/* ---------- Entrances: each chapter settles into place; content rises as you reach it ---------- */
function enterView(v){if(!motionOK()||!v)return;v.classList.remove("entering");void v.offsetWidth;[...v.children].forEach((c,i)=>c.style.setProperty("--i",Math.min(i,7)));v.classList.add("entering");clearTimeout(v._et);v._et=setTimeout(()=>v.classList.remove("entering"),1700);}
const REVEAL=".grid>*,.tiles>*,.also>*,.stats>*,.triage>*,.svg-box,.tbl-wrap,.truths>li,.grades>*,.accs>details";
let io=null;
function setupReveal(){if(!motionOK()||!("IntersectionObserver" in window))return;
  io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;io.unobserve(el);el.classList.add("in");setTimeout(()=>{el.classList.remove("rv","in");el.style.removeProperty("--rd");},1500);}),{rootMargin:"0px 0px -5% 0px",threshold:.05});
  $$(REVEAL).forEach(el=>{if(el.closest("dialog,#refList,#svcList,.home-band")||el.classList.contains("rv"))return;const p=el.parentElement,k=p?[...p.children].indexOf(el):0;el.style.setProperty("--rd",Math.min(k,6)*70+"ms");el.classList.add("rv");io.observe(el);});}
onMotion(()=>{if(!motionOK()){$$(".rv").forEach(el=>{el.classList.remove("rv","in");});}});

/* ---------- Accordions open and close smoothly ---------- */
D.addEventListener("click",e=>{const sm=e.target.closest("details.acc>summary");if(!sm||!motionOK())return;const d=sm.parentElement,b=d.querySelector(":scope>.acc-body");if(!b)return;e.preventDefault();if(d._anim)return;
  if(d.open){const h=b.offsetHeight;d.classList.add("closing");b.style.overflow="hidden";d._anim=b.animate([{height:h+"px",opacity:1},{height:"0px",opacity:0}],{duration:300,easing:"cubic-bezier(.4,0,.2,1)"});d._anim.onfinish=()=>{d.open=false;d.classList.remove("closing");b.style.overflow="";d._anim=null;};}
  else{d.open=true;const h=b.offsetHeight;b.style.overflow="hidden";d._anim=b.animate([{height:"0px",opacity:0},{height:h+"px",opacity:1}],{duration:400,easing:"cubic-bezier(.2,.7,.2,1)"});d._anim.onfinish=()=>{b.style.overflow="";d._anim=null;};}});

/* ---------- A soft light follows the pointer across cards ---------- */
D.addEventListener("pointermove",e=>{const c=e.target.closest&&e.target.closest("a.card,button.card,.tile,.lift");if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty("--mx",Math.round(e.clientX-r.left)+"px");c.style.setProperty("--my",Math.round(e.clientY-r.top)+"px");},{passive:true});

/* ---------- A small celebration: petals scatter from what you just marked ---------- */
function burst(el){if(!motionOK()||!el)return;const r=el.getBoundingClientRect(),b=D.createElement("div");b.className="burst";b.setAttribute("aria-hidden","true");b.style.left=(r.left+r.width/2)+"px";b.style.top=(r.top+r.height/2)+"px";const cs=["var(--gold)","var(--coral)","var(--teal)","var(--band-2)","var(--t5)"];
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2+Math.random()*.3,d=36+Math.random()*30,s=D.createElement("i");s.style.background=cs[i%cs.length];s.style.setProperty("--x",(Math.cos(a)*d).toFixed(1)+"px");s.style.setProperty("--y",(Math.sin(a)*d).toFixed(1)+"px");s.style.setProperty("--r",(a*180/Math.PI+90).toFixed(0)+"deg");b.appendChild(s);}
  D.body.appendChild(b);setTimeout(()=>b.remove(),1000);}

/* ---------- After each chapter is shown ---------- */
function afterShow(id){const v=D.getElementById("v-"+id);markSeen(id);enterView(v);onScroll();if(id==="home")renderResume();
  (viewHooks[id]||[]).forEach(f=>{try{f();}catch(e){console.error(e);}});
  try{D.dispatchEvent(new CustomEvent("aster:rendered",{detail:{view:id}}));}catch(e){}}

/* ---------- Palettes and the display studio ---------- */
let palette=store.get("palette","violet");if(!PALS.some(p=>p.id===palette))palette="violet";
const studio=$("#studio"),sBtn=$("#studioBtn");
function applyPalette(){R.setAttribute("data-palette",palette);$$("#pals [data-pal]").forEach(b=>{const on=b.dataset.pal===palette;b.setAttribute("aria-checked",on?"true":"false");b.tabIndex=on?0:-1;});}
function applyMotionUI(){const m=store.get("motion","flow");$$("[data-motionset]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.motionset===m?"true":"false"));}
function setPalette(id){if(id===palette)return;const go=()=>{palette=id;store.set("palette",id);applyPalette();};
  if(D.startViewTransition&&motionOK()){try{const t=D.startViewTransition(go);t.finished.then(runThemeHooks,runThemeHooks);}catch(e){go();runThemeHooks();}}else{go();runThemeHooks();}
  const p=PALS.find(x=>x.id===id);if(p)toast("Palette: "+p.name);}
function setTheme(next,el){if(next===theme){applyTheme();return;}const apply=()=>{theme=next;store.set("theme",theme);applyTheme();};
  const b=(el||sBtn).getBoundingClientRect(),x=b.left+b.width/2,y=b.top+b.height/2;
  if(D.startViewTransition&&motionOK()){try{const t=D.startViewTransition(apply);
      t.ready.then(()=>{const r=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));R.animate({clipPath:["circle(0px at "+x+"px "+y+"px)","circle("+r+"px at "+x+"px "+y+"px)"]},{duration:720,easing:"cubic-bezier(.2,.7,.2,1)",pseudoElement:"::view-transition-new(root)"});}).catch(()=>{});
      t.finished.then(runThemeHooks,runThemeHooks);}catch(e){apply();runThemeHooks();}}
  else{apply();runThemeHooks();}
  toast(next?("Theme: "+next):"Theme: matches your device");}
function renderStudio(){$("#pals").innerHTML=PALS.map(p=>`<button type="button" class="pal" role="radio" data-pal="${p.id}" aria-checked="false" tabindex="-1"><span class="dots" aria-hidden="true">${p.dots.map(c=>`<i style="background:${c}"></i>`).join("")}</span><span class="pn"><b>${p.name}</b><small>${p.note}</small></span></button>`).join("");
  applyPalette();applyTheme();applySize();applyMotionUI();}
function placeStudio(){if(innerWidth<=720||!sBtn.offsetParent){studio.style.top="";studio.style.right="";return;}const r=sBtn.getBoundingClientRect();studio.style.top=Math.round(r.bottom+10)+"px";studio.style.right=Math.max(12,Math.round(innerWidth-r.right))+"px";}
addEventListener("resize",()=>{if(!studio.hidden)placeStudio();});
let studioOpener=null;
function openStudio(from){studioOpener=from||sBtn;placeStudio();studio.hidden=false;sBtn.setAttribute("aria-expanded","true");const c=$('#pals [aria-checked="true"]');if(c)c.focus({preventScroll:true});}
function closeStudio(f){if(studio.hidden)return;studio.hidden=true;sBtn.setAttribute("aria-expanded","false");if(f){const o=(studioOpener&&studioOpener.offsetParent)?studioOpener:(sBtn.offsetParent?sBtn:($("#exploreBtn").offsetParent?$("#exploreBtn"):$("#dockExplore")));if(o)o.focus();}}
sBtn.addEventListener("click",e=>{e.stopPropagation();if(studio.hidden)openStudio(sBtn);else closeStudio();});
D.addEventListener("click",e=>{if(studio.hidden)return;if(!e.target.closest("#studio,#studioBtn,[data-open-studio]"))closeStudio();});
D.addEventListener("keydown",e=>{if(e.key==="Escape"&&!studio.hidden)closeStudio(true);});
studio.addEventListener("click",e=>{const p=e.target.closest("[data-pal]");if(p){setPalette(p.dataset.pal);return;}
  const t=e.target.closest("[data-themeset]");if(t){setTheme(t.dataset.themeset==="auto"?"":t.dataset.themeset,t);return;}
  const s=e.target.closest("[data-sizeset]");if(s){size=s.dataset.sizeset;store.set("size",size);applySize();runThemeHooks();return;}
  const m=e.target.closest("[data-motionset]");if(m){store.set("motion",m.dataset.motionset);setMotion();applyMotionUI();toast(m.dataset.motionset==="still"?"Motion: still":"Motion: flowing");}});
$("#pals").addEventListener("keydown",e=>{const k=e.key;if(!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight"].includes(k))return;e.preventDefault();
  const i=PALS.findIndex(p=>p.id===palette),n=PALS.length,j=(i+((k==="ArrowDown"||k==="ArrowRight")?1:-1)+n)%n;setPalette(PALS[j].id);const b=$(`#pals [data-pal="${PALS[j].id}"]`);if(b)b.focus();});
D.addEventListener("click",e=>{const o=e.target.closest("[data-open-studio]");if(!o)return;const nd=$("#navDlg");if(nd.open)nd.close();setTimeout(()=>openStudio(sBtn.offsetParent?sBtn:($("#exploreBtn").offsetParent?$("#exploreBtn"):$("#dockExplore"))),60);});

/* ---------- Your data: download or clear everything this guide stored ---------- */
function allData(){const out={};try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith(PFX))out[k.slice(PFX.length)]=JSON.parse(localStorage.getItem(k));}}catch(e){}return out;}
D.addEventListener("click",e=>{
  const dl=e.target.closest("[data-download-data]");if(dl){saveText(JSON.stringify({app:"Aster",saved:new Date().toISOString(),data:allData()},null,2),"aster-my-data-"+todayISO()+".json","your data");return;}
  const cl=e.target.closest("[data-clear-data]");if(cl){if(cl.dataset.armed!=="1"){cl.dataset.armed="1";cl.textContent="Tap again to delete everything";cl.classList.add("armed");clearTimeout(cl._t);cl._t=setTimeout(()=>{cl.dataset.armed="";cl.textContent="Clear all my data";cl.classList.remove("armed");},5000);return;}
    try{Object.keys(allData()).forEach(k=>localStorage.removeItem(PFX+k));}catch(e){}toast("All saved data cleared");setTimeout(()=>location.reload(),700);}
});

