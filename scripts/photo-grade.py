"""One colour grade per kind of photograph, after themalin.co.

The Malin's photographs share one grade — warm light, warm shadows, rich but
not loud colour, blacks kept deep — so a page of them reads as one place.
Measured on their home page (14/10/2026, 18 photographs): mean lightness
0.39, 5th/95th percentile 0.05/0.83, saturation 0.43, warmth (red over blue
in the brighter half) 0.16, in the shadows 0.07, with little spread between
photographs. HiLink's own photographs were far apart (Floor 15 cool and
flat, The Quarter House bright and very warm), so each group below gets one
target, all three leaning warm the same way, lighter than The Malin's to sit
on a white page:

  space — the workspaces and properties HiLink runs
  club  — the Business Club, The Quarter Club and the (generated) event
          photographs: richer and a little darker
  city  — the city and illustrative photographs: lighter and softer

Each photograph is moved STRENGTH of the way from where it is to its group's
target, so it keeps something of its own light. The ungraded originals are
kept in photo-masters/ (same names); the script always works from those, so
it can be run again after changing a target. Then make the smaller copies:

    python3 scripts/photo-grade.py          # grade every photograph
    python3 scripts/photo-grade.py --report # only print the numbers
    python3 scripts/photo-variants.py
"""
import glob, os, shutil, sys
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, 'public')
MASTERS = os.path.join(ROOT, 'photo-masters')
STRENGTH = 0.65

TARGETS = {
    #        mean  p5    p95   sat   warm  shadow warm
    'space': (0.46, 0.07, 0.86, 0.30, 0.11, 0.040),
    'club':  (0.41, 0.06, 0.85, 0.36, 0.14, 0.060),
    'city':  (0.50, 0.08, 0.87, 0.28, 0.08, 0.030),
}
GROUPS = [
    ('club', ('hbc-', 'qc-', 'quarter-club-', 'ai-event-')),
    ('city', ('stock-', 'blog-dong-da', 'forum-dong-da-', 'forum-quan-dong-da')),
    ('space', ('f15-', 'f19-', 'nc35-', 'qh-', 'blog-', 'forum-')),
]


def group_of(name):
    for g, prefixes in GROUPS:
        if name.startswith(prefixes):
            return g
    return None


def lum(a):
    return 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]


def measure(a):
    L = lum(a)
    mx, mn = a.max(-1), a.min(-1)
    sat = np.where(mx > 1e-6, (mx - mn) / np.maximum(mx, 1e-6), 0)
    hi, lo = L > np.percentile(L, 50), L < np.percentile(L, 15)
    rb = a[..., 0] - a[..., 2]
    return np.array([L.mean(), np.percentile(L, 5), np.percentile(L, 95), sat.mean(), rb[hi].mean(), rb[lo].mean()])


def grade(a, target):
    now = measure(a)
    goal = now + (np.array(target) - now) * STRENGTH
    L = lum(a)
    # Black and white points, then a gamma for the mean.
    p5, p95 = now[1], now[2]
    t5, t95 = goal[1], goal[2]
    Ln = t5 + (L - p5) * (t95 - t5) / max(p95 - p5, 1e-3)
    over = Ln > t95  # roll the top off softly instead of clipping it
    Ln[over] = t95 + (1 - t95) * (1 - np.exp(-(Ln[over] - t95) / max(1 - t95, 1e-3)))
    Ln = np.clip(Ln, 0, 1)
    lo_g, hi_g = 0.4, 2.5
    for _ in range(30):
        g = (lo_g + hi_g) / 2
        if (Ln ** g).mean() > goal[0]:
            lo_g = g
        else:
            hi_g = g
    Ln = Ln ** ((lo_g + hi_g) / 2)
    # Scale each pixel by at most 1.5×; light added beyond that is neutral, so
    # lifted shadows do not turn into bright colour (a dark red wall stays dark red).
    r = np.minimum(Ln / np.maximum(L, 1e-4), 1.5)
    a = a * r[..., None] + (Ln - L * r)[..., None]
    # Saturation, around the lightness.
    L2 = lum(a)[..., None]
    k = np.clip(goal[3] / max(now[3], 1e-3), 0.8, 1.3)
    a = L2 + (a - L2) * k
    # Warmth: red up and blue down, in the light and in the shadows separately.
    L3 = np.clip(lum(a), 0, 1)
    after = measure(np.clip(a, 0, 1))
    dw, ds = goal[4] - after[4], goal[5] - after[5]
    w_hi, w_lo = L3 ** 0.8, (1 - L3) ** 2
    shift = (dw * w_hi + ds * w_lo) / 2
    a[..., 0] += shift
    a[..., 2] -= shift
    # Anything pushed past white goes back toward its own grey rather than clipping in hue.
    peak = a.max(-1, keepdims=True)
    L4 = lum(a)[..., None]
    t = np.clip((peak - 1) / np.maximum(peak - L4, 1e-4), 0, 1)
    a = a + (L4 - a) * t
    return np.clip(a, 0, 1)


def main():
    report = '--report' in sys.argv
    tracked = set(os.popen(f'git -C "{ROOT}" ls-files public/photos public/properties').read().split())
    os.makedirs(MASTERS, exist_ok=True)
    for path in sorted(glob.glob(f'{PUBLIC}/photos/*.webp') + glob.glob(f'{PUBLIC}/properties/**/*.webp', recursive=True)):
        rel = os.path.relpath(path, ROOT)
        name = os.path.basename(path)
        if name.endswith(('-800.webp', '-1200.webp')) or rel not in tracked:
            continue  # smaller copies are remade; files not in the repository are left alone
        g = group_of(name)
        if not g:
            continue
        master = os.path.join(MASTERS, os.path.relpath(path, PUBLIC))
        if not os.path.exists(master):
            os.makedirs(os.path.dirname(master), exist_ok=True)
            shutil.copy2(path, master)
        im = Image.open(master).convert('RGB')
        a = np.asarray(im).astype(np.float32) / 255
        before = measure(a)
        out = grade(a, TARGETS[g])
        after = measure(out)
        print(f'{g:5s} {name:42s} L {before[0]:.2f}>{after[0]:.2f}  sat {before[3]:.2f}>{after[3]:.2f}  warm {before[4]:.2f}>{after[4]:.2f}')
        if report:
            continue
        Image.fromarray((out * 255 + 0.5).astype(np.uint8)).save(path, 'WEBP', quality=84, method=6)
        for v in ('-800', '-1200'):
            small = path[:-5] + v + '.webp'
            if os.path.exists(small):
                os.remove(small)


if __name__ == '__main__':
    main()
