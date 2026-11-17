/* Сторінка книги: мови, перегляд кадрів, стрічка сторінок, заявка.
   Українська лежить у самій розмітці (для пошуку й для тих, у кого скрипт
   не завантажився); EN і PL підставляються звідси. */
(function(){
  'use strict';
  var API = 'https://api.eprisjournal.com/book-orders';
  /* на локальній перевірці можна підставити свій сервер: ?api=http://127.0.0.1:9892 */
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)){
    var qa = (location.search.match(/[?&]api=([^&]+)/) || [])[1];
    if (qa) API = decodeURIComponent(qa);
  }
  var CREDIT = 'В’ячеслав Муністер · архів 062.dn.ua';

  var T = {
    en: {
      skip:'Skip to the order', nav_inside:'Inside', nav_frames:'Frames', nav_order:'Order',
      eyebrow:'Photo album · 2009–2014', h1:'Donetsk,<br>I love you',
      lead:'The city we had. 177 photographs in five halls.',
      cta_order:'Order', cta_look:'Look inside', facts_al:'About the book',
      f1:'photographs', f2:'halls', f3:'pages', f4:'format',
      s_letter:'From the book', s_halls:'Contents', halls_cnt:'five halls', hall:'Hall',
      h_1:'City', h_2:'Arena', h_3:'Stands', h_4:'Summer 2012', h_5:'Home',
      s_frames:'A few frames', frames_cnt:'16 of 177', frames_more:'The rest you will see in the book.',
      s_inside:'Inside', inside_cnt:'pages from the book', pages_al:'Pages from the book',
      s_ed:'Edition', d1t:'Language', d1:'Ukrainian', d2t:'Format', d2:'A5, 148 × 210 mm',
      d3t:'Extent', d3:'64 pages, 177 photographs', d4t:'Author',
      d5t:'More photographs', d5:'Vadym Shamdan (with the author’s permission), Brücke-Osteuropa and dasjo (Wikimedia Commons)',
      d6t:'Edition', d6:'Non-commercial, printed at cost',
      s_order:'Order',
      o_p:'Leave your number on Viber or WhatsApp. I will write to you and we will agree on payment and delivery.',
      o_price:'The price is the cost of printing. I will give the exact sum in the message.',
      l_name:'Name', l_phone:'Phone', l_msg:'Where to write to you', l_qty:'Copies', l_place:'Country and city', l_note:'Comment',
      send:'Send the request', fine:'Your number is used only to reply and is not passed on.',
      e_name:'Enter your name.', e_phone:'Enter your number with the country code.',
      e_fail:'Could not send. Please try again a little later.', e_rate:'Too many attempts. Please try later.',
      sending:'Sending…', done_h:'Thank you.', done_p:'I will write to you on {m} at {phone}.',
      lb_al:'Photo viewer', close:'Close', prev:'Previous', next:'Next',
      cover_alt:'Cover of the album “Donetsk, I love you”',
      pg_cover:'Cover', pg_letter:'A letter to Donetsk', pg_toc:'Contents', pg_h1:'Hall I · City', pg_p5:'A million roses',
      pg_p6:'The house with the globe', pg_p7:'Golden hour', pg_p10:'The frozen Kalmius', pg_p11:'The frozen river',
      pg_p59:'The road home', pg_p61:'Your Donetsk: a page for your photo', pg_p62:'A ticket home',
      c_cathedral:'Cathedral and spoil tip, 2012', c_artema:'Artema Street in the evening, 2012', 'c_euro-fans':'Fans celebrating, Euro 2012',
      c_globe:'The house with the globe, 2012', 'c_kalmius-bridge':'Bridge over the frozen Kalmius, 2012',
      'c_euro-police':'Spanish police in Donetsk, Euro 2012', 'c_night-panorama':'Night panorama of Donetsk, 2012',
      'c_center-sunset':'Summer sunset over the centre', 'c_euro-spanish':'A Spanish fan, Euro 2012', 'c_neon-winter':'Winter Donetsk, neon, 2012',
      c_station:'The railway station at sunset', 'c_euro-park':'The park by the arena on match day, 2012',
      'c_dusk-water':'Dusk over the water', 'c_euro-arena-day':'By the arena on match day, Euro 2012',
      'c_winter-sunset':'Winter sunset', c_steppe:'The steppe outside the city'
    },
    pl: {
      skip:'Przejdź do zamówienia', nav_inside:'W środku', nav_frames:'Kadry', nav_order:'Zamów',
      eyebrow:'Album fotograficzny · 2009–2014', h1:'Donieck,<br>kocham cię',
      lead:'Miasto, które mieliśmy. 177 fotografii w pięciu salach.',
      cta_order:'Zamów', cta_look:'Zajrzyj do środka', facts_al:'O książce',
      f1:'fotografii', f2:'sal', f3:'strony', f4:'format',
      s_letter:'Z książki', s_halls:'Spis treści', halls_cnt:'pięć sal', hall:'Sala',
      h_1:'Miasto', h_2:'Arena', h_3:'Trybuny', h_4:'Lato 2012', h_5:'Dom',
      s_frames:'Kilka kadrów', frames_cnt:'16 ze 177', frames_more:'Resztę zobaczysz w książce.',
      s_inside:'W środku', inside_cnt:'strony z książki', pages_al:'Strony z książki',
      s_ed:'Wydanie', d1t:'Język', d1:'Ukraiński', d2t:'Format', d2:'A5, 148 × 210 mm',
      d3t:'Objętość', d3:'64 strony, 177 fotografii', d4t:'Autor',
      d5t:'Także zdjęcia', d5:'Wadym Szamdan (za zgodą autora), Brücke-Osteuropa i dasjo (Wikimedia Commons)',
      d6t:'Wydanie', d6:'Niekomercyjne, druk po kosztach',
      s_order:'Zamów',
      o_p:'Zostaw numer w Viberze lub WhatsAppie. Napiszę do ciebie i ustalimy płatność oraz dostawę.',
      o_price:'Cena to koszt druku. Dokładną kwotę podam w wiadomości.',
      l_name:'Imię', l_phone:'Telefon', l_msg:'Gdzie do ciebie pisać', l_qty:'Liczba egzemplarzy', l_place:'Kraj i miasto', l_note:'Komentarz',
      send:'Wyślij zgłoszenie', fine:'Numer służy tylko do odpowiedzi i nie jest nikomu przekazywany.',
      e_name:'Podaj imię.', e_phone:'Podaj numer z kodem kraju.',
      e_fail:'Nie udało się wysłać. Spróbuj ponownie za chwilę.', e_rate:'Za dużo prób. Spróbuj później.',
      sending:'Wysyłamy…', done_h:'Dziękuję.', done_p:'Napiszę do ciebie w {m} na numer {phone}.',
      lb_al:'Podgląd zdjęcia', close:'Zamknij', prev:'Poprzednie', next:'Następne',
      cover_alt:'Okładka albumu „Donieck, kocham cię”',
      pg_cover:'Okładka', pg_letter:'List do Doniecka', pg_toc:'Spis treści', pg_h1:'Sala I · Miasto', pg_p5:'Milion róż',
      pg_p6:'Dom z globusem', pg_p7:'Złota godzina', pg_p10:'Zamarznięty Kalmius', pg_p11:'Zamarznięta rzeka',
      pg_p59:'Droga do domu', pg_p61:'Twój Donieck: strona na twoje zdjęcie', pg_p62:'Bilet do domu',
      c_cathedral:'Sobór i hałda, 2012', c_artema:'Ulica Artema wieczorem, 2012', 'c_euro-fans':'Kibice świętują, Euro 2012',
      c_globe:'Dom z globusem, 2012', 'c_kalmius-bridge':'Most nad zamarzniętym Kalmiusem, 2012',
      'c_euro-police':'Hiszpańska policja w Doniecku, Euro 2012', 'c_night-panorama':'Nocna panorama Doniecka, 2012',
      'c_center-sunset':'Letni zachód nad centrum', 'c_euro-spanish':'Hiszpański kibic, Euro 2012', 'c_neon-winter':'Zimowy Donieck, neony, 2012',
      c_station:'Dworzec kolejowy o zachodzie słońca', 'c_euro-park':'Park przed areną w dniu meczu, 2012',
      'c_dusk-water':'Zmierzch nad wodą', 'c_euro-arena-day':'Przy arenie w dniu meczu, Euro 2012',
      'c_winter-sunset':'Zimowy zachód słońca', c_steppe:'Step za miastem'
    }
  };
  /* українські підписи кадрів беруться з alt у розмітці; повідомлення
     форми, яких у розмітці немає, лежать тут */
  var lang = 'uk', ukText = {
    e_name:'Вкажіть ім’я.', e_phone:'Вкажіть номер із кодом країни.',
    e_fail:'Не вдалося надіслати. Спробуйте ще раз трохи згодом.', e_rate:'Забагато спроб. Спробуйте пізніше.',
    sending:'Надсилаємо…', done_p:'Напишу вам у {m} на {phone}.'
  };

  function store(k, v){ try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k){ try { return localStorage.getItem(k); } catch (e) { return null; } }

  function tr(key){
    if (lang === 'uk') return ukText[key] != null ? ukText[key] : key;
    return (T[lang] && T[lang][key] != null) ? T[lang][key] : (ukText[key] != null ? ukText[key] : key);
  }

  var els = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  var attrEls = Array.prototype.slice.call(document.querySelectorAll('[data-i18n-attr]'));
  els.forEach(function(el){ if (!(el.dataset.i18n in ukText)) ukText[el.dataset.i18n] = el.innerHTML; });
  attrEls.forEach(function(el){
    var p = el.dataset.i18nAttr.split(':');
    ukText[p[1]] = el.getAttribute(p[0]);
  });
  var galBtns = Array.prototype.slice.call(document.querySelectorAll('#gal button'));
  galBtns.forEach(function(b){ ukText['c_' + b.dataset.img] = b.querySelector('img').alt; });

  function applyLang(l){
    lang = (l === 'en' || l === 'pl') ? l : 'uk';
    document.documentElement.lang = lang;
    els.forEach(function(el){
      var k = el.dataset.i18n;
      var v = lang === 'uk' ? ukText[k] : (T[lang][k] != null ? T[lang][k] : ukText[k]);
      el.innerHTML = v;
    });
    attrEls.forEach(function(el){
      var p = el.dataset.i18nAttr.split(':');
      el.setAttribute(p[0], tr(p[1]));
    });
    galBtns.forEach(function(b){ b.querySelector('img').alt = tr('c_' + b.dataset.img); });
    Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function(b){
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
    if (lbOpen) lbShow(lbIdx, true);
    store('book-lang', lang);
  }
  Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function(b){
    b.addEventListener('click', function(){ applyLang(b.dataset.lang); });
  });

  /* ── перегляд кадрів ───────────────────────────────── */
  var lb = document.getElementById('lb'), lbImg = document.getElementById('lb-img'),
      lbCap = document.getElementById('lb-cap'), lbCnt = document.getElementById('lb-count');
  var lbOpen = false, lbIdx = 0, lastFocus = null, pushed = false;

  function lbShow(i, keep){
    var n = galBtns.length;
    lbIdx = (i + n) % n;
    var b = galBtns[lbIdx], name = b.dataset.img;
    if (!keep || lbImg.dataset.name !== name){
      lbImg.dataset.name = name;
      lbImg.src = '/media/book/g/' + name + '-1600.webp';
    }
    lbImg.alt = tr('c_' + name);
    lbCap.innerHTML = '';
    lbCap.appendChild(document.createTextNode(tr('c_' + name)));
    var s = document.createElement('small'); s.textContent = CREDIT; lbCap.appendChild(s);
    lbCnt.textContent = (lbIdx + 1) + ' / ' + n;
    var nb = galBtns[(lbIdx + 1) % n].dataset.img;
    new Image().src = '/media/book/g/' + nb + '-1600.webp';
  }
  function openLb(i, from){
    lastFocus = from || document.activeElement;
    lbOpen = true;
    lb.dataset.open = 'true';
    document.body.classList.add('bk-lock');
    lbShow(i);
    document.getElementById('lb-x').focus();
    /* кнопка «Назад» на телефоні закриває перегляд, а не сторінку */
    try { history.pushState({ lb: 1 }, ''); pushed = true; } catch (e) { pushed = false; }
  }
  function closeLb(fromPop){
    if (!lbOpen) return;
    lbOpen = false;
    lb.dataset.open = 'false';
    document.body.classList.remove('bk-lock');
    lbImg.removeAttribute('src'); delete lbImg.dataset.name;
    if (pushed && !fromPop){ pushed = false; try { history.back(); } catch (e) {} }
    pushed = false;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  galBtns.forEach(function(b, i){ b.addEventListener('click', function(){ openLb(i, b); }); });
  document.getElementById('lb-x').addEventListener('click', function(){ closeLb(false); });
  document.getElementById('lb-pv').addEventListener('click', function(){ lbShow(lbIdx - 1); });
  document.getElementById('lb-nx').addEventListener('click', function(){ lbShow(lbIdx + 1); });
  window.addEventListener('popstate', function(){ if (lbOpen) closeLb(true); });
  lb.addEventListener('click', function(e){ if (e.target === lb || e.target.classList.contains('bk-lb-stage')) closeLb(false); });
  document.addEventListener('keydown', function(e){
    if (!lbOpen) return;
    if (e.key === 'Escape') closeLb(false);
    else if (e.key === 'ArrowLeft') lbShow(lbIdx - 1);
    else if (e.key === 'ArrowRight') lbShow(lbIdx + 1);
    else if (e.key === 'Tab'){
      var f = lb.querySelectorAll('button'), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  });
  /* свайп у перегляді */
  var tx = null;
  lb.addEventListener('touchstart', function(e){ tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function(e){
    if (tx == null) return;
    var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) lbShow(lbIdx + (dx < 0 ? 1 : -1));
  });

  /* ── стрічка сторінок ──────────────────────────────── */
  var strip = document.getElementById('pages'), pp = document.getElementById('pg-prev'), pn = document.getElementById('pg-next');
  function stripState(){
    pp.disabled = strip.scrollLeft < 4;
    pn.disabled = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4;
  }
  function stripGo(d){
    var step = Math.max(200, strip.clientWidth * 0.8);
    strip.scrollBy({ left: d * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  pp.addEventListener('click', function(){ stripGo(-1); });
  pn.addEventListener('click', function(){ stripGo(1); });
  strip.addEventListener('scroll', stripState, { passive: true });
  strip.addEventListener('keydown', function(e){
    if (e.key === 'ArrowRight'){ e.preventDefault(); stripGo(1); }
    if (e.key === 'ArrowLeft'){ e.preventDefault(); stripGo(-1); }
  });
  window.addEventListener('resize', stripState);
  stripState();

  /* ── плаваюча кнопка (телефон) ─────────────────────── */
  var sticky = document.getElementById('sticky');
  var hero = document.querySelector('.hero-cta'), orderSec = document.getElementById('order');
  if ('IntersectionObserver' in window){
    var heroOut = false, orderIn = false;
    var upd = function(){ sticky.dataset.show = (heroOut && !orderIn) ? 'true' : 'false'; };
    new IntersectionObserver(function(en){ heroOut = !en[0].isIntersecting && en[0].boundingClientRect.top < 0; upd(); }).observe(hero);
    new IntersectionObserver(function(en){ orderIn = en[0].isIntersecting; upd(); }, { threshold: 0.05 }).observe(orderSec);
  }
  sticky.setAttribute('tabindex', '-1');

  /* ── заявка ────────────────────────────────────────── */
  var form = document.getElementById('order-form'), done = document.getElementById('of-done'),
      donep = document.getElementById('of-done-p'), go = document.getElementById('of-go'),
      status = document.getElementById('of-status');
  function say(t, bad){ status.textContent = t || ''; status.className = 'sf-status' + (bad ? ' is-bad' : ''); }
  function mark(input, bad){ if (bad) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid'); }
  form.addEventListener('input', function(e){ mark(e.target, false); say(''); });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var f = form.elements;
    var name = f.name.value.trim(), digits = f.phone.value.replace(/\D/g, '');
    mark(f.name, false); mark(f.phone, false);
    if (!name){ mark(f.name, true); f.name.focus(); return say(tr('e_name'), true); }
    if (digits.length < 7 || digits.length > 15){ mark(f.phone, true); f.phone.focus(); return say(tr('e_phone'), true); }
    var messenger = form.querySelector('input[name=messenger]:checked').value;
    var payload = {
      name: name, phone: '+' + digits, messenger: messenger, qty: parseInt(f.qty.value, 10) || 1,
      place: f.place.value.trim(), note: f.note.value.trim(), website: f.website.value, lang: lang
    };
    go.disabled = true; say(tr('sending'));
    fetch(API + '/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function(r){ return r.json().catch(function(){ return {}; }).then(function(j){ return { s: r.status, j: j }; }); })
      .then(function(res){
        go.disabled = false;
        if (res.s === 429) return say(tr('e_rate'), true);
        if (res.s === 400 && res.j.error === 'phone'){ mark(f.phone, true); f.phone.focus(); return say(tr('e_phone'), true); }
        if (res.s === 400 && res.j.error === 'name'){ mark(f.name, true); f.name.focus(); return say(tr('e_name'), true); }
        if (res.s !== 200) return say(tr('e_fail'), true);
        donep.textContent = tr('done_p').replace('{m}', messenger === 'viber' ? 'Viber' : 'WhatsApp').replace('{phone}', payload.phone);
        form.hidden = true; done.hidden = false; done.focus();
        form.reset(); say('');
      })
      .catch(function(){ go.disabled = false; say(tr('e_fail'), true); });
  });

  /* ── мова: ?lang=, збережена, або мова браузера ────── */
  var q = (location.search.match(/[?&]lang=(uk|en|pl)/) || [])[1];
  var saved = load('book-lang');
  var nav = (navigator.language || '').slice(0, 2).toLowerCase();
  var start = q || saved || (nav === 'pl' ? 'pl' : (nav === 'uk' || nav === 'ru' ? 'uk' : (nav ? 'en' : 'uk')));
  if (start !== 'uk') applyLang(start);
})();
