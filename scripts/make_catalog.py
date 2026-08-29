# -*- coding: utf-8 -*-
"""Собирает data/museum-catalog.json из фотографий в репозитории.

Подписи берутся из index.html портала: там у 231 снимка уже есть украинский
alt, написанный автором, и переписывать его машиной незачем. Остальным
ставится честная подпись по разделу, без выдуманных подробностей.

Файл-каталог после генерации правится руками: это источник правды для сборки,
а не промежуточный кэш. Повторный запуск сохраняет уже отредактированные
поля (title, hall, year, note) и только добавляет новые снимки.
"""
import hashlib, json, os, re, sys, urllib.parse
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CATALOG = os.path.join(ROOT, "data", "museum-catalog.json")
SKIP_DIRS = {".git", "video-thumbs", "heritage", "assets", "media", "scripts", "data"}
SKIP_FILES = re.compile(r"^(favicon|apple-touch|icon-)")

# Залы хронологические; папка — единственный надёжный признак времени,
# который есть у всего архива, поэтому раскладка идёт по ней.
HALLS = [
    ("misto-do-2014", "Місто до 2014", "яким його знали",
     ["before2014", "images", "panfilova and others", "bor", "transport"]),
    ("euro-2012", "Євро-2012", "місто приймає Європу", ["euro2012"]),
    ("panorama", "Панорама 2012–2014", "місто на піку", ["panorama"]),
    ("lito-2014", "Літо 2014", "рік, що розділив", ["2014", "murzilka"]),
    ("botanichnyi-sad", "Ботанічний сад", "оаза посеред вугілля", ["botsad", "addon"]),
    ("kolory", "Кольори міста", "світло, вода, зелень", ["new"]),
    ("okupatsiia", "Окупація 2022–2026", "що з ним зробили", ["after2022", "append2025"]),
]
FOLDER_HALL = {f: slug for slug, _, _, folders in HALLS for f in folders}

# Подпись по умолчанию для снимков, которых нет на портале.
DEFAULT_TITLE = {
    "bor": "Донецьк · міська архітектура",
    "images": "Донецьк · образи міста до 2014",
    "panfilova and others": "Донецьк · вечірнє місто",
    "before2014": "Донецьк до 2014",
    "euro2012": "Євро-2012 · Донецьк",
    "2014": "Донецьк · 2014",
    "panorama": "Донецьк · панорама міста",
    "botsad": "Донецький ботанічний сад",
    "addon": "Донецький ботанічний сад",
    "new": "Кольори Донецька",
    "murzilka": "Арт-група «Мурзилка» · Донецьк",
    "after2022": "Донецьк в окупації",
    "append2025": "Донецьк в окупації · 2025",
    "transport": "Міський транспорт · Донецьк",
}
YEARS = {"euro2012": "2012", "panorama": "2012–2014", "2014": "2014",
         "murzilka": "2014", "images": "до 2014", "before2014": "до 2014",
         "after2022": "2022–2026", "append2025": "2025", "bor": "до 2014",
         "panfilova and others": "до 2014", "transport": "до 2014"}


def captions_from_portal():
    """Автор подписал снимки прямо в разметке портала: забираем оттуда."""
    # Портал переехал в /portal/, а в корне теперь музей: подписи живут там,
    # где их писал автор. Читать корневой index.html нельзя — он сгенерирован.
    src = os.path.join(ROOT, "portal", "index.html")
    if not os.path.exists(src):
        src = os.path.join(ROOT, "index.html")
    html = open(src, encoding="utf-8").read()
    out = {}
    for tag in re.findall(r"<img\b[^>]*>", html, re.S):
        src = re.search(r'src="([^"]+)"', tag)
        alt = re.search(r'alt="([^"]*)"', tag)
        if not src or not alt:
            continue
        path = urllib.parse.unquote(src.group(1)).lstrip("./")
        if path.startswith(("http", "data:")) or "${" in path:
            continue
        text = re.sub(r"\s+", " ", alt.group(1)).strip()
        text = text.replace("&amp;", "&").replace("&#39;", "’")
        if len(text) > 3:
            out.setdefault(path, text)
    return out


def photos():
    for base, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith(".")]
        for name in sorted(files):
            if not name.lower().endswith((".jpg", ".jpeg", ".webp", ".png")):
                continue
            if SKIP_FILES.match(name):
                continue
            rel = os.path.relpath(os.path.join(base, name), ROOT)
            folder = rel.split(os.sep)[0] if os.sep in rel else ""
            if folder not in FOLDER_HALL:
                continue
            yield rel.replace(os.sep, "/"), folder


