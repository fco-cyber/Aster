/* ---------- Diagrams: each one shows how the thing really works, in the palette's colours ----------
   All motion is gentle, explains something, and stops when Motion is set to Still, when the device
   asks for reduced motion, or when the diagram is off screen. */
function liveSVG(svg){/* pause or play SMIL animations inside an SVG */
  let vis=false;const sync=()=>{const go=vis&&motionOK();try{go?svg.unpauseAnimations():svg.pauseAnimations();}catch(e){}svg.classList.toggle("go",go);};
  whenVisible(svg,v=>{vis=v;sync();});onMotion(sync);sync();return sync;}
function arrowDefs(id){return ["i","d","h","e","v","s","sl"].map(c=>`<marker id="${id}-${c}" class="mk mk-${c}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1l8 4-8 4" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker>`).join("")+`<marker id="${id}-t" class="mk mk-e" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M5 0v10" fill="none" stroke-width="2.4" stroke-linecap="round"/></marker>`;}

/* 1. The hormone control loop (hypothalamus, pituitary, gonads), feminising or masculinising */
(function(){const host=$("#axisFig");if(!host)return;const cap=$("#axisCap");
const T={
 fem:{gon:"Testes",gonSub:"make testosterone",own:"less testosterone",med:["Estradiol","patch, gel","or tablet"],side:["Anti-androgen","lowers testosterone","or blocks its effect"],sideKind:"block",body:["Your body","breasts, skin, fat","change slowly"],note:null,
  cap:"Feminising: estradiol from your medicine enters the bloodstream. High levels press the brake, so the pituitary sends less LH and the testes make less testosterone; an anti-androgen lowers it further or blocks its effect. The moving dots pause when Motion is set to Still."},
 masc:{gon:"Ovaries",gonSub:"make estradiol",own:"less estradiol",med:["Testosterone","injection","or gel"],side:["Periods","usually stop as","the ovaries quieten"],sideKind:"note",body:["Your body","voice, hair, muscle","change slowly"],note:["In the body","some becomes DHT (skin,","hair), some estradiol (bone)"],
  cap:"Masculinising: testosterone from your medicine enters the bloodstream. The brake quietens LH and FSH, so the ovaries make less estradiol and periods usually stop. In the skin some testosterone becomes DHT, which drives facial hair and acne, and some becomes estradiol, which helps protect bone."}};
function node(x,y,w,h,title,sub,cls){return `<g class="ax-node ${cls||""}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14"/><text x="${x+w/2}" y="${y+h/2-(sub?3:-5)}" class="ax-t">${title}</text>${sub?`<text x="${x+w/2}" y="${y+h/2+14}" class="ax-s">${sub}</text>`:""}</g>`;}
function lines(x,y,arr){return arr.map((t,i)=>`<text x="${x}" y="${y+i*15}" class="${i===0?"ax-t":"ax-s"}">${t}</text>`).join("");}
function draw(p){const t=T[p];
  const svg=`<svg viewBox="0 0 400 432" role="img" aria-labelledby="axT axD"><title id="axT">The hormone control loop, ${p==="fem"?"feminising":"masculinising"}</title><desc id="axD">${esc(t.cap)}</desc>
<defs>${arrowDefs("ax")}</defs>
${node(80,14,160,46,"Hypothalamus","in the brain")}
<path class="ax-ar main" d="M160 60v34" marker-end="url(#ax-i)"/><text x="170" y="82" class="ax-l">GnRH</text>
${node(80,98,160,46,"Pituitary gland","under the brain")}
<path class="ax-ar main quiet" d="M160 144v34" marker-end="url(#ax-i)"/><text x="170" y="166" class="ax-l">LH and FSH: quieter</text>
${node(80,182,160,46,t.gon,t.gonSub,"gon")}
<path class="ax-ar main quiet" d="M160 228v34" marker-end="url(#ax-i)"/><text x="170" y="250" class="ax-l">${t.own}</text>
${node(80,266,160,46,"Bloodstream","your hormone levels","blood")}
<path class="ax-ar main" d="M160 312v34" marker-end="url(#ax-i)"/>
<g class="ax-node body"><rect x="80" y="350" width="160" height="62" rx="14"/>${lines(160,374,t.body)}</g>
<g class="ax-side ${t.sideKind}"><rect x="262" y="176" width="130" height="58" rx="12"/>${lines(327,198,t.side)}</g>
${t.sideKind==="block"?`<path class="ax-ar block" d="M262 205h-16" marker-end="url(#ax-t)"/>`:`<path class="ax-ar soft" d="M262 205h-18"/>`}
<g class="ax-med"><rect x="262" y="258" width="130" height="62" rx="12"/>${lines(327,280,t.med)}</g>
<path class="ax-ar med" d="M262 289h-18" marker-end="url(#ax-h)"/>
${t.note?`<g class="ax-side note"><rect x="262" y="350" width="130" height="62" rx="12"/>${lines(327,370,t.note)}</g><path class="ax-ar soft" d="M262 381h-18"/>`:""}
<path class="ax-ar brake" d="M80 289H40V37h36" marker-end="url(#ax-d)"/><path class="ax-ar brake" d="M40 121h36" marker-end="url(#ax-d)"/>
<g class="ax-brake"><circle cx="40" cy="205" r="13"/><path d="M34 205h12"/></g>
<text class="ax-v" transform="translate(20 166) rotate(-90)">the brake</text><text class="ax-v" transform="translate(20 252) rotate(-90)">feedback</text>
<circle class="ax-dot" r="4"><animateMotion dur="3.2s" repeatCount="indefinite" path="M160 60v34"/></circle>
<circle class="ax-dot q" r="3.4"><animateMotion dur="5.6s" repeatCount="indefinite" path="M160 144v34" begin="1.2s"/></circle>
<circle class="ax-dot med" r="4"><animateMotion dur="2.6s" repeatCount="indefinite" path="M262 289h-18"/></circle>
<circle class="ax-dot brk" r="4"><animateMotion dur="4.4s" repeatCount="indefinite" path="M80 289H40V37h36"/></circle>
</svg>`;
  host.innerHTML=svg;if(cap)cap.textContent=t.cap;liveSVG(host.querySelector("svg"));}
radioChips($("#axisPick"),b=>draw(b.dataset.axis));draw("fem");
})();

