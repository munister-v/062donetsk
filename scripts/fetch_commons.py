# -*- coding: utf-8 -*-
"""Качает отобранные снимки Commons в /commons и чистит метаданные.

Отбор: кадры города, а не люди крупным планом и не интерьеры кабинетов;
приоритет по разрешению. Имя автора и лицензия обязательны — снимок без них
не скачивается вовсе, потому что подписать его в музее будет нечем.
"""
import hashlib, json, os, re, sys, time, urllib.parse, urllib.request
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
META = os.path.join(ROOT, "data", "commons.json")
OUT = os.path.join(ROOT, "commons")
UA = {"User-Agent": "062.dn.ua museum/1.0 (tilandiya@gmail.com)"}
LIMIT = int(sys.argv[1]) if len(sys.argv) > 1 else 160
MAX_SIDE = 2200

TRANSLIT = {
    "а": "a", "б": "b", "в": "v", "г": "h", "ґ": "g", "д": "d", "е": "e", "є": "ie",
    "ж": "zh", "з": "z", "и": "y", "і": "i", "ї": "i", "й": "i", "к": "k", "л": "l",
    "м": "m", "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
    "ф": "f", "х": "kh", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "shch", "ю": "iu",
    "я": "ia", "ы": "y", "э": "e", "ё": "e", "ъ": "", "ь": "",
}


def clean_author(raw):
    """В Artist лежит html со ссылкой на профиль: оставляем читаемое имя."""
    name = re.sub(r"<[^>]+>", "", raw or "").strip()
    name = re.sub(r"\s+", " ", name)
    name = re.sub(r"^(User:|Користувач:|Участник:)", "", name).strip()
    return name[:80]


def year_of(raw):
    m = re.search(r"(18\d\d|19\d\d|20[0-2]\d)", raw or "")
    return m.group(1) if m else ""


def year_of_title(title):
    """«1911. Доменний цех.jpg» знято 1911 року, а не 2009-го.

    У метаданих таких сканів стоїть дата завантаження, і зал вугілля
    датувався роком, коли архівний знімок потрапив на Commons.
    """
    m = re.match(r"\s*(18\d\d|19[0-5]\d)\D", title or "")
    return m.group(1) if m else ""


