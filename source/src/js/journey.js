/* ---------- My milestones: private to this device, optionally locked with a passcode ----------
   Unlocked, milestones are kept in localStorage as plain JSON. With a passcode they are encrypted on the device
   (PBKDF2 with SHA-256, 250,000 rounds, then AES-GCM 256); the passcode itself is never stored. */
/* What the bloom and the home page can ask of the milestones: read-only, plus "add" */
const MS={items:()=>[],locked:()=>false,start:()=>"",path:()=>"",add:()=>false,ideas:()=>[]};
(function(){const tool=$("#msTool");if(!tool)return;
const enc=new TextEncoder(),dec=new TextDecoder();
const b64=buf=>{let s="";new Uint8Array(buf).forEach(b=>s+=String.fromCharCode(b));return btoa(s);};
const unb64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const cryptoOK=!!(window.crypto&&crypto.subtle&&window.isSecureContext!==false);
const ITER=250000;
async function deriveKey(pass,salt){const base=await crypto.subtle.importKey("raw",enc.encode(pass),"PBKDF2",false,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:ITER,hash:"SHA-256"},base,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);}

let data={start:"",path:"",items:[]};let key=null,salt=null;
const IDEAS=["Said it out loud","Told someone I trust","Tried my name somewhere safe","Booked my first appointment","Started hormones","First blood test","Three months on hormones","Called by my name at work or study","Changed my name legally","New birth certificate","A voice that feels like mine","One year on hormones","A day without thinking about my gender","Surgery day","Helped someone else find their way"];

async function save(){if(key){const iv=crypto.getRandomValues(new Uint8Array(12));const ct=await crypto.subtle.encrypt({name:"AES-GCM",iv},key,enc.encode(JSON.stringify(data)));store.set("ms",{locked:true,v:1,iter:ITER,salt:b64(salt),iv:b64(iv),ct:b64(ct)});}
  else store.set("ms",{locked:false,start:data.start,path:data.path,items:data.items});
  try{D.dispatchEvent(new CustomEvent("aster:milestones"));}catch(e){}}
function stored(){return store.get("ms",null);}

const L=$("#msList"),empty=$("#msEmpty"),since=$("#msSince"),startEl=$("#msStart"),lockState=$("#msLockState"),lockBtn=$("#msLockBtn");
function monthsSince(iso,ref){const [y,m,d]=iso.split("-").map(Number);const s=new Date(y,m-1,d),t=ref||new Date();let mo=(t.getFullYear()-s.getFullYear())*12+(t.getMonth()-s.getMonth());if(t.getDate()<s.getDate())mo--;return mo;}
function render(){
  startEl.value=data.start||"";startEl.max=todayISO();
  {const cs=$$("#msPath [role=radio]");const any=cs.some(c=>c.dataset.path===data.path);cs.forEach((c,i)=>{const on=c.dataset.path===data.path;c.setAttribute("aria-checked",on?"true":"false");c.tabIndex=on||(!any&&i===0)?0:-1;});}
  if(data.start){const mo=monthsSince(data.start);since.innerHTML=mo<0?`Your start date is in the future: ${esc(fmtDate(data.start))}.`:`You've been on hormones for <strong>${mo<1?"less than a month":esc(monthsWords(mo))}</strong>. <a href="#changes" id="msSeeNow">See what usually happens around now</a>.`;}else since.textContent="";
  const items=[...data.items].sort((a,b)=>(a.d||"").localeCompare(b.d||""));
  L.innerHTML=items.map(it=>{let rel="";if(data.start&&it.d){const mo=monthsSince(data.start,(()=>{const [y,m,d]=it.d.split("-").map(Number);return new Date(y,m-1,d);})());if(mo>=0)rel=mo<1?"in the first month":"at "+monthsWords(mo);}
    return `<li data-id="${it.id}"><span class="ms-dot" aria-hidden="true"></span><div class="ms-body"><p class="ms-t">${esc(it.t)}</p><p class="ms-d"><label class="sr-only" for="msd-${it.id}">Date for ${esc(it.t)}</label><input type="date" id="msd-${it.id}" value="${esc(it.d||"")}" max="${todayISO()}" data-edit-date>${rel?` <span class="muted">· ${rel}</span>`:""}</p></div><button type="button" class="mini" data-remove aria-label="Remove ${esc(it.t)}">Remove</button></li>`;}).join("");
  empty.hidden=items.length>0;
  {const left=IDEAS.filter(t=>!data.items.some(i=>i.t===t));$("#msIdeas").innerHTML=left.length?left.map(t=>`<button type="button" class="chip" data-idea="${esc(t)}">${ico("plus")}${esc(t)}</button>`).join(""):`<p class="small muted">You've marked every suggestion. Add your own below.</p>`;}
  if(!cryptoOK){lockBtn.hidden=true;lockState.textContent="Locking with a passcode isn't available in this browser.";}
  else if(key){lockBtn.textContent="Lock now";lockState.innerHTML=`Protected with a passcode on this device. <button type="button" class="linklike" id="msRemovePass">Remove the passcode</button>`;}
  else{lockBtn.textContent="Lock with a passcode";lockState.textContent="";}
}
/* The passcode box exists only while it's needed. It locks moments on this device; it isn't a website password,
   so browsers and password managers are asked not to save it, and it isn't part of the page the rest of the time. */
function passBox(form,id,label){let i=D.getElementById(id);if(i)return i;i=D.createElement("input");i.type="password";i.id=id;
  const at={autocomplete:"off",autocapitalize:"off",autocorrect:"off",spellcheck:"false","data-1p-ignore":"","data-lpignore":"true","aria-label":label,placeholder:label};
  for(const k in at)i.setAttribute(k,at[k]);if(id==="msNewPass")i.minLength=4;
  const b=form.querySelector("button[type=submit]");b.parentNode.insertBefore(i,b);return i;}
function dropBox(id){const i=D.getElementById(id);if(i)i.remove();}
function showLocked(on){$("#msLocked").hidden=!on;$("#msOpen").hidden=on;if(on)passBox($("#msUnlockForm"),"msPass","Passcode");else dropBox("msPass");}
function add(t,d){t=(t||"").trim();if(!t)return;data.items.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),t:t.slice(0,120),d:d||todayISO()});
  if(t==="Started hormones"&&!data.start)data.start=d||todayISO();save();render();}

