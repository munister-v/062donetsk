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
EXCLUDED = os.path.join(ROOT, "data", "museum-excluded.json")
TITLES = os.path.join(ROOT, "data", "museum-titles.json")
# Каталог обходит только свой архив. Папка commons описана отдельным файлом
# метаданных: если пройти по ней ещё и обходом, снимок попадёт в каталог дважды
# — как свой (без автора) и как чужой (с автором), и дедупликация оставит тот,
# у которого имени автора нет.
SKIP_DIRS = {".git", "video-thumbs", "heritage", "assets", "media", "scripts",
             "data", "commons", "portal"}
SKIP_FILES = re.compile(r"^(favicon|apple-touch|icon-)")

# Залы хронологические; папка — единственный надёжный признак времени,
# который есть у всего архива, поэтому раскладка идёт по ней.
HALLS = [
    # Одна вісь: що видно на кадрі. Час і автор стоять у підписі під знімком,
    # а не в назві залу — саме змішування трьох осей і не давало згрупувати.
    ("stare-misto", "Старе місто", "Юзівка і перші десятиліття", []),
    ("vulytsi", "Вулиці й площі", "місто щодня",
     ["before2014", "images", "panfilova and others", "bor", "transport"]),
    ("vuhillia", "Вугілля", "шахти, терикони, завод", []),
    ("khramy", "Храми", "собори, церкви, монастир", []),
    ("panoramy", "Панорами", "місто з висоти", ["panorama"]),
    ("sad-i-voda", "Сад і вода", "ботанічний сад, ставки, зелень", ["botsad", "addon", "new"]),
    ("arena", "Донбас Арена і Євро-2012", "коли місто бачила Європа", ["euro2012"]),
    ("viina", "Війна і окупація", "2014–2015 і 2022–2026",
     ["2014", "images/2014", "murzilka", "after2022", "append2025"]),
]
FOLDER_HALL = {f: slug for slug, _, _, folders in HALLS for f in folders}