/* 2. Breathing, with and without a tight binder: the rib cage and diaphragm seen from the front.
   From the front, each rib rises from its cartilage toward the side wall, where it turns back toward the spine,
   so the ribs read as downward-pointing chevrons. Costal cartilages (paler) join ribs 1 to 7 to the breastbone
   and ribs 8 to 10 to the cartilage above, forming the lower edge of the cage. */
(function(){const host=$("#ribFig");if(!host)return;const cap=$("#ribCap");
const CAP={free:"Breathing in without a binder: the dome-shaped diaphragm flattens and moves down, the lower ribs swing outward like the handle of a bucket, and the breastbone lifts forward, so the lungs fill easily. The movement pauses when Motion is set to Still.",
 bound:"Breathing in with a tight binder: the ribs are held in, so each breath is shallower, and the neck muscles that lift the upper ribs work harder to help. Taking the binder off for breaks lets the ribs and breathing muscles move freely again."};
/* the chest, neck and shoulders around the rib cage, drawn in the same style as the body map's figure */
const TORSO="M202.0 -4.0C205.9 -0.3 202.4 8.4 203.0 14.0C203.5 19.0 203.2 24.1 205.0 28.0C206.7 31.6 209.1 34.5 213.0 37.0C218.7 40.7 229.0 42.6 238.0 45.0C248.4 47.7 261.7 49.2 272.0 52.0C280.8 54.4 289.6 55.9 296.0 60.0C301.6 63.6 306.5 68.6 309.0 74.0C311.4 79.3 310.8 85.8 311.0 92.0C311.2 98.5 309.8 104.8 310.0 112.0C310.2 120.6 312.6 130.3 313.0 140.0C313.4 150.3 312.8 161.4 312.0 172.0C311.2 182.7 309.7 193.4 308.0 204.0C306.3 214.7 303.7 225.9 302.0 236.0C300.4 245.1 305.6 255.5 298.0 262.0C275.3 281.5 84.7 281.5 62.0 262.0C54.4 255.5 59.6 245.1 58.0 236.0C56.3 225.9 53.7 214.7 52.0 204.0C50.3 193.4 48.8 182.7 48.0 172.0C47.2 161.4 46.6 150.3 47.0 140.0C47.4 130.3 49.8 120.6 50.0 112.0C50.2 104.8 48.8 98.5 49.0 92.0C49.2 85.8 48.6 79.3 51.0 74.0C53.5 68.6 58.4 63.6 64.0 60.0C70.4 55.9 79.2 54.4 88.0 52.0C98.3 49.2 111.6 47.7 122.0 45.0C131.0 42.6 141.3 40.7 147.0 37.0C150.9 34.5 153.3 31.6 155.0 28.0C156.8 24.1 156.5 19.0 157.0 14.0C157.6 8.4 154.1 -0.3 158.0 -4.0C164.0 -9.7 196.0 -9.7 202.0 -4.0Z",TORSO_L="M62.0 262.0C62.0 262.0 59.6 245.1 58.0 236.0C56.3 225.9 53.7 214.7 52.0 204.0C50.3 193.4 48.8 182.7 48.0 172.0C47.2 161.4 46.6 150.3 47.0 140.0C47.4 130.3 49.8 120.6 50.0 112.0C50.2 104.8 48.8 98.5 49.0 92.0C49.2 85.8 48.6 79.3 51.0 74.0C53.5 68.6 58.4 63.6 64.0 60.0C70.4 55.9 79.2 54.4 88.0 52.0C98.3 49.2 111.6 47.7 122.0 45.0C131.0 42.6 141.3 40.7 147.0 37.0C150.9 34.5 153.3 31.6 155.0 28.0C156.8 24.1 156.5 19.0 157.0 14.0C157.6 8.4 158.0 -4.0 158.0 -4.0",TORSO_R="M202.0 -4.0C202.0 -4.0 202.4 8.4 203.0 14.0C203.5 19.0 203.2 24.1 205.0 28.0C206.7 31.6 209.1 34.5 213.0 37.0C218.7 40.7 229.0 42.6 238.0 45.0C248.4 47.7 261.7 49.2 272.0 52.0C280.8 54.4 289.6 55.9 296.0 60.0C301.6 63.6 306.5 68.6 309.0 74.0C311.4 79.3 310.8 85.8 311.0 92.0C311.2 98.5 309.8 104.8 310.0 112.0C310.2 120.6 312.6 130.3 313.0 140.0C313.4 150.3 312.8 161.4 312.0 172.0C311.2 182.7 309.7 193.4 308.0 204.0C306.3 214.7 303.7 225.9 302.0 236.0C300.4 245.1 298.0 262.0 298.0 262.0";
const torsoDefs=`<linearGradient id="rbG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--fig-a)"/><stop offset="1" style="stop-color:var(--fig-b)"/></linearGradient><linearGradient id="rbX" x1="0" y1="0" x2="1" y2="0"><stop offset="0" style="stop-color:var(--fig-hi);stop-opacity:.6"/><stop offset=".45" style="stop-color:var(--fig-hi);stop-opacity:0"/><stop offset="1" style="stop-color:var(--haem);stop-opacity:.08"/></linearGradient><clipPath id="rbC"><path d="${TORSO}"/></clipPath><linearGradient id="rbF" x1="0" y1="0" x2="0" y2="1"><stop offset=".74" stop-color="#fff"/><stop offset=".97" stop-color="#000"/></linearGradient><mask id="rbM" maskUnits="userSpaceOnUse" x="0" y="0" width="360" height="252"><rect width="360" height="252" fill="url(#rbF)"/></mask>`;
const torso=`<g class="rb-torso" mask="url(#rbM)"><path d="${TORSO}" fill="url(#rbG)"/><path d="${TORSO}" fill="url(#rbX)"/><path class="fg-rim" d="${TORSO_L}" stroke-width="12" clip-path="url(#rbC)"/><path class="fg-rim" d="${TORSO_R}" stroke-width="12" clip-path="url(#rbC)"/><path class="fg-line" d="${TORSO_L}"/><path class="fg-line" d="${TORSO_R}"/></g>`;
const cx=180;const R=[ /* [half-width at the side wall, y there, cartilage junction x-offset, y there, y where the cartilage meets the breastbone or null] */
 [52,62,30,70,58],[76,70,40,88,76],[94,80,48,104,92],[106,92,54,120,108],[114,106,60,136,124],[118,120,64,152,140],[120,134,64,168,156],[119,148,72,182,null],[114,162,82,194,null],[106,176,90,204,null]];
function side(sg){let b="",c="";R.forEach((r,i)=>{const [W,yl,ci,yc,ys]=r;const X=v=>cx+sg*v;
  b+=`<path class="rib${i>6?" fl":""}" d="M${X(ci)} ${yc}C${X(ci+(W-ci)*.5)} ${yc-(yc-yl)*.9} ${X(W-2)} ${yl-3} ${X(W+1)} ${yl+11}"/>`;
  if(ys!=null)c+=`<path class="cart" d="M${X(ci)} ${yc}Q${X((ci+8)/2+4)} ${(yc+ys)/2+2} ${X(8)} ${ys}"/>`;
  else{const p=R[i-1];c+=`<path class="cart" d="M${X(ci)} ${yc}L${X(p[2])} ${p[3]}"/>`;}});return b+c;}
function draw(mode){const free=mode==="free";
  host.innerHTML=`<svg viewBox="0 0 360 252" class="rib-svg ${mode}" role="img" aria-labelledby="rbT rbD"><title id="rbT">Breathing ${free?"without a binder":"with a tight binder"}</title><desc id="rbD">${CAP[mode]}</desc><defs>${arrowDefs("rb")}${torsoDefs}</defs>${torso}
<g class="lungs"><path d="M170 56C148 38 108 46 88 80C72 112 68 156 76 188C82 152 100 122 126 122C144 122 156 136 166 140Z"/><path d="M190 56C212 38 252 46 272 80C288 112 292 156 284 190C278 156 260 126 234 126C216 126 204 138 194 142Z"/></g>
<g class="accm"><path d="M162 6l10 46M198 6l-10 46"/><path d="M161 16l-18 30M199 16l18 30"/></g>
<path class="clav" d="M172 54c-22-8-48-10-82-4M188 54c22-8 48-10 82-4"/>
<g class="cage"><g class="ribs">${side(-1)}${side(1)}</g><path class="sternum" d="M172 50h16l-2 24 2 84-8 18-8-18 2-84z"/></g>
<path class="dia" d="M76 190C80 150 100 120 126 120C148 120 162 140 180 144C198 140 212 124 234 124C260 124 280 152 284 192"/>
${free?"":`<g class="binder"><rect x="52" y="72" width="256" height="124" rx="22"/><text x="${cx}" y="112" class="rb-in">binder</text></g>`}
${free?`<path class="rb-ar" d="M54 158H26" marker-end="url(#rb-h)"/><path class="rb-ar" d="M306 158h28" marker-end="url(#rb-h)"/><path class="rb-ar" d="M126 128v18" marker-end="url(#rb-h)"/><path class="rb-ar" d="M234 132v18" marker-end="url(#rb-h)"/>
<text x="30" y="178" class="rb-l c">ribs</text><text x="30" y="192" class="rb-l c">widen</text><text x="330" y="178" class="rb-l c">ribs</text><text x="330" y="192" class="rb-l c">widen</text><text x="${cx}" y="238" class="rb-l c">the diaphragm flattens and moves down</text>`
:`<path class="rb-ar hold" d="M22 158h20" marker-end="url(#rb-sl)"/><path class="rb-ar hold" d="M338 158h-20" marker-end="url(#rb-sl)"/>
<text x="26" y="178" class="rb-l c">held</text><text x="26" y="192" class="rb-l c">in</text><text x="334" y="178" class="rb-l c">held</text><text x="334" y="192" class="rb-l c">in</text><path class="rb-ar up" d="M246 40l18-18" marker-end="url(#rb-d)"/><text x="270" y="18" class="rb-l">neck muscles</text><text x="270" y="32" class="rb-l">work harder</text><text x="${cx}" y="238" class="rb-l c">shallower breaths, less room to move</text>`}
</svg>`;if(cap)cap.textContent=CAP[mode];
  const svg=host.querySelector("svg");let vis=false;const sync=()=>svg.classList.toggle("go",vis&&motionOK());whenVisible(svg,v=>{vis=v;sync();});onMotion(sync);sync();}
radioChips($("#ribPick"),b=>draw(b.dataset.rib));draw("free");
})();

