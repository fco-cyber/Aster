#!/usr/bin/env python3
"""Make the install-preview screenshots and the link-sharing picture for the PWA from the built app.
A few example moments are added first so the bloom shows how it fills; they exist only in the screenshot browser."""
import asyncio, sys, os, json
from playwright.async_api import async_playwright
HTML=os.path.abspath(sys.argv[1]); OUT=sys.argv[2]
EX=["Said it out loud","Told someone I trust","Booked my first appointment","Started hormones","First blood test","Three months on hormones","Called by my name at work or study"]
MS={"locked":False,"start":"2026-03-02","path":"","items":[{"id":f"x{i}","t":t,"d":f"2026-0{1+i//2}-{10+i:02d}"} for i,t in enumerate(EX)]}
async def shot(b, w, h, dpr, hash_, path, js=None, clip=None):
    ctx=await b.new_context(viewport={"width":w,"height":h},device_scale_factor=dpr,reduced_motion='reduce')
    pg=await ctx.new_page(); await pg.goto("file://"+HTML)
    await pg.evaluate("ms=>localStorage.setItem('aster:ms',JSON.stringify(ms))",MS)
    await pg.goto("file://"+HTML+("#"+hash_ if hash_ else "")); await pg.reload(); await pg.wait_for_timeout(800)
    if js: await pg.evaluate(js); await pg.wait_for_timeout(400)
    await pg.screenshot(path=path,type="jpeg",quality=86,clip=clip); await ctx.close()
async def main():
    os.makedirs(OUT,exist_ok=True)
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        await shot(b,1280,800,1,"",os.path.join(OUT,"wide-start.jpg"))
        await shot(b,390,844,2,"",os.path.join(OUT,"narrow-start.jpg"))
        await shot(b,390,844,2,"changes",os.path.join(OUT,"narrow-changes.jpg"),"(()=>{const f=document.querySelector('#bodyMap').closest('figure, .ch-layout');f.scrollIntoView({block:'start'});window.scrollBy(0,-72);})()")
        await shot(b,1200,630,1,"",os.path.join(OUT,"share.jpg"))
        await b.close()
asyncio.run(main())
