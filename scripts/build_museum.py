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
# Версія стилів рахується від часу правки файлу: інакше після зміни CSS
# сторінка тягне стару копію з кешу, і правки «не працюють».
CSS_V = str(int(os.path.getmtime(os.path.join(ROOT, "assets/museum.css"))))

HALL_TEXT = {
 "stare-misto": ("Юзівка, англійська колонія навколо заводу Джона Юза, потім Сталіне. "
                 "Місто в підписах назване так, як воно називалось на момент зйомки: "
                 "Юзівка до 1924 року, Сталіне до 1961-го. Заводські краєвиди, які "
                 "возили на Всесвітню виставку в Париж, собор, синагоги, школа "
                 "англійської колонії, вулиці перших десятиліть."),
 "vulytsi": ("Місто щодня: проспекти й площі, бульвар Пушкіна і вулиця Артема, "
             "трамваї й тролейбуси, вечірні вогні. Найбільший зал музею, бо саме "
             "таким місто бачили ті, хто в ньому жив."),
 "vuhillia": ("Шахта в Донецьку завжди стояла в місті, а не за ним: копри, терикони "
              "посеред кварталів, стадіон під відвалом, димарі заводу над дахами. "
              "Тут зібране те, що знято за життя нинішнього міста; копальні Юза "
              "й домни початку століття висять у залі «Старе місто», бо вони "
              "старші за саме місто."),
 "yevromaidan": ("Донецьк теж виходив на майдан: мітинг 24 листопада 2013-го "
                 "і акція за єдність України 17 квітня 2014-го, за кілька тижнів "
                 "до того, як місто стало окупованим. Більшість цих кадрів зняв "
                 "один фотограф, бо іншого джерела просто немає."),
 "khramy": ("Собори, церкви, костел, вірменська церква й Іверський монастир, "
            "знятий уже після обстрілу. Кадри Преображенського собору Юзівки, "
            "зруйнованого в 1930-ті, лишились у залі «Старе місто»."),
 "panoramy": ("Донецьк з висоти, здебільшого 2012–2014 років: забудова, зелень, "
              "стадіон і терикони на горизонті. Місто на піку."),
 "sad-i-voda": ("Ботанічний сад, ставки, фонтани, зелень: оаза посеред вугільного "
                "краю. Більшість цих кадрів без точної дати, і вона не вигадана."),
 "arena": ("Стадіон і чемпіонат Європи 2012 року: будівництво й відкриття арени, "
           "місто в дні матчів, уболівальники на вулицях."),
 "viina": ("2014–2015 і 2022–2026. Дим над кварталами, спалений тролейбус біля "
           "вокзалу, обстріляна зупинка на Купріна 22 січня 2015 року, остання "
           "робота арт-групи «Мурзилка», і місто під окупацією."),
}

# ── Пустеля реального ────────────────────────────────────────────────
# Один тихий блок-цитата перед «Про музей»: без коду, без пігулок.
# Привід — Бодріяр про симулякр, доречний тут тому, що містом сьогодні
# для більшості лишається саме зображення; сам вислів наведений без ефектів.
VEIL = """
<section class="row veil" id="veil">
  <div class="inA"></div>
  <div class="inB veil-quote">
    <p>«Симулякр не те, що приховує істину»</p>
    <cite>Жан Бодріяр, «Симулякри і симуляція», 1981</cite>
  </div>
  <div class="inC"></div>
</section>"""

LEGACY_ANCHORS = """<script>
/* Раніше корінь домену був порталом, і на нього лишились посилання з якорями
   на його розділи. Тепер у корені музей, і такий якір вів би в нікуди:
   переводимо його на /portal/ з тим самим якорем. */
(function(){var a=["home", "atlante-city", "okupatsia", "euro2012", "materialy", "rytm", "obrazy", "tznow", "pamyat", "izolyatsia", "murzilka", "heroes", "botsad", "kolory", "lyst", "voloshkove", "heritage-project", "friends"],h=location.hash.slice(1);
 if(h&&a.indexOf(h)>=0){location.replace("/portal/#"+h);}})();
</script>"""

EXHIBITIONS = [
 # \b обов'язковий: без нього «ботанічний сад» потрапляв у виставку «Ніч»,
 # бо всередині слова сидить «нічн».
 ("nich", "Ніч", "місто після заходу",
  r"\b(ніч|нічн|нічний|нічна|вогні|ліхтар|вечір|вечірн|підсвіт)"),
 ("voda-i-sad", "Вода і сад", "ставки, фонтани, зелень",
  # «квіт» без застереження ловить «квітень»: три кадри вулиць у квітні
  # 2014-го висіли у виставці про сад.
  r"\b(ставок|ставк|фонтан|вода|озер|сад|квітк|квіти|квітів|квітуч|дерев|парк|ботан)"),
 ("mozaiky", "Мозаїки і монументи", "радянський спадок у камені й смальті",
  r"\b(мозаїк|монумент|пам.ятник|стела|скульптур|барельєф)"),
 ("doroha", "Дорога", "трамваї, тролейбуси, автобуси, залізниця",
  r"\b(трамва|тролейбус|вокзал|потяг|перон|автобус|маршрут|аеропорт|"
  r"залізниц|метробуд|маршрутк|tatra|citylaz|транспорт)"),
]


