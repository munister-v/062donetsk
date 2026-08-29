# -*- coding: utf-8 -*-
"""Собирает статический музей фотографии Донецка в корне 062.dn.ua.

Разметка и классы повторяют museum.eprisjournal.com: тот же CSS, те же
сетки .row/.inA/.inB/.inC, те же плиты и подписи. Отличается содержимое:
залы хронологические, язык украинский, снимки свои, а не из Чикаго.

Портал остаётся на месте, он переезжает в /portal/ отдельным шагом сборки:
все его картинки лежат в корне, поэтому ему добавляется <base href="/">.
"""
import html as H
import json, os, re, shutil, unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CAT = json.load(open(os.path.join(ROOT, "data/museum-catalog.json"), encoding="utf-8"))
SITE = "https://062.dn.ua"
CSS_V = "20260829"

HALL_TEXT = {
 "misto-do-2014": ("Місто, яким його знали: вокзали, проспекти, мозаїки, вечірні вогні. "
                   "Знімки зроблені до 2014 року, коли ця зйомка не була документом втрати."),
 "euro-2012": ("Червень 2012 року, чемпіонат Європи. Донецьк приймає Європу, і це "
               "єдиний час, коли місто бачив увесь континент."),
 "panorama": ("Панорама з висоти, 2012–2014. Місто на піку: забудова, зелень, "
              "стадіон, терикони на горизонті."),
 "lito-2014": ("Літо 2014 року. Дим над кварталами, порожні вулиці, остання робота "
               "арт-групи «Мурзилка». Рік, який розділив архів надвоє."),
 "botanichnyi-sad": ("Донецький ботанічний сад: оаза посеред вугільного краю, "
                     "один з найбільших садів країни."),
 "kolory": ("Колір як окремий сюжет: вода, зелень, світло на бетоні. "
            "Знімки без точної дати, зроблені до повномасштабної війни."),
 "okupatsiia": ("2022–2026. Місто під окупацією: те, що з нього зробили, "
                "і те, що в ньому ще впізнається."),
}

LEGACY_ANCHORS = """<script>
/* Раніше корінь домену був порталом, і на нього лишились посилання з якорями
   на його розділи. Тепер у корені музей, і такий якір вів би в нікуди:
   переводимо його на /portal/ з тим самим якорем. */
(function(){var a=["home", "atlante-city", "okupatsia", "euro2012", "materialy", "rytm", "obrazy", "tznow", "pamyat", "izolyatsia", "murzilka", "heroes", "botsad", "kolory", "lyst", "voloshkove", "heritage-project", "friends"],h=location.hash.slice(1);
 if(h&&a.indexOf(h)>=0){location.replace("/portal/#"+h);}})();
</script>"""

EXHIBITIONS = [
 ("nich", "Ніч", "місто після заходу",
  r"ніч|нічн|вогн|ліхтар|вечір|захід сонця|підсвіт"),
 ("voda-i-sad", "Вода і сад", "ставки, фонтани, зелень",
  r"ставок|ставк|фонтан|вода|озер|сад|квіт|дерев|парк"),
 ("mozaiky", "Мозаїки і монументи", "радянський спадок у камені й смальті",
  r"мозаїк|монумент|пам.ятник|стела|скульптур|барельєф"),
 ("doroha", "Дорога", "вокзали, трамваї, тролейбуси",
  r"трамва|тролейбус|вокзал|потяг|перон|автобус|маршрут|аеропорт"),
]


def esc(s):
    return H.escape(s or "", quote=True)


def head(title, desc, path, og_id=None, extra_ld=""):
    url = SITE + path
    og = f"{SITE}/media/{og_id}-m.webp" if og_id else f"{SITE}/media/og-default.webp"
    return f"""<!doctype html>
<html lang="uk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)}</title>
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
<meta name="color-scheme" content="light">
<meta name="theme-color" content="#FFFFFF">
<meta name="description" content="{esc(desc)}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:type" content="website">
<meta property="og:image" content="{og}">
<meta property="og:site_name" content="Музей фотографії Донецька">
<meta property="og:locale" content="uk_UA">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="{url}">
{extra_ld}<link rel="stylesheet" href="/assets/museum.css?v={CSS_V}">
</head>
<body>
<a class="skip" href="#main">До знімків</a>"""


