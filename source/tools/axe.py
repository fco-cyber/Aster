import asyncio, sys, os, json
from playwright.async_api import async_playwright
HTML=os.path.abspath(sys.argv[1]); AXE=open('/home/claude/axe/node_modules/axe-core/axe.min.js').read()
VIEWS="home,start,bloom,hormones,changes,safety,body,binding,mind,daily,social,surgery,recovery,family,clinicians,evidence,support".split(',')
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        for pal,theme in [(x.split(":")[0],x.split(":")[1]) for x in (sys.argv[2].split(",") if len(sys.argv)>2 else ["violet:light"])]:
            ctx=await b.new_context(viewport={"width":1280,"height":900},reduced_motion='reduce'); pg=await ctx.new_page()
            await pg.goto("file://"+HTML); await pg.evaluate(f"()=>{{localStorage.setItem('aster:palette',JSON.stringify('{pal}'));localStorage.setItem('aster:theme',JSON.stringify('{theme}'))}}"); await pg.reload(); await pg.wait_for_timeout(400)
            await pg.add_script_tag(content=AXE)
            tot={}
            for v in VIEWS:
                await pg.evaluate(f"location.hash='{v}'"); await pg.wait_for_timeout(350)
                await pg.evaluate("document.querySelectorAll('.view.on details').forEach(d=>d.open=true)"); await pg.wait_for_timeout(150)
                r=await pg.evaluate("""async()=>{const r=await axe.run(document.querySelector('.view.on'),{resultTypes:['violations'],rules:{region:{enabled:false}}});return r.violations.map(v=>({id:v.id,impact:v.impact,n:v.nodes.length,ex:v.nodes.slice(0,3).map(n=>n.target.join(' ')+' :: '+(n.failureSummary||'').split('\\n').slice(1,2).join(''))}))}""")
                for x in r:
                    k=(x['id'],x['impact']);tot.setdefault(k,[]).append((v,x['n'],x['ex']))
            await pg.evaluate("location.hash='home'"); await pg.wait_for_timeout(300)
            r=await pg.evaluate("""async()=>{const r=await axe.run(document,{resultTypes:['violations']});return r.violations.map(v=>({id:v.id,impact:v.impact,n:v.nodes.length,ex:v.nodes.slice(0,3).map(n=>n.target.join(' ')+' :: '+(n.failureSummary||'').split('\\n').slice(1,2).join(''))}))}""")
            for x in r: tot.setdefault((x['id'],x['impact'],'page'),[]).append(('whole page',x['n'],x['ex']))
            print(f"== {pal}:{theme}")
            for k,vs in tot.items():
                print(" ",k, sum(n for _,n,_ in vs), [ (v,n) for v,n,_ in vs][:6]); print("    e.g.", vs[0][2][:2])
            await ctx.close()
        await b.close()
asyncio.run(main())
