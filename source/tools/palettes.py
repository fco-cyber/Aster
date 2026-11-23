#!/usr/bin/env python3
"""Generate src/palettes.css for Aster: four palettes (Violet, Sky, Rose, Quiet), each light and dark,
and check WCAG contrast. Every text/background pair the app uses is checked against 4.5:1 (normal text),
large display text on the band against 3:1, and UI boundaries against 3:1.
Run: python3 tools/palettes.py   (exits 1 and prints the pair if anything is below)."""
import os, sys, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def hx(c):
    c = c.lstrip('#'); return tuple(int(c[i:i+2], 16) for i in (0, 2, 4))
def tohex(t):
    return '#%02X%02X%02X' % tuple(max(0, min(255, round(v))) for v in t)
def mix(a, b, w):
    """w = share of b"""
    A, B = hx(a), hx(b); return tohex(tuple(A[i] * (1 - w) + B[i] * w for i in range(3)))
def lum(c):
    def ch(v):
        v /= 255; return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = hx(c); return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)
def cr(a, b):
    la, lb = lum(a), lum(b); hi, lo = max(la, lb), min(la, lb); return (hi + 0.05) / (lo + 0.05)
def rgba(c, a):
    r, g, b = hx(c); return f"rgba({r},{g},{b},{a})"

DARKINK = {"violet": "#22122E", "sky": "#0E1A33", "rose": "#2E1220", "quiet": "#16191C"}
# Tiles: t1 hormones (gold), t2 changes (coral), t3 body (teal), t4 mind (lilac), t5 life (rose), t6 surgery (deep)
def tiles(light, pid, dark):
    dk = DARKINK[pid]
    if pid == "quiet":
        if not dark:
            return dict(t1=("#E2D3B0", dk), t2=("#E4C3B6", dk), t3=("#4E6E66", "#F5F6F7"), t4=("#DDE0E6", dk), t5=("#EAD9DC", dk), t6=("#3A3F47", "#F5F6F7"))
        return dict(t1=("#CDB98E", dk), t2=("#C9A597", dk), t3=("#6F9389", dk), t4=("#2B2F36", "#E9ECEE"), t5=("#3A3134", "#E9ECEE"), t6=("#3E4A56", "#E9ECEE"))
    if not dark:
        return dict(t1=("#FFB21F", dk), t2=("#FF6A4D", dk), t3=("#0B6E68", "#FFF8EF"), t4=(light["lilac"], dk), t5=(light["rose"], dk), t6=(light["accentdeep"], "#FFF8EF"))
    return dict(t1=("#FFBE3B", dk), t2=("#FF8A70", dk), t3=("#2BA79D", dk), t4=(light["lilac"], light["ink"]), t5=(light["rose"], light["ink"]), t6=(light["accentdeep"], light["ink"]))

