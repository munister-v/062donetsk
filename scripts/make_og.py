# -*- coding: utf-8 -*-
"""Картки попереднього перегляду для месенджерів і соцмереж.

Раніше в og:image ішов просто знімок у webp: месенджер показував випадковий
кадр без жодного натяку, що це музей, а частина клієнтів webp не малює
взагалі. Тут із того самого кадру складається картка 1200×630 у JPEG:
затемнений низ, назва музею, підзаголовок і адреса.
"""
import json, os, re
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "og")
W, H = 1200, 630
SERIF = "/System/Library/Fonts/Supplemental/Iowan Old Style.ttc"
SANS = "/System/Library/Fonts/Supplemental/Arial.ttf"
SANS_B = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def font(path, size, index=0):
    return ImageFont.truetype(path, size, index=index)


def wrap(d, text, f, width):
    words, lines, cur = text.split(), [], ""
    for w in words:
        probe = (cur + " " + w).strip()
        if d.textlength(probe, font=f) <= width or not cur:
            cur = probe
        else:
            lines.append(cur); cur = w
    if cur:
        lines.append(cur)
    return lines


def card(src, title, sub, dst):
    im = Image.open(src).convert("RGB")
    im = ImageOps.fit(im, (W, H), Image.LANCZOS, centering=(0.5, 0.4))
    # Градієнт знизу, а не суцільна плашка: знімок лишається видним,
    # а текст стоїть на своєму тлі й читається на будь-якому кадрі.
    scrim = Image.new("L", (1, H))
    for y in range(H):
        k = max(0.0, (y - H * 0.32) / (H * 0.68))
        scrim.putpixel((0, y), int(238 * (k ** 1.35)))
    im = Image.composite(Image.new("RGB", (W, H), (12, 12, 12)), im,
                         scrim.resize((W, H)))
    d = ImageDraw.Draw(im)
    pad = 64
    f_mark = font(SANS_B, 26)
    f_title = font(SERIF, 66)
    f_sub = font(SANS, 28)

    mark = "0 6 2 . D N . U A"
    d.text((pad, pad), mark, font=f_mark, fill=(255, 255, 255))

    lines = wrap(d, title, f_title, W - 2 * pad)[:2]
    sub_lines = wrap(d, sub, f_sub, W - 2 * pad)[:2]
    block = len(lines) * 78 + len(sub_lines) * 38 + 18
    y = H - pad - block
    for ln in lines:
        d.text((pad, y), ln, font=f_title, fill=(255, 255, 255)); y += 78
    y += 18
    for ln in sub_lines:
        d.text((pad, y), ln, font=f_sub, fill=(214, 210, 205)); y += 38

    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst, "JPEG", quality=86, optimize=True, progressive=True)


def main():
    cat = json.load(open(os.path.join(ROOT, "data/museum-catalog.json"), encoding="utf-8"))
    works, halls = cat["works"], cat["halls"]
    by_hall = {}
    for w in works:
        by_hall.setdefault(w["hall"], []).append(w)

    # Та сама логіка, що в build_museum.py: великий, горизонтальний,
    # денний кадр, не з-під землі, не з будмайданчика й не нічний
    # (нічне підсвічення дає оманливо високу насиченість).
    UGLY_KEY = re.compile(r"(метробуд|будівництв|реконструкц|демонтаж|знесен|"
                          r"руїн|підземн|стовбур шахти|котлован)", re.I)
    NIGHT_KEY = re.compile(r"(ніч|нічн|вечір|вечірн|підсвіт|вогні|захід сонця|"
                           r"світанк)", re.I)

    def hsv(w):
        # Небо (верхні 25%) виказує ніч навіть коли вулиці внизу яскраво
        # підсвічені: sat/val самі по собі вигравали в довгій витримці.
        path = os.path.join(ROOT, "media", f"{w['id']}-s.webp")
        try:
            im = Image.open(path).convert("HSV").resize((32, 32))
            px = list(im.getdata())
            sat = sum(p[1] for p in px) / len(px)
            val = sum(p[2] for p in px) / len(px)
            sky_px = list(im.crop((0, 0, 32, 8)).getdata())
            sky = sum(p[2] for p in sky_px) / len(sky_px)
            return sat, val, sky
        except Exception:
            return 0, 0, 0

    def key_work(ws):
        wide = [w for w in ws if w["w"] >= w["h"]]
        pool = wide or ws
        good = [w for w in pool if not UGLY_KEY.search(w["title"])]
        day = [w for w in good if not NIGHT_KEY.search(w["title"])]
        cand = day or good or pool
        top = sorted(cand, key=lambda w: -(w["w"] * w["h"]))[:16]
        bright = [w for w in top if hsv(w)[2] >= 191]
        pick_from = bright or top
        return max(pick_from, key=lambda w: hsv(w)[0])

    cover = key_work(by_hall["panoramy"])
    card(os.path.join(ROOT, cover["file"]), "Музей фотографії Донецька",
         f"{len(works)} знімків у {len(halls)} залах · від Юзівки до сьогодні",
         os.path.join(OUT, "home.jpg"))
    n = 1
    for h in halls:
        ws = by_hall.get(h["slug"]) or []
        if not ws:
            continue
        card(os.path.join(ROOT, key_work(ws)["file"]), h["title"],
             f"{h['pair']} · {len(ws)} знімків",
             os.path.join(OUT, f"hall-{h['slug']}.jpg"))
        n += 1
    print(f"карток: {n}")


if __name__ == "__main__":
    main()