/* 3. Minority stress: outside events, inner stress, wellbeing; and what protects */
(function(){const host=$("#stressFig");if(!host)return;const cap=$("#stressCap");
const CAP={load:"How minority stress builds up: events from outside lead to stress on the inside, and together they wear on mental health. Choose \"What protects\" to see what softens it.",
 buffer:"What protects: support from other people, connection with community, pride and affirming care are linked with less of the stress getting through, like a cushion. They don't make prejudice acceptable."};
function chip(x,y,w,t){return `<g class="sx-chip"><rect x="${x}" y="${y}" width="${w}" height="28" rx="14"/><text x="${x+w/2}" y="${y+18.5}">${t}</text></g>`;}
function draw(mode){const b=mode==="buffer";
  host.innerHTML=`<svg viewBox="0 0 360 430" class="sx ${mode}" role="img" aria-labelledby="sxT sxD"><title id="sxT">${b?"What protects against minority stress":"How minority stress builds up"}</title><desc id="sxD">${CAP[mode]}</desc><defs>${arrowDefs("sx")}</defs>
<g class="sx-tier out"><rect x="12" y="10" width="336" height="112" rx="18"/><text x="28" y="34" class="sx-h">From outside</text>
${chip(28,46,148,"Rejection")}${chip(184,46,148,"Discrimination")}${chip(28,82,148,"Violence")}${chip(184,82,148,"Being misgendered")}</g>
<path class="sx-ar a1" d="M120 124v58" marker-end="url(#sx-i)"/><path class="sx-ar a2" d="M240 124v58" marker-end="url(#sx-i)"/>
${b?`<g class="sx-shield"><rect x="40" y="136" width="280" height="30" rx="15"/><text x="180" y="156">support · community · pride</text></g>`:""}
<g class="sx-tier in"><rect x="12" y="186" width="336" height="112" rx="18"/><text x="28" y="210" class="sx-h">Inside</text>
${chip(28,222,148,"Expecting rejection")}${chip(184,222,148,"Hiding who you are")}${chip(28,258,304,"Turning prejudice on yourself")}</g>
<path class="sx-ar a3" d="M180 300v50" marker-end="url(#sx-i)"/>
${b?`<g class="sx-shield"><rect x="40" y="308" width="280" height="30" rx="15"/><text x="180" y="328">affirming care · documents · safety</text></g>`:""}
<g class="sx-tier well"><rect x="12" y="356" width="336" height="62" rx="18"/><text x="180" y="384" class="sx-h c">${b?"Mental health is better protected":"Anxiety, low mood and distress"}</text><text x="180" y="404" class="sx-s c">${b?"stress is still real, but less gets through":"more likely when stress piles up"}</text></g>
${[0,1,2].map(i=>`<circle class="sx-dot${b&&i>0?" stop":""}" r="4"><animateMotion dur="3.6s" begin="${i*1.2}s" repeatCount="indefinite" path="${b&&i>0?"M120 124v12":"M120 124v58"}"/></circle><circle class="sx-dot${b&&i>0?" stop":""}" r="4"><animateMotion dur="3.6s" begin="${i*1.2+.6}s" repeatCount="indefinite" path="${b&&i>0?"M240 124v12":"M240 124v58"}"/></circle>`).join("")}
${[0,1,2].map(i=>`<circle class="sx-dot${b&&i>0?" stop":""}" r="4"><animateMotion dur="3.6s" begin="${i*1.2+.3}s" repeatCount="indefinite" path="${b&&i>0?"M180 300v8":"M180 300v50"}"/></circle>`).join("")}
</svg>`;if(cap)cap.textContent=CAP[mode];liveSVG(host.querySelector("svg"));}
radioChips($("#stressPick"),bt=>draw(bt.dataset.stress));draw("load");
})();