# id, name, note, light, dark
P = [
 ("violet", "Violet", "Deep violet and gold, like the aster itself.",
  dict(bg="#FFF7EE", card="#FFFFFF", ink="#22122E", ink2="#4F3D5A", ink3="#665471", band="#6B2BD9", band2="#7838E4", bandink="#FFF8EF",
       accent="#6224CC", accentdeep="#4B17A8", gold="#FFB21F", coral="#FF6A4D", teal="#0B6E68", lilac="#EADFFF", rose="#FFC7D3",
       danger="#B42318", warn="#8A5300", ok="#1F6B4E", coraltext="#A8361C"),
  dict(bg="#150B1E", card="#21142C", ink="#FFF3FA", ink2="#D7C6E0", ink3="#B4A1C1", band="#3A1786", band2="#5026AE", bandink="#FFF3FA",
       accent="#C6AAFF", accentdeep="#5A28C2", gold="#FFBE3B", coral="#FF8A70", teal="#2BA79D", lilac="#3A2858", rose="#5A2A3D",
       danger="#FF8F84", warn="#F2C064", ok="#8FD7B4", coraltext="#FFAA96")),
 ("sky", "Sky", "Clear blue and gold, like a blue aster.",
  dict(bg="#F4F7FF", card="#FFFFFF", ink="#0E1A33", ink2="#39465F", ink3="#53607A", band="#1F4FD6", band2="#2C59DE", bandink="#F6F8FF",
       accent="#1C46C2", accentdeep="#173A9E", gold="#FFB21F", coral="#FF6A4D", teal="#0B6E68", lilac="#DCE6FF", rose="#FFD0DA",
       danger="#B42318", warn="#855300", ok="#1D6A4C", coraltext="#A8361C"),
  dict(bg="#0A1020", card="#131B30", ink="#EEF3FF", ink2="#C3CDE3", ink3="#9FABC5", band="#173A9E", band2="#2550C4", bandink="#EEF3FF",
       accent="#9DB8FF", accentdeep="#2E5BE0", gold="#FFBE3B", coral="#FF8A70", teal="#2BA79D", lilac="#22305A", rose="#4E2433",
       danger="#FF8F84", warn="#F0BE60", ok="#8BD5B1", coraltext="#FFAA96")),
 ("rose", "Rose", "Raspberry and gold, like a pink aster.",
  dict(bg="#FFF5F6", card="#FFFFFF", ink="#2E1220", ink2="#573E4B", ink3="#6F5563", band="#B3245F", band2="#B82A64", bandink="#FFF6F8",
       accent="#A31F56", accentdeep="#7A1640", gold="#FFB21F", coral="#FF6A4D", teal="#0B6E68", lilac="#EADFFF", rose="#FFC7D3",
       danger="#B42318", warn="#855300", ok="#1D6A4C", coraltext="#A8361C"),
  dict(bg="#1A0B12", card="#26141D", ink="#FFF1F5", ink2="#E0C4CF", ink3="#BE9EAC", band="#6E1438", band2="#8E1F4B", bandink="#FFF1F5",
       accent="#FFA3C6", accentdeep="#A3245A", gold="#FFBE3B", coral="#FF8A70", teal="#2BA79D", lilac="#3A2858", rose="#5A2A3D",
       danger="#FF8F84", warn="#F0BE60", ok="#8BD5B1", coraltext="#FFAA96")),
 ("quiet", "Quiet", "Plain greys that don't draw attention.",
  dict(bg="#F3F4F5", card="#FFFFFF", ink="#16191C", ink2="#3F454B", ink3="#575E65", band="#3A3F47", band2="#4A5059", bandink="#F5F6F7",
       accent="#3E5566", accentdeep="#2F3A44", gold="#D9C49A", coral="#D8B7AA", teal="#4E6E66", lilac="#DDE0E6", rose="#E9D9DB",
       danger="#A82A1E", warn="#7A5418", ok="#33604F", coraltext="#7E4A3A"),
  dict(bg="#0F1113", card="#171A1D", ink="#E9ECEE", ink2="#C1C7CC", ink3="#9AA2A9", band="#2A2E34", band2="#353A41", bandink="#E9ECEE",
       accent="#A9BED0", accentdeep="#3E4A56", gold="#CDB98E", coral="#C9A597", teal="#6F9389", lilac="#2B2F36", rose="#3A3134",
       danger="#FF9A8C", warn="#E2BE82", ok="#9CCFB6", coraltext="#E3BFB2")),
]

_CCP = os.path.join(ROOT, "tools", "chartcolors.json")
_CC = json.load(open(_CCP)) if os.path.exists(_CCP) else {}  # chart colours validated by tools/chartcolors.py

