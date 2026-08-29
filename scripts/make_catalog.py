# -*- coding: utf-8 -*-
"""Собирает data/museum-catalog.json из фотографий в репозитории.

Подписи берутся из index.html портала: там у 231 снимка уже есть украинский
alt, написанный автором, и переписывать его машиной незачем. Остальным
ставится честная подпись по разделу, без выдуманных подробностей.

Файл-каталог после генерации правится руками: это источник правды для сборки,
а не промежуточный кэш. Повторный запуск сохраняет уже отредактированные
поля (title, hall, year, note) и только добавляет новые снимки.
"""
import json, os, re, sys, urllib.parse
from PIL import Image

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
    html = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
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
            "id": prev.get("id") or re.sub(r"[^a-z0-9]+", "-", rel.lower()).strip("-")[:60],
            "file": rel,
            "title": prev.get("title") or caps.get(rel) or DEFAULT_TITLE.get(folder, "Донецьк"),
            "titled_by_author": rel in caps,
            "hall": prev.get("hall") or FOLDER_HALL[folder],
            "year": prev.get("year") or YEARS.get(folder, ""),
            "note": prev.get("note", ""),
            "w": w, "h": h,
        })

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
    if skipped:
        print("пропущено:", len(skipped), skipped[:3])


if __name__ == "__main__":
    main()
