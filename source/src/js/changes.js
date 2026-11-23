/* ---------- What changes, and when: timeline, body map, "now" panel and table ----------
   Timings: Endocrine Society guideline 2017 (Hembree et al.), Table 12 (masculinising) and Table 13 (feminising),
   which the authors describe as estimates from clinical observation; checked against the published tables on 21 Nov 2026.
   on = usual onset range in months, mx = usual time to maximum effect (null = not known; [36,null] = after 3 years).
   stop: what usually happens if hormones are stopped, adapted from the AusPATH 2025 tables (potentially permanent changes split into "lasts" and "partly"). */
const EFFECTS={
fem:[
 {id:"desire",n:"Lower sex drive",r:"pelvis",on:[1,3],mx:[3,6],stop:"partly",
  d:"Sexual desire usually lessens in the first months. In a study that followed people for three years, desire for sex with a partner was, on average, higher at three years than before starting.",ev:["mod","DEFREYNE2020 ENDO2017"]},
 {id:"erections",n:"Fewer erections",r:"pelvis",on:[1,3],mx:[3,6],stop:"partly",
  d:"Spontaneous and morning erections become less frequent, and there is usually less ejaculate. Tell your doctor if changes in sexual function worry you.",ev:["","ENDO2017 AUSPATH2025"]},
 {id:"skin",n:"Softer, less oily skin",r:"skin",on:[3,6],mx:null,stop:"partly",
  d:"Skin becomes softer and less oily. How long it takes to reach its fullest isn't known.",ev:["","ENDO2017 AUSPATH2025"]},
 {id:"fat",n:"Fat moves to hips and thighs",r:"hips",on:[3,6],mx:[24,36],stop:"partly",
  d:"In the first year, fat on the legs rose by 42% and around the hips by 34% on average, and the hip measurement grew by 3.2 cm. Shape keeps changing for two to three years.",ev:["mod","KLAVER2018 ENDO2017"]},
 {id:"muscle",n:"Less muscle and strength",r:"muscle",on:[3,6],mx:[12,24],stop:"partly",
  d:"Muscle and strength fall slowly: thigh muscle volume by about 5% and grip strength by about 1.8 kg in the first year. Strength stays above cisgender women's on average after three years. Strength training helps you keep what you want.",ev:["mod","WIIK2020 SCHARFF2019 HARPER2021"]},
 {id:"breasts",n:"Breast growth",r:"chest",on:[3,6],mx:[24,36],stop:"lasts",
  d:"Most of the first year's growth happens in the first six months, and volume keeps creeping up for at least three years. After one year the average breast-chest difference was 7.9 cm, and about half were smaller than an AAA cup; blood estradiol levels didn't predict how much growth happened. Tender, sensitive nipples are common early on.",ev:["mod","DEBLOK2018 DEBLOK2021 AUSPATH2025"]},
 {id:"testes",n:"Smaller testes",r:"pelvis",on:[3,6],mx:[24,36],stop:"lasts",
  d:"The testes become smaller, and the genitals may shrink a little.",ev:["","ENDO2017 AUSPATH2025"]},
 {id:"sperm",n:"Less sperm",r:"pelvis",on:null,mx:[36,null],stop:"lasts",
  d:"Sperm production falls, possibly for good, but the timing is unpredictable, so estradiol isn't contraception. Store sperm before starting if you might want children.",ev:["","ENDO2017 AUSPATH2025"]},
 {id:"hair",n:"Slower facial and body hair",r:"face",on:[6,12],mx:[36,null],stop:"partly",
  d:"Facial and body hair grow more slowly but rarely stop. Laser or electrolysis is usually needed to remove facial hair fully.",ev:["","ENDO2017 SINCLAIR2019"]}
],
masc:[
 {id:"desire",n:"Higher sex drive",r:"pelvis",on:[1,3],mx:null,stop:"eases",
  d:"Sexual desire often rises in the first three months, which can feel intense. By three years, desire for sex with a partner was, on average, back near where it started, while desire for solo sex stayed higher.",ev:["mod","DEFREYNE2020"]},
 {id:"skin",n:"Oilier skin and acne",r:"skin",on:[1,6],mx:[12,24],stop:"eases",
  d:"Skin becomes oilier and acne is common. It usually peaks around six months, and in the long term 94% had no acne or only mild acne.",ev:["weak","WIERCKX2014 ENDO2017"]},
 {id:"periods",n:"Periods stop",r:"pelvis",on:[1,6],mx:[6,12],stop:"eases",
  d:"Periods stopped within six months for 55% of people and between six and twelve months for 32%. If bleeding continues, a progestogen can be added. Testosterone is not contraception.",ev:["weak","AHMAD2017 AUSPATH2025"]},
 {id:"fat",n:"Fat leaves the hips and thighs",r:"hips",on:[1,6],mx:[24,60],stop:"eases",
  d:"In the first year, fat on the legs fell by 16% and around the hips by 14%, while waist fat didn't change, so the shape becomes straighter.",ev:["mod","KLAVER2018 ENDO2017"]},
 {id:"clitoris",n:"Clitoral growth",r:"pelvis",on:[1,6],mx:[12,24],stop:"lasts",
  d:"The clitoris grows. This change is likely to last if you stop testosterone.",ev:["","ENDO2017 AUSPATH2025"]},
 {id:"dryness",n:"Vaginal dryness",r:"pelvis",on:[1,6],mx:[12,24],stop:"eases",
  d:"The lining of the vagina becomes thinner and drier, which can cause irritation or pain with sex. It's very common, estimated at 64 to 78% within five years. Lubricants and moisturisers help, and a doctor can discuss a low-dose vaginal estrogen; evidence for treatment is still limited.",ev:["weak","BASHH2026 ENDO2017"]},
 {id:"muscle",n:"More muscle and strength",r:"muscle",on:[6,12],mx:[24,60],stop:"eases",
  d:"Thigh muscle volume rose by about 15% and grip strength by about 6 kg in the first year. Build training load gradually, because tendons adapt more slowly than muscle (based on studies in teenagers).",ev:["mod","WIIK2020 SCHARFF2019 MERSMANN2017"]},
 {id:"voice",n:"Deeper voice",r:"throat",on:[6,12],mx:[12,24],stop:"lasts",
  d:"In a Swedish study, pitch had already dropped clearly by three months and reached the typical male range by twelve (average 125 Hz). About a quarter had voice problems such as instability or tiredness, and had voice therapy. This change is permanent.",ev:["mod","NYGREN2016 ENDO2017"]},
 {id:"hair",n:"Facial and body hair",r:"face",on:[6,12],mx:[48,60],stop:"lasts",
  d:"Facial and body hair increase steadily, and facial hair keeps filling in for four to five years.",ev:["weak","WIERCKX2014 ENDO2017"]},
 {id:"scalp",n:"Scalp hair loss",r:"scalp",on:[6,12],mx:null,stop:"lasts",
  d:"Male-pattern hair loss may develop. After about ten years, a third had mild and a third moderate to severe hair loss.",ev:["weak","WIERCKX2014"]}
]};
const STOP={lasts:"Likely to last",partly:"May not fully reverse",eases:"Usually eases"};
/* Body regions on the map: where they sit (in the figure's own coordinates) and what hormones don't change there */
const REGIONS_BODY={
 scalp:{n:"Scalp hair",lab:"Scalp",x:150,y:22,lx:174,ly:17,la:"start",none:{fem:"Estradiol doesn't regrow hair already lost to balding, and family-pattern hair loss may return if estradiol is stopped.",masc:""},ev:"ENDO2017 AUSPATH2025"},
 face:{n:"Face and facial hair",lab:"Face",x:150,y:47,lx:180,ly:51,la:"start",none:{fem:"",masc:""}},
 throat:{n:"Voice",lab:"Voice",x:150,y:77,lx:170,ly:78,la:"start",none:{fem:"Estradiol doesn't change the voice. Voice training with a speech pathologist is what helps.",masc:""},ev:"AUSPATH2025 NOLANIT2019"},
 chest:{n:"Chest",lab:"Chest",x:150,y:128,lx:150,ly:108,la:"mid",none:{fem:"",masc:"Testosterone doesn't shrink breast tissue much. Binding or top surgery are the options if you want a flatter chest."},ev:"AUSPATH2025"},
 muscle:{n:"Muscle and strength",lab:"Muscle",x:204,y:150,lx:221,ly:157,la:"start",none:{fem:"",masc:""}},
 skin:{n:"Skin",lab:"Skin",x:84,y:214,lx:68,ly:218,la:"end",none:{fem:"",masc:""}},
 hips:{n:"Fat and body shape",lab:"Shape",x:117,y:250,lx:117,ly:278,la:"mid",none:{fem:"",masc:""}},
 pelvis:{n:"Genitals, periods and fertility",lab:"Pelvis",x:150,y:252,lx:150,ly:233,la:"mid",none:{fem:"",masc:""}}
};

