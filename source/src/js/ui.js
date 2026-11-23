/* ---------- Shared controls: chip radio groups and the information dialog ---------- */
/* A row of chips that behaves as one radio group: click, or arrow keys to move and choose. */
function radioChips(group,onPick){if(!group)return null;
  const chips=()=>$$("[role=radio]",group);
  function set(btn,fire){chips().forEach(c=>{const on=c===btn;c.setAttribute("aria-checked",on?"true":"false");c.tabIndex=on?0:-1;});if(fire&&onPick)onPick(btn);}
  group.addEventListener("click",e=>{const b=e.target.closest("[role=radio]");if(b&&group.contains(b))set(b,true);});
  group.addEventListener("keydown",e=>{const k=e.key;if(!["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Home","End"].includes(k))return;e.preventDefault();
    const cs=chips(),i=cs.findIndex(c=>c.getAttribute("aria-checked")==="true");let j=i;
    if(k==="Home")j=0;else if(k==="End")j=cs.length-1;else j=(i+((k==="ArrowRight"||k==="ArrowDown")?1:-1)+cs.length)%cs.length;
    cs[j].focus();set(cs[j],true);});
  const cur=chips().find(c=>c.getAttribute("aria-checked")==="true");if(cur)set(cur,false);else chips().forEach((c,i)=>c.tabIndex=i===0?0:-1);
  return {set:(val,attr,fire)=>{const b=chips().find(c=>c.dataset[attr]===val);if(b)set(b,fire!==false);},value:attr=>{const b=chips().find(c=>c.getAttribute("aria-checked")==="true");return b?b.dataset[attr]:null;}};
}

/* Simple show-one-panel switch: chips choose which panel is visible. */
function chipPanels(groupSel,attr,panels){const g=$(groupSel);if(!g)return;radioChips(g,b=>{const v=b.dataset[attr];Object.keys(panels).forEach(k=>{const el=$(panels[k]);if(el)el.hidden=k!==v;});});}

/* The information dialog, used for details of a change, a body region or a stage. */
const infoDlg=$("#infoDlg");let infoOpener=null;
function openInfo(eyebrow,title,html,opener){$("#infoDlgEyebrow").textContent=eyebrow||"";$("#infoDlgTitle").textContent=title||"";const b=$("#infoDlgBody");b.innerHTML=html;renderEv(b);wireTerms(b);infoOpener=opener||D.activeElement;
  closePop();if(infoDlg.showModal){try{infoDlg.showModal();}catch(e){infoDlg.setAttribute("open","");}}else infoDlg.setAttribute("open","");b.scrollTop=0;}
infoDlg.addEventListener("close",()=>{if(infoOpener&&infoOpener.isConnected){try{infoOpener.focus({preventScroll:true});}catch(e){}}infoOpener=null;});
infoDlg.addEventListener("click",e=>{if(e.target===infoDlg)infoDlg.close();});

/* Small tooltip shared by charts: shows on hover and on keyboard focus, never the only way to read a value. */
const tipEl=D.createElement("div");tipEl.className="ctip";tipEl.setAttribute("role","tooltip");tipEl.hidden=true;D.body.appendChild(tipEl);
function showTip(target,lines,x,y){tipEl.textContent="";lines.forEach((l,i)=>{const p=D.createElement("div");p.className=i===0?"v":"k";p.textContent=l;tipEl.appendChild(p);});tipEl.hidden=false;
  const r=target.getBoundingClientRect();const px=(x!=null?x:r.left+r.width/2),py=(y!=null?y:r.top);
  const w=tipEl.offsetWidth,h=tipEl.offsetHeight;tipEl.style.left=Math.round(Math.min(Math.max(8,px-w/2),innerWidth-w-8))+"px";tipEl.style.top=Math.round(py-h-10<8?(r.bottom+10):(py-h-10))+"px";}
function hideTip(){tipEl.hidden=true;}
addEventListener("scroll",hideTip,{passive:true});

/* Months as words: 6 -> "6 months", 18 -> "1 year 6 months" */
function monthsWords(m){m=Math.round(m);if(m<=0)return"the start";if(m<12)return m+(m===1?" month":" months");const y=Math.floor(m/12),r=m%12;return y+(y===1?" year":" years")+(r?" "+r+(r===1?" month":" months"):"");}

/* Tables become stacked cards on narrow screens: each cell carries its column name */
function labelTable(t){if(!t)return;const hs=$$("thead th",t).map(h=>h.textContent.trim());if(!hs.length)return;$$("tbody tr",t).forEach(tr=>{[...tr.children].forEach((c,i)=>{if(hs[i])c.setAttribute("data-label",hs[i]);});});t.classList.add("stackable");}