def header(home=False):
    mark = ('<span class="wordmark">МУЗЕЙ ФОТОГРАФІЇ ДОНЕЦЬКА</span>' if home
            else '<a href="/"><span class="wordmark">МУЗЕЙ ФОТОГРАФІЇ ДОНЕЦЬКА</span></a>')
    halls = "#halls" if home else "/#halls"
    return f"""
  <header class="row header">
    <div class="inA">{mark}</div>
    <div class="inB micro brandstack">
      <div class="est">засн. 2026 · 062.dn.ua</div>
    </div>
    <div class="inC micro topnav">
      <a href="/search/">пошук</a>
      <a href="/#exhibitions">виставки</a>
      <a href="{halls}">зали</a>
      <a href="/portal/">портал</a>
    </div>
  </header>"""


FOOT = """<footer class="site-foot">
  <div class="in">
    <div>
      <h2>МУЗЕЙ ФОТОГРАФІЇ ДОНЕЦЬКА</h2>
    </div>
    <div class="right">
      <p>© 2026 062.dn.ua</p>
      <p>Донецьк, 2006–2026</p>
    </div>
  </div>
</footer>
</body>
</html>"""

CREDIT = """<div class="credit">
<p>Знімки в цьому музеї зроблені автором порталу та його друзями в Донецьку
з 2006 по 2026 рік. Частина архіву підписана автором окремо, решта каталогізована
за розділом зйомки: там, де точної дати немає, вона не вигадана. Оригінали
доступні за посиланням «повний розмір» під кожним знімком.</p>
</div>"""


def works_by_hall(slug):
    return [w for w in CAT["works"] if w["hall"] == slug]


def exhibition_works(pattern):
    rx = re.compile(pattern, re.I)
    return [w for w in CAT["works"] if rx.search(w["title"])]


def plate_img(w, size="s", lazy=True, sizes='(max-width:900px) 92vw, 30vw'):
    load = 'loading="lazy" ' if lazy else 'fetchpriority="high" '
    hh = round(w["h"] * (500 if size == "s" else 1200) / w["w"])
    return (f'<img src="/media/{w["id"]}-{size}.webp" '
            f'srcset="/media/{w["id"]}-s.webp 500w, /media/{w["id"]}-m.webp 1200w" '
            f'sizes="{sizes}" {load}decoding="async" '
            f'width="{500 if size=="s" else 1200}" height="{hh}" alt="{esc(w["title"])}">')


def figure(w):
    year = f'{esc(w["year"])} · ' if w["year"] else ""
    return f"""  <figure class="work">
    <a class="plate" href="/works/{w['id']}/" data-i="{w['_i']}" aria-label="Відкрити знімок: {esc(w['title'])}">
      {plate_img(w)}</a>
    <figcaption>
      <span class="w-artist">Донецьк</span>
      <span class="w-title"><i>{esc(w['title'])}</i></span>
      <span class="w-meta">{year}фотографія<br>
        <a href="/works/{w['id']}/">картка знімка</a> · авторський архів</span>
    </figcaption>
  </figure>"""


def write(path, content):
    """Путь с расширением — это файл; путь без него — каталог с index.html."""
    rel = path.strip("/")
    has_ext = os.path.splitext(rel)[1] != ""
    full = os.path.join(ROOT, rel) if has_ext else os.path.join(ROOT, rel, "index.html")
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, "w", encoding="utf-8").write(content)
    return full


