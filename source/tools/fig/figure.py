#!/usr/bin/env python3
"""Generate the human figure outlines for Homeward's diagrams (front view, gender-neutral, 8-head proportions).
Points are given for the viewer's right half and mirrored about x = 150; curves are centripetal Catmull-Rom
splines converted to cubic Beziers, so contours stay smooth and symmetrical."""
import math, json, sys
CX = 150

def cr2bez(pts, closed=True, alpha=0.5):
    """Centripetal Catmull-Rom through pts -> SVG path (cubic Beziers)."""
    n = len(pts)
    P = (lambda i: pts[i % n]) if closed else (lambda i: pts[max(0, min(n - 1, i))])
    out = [f"M{pts[0][0]:.1f} {pts[0][1]:.1f}"]
    segs = n if closed else n - 1
    for i in range(segs):
        p0, p1, p2, p3 = P(i - 1), P(i), P(i + 1), P(i + 2)
        def tj(ti, a, b):
            d = math.hypot(b[0] - a[0], b[1] - a[1]); return ti + max(d, 1e-6) ** alpha
        t0 = 0; t1 = tj(t0, p0, p1); t2 = tj(t1, p1, p2); t3 = tj(t2, p2, p3)
        # tangents (Barry-Goldman form), scaled to the segment
        def tan(pa, pb, pc, ta, tb, tc):
            return [((pb[k] - pa[k]) / (tb - ta) - (pc[k] - pa[k]) / (tc - ta) + (pc[k] - pb[k]) / (tc - tb)) for k in (0, 1)]
        m1 = tan(p0, p1, p2, t0, t1, t2); m2 = tan(p1, p2, p3, t1, t2, t3)
        dt = t2 - t1
        c1 = (p1[0] + m1[0] * dt / 3, p1[1] + m1[1] * dt / 3)
        c2 = (p2[0] - m2[0] * dt / 3, p2[1] - m2[1] * dt / 3)
        out.append(f"C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}")
    if closed: out.append("Z")
    return "".join(out)

def mirror(pts): return [(2 * CX - x, y) for x, y in pts]

# ---- Full figure, front view, arms slightly away from the body (viewBox 0 0 300 470)
R_BODY = [  # crown -> right side of head, jaw, neck, shoulder slope, flank, hip, leg, foot, inner leg -> crotch
 (150, 11.5), (161.5, 14), (168.5, 22.5), (171, 33), (172.6, 38.5), (172.8, 45), (170.8, 50.5), (167.5, 56), (163, 62.5), (160.5, 66.5), (161, 72.5),
 (162.5, 78.5), (168.5, 83.5), (180, 87.8), (191, 92), (197.5, 98.5), (196, 108), (191, 118), (188, 128), (187.5, 146),
 (185.5, 166), (182.5, 184), (182.5, 200), (185.5, 217), (188.5, 233), (189, 250), (187.5, 268), (185, 292), (181, 318),
 (177, 338), (177.5, 354), (179.5, 372), (176.5, 394), (171.5, 414), (167.5, 431), (169.5, 443), (173.5, 451), (169, 456.5),
 (160, 457.5), (154, 455.5), (152.5, 447), (153.5, 433), (155.5, 410), (158.5, 386), (158.5, 362), (157, 344), (158, 322),
 (156.5, 300), (154.5, 280), (150, 268)]
BODY = R_BODY[:-1] + mirror(list(reversed(R_BODY[1:-1]))) + []
# assemble closed outline: right half (crown..crotch) then left half (crotch..crown)
BODY = R_BODY + mirror(list(reversed(R_BODY[1:-1])))

R_ARM = [  # top edge follows the shoulder slope, over the deltoid, down the outer arm, round the hand, up the inner arm to the armpit
 (180, 87.8), (191, 92), (200.5, 97.5), (207, 105.5), (210, 118), (211.5, 136), (213.5, 157), (216, 175), (219.5, 192),
 (223, 210), (225.5, 228), (227, 244), (230.5, 256), (233.5, 269), (233, 281), (228.5, 289), (222.5, 287.5), (219, 278),
 (216.5, 266), (214, 256), (212.5, 246), (209.5, 228), (205.5, 208), (201.5, 188), (198.5, 168), (195.5, 148), (191, 131),
 (187, 118), (182, 104)]