/* 4. After top surgery: keep elbows below shoulder height for about four weeks */
(function(){const host=$("#armFig");if(!host)return;
const J=[233.2,118.8],r=112;
host.innerHTML=`<svg viewBox="0 0 424 300" role="img" aria-labelledby="amT amD"><title id="amT">Arm movement in the first four weeks after top surgery</title><desc id="amD">A figure seen from the front with healing scars under the chest. One arm is raised sideways to shoulder height, the highest point for about the first four weeks; the other rests by the side. Below shoulder height is marked gentle movement; above it is marked wait until about week 4.</desc>
<defs>${figureDefs("amf",{raised:true,fade:[.5,.6]})}<pattern id="amH" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0v7" class="am-hatch"/></pattern>
<radialGradient id="amOk" cx="1" cy="0" r="1"><stop offset="0" style="stop-color:var(--sage-soft);stop-opacity:1"/><stop offset="1" style="stop-color:var(--sage-soft);stop-opacity:.55"/></radialGradient></defs>
<path class="am-zone ok" d="M${J[0]} ${J[1]}H${J[0]-r}A${r} ${r} 0 0 0 ${J[0]} ${J[1]+r}Z" fill="url(#amOk)"/>
<path class="am-zone wait" d="M${J[0]} ${J[1]}H${J[0]-r}A${r} ${r} 0 0 1 ${J[0]} ${J[1]-r}Z"/><path class="am-zone hatch" d="M${J[0]} ${J[1]}H${J[0]-r}A${r} ${r} 0 0 1 ${J[0]} ${J[1]-r}Z" fill="url(#amH)"/>
<path class="am-line" d="M12 ${J[1]}H416"/>
<g transform="translate(150 34) scale(.8)">${figureG("amf",{raised:true,fade:true,scars:true})}</g>
<text x="138" y="54" class="am-l wait">wait until</text><text x="138" y="70" class="am-l wait">about week 4</text>
<text x="138" y="170" class="am-l ok">gentle</text><text x="138" y="186" class="am-l ok">movement</text>
<text x="322" y="111" class="am-l">shoulder height</text>
</svg>`;})();