(function(){const tl=$("#chTimeline");if(!tl)return;
let path=store.get("chPath","fem");if(!EFFECTS[path])path="fem";let month=6,region=null;
const pos=m=>Math.sqrt(Math.max(0,Math.min(m,60))/60)*100;
function rangeWords(r){if(!r)return"Not known";const [a,b]=r;const f=m=>m<12?m+" months":(m%12===0?(m/12)+(m===12?" year":" years"):monthsWords(m));
  if(b==null)return"After "+f(a).replace(/^(\d+) years?$/,"$1 years").replace("1 years","1 year");
  if(a<12&&b<=12)return a+"–"+b+" months";if(a%12===0&&b%12===0)return (a/12)+"–"+(b/12)+" years";return f(a)+" to "+f(b);}
function state(e,m){if(!e.on){if(e.mx&&m>=e.mx[0])return"full";return"unknown";}
  if(m<e.on[0])return"notyet";if(m<e.on[1])return"starting";if(!e.mx)return"developing";if(m<e.mx[0])return"developing";return"full";}
const STATE_L={notyet:"Not usually started yet",starting:"Usually starting around now",developing:"Still developing",full:"Usually near its fullest",unknown:"Timing not well known"};
const ORDER=["starting","developing","full","unknown","notyet"];

/* Timeline: one row per change, segments for "usually starts", "keeps developing" and "usually at its fullest" */
function segs(e){const s=[];const end=60;
  if(!e.on){s.push({c:"l4",a:0,b:e.mx?e.mx[0]:end});if(e.mx)s.push({c:"l3",a:e.mx[0],b:e.mx[1]==null?end:e.mx[1],open:e.mx[1]==null});return s;}
  s.push({c:"l1",a:e.on[0],b:e.on[1]});
  if(!e.mx){s.push({c:"l4",a:e.on[1],b:end});return s;}
  if(e.mx[0]>e.on[1])s.push({c:"l2",a:e.on[1],b:e.mx[0]});
  s.push({c:"l3",a:e.mx[0],b:e.mx[1]==null?end:Math.min(e.mx[1],end),open:e.mx[1]==null||e.mx[1]>end});return s;}
function renderTimeline(){const L=EFFECTS[path];const ticks=[[0,"Start"],[3,"3 mo"],[6,"6 mo"],[12,"1 yr"],[24,"2 yrs"],[36,"3 yrs"],[60,"5 yrs"]];
  let h=`<div class="tl-axis" aria-hidden="true"><span class="tl-name"></span><span class="tl-track">${ticks.map(([m,l])=>`<i style="left:${pos(m).toFixed(2)}%"${m===3?' class="t3"':""}><b>${l}</b></i>`).join("")}</span></div><div class="tl-rows" role="list">`;
  L.forEach(e=>{const sg=segs(e);const lab=`${e.n}: usually starts ${e.on?rangeWords(e.on).toLowerCase():"at a time that isn't known"}; usually at its fullest ${e.mx?rangeWords(e.mx).toLowerCase():"at a time that isn't known"}. ${STOP[e.stop]} if you stop. Open details.`;
    h+=`<div role="listitem" class="tl-li"><button type="button" class="tl-row" data-e="${e.id}" data-r="${e.r}" aria-label="${esc(lab)}"><span class="tl-name">${esc(e.n)}</span><span class="tl-track">${sg.map((s,i)=>{const l=pos(s.a),w=Math.max(.8,pos(s.b)-pos(s.a));const first=i===0,last=i===sg.length-1;return `<i class="tseg ${s.c}${first?" f":""}${last?" e":""}${s.open?" open":""}" style="left:${l.toFixed(2)}%;width:calc(${w.toFixed(2)}% - ${last?0:2}px)"></i>`;}).join("")}<i class="tl-now" aria-hidden="true"></i></span></button></div>`;});
  tl.innerHTML=h+"</div>";placeNow();highlight();}
function placeNow(){$$(".tl-now",tl).forEach(n=>n.style.left=pos(month).toFixed(2)+"%");$$(".tl-row",tl).forEach(b=>{const e=EFFECTS[path].find(x=>x.id===b.dataset.e);b.dataset.st=state(e,month);});}
function highlight(){$$(".tl-row",tl).forEach(b=>b.classList.toggle("dim",!!region&&b.dataset.r!==region));}

/* Hover and focus readout for each row */
function rowTip(b,ev){const e=EFFECTS[path].find(x=>x.id===b.dataset.e);if(!e)return;showTip(b.querySelector(".tl-track"),[e.n,"Usually starts: "+(e.on?rangeWords(e.on):"not known"),"Usually at its fullest: "+(e.mx?rangeWords(e.mx):"not known"),"At "+monthsWords(month)+": "+STATE_L[state(e,month)].toLowerCase()],ev?ev.clientX:null);}
tl.addEventListener("pointerover",e=>{const b=e.target.closest(".tl-row");if(b)rowTip(b,e);});
tl.addEventListener("pointermove",e=>{const b=e.target.closest(".tl-row");if(b)rowTip(b,e);});
tl.addEventListener("pointerleave",hideTip);
tl.addEventListener("focusin",e=>{const b=e.target.closest(".tl-row");if(b)rowTip(b);});
tl.addEventListener("focusout",hideTip);
tl.addEventListener("click",e=>{const b=e.target.closest(".tl-row");if(b){hideTip();openEffect(b.dataset.e,b);}});

/* Details of one change */
function effectHTML(e){return `<dl class="facts"><dt>Usually starts</dt><dd>${e.on?rangeWords(e.on):"Not known"}</dd><dt>Usually at its fullest</dt><dd>${e.mx?rangeWords(e.mx):"Not known"}</dd><dt>At ${monthsWords(month)}</dt><dd>${STATE_L[state(e,month)]}</dd><dt>If you stop</dt><dd>${STOP[e.stop]}</dd></dl><p>${esc(e.d)} <span class="ev"${e.ev[0]?` data-g="${e.ev[0]}"`:""} data-r="${e.ev[1]}"></span></p><p class="small muted">Timings are the Endocrine Society's estimates for adults; the studies quoted can differ, and bodies vary widely. "If you stop" is adapted from AusPATH.</p>`;}
function openEffect(id,opener){const e=EFFECTS[path].find(x=>x.id===id);if(!e)return;openInfo(path==="fem"?"Estradiol (feminising)":"Testosterone (masculinising)",e.n,effectHTML(e),opener);}

/* The body map: a calm, neutral figure with a marker for each region; the marker's ring shows how far changes have usually come */

const bm=$("#bodyMap");
function regionState(rk){const L=EFFECTS[path].filter(e=>e.r===rk);if(!L.length)return"none";const sts=L.map(e=>state(e,month));for(const s of["full","developing","starting","unknown","notyet"])if(sts.includes(s))return s;return"none";}
function renderBody(){if(!bm)return;let h=`<svg viewBox="22 4 256 462" role="group" aria-label="Body map. Choose a part of the body to see its changes."><defs>${figureDefs("bmf")}</defs>${figureG("bmf",{shadow:true})}`;
  Object.keys(REGIONS_BODY).forEach(k=>{const g=REGIONS_BODY[k],st=regionState(k),n=EFFECTS[path].filter(e=>e.r===k).length;const note=g.none[path];
    const lab=`${g.n}: ${n?n+(n===1?" change":" changes")+", "+(st==="none"?"":STATE_L[st].toLowerCase()):"no change from these hormones"}`;
    h+=`<g class="bm-spot st-${st}${region===k?" on":""}" data-part="${k}" tabindex="0" role="button" aria-pressed="${region===k}" aria-label="${esc(lab)}" transform="translate(${g.x} ${g.y})"><circle class="hit" r="16"/><circle class="halo" r="10.5"/><circle class="dot" r="5.5"/>${!n&&note?`<path class="nil" d="M-3 0h6"/>`:""}</g><text class="bm-lab ${g.la==="end"?"end":g.la==="mid"?"mid":""}${region===k?" on":""}" x="${g.lx}" y="${g.ly}" aria-hidden="true">${g.lab}</text>`;});
  bm.innerHTML=h+"</svg>";}
function openRegion(k,opener){const g=REGIONS_BODY[k];const L=EFFECTS[path].filter(e=>e.r===k);const note=g.none[path];
  let h=L.length?`<ul class="reg-list">${L.map(e=>`<li><button type="button" class="linklike" data-open-effect="${e.id}">${esc(e.n)}</button><span class="small muted"> · ${STATE_L[state(e,month)]} at ${monthsWords(month)}</span></li>`).join("")}</ul>`:"";
  if(note)h+=`<p>${esc(note)}${g.ev?` <span class="ev" data-r="${g.ev}"></span>`:""}</p>`;
  if(!L.length&&!note)h+=`<p>No changes listed here for these hormones.</p>`;
  h+=`<p class="small muted">The skeleton itself, including height, hands, feet, hips and jaw, doesn't change in adults. <span class="ev" data-r="AUSPATH2025"></span></p>`;
  openInfo(path==="fem"?"Estradiol (feminising)":"Testosterone (masculinising)",g.n,h,opener);}
function spotTip(sp,ev){const k=sp.dataset.part,g=REGIONS_BODY[k],L=EFFECTS[path].filter(e=>e.r===k);showTip(sp,[g.n].concat(L.length?L.map(e=>e.n+": "+STATE_L[state(e,month)].toLowerCase()):["No change from these hormones"]),ev?ev.clientX:null,ev?ev.clientY-14:null);}
if(bm){bm.addEventListener("pointerover",e=>{const sp=e.target.closest(".bm-spot");if(sp)spotTip(sp,e);});bm.addEventListener("pointerout",e=>{if(e.target.closest(".bm-spot"))hideTip();});
  bm.addEventListener("focusin",e=>{const sp=e.target.closest(".bm-spot");if(sp)spotTip(sp);});bm.addEventListener("focusout",hideTip);
  bm.addEventListener("click",e=>{hideTip();const s=e.target.closest(".bm-spot");if(!s)return;const k=s.dataset.part;region=region===k?null:k;renderBody();highlight();renderNow();if(region)openRegion(k,bm.querySelector(`[data-part="${k}"]`));});
  bm.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;const s=e.target.closest(".bm-spot");if(!s)return;e.preventDefault();s.dispatchEvent(new MouseEvent("click",{bubbles:true}));});}
