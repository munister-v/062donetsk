# -*- coding: utf-8 -*-
"""Режет из каталога webp двух размеров в /media.

500w для сетки, 1200w для плиты и страницы снимка. Оригинал остаётся на месте
и доступен по ссылке «повний розмір»: архив ценен именно исходниками.
Повторный запуск пропускает уже готовое, поэтому его дёшево гонять при сборке.
"""
import json, os
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "media")
SIZES = {"s": 500, "m": 1200}

def main():
    works = json.load(open(os.path.join(ROOT, "data/museum-catalog.json"), encoding="utf-8"))["works"]
    os.makedirs(OUT, exist_ok=True)
    made = skipped = 0
    for w in works:
        src = os.path.join(ROOT, w["file"])
        for tag, width in SIZES.items():
            dst = os.path.join(OUT, f"{w['id']}-{tag}.webp")
            if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
                skipped += 1
                continue
            with Image.open(src) as im:
                im = ImageOps.exif_transpose(im).convert("RGB")   # поворот в пиксели, иначе ляжет набок
                if im.width > width:
                    im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
                im.save(dst, "WEBP", quality=80, method=5)
            made += 1
    print(f"нарізано: {made}, вже було: {skipped}")
    total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
    print(f"вага /media: {total/1024/1024:.1f} МБ")

if __name__ == "__main__":
    main()