def main():
    items = json.load(open(META, encoding="utf-8"))
    for f in items:
        f["author_clean"] = clean_author(f["author"])
        f["year"] = year_of_title(f["title"]) or year_of(f["date"])
    items = [f for f in items if f["author_clean"]]
    # Крупнее — раньше: у Commons разброс от телефонных кадров до 50 Мп.
    items.sort(key=lambda f: -(f["w"] * f["h"]))

    # Транспорт добираємо квотою, а не сподіванням: за розміром кадру трамвай
    # програє панорамі на 50 Мп і не потрапляє у вибірку взагалі.
    TRANSPORT = re.compile(r"(трамва|тролейбус|автобус|tram|trolley|bus\b|"
                           r"tatra|ziu|laz|вокзал|поїзд|поезд|потяг|metro|метро|"
                           r"залізни|железнодорож|рейк|депо)", re.I)
    quota = int(os.environ.get("TRANSPORT_QUOTA", "60"))
    transport = [f for f in items if TRANSPORT.search(f["title"] + " " + (f.get("desc") or ""))]

    # Історичні кадри так само програють за розміром: скан 1910 року завжди
    # дрібніший за цифрову панораму, тому їм теж потрібна своя квота.
    hist_quota = int(os.environ.get("HIST_QUOTA", "70"))
    historic = [f for f in items
                if f.get("year", "").isdigit() and int(f["year"]) < 1961]
    # Вугілля і храми: те саме, що з транспортом. Шахта й церква програють
    # за розміром аерознімку, і без квоти нових залів просто не було б.
    MINE = re.compile(r"(шахт|копальн|терикон|slag heap|coal|mine\b|mines\b|"
                      r"metallurg|металург|blast furnace|домен|рудник|"
                      r"копер|winding tower|завод|steel works|hughes|юз[іо]вк)", re.I)
    CHURCH = re.compile(r"(church|cathedral|собор|церкв|храм|монастир|monaster|"
                        r"chapel|каплиц|дзвіниц|bell tower|synagogue|синагог|"
                        r"mosque|мечет|cami\b|adventist|адвентист)", re.I)
    mine_quota = int(os.environ.get("MINE_QUOTA", "48"))
    church_quota = int(os.environ.get("CHURCH_QUOTA", "44"))
    mines = [f for f in items if MINE.search(f["title"] + " " + (f.get("desc") or ""))]
    churches = [f for f in items if CHURCH.search(f["title"] + " " + (f.get("desc") or ""))]
    # Мечеть і протестантські храми програють навіть усередині church_quota:
    # соборів у Комонсі на порядок більше, і 44 місця по розміру заповнює
    # сама лише православна церква. Виносимо меншину окремою квотою першою.
    MINORITY = re.compile(r"(мечет|mosque|ahat|cami\b|baptist|баптист|"
                          r"adventist|адвентист)", re.I)
    minority_quota = int(os.environ.get("MINORITY_QUOTA", "6"))
    minority = [f for f in items if MINORITY.search(f["title"] + " " + (f.get("desc") or ""))]
    # Мітинги за єдність України, весна 2014-го: майже весь пул одного
    # фотографа (Yakudza), і загальна квота в 12 кадрів на автора з'їла б
    # дві третини знімків. Позначаємо їх «_event», щоб пропустити той ліміт
    # саме для цієї події — це не персональна виставка, а єдине джерело.
    EVENT = re.compile(r"(євромайдан|euromaidan|мітинг|митинг у донецьку|"
                       r"ukrainian unity)", re.I)
    event_quota = int(os.environ.get("EVENT_QUOTA", "20"))
    events = [f for f in items
              if EVENT.search(f["title"] + " " + (f.get("desc") or ""))
              and not f["title"].lower().endswith((".webm", ".ogv"))]
    for f in events[:event_quota]:
        f["_event"] = True
    head = (historic[:hist_quota] + transport[:quota] + mines[:mine_quota]
            + minority[:minority_quota] + events[:event_quota] + churches[:church_quota])
    picked_ids = {id(f) for f in head}
    rest = [f for f in items if id(f) not in picked_ids]
    items = head + rest
    print(f"  шахт і заводу {len(mines)} (беремо {min(len(mines), mine_quota)}), "
          f"храмів {len(churches)} (беремо {min(len(churches), church_quota)}), "
          f"меншин {len(minority)} (беремо {min(len(minority), minority_quota)}), "
          f"мітингів {len(events)} (беремо {min(len(events), event_quota)})")
    print(f"у пулі: історичних {len(historic)} (беремо {min(len(historic), hist_quota)}), "
          f"транспортних {len(transport)} (беремо {min(len(transport), quota)})")

    os.makedirs(OUT, exist_ok=True)
    picked, seen_author = [], {}
    for f in items:
        if len(picked) >= LIMIT:
            break
        # Не больше 12 кадров от одного автора: иначе музей превращается
        # в персональную выставку самого плодовитого загрузчика.
        if not f.get("_event") and seen_author.get(f["author_clean"], 0) >= 12:
            continue
        # Имя файла на Commons чаще всего кириллическое, и ascii-регулярка
        # схлопывает его в «---.jpg»: снимки затирают друг друга, а подписи
        # разъезжаются с картинками. Транслитерируем и добавляем хвост от
        # исходного имени, чтобы столкновений не было в принципе.
        stem = "".join(TRANSLIT.get(ch, ch) for ch in os.path.splitext(f["title"])[0].lower())
        stem = re.sub(r"[^a-z0-9]+", "-", stem).strip("-")[:56] or "foto"
        tail = hashlib.sha1(f["title"].encode()).hexdigest()[:6]
        dst = os.path.join(OUT, f"{stem}-{tail}.jpg")
        if not os.path.exists(dst):
            try:
                req = urllib.request.Request(f["url"], headers=UA)
                with urllib.request.urlopen(req, timeout=120) as r:
                    blob = r.read()
            except Exception as exc:
                print("  не завантажилось:", f["title"][:50], exc)
                continue
            open(dst, "wb").write(blob)
            try:
                with Image.open(dst) as im:
                    im = ImageOps.exif_transpose(im).convert("RGB")
                    if max(im.size) > MAX_SIDE:
                        k = MAX_SIDE / max(im.size)
                        im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
                    im.save(dst, "JPEG", quality=85, optimize=True)
            except Exception as exc:
                os.remove(dst)
                print("  не картинка:", f["title"][:50], exc)
                continue
            time.sleep(0.5)
        f["file"] = os.path.relpath(dst, ROOT).replace(os.sep, "/")
        seen_author[f["author_clean"]] = seen_author.get(f["author_clean"], 0) + 1
        picked.append(f)

    json.dump(picked, open(os.path.join(ROOT, "data", "commons-picked.json"), "w",
                           encoding="utf-8"), ensure_ascii=False, indent=1)
    total = sum(os.path.getsize(os.path.join(ROOT, p["file"])) for p in picked)
    print(f"завантажено: {len(picked)} знімків, {total/1024/1024:.0f} МБ, "
          f"авторів: {len(seen_author)}")
    by_year = {}
    for p in picked:
        by_year[p["year"] or "без дати"] = by_year.get(p["year"] or "без дати", 0) + 1
    print("за роками:", dict(sorted(by_year.items())))


if __name__ == "__main__":
    main()