ARM_STROKE_FROM, ARM_STROKE_TO = 1, 26   # stroke only the visible contour: shoulder slope -> armpit
L_ARM = mirror(R_ARM)

def raise_arm(arm, joint, angle_deg, weights):
    """Rotate arm points about the shoulder joint; weights blend the rotation near the shoulder so the contour stays smooth."""
    out = []
    for (x, y), w in zip(arm, weights):
        t = math.radians(angle_deg * w); dx, dy = x - joint[0], y - joint[1]
        out.append((joint[0] + dx * math.cos(t) - dy * math.sin(t), joint[1] + dx * math.sin(t) + dy * math.cos(t)))
    return out
_W = [0, .12, .58, .9] + [1] * 21 + [1, .9, .55, 0]
ARM_UP_STROKE_FROM, ARM_UP_STROKE_TO = 1, 27

def open_path(pts, a, b):
    """Smooth open contour through pts[a..b], using neighbours for tangents."""
    seg = pts[max(0, a - 1):b + 2]
    path = cr2bez(seg, closed=False)
    # drop the first and last segments (they only provide tangents)
    parts = path.split("C")
    head = parts[0]; segs = parts[1:]
    if a - 1 >= 0: segs = segs[1:]
    if b + 1 < len(pts): segs = segs[:-1]
    start = pts[a]
    return f"M{start[0]:.1f} {start[1]:.1f}" + "".join("C" + x for x in segs)

LANDMARKS = [
 # clavicles from the sternal notch to the shoulders
 "M153 87.5C163 85.5 176 87.5 191 92.5", "M147 87.5C137 85.5 124 87.5 109 92.5",
 # sternal notch
 "M146.5 86.5Q150 90 153.5 86.5",
 # lower edge of the rib cage
 "M153 151C161 158 170 163 179 166", "M147 151C139 158 130 163 121 166",
 # sides of the neck (sternocleidomastoid)
 "M159.5 68C158 75 156 81 153.5 86", "M140.5 68C142 75 144 81 146.5 86",
 # thumbs
 "M219.5 266c1 4 2.5 8 4.5 11", "M80.5 266c-1 4-2.5 8-4.5 11",
 # navel
 "M148.6 201.5a1.4 2 0 1 0 2.8 0a1.4 2 0 1 0 -2.8 0",
 # knees
 "M161.5 344C164 349 169 350 172 346", "M138.5 344C136 349 131 350 128 346",
 # elbow creases
 "M203.5 182c2.5 2 5.5 2.5 8.5 1.5", "M96.5 182c-2.5 2-5.5 2.5-8.5 1.5",
]

SCARS = ["M156 151C165 154.5 176 150.5 185 143", "M144 151C135 154.5 124 150.5 115 143"]

def raised_figure(angle=80.3):
    up = raise_arm(L_ARM, (104, 106), angle, _W)
    return dict(armLup=cr2bez(up), armLups=open_path(up, ARM_UP_STROKE_FROM, ARM_UP_STROKE_TO), scars=SCARS, upPts=[(round(x,1),round(y,1)) for x,y in up])

def full_figure():
    return dict(body=cr2bez(BODY), armR=cr2bez(R_ARM), armL=cr2bez(L_ARM),
                armRs=open_path(R_ARM, ARM_STROKE_FROM, ARM_STROKE_TO), armLs=open_path(L_ARM, ARM_STROKE_FROM, ARM_STROKE_TO), marks=LANDMARKS)

if __name__ == "__main__":
    d = full_figure(); d.update(raised_figure())
    if len(sys.argv) > 1:
        keep = {k: d[k] for k in ("body", "armR", "armL", "armRs", "armLs", "marks", "armLup", "armLups", "scars")}
        js = ("/* Human figure outlines (front view, gender-neutral, 8-head proportions), generated by tools/fig/figure.py:\n"
              "   smooth Catmull-Rom contours mirrored about the midline; arms are drawn over the body and stroked only where visible. */\n"
              "const FIG=" + json.dumps(keep, separators=(",", ":")) + ";\n")
        open(sys.argv[1], "w").write(js)
        xs = [p[0] for p in d["upPts"]]; print("raised arm min x", min(xs))
    else:
        json.dump(d, sys.stdout)
