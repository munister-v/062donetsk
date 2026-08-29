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
    # Історія міста: Юзівка, англійська колонія Хьюза, Сталіне.
    "Category:Historical photos of Donetsk",
    'Category:Images from "Illustrated history of Hughesovka-Stalino-Donetsk"',
    "Category:School at the English colony of Yuzivka",
    "Category:Cathedral Transfiguration of Jesus in Hughesovka",
    "Category:1st Synagogue of Yuzovka (Donetsk)",
    "Category:2nd Synagogue of Yuzovka (Donetsk)",
    # Вугілля і завод: те, через що місто взагалі з'явилось. Гілки названі
    # поіменно, бо в «Coal mining» поруч лежать портрети шахтарів і могили,
    # а в «Metallurgical Plant» — заходи в палаці культури й пансіонат на морі.
    "Category:Coal mines in Donetsk",
    "Category:Historical photos of coal mines in Donetsk",
    "Category:Coal mining in Donetsk",
    "Category:Slag heaps in Donetsk",
    "Category:Winding towers in Donetsk",
    "Category:Winding tower on Ovnatanyana Street, Donetsk",
    "Category:Voznesensky mines",
    "Category:Rutchenkovskoe Mining Company",
    "Category:Yekaterinovskoye Mining Company",
    "Category:Rykovskie mines",
    "Category:Chulkovka mines",
    "Category:17-17 bis coal mine",
    "Category:4-4 bis coal mine",
    "Category:Lidievka coal mine",
    "Category:Tsentralno-Zavodskaya coal mine",
    "Category:Zasyadko coal mine",
    "Category:Petrovskaya coal mine",
    "Category:Trudivska coal mine",
    "Category:Butovka-Donetskaya",
    "Category:Donetsk Metallurgical Plant",
    "Category:Historical photos of Donetsk Metallurgical Plant",
    "Category:Donetsk Iron and Steel Works Blast Furnaces",
    "Category:Novorossia Coal, Iron, and Rail-making Company",
    # Храми: собори, церкви, монастир. Гілка «by name» велика, тому беруться
    # ті, де знімків досить на розвіску.
    "Category:Historical photos of churches in Donetsk",
    "Category:Transfiguration Cathedral, Donetsk",
    "Category:Cathedral of Saint Nicholas in Donetsk",
    "Category:Holy Trinity Cathedral (Donetsk)",
    "Category:Church of the Intercession, Donetsk",
    "Category:Saint Michael church in Donetsk",
    "Category:Saint Vladimir church in Donetsk",
    "Category:St. Andrew's Church in Donetsk",
    "Category:Saint Andrew Church in Kirovskyi Raion of Donetsk",
    "Category:Alexander Nevsky church in Donetsk",
    "Category:Church of the Theotokos of Iveron in Iverskyi monastery (Donetsk)",
    "Category:Ignatius Brianchaninov church in Donetsk",
    "Category:Church of Saint John the Baptist (Donetsk)",
    "Category:Church of the Pochayiv Icon in Donetsk",
    "Category:Peter and Fevronia church in Donetsk",
    "Category:Armenian Church in Donetsk",
    "Category:Catholic Church of Christ the King in Donetsk",
    "Category:Church of Seraphim of Sarov in Donetsk",
    "Category:Church of Saint Nina (Donetsk)",
    "Category:Christmas Church in Donetsk",
    "Category:Interiors of churches in Donetsk",
] + [f"Category:{y} in Donetsk" for y in range(1923, 1941)]
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
    # Історичний кадр 1910 року фізично не буває на 1400 px: це скан із
    # відбитка. Тримати для нього той самий поріг, що для цифрового знімка,
    # означає не мати старого міста в музеї взагалі.
    old = re.search(r"(18\d\d|19[0-5]\d)", f.get("date") or "")
    floor = 900 if old else MIN_WIDTH
    if f["w"] < floor or (f["h"] < 700 and f["w"] < floor + 600):
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