def photos_word(n):
    """«21 знімок», «42 знімки», «171 знімок»: українське відмінювання
    залежить від останніх двох цифр, а не від самого числа."""
    tail, last = n % 100, n % 10
    if 11 <= tail <= 14:
        return f"{n} знімків"
    if last == 1:
        return f"{n} знімок"
    if 2 <= last <= 4:
        return f"{n} знімки"
    return f"{n} знімків"


def hall_text(h):
    """Описание зала. Новый зал без текста не должен ронять сборку:
    подставляем его же подзаголовок."""
    return HALL_TEXT.get(h["slug"]) or h["pair"]


# Герб Донецька: він стояв у фавіконі порталу, і музей носить той самий знак.
MARK = '<img class="mark" src="/assets/gerb.png" alt="" width="192" height="192" decoding="async">'


def esc(s):
    return H.escape(s or "", quote=True)


def head(title, desc, path, og_id=None, extra_ld="", og_card=None):
    url = SITE + path
    # Готова картка 1200×630 у JPEG (scripts/make_og.py) там, де вона є:
    # месенджер малює її як прев'ю з назвою, а не голий кадр у webp.
    og = (f"{SITE}{og_card}" if og_card
          else (f"{SITE}/media/{og_id}-m.webp" if og_id
                else f"{SITE}/media/og-default.webp"))
    og_size = ('\n<meta property="og:image:width" content="1200">'
               '\n<meta property="og:image:height" content="630">') if og_card else ""
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
<meta property="og:image" content="{og}">{og_size}
<meta property="og:image:alt" content="{esc(title)}">
<meta property="og:site_name" content="062.dn.ua">
<meta property="og:locale" content="uk_UA">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="{url}">
{extra_ld}<link rel="stylesheet" href="/assets/museum.css?v={CSS_V}">
</head>
<body>
<a class="skip" href="#main">До знімків</a>
<script>
/* Гасимо контекстне меню й перетягування саме на знімках: «зберегти
   картинку як» і drag-to-desktop — найпоширеніші побутові способи взяти
   фото з сайту. Це не захист від когось, хто відкриє вкладку «Мережа»
   чи вихідний код, лише від випадкового кліку правою кнопкою. */
(function(){{
  document.addEventListener('contextmenu', function(e){{
    if (e.target.tagName === 'IMG') e.preventDefault();
  }});
  document.addEventListener('dragstart', function(e){{
    if (e.target.tagName === 'IMG') e.preventDefault();
  }});
}})();
</script>"""


def header(home=False):
    inner = f'{MARK}<span class="wordmark">Музей фотографії Донецька</span>'
    mark = inner if home else f'<a class="brand" href="/">{inner}</a>'

    halls = "#halls" if home else "/#halls"
    return f"""
  <header class="row header">
    <div class="inA">
      <div class="brandbox">{mark}</div>
      <div class="micro brandstack"><div class="est">062.dn.ua</div></div>
    </div>
    <div class="inC micro topnav">
      <a href="/search/">пошук</a>
      <a href="/#exhibitions">виставки</a>
      <a href="{halls}">зали</a>
      <a href="/submit/">надіслати фото</a>
    </div>
  </header>"""



SUPPORT = """<section class="support" id="support">
  <div class="in">
    <div class="sup-left">
      <h2 class="sec-title">Підтримати автора сайту</h2>
    </div>
    <div class="sup-right">
      <a class="pill" href="https://send.monobank.ua/jar/5w5VyzR26W" rel="noopener" target="_blank">
        Банка на monobank
      </a>
      <div class="sup-card">
        <span class="sup-eyebrow">Номер картки банки</span>
        <b>4874 1000 3947 0946</b>
        <button type="button" class="pill pill-ghost sup-copy" data-copy="4874100039470946">скопіювати</button>
      </div>
    </div>
  </div>
</section>
<script>
/* Копіювання номера: якщо буфер недоступний (старий браузер, http),
   номер лишається на екрані й виділяється руками. */
