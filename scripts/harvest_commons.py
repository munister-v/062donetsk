# -*- coding: utf-8 -*-
"""Собирает свободно лицензированные снимки Донецка с Wikimedia Commons.

Берём только то, у чего есть автор и лицензия: снимок без имени автора в музей
не идёт. Результат — data/commons.json со всеми полями подписи; сами файлы
кладутся в /commons. Скрипт идемпотентен: уже скачанное не трогает.
"""
import json, os, re, sys, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "commons")
OUT_JSON = os.path.join(ROOT, "data", "commons.json")
UA = {"User-Agent": "062.dn.ua museum harvester/1.0 (tilandiya@gmail.com)"}

# Категории названы поимённо, без обхода дерева: у «Donetsk» ветки уходят
# в людей, документы и события, и рекурсия вытаскивает 36 тысяч файлов,
# из которых город виден на единицах.
CATEGORIES = [
    "Category:Views of Donetsk",
    "Category:Views of Donetsk by viewpoint",
    "Category:Aerial views of Donetsk",
    "Category:Historical views of Donetsk",
    "Category:Night in Donetsk",
    "Category:Remote views of Donetsk",
    "Category:Buildings in Donetsk",
    "Category:Streets in Donetsk",
    "Category:Urban squares in Donetsk",
    "Category:Architectural elements in Donetsk",
    "Category:Interiors in Donetsk",
    "Category:Landscape architecture in Donetsk",
    "Category:Objects of Donetsk",
    "Category:History of Donetsk",
    "Category:Parks in Donetsk",
    "Category:Donetsk Botanical Garden",
    "Category:Donbass Arena",
    "Category:Donetsk Sergey Prokofiev International Airport",
    "Category:Trams in Donetsk",
    "Category:Trolleybuses in Donetsk",
    "Category:Monuments and memorials in Donetsk",
    "Category:Sculptures in Donetsk",
    "Category:Fountains in Donetsk",
    "Category:Kalmius River",
    # Транспорт: окремим блоком, бо це найпопулярніша тема архіву міста
    # і у вільному доступі її більше, ніж здається з категорії «Trams».
    "Category:2020 in transport in Donetsk",
    "Category:Tatra T3 in Donetsk",
    "Category:Trams in Donetsk",
    "Category:Trams in Donetsk by model",
    "Category:Trolleybuses in Donetsk",
    "Category:KTG trolleybuses in Donetsk",
    "Category:LAZ trolleybuses in Donetsk",
    "Category:Buses in Donetsk",
    "Category:CityLAZ-12 in Donetsk",
    "Category:Minibuses in Donetsk",
    "Category:Rail transport in Donetsk",
    "Category:Donetsk Children's Railway",
    "Category:Donetsk Metro",
    "Category:Transport in Donetsk",
    "Category:Road transport in Donetsk",
]
# Не фотографии города: карты, гербы, схемы, сканы, коллажи.
# Кириллические слова тут не для красоты: в категориях Донецка лежат сканы
# купонов, марок, банкнот, афиш и газет, и по-английски они не подписаны.
BAD_NAME = re.compile(
    r"(map|карта|мапа|coat.of.arms|герб|flag|прапор|logo|scheme|схема|"
    r"diagram|chart|graph|montage|collage|stamp|марка|марки|банкнот|купон|"
    r"контр.марка|бона|монета|медаль|значок|"
    r"marker|icon|banner|poster|афіш|афиш|плакат|document|документ|scan|скан|"
    r"passport|plan|план |газет|обкладинк|обложк|титул|грамот|диплом|"
    r"свідоцтв|удостовер|квиток|билет|конверт|листівк|открытк)", re.I)
GOOD_LICENSE = re.compile(r"(cc[- ]by|cc0|public domain|pd-)", re.I)
MIN_WIDTH = 1400
# Обход вглубь дорогой: ветки уходят в людей и события, а метаданные
# тянутся по сети пачками. Один уровень берём только там, где это оправдано.
DEPTH = int(os.environ.get("DEPTH", "0"))


def api(**q):
    """POST, а не GET: сорок кириллических имён файлов дают URI за восемь
    килобайт, и Commons отвечает 414."""
    q.setdefault("format", "json"); q.setdefault("action", "query")
    body = urllib.parse.urlencode(q).encode()
    req = urllib.request.Request("https://commons.wikimedia.org/w/api.php",
                                 data=body, headers=UA)
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=90) as r:
                return json.load(r)
        except Exception:
            if attempt == 3:
                raise
            time.sleep(3 * (attempt + 1))


def strip(s):
    s = re.sub(r"<[^>]+>", "", s or "")
    return re.sub(r"\s+", " ", s).strip()


def files_in(category, depth=1, seen=None):
    """Файлы категории и её подкатегорий на один уровень вглубь."""
    seen = seen if seen is not None else set()
    out = []
    cont = {}
    while True:
        d = api(list="categorymembers", cmtitle=category, cmtype="file",
                cmlimit=500, **cont)
        out += [m["title"] for m in d["query"]["categorymembers"]]
        if "continue" not in d:
            break
        cont = d["continue"]
    if depth > 0:
        d = api(list="categorymembers", cmtitle=category, cmtype="subcat", cmlimit=200)
        for sub in d["query"]["categorymembers"]:
            if sub["title"] in seen:
                continue
            seen.add(sub["title"])
            if re.search(r"(maps|documents|text|graphics|montages|videos|audio)", sub["title"], re.I):
                continue
            out += files_in(sub["title"], depth - 1, seen)
    return out


def details(titles):
    out = []
    for i in range(0, len(titles), 25):
        chunk = titles[i:i + 25]
        d = api(prop="imageinfo", iiprop="url|size|extmetadata|mime",
                titles="|".join(chunk))
        for p in d.get("query", {}).get("pages", {}).values():
            ii = (p.get("imageinfo") or [None])[0]
            if not ii:
                continue
            m = ii.get("extmetadata", {})
            g = lambda k: strip(m.get(k, {}).get("value", ""))
            out.append({
                "title": p["title"][5:],
                "url": ii["url"].split("?")[0],
                "w": ii["width"], "h": ii["height"], "mime": ii.get("mime", ""),
                "author": g("Artist"), "license": g("LicenseShortName"),
                "date": g("DateTimeOriginal") or g("DateTime"),
                "desc": g("ImageDescription"), "credit": g("Credit"),
                "page": "https://commons.wikimedia.org/wiki/" + urllib.parse.quote(p["title"].replace(" ", "_")),
            })
        time.sleep(0.4)
    return out


def wanted(f):
    if not f["mime"].startswith("image/") or f["mime"] == "image/svg+xml":
        return False
    if f["w"] < MIN_WIDTH or f["h"] < 900 and f["w"] < 2000:
        return False
    if BAD_NAME.search(f["title"]):
        return False
    if not f["author"] or not GOOD_LICENSE.search(f["license"]):
        return False
    return True


def main():
    titles = []
    seen_cat = set()
    for c in CATEGORIES:
        try:
            got = files_in(c, depth=DEPTH, seen=seen_cat)
        except Exception as exc:
            print("  категорія впала:", c, exc); continue
        print(f"  {c[9:]:52} {len(got)}")
        titles += got
    titles = sorted(set(titles))
    print("файлів у категоріях:", len(titles))

    info = details(titles)
    keep = [f for f in info if wanted(f)]
    print("з автором, ліцензією і розміром:", len(keep))

    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(OUT_JSON), exist_ok=True)
    json.dump(keep, open(OUT_JSON, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("метадані:", OUT_JSON)


if __name__ == "__main__":
    main()
