/* ---------- Small switches in the reading sections ---------- */
chipPanels("#permPick","perm",{fem:"#permFem",masc:"#permMasc"});
chipPanels("#riskPick","risk",{fem:"#riskFem",masc:"#riskMasc"});
(function(){const g=$("#opsPick");if(!g)return;radioChips(g,b=>{const v=b.dataset.ops;$$("#opsList>details").forEach(d=>{d.hidden=!(v==="all"||d.dataset.path===v);});});})();

/* ---------- Leave quickly: swaps this page for a weather forecast; Esc three times does the same ---------- */
(function(){const SAFE="https://www.bom.gov.au/";const btn=$("#exitBtn"),veil=$("#exitVeil");
/* The button is an ordinary link to the Bureau of Meteorology; the script only makes it instant and keeps this page out of Back */
function leave(e){if(e&&e.preventDefault)e.preventDefault();try{veil.hidden=false;}catch(_){}try{window.location.replace(SAFE);}catch(_){window.location.href=SAFE;}}
if(btn)btn.addEventListener("click",leave);
/* Esc presses that close something (a dialog, a source, the search results or the display panel) don't count,
   so closing things quickly never sends anyone away by accident. */
let n=0,t=0;
function somethingOpen(){return !!(D.querySelector("dialog[open]")||$("#searchBox").classList.contains("open")||!$("#pop").hidden||!$("#studio").hidden||!$("#qres").hidden||D.activeElement&&D.activeElement.matches&&D.activeElement.matches("input,textarea,select"));}
D.addEventListener("keydown",e=>{if(e.key!=="Escape"){n=0;return;}if(somethingOpen()){n=0;return;}const now=Date.now();if(now-t>1500)n=0;t=now;n++;if(n>=3){n=0;leave();}},true);
})();

/* ---------- Links to other websites don't pass on which page they came from ---------- */
D.addEventListener("click",e=>{const a=e.target.closest&&e.target.closest('a[href^="http"]');if(a&&!/\bnoreferrer\b/.test(a.rel))a.rel=(a.rel+" noopener noreferrer").trim();},true);

/* ---------- Boot ---------- */
if(inFrame){$$("[data-download-data]").forEach(b=>b.textContent="Copy my data");const md=$("#msDownload");if(md)md.textContent="Copy my moments";}
$$(".tbl-wrap table").forEach(labelTable);
renderStudio();renderRegion();initLibrary();wireTerms(D);renderEv(D);setMotion();buildIndex();route(false);setupReveal();
try{D.dispatchEvent(new CustomEvent("aster:ready"));}catch(e){}
