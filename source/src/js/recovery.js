/* ---------- Surgery recovery, stage by stage ----------
   From surgical teams' published instructions (UCSF, Michigan Medicine, UW Medicine, healthdirect)
   and the studies cited. Each line carries its source; "cons" marks clinicians' consensus. */
const REC={
top:{n:"Top surgery",note:"Recovery after chest reconstruction. Timings from Michigan Medicine and UW Medicine instructions; your surgeon's plan comes first.",ph:[
 {t:"The first days",e:[["Your chest is bandaged or in a compression garment, and many surgeons use small drains for some days. Follow your team's plan for dressings and showering.","cons"]],
  m:[["Short walks around home. Move your arms gently, keeping your elbows below shoulder height.","UWTOP"]],
  w:[["One side swelling quickly, feeling tight or very painful: this can be bleeding under the skin (haematoma), which needed an urgent return to theatre for 6% of operated sides across studies. Call your team straight away.","WILSON2018"]]},
 {t:"Weeks 1 to 4",e:[["Swelling and bruising settle, and numbness across the chest is common.","cons"]],
  m:[["Elbows below shoulder height, and nothing heavier than about 2 kg.","UWTOP MICHTOP"]],
  w:[["A fever, spreading redness or discharge from a wound.","cons"]]},
 {t:"Weeks 4 to 6",e:[["Most people go back to work in 4 to 6 weeks, depending on the job.","MICHTOP"]],
  m:[["Gradually reach higher and start gentle shoulder and upper-back mobility, as your surgeon allows.","UWTOP"]],
  w:[["Shoulder pain or stiffness that is getting worse rather than better.","cons"]]},
 {t:"6 weeks to 3 months",e:[["Scars are red and firm, and swelling keeps settling.","cons"]],
  m:[["Build back to exercise gradually. Avoid anything that risks a blow to the chest for at least 6 weeks, and start chest exercises when your surgeon says.","MICHTOP"]],w:[]},
 {t:"3 months and beyond",e:[["Changed sensation, tightness and stiff shoulders were common months later in one survey, mostly mild apart from changed sensation, and most people hadn't sought help for them.","LANG2026"]],
  m:[["A physiotherapist or osteopath may help with scar mobility, shoulder range and posture.","LANG2026"]],
  w:[["There's no set screening after top surgery. Be chest aware: get to know how your chest looks and feels, see your GP about any changes, and ask whether any breast tissue was left.","AUSPATH2025 BREASTSCREEN"]]}]},
vag:{n:"Vaginoplasty",note:"Recovery after vaginoplasty. Timings from UCSF guidance; dilation schedules vary between surgeons, and yours comes first.",ph:[
 {t:"In hospital",e:[["Usually a urinary catheter and packing in the new vagina for the first days. Your team will tell you how long you'll stay.","cons"],["Dilation begins once the packing is removed.","UCSFVAG"]],
  m:[["Walking as soon as your team allows helps prevent blood clots.","cons"]],
  w:[["Pain, swelling or warmth in one calf, or any breathlessness.","cons"]]},
 {t:"Weeks 1 to 6",e:[["Dilating about three times a day. Swelling settles over 6 to 8 weeks, and sitting can be uncomfortable for the first month; a soft cushion helps.","UCSFVAG"]],
  m:[["Short, regular walks. No strenuous activity for 6 weeks, and no baths for 8 weeks.","UCSFVAG"]],
  w:[["Heavy bleeding, a fever, not being able to pass urine, or a dilator that won't go in as far as before.","cons"]]},
 {t:"6 weeks to 3 months",e:[["Ask your surgeon how much time to plan off work: it depends on your job and your recovery.","cons"]],
  m:[["Light exercise as your team allows. No swimming or cycling until about 3 months.","UCSFVAG"]],
  w:[["Gas or faeces coming from the vagina needs prompt review: it can be a sign of a fistula, which happened in 1% across studies.","BUSTOSVAG"]]},
 {t:"3 months and beyond",e:[["Dilation becomes less frequent, on your surgeon's schedule. Sex from about 3 months, once your team says you've healed.","UCSFVAG"]],
  m:[["A pelvic floor physiotherapist can help with dilation and pelvic floor function.","JIANG2019"]],
  w:[["Narrowing of the vagina (stenosis) happened in 11% across studies; regular dilation keeps the canal open. Your prostate stays, so keep up prostate checks as you age.","BUSTOSVAG UCSFVAG DENIE2020"]]}]},
phallo:{n:"Phalloplasty or metoidioplasty",note:"Recovery after phalloplasty, from UCSF guidance and a review of 39 studies. Metoidioplasty has no donor site and a shorter recovery, but the same urethral problems can occur: a fistula in 5 to 37% and a stricture in 2 to 35%, depending on the technique.",ev:"JOLLY2021",ph:[
 {t:"In hospital",e:[["A urinary catheter, and close checks of the new penis's blood supply in the first days.","cons"]],
  m:[["Walking as soon as your team allows.","cons"]],
  w:[["A change in the colour or warmth of the penis, such as turning pale, blue or dark, or feeling cold: tell your team immediately. After you're home, call them straight away or go to an emergency department.","cons"]]},
 {t:"Weeks 1 to 6",e:[["Caring for the donor site, often the forearm or thigh, which can bring scarring, wound breakdown, pain, and reduced feeling or movement.","UCSFPHALLO"]],
  m:[["Gentle walking, and hand therapy if your forearm was used, as your team advises.","cons"]],
  w:[["Not being able to pass urine is urgent: call your team or go to an emergency department.","cons"]]},
 {t:"6 to 12 months",e:[["Further stages are common: phalloplasty usually happens in several operations.","UCSFPHALLO"]],m:[],
  w:[["A weak, spraying or slow stream, or straining to pass urine, can mean the urethra is narrowing (a stricture), which typically appears 6 to 12 months after surgery. A leak from a new opening (a fistula) also needs review. Across studies, fistula affected 34% and stricture 25%.","UCSFPHALLO WANG2022"]]},
 {t:"From about 9 months",e:[["An implant for erections, if you want one, is typically placed about 9 months or more after the penis is made. Feeling returns gradually: 94% could feel touch.","UCSFPHALLO WANG2022"]],
  m:[],w:[["Check-ups every 3 months in the first year are suggested.","UCSFPHALLO"]]}]},
hyst:{n:"Hysterectomy",note:"Recovery after hysterectomy, from healthdirect Australia.",ph:[
 {t:"In hospital, 2 to 5 days",e:[["Usually 2 to 5 days in hospital.","HDHYST"]],m:[["Walking as soon as your team allows.","cons"]],w:[["Pain, swelling or warmth in one calf, or any breathlessness.","cons"]]},
 {t:"Weeks 1 to 6",e:[["Tiredness is common. It can take up to 5 to 7 weeks to return to your usual activities.","HDHYST"]],
  m:[["Walk every day. Avoid heavy lifting and strenuous activity, and penetrative sex, for 4 to 6 weeks.","HDHYST"]],
  w:[["Heavy bleeding, a fever, a bad-smelling discharge, or pain that is getting worse.","cons"]]},
 {t:"Longer term",e:[["If your ovaries were removed, keep taking testosterone to protect your bones. Ask whether you still need cervical screening: it depends on whether the cervix was removed.","AUSPATH2025 ISCD2019"]],m:[],w:[]}]}
};
(function(){const line=$("#recLine");if(!line)return;const note=$("#recNote");
function item(arr){return arr.map(([t,r])=>`<li>${esc(t)} <span class="ev"${r==="cons"?` data-g="cons"`:` data-r="${r}"`}></span></li>`).join("");}
function draw(k){const R=REC[k];line.innerHTML=R.ph.map((p,i)=>`<li class="rec-ph"><span class="rec-n" aria-hidden="true">${i+1}</span><div class="rec-card"><h3 class="h4">${esc(p.t)}</h3>
  ${p.e.length?`<div class="rec-b"><h4 class="rec-h">What to expect</h4><ul>${item(p.e)}</ul></div>`:""}${p.m.length?`<div class="rec-b mv"><h4 class="rec-h">Moving</h4><ul>${item(p.m)}</ul></div>`:""}${p.w.length?`<div class="rec-b wt"><h4 class="rec-h">Watch for</h4><ul>${item(p.w)}</ul></div>`:""}</div></li>`).join("");
  if(note){note.innerHTML=esc(R.note)+(R.ev?` <span class="ev" data-g="weak" data-r="${R.ev}"></span>`:"");}
  renderEv(line);if(note)renderEv(note);wireTerms(line);store.set("rec",k);}
const saved=store.get("rec","top");const chips=radioChips($("#recPick"),b=>draw(b.dataset.rec));if(chips&&REC[saved])chips.set(saved,"rec",false);draw(REC[saved]?saved:"top");
addToIndex(IDX=>{Object.keys(REC).forEach(k=>REC[k].ph.forEach(p=>{const t=[...p.e,...p.m,...p.w].map(x=>x[0]).join(" ");IDX.push({k:"fn",vl:"Surgery: recovery",t:REC[k].n+", "+p.t+": "+t,low:(REC[k].n+" "+p.t+" "+t).toLowerCase(),h:false,go:()=>{location.hash="recovery";setTimeout(()=>{if(chips)chips.set(k,"rec");},120);}});}));});
})();
