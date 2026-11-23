#!/usr/bin/env python3
"""Pick and validate the two chart series colours (estradiol, testosterone) and the
three-step ordinal ramp (the hormone timeline) for every Aster palette, light and dark.
Series colours keep each palette's own primary hue (s1) and a warm counterpart (s2), with
OKLCH lightness moved into the data-viz band; the result is checked by the dataviz skill's
validate_palette.js (lightness band, chroma floor, CVD separation, normal-vision floor, contrast).
Writes tools/chartcolors.json. Run: python3 tools/chartcolors.py <path-to-validate_palette.js>"""
import json, math, subprocess, sys, os
HERE=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,HERE)
import importlib.util
spec=importlib.util.spec_from_file_location('pal',os.path.join(HERE,'palettes.py'))

def srgb2lin(c): c/=255; return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def lin2srgb(c):
    c=max(0,min(1,c)); v=12.92*c if c<=0.0031308 else 1.055*c**(1/2.4)-0.055; return max(0,min(255,round(v*255)))
def hex2oklch(h):
    h=h.lstrip('#'); r,g,b=(srgb2lin(int(h[i:i+2],16)) for i in (0,2,4))
    l=0.4122214708*r+0.5363325363*g+0.0514459929*b; m=0.2119034982*r+0.6806995451*g+0.1073969566*b; s=0.0883024619*r+0.2817188376*g+0.6299787005*b
    l,m,s=(x**(1/3) for x in (l,m,s))
    L=0.2104542553*l+0.7936177850*m-0.0040720468*s; A=1.9779984951*l-2.4285922050*m+0.4505937099*s; B=0.0259040371*l+0.7827717662*m-0.8086757660*s
    return L, math.hypot(A,B), math.degrees(math.atan2(B,A))%360
def oklch2hex(L,C,H):
    A=C*math.cos(math.radians(H)); B=C*math.sin(math.radians(H))
    l=L+0.3963377774*A+0.2158037573*B; m=L-0.1055613458*A-0.0638541728*B; s=L-0.0894841775*A-1.2914855480*B
    l,m,s=l**3,m**3,s**3
    r=4.0767416621*l-3.3077115913*m+0.2309699292*s; g=-1.2684380046*l+2.6097574011*m-0.3413193965*s; b=-0.0041960863*l-0.7034186147*m+1.7076147010*s
    return '#%02X%02X%02X'%(lin2srgb(r),lin2srgb(g),lin2srgb(b))
def inGamut(L,C,H):
    A=C*math.cos(math.radians(H)); B=C*math.sin(math.radians(H))
    l=L+0.3963377774*A+0.2158037573*B; m=L-0.1055613458*A-0.0638541728*B; s=L-0.0894841775*A-1.2914855480*B
    l,m,s=l**3,m**3,s**3
    r=4.0767416621*l-3.3077115913*m+0.2309699292*s; g=-1.2684380046*l+2.6097574011*m-0.3413193965*s; b=-0.0041960863*l-0.7034186147*m+1.7076147010*s
    return all(-1e-4<=v<=1+1e-4 for v in (r,g,b))
def fit(L,C,H):
    while C>0.02 and not inGamut(L,C,H): C-=0.004
    return oklch2hex(L,C,H)

def validate(val, cols, mode, surface, ordinal=False):
    args=['node',val,",".join(cols)]
    args+=(['--ordinal'] if ordinal else [])+['--mode',mode,'--surface',surface]
    p=subprocess.run(args,capture_output=True,text=True)
    return p.returncode, p.stdout+p.stderr

if __name__=='__main__':
    val=sys.argv[1]
    src=open(os.path.join(HERE,'palettes.py')).read()
    ns={'__file__':os.path.join(HERE,'palettes.py')}; exec(src.split('def build(')[0],ns)
    P=ns['P']; out={}; ok=True
    for pid,name,note,light,dark in P:
        out[pid]={}
        for mode,spec in (('light',light),('dark',dark)):
            surf=spec['card']
            L1,C1,H1=hex2oklch(spec['accent'])
            # warm counterpart: hue ~45-60 (orange), unless the palette's primary is already warm (clay) -> use a teal/blue
            warm = 20<=H1<=80
            H2 = 230 if warm else 55
            band=(0.46,0.62) if mode=='light' else (0.52,0.66)
            best=None
            for La in [band[0]+i*0.01 for i in range(int((band[1]-band[0])/0.01)+1)]:
                for Lb in [band[0]+i*0.01 for i in range(int((band[1]-band[0])/0.01)+1)]:
                    c1=fit(La,max(C1,0.11) if pid!='quiet' else 0.10,H1); c2=fit(Lb,0.15 if pid!='quiet' else 0.10,H2)
                    rc,txt=validate(val,[c1,c2],mode,surf)
                    if rc==0 and 'WARN' not in txt:
                        # prefer s1 closest to the palette primary's lightness
                        score=abs(La-min(max(L1,band[0]),band[1]))
                        if best is None or score<best[0]: best=(score,c1,c2,txt)
                if best and best[0]<0.005: break
            if not best:
                ok=False; print('NO PASS',pid,mode); continue
            _,c1,c2,txt=best
            # ordinal ramp for the timeline from s1's hue: light -> dark (light mode), dark -> light (dark mode)
            Ls=[0.74,0.60,0.46] if mode=='light' else [0.52,0.64,0.78]
            ramp=[fit(L,0.06 if pid!='quiet' else 0.03,H1) for L in Ls]
            rc2,txt2=validate(val,ramp,mode,surf,ordinal=True)
            out[pid][mode]=dict(s1=c1,s2=c2,o=ramp)
            print(pid,mode,c1,c2,'ramp',ramp,'ordinal',('PASS' if rc2==0 else 'FAIL'))
            if rc2!=0: print(txt2); ok=False
    json.dump(out,open(os.path.join(HERE,'chartcolors.json'),'w'),indent=1)
    sys.exit(0 if ok else 1)