/* 5. One year on hormones: average change from the start, two series side by side */
(function(){const host=$("#oneYear");if(!host)return;
const ROWS=[{k:"Thigh muscle volume",e:-5,t:15,src:"WIIK2020",who:"23 people, Sweden"},{k:"Leg fat",e:42,t:-16,src:"KLAVER2018",who:"341 people, ENIGI study"},{k:"Hip-area fat",e:34,t:-14,src:"KLAVER2018",who:"341 people, ENIGI study"},{k:"Belly fat",e:18,t:1,src:"KLAVER2018",who:"341 people, ENIGI study"},{k:"Hip bone density",e:1,t:1,src:"WIEPJES2017",who:"430 people, ENIGI study"}];
const MIN=-25,MAX=50,span=MAX-MIN,zero=(-MIN)/span*100;const x=v=>(v-MIN)/span*100;
const fmt=v=>(v>0?"+":v<0?"−":"")+Math.abs(v)+"%";
let h=`<div class="oy-legend" aria-hidden="true"><span><i class="sw s1"></i>Estradiol</span><span><i class="sw s2"></i>Testosterone</span></div><div class="oy" role="list" aria-label="Average change after one year of hormones">`;
ROWS.forEach(r=>{h+=`<div class="oy-row" role="listitem"><span class="oy-k">${r.k}</span><span class="oy-plot"><i class="oy-zero" style="left:${zero}%"></i>${[["e","s1","Estradiol"],["t","s2","Testosterone"]].map(([key,cls,name])=>{const v=r[key];const a=Math.min(x(v),zero),w=Math.max(.6,Math.abs(x(v)-zero));
    return `<span class="oy-bar-wrap"><span class="oy-bar ${cls} ${v<0?"neg":"pos"}" role="img" tabindex="0" data-tip="${name}|${r.k}: ${fmt(v)} after one year|${r.who}" aria-label="${name}, ${r.k}: ${v<0?"down":"up"} ${Math.abs(v)}% after one year (${r.who})" style="left:${a}%;width:${w}%"></span><b class="oy-v ${v<0?"neg":"pos"}" style="${v<0?`right:${(100-a+1).toFixed(2)}%`:`left:${(a+w+1).toFixed(2)}%`}">${fmt(v)}</b></span>`;}).join("")}</span></div>`;});
h+=`</div><div class="oy-axis" aria-hidden="true"><span class="oy-k"></span><span class="oy-plot">${[-20,0,20,40].map(v=>`<i style="left:${x(v)}%">${v>0?"+":v<0?"−":""}${Math.abs(v)}%</i>`).join("")}</span></div>
<details class="acc pro oy-tbl"><summary><span><span class="s-title">See this as a table</span><span class="s-sub">The same averages, with who was studied</span></span></summary><div class="acc-body" style="max-width:none"><div class="tbl-wrap"><table><caption class="sr-only">Average change after one year</caption><thead><tr><th scope="col">Measure</th><th scope="col">Estradiol</th><th scope="col">Testosterone</th><th scope="col">Studied</th></tr></thead><tbody>${ROWS.map(r=>`<tr><th scope="row">${r.k}</th><td>${fmt(r.e)}</td><td>${fmt(r.t)}</td><td>${r.who} <span class="ev" data-r="${r.src}"></span></td></tr>`).join("")}</tbody></table></div><p class="small muted">Hip bone density rose by about 1% in both groups (0.97% and 1.04%); spine density rose by 3.7% in trans women.</p></div></details>`;
host.innerHTML=h;
host.addEventListener("pointerover",e=>{const b=e.target.closest(".oy-bar");if(b)showTip(b,b.dataset.tip.split("|"),e.clientX);});
host.addEventListener("pointermove",e=>{const b=e.target.closest(".oy-bar");if(b)showTip(b,b.dataset.tip.split("|"),e.clientX);});
host.addEventListener("pointerout",e=>{if(e.target.closest(".oy-bar"))hideTip();});
host.addEventListener("focusin",e=>{const b=e.target.closest(".oy-bar");if(b)showTip(b,b.dataset.tip.split("|"));});
host.addEventListener("focusout",hideTip);
})();