(function(){
  var b=document.querySelector('.sup-copy'); if(!b) return;
  b.addEventListener('click',function(){
    var t=b.dataset.copy;
    var done=function(){ b.textContent='скопійовано'; setTimeout(function(){b.textContent='скопіювати';},2000); };
    if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(t).then(done,function(){}); }
    else { var el=document.createElement('textarea'); el.value=t; document.body.appendChild(el);
           el.select(); try{document.execCommand('copy'); done();}catch(e){} el.remove(); }
  });
})();
</script>"""

# ── Запрошення поповнити архів ───────────────────────────────────────
# Сама форма живе окремою сторінкою /submit/: на головній вона забирала
# екран і змагалася увагою із залами, заради яких сюди й приходять.
SUBMIT_CTA = """<section class="support" id="submit">
  <div class="in">
    <div class="sup-left">
      <span class="sup-eyebrow">Поповнити архів</span>
      <h2 class="sec-title">У вас є фотографії Донецька?</h2>
      <p>Свої, батьківські, скановані з альбому — надішліть їх музею.
      Кожен кадр переглядається руками; те, що підійде, стане на стіну
      з вашим ім'ям у підписі.</p>
    </div>
    <div class="sup-right">
      <a class="pill" href="/submit/">Надіслати знімки →</a>
    </div>
  </div>
</section>"""


# Той самий автор написав роман-репортаж про літо 2014-го: логічне продовження
# музею в іншому форматі. Блок побудований так само, як «Підтримати автора»,
# і лишень на головній — це не те, що має повторюватись на кожній сторінці залу.
BOOK = """<section class="support" id="book">
  <div class="in">
    <div class="sup-left">
      <span class="sup-eyebrow">Роман-репортаж</span>
      <h2 class="sec-title">«Я знаю, що ви робили влітку чотирнадцятого»</h2>
      <p>Хроніка літа 2014 року: місто, яке втратило приватне життя. Друга книга
      В'ячеслава Муністера, продовження «Волошкового поля».</p>
    </div>
    <div class="sup-right">
      <a class="pill" href="https://donetsk2014.github.io/" rel="noopener" target="_blank">
        Замовити книгу →
      </a>
    </div>
  </div>
</section>"""

FOOT = """<footer class="site-foot">
  <div class="in">
    <div>
      <span class="foot-mark">062.DN.UA</span>
      <h2>Музей<br>фотографії<br>Донецька</h2>
    </div>
    <div class="right">
      <p>© 2026 062.dn.ua</p>
      <p>Донецьк, 2006–2026</p>
    </div>
  </div>