/* Events */
const pathChips=radioChips($("#msPath"),b=>{data.path=b.dataset.path;save();});
startEl.addEventListener("change",()=>{data.start=startEl.value&&startEl.value<=todayISO()?startEl.value:"";if(startEl.value>todayISO())toast("Choose today or an earlier date");save();render();});
$("#msIdeas").addEventListener("click",e=>{const b=e.target.closest("[data-idea]");if(!b)return;add(b.dataset.idea);burst(b);toast("Added to your bloom");});
$("#msAdd").addEventListener("submit",e=>{e.preventDefault();const t=$("#msText"),d=$("#msDate");if(!t.value.trim()){t.focus();return;}const dv=d.value&&d.value<=todayISO()?d.value:todayISO();add(t.value,dv);burst($("#msAdd button[type=submit]"));t.value="";d.value="";toast("Added to your bloom");});
L.addEventListener("change",e=>{const i=e.target.closest("[data-edit-date]");if(!i)return;const li=i.closest("li"),it=data.items.find(x=>x.id===li.dataset.id);if(it&&i.value){it.d=i.value>todayISO()?todayISO():i.value;save();render();const n=D.getElementById("msd-"+it.id);if(n)n.focus();}});
L.addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;const li=b.closest("li");data.items=data.items.filter(x=>x.id!==li.dataset.id);save();render();toast("Removed");$("#msText").focus();});
$("#msDownload").addEventListener("click",()=>{const lines=["Aster: my moments","Downloaded "+fmtDate(todayISO()),""];if(data.start)lines.push("Started hormones: "+fmtDate(data.start)+(data.path?(" ("+(data.path==="fem"?"estradiol":"testosterone")+")"):""),"");
  [...data.items].sort((a,b)=>(a.d||"").localeCompare(b.d||"")).forEach(i=>lines.push(fmtDate(i.d)+"  "+i.t));if(!data.items.length)lines.push("(no moments yet)");
  saveText(lines.join("\n")+"\n","my-moments-"+todayISO()+".txt","your moments");});
$("#msClear").addEventListener("click",e=>{const b=e.currentTarget;if(b.dataset.armed!=="1"){b.dataset.armed="1";b.textContent="Tap again to delete them";b.classList.add("armed");clearTimeout(b._t);b._t=setTimeout(()=>{b.dataset.armed="";b.textContent="Clear my moments";b.classList.remove("armed");},5000);return;}
  b.dataset.armed="";b.textContent="Clear my moments";b.classList.remove("armed");data={start:"",path:"",items:[]};key=null;salt=null;store.del("ms");render();toast("Moments cleared");try{D.dispatchEvent(new CustomEvent("aster:milestones"));}catch(e){}});
