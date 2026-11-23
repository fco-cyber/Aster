#!/usr/bin/env python3
"""Render Aster's app icons (PNG) from SVG in headless Chrome: 192, 512, maskable 512 (flower inside the safe zone), apple-touch 180.
The icon is the aster itself: twelve cream petals around a golden centre, on the violet of the app's header."""
import asyncio, sys, os
from playwright.async_api import async_playwright
OUT=sys.argv[1]
def svg(size, maskable=False, apple=False):
    pad = 0.16 if maskable else 0.0
    rx = 0 if (maskable or apple) else 15
    petals = "".join(f'<ellipse cx="0" cy="-14.6" rx="4" ry="10.6" transform="rotate({k*30})"/>' for k in range(12))
    inner = (f'<g transform="translate(32 32)"><g fill="#FFF8EF">{petals}</g>'
             '<circle r="7.6" fill="#FFB21F"/><circle r="7.6" fill="none" stroke="#E08A00" stroke-width="1.1"/>'
             '<circle cx="-2" cy="-2.2" r="2.2" fill="#FFD36B" opacity=".9"/></g>')
    s = 64*(1-2*pad); o = 64*pad
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 64 64">'
            f'<defs><radialGradient id="g" cx="50%" cy="45%" r="70%"><stop offset="0" stop-color="#7C3BE8"/><stop offset="1" stop-color="#5A1FC4"/></radialGradient></defs>'
            f'<rect width="64" height="64" rx="{rx}" fill="url(#g)"/><g transform="translate({o} {o}) scale({s/64})">{inner}</g></svg>')
async def main():
    os.makedirs(OUT,exist_ok=True)
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        for name,size,m,a in [("icon-192.png",192,False,False),("icon-512.png",512,False,False),("maskable-512.png",512,True,False),("apple-touch-icon.png",180,False,True)]:
            pg=await b.new_page(viewport={"width":size,"height":size})
            await pg.set_content(f'<html><body style="margin:0;background:transparent">{svg(size,m,a)}</body></html>')
            await pg.screenshot(path=os.path.join(OUT,name),omit_background=not (m or a),clip={"x":0,"y":0,"width":size,"height":size})
            await pg.close()
        await b.close()
asyncio.run(main())
