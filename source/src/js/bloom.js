/* ---------- The bloom: one petal for each moment you mark ----------
   Petals follow the order the moments happened, clockwise from the top. The flower has room for 13 petals at first,
   then 21, 34, 55 and 89 as it fills, so there is always room to grow and never a total to reach.
   The golden centre is drawn the way a daisy-family flower head really packs its tiny florets: each one turned
   137.5 degrees (the golden angle) from the last, at a distance that grows with the square root of its number
   (Vogel's model of the sunflower head, 1979). */
(function(){
const hosts=$$("[data-bloom]");if(!hosts.length)return;
const STEPS=[13,21,34,55,89];
const capFor=n=>{for(const s of STEPS)if(n<=s)return s;return n;};
const f=v=>Math.round(v*10)/10;
function rng(seed){let s=seed>>>0||1;return()=>{s^=s<<13;s>>>=0;s^=s>>17;s^=s<<5;s>>>=0;return s/4294967296;};}
function petal(r0,len,w){const x0=r0-6,x1=r0+len;
  return `M${f(x0)} 0C${f(x0+len*.25)} ${f(-w)} ${f(x1-len*.3)} ${f(-w*1.05)} ${f(x1)} ${f(-w*.25)}Q${f(x1+4)} 0 ${f(x1)} ${f(w*.25)}C${f(x1-len*.3)} ${f(w*1.05)} ${f(x0+len*.25)} ${f(w)} ${f(x0)} 0Z`;}
let FL="";
function florets(r){if(FL)return FL;const n=200,c=(r-6)/Math.sqrt(n);let s="";
  for(let i=1;i<=n;i++){const rr=c*Math.sqrt(i),th=i*137.508*Math.PI/180,d=1+1.75*Math.sqrt(i/n);s+=`<circle cx="${f(rr*Math.cos(th))}" cy="${f(rr*Math.sin(th))}" r="${f(d)}"/>`;}
  return FL=s;}
const LOCK=`<g class="lk"><rect x="-15" y="-4" width="30" height="24" rx="6"/><path d="M-9-4v-7a9 9 0 0 1 18 0v7"/><circle cy="7" r="3"/></g>`;

function svg(uid,items,locked,grow){
  const n=items.length,cap=locked?13:capFor(n),r0=50,L=150;
  const w=Math.max(6,Math.min(21,2*Math.PI*(r0+L*.42)/cap*.5));
  const R=rng(11);let ps="";
  for(let k=0;k<cap;k++){const ang=-90+360*k/cap+(R()-.5)*3,ln=L*(.9+R()*.13),ww=w*(.9+R()*.2),on=!locked&&k<n,it=on?items[k]:null;
    ps+=`<g transform="rotate(${f(ang)})"><g class="${on?"pf":"po"}${it&&grow&&grow.has(it.id)?" grow":""}" style="--k:${k}"${it?` data-k="${k}"`:""}><path d="${petal(r0,ln,ww)}"${on?` fill="url(#${uid}-p)"`:""}/><path class="vein" d="M${r0+2} 0L${f(r0+ln-14)} 0"/></g></g>`;}
  const desc=locked?"Your bloom is locked with your passcode, so its petals show as outlines until you open it."
    :n?`An aster with room for ${cap} petals. ${n} ${n===1?"is":"are"} filled in, one for each moment you have marked, in the order they happened.${n<cap?" The rest are outlines: room to grow.":""}`
    :`An aster bud with ${cap} outline petals, waiting for the first moment you mark.`;
  return `<svg class="bloom" viewBox="-228 -228 456 456" role="img" aria-labelledby="${uid}-t ${uid}-d"><title id="${uid}-t">Your bloom</title><desc id="${uid}-d">${desc}</desc>`+
    `<defs><linearGradient id="${uid}-p" x1="0" y1="0" x2="1" y2="0"><stop offset="0" class="pa"/><stop offset="1" class="pb"/></linearGradient>`+
    `<radialGradient id="${uid}-disc" cx="42%" cy="38%" r="68%"><stop offset="0" class="dh"/><stop offset=".68" class="dm"/><stop offset="1" class="dl"/></radialGradient>`+
    `<filter id="${uid}-sh" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14"/></filter></defs>`+
    `<circle class="halo" r="${f(r0+L*.56)}" filter="url(#${uid}-sh)" transform="translate(4 9)"/>`+
    `<g class="petals">${ps}</g><circle class="disc" r="${r0-2}" fill="url(#${uid}-disc)"/><g class="florets">${florets(r0)}</g>${locked?LOCK:""}</svg>`;}

function words(n){return n===1?"1 moment":n+" moments";}
function caption(kind,items,locked){const n=items.length;
  if(locked)return `<b>Your bloom is locked</b><span>${kind==="home"?'Open it with your passcode on <a href="#bloom">the Bloom page</a>.':"Enter your passcode to open it."}</span>`;
  if(!n)return `<b>Your bloom is waiting</b><span>Each petal will be a moment you choose to mark. It stays on this device.</span>`;
  return `<b>Your bloom: ${words(n)}</b><span>${kind==="home"?'Each petal is a moment you marked. <a href="#bloom">See them all</a>.':"Petals follow the order your moments happened, clockwise from the top."}</span>`;}

const state=new Map();
function draw(host,first){const kind=host.dataset.bloom,uid="bl-"+kind,items=MS.items(),locked=MS.locked();
  const prev=state.get(host),ids=new Set(items.map(i=>i.id));
  const grow=prev&&!first?new Set([...ids].filter(i=>!prev.has(i))):null;
  host.innerHTML=svg(uid,items,locked,grow&&grow.size?grow:null);state.set(host,ids);
  const cap=host.parentElement.querySelector("figcaption");if(cap)cap.innerHTML=caption(kind,items,locked);
  host.dataset.items=JSON.stringify(items.map(i=>[i.t,i.d]));}
hosts.forEach(h=>{draw(h,true);
  /* The petals open once, the first time the flower comes into view, if motion is on */
  let done=false;whenVisible(h,v=>{if(!v||done)return;done=true;if(!motionOK())return;const s=h.querySelector("svg");if(!s)return;s.classList.add("unfold");setTimeout(()=>s.classList.remove("unfold"),2600);});
  /* Hovering a filled petal names its moment (the full list is always on the Bloom page) */
  h.addEventListener("pointermove",e=>{const g=e.target.closest&&e.target.closest("[data-k]");if(!g){hideTip();return;}const it=JSON.parse(h.dataset.items||"[]")[+g.dataset.k];if(it)showTip(g,[it[0],fmtDate(it[1])],e.clientX,e.clientY-8);});
  h.addEventListener("pointerleave",hideTip);});
D.addEventListener("aster:milestones",()=>hosts.forEach(h=>draw(h,false)));

/* Home page: moments you can mark in one tap */
const box=$("#homeIdeas");
function ideas(){if(!box)return;if(MS.locked()){box.innerHTML=`<p class="small">Your moments are locked with a passcode. <a href="#bloom">Open them on the Bloom page</a> to add more.</p>`;return;}
  const list=MS.ideas(6);box.innerHTML=list.length?list.map(t=>`<button type="button" class="chip" data-mark="${esc(t)}">${ico("plus")}${esc(t)}</button>`).join("")
    :`<p class="small">You've marked every suggestion. <a href="#bloom">Add your own</a>.</p>`;}
if(box){ideas();D.addEventListener("aster:milestones",ideas);
  box.addEventListener("click",e=>{const b=e.target.closest("[data-mark]");if(!b)return;const r=b.getBoundingClientRect();
    if(MS.add(b.dataset.mark)){const ghost=D.createElement("span");ghost.style.cssText=`position:fixed;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px`;D.body.appendChild(ghost);burst(ghost);setTimeout(()=>ghost.remove(),50);
      toast("Added to your bloom");const nx=$("#homeIdeas [data-mark]");if(nx)nx.focus({preventScroll:true});}});}
/* "Mark a moment" takes you to the form on the Bloom page */
D.addEventListener("click",e=>{const m=e.target.closest("[data-go-mark]");if(!m)return;setTimeout(()=>{const t=$("#msText");if(t&&t.offsetParent){t.scrollIntoView({block:"center",behavior:motionOK()?"smooth":"auto"});t.focus({preventScroll:true});}},160);});
})();