TRANSLIT = {
    "а": "a", "б": "b", "в": "v", "г": "h", "ґ": "g", "д": "d", "е": "e", "є": "ie",
    "ж": "zh", "з": "z", "и": "y", "і": "i", "ї": "i", "й": "i", "к": "k", "л": "l",
    "м": "m", "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
    "ф": "f", "х": "kh", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "shch", "ю": "iu",
    "я": "ia", "ы": "y", "э": "e", "ё": "e", "ъ": "", "ь": "",
}


def slug(path):
    """Адрес снимка из имени файла.

    Кириллицу транслитерируем: без этого «Донецк_2012_-_panoramio.jpg» и
    «После_реконструкции_2012_-_panoramio.jpg» схлопывались в один и тот же
    ascii-огрызок, страницы затирали друг друга, и шесть снимков из музея
    просто пропадали.
    """
    text = "".join(TRANSLIT.get(ch, ch) for ch in path.lower())
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")[:70] or "foto"


def assign_ids(works):
    """Один файл — один адрес. Совпадение слагов разводим хвостом от пути,
    а не порядковым номером: номер поехал бы при следующем добавлении фото."""
    taken = {}
    for w in sorted(works, key=lambda x: x["file"]):
        base = slug(w["file"])
        if taken.get(base, w["file"]) != w["file"]:
            base = f"{base}-{hashlib.sha1(w['file'].encode()).hexdigest()[:4]}"
        taken[base] = w["file"]
        w["id"] = base
    return works


def dhash(path, side=16):
    """Перцептивный хеш: одна и та же фотография лежит в архиве по два раза,
    как .jpg и как .webp, а иногда ещё и в соседней папке под другим именем.
    Побайтовое сравнение такие пары не ловит, поэтому сравниваем картинку."""
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im).convert("L").resize((side + 1, side), Image.LANCZOS)
        px = list(im.getdata())
    bits = 0
    for y in range(side):
        row = px[y * (side + 1):(y + 1) * (side + 1)]
        for x in range(side):
            bits = (bits << 1) | (1 if row[x] > row[x + 1] else 0)
    return bits


def drop_duplicates(works, threshold=12):
    """Из группы одинаковых снимков остаётся один.

    Приоритет: подпись автора важнее (её писал человек), потом больший размер,
    потом оригинальный jpg. Так в музее не висит один и тот же кадр дважды
    с разными подписями, как это было на панораме с конём.
    """
    hashes = {w["file"]: dhash(w["file"]) for w in works}
    order = sorted(works, key=lambda w: (not w["titled_by_author"], -w["w"] * w["h"],
                                         w["file"].endswith(".webp"), w["file"]))
    kept, dropped = [], []
    for w in order:
        h = hashes[w["file"]]
        twin = next((k for k in kept if bin(hashes[k["file"]] ^ h).count("1") <= threshold), None)
        if twin:
            dropped.append((w["file"], twin["file"]))
        else:
            kept.append(w)
    return kept, dropped


def main():
    old = {}
    if os.path.exists(CATALOG):
        old = {w["file"]: w for w in json.load(open(CATALOG, encoding="utf-8"))["works"]}
    caps = captions_from_portal()

    works, skipped = [], []
    for rel, folder in photos():
        try:
            with Image.open(os.path.join(ROOT, rel)) as im:
                w, h = im.size
        except Exception as exc:
            skipped.append((rel, str(exc)))
            continue
        if min(w, h) < 320:                     # иконки и мусор в музей не идут
            skipped.append((rel, f"мелкий {w}x{h}"))
            continue
        prev = old.get(rel, {})
        works.append({
            "id": "",                       # проставит assign_ids: нужен взгляд на весь набор
            "file": rel,
            "title": prev.get("title") or caps.get(rel) or DEFAULT_TITLE.get(folder, "Донецьк"),
            "titled_by_author": rel in caps,
            "hall": prev.get("hall") or FOLDER_HALL[folder],
            "year": prev.get("year") or YEARS.get(folder, ""),
            "note": prev.get("note", ""),
            "w": w, "h": h,
        })

    works, dropped = drop_duplicates(works)
    works = assign_ids(works)
    works.sort(key=lambda x: ([s for s, *_ in HALLS].index(x["hall"]), x["file"]))
    os.makedirs(os.path.dirname(CATALOG), exist_ok=True)
    json.dump({
        "halls": [{"slug": s, "title": t, "pair": p, "folders": f} for s, t, p, f in HALLS],
        "works": works,
    }, open(CATALOG, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    print(f"в каталозі: {len(works)} фото")
    for slug, title, *_ in HALLS:
        n = sum(1 for w in works if w["hall"] == slug)
        named = sum(1 for w in works if w["hall"] == slug and w["titled_by_author"])
        print(f"  {title:24} {n:4}  з авторським підписом {named}")
    if dropped:
        print(f"прибрано дублів: {len(dropped)} (приклад: {dropped[0][0]} = {dropped[0][1]})")
    if skipped:
        print("пропущено:", len(skipped), skipped[:3])


if __name__ == "__main__":
    main()
