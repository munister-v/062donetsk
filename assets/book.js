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

  var T = {
    en: {
      skip:'Skip to the order', nav_inside:'Inside', nav_order:'Order',
      eyebrow:'Photo album', h1:'To Donetsk,<br>I love you', lead:'177 photographs of Donetsk.',
      cta_order:'Order', cta_look:'Look inside', facts_al:'About the book',
      f1:'photographs', f3:'pages', f4:'format', f5:'g/m², paper',
      s_inside:'Inside', inside_cnt:'12 pages of 32', s_ed:'Edition',
      d1t:'Type', d1:'Magazine', d2t:'Book size', d2:'Large, A4, 205 × 290 mm', d3t:'Extent', d3:'32 pages, 177 photographs', d7t:'Block paper', d7:'White paper, 120 g/m²',
      d8t:'Block colour', d8:'Colour, laser printing', d9t:'Lamination', d9:'Glossy',
      d6t:'Edition', d6:'Non-commercial, at cost',
      s_sp:'Project sponsors', sp_p:'Send a donation of any amount to the jar and you will be added to the list of the project’s sponsors.', sp_btn:'Support the project',
      o_dead:'Orders for the print run are open until 12 December, then printing and dispatch.', d5t:'Photographs',
      s_order:'Order',
      o_p:'Leave your number on Viber or WhatsApp. We will contact you to agree on payment and delivery.',
      o_price:'The price is UAH 400 per copy. Delivery is paid by the recipient.', total:'Total: {n} UAH',
      l_deliv:'Delivery', c_np:'Nova Poshta', c_intl:'Abroad', l_region:'Region', ph_region:'Select a region',
      l_city:'Town or village', l_ptype:'Deliver to', p_branch:'Branch', p_locker:'Parcel locker', l_pnum:'Branch or locker number', l_country:'Country', l_city2:'City', l_addr:'Address and postcode',
      e_deliv:'Choose a delivery method.', e_region:'Select a region and enter the town or village.',
      e_point:'Enter the branch or locker number.', e_country:'Enter the country and city.',
      l_surname:'Surname', l_name:'First name', l_phone:'Phone', l_msg:'Where to write to you', l_qty:'Copies', l_note:'Comment',
      send:'Send the request', fine:'Your number is used only to reply and is not passed on.',
      e_name:'Enter your first name and surname.', e_phone:'Enter your number with the country code.',
      e_fail:'Could not send. Please try again a little later.', e_rate:'Too many attempts. Please try later.',
      sending:'Sending…', done_h:'Thank you.', done_p:'We will contact you on {m} at {phone}.',
      lb_al:'Page viewer', close:'Close', prev:'Previous', next:'Next', page:'Page',
      cover_alt:'Cover of the album “To Donetsk, I love you”'
    },
    pl: {
      skip:'Przejdź do zamówienia', nav_inside:'W środku', nav_order:'Zamów',
      eyebrow:'Album fotograficzny', h1:'Do Doniecka,<br>kocham cię', lead:'177 fotografii Doniecka.',
      cta_order:'Zamów', cta_look:'Zajrzyj do środka', facts_al:'O książce',
      f1:'fotografii', f3:'strony', f4:'format', f5:'g/m², papier',
      s_inside:'W środku', inside_cnt:'12 stron z 32', s_ed:'Wydanie',
      d1t:'Typ', d1:'Magazyn', d2t:'Rozmiar książki', d2:'Duży, A4, 205 × 290 mm', d3t:'Objętość', d3:'32 strony, 177 fotografii', d7t:'Papier bloku', d7:'Biały papier 120 g/m²',
      d8t:'Kolor bloku', d8:'Kolor, druk laserowy', d9t:'Laminacja', d9:'Błyszcząca',
      d6t:'Wydanie', d6:'Niekomercyjne, po kosztach',
      s_sp:'Sponsorzy projektu', sp_p:'Wpłać darowiznę w dowolnej kwocie na skarbonkę, a zostaniesz dopisany do listy sponsorów projektu.', sp_btn:'Wesprzyj projekt',
      o_dead:'Zamówienia na nakład przyjmujemy do 12 grudnia, potem druk i wysyłka.', d5t:'Zdjęcia',
      s_order:'Zamów',
      o_p:'Zostaw numer w Viberze lub WhatsAppie. Skontaktujemy się z tobą w sprawie płatności i dostawy.',
      o_price:'Cena to 400 UAH za egzemplarz. Koszt dostawy pokrywa odbiorca.', total:'Razem: {n} UAH',
      l_deliv:'Dostawa', c_np:'Nova Poshta', c_intl:'Za granicę', l_region:'Obwód', ph_region:'Wybierz obwód',
      l_city:'Miejscowość', l_ptype:'Dostarczyć do', p_branch:'Oddział', p_locker:'Paczkomat', l_pnum:'Numer oddziału lub paczkomatu', l_country:'Kraj', l_city2:'Miasto', l_addr:'Adres i kod pocztowy',
      e_deliv:'Wybierz sposób dostawy.', e_region:'Wybierz obwód i wpisz miejscowość.',
      e_point:'Podaj numer oddziału lub paczkomatu.', e_country:'Podaj kraj i miasto.',
      l_surname:'Nazwisko', l_name:'Imię', l_phone:'Telefon', l_msg:'Gdzie do ciebie pisać', l_qty:'Liczba egzemplarzy', l_note:'Komentarz',
      send:'Wyślij zgłoszenie', fine:'Numer służy tylko do odpowiedzi i nie jest nikomu przekazywany.',
      e_name:'Podaj imię i nazwisko.', e_phone:'Podaj numer z kodem kraju.',
      e_fail:'Nie udało się wysłać. Spróbuj ponownie za chwilę.', e_rate:'Za dużo prób. Spróbuj później.',
      sending:'Wysyłamy…', done_h:'Dziękuję.', done_p:'Skontaktujemy się z tobą w {m} na numer {phone}.',
      lb_al:'Podgląd strony', close:'Zamknij', prev:'Poprzednia', next:'Następna', page:'Strona',
      cover_alt:'Okładka albumu „Do Doniecka, kocham cię”'
    }
  };
  /* українські підписи кадрів беруться з alt у розмітці; повідомлення
     форми, яких у розмітці немає, лежать тут */
  var lang = 'uk', ukText = {
    e_name:'Вкажіть прізвище та ім’я.', e_phone:'Вкажіть номер із кодом країни.',
    e_fail:'Не вдалося надіслати. Спробуйте ще раз трохи згодом.', e_rate:'Забагато спроб. Спробуйте пізніше.',
    total:'Разом: {n} грн',
    e_deliv:'Оберіть спосіб доставки.', e_region:'Оберіть область і вкажіть населений пункт.',
    e_point:'Вкажіть номер відділення чи поштомата.', e_country:'Вкажіть країну й місто.',
    sending:'Надсилаємо…', done_p:'З вами зв’яжуться у {m} на {phone}.', page:'Сторінка'
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
    galBtns.forEach(function(b){ b.querySelector('img').alt = tr('page') + ' ' + parseInt(b.dataset.p, 10); });
    Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function(b){
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
    if (lbOpen) lbShow(lbIdx, true);
    syncDelivery();
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
    var name = galBtns[lbIdx].dataset.p;
    if (!keep || lbImg.dataset.name !== name){
      lbImg.dataset.name = name;
      lbImg.src = '/media/book/p/' + name + '-L.webp';
    }
    var label = tr('page') + ' ' + parseInt(name, 10);
    lbImg.alt = label;
    lbCap.textContent = label;
    lbCnt.textContent = (lbIdx + 1) + ' / ' + n;
    new Image().src = '/media/book/p/' + galBtns[(lbIdx + 1) % n].dataset.p + '-L.webp';
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
  var t0 = Date.now();
  function normPhone(d){ return (d.length === 10 && d.charAt(0) === '0') ? '38' + d : d; }
  var form = document.getElementById('order-form'), done = document.getElementById('of-done'),
      donep = document.getElementById('of-done-p'), go = document.getElementById('of-go'),
      status = document.getElementById('of-status');
  function say(t, bad){ status.textContent = t || ''; status.className = 'sf-status' + (bad ? ' is-bad' : ''); }
  function mark(input, bad){ if (bad) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid'); }
  form.addEventListener('input', function(e){ mark(e.target, false); say(''); });
  form.addEventListener('change', function(e){ mark(e.target, false); });

  /* ── доставка: область й населений пункт окремо, відділення чи поштомат ── */
  var dvUa = document.getElementById('dv-ua'), dvIntl = document.getElementById('dv-intl'),
      dvType = document.getElementById('dv-type'), dvPl = document.getElementById('dv-pl');
  function carrier(){ var c = form.querySelector('input[name=carrier]:checked'); return c ? c.value : ''; }
  var PRICE = 400, totalEl = document.getElementById('bk-total');
  function showTotal(){ totalEl.textContent = tr('total').replace('{n}', String((parseInt(form.elements.qty.value, 10) || 1) * PRICE)); }
  form.elements.qty.addEventListener('change', showTotal);
  function syncDelivery(){
    showTotal();
    var c = carrier();
    dvUa.hidden = c !== 'np';
    dvIntl.hidden = c !== 'intl';
    dvType.hidden = c !== 'np';
    dvPl.textContent = tr('l_pnum');
  }
  Array.prototype.forEach.call(form.querySelectorAll('input[name=carrier]'), function(r){ r.addEventListener('change', syncDelivery); });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var f = form.elements;
    var name = f.name.value.trim(), surname = f.surname.value.trim(), digits = normPhone(f.phone.value.replace(/\D/g, ''));
    mark(f.surname, false); mark(f.name, false); mark(f.phone, false);
    if (!surname){ mark(f.surname, true); f.surname.focus(); return say(tr('e_name'), true); }
    if (!name){ mark(f.name, true); f.name.focus(); return say(tr('e_name'), true); }
    if (digits.length < 7 || digits.length > 15){ mark(f.phone, true); f.phone.focus(); return say(tr('e_phone'), true); }
    var messenger = form.querySelector('input[name=messenger]:checked').value;
    var c = carrier(), dv = { carrier: c, region: '', city: '', point_type: '', point: '' };
    if (!c) return say(tr('e_deliv'), true);
    if (c === 'intl'){
      dv.region = f.country.value.trim(); dv.city = f.city2.value.trim(); dv.point = f.addr.value.trim();
      if (!dv.region || !dv.city){ var b1 = dv.region ? f.city2 : f.country; mark(b1, true); b1.focus(); return say(tr('e_country'), true); }
    } else {
      dv.region = f.region.value; dv.city = f.city.value.trim(); dv.point = f.point.value.trim();
      dv.point_type = c === 'np' ? form.querySelector('input[name=point_type]:checked').value : '';
      if (!dv.region || !dv.city){ var b2 = dv.region ? f.city : f.region; mark(b2, true); b2.focus(); return say(tr('e_region'), true); }
      if (!dv.point){ mark(f.point, true); f.point.focus(); return say(tr('e_point'), true); }
    }
    var payload = {
      surname: surname, name: name, phone: '+' + digits, messenger: messenger, qty: parseInt(f.qty.value, 10) || 1,
      carrier: dv.carrier, region: dv.region, city: dv.city, point_type: dv.point_type, point: dv.point,
      note: f.note.value.trim(), hp: f.hp.value, elapsed: Date.now() - t0, lang: lang
    };
    go.disabled = true; say(tr('sending'));
    fetch(API + '/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function(r){ return r.json().catch(function(){ return {}; }).then(function(j){ return { s: r.status, j: j }; }); })
      .then(function(res){
        go.disabled = false;
        if (res.s === 429) return say(tr('e_rate'), true);
        if (res.s === 400 && res.j.error === 'phone'){ mark(f.phone, true); f.phone.focus(); return say(tr('e_phone'), true); }
        if (res.s === 400 && res.j.error === 'delivery') return say(tr('e_region'), true);
        if (res.s === 400 && res.j.error === 'name'){ mark(f.surname.value.trim() ? f.name : f.surname, true); (f.surname.value.trim() ? f.name : f.surname).focus(); return say(tr('e_name'), true); }
        if (res.s !== 200) return say(tr('e_fail'), true);
        donep.textContent = tr('done_p').replace('{m}', messenger === 'viber' ? 'Viber' : 'WhatsApp').replace('{phone}', payload.phone) + (res.j.code ? '  ' + res.j.code : '');
        form.hidden = true; done.hidden = false; done.focus();
        form.reset(); syncDelivery(); say('');
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