</footer>
</body>
</html>"""

CREDIT = ""   # пояснення про архів прибрано на прохання автора


def works_by_hall(slug):
    return [w for w in CAT["works"] if w["hall"] == slug]


# Похмурий кадр з-під землі чи будівельного майданчика, і нічний кадр:
# обидва можуть бути великими й барвистими (неонове підсвічення собору
# вночі дає високу насиченість), але на обкладинку залу не годяться.
UGLY_KEY = re.compile(r"(метробуд|будівництв|реконструкц|демонтаж|знесен|"
                      r"руїн|підземн|стовбур шахти|котлован|звалищ)", re.I)
NIGHT_KEY = re.compile(r"(ніч|нічн|вечір|вечірн|підсвіт|вогні|захід сонця|"
                       r"світанк)", re.I)
_HSV_CACHE = {}


def photo_hsv(w):
    """Насиченість, яскравість і яскравість неба (верхні 25% кадру).

    Довга витримка вночі дає теплу підсвітку з високою насиченістю й
    непоганою середньою яскравістю — за самими лише sat/val нічний Донецьк
    вигравав у денного. Небо їх виказує: вдень воно світле, вночі темне,
    навіть коли вулиці внизу залиті ліхтарями. Рахується по мініатюрі
    -s.webp (32×32), а не по оригіналу: для залу з полусотнею кадрів
    це миттєво.
    """
    if w["id"] in _HSV_CACHE:
        return _HSV_CACHE[w["id"]]
    path = os.path.join(ROOT, "media", f"{w['id']}-s.webp")
    try:
        from PIL import Image
        im = Image.open(path).convert("HSV").resize((32, 32))
        px = list(im.getdata())
        sat = sum(p[1] for p in px) / len(px)
        val = sum(p[2] for p in px) / len(px)
        sky_px = list(im.crop((0, 0, 32, 8)).getdata())
        sky = sum(p[2] for p in sky_px) / len(sky_px)
    except Exception:
        sat = val = sky = 0
    _HSV_CACHE[w["id"]] = (sat, val, sky)
    return sat, val, sky


def key_work(ws):
    """Ключовий кадр залу: великий, горизонтальний, денний, не з будмайданчика.

    Спершу відсіюються підземні/будівельні й підписані як нічні кадри,
    потім серед великих горизонтальних лишається пул зі світлим небом
    (орієнтир дня, а не сутінків чи довгої витримки), і з нього береться
    найнасиченіший: зазвичай це і є ясний літній день, а не туман чи імла.
    """
    wide = [w for w in ws if w["w"] >= w["h"]]
    pool = wide or ws
    good = [w for w in pool if not UGLY_KEY.search(w["title"])]
    day = [w for w in good if not NIGHT_KEY.search(w["title"])]
    cand = day or good or pool
    top = sorted(cand, key=lambda w: -(w["w"] * w["h"]))[:16]
    bright = [w for w in top if photo_hsv(w)[2] >= 191]
    pick_from = bright or top
    return max(pick_from, key=lambda w: photo_hsv(w)[0])


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


def byline(w):
    """Кто снял. У своих кадров это архив портала, у чужих — имя автора,
    и оно должно стоять на самом видном месте подписи, а не в мелком тексте."""
    return w.get("author") or "архів 062.dn.ua"


def provenance(w):
    """Строка прав под снимком: лицензия и ссылка на файл-источник."""
    if w.get("source") == "commons":
        lic = esc(w.get("license") or "вільна ліцензія")
        return f'{lic} · <a href="{esc(w.get("page"))}" rel="noopener">Wikimedia Commons</a>'
    return "авторський архів"


def figure(w):
    year = f'{esc(w["year"])} · ' if w["year"] else ""
    return f"""  <figure class="work">
    <a class="plate" href="/works/{w['id']}/" data-i="{w['_i']}" aria-label="Відкрити знімок: {esc(w['title'])}">
      {plate_img(w)}</a>
    <figcaption>
      <span class="w-artist">{esc(w['title'])}</span>
      <span class="w-title"><i>{esc(byline(w))}</i></span>
      <span class="w-meta">{year}фотографія<br>
        <a href="/works/{w['id']}/">картка знімка</a> · {provenance(w)}</span>
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
        "name": "062.dn.ua", "url": SITE + "/",
        "description": f"Віртуальний музей: {total} фотографій Донецька у {len(halls)} залах.",
        "isAccessibleForFree": True, "inLanguage": "uk",
    }, ensure_ascii=False) + "</script>\n")
    key = key_work(works_by_hall("panoramy"))   # обкладинка музею: місто з висоти
    cover = key

    rows = []
    for i, h in enumerate(halls, 1):
        n = len(works_by_hall(h["slug"]))
        if not n:
            continue
        key = key_work(works_by_hall(h["slug"]))
        rows.append(f"""<article class="hall">
  <a class="row hall-row" href="/halls/{h['slug']}/">
    <span class="inA n">{i:02d}</span>
    <span class="inB hall-name">
      <span class="hall-thumb"><img src="/media/{key['id']}-s.webp" alt=""
        loading="lazy" decoding="async" width="500"
        height="{round(key['h'] * 500 / key['w'])}"></span>
      <span class="hall-title">{esc(h['title'])}</span>
    </span>
    <span class="inC hall-meta"><span>{esc(h['pair'])}</span><span class="lock">{photos_word(n)}</span></span>
  </a>
</article>""")

    ex = []
    for i, (slug, title, pair, pat) in enumerate(EXHIBITIONS, 1):
        ws = exhibition_works(pat)
        if len(ws) < 8:          # менше восьми кадрів це не виставка, а випадковість
            continue
        k = key_work(ws)
        ex.append(f"""<article class="hall">
  <a class="row hall-row" href="/exhibitions/{slug}/">
    <span class="inA n">{i:02d}</span>
    <span class="inB hall-name">
      <span class="hall-thumb"><img src="/media/{k['id']}-s.webp" alt=""
        loading="lazy" decoding="async" width="500"
        height="{round(k['h'] * 500 / k['w'])}"></span>
      <span class="hall-title">{esc(title)}</span>
    </span>
    <span class="inC hall-meta"><span>{esc(pair)}</span><span class="lock">{photos_word(len(ws))}</span></span>
  </a>
</article>""")

    body = f"""{head("Музей фотографії Донецька",
        f"Віртуальний музей: {total} фотографій Донецька у {len(halls)} залах, від міста до 2014 року до окупації.",
        "/", cover["id"], ld, og_card="/og/home.jpg")}
<div class="stage">
  <div class="lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>{header(home=True)}
  <section class="row fold">
    <div class="inA label">2026</div>
    <div class="inB"></div>
    <div class="inC">
      <h1 class="hero-title">Місто, яке<br>можна обійти<br>лише так</h1>
      <p class="hero-count">{total} фото нашого міста</p>
      <a class="backlink" href="#halls">увійти до залів ↓</a>
    </div>
  </section>
  <figure class="fold-shot">
    <img src="/media/{cover['id']}-m.webp" alt="{esc(cover['title'])}"
      width="1200" height="{round(cover['h'] * 1200 / cover['w'])}" decoding="async">
    <figcaption>{esc(cover['title'])}</figcaption>
  </figure>
  <section class="row sec" id="halls">
    <div class="inA"><h2 class="sec-title">Зали</h2></div>
    <div class="inB sec-note">Кожен зал це окрема розвіска. Оберіть назву, щоб увійти.</div>
    <div class="inC sec-count">01 / 03</div>
    <div class="sec-rule"></div>
  </section>
{chr(10).join(rows)}
  <section class="row sec" id="exhibitions">
    <div class="inA"><h2 class="sec-title">Виставки</h2></div>
    <div class="inB sec-note">Підбірки, що йдуть крізь зали: один сюжет, зібраний з різних років.</div>
    <div class="inC sec-count">02 / 03</div>
    <div class="sec-rule"></div>
  </section>
{chr(10).join(ex)}
{VEIL}
  <section class="row sec">
    <div class="inA"><h2 class="sec-title">Про музей</h2></div>
    <div class="inB sec-note">Хто це зібрав і за яким правилом.</div>
    <div class="inC sec-count">03 / 03</div>
    <div class="sec-rule"></div>
  </section>
  <section class="row visit">
    <div class="inA"></div>
    <div class="inB sec-note">
      <p>This is an archive of one city, put together by people who lived in it.
      Some photos come from the site's own collection; others are used under free
      Wikimedia Commons licenses (Public Domain, CC BY, CC BY-SA), credited with
      author, license and source link. Photos without a specific caption are
      simply catalogued by section and year.</p>
      <p>Музей відкритий цілодобово, безкоштовно і без реєстрації.
      Оригінали доступні на сторінці кожного знімка.</p>
    </div>
    <div class="inC">

    </div>
  </section>
</div>
{CREDIT}
{LEGACY_ANCHORS}
{SUBMIT_CTA}
{SUPPORT}
{BOOK}
{FOOT}"""
    write("/index.html", body)
    return total