D.addEventListener("click",e=>{const b=e.target.closest("[data-open-effect]");if(!b)return;const id=b.dataset.openEffect;if(infoDlg.open)infoDlg.close();setTimeout(()=>openEffect(id,$(`.tl-row[data-e="${id}"]`)),40);});

/* "Around now": changes grouped by where they usually are at the chosen month */
const now=$("#chNow");
function renderNow(){if(!now)return;const L=EFFECTS[path].filter(e=>!region||e.r===region);const by={};L.forEach(e=>{const s=state(e,month);(by[s]=by[s]||[]).push(e);});
  let h=`<h3 class="now-h">At ${monthsWords(month)}${region?` <span class="muted">· ${esc(REGIONS_BODY[region].n)}</span>`:""}</h3>`;
  ORDER.forEach(s=>{if(!by[s])return;h+=`<div class="now-g st-${s}"><h4><span class="sw" aria-hidden="true"></span>${STATE_L[s]}</h4><ul>${by[s].map(e=>`<li><button type="button" class="now-i" data-open-effect="${e.id}">${esc(e.n)}</button></li>`).join("")}</ul></div>`;});
  if(region)h+=`<p class="small"><button type="button" class="linklike" id="chAllBody">Show the whole body</button></p>`;
  now.innerHTML=h;const ab=$("#chAllBody");if(ab)ab.addEventListener("click",()=>{region=null;renderBody();highlight();renderNow();});}