# ── главная ──────────────────────────────────────────────────────────
def build_home():
    total = len(CAT["works"])
    halls = CAT["halls"]
    ld = ('<script type="application/ld+json">' + json.dumps({
        "@context": "https://schema.org", "@type": "Museum",
        "name": "Музей фотографії Донецька", "url": SITE + "/",
        "description": f"Віртуальний музей: {total} фотографій Донецька у {len(halls)} залах.",
        "isAccessibleForFree": True, "inLanguage": "uk",
    }, ensure_ascii=False) + "</script>\n")
    key = works_by_hall("panorama")[0]

    rows = []
    for i, h in enumerate(halls, 1):
        n = len(works_by_hall(h["slug"]))
        rows.append(f"""<article class="hall">
  <a class="row hall-row" href="/halls/{h['slug']}/">
    <span class="inA n">{i:02d}</span>
    <span class="inB hall-name">{esc(h['title'])}</span>
    <span class="inC hall-meta"><span>{esc(h['pair'])}</span><span class="lock">{n} знімків</span></span>
  </a>
</article>""")

    ex = []
    for i, (slug, title, pair, pat) in enumerate(EXHIBITIONS, 1):
        n = len(exhibition_works(pat))
        ex.append(f"""<article class="ex-row">
  <a class="row" href="/exhibitions/{slug}/">
    <span class="inA n">{i:02d}</span>
    <span class="inB hall-name">{esc(title)}</span>
    <span class="inC hall-meta"><span>{esc(pair)}</span><span class="lock">{n} знімків</span></span>
  </a>
</article>""")

    named = sum(1 for w in CAT["works"] if w["titled_by_author"])
    body = f"""{head("Музей фотографії Донецька",
        f"Віртуальний музей: {total} фотографій Донецька у {len(halls)} залах, від міста до 2014 року до окупації.",
        "/", key["id"], ld)}
<div class="stage">
  <div class="lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>{header(home=True)}
  <section class="row fold">
    <div class="inA label">2026</div>
    <div class="inB"></div>
    <div class="inC">
      <h1 class="hero-title">Місто, яке<br>можна обійти<br>лише так</h1>
      <p class="blurb">{total} фотографій Донецька у {len(halls)} залах: від міста, яким його знали до 2014 року,
      до кадрів з окупації. Знімки авторські, вхід вільний, вигаданих дат тут немає.</p>
      <a class="backlink" href="#halls">увійти до залів ↓</a>
    </div>
  </section>
  <section class="row sec" id="halls">
    <div class="inA"><h2 class="sec-title">Зали</h2></div>
    <div class="inB sec-note">Кожен зал це окрема розвіска. Оберіть назву, щоб увійти.</div>
    <div class="inC sec-count">01 / 0{len(halls)}</div>
    <div class="sec-rule"></div>
  </section>
{chr(10).join(rows)}
  <section class="row sec" id="exhibitions">
    <div class="inA"><h2 class="sec-title">Виставки</h2></div>
    <div class="inB sec-note">Підбірки, що йдуть крізь зали: один сюжет, зібраний з різних років.</div>
    <div class="inC sec-count">0{len(EXHIBITIONS)}</div>
    <div class="sec-rule"></div>
  </section>
{chr(10).join(ex)}
  <section class="row visit">
    <div class="inA"><h2 class="sec-title">Про музей</h2></div>
    <div class="inB sec-note">
      <p>Це архів одного міста, зібраний людьми, які в ньому жили. {named} знімків
      підписані автором, решта каталогізована за розділом зйомки.</p>
      <p>Музей відкритий цілодобово, безкоштовно і без реєстрації.
      Оригінали доступні на сторінці кожного знімка.</p>
    </div>
    <div class="inC micro">
      <p>зали <b>{len(halls)}</b></p>
      <p>знімки <b>{total}</b></p>
      <p>роки <b>2006–2026</b></p>
    </div>
  </section>
</div>
{CREDIT}
{LEGACY_ANCHORS}
{FOOT}"""
    write("/index.html", body)
    return total


# ── зал ──────────────────────────────────────────────────────────────
def build_hall(i, h, halls):
    ws = works_by_hall(h["slug"])
    for k, w in enumerate(ws):
        w["_i"] = k
    key, rest = ws[0], ws[1:]
    years = sorted({w["year"] for w in ws if w["year"]})
    data = json.dumps([{"id": w["id"], "title": w["title"], "year": w["year"]} for w in ws],
                      ensure_ascii=False)
    body = f"""{head(f"{h['title']} · Музей фотографії Донецька", HALL_TEXT[h['slug']][:150],
        f"/halls/{h['slug']}/", key["id"])}
<div class="stage">
  <div class="lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>{header()}
  <section class="row hall-hero">
    <div class="inA num">{i:02d} / {len(halls):02d}</div>
    <div class="inB"></div>
    <div class="inC">
      <h1>{esc(h['title'])}</h1>
      <p class="pair">{esc(h['pair'])}</p>
      <p class="blurb">{esc(HALL_TEXT[h['slug']])}</p>
      <div class="hall-stats"><span>знімків <b>{len(ws)}</b></span><span>роки <b>{esc(', '.join(years) or 'без дати')}</b></span></div>
      <a class="backlink" href="/#halls">← усі зали</a>
    </div>
  </section>
</div>
<div class="keywork" id="main">
  <a class="plate" href="/works/{key['id']}/" data-i="0" aria-label="Відкрити знімок: {esc(key['title'])}">
    {plate_img(key, 'm', lazy=False, sizes='(max-width:900px) 100vw, 62vw')}
  </a>
  <div class="label">
    <span class="eyebrow">Ключовий знімок залу</span>
    <span class="w-artist">Донецьк</span>
    <span class="w-title"><i>{esc(key['title'])}</i></span>
    <span class="w-meta">{esc(key['year'] or 'без дати')} · фотографія<br>авторський архів 062.dn.ua</span>
  </div>
</div>
<div class="gallery">
{chr(10).join(figure(w) for w in rest)}
</div>
<nav class="row hall-nav">
  <div class="inA"></div><div class="inB"></div>
  <div class="inC micro">{
   ('<a href="/halls/%s/">← %s</a> ' % (halls[i-2]['slug'], esc(halls[i-2]['title']))) if i > 1 else ''
  }{
   ('<a href="/halls/%s/">%s →</a>' % (halls[i]['slug'], esc(halls[i]['title']))) if i < len(halls) else ''
  }</div>
</nav>
{CREDIT}
<script id="works-data" type="application/json">{data}</script>
<script src="/assets/museum.js?v={CSS_V}"></script>
{FOOT}"""
    write(f"/halls/{h['slug']}/", body)