# ── зал ──────────────────────────────────────────────────────────────
def build_hall(i, h, halls):
    ws = works_by_hall(h["slug"])
    if not ws:                       # зал без знімків не будуємо і в список не ставимо
        return False
    for k, w in enumerate(ws):
        w["_i"] = k
    key = key_work(ws)
    rest = [w for w in ws if w is not key]
    years = sorted({w["year"] for w in ws if w["year"]})
    data = json.dumps([{"id": w["id"], "title": w["title"], "year": w["year"]} for w in ws],
                      ensure_ascii=False)
    body = f"""{head(f"{h['title']} · Музей фотографії Донецька", hall_text(h)[:150],
        f"/halls/{h['slug']}/", key["id"], og_card=f"/og/hall-{h['slug']}.jpg")}
<div class="stage">
  <div class="lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>{header()}
  <section class="row hall-hero">
    <div class="inA num">{i:02d} / {len(halls):02d}</div>
    <div class="inB"></div>
    <div class="inC">
      <h1>{esc(h['title'])}</h1>
      <p class="pair">{esc(h['pair'])}</p>
      <p class="blurb">{esc(hall_text(h))}</p>
      <div class="hall-stats"><span>{photos_word(len(ws))}</span><span>роки <b>{esc(', '.join(years) or 'без дати')}</b></span></div>
      <a class="backlink" href="/#halls">← усі зали</a>
    </div>
  </section>
</div>
<div class="keywork" id="main">
  <a class="plate" href="/works/{key['id']}/" data-i="0" aria-label="Відкрити знімок: {esc(key['title'])}">
    {plate_img(key, 'm', lazy=False, sizes='(max-width:900px) 100vw, 62vw')}
  </a>
  <div class="label">
    <span class="w-artist">{esc(key['title'])}</span>
    <span class="w-title"><i>{esc(byline(key))}</i></span>
    <span class="w-meta">{esc(key['year'] or 'без дати')} · фотографія<br>{provenance(key)}</span>
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
{SUPPORT}
{FOOT}"""
    write(f"/halls/{h['slug']}/", body)
    return True


# ── выставка ─────────────────────────────────────────────────────────
def build_exhibition(slug, title, pair, pattern):
    ws = exhibition_works(pattern)
    for k, w in enumerate(ws):
        w["_i"] = k
    if len(ws) < 8:
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
      <div class="hall-stats"><span>{photos_word(len(ws))}</span></div>
      <a class="backlink" href="/#exhibitions">← усі виставки</a>
    </div>
  </section>