# Подпись по умолчанию для снимков, которых нет на портале.
DEFAULT_TITLE = {
    "bor": "Донецьк · міська архітектура",
    "images": "Донецьк · образи міста до 2014",
    "images/2014": "Донецьк, 2014",
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
YEARS = {"euro2012": "2012", "images/2014": "2014", "panorama": "2012–2014", "2014": "2014",
         "murzilka": "2014", "images": "до 2014", "before2014": "до 2014",
         "after2022": "2022–2026", "append2025": "2025", "bor": "до 2014",
         "panfilova and others": "до 2014", "transport": "до 2014"}


MONTHS_UK = ["січень", "лютий", "березень", "квітень", "травень", "червень",
             "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"]
# Телеграм зберігає файли як photo_2026-02-09_15-40-03: це дата вивантаження
# архіву, а не зйомки. Знімок міста до 2014 року з такою назвою датувати
# 2026-м було б грубою помилкою, тому цей шаблон ігнорується.
EXPORT_NAME = re.compile(r"^photo_20\d\d-\d\d-\d\d[_ ]")


def date_from_name(path):
    """Дата зйомки з імені файлу, коли вона там справді є.

    Ловить YYYY-MM-DD, YYMMDD (як у 150122-world-ukraine-bus-blast) і
    unix-час (1409490664). Повертає «місяць рік» або порожньо.
    """
    name = path.split("/")[-1]
    if EXPORT_NAME.match(name):
        return ""
    m = re.search(r"(20[0-2]\d)[-_.]?(0[1-9]|1[0-2])[-_.]?(0[1-9]|[12]\d|3[01])", name)
    if m:
        return f"{MONTHS_UK[int(m.group(2)) - 1]} {m.group(1)}"
    m = re.search(r"(?<!\d)(1[0-9]|2[0-6])(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(?!\d)", name)
    if m:
        return f"{MONTHS_UK[int(m.group(2)) - 1]} 20{m.group(1)}"
    m = re.search(r"(?<!\d)(1[0-9]{9})(?!\d)", name)
    if m:
        import datetime
        d = datetime.datetime.fromtimestamp(int(m.group(1)), datetime.UTC)
        if 2005 <= d.year <= 2026:
            return f"{MONTHS_UK[d.month - 1]} {d.year}"
    return ""


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


CREDIT_IN_TITLE = re.compile(r"\s*·\s*(z1uk\s*&\s*railalex)\s*", re.I)


def split_credit(title):
    """Ім'я знімальників, зашите в підпис, переносимо в поле автора.

    У порталі підпис написаний одним рядком: «Донецьк · z1uk & railalex ·
    2012–2014». У музеї для автора є окреме поле й окремий рядок під кадром,
    і сорок дев'ять однакових назв через це перестають бути однаковими.
    """
    m = CREDIT_IN_TITLE.search(title)
    if not m:
        return title, ""
    cleaned = CREDIT_IN_TITLE.sub(" · ", title).strip(" ·")
    cleaned = re.sub(r"\s*·\s*·\s*", " · ", cleaned)
    # Рік і так стоїть окремим полем під кадром; лишати його ще й у назві
    # означає друкувати «Донецьк · 2012–2014» сорок дев'ять разів поспіль.
    cleaned = re.sub(r"\s*·\s*(19|20)\d\d(\s*[–-]\s*(19|20)\d\d)?\s*$", "", cleaned).strip(" ·")
    return cleaned, m.group(1)


def manual_titles():
    """Підписи, виправлені руками.

    Alt у розмітці порталу це основне джерело підписів, але частина з них не
    відповідає кадру: «Фонтан на площі Леніна» на знімку нічного парку,
    «14:00» перед вечірньою зйомкою. Тут вони перебиваються, і перезбірка
    більше не повертає стару назву.
    """
    if not os.path.exists(TITLES):
        return {}
    return json.load(open(TITLES, encoding="utf-8")).get("titles", {})


def excluded_files():
    """Що прибрано з музею руками.

    Файл лишається в репозиторії (портал ним користується), але в каталог
    не потрапляє. Без цього списку перезбірка щоразу повертала б знімок назад.
    """
    if not os.path.exists(EXCLUDED):
        return set()
    return set(json.load(open(EXCLUDED, encoding="utf-8")).get("files", []))


def photos():
    for base, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith(".")]
        for name in sorted(files):
            if not name.lower().endswith((".jpg", ".jpeg", ".webp", ".png")):
                continue
            if SKIP_FILES.match(name):
                continue
            rel = os.path.relpath(os.path.join(base, name), ROOT)
            parts = rel.split(os.sep)
            # Спершу пробуємо двоскладовий ключ: images/2014 це кадри війни,
            # а не «образи міста до 2014», як каже коренева тека images.
            folder = ""
            if len(parts) > 2 and "/".join(parts[:2]) in FOLDER_HALL:
                folder = "/".join(parts[:2])
            elif len(parts) > 1:
                folder = parts[0]
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
    # Свой архив выигрывает у Commons: если один и тот же вид снят и автором,
    # и кем-то ещё, в музее остаётся авторский кадр.
    order = sorted(works, key=lambda w: (w.get("source") == "commons",
                                         not w["titled_by_author"], -w["w"] * w["h"],
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


def tidy_author(name):
    """В поле Artist на Commons попадает что угодно: «Unknown authorUnknown
    author», подпись директора компании 1910 года на пол-абзаца, ссылка на
    профиль. Под снимком должно стоять читаемое имя, поэтому режем по первому
    разделителю и снимаем повторы."""
    name = re.sub(r"\s+", " ", name or "").strip()
    if re.fullmatch(r"(unknown author|автор невідомий|неизвестен)+", name, re.I):
        return "Автор невідомий"
    half = len(name) // 2
    if len(name) % 2 == 0 and name[:half] == name[half:]:   # «AA» вместо «A»
        name = name[:half]
    name = re.split(r"\s+[-–—]\s+|\s*\(|,\s", name)[0].strip()
    # «Shamil Khakirov from Ukraine» — під знімком потрібне ім'я, а не адреса.
    name = re.sub(r"\s+from\s+[A-Za-zА-Яа-яЇїІіЄєҐґ' -]+$", "", name).strip()
    return name[:46] or "Автор невідомий"


def commons_hall(label, year):
    """Чужий знімок потрапляє в зал за сюжетом, як і свій.

    Окремого залу для Commons більше немає: походження видно з підпису під
    кадром (ім'я автора, ліцензія, посилання на файл), і це чесніше, ніж
    відгороджувати чуже стіною.
    """
    if year.isdigit() and int(year) < 1961:
        return "stare-misto"                     # Юзівка і Сталіне
    if any(k in label for k in ("старих знімках", "Юзівка", "Сталіне")):
        return "stare-misto"
    if any(k in label for k in ("Шахт", "шахт", "Терикон", "Копальн", "копальн",
                                "Копер", "Металургійн", "Домен", "Вугільн",
                                "Новоросійське")):
        return "vuhillia"
    if any(k in label for k in ("собор", "Собор", "Храм", "храм", "церкв", "Церкв",
                                "монастир", "Костел", "Синагог", "Мечет", "мечет")):
        return "khramy"
    if "Арена" in label:
        return "arena"
    if "з висоти" in label:
        return "panoramy"
    if any(w in label for w in ("Кальміус", "Парки", "Ботан")):
        return "sad-i-voda"
    return "vulytsi"


def commons_works():
    """Снимки с Wikimedia Commons отдельным залом.

    Они не смешиваются с авторским архивом сознательно: у этих кадров есть
    имя автора и лицензия, и зал прямо об этом говорит. Подпись берётся из
    описания файла, а если его нет — из имени файла, но никогда не выдумывается.
    """
    picked = os.path.join(ROOT, "data", "commons-picked.json")
    if not os.path.exists(picked):
        return []
    out = []
    skip = excluded_files()
    for f in json.load(open(picked, encoding="utf-8")):
        if not os.path.exists(os.path.join(ROOT, f["file"])) or f["file"] in skip:
            continue
        # Подпись, написанную куратором в curate_commons.py, ничем не перебиваем:
        # описание на Commons бывает поводом загрузки, а не сюжетом снимка.
        title = f.get("museum_title") or re.sub(r"<[^>]+>", "", f.get("desc") or "").strip()
        if not title or len(title) > 120:
            title = re.sub(r"[_-]+", " ", os.path.splitext(os.path.basename(f["file"]))[0])
            title = re.sub(r"\s+", " ", title).strip()
        out.append({
            "id": "", "file": f["file"], "title": title[:120],
            "titled_by_author": True, "hall": commons_hall(title, f.get("year", "")),
            "year": f.get("year", ""), "note": "",
            "source": "commons", "author": tidy_author(f["author_clean"]),
            "license": f["license"], "page": f["page"],
            "w": f["w"], "h": f["h"],
        })
    return out


def main():
    skip_manual = excluded_files()
    fixed_titles = manual_titles()
    old = {}
    if os.path.exists(CATALOG):
        old = {w["file"]: w for w in json.load(open(CATALOG, encoding="utf-8"))["works"]}
    caps = captions_from_portal()

    works, skipped = [], []
    for rel, folder in photos():
        if rel in skip_manual:
            skipped.append((rel, "прибрано руками"))
            continue
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
        title = (fixed_titles.get(rel) or caps.get(rel)
                 or DEFAULT_TITLE.get(folder, "Донецьк"))
        title, credit = split_credit(title)
        if title in ("", "Донецьк"):        # лишився голий топонім — беремо назву розділу
            title = DEFAULT_TITLE.get(folder, "Донецьк")
        works.append({
            "id": "",                       # проставит assign_ids: нужен взгляд на весь набор
            "file": rel,
            # Попередній каталог більше не джерело: він консервував помилку.
            # Порядок: ручний підпис → alt порталу → назва за розділом.
            "title": title,
            "titled_by_author": rel in caps,
            # Зал перечитується з розкладки щоразу: інакше попередній
            # каталог законсервував би стару групіровку назавжди.
            "hall": FOLDER_HALL[folder],
            # Порядок довіри: правка руками, потім дата з імені файлу,
            # і лише потім грубе датування за папкою.
            "year": (prev.get("year") if prev.get("year_manual") else
                     date_from_name(rel) or YEARS.get(folder, "")),
            "year_manual": prev.get("year_manual", False),
            "note": prev.get("note", ""),
            "source": "own", "author": credit, "license": "", "page": "",
            "w": w, "h": h,
        })

    works += commons_works()
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