# ── выставка ─────────────────────────────────────────────────────────
def build_exhibition(slug, title, pair, pattern):
    ws = exhibition_works(pattern)
    for k, w in enumerate(ws):
        w["_i"] = k
    if not ws:
        return 0
    body = f"""{head(f"{title} · Музей фотографії Донецька", pair, f"/exhibitions/{slug}/", ws[0]["id"])}
<div class="stage">
  <div class="lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>{header()}
  <section class="row hall-hero">
    <div class="inA num">виставка</div>
    <div class="inB"></div>
    <div class="inC">
      <h1>{esc(title)}</h1>
      <p class="pair">{esc(pair)}</p>
      <p class="blurb">Підбірка йде крізь усі зали: знімки зібрані за сюжетом, а не за роком.</p>
      <div class="hall-stats"><span>знімків <b>{len(ws)}</b></span></div>
      <a class="backlink" href="/#exhibitions">← усі виставки</a>
    </div>
  </section>
</div>
<div class="gallery" id="main">
{chr(10).join(figure(w) for w in ws)}
</div>
{CREDIT}
{FOOT}"""
    write(f"/exhibitions/{slug}/", body)
    return len(ws)


# ── карточка снимка ──────────────────────────────────────────────────
def build_work(w, hall, siblings):
    sibs = [s for s in siblings if s["id"] != w["id"]][:8]
    grid = "\n".join(f"""    <a class="sib" href="/works/{s['id']}/">
      <span class="p"><img src="/media/{s['id']}-s.webp" alt="{esc(s['title'])}"
        loading="lazy" decoding="async" width="500" height="{round(s['h']*500/s['w'])}"></span>
      <span class="c"><b>Донецьк</b>{esc(s['title'])}</span>
    </a>""" for s in sibs)
    facts = [("назва", w["title"]),
             ("датування", w["year"] or "без точної дати"),
             ("зал", f'<a href="/halls/{hall["slug"]}/">{esc(hall["title"])}</a>'),
             ("підпис", "авторський" if w["titled_by_author"] else "за розділом архіву"),
             ("розмір оригіналу", f'{w["w"]} × {w["h"]} px'),
             ("права", "авторський архів 062.dn.ua")]
    body = f"""{head(f"{w['title']} · Музей фотографії Донецька", w["title"], f"/works/{w['id']}/", w["id"])}
<div class="stage">
  <div class="lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>{header()}
  <nav class="row crumbs">
    <div class="inA num">знімок</div>
    <div class="inB"></div>
    <div class="inC"><a class="backlink" href="/halls/{hall['slug']}/">← {esc(hall['title'])}</a></div>
  </nav>
</div>
<div class="work-page" id="main">
  <div class="work-plate">
    {plate_img(w, 'm', lazy=False, sizes='(max-width:900px) 100vw, 62vw')}
  </div>
  <div class="work-label">
    <span class="eyebrow">{esc(hall['title'])}</span>
    <h1><i>{esc(w['title'])}</i></h1>
    <span class="by">Донецьк · {esc(w['year'] or '2006–2026')}</span>
    <div class="work-facts">
{chr(10).join(f'<div><span class="k">{k}</span> <b>{v}</b></div>' for k, v in facts)}
    </div>
    <div class="work-links">
      <a class="pill" href="/{w['file'].replace(' ', '%20')}" rel="noopener">Повний розмір</a>
      <a class="pill pill-ghost" href="/halls/{hall['slug']}/">До залу</a>
    </div>
  </div>
</div>
<div class="siblings">
  <h2>Ще в залі «{esc(hall['title'])}»</h2>
  <div class="sib-grid">
{grid}
  </div>
</div>
{CREDIT}
{FOOT}"""
    write(f"/works/{w['id']}/", body)