lockBtn.addEventListener("click",()=>{if(key){key=null;salt=null;data={start:"",path:"",items:[]};showLocked(true);$("#msLockMsg").textContent="";$("#msPass").focus();try{D.dispatchEvent(new CustomEvent("aster:milestones"));}catch(e){}toast("Locked");return;}
  const f=$("#msSetLock");f.hidden=false;passBox(f,"msNewPass","New passcode").focus();});
$("#msCancelLock").addEventListener("click",()=>{$("#msSetLock").hidden=true;dropBox("msNewPass");lockBtn.focus();});
$("#msSetLock").addEventListener("submit",async e=>{e.preventDefault();const np=$("#msNewPass");const p=np?np.value:"";if(p.length<4){toast("Use at least 4 characters");if(np)np.focus();return;}
  try{salt=crypto.getRandomValues(new Uint8Array(16));key=await deriveKey(p,salt);await save();dropBox("msNewPass");$("#msSetLock").hidden=true;render();toast("Protected with your passcode");lockBtn.focus();}catch(err){key=null;salt=null;toast("Couldn't set a passcode here");}});
tool.addEventListener("click",async e=>{const r=e.target.closest("#msRemovePass");if(!r)return;key=null;salt=null;await save();render();toast("Passcode removed");});
$("#msUnlockForm").addEventListener("submit",async e=>{e.preventDefault();const s=stored();const pb=$("#msPass");const p=pb?pb.value:"";const msg=$("#msLockMsg");if(!s||!s.locked){showLocked(false);return;}
  msg.textContent="Opening…";
  try{const sl=unb64(s.salt);const k=await deriveKey(p,sl);const pt=await crypto.subtle.decrypt({name:"AES-GCM",iv:unb64(s.iv)},k,unb64(s.ct));data=Object.assign({start:"",path:"",items:[]},JSON.parse(dec.decode(pt)));key=k;salt=sl;msg.textContent="";showLocked(false);render();toast("Unlocked");
    try{D.dispatchEvent(new CustomEvent("aster:milestones"));}catch(e2){}$("#msText").focus();}
  catch(err){msg.textContent="That passcode didn't open them. Try again.";if(pb)pb.select();}});
$("#msForget").addEventListener("click",e=>{const b=e.currentTarget;if(b.dataset.armed!=="1"){b.dataset.armed="1";b.textContent="Tap again to delete the locked moments for good";clearTimeout(b._t);b._t=setTimeout(()=>{b.dataset.armed="";b.textContent="Forgotten it? Delete the locked moments and start again";},6000);return;}
  store.del("ms");data={start:"",path:"",items:[]};key=null;salt=null;b.dataset.armed="";showLocked(false);render();toast("Deleted. You can start again.");});
D.addEventListener("click",e=>{if(e.target.closest("#msSeeNow")){const mo=data.start?monthsSince(data.start):null;if(mo!=null&&mo>=0){setTimeout(()=>{const b=$("#chMine");if(b&&!b.hidden)b.click();},150);}}});

/* Shared with the bloom and the home page */
MS.items=()=>[...data.items].sort((a,b)=>(a.d||"").localeCompare(b.d||""));
MS.locked=()=>{const st=stored();return !!(st&&st.locked&&!key);};
MS.start=()=>data.start||"";
MS.path=()=>data.path||"";
MS.add=(t,d)=>{if(MS.locked())return false;const before=data.items.length;add(t,d);return data.items.length>before?data.items[data.items.length-1].id:false;};
MS.ideas=n=>IDEAS.filter(t=>!data.items.some(i=>i.t===t)).slice(0,n||IDEAS.length);

/* Start */
const s=stored();
if(s&&s.locked){showLocked(true);}else{if(s)data={start:s.start||"",path:s.path||"",items:Array.isArray(s.items)?s.items:[]};showLocked(false);render();}
if(!(s&&s.locked))render();
})();

/* ---------- Document checklist (Family, friends and the world) ---------- */
(function(){const box=$("#docList");if(!box)return;let st=store.get("docs",{});
function prog(){const all=$$("[data-doc]",box),n=all.filter(c=>c.checked).length;$("#docProg").textContent=n?`${n} of ${all.length} done. ${n===all.length?"Every one ticked off.":""}`:"Nothing ticked yet.";}
$$("[data-doc]",box).forEach(c=>{c.checked=!!st[c.dataset.doc];});prog();
box.addEventListener("change",e=>{const c=e.target.closest("[data-doc]");if(!c)return;st[c.dataset.doc]=c.checked;if(!c.checked)delete st[c.dataset.doc];store.set("docs",st);prog();if(c.checked)burst(c);});
})();