</div>
<div class="gallery" id="main">
{chr(10).join(figure(w) for w in ws)}
</div>
{CREDIT}
{SUPPORT}
{FOOT}"""
    write(f"/exhibitions/{slug}/", body)
    return len(ws)


# ── карточка снимка ──────────────────────────────────────────────────
def build_work(w, hall, siblings):
    sibs = [s for s in siblings if s["id"] != w["id"]][:8]
    grid = "\n".join(f"""    <a class="sib" href="/works/{s['id']}/">
      <span class="p"><img src="/media/{s['id']}-s.webp" alt="{esc(s['title'])}"
        loading="lazy" decoding="async" width="500" height="{round(s['h']*500/s['w'])}"></span>
      <span class="c"><b>{esc(s['title'])}</b>{esc(byline(s))}</span>
    </a>""" for s in sibs)
    facts = [("назва", esc(w["title"])),
             ("автор", esc(w["author"]) if w.get("author") else "архів 062.dn.ua"),
             ("датування", esc(w["year"]) or "без точної дати"),
             ("зал", f'<a href="/halls/{hall["slug"]}/">{esc(hall["title"])}</a>'),
             ("розмір", f'{w["w"]} × {w["h"]} px')]
    if w.get("source") == "commons":
        facts += [("ліцензія", esc(w["license"])),
                  ("джерело", f'<a href="{esc(w["page"])}" rel="noopener">файл на Wikimedia Commons</a>')]
    else:
        facts += [("підпис", "авторський" if w["titled_by_author"] else "за розділом архіву"),
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
    <span class="by">{esc(byline(w))} · {esc(w['year'] or '2006–2026')}</span>
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
{SUPPORT}
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
{SUPPORT}
{FOOT}"""
    write("/search/", body)


