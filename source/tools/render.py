#!/usr/bin/env python3
"""Render Aster in headless Chrome: every view, chosen palettes/themes/widths; report console errors and sideways overflow.
Usage: python3 tools/render.py <html> <outdir> --views a,b --widths 1280,390 --pals violet:light,violet:dark [--full] [--still] [--js "..."]"""
import asyncio, sys, os, json, argparse
from playwright.async_api import async_playwright
ap=argparse.ArgumentParser();ap.add_argument('html');ap.add_argument('out');ap.add_argument('--views',default='home');ap.add_argument('--widths',default='1280');
ap.add_argument('--pals',default='violet:light');ap.add_argument('--full',action='store_true');ap.add_argument('--still',action='store_true');ap.add_argument('--js',default='');ap.add_argument('--h',type=int,default=900);ap.add_argument('--wait',type=int,default=700);ap.add_argument('--size',default='')
a=ap.parse_args()
async def main():
    os.makedirs(a.out,exist_ok=True);report=[]
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        for pal in a.pals.split(','):
            pid,theme=pal.split(':')
            for w in [int(x) for x in a.widths.split(',')]:
                ctx=await b.new_context(viewport={"width":w,"height":a.h},device_scale_factor=1,reduced_motion='reduce' if a.still else 'no-preference')
                pg=await ctx.new_page();msgs=[]
                pg.on("console",lambda m: msgs.append(m.type+": "+m.text) if m.type in('error','warning') else None)
                pg.on("pageerror",lambda e: msgs.append("PAGEERROR: "+str(e)))
                await pg.goto("file://"+os.path.abspath(a.html))
                await pg.evaluate(f"""()=>{{localStorage.setItem('aster:palette',JSON.stringify('{pid}'));localStorage.setItem('aster:theme',JSON.stringify('{theme}'));if('{a.size}')localStorage.setItem('aster:size',JSON.stringify('{a.size}'));}}""")
                await pg.reload();await pg.wait_for_timeout(500)
                for v in a.views.split(','):
                    await pg.evaluate(f"()=>{{location.hash='{v}'}}");await pg.wait_for_timeout(a.wait)
                    if a.js: await pg.evaluate(a.js);await pg.wait_for_timeout(300)
                    ov=await pg.evaluate("""()=>{const W=document.documentElement.clientWidth;const sw=document.documentElement.scrollWidth;const bad=[];document.querySelectorAll('.view.on *').forEach(el=>{const r=el.getBoundingClientRect();if(r.width>0&&(r.right>W+1||r.left<-1)&&getComputedStyle(el).position!=='fixed'){const c=el.className&&el.className.baseVal!==undefined?el.className.baseVal:el.className;bad.push((el.tagName+'.'+String(c).slice(0,40))+' '+Math.round(r.left)+'-'+Math.round(r.right));}});return {sw,W,bad:bad.slice(0,6)};}""")
                    fn=os.path.join(a.out,f"{v}-{pid}-{theme}-{w}.png")
                    await pg.screenshot(path=fn,full_page=a.full)
                    report.append(dict(view=v,pal=pid,theme=theme,w=w,overflow=ov['sw']>ov['W'],bad=ov['bad'],errors=msgs[:]))
                    msgs.clear()
                await ctx.close()
        await b.close()
    for r in report:
        flag=('OVERFLOW ' if r['overflow'] else '')+('ERR ' if r['errors'] else '')
        print(f"{r['view']:10} {r['pal']}:{r['theme']} {r['w']} {flag}{'; '.join(r['errors'])[:300]} {r['bad'] if r['bad'] else ''}")
asyncio.run(main())