def build(s, dark, pid):
    bg, card, ink = s["bg"], s["card"], s["ink"]
    v = {}
    v["bg"] = bg; v["bg-2"] = mix(bg, ink, .045 if not dark else .04)
    v["card"] = card; v["card-2"] = mix(card, bg, .6) if not dark else mix(card, ink, .03)
    v["ink"], v["ink-2"], v["ink-3"] = ink, s["ink2"], s["ink3"]
    v["line"] = mix(bg, ink, .11 if not dark else .13); v["line-2"] = mix(bg, ink, .24 if not dark else .24)
    v["band"], v["band-2"], v["band-ink"] = s["band"], s["band2"], s["bandink"]
    v["band-ink-2"] = mix(s["band"], s["bandink"], .9)
    v["band-line"] = mix(s["band"], s["bandink"], .28)
    v["accent"] = s["accent"]; v["accent-deep"] = s["accentdeep"]; v["accent-soft"] = mix(card, s["accent"], .1 if not dark else .18)
    v["accent-ink"] = "#FFFFFF" if not dark else DARKINK[pid]
    v["gold"] = s["gold"]; v["gold-ink"] = DARKINK[pid]; v["gold-soft"] = mix(card, s["gold"], .22 if not dark else .2)
    v["coral"] = s["coral"]; v["coral-text"] = s["coraltext"]; v["coral-soft"] = mix(card, s["coral"], .14 if not dark else .18)
    v["teal"] = s["teal"]; v["lilac"] = s["lilac"]; v["rose"] = s["rose"]
    for k, (b, i) in tiles(s, pid, dark).items():
        v[k] = b; v[k + "-ink"] = i
    v["danger"] = s["danger"]; v["danger-soft"] = mix(card, s["danger"], .09 if not dark else .17)
    v["warn"] = s["warn"]; v["warn-soft"] = mix(card, s["warn"], .1 if not dark else .16)
    v["ok"] = s["ok"]; v["ok-soft"] = mix(card, s["ok"], .09 if not dark else .17)
    v["scrim"] = rgba(DARKINK[pid], .5) if not dark else "rgba(4,3,8,.7)"
    v["glass"] = rgba(bg, .86)
    ir, ig, ib = hx(ink)
    v["shadow"] = f"0 1px 2px rgba({ir},{ig},{ib},.05),0 10px 26px -10px rgba({ir},{ig},{ib},.14)" if not dark else "0 1px 2px rgba(0,0,0,.35),0 12px 30px -10px rgba(0,0,0,.6)"
    v["shadow-lg"] = f"0 2px 6px rgba({ir},{ig},{ib},.06),0 28px 60px -20px {rgba(s['band'], .35)}" if not dark else "0 2px 8px rgba(0,0,0,.4),0 30px 64px -18px rgba(0,0,0,.7)"
    # chart colours (validated by tools/chartcolors.py with the dataviz validator)
    cc = _CC[pid]["dark" if dark else "light"]
    v["s1"], v["s2"] = cc["s1"], cc["s2"]; v["o1"], v["o2"], v["o3"] = cc["o"]
    # names used by the diagrams and components, kept as aliases of the Aster tokens
    v["paper"] = v["bg"]; v["paper-2"] = v["bg-2"]; v["surface"] = v["card"]; v["surface-2"] = v["card-2"]
    v["haem"] = v["accent"]; v["haem-soft"] = v["accent-soft"]; v["violet"] = s["band2"] if not dark else s["accent"]
    v["eosin"] = s["coral"]; v["eosin-ink"] = s["coraltext"]; v["eosin-soft"] = v["coral-soft"]
    v["sage"] = s["ok"]; v["sage-soft"] = v["ok-soft"]; v["amber"] = s["warn"]; v["amber-soft"] = v["warn-soft"]
    v["slate"] = s["ink3"]; v["slate-soft"] = mix(card, s["ink3"], .1)
    v["on-accent"] = v["accent-ink"]
    v["cell-a"], v["cell-b"], v["cell-c"] = mix(card, s["gold"], .5), mix(card, s["band2"], .35), s["gold"]
    v["shine"] = "rgba(255,255,255,.85)" if not dark else "rgba(255,255,255,.2)"
    v["grad"] = f"linear-gradient(135deg,{s['band']} 0%,{s['band2']} 100%)"
    v["field"] = mix(bg, ink, .5 if not dark else .5)
    return v

