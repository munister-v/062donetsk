# -*- coding: utf-8 -*-
"""Чистит зал «Очима інших»: выкидывает лишнее и переписывает подписи.

Машинный перевод для музейных подписей не годится: тест на этих же строках
дал «Донецкого каменноугольного» и «Донецк». Поэтому подпись собирается из
категорий Commons по словарю, который написан руками, а снимки без внятной
категории отсеиваются вместе с тем, что вообще не про город.
"""
import json, os, re, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PICKED = os.path.join(ROOT, "data", "commons-picked.json")
UA = {"User-Agent": "062.dn.ua museum/1.0 (tilandiya@gmail.com)"}

# Жёсткие запреты: снимок выкидывается независимо ни от чего.
HARD_DROP = re.compile(
    r"(ленін|ленин|lenin|"                        # памятники Ленину
    r"днр|dnr\b|dpr\b|people.s republic|новороссия|новоросія|"  # символика оккупантов
    r"денежн|разменн|облигац|обліга|банкнот|купюр|марка|конверт|спецгашен|"
    r"škoda|skoda|octavia|"
    r"iphone|айфон|macbook|ноутбук|laptop|"
    r"portrait|портрет|f cks|fücks|жюри|журі)", re.I)

# Мягкие: это повод загрузки, а не сюжет. Автор мог подписать «DrupalCamp»
# набор, где на кадрах стадион и улицы, — категория тут говорит правду,
# поэтому такие слова топят снимок только если внятной категории нет.
SOFT_DROP = re.compile(r"(drupalcamp|конференц|conference|camp\b|"
                       r"конкурс|засідан|нарад|презентац|flickr|quantizer|selfie|селфі)", re.I)

# Категория Commons -> название зала-подписи. Пишется руками: это музейная
# этикетка, а не машинный перевод.
CATEGORY_TITLE = [
    # Спершу найконкретніше: сімдесят кадрів з однаковим підписом
    # «Вулиці Донецька» це не каталог, а шпалери.
    ("Pushkin Boulevard", "Бульвар Пушкіна"),
    ("Artema Street", "Вулиця Артема"),
    ("Universitetska", "Університетська вулиця"),
    ("Tatra T3", "Трамвай Tatra T3"),
    ("in transport in Donetsk", "Міський транспорт"),
    ("Donbass Arena", "Донбас Арена"),
    ("Donetsk Botanical Garden", "Ботанічний сад"),
    ("Botanical", "Ботанічний сад"),
    ("Aerial views of Donetsk", "Донецьк з висоти"),
    ("Night in Donetsk", "Нічний Донецьк"),
    ("Trolleybuses in Donetsk", "Тролейбус у Донецьку"),
    ("Trams in Donetsk", "Трамвай у Донецьку"),
    ("Railway", "Залізниця Донецька"),
    ("Streets in Donetsk", "Вулиці Донецька"),
    ("Urban squares in Donetsk", "Площі Донецька"),
    ("Parks in Donetsk", "Парки Донецька"),
    ("Fountains in Donetsk", "Фонтани Донецька"),
    ("Kalmius", "Кальміус"),
    ("Churches", "Храми Донецька"),
    ("Cathedral", "Храми Донецька"),
    ("Monuments and memorials", "Пам'ятні знаки міста"),
    ("Sculptures", "Міська скульптура"),
    ("Theatres", "Театри Донецька"),
    ("Museums", "Музеї Донецька"),
    ("Universities", "Університети Донецька"),
    ("Hotels", "Готелі Донецька"),
    ("Shopping", "Торгові будинки"),
    ("Interiors", "Інтер'єри Донецька"),
    ("Historical views", "Донецьк на старих знімках"),
    ("History of Donetsk", "Донецьк на старих знімках"),
    ("Buildings in Donetsk", "Будівлі Донецька"),
    ("Architecture", "Архітектура Донецька"),
    ("Views of Donetsk", "Види Донецька"),
    ("Objects of Donetsk", "Донецьк"),
]


MONTHS = {"January": "січень", "February": "лютий", "March": "березень",
          "April": "квітень", "May": "травень", "June": "червень", "July": "липень",
          "August": "серпень", "September": "вересень", "October": "жовтень",
          "November": "листопад", "December": "грудень"}


def api(**q):
    q.setdefault("format", "json"); q.setdefault("action", "query")
    body = urllib.parse.urlencode(q).encode()
    req = urllib.request.Request("https://commons.wikimedia.org/w/api.php", data=body, headers=UA)
    with urllib.request.urlopen(req, timeout=90) as r:
        return json.load(r)


def categories(titles):
    out = {}
    for i in range(0, len(titles), 25):
        chunk = titles[i:i + 25]
        d = api(prop="categories", cllimit=500,
                titles="|".join("File:" + t for t in chunk))
        for p in d.get("query", {}).get("pages", {}).values():
            out[p["title"][5:]] = [c["title"][9:] for c in p.get("categories", [])]
        time.sleep(0.4)
    return out


def title_for(cats):
    for needle, label in CATEGORY_TITLE:
        if any(needle.lower() in c.lower() for c in cats):
            return label
    return ""


def main():
    items = json.load(open(PICKED, encoding="utf-8"))
    cats = categories([x["title"] for x in items])

    kept, dropped = [], []
    for x in items:
        own_text = x["title"] + " " + x.get("desc", "")
        cat_text = " ".join(cats.get(x["title"], []))
        # Люди крупним планом і речі зі столу це не музей міста.
        if re.search(r"(people of donetsk|portraits|men |women |journalists|"
                     r"computers|electronics|meetings|conferences)", cat_text, re.I):
            dropped.append((x["title"][:50], "люди або предмети, не місто"))
            continue
        # По категориям ловим только советские монументы: категория надёжно
        # говорит, что на снимке, а вот повод загрузки — нет.
        if HARD_DROP.search(own_text) or re.search(r"(lenin|ленін|ленин)", cat_text, re.I):
            dropped.append((x["title"][:50], "заборонений сюжет"))
            continue
        label = title_for(cats.get(x["title"], []))
        if not label:
            dropped.append((x["title"][:50], "немає зрозумілої категорії"))
            continue
        if SOFT_DROP.search(own_text) and not label:
            dropped.append((x["title"][:50], "привід зйомки, а не місто"))
            continue
        year = x.get("year") or ""
        month = ""
        for c in cats.get(x["title"], []):
            m = re.match(r"(January|February|March|April|May|June|July|August|"
                         r"September|October|November|December) (\d{4}) in Donetsk", c)
            if m:
                month = MONTHS[m.group(1)] + " " + m.group(2)
                break
        # Довоєнні кадри це не «вулиці», це інша епоха міста.
        if year and year.isdigit() and int(year) < 1940:
            label = "Донецьк на старих знімках"
        stamp = month or year
        x["museum_title"] = f"{label} · {stamp}" if stamp else label
        kept.append(x)

    json.dump(kept, open(PICKED, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"лишилось: {len(kept)}, прибрано: {len(dropped)}")
    seen = {}
    for d in dropped:
        seen[d[1]] = seen.get(d[1], 0) + 1
    print("причини:", seen)
    for t, why in dropped[:10]:
        print("   -", t, "|", why)
    # снимки, файлы которых больше не нужны
    keep_files = {x["file"] for x in kept}
    gone = 0
    for name in os.listdir(os.path.join(ROOT, "commons")):
        rel = f"commons/{name}"
        if rel not in keep_files:
            os.remove(os.path.join(ROOT, rel)); gone += 1
    print("видалено файлів:", gone)


if __name__ == "__main__":
    main()
