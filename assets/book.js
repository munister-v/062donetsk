/* Сторінка книги: перегляд кадрів, стрічка сторінок, заявка. Лише українською. */
(function(){
  'use strict';
  var API = 'https://api.eprisjournal.com/book-orders';
  /* на локальній перевірці можна підставити свій сервер: ?api=http://127.0.0.1:9892 */
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)){
    var qa = (location.search.match(/[?&]api=([^&]+)/) || [])[1];
    if (qa) API = decodeURIComponent(qa);
  }

  /* повідомлення форми, яких у розмітці немає, лежать тут */
  var ukText = {
    e_name:'Вкажіть прізвище та ім’я.', e_phone:'Вкажіть номер із кодом країни.',
    e_fail:'Не вдалося надіслати. Спробуйте ще раз трохи згодом.', e_rate:'Забагато спроб. Спробуйте пізніше.',
    total:'Разом: {n} грн',
    e_deliv:'Оберіть спосіб доставки.', e_region:'Оберіть область і вкажіть населений пункт.',
    e_point:'Вкажіть номер відділення чи поштомата.', e_country:'Вкажіть країну й місто.',
    sending:'Надсилаємо…', done_p:'З вами зв’яжуться у {m} на {phone}.', page:'Сторінка'
  };

  function tr(key){ return ukText[key] != null ? ukText[key] : key; }

  var galBtns = Array.prototype.slice.call(document.querySelectorAll('#gal button'));

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
      dvType = document.getElementById('dv-type');
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
      note: f.note.value.trim(), hp: f.hp.value, elapsed: Date.now() - t0, lang: 'uk'
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
})();
