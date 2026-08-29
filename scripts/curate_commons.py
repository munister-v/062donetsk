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
    r"(ленін|ленин|lenin|"
    r"rusmarka|spetshash|спецгаш|pochtamt|почтамт|philatel|поштов[аи] марк|"  # марки й гашення
    r"mytropolyt|митрополит|"                     # портрет, а не місто                        # памятники Ленину
    r"днр|dnr\b|dpr\b|people.s republic|новороссия|новоросія|"  # символика оккупантов
    r"денежн|разменн|облигац|обліга|банкнот|купюр|марка|конверт|спецгашен|"
    r"škoda|skoda|octavia|"
    r"iphone|айфон|macbook|ноутбук|laptop|"
    r"crash|accident|collision|аварі|катастроф|зіткн|зштовх|"      # аварії, не місто
    r"stock certificate|share certificate|акци[яй]|акційн|пай\b|сертифікат|"  # цінні папери
    r"облигац|обліга|вексел|прошени|прохання|бланк|рахунок|відомість|ведомость|"
    r"креслен|чертеж|проект |план[уи] |генплан|"
    r"проспект реклам|рекламн\w* проспект|прейскурант|каталог товар|"  # скани друку
    r"portrait|портрет|f cks|fücks|жюри|журі|"
    r"ferrari|porsche|bmw|mercedes|lamborghini|автомобіл|автомобил|"
    r"магазин|супермаркет|вітрин|витрин|прилав|холодильн|товар|цінник|ценник|"
    r"їжа|еда|продукт|молок|ковбас|пиво|напо)", re.I)

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
    # Історичні сюжети йдуть першими: вони найконкретніші.
    # Вугілля і завод: конкретна шахта важливіша за загальне «Донецьк».
    ("Historical photos of coal mines", "Шахта · старий знімок"),
    ("Slag heaps", "Терикон"),
    ("Winding tower", "Копер шахти"),
    ("Historical photos of Donetsk Metallurgical Plant", "Металургійний завод"),
    ("Donetsk Iron and Steel Works Blast Furnaces", "Доменні печі заводу"),
    ("Donetsk Metallurgical Plant", "Металургійний завод"),
    ("Novorossia Coal, Iron", "Новоросійське товариство"),
    ("Rutchenkovskoe Mining", "Рутченківські копальні"),
    ("Yekaterinovskoye Mining", "Катеринівські копальні"),
    ("Rykovskie mines", "Риковські копальні"),
    ("Chulkovka mines", "Чулковські копальні"),
    ("coal mine", "Шахта"),
    ("Coal mining", "Вугільна справа"),
    ("Statues of miners", "Пам'ятник шахтарю"),
    # Храми: назва конкретного храму, а не «культова споруда».
    ("Transfiguration Cathedral", "Спасо-Преображенський собор"),
    ("Cathedral of Saint Nicholas", "Свято-Миколаївський собор"),
    ("Holy Trinity Cathedral", "Свято-Троїцький собор"),
    ("Iverskyi monastery", "Іверський монастир"),
    ("Church of the Intercession", "Свято-Покровський храм"),
    ("Saint Michael church", "Свято-Михайлівський храм"),
    ("Saint Vladimir church", "Свято-Володимирський храм"),
    ("Andrew Church", "Свято-Андріївський храм"),
    ("Andrew's Church", "Свято-Андріївський храм"),
    ("Alexander Nevsky church", "Храм Олександра Невського"),
    ("Ignatius Brianchaninov church", "Храм Ігнатія Брянчанінова"),
    ("Church of Saint John the Baptist", "Храм Іоанна Предтечі"),
    ("Church of the Pochayiv Icon", "Храм Почаївської ікони"),
    ("Peter and Fevronia church", "Храм Петра і Февронії"),
    ("Armenian Church", "Вірменська церква"),
    ("Catholic Church of Christ the King", "Костел Христа Царя"),
    ("Church of Seraphim of Sarov", "Храм Серафима Саровського"),
    ("Church of Saint Nina", "Храм святої Ніни"),
    ("Christmas Church", "Різдвяний храм"),
    ("Interiors of churches", "У храмі"),
    ("Ahat Jami Mosque", "Мечеть Ахать-Джамі"),
    ("Baptist Church Gospel House", "Баптистська церква"),
    ("Seventh-day Adventist Church", "Церква адвентистів"),
    ("Cathedral Transfiguration of Jesus in Hughesovka", "Преображенський собор"),
    ("Historical photos of churches", "Храми міста"),
    ("Synagogue of Yuzovka", "Синагога Юзівки"),
    ("School at the English colony", "Школа англійської колонії"),
    ("Historical photos of coal mines", "Шахти"),
    ("Historical photos of Artema Street", "Вулиця Артема"),
    ("Voznesensky mines", "Вознесенські копальні"),
    ("Compagnie des charbonnages", "Копальні Прохорова"),
    ("Tatra T3", "Трамвай Tatra T3"),
    ("Trams in Donetsk", "Донецький трамвай"),
    ("Tram transport", "Донецький трамвай"),
    ("Trolleybuses in Donetsk", "Донецький тролейбус"),
    ("KTG trolleybuses", "Тролейбус КТГ"),
    ("LAZ trolleybuses", "Тролейбус ЛАЗ"),
    ("CityLAZ", "Автобус CityLAZ"),
    ("Minibuses in Donetsk", "Маршрутка"),
    ("Buses in Donetsk", "Донецький автобус"),
    ("Donetsk Children's Railway", "Дитяча залізниця"),
    ("Rail transport in Donetsk", "Залізниця Донецька"),
    ("Donetsk Metro", "Донецький метробуд"),
    ("Pushkin Boulevard", "Бульвар Пушкіна"),
    ("Artema Street", "Вулиця Артема"),
    ("Universitetska", "Університетська вулиця"),
    # Історичні сюжети йдуть першими: вони найконкретніші.
    ("Ahat Jami Mosque", "Мечеть Ахать-Джамі"),
    ("Baptist Church Gospel House", "Баптистська церква"),
    ("Seventh-day Adventist Church", "Церква адвентистів"),
    ("Cathedral Transfiguration of Jesus in Hughesovka", "Преображенський собор"),
    ("Historical photos of churches", "Храми міста"),
    ("Synagogue of Yuzovka", "Синагога Юзівки"),
    ("School at the English colony", "Школа англійської колонії"),
    ("Historical photos of coal mines", "Шахти"),
    ("Historical photos of Artema Street", "Вулиця Артема"),
    ("Voznesensky mines", "Вознесенські копальні"),
    ("Compagnie des charbonnages", "Копальні Прохорова"),
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
    ("Views of Donetsk", "Панорама міста"),
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