# ── поиск ────────────────────────────────────────────────────────────
def build_search():
    idx = json.dumps([{"i": w["id"], "t": w["title"], "h": w["hall"], "y": w["year"]}
                      for w in CAT["works"]], ensure_ascii=False)
    halls = json.dumps({h["slug"]: h["title"] for h in CAT["halls"]}, ensure_ascii=False)
    body = f"""{head("Пошук · Музей фотографії Донецька", "Пошук по всьому архіву музею.", "/search/")}
<div class="stage">
  <div class="lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>{header()}
  <section class="row hall-hero">
    <div class="inA num">пошук</div>
    <div class="inB"></div>
    <div class="inC">
      <h1>Пошук</h1>
      <p class="pair">по підписах усіх {len(CAT['works'])} знімків</p>
      <p class="blurb"><input id="q" type="search" placeholder="ботсад, трамвай, ніч, 2014…"
         autocomplete="off" style="width:100%;max-width:32rem;padding:.6rem .8rem;font:inherit;
         border:1px solid currentColor;background:transparent"></p>
      <div class="hall-stats"><span id="count">введіть слово</span></div>
      <a class="backlink" href="/#halls">← усі зали</a>
    </div>
  </section>
</div>
<div class="sib-grid" id="results" style="padding:0 var(--pad,4vw) 6rem"></div>
<script id="search-index" type="application/json">{idx}</script>
<script id="halls-map" type="application/json">{halls}</script>
<script src="/assets/search.js?v={CSS_V}"></script>
{CREDIT}
{FOOT}"""
    write("/search/", body)


def clean_orphans():
    """Удаляет сгенерированное, чего больше нет в каталоге.

    После дедупликации снимков стало меньше, а страницы и нарезки от прошлой
    сборки остались бы лежать и открываться по старым адресам. Трогаем только
    /works и /media: это целиком наш вывод, оригиналы фотографий не при чём.
    """
    ids = {w["id"] for w in CAT["works"]}
    gone_pages = gone_media = 0
    works_dir = os.path.join(ROOT, "works")
    for name in os.listdir(works_dir) if os.path.isdir(works_dir) else []:
        if name not in ids:
            shutil.rmtree(os.path.join(works_dir, name)); gone_pages += 1
    media_dir = os.path.join(ROOT, "media")
    for name in os.listdir(media_dir) if os.path.isdir(media_dir) else []:
        stem = re.sub(r"-(s|m)\.webp$", "", name)
        if stem == name or stem not in ids:
            os.remove(os.path.join(media_dir, name)); gone_media += 1
    if gone_pages or gone_media:
        print(f"прибрано сиріт: сторінок {gone_pages}, нарізок {gone_media}")


def main():
    total = build_home()
    halls = CAT["halls"]
    for i, h in enumerate(halls, 1):
        build_hall(i, h, halls)
    ex_total = sum(build_exhibition(*e) for e in EXHIBITIONS)
    by_slug = {h["slug"]: h for h in halls}
    for w in CAT["works"]:
        build_work(w, by_slug[w["hall"]], works_by_hall(w["hall"]))
    build_search()
    build_meta()
    clean_orphans()
    print(f"зібрано: головна, {len(halls)} залів, {len(EXHIBITIONS)} виставок "
          f"({ex_total} входжень), {total} карток знімків, пошук")




def build_meta():
    """Карта сайта, robots и страница 404 в той же вёрстке."""
    urls = ["/", "/search/", "/portal/"]
    urls += [f"/halls/{h['slug']}/" for h in CAT["halls"]]
    urls += [f"/exhibitions/{s}/" for s, *_ in EXHIBITIONS]
    urls += [f"/works/{w['id']}/" for w in CAT["works"]]
    body = "\n".join(f"  <url><loc>{SITE}{u}</loc></url>" for u in urls)
    write("/sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n'
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
          f"{body}\n</urlset>\n")
    write("/robots.txt", f"User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n")
    write("/404.html", f"""{head("Сторінки немає · Музей фотографії Донецька",
        "Такої сторінки в музеї немає.", "/404.html")}
<div class="stage">
  <div class="lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>{header()}
  <section class="row hall-hero">
    <div class="inA num">404</div>
    <div class="inB"></div>
    <div class="inC">
      <h1>Такого залу немає</h1>
      <p class="blurb">Сторінку не знайдено. Поверніться до залів або скористайтеся пошуком.</p>
      <a class="backlink" href="/#halls">← усі зали</a>
    </div>
  </section>
</div>
{FOOT}""")
    print(f"карта сайту: {len(urls)} адрес")


if __name__ == "__main__":
    main()