/* 6. The seven stages as a growth series, from seed to full flower, like a botanical plate.
   Each plant is a button that opens its stage below. On phones only the numbers show; the names are in the list. */
(function(){const host=$("#stem");if(!host)return;
const ST=[["Wondering","Any age, any length"],["Finding care","Weeks to months"],["Deciding","A few appointments"],["Starting hormones","The first 3 months"],
  ["Visible change","3 to 12 months"],["Growing into yourself","1 to 3 years"],["Settled","3 years and beyond"]];
const leaf=(x,y,a,l,w)=>`<path class="leaf" d="M0 0C${l*.3} ${-w} ${l*.72} ${-w} ${l} 0C${l*.72} ${w} ${l*.3} ${w} 0 0Z" transform="translate(${x} ${y}) rotate(${a})"/>`;
const stem=h=>`<path class="stalk" d="M0 0C1.5 ${-h*.3} -1.5 ${-h*.62} 0 ${-h}"/>`;
const root=`<path class="root" d="M0 1c-2 5 1 9-1 15M0 4c3 3 7 4 9 9M0 5c-3 3-7 4-8 8"/>`;
function head(cx,cy,n,len,w,r,from,to){let s="";for(let k=0;k<n;k++){const a=from+(to-from)*(n===1?0:k/(to-from>=359?n:n-1));s+=`<ellipse class="pet" cx="0" cy="${-r-len/2}" rx="${w}" ry="${len/2}" transform="translate(${cx} ${cy}) rotate(${a.toFixed(1)})"/>`;}return s;}
const PLANT=[
  /* 1 seed with its first root and a shoot just reaching the surface */
  `<ellipse class="seed" cx="-1" cy="11" rx="7" ry="4.6" transform="rotate(-18 -1 11)"/><path class="root" d="M-5 13c-2 3-1 6-3 8M2 14c1 3 4 4 4 7"/><path class="stalk thin" d="M3 8c3-3 2-6 0-9"/>`,
  /* 2 sprout with two seed leaves */
  root+stem(34)+leaf(0,-34,-152,19,6)+leaf(0,-34,-28,19,6),
  /* 3 young plant with true leaves */
  root+stem(68)+leaf(0,-20,-162,28,9)+leaf(0,-32,-18,28,9)+leaf(0,-50,-146,22,7)+leaf(0,-58,-34,20,6.5)+leaf(0,-68,-96,10,3.4),
  /* 4 a closed bud */
  root+stem(100)+leaf(0,-22,-164,32,10)+leaf(0,-36,-16,32,10)+leaf(0,-58,-148,26,8)+leaf(0,-70,-32,24,7.5)+
    `<path class="bud" d="M0-98C-8-101-9-116 0-127 9-116 8-101 0-98Z"/><path class="pet" d="M-2.6-121Q0-131 2.6-121Z"/><path class="sepal" d="M0-99l-6-9M0-99l6-9"/>`,
  /* 5 the bud opening, colour showing */
  root+stem(110)+leaf(0,-22,-164,32,10)+leaf(0,-36,-16,32,10)+leaf(0,-60,-148,27,8.5)+leaf(0,-74,-32,25,8)+
    head(0,-112,5,24,4.2,1,-44,44)+`<circle class="disc" cx="0" cy="-114" r="3.6"/><path class="sepal" d="M0-110l-8-6M0-110l8-6M0-110v-7"/>`,
  /* 6 half open */
  root+stem(122)+leaf(0,-22,-164,33,10.5)+leaf(0,-36,-16,33,10.5)+leaf(0,-62,-148,28,9)+leaf(0,-78,-32,26,8)+
    head(0,-130,11,26,3.6,5,-82,82)+`<ellipse class="disc" cx="0" cy="-130" rx="9.5" ry="5.5"/>`,
  /* 7 in full flower */
  root+stem(128)+leaf(0,-22,-164,34,11)+leaf(0,-36,-16,34,11)+leaf(0,-62,-148,29,9)+leaf(0,-80,-32,27,8.5)+
    head(0,-152,21,27,3.4,9,0,360)+`<circle class="disc" cx="0" cy="-152" r="11"/><circle class="disc-d" cx="-3" cy="-155" r="1.3"/><circle class="disc-d" cx="3" cy="-150" r="1.3"/><circle class="disc-d" cx="2" cy="-157" r="1.1"/><circle class="disc-d" cx="-4" cy="-149" r="1.1"/>`];
function myStage(){const st=MS.start();if(!st)return 0;const [y,m,d]=st.split("-").map(Number);const s=new Date(y,m-1,d),t=new Date();let mo=(t.getFullYear()-s.getFullYear())*12+(t.getMonth()-s.getMonth());if(t.getDate()<s.getDate())mo--;if(mo<0)return 0;return mo<3?4:mo<12?5:mo<36?6:7;}
function draw(){const here=myStage();
  host.innerHTML=`<ol class="grow">`+ST.map((s,i)=>`<li><button type="button" class="gs${here===i+1?" here":""}" data-stage="${i+1}" style="--n:${i}">`+
    `<svg viewBox="-60 -196 120 220" aria-hidden="true" focusable="false"><rect class="soil" x="-61" y="0" width="122" height="24"/><path class="ground" d="M-61 0H61"/>`+
    (here===i+1?`<circle class="here-glow" cx="0" cy="${i<2?-18:-70-i*8}" r="${i<2?34:52}"/>`:"")+`<g class="pl">${PLANT[i]}</g></svg>`+
    `<span class="gs-n">${i+1}</span><span class="gs-l"><span class="gs-t">${s[0]}</span><span class="gs-s">${s[1]}</span>${here===i+1?`<span class="here-tag">You're about here</span>`:""}</span></button></li>`).join("")+`</ol>`;
  const ol=host.firstChild;let done=false;whenVisible(ol,v=>{if(!v||done||!motionOK())return;done=true;ol.classList.add("go");setTimeout(()=>ol.classList.remove("go"),2200);});}
function open(n){const li=D.getElementById("stage-"+n);if(!li)return;const det=li.querySelector("details");if(det&&!det.open)det.open=true;li.scrollIntoView({block:"start",behavior:motionOK()?"smooth":"auto"});const s=li.querySelector("summary");if(s)setTimeout(()=>s.focus({preventScroll:true}),motionOK()?450:0);}
host.addEventListener("click",e=>{const g=e.target.closest("[data-stage]");if(g)open(g.dataset.stage);});
D.addEventListener("aster:milestones",draw);draw();
})();