def build_submit():
    """Окрема сторінка приймальні.

    Форма б'є в службу photoform на VPS (api.eprisjournal.com), бо сам сайт
    статичний. Межі продубльовані в браузері й на сервері: дізнатися про
    завеликий файл після п'яти хвилин мобільного вивантаження — найгірший
    зі способів це дізнатися.
    """
    body = f"""{head("Надіслати знімки · Музей фотографії Донецька",
        "Надішліть свої фотографії Донецька до музею: до 10 знімків за раз.",
        "/submit/")}
<div class="stage">
  <div class="lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>{header()}
  <section class="row hall-hero">
    <div class="inA num">поповнити архів</div>
    <div class="inB"></div>
    <div class="inC">
      <h1>Надіслати знімки</h1>
      <p class="pair">архів росте з чужих альбомів</p>
      <p class="blurb">Музей майже цілком зібраний із приватних архівів — те, що
      висить у залах, колись лежало в чиїхось коробках і на чиїхось дисках.
      Якщо у вас є фотографії Донецька, надішліть їх сюди.</p>
      <a class="backlink" href="/#halls">← усі зали</a>
    </div>
  </section>
</div>

<div class="submit-page" id="main">
  <div class="sp-in">
    <form class="submit-form" id="submit-form" novalidate>

      <div class="sf-drop" id="sf-drop">
        <input type="file" name="photos" id="sf-photos" multiple
               accept="image/jpeg,image/png,image/heic,image/heif,image/tiff,image/webp">
        <p class="sf-drop-main">Перетягніть знімки сюди<br>або <b>оберіть на пристрої</b></p>
        <p class="sf-drop-sub">до 10 знімків за раз · кожен до 12 МБ · JPEG, PNG, HEIC, TIFF</p>
      </div>

      <ul class="sf-list" id="sf-list"></ul>

      <div class="sf-fields">
        <label class="sf-field">
          <span>Ваше ім'я</span>
          <input type="text" name="name" maxlength="120" autocomplete="name"
                 placeholder="як підписати знімок у музеї">
        </label>
        <label class="sf-field">
          <span>Пошта або телефон <b>*</b></span>
          <input type="text" name="contact" maxlength="200" required
                 autocomplete="email" placeholder="щоб було як відповісти">
        </label>
      </div>

      <label class="sf-field">
        <span>Що на знімках і коли знято</span>
        <textarea name="note" rows="4" maxlength="2000"
                  placeholder="напр.: бульвар Пушкіна, літо 2011, знімав батько на плівку"></textarea>
      </label>

      <!-- Пастка для ботів: людина цього поля не бачить і не заповнює. -->
      <div class="sf-trap" aria-hidden="true">
        <label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label>
      </div>

      <div class="sf-send">
        <button type="submit" class="pill" id="sf-go">Надіслати знімки</button>
        <div class="sf-bar" id="sf-bar" hidden><i></i></div>
        <p class="sf-status" id="sf-status" role="status" aria-live="polite"></p>
      </div>

      <p class="sf-fine">Надсилаючи знімки, ви дозволяєте музею їх показати
      з вашим підписом. Права лишаються вашими; попросите зняти — знімемо.
      Контакт потрібен лише для відповіді й нікуди не передається.</p>
    </form>
  </div>
</div>

<script>
(function(){{
  var form = document.getElementById('submit-form');
  if (!form) return;
  var API = 'https://api.eprisjournal.com/museum-upload/submit';
  var MAX_FILES = 10, MAX_BYTES = 12 * 1024 * 1024;
  var input = document.getElementById('sf-photos');
  var drop  = document.getElementById('sf-drop');
  var list  = document.getElementById('sf-list');
  var status= document.getElementById('sf-status');
  var bar   = document.getElementById('sf-bar');
  var go    = document.getElementById('sf-go');

  /* Власний список замість штатного input.files: із нього можна прибрати
     окремий кадр, а FileList доступний лише для читання. */
  var chosen = [];

  function mb(n){{ return (n / 1048576).toFixed(1) + ' МБ'; }}
  function say(text, kind){{
    status.textContent = text || '';
    status.className = 'sf-status' + (kind ? ' is-' + kind : '');
  }}

  function render(){{
    list.innerHTML = '';
    chosen.forEach(function(f, i){{
      var li = document.createElement('li');
      li.className = 'sf-item' + (f.size > MAX_BYTES ? ' is-bad' : '');
      var img = document.createElement('img');
      img.alt = '';
      /* Прев'ю робить сам браузер із локального файлу: нічого нікуди
         не йде, поки людина не натисне «надіслати». */
      var url = URL.createObjectURL(f);
      img.src = url;
      img.onload = function(){{ URL.revokeObjectURL(url); }};
      img.onerror = function(){{ img.remove(); }};
      var cap = document.createElement('div');
      cap.className = 'sf-cap';
      cap.innerHTML = '<b>' + f.name.replace(/[<>&]/g, '') + '</b><span>' + mb(f.size) +
        (f.size > MAX_BYTES ? ' — завеликий' : '') + '</span>';
      var del = document.createElement('button');
      del.type = 'button'; del.className = 'sf-del';
      del.setAttribute('aria-label', 'Прибрати ' + f.name);
      del.textContent = '×';
      del.onclick = function(){{ chosen.splice(i, 1); render(); }};
      li.appendChild(img); li.appendChild(cap); li.appendChild(del);
      list.appendChild(li);
    }});
    check();
  }}

  function check(){{
    if (!chosen.length) return say('');
    var big = chosen.filter(function(f){{ return f.size > MAX_BYTES; }});
    var total = chosen.reduce(function(a, f){{ return a + f.size; }}, 0);
    if (chosen.length > MAX_FILES)
      return say('Обрано ' + chosen.length + ', а за раз можна до ' + MAX_FILES + '. Приберіть зайві.', 'bad');
    if (big.length)
      return say(big.length + ' знімк(ів) більші за 12 МБ. Приберіть або стисніть їх.', 'bad');
    say(chosen.length + ' знімк(ів), разом ' + mb(total) + '.');
  }}

  function add(files){{
    Array.prototype.forEach.call(files, function(f){{
      if (!/^image\//.test(f.type) && !/\.(jpe?g|png|heic|heif|tiff?|webp)$/i.test(f.name)) return;
      var dup = chosen.some(function(c){{ return c.name === f.name && c.size === f.size; }});
      if (!dup) chosen.push(f);
    }});
    render();
  }}

  input.addEventListener('change', function(){{ add(input.files); input.value = ''; }});

  ['dragenter','dragover'].forEach(function(ev){{
    drop.addEventListener(ev, function(e){{ e.preventDefault(); drop.classList.add('is-over'); }});
  }});
  ['dragleave','drop'].forEach(function(ev){{
    drop.addEventListener(ev, function(e){{ e.preventDefault(); drop.classList.remove('is-over'); }});
  }});
  drop.addEventListener('drop', function(e){{
    if (e.dataTransfer && e.dataTransfer.files) add(e.dataTransfer.files);
  }});

  form.addEventListener('submit', function(e){{
    e.preventDefault();
    if (!chosen.length) return say('Додайте хоча б один знімок.', 'bad');
    if (chosen.length > MAX_FILES) return say('Не більше ' + MAX_FILES + ' знімків за раз.', 'bad');
    if (chosen.some(function(f){{ return f.size > MAX_BYTES; }}))
      return say('Один із файлів більший за 12 МБ.', 'bad');
    if (!form.contact.value.trim()) return say('Лишіть пошту або телефон.', 'bad');

    var data = new FormData();
    data.append('name', form.name.value);
    data.append('contact', form.contact.value);
    data.append('note', form.note.value);
    data.append('website', form.website.value);
    chosen.forEach(function(f){{ data.append('photos', f, f.name); }});

    /* XHR, а не fetch: лише він показує поступ вивантаження, а на
       мобільному інтернеті десять кадрів ідуть довго і мовчазна кнопка
       виглядає як зламана. */
    var xhr = new XMLHttpRequest();
    xhr.open('POST', API, true);
    go.disabled = true; bar.hidden = false;
    bar.firstElementChild.style.width = '0%';
    say('Надсилаємо…');

    xhr.upload.onprogress = function(ev){{
      if (!ev.lengthComputable) return;
      var pct = Math.round(ev.loaded / ev.total * 100);
      bar.firstElementChild.style.width = pct + '%';
      say('Надсилаємо… ' + pct + '%');
    }};
    xhr.onload = function(){{
      go.disabled = false; bar.hidden = true;
      var res = {{}};
      try {{ res = JSON.parse(xhr.responseText || '{{}}'); }} catch (err) {{}}
      if (xhr.status !== 200) return say(res.error || 'Не вдалося надіслати.', 'bad');
      var extra = (res.rejected && res.rejected.length)
        ? ' Не прийнято: ' + res.rejected.map(function(x){{ return x.file; }}).join(', ') + '.'
        : '';
      say('Дякуємо, отримали ' + res.saved + ' знімк(ів).' + extra +
          ' Передивимось і напишемо на ' + form.contact.value.trim() + '.', 'good');
      chosen = []; render(); form.reset();
      say('Дякуємо, знімки надіслані. Передивимось і напишемо.', 'good');
    }};
    xhr.onerror = function(){{
      go.disabled = false; bar.hidden = true;
      say('Мережа недоступна. Спробуйте ще раз.', 'bad');
    }};
    xhr.send(data);
  }});
}})();
</script>
{CREDIT}
{SUPPORT}
{FOOT}"""
    write("/submit/", body)


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
    # Виставка, що схудла нижче порога, не має лишатись відкритою за старою
    # адресою: на неї вже ніщо не веде, а сторінка живе.
    live_ex = {slug for slug, _, _, pat in EXHIBITIONS if len(exhibition_works(pat)) >= 8}
    ex_dir = os.path.join(ROOT, "exhibitions")
    for name in os.listdir(ex_dir) if os.path.isdir(ex_dir) else []:
        if name not in live_ex:
            shutil.rmtree(os.path.join(ex_dir, name)); gone_pages += 1

    media_dir = os.path.join(ROOT, "media")
    for name in os.listdir(media_dir) if os.path.isdir(media_dir) else []:
        stem = re.sub(r"-(s|m)\.webp$", "", name)
        if stem == name or stem not in ids:
            os.remove(os.path.join(media_dir, name)); gone_media += 1
    if gone_pages or gone_media:
        print(f"прибрано сиріт: сторінок {gone_pages}, нарізок {gone_media}")


