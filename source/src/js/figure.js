/* ---------- A shared human figure, drawn in the palette's colours ----------
   Soft top-to-bottom tone, light from the upper left, a faint inner rim for volume, a fine contour,
   and a few quiet anatomical landmarks (collarbones, the lower edge of the ribs, navel, knees). */
function figureDefs(id,opts){opts=opts||{};
  return `<linearGradient id="${id}-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--fig-a)"/><stop offset="1" style="stop-color:var(--fig-b)"/></linearGradient>`+
  `<linearGradient id="${id}-x" x1="0" y1="0" x2="1" y2="0"><stop offset="0" style="stop-color:var(--fig-hi);stop-opacity:.65"/><stop offset=".46" style="stop-color:var(--fig-hi);stop-opacity:0"/><stop offset="1" style="stop-color:var(--haem);stop-opacity:.09"/></linearGradient>`+
  `<radialGradient id="${id}-s" cx=".5" cy=".5" r=".5"><stop offset="0" style="stop-color:#000;stop-opacity:var(--fig-sh)"/><stop offset="1" style="stop-color:#000;stop-opacity:0"/></radialGradient>`+
  `<clipPath id="${id}-cb"><path d="${FIG.body}"/></clipPath><clipPath id="${id}-cr"><path d="${FIG.armR}"/></clipPath><clipPath id="${id}-cl"><path d="${opts.raised?FIG.armLup:FIG.armL}"/></clipPath>`+
  (opts.fade?`<linearGradient id="${id}-f" x1="0" y1="0" x2="0" y2="1"><stop offset="${opts.fade[0]}" stop-color="#fff"/><stop offset="${opts.fade[1]}" stop-color="#000"/></linearGradient><mask id="${id}-m" maskUnits="userSpaceOnUse" x="-120" y="0" width="540" height="480"><rect x="-120" y="0" width="540" height="480" fill="url(#${id}-f)"/></mask>`:"");}
function figurePart(id,d,clip,line,rim){return `<path d="${d}" fill="url(#${id}-g)"/><path d="${d}" fill="url(#${id}-x)"/><path class="fg-rim" d="${line}" stroke-width="${rim}" clip-path="url(#${id}-${clip})"/><path class="fg-line" d="${line}"/>`;}
function figureG(id,opts){opts=opts||{};const raised=!!opts.raised;
  const body=figurePart(id,FIG.body,"cb",FIG.body,10),armR=figurePart(id,FIG.armR,"cr",FIG.armRs,9),armL=figurePart(id,raised?FIG.armLup:FIG.armL,"cl",raised?FIG.armLups:FIG.armLs,9);
  const marks=FIG.marks.filter(m=>!(raised&&(m.startsWith("M80.5")||m.startsWith("M96.5")))).map(m=>`<path class="fg-mark" d="${m}"/>`).join("");
  const scars=opts.scars?FIG.scars.map(m=>`<path class="fg-scar" d="${m}"/>`).join(""):"";
  const shadow=opts.shadow?`<ellipse cx="150" cy="459" rx="58" ry="6" fill="url(#${id}-s)"/>`:"";
  if(opts.fade)return shadow+`<g mask="url(#${id}-m)">${body}${armR}${raised?"":armL}${marks}</g>${raised?armL:""}${scars}`;
  return shadow+body+armR+armL+marks+scars;}
