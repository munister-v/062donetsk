# -*- coding: utf-8 -*-
"""Иконки сайта: «062» серифом на чернильном квадрате.

Герб міста лишається в шапці, але фавіконом він не працює: щит із молотом
у 16 px перетворюється на пляму. Три цифри читаються з відстані вкладки,
і це та сама назва, що стоїть у вордмарку.
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INK = (18, 18, 18, 255)
PAPER = (255, 255, 255, 255)
# Georgia Bold, а не Iowan: у 16 px тонкий сериф зникає, залишаючи сіру пляму.
FONT = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"


def draw(size, pad_ratio=0.0, radius_ratio=0.0, ss=8):
    """Квадрат фарбується цілком: маска ОС сама обріже кути, а прозорий
    кут у PNG дав би на Android білу пляму під іконкою."""
    S = size * ss                                  # малюємо крупно й зменшуємо
    im = Image.new("RGBA", (S, S), INK)
    if radius_ratio:
        mask = Image.new("L", (S, S), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1],
                                               radius=int(S * radius_ratio), fill=255)
        im.putalpha(mask)
    d = ImageDraw.Draw(im)
    box = S * (1 - 2 * pad_ratio)
    f = ImageFont.truetype(FONT, int(box * 0.46))
    t = "062"
    l, t_, r, b = d.textbbox((0, 0), t, font=f)
    d.text(((S - (r - l)) / 2 - l, (S - (b - t_)) / 2 - t_), t, font=f, fill=PAPER)
    return im.resize((size, size), Image.LANCZOS)


def main():
    for n in (32, 192, 512):
        draw(n).save(os.path.join(ROOT, f"favicon-{n}.png"))
    # 16 px малюється майже в натуральну величину: вісімкратне зменшення
    # розмиває штрихи цифр у сіру смугу, подвійне лишає їх різкими.
    draw(16, ss=2).save(os.path.join(ROOT, "favicon-16.png"))
    # apple-touch: система сама скругляє, тому кути лишаємо прямими,
    # але поле навколо цифр більше — інакше вони впираються в край.
    draw(180, pad_ratio=0.06).save(os.path.join(ROOT, "apple-touch-icon.png"))
    draw(48).save(os.path.join(ROOT, "favicon.ico"),
                  sizes=[(16, 16), (32, 32), (48, 48)])
    print("іконки: 16, 32, 48(ico), 180, 192, 512")


if __name__ == "__main__":
    main()