# Стара розкладка залів жила на сайті кілька годин, і посилання на неї могли
# розійтись. Сервера тут немає, тому на старих адресах лишається сторінка,
# яка одразу веде на новий зал.
OLD_HALLS = {
    "misto-do-2014": "vulytsi", "euro-2012": "arena", "panorama": "panoramy",
    "lito-2014": "viina", "botanichnyi-sad": "sad-i-voda", "kolory": "sad-i-voda",
    "okupatsiia": "viina", "ochyma-inshykh": "vulytsi",
}


def build_redirects():
    by_slug = {h["slug"]: h for h in CAT["halls"]}
    for old, new in OLD_HALLS.items():
        title = by_slug[new]["title"]
        write(f"/halls/{old}/", f"""<!doctype html>
<html lang="uk">
<head>
<meta charset="utf-8">
<title>Зал переїхав · 062.dn.ua</title>
<link rel="canonical" href="{SITE}/halls/{new}/">
<meta http-equiv="refresh" content="0; url=/halls/{new}/">
<link rel="stylesheet" href="/assets/museum.css?v={CSS_V}">
</head>
<body>
<div class="stage">
  <section class="row hall-hero">
    <div class="inA num">зал</div><div class="inB"></div>
    <div class="inC">
      <h1>Зал переїхав</h1>
      <p class="blurb">Ці знімки тепер у залі «{esc(title)}».</p>
      <a class="backlink" href="/halls/{new}/">перейти →</a>
    </div>
  </section>
</div>
</body>
</html>""")
    print(f"перенаправлень зі старих залів: {len(OLD_HALLS)}")


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
    build_submit()
    build_meta()
    build_redirects()
    clean_orphans()
    print(f"зібрано: головна, {len(halls)} залів, {len(EXHIBITIONS)} виставок "
          f"({ex_total} входжень), {total} карток знімків, пошук")




def build_meta():
    """Карта сайта, robots и страница 404 в той же вёрстке."""
    urls = ["/", "/search/", "/portal/"]
    urls += [f"/halls/{h['slug']}/" for h in CAT["halls"] if works_by_hall(h["slug"])]
    urls += [f"/exhibitions/{s}/" for s, _, _, pat in EXHIBITIONS
             if len(exhibition_works(pat)) >= 8]
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
{SUPPORT}
{FOOT}""")
    print(f"карта сайту: {len(urls)} адрес")


if __name__ == "__main__":
    main()