/* Table view: the same timings in words */
function renderTable(){const tb=$("#chTable tbody");if(!tb)return;tb.innerHTML=EFFECTS[path].map(e=>`<tr><th scope="row">${esc(e.n)}</th><td>${e.on?rangeWords(e.on):"Not known"}</td><td>${e.mx?rangeWords(e.mx):"Not known"}</td><td>${STOP[e.stop]}</td></tr>`).join("");labelTable($("#chTable"));}

/* Controls: hormones and time */
const slider=$("#chMonth"),out=$("#chMonthOut");
function setMonth(m,save){month=clamp(Math.round(m),0,60);if(slider){slider.value=month;slider.setAttribute("aria-valuetext",monthsWords(month)+" on hormones");slider.style.setProperty("--p",(month/60*100).toFixed(2)+"%");}if(out)out.textContent=month?monthsWords(month):"Starting";placeNow();renderBody();renderNow();}
if(slider)slider.addEventListener("input",()=>setMonth(+slider.value));
const pathChips=radioChips($("#chPath"),b=>{path=b.dataset.path;store.set("chPath",path);region=null;renderAll();});
function renderAll(){renderTimeline();renderBody();renderNow();renderTable();}
/* Jump to your own time on hormones, from My milestones (only if it isn't locked) */
function myMonths(){const st=MS.start();if(!st)return null;const ms={start:st,path:MS.path()};const [y,m,d]=ms.start.split("-").map(Number);const s=new Date(y,m-1,d),t=new Date();let months=(t.getFullYear()-s.getFullYear())*12+(t.getMonth()-s.getMonth());if(t.getDate()<s.getDate())months--;return months>=0?{m:months,p:ms.path}:null;}
const mine=$("#chMine");
function refreshMine(){const mm=myMonths();if(mine)mine.hidden=!mm;}
if(mine)mine.addEventListener("click",()=>{const mm=myMonths();if(!mm)return;if(mm.p&&EFFECTS[mm.p]&&mm.p!==path){path=mm.p;store.set("chPath",path);if(pathChips)pathChips.set(path,"path",false);renderAll();}setMonth(Math.min(60,mm.m));toast(mm.m>60?"Showing 5 years, the end of the scale":"Showing "+monthsWords(mm.m));});
onView("changes",refreshMine);
if(pathChips)pathChips.set(path,"path",false);
renderAll();setMonth(6);
addToIndex(IDX=>{Object.keys(EFFECTS).forEach(p=>EFFECTS[p].forEach(e=>IDX.push({k:"fn",vl:"What changes, and when",t:e.n+" ("+(p==="fem"?"estradiol":"testosterone")+"): "+e.d,low:(e.n+" "+e.d).toLowerCase(),h:true,go:()=>{location.hash="changes";setTimeout(()=>{if(path!==p){path=p;store.set("chPath",p);if(pathChips)pathChips.set(p,"path",false);renderAll();}openEffect(e.id);},120);}})));});
})();
