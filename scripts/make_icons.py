# -*- coding: utf-8 -*-
"""Іконки сайту з герба Донецька.

Герб у файлі це високий вузький щит (150×192) з прозорими полями з боків.
Якщо покласти його у квадрат як є, він займе менш ніж половину площі
й у вкладці перетвориться на смужку. Тому щит обрізається по вмісту
і масштабується так, щоб заповнити квадрат по висоті, а поля з боків
зафарбовуються тлом сторінки: у вкладці іконка має бути щільною плямою,
а не прозорим силуетом.
"""
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "gerb.png")
PAPER = (255, 255, 255, 255)


def icon(size, pad_ratio=0.04, bg=PAPER):
    """Квадрат розміру size з гербом по центру.

    Малюємо вчетверо більшим і зменшуємо: пряме масштабування щита
    з тонкими золотими лініями дає рвані краї.
    """
    S = size * 4
    src = Image.open(SRC).convert("RGBA")
    src = src.crop(src.getbbox())                 # прибрати прозорі поля
    box = int(S * (1 - 2 * pad_ratio))
    k = box / src.height                          # тягнемо по висоті: щит високий
    w, h = max(1, round(src.width * k)), box
    src = src.resize((w, h), Image.LANCZOS)

    canvas = Image.new("RGBA", (S, S), bg)
    canvas.alpha_composite(src, ((S - w) // 2, (S - h) // 2))
    return canvas.resize((size, size), Image.LANCZOS)


def main():
    for n in (16, 32, 192, 512):
        icon(n).save(os.path.join(ROOT, f"favicon-{n}.png"))
    # apple-touch: система сама скругляє кути й не любить прозорість,
    # тому тло непрозоре, а поля трохи більші.
    icon(180, pad_ratio=0.10).save(os.path.join(ROOT, "apple-touch-icon.png"))
    icon(48).save(os.path.join(ROOT, "favicon.ico"),
                  sizes=[(16, 16), (32, 32), (48, 48)])
    print("іконки з герба: 16, 32, 48(ico), 180, 192, 512")


if __name__ == "__main__":
    main()