def decl(v):
    return ";".join(f"--{k}:{val}" for k, val in v.items())

PAIRS_TEXT = [("ink", "bg"), ("ink", "card"), ("ink-2", "bg"), ("ink-2", "card"), ("ink-3", "bg"), ("ink-3", "card"), ("ink-3", "card-2"), ("ink-3", "bg-2"),
              ("ink-2", "card-2"), ("accent", "bg"), ("accent", "card"), ("accent", "accent-soft"), ("ink", "accent-soft"), ("accent-ink", "accent"),
              ("band-ink", "band"), ("band-ink", "band-2"), ("band-ink-2", "band"), ("band-ink-2", "band-2"), ("gold-ink", "gold"),
              ("coral-text", "bg"), ("coral-text", "card"), ("coral-text", "coral-soft"), ("ink", "coral-soft"), ("ink", "gold-soft"),
              ("danger", "card"), ("danger", "bg"), ("danger", "danger-soft"), ("warn", "card"), ("warn", "warn-soft"), ("ok", "card"), ("ok", "ok-soft"),
              ("ink", "danger-soft"), ("ink", "warn-soft"), ("ink", "ok-soft"),
              ("t1-ink", "t1"), ("t2-ink", "t2"), ("t3-ink", "t3"), ("t4-ink", "t4"), ("t5-ink", "t5"), ("t6-ink", "t6"), ("bg", "ink")]
PAIRS_LARGE = [("gold", "band")]                      # the gold second line of the home headline (70 px)
PAIRS_UI = [("field", "card"), ("field", "bg"), ("accent", "card")]

def check():
    bad = []; low = 99; lowpair = None
    for pid, name, note, L, Dk in P:
        for dark, spec in ((False, L), (True, Dk)):
            v = build(spec, dark, pid); m = "dark" if dark else "light"
            for a, b in PAIRS_TEXT:
                r = cr(v[a], v[b])
                if r < low: low, lowpair = r, (pid, m, a, b)
                if r < 4.5: bad.append(f"{pid} {m}: {a} on {b} = {r:.2f}")
            for a, b in PAIRS_LARGE + PAIRS_UI:
                r = cr(v[a], v[b])
                if r < 3: bad.append(f"{pid} {m}: {a} on {b} = {r:.2f} (needs 3:1)")
    return bad, low, lowpair

def css():
    out = ["/* Aster palettes: four, each with a light and a dark version. Generated by tools/palettes.py, which checks WCAG AA contrast for every text pair. */"]
    first = True
    for pid, name, note, L, Dk in P:
        lv, dv = decl(build(L, False, pid)), decl(build(Dk, True, pid))
        sel = f':root[data-palette="{pid}"]'
        if first:
            out.append(f":root,{sel}{{{lv}}}")
            out.append(f'@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]),{sel}:not([data-theme="light"]){{{dv}}}}}')
            out.append(f':root[data-theme="dark"],{sel}[data-theme="dark"]{{{dv}}}')
            first = False
        else:
            out.append(f"{sel}{{{lv}}}")
            out.append(f'@media (prefers-color-scheme:dark){{{sel}:not([data-theme="light"]){{{dv}}}}}')
            out.append(f'{sel}[data-theme="dark"]{{{dv}}}')
    return "\n".join(out) + "\n"

if __name__ == "__main__":
    bad, low, lowpair = check()
    for b in bad: print("BELOW:", b)
    print(f"lowest text pair {low:.2f} ({lowpair})")
    open(os.path.join(ROOT, "src", "palettes.css"), "w").write(css())
    pals = [dict(id=pid, name=name, note=note, dots=[L["band"], L["gold"], L["bg"]]) for pid, name, note, L, Dk in P]
    open(os.path.join(ROOT, "src", "pals.json"), "w").write(json.dumps(pals))
    print("wrote src/palettes.css and src/pals.json")
    sys.exit(1 if bad else 0)