# Категорії, які нічого не кажуть про сюжет: це службові теки завантажувача.
NOISE_CAT = re.compile(r"(photos,? created by|photographs of donetsk by|uncategoris|"
                       r"uncategoriz|taken with|flickr|panoramio|license|cc-by|pd-|"
                       r"self-published|files by|media (needing|requiring)|gfdl)", re.I)


def title_for(cats):
    """Назва тільки з предметної категорії.

    Раніше тут був загальний запасний варіант «Вулиці Донецька», і через нього
    в музей потрапляли вітрина холодильника й чужа Ferrari під виглядом вулиці.
    Немає категорії про сюжет — знімок не береться взагалі.
    """
    useful = [c for c in cats if not NOISE_CAT.search(c)]
    for needle, label in CATEGORY_TITLE:
        if any(needle.lower() in c.lower() for c in useful):
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
        # Сторінки архітектурних журналів це креслення й плани, а музей тут
        # фотографічний: план будинку не знімок міста.
        # Журнальні сторінки, архівні справи, креслення й бланки: усе це
        # папір, а музей фотографічний. Категорія тут надійніша за назву.
        if re.search(r"(architecture of the soviet ukraine|magazines of ukraine|"
                     r"extracted images|funds of archives|archival|manuscript|"
                     r"documents of|letters|plans of|drawings|blueprint)", cat_text, re.I):
            dropped.append((x["title"][:50], "папір, а не фотографія"))
            continue
        if re.search(r"(people of donetsk|portraits|men |women |journalists|"
                     r"computers|electronics|meetings|conferences|"
                     r"shops|shopping|supermarket|retail|food|drinks|"
                     r"cars in|automobiles|interiors of shops)", cat_text, re.I):
            dropped.append((x["title"][:50], "люди або предмети, не місто"))
            continue
        # По категориям ловим только советские монументы: категория надёжно
        # говорит, что на снимке, а вот повод загрузки — нет.
        if HARD_DROP.search(own_text) or re.search(r"(lenin|ленін|ленин)", cat_text, re.I):
            dropped.append((x["title"][:50], "заборонений сюжет"))
            continue
        label = title_for(cats.get(x["title"], []))
        # Для довоєнного кадру епоха сама по собі є сюжетом: аптека Лаче й
        # панорама Юзівки 1909 року лежать лише в «Historical photos of
        # Donetsk», і вимагати від них ще одної категорії означало б
        # викинути з музею саме те, заради чого зал і робився.
        hist_cat = re.search(r"(historical photos of donetsk|history of donetsk|"
                             r"\d{4} in donetsk|yuzovka|hughesovka|yuzivka)", cat_text, re.I)
        year_now = x.get("year", "")
        if not label and hist_cat and year_now.isdigit() and int(year_now) < 1961:
            label = "Юзівка" if int(year_now) < 1924 else "Сталіне"
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
        # Місто називалось по-різному, і підпис має це поважати: Юзівка до
        # 1924 року, Сталіне до 1961-го, далі Донецьк. Це не прикраса, це
        # єдиний спосіб не датувати кадр назвою, якої тоді не існувало.
        if year and year.isdigit():
            y = int(year)
            era = "Юзівка" if y < 1924 else ("Сталіне" if y < 1961 else "")
            if era:
                # Назва міста не має з'їдати сюжет: якщо категорія каже, що
                # на кадрі собор чи шахта, лишаємо це, а епоху ставимо поруч.
                # «Юзівка» й «Сталіне» тут теж загальні: їх міг поставити
                # запасний варіант вище, і тоді епоха приклеїлась би вдруге.
                generic = label in ("", "Донецьк на старих знімках", "Вулиці Донецька",
                                    "Панорама міста", "Види Донецька", "Юзівка", "Сталіне")
                # «Залізниця Донецька · Юзівка» — місто двічі й під різними
                # іменами. Прибираємо топонім із сюжету, епоха його замінює.
                subject = re.sub(r"\s+(Донецька|Донецьк|у Донецьку|міста)$", "", label).strip()
                label = era if generic else f"{subject} · {era}"
        # І навпаки: «старий знімок», датований 2010 роком, це помилка
        # каталогу, а не знахідка. Категорія «History of Donetsk» тут бреше.
        if label == "Донецьк на старих знімках" and year.isdigit() and int(year) > 1960:
            dropped.append((x["title"][:50], "стара категорія на новому кадрі"))
            continue
        stamp = month or year
        x["museum_title"] = f"{label} · {stamp}" if stamp else label
        x["_subject"] = label
        kept.append(x)

    # Один собор не має займати весь зал: «Спасо-Преображенський» сам
    # по собі найбільший об'єкт зйомки в місті, і без квоти він забивав
    # 15 місць із 21 у залі «Храми». Квота на сюжет, а не на файл —
    # найбільші кадри лишаються, решта йде в надлишок. Загальні кошики
    # («Вулиці Донецька», «Панорама міста» тощо) квота не чіпає: вони й
    # мають бути великими, бо це не один об'єкт, а ціла категорія міста.
    BUCKET_LABELS = {
        "", "Донецьк на старих знімках", "Вулиці Донецька", "Панорама міста",
        "Види Донецька", "Юзівка", "Сталіне", "Донецький трамвай",
        "Трамвай у Донецьку", "Тролейбус у Донецьку", "Донецький тролейбус",
        "Залізниця Донецька", "Площі Донецька", "Парки Донецька",
        "Фонтани Донецька", "Кальміус", "Храми міста", "Храми Донецька",
        "Пам'ятні знаки міста", "Міська скульптура", "Театри Донецька",
        "Музеї Донецька", "Університети Донецька", "Готелі Донецька",
        "Торгові будинки", "Інтер'єри Донецька", "Будівлі Донецька",
        "Архітектура Донецька", "Донецьк з висоти", "Нічний Донецьк",
    }
    SUBJECT_CAP = 6
    by_subject = {}
    for x in kept:
        by_subject.setdefault(x["_subject"], []).append(x)
    capped, overflow = [], 0
    for subj, xs in by_subject.items():
        if subj in BUCKET_LABELS:
            capped += xs
            continue
        xs.sort(key=lambda x: -(x["w"] * x["h"]))
        capped += xs[:SUBJECT_CAP]
        overflow += max(0, len(xs) - SUBJECT_CAP)
    kept = capped
    for x in kept:
        del x["_subject"]

    json.dump(kept, open(PICKED, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"лишилось: {len(kept)}, прибрано: {len(dropped)}, "
          f"зрізано квотою на сюжет: {overflow}")
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
