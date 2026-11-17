/* Адмінка заявок на альбом. Пароль лишається лише у вкладці (sessionStorage),
   перевіряє його сервер при кожному запиті. */
(function(){
  'use strict';
  var API = 'https://api.eprisjournal.com/book-orders';
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)){
    var qa = new URLSearchParams(location.search).get('api');
    if (qa) API = qa;
  }
  var ST = [['new', 'Нові'], ['contacted', 'Зв’язався'], ['paid', 'Оплачено'], ['shipped', 'Надіслано'], ['done', 'Завершено'], ['cancelled', 'Скасовано']];
  var STN = {}; ST.forEach(function(s){ STN[s[0]] = s[1]; });
  var pw = '', orders = [], filter = 'all';

  var $ = function(id){ return document.getElementById(id); };
  var login = $('login'), panel = $('panel'), list = $('list'), chips = $('chips'), msg = $('msg');

  function get(k){ try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v){ try { v == null ? sessionStorage.removeItem(k) : sessionStorage.setItem(k, v); } catch (e) {} }
  function say(t, bad){ msg.textContent = t || ''; msg.className = 'ba-msg' + (bad ? ' bad' : ''); }

  function api(path, body){
    var opt = { headers: { 'X-Admin-Password': pw } };
    if (body){ opt.method = 'POST'; opt.headers['Content-Type'] = 'application/json'; opt.body = JSON.stringify(body); }
    return fetch(API + path, opt).then(function(r){
      return r.json().catch(function(){ return {}; }).then(function(j){
        if (r.status === 401) throw new Error('auth');
        if (r.status === 429) throw new Error('rate');
        if (!r.ok) throw new Error('fail');
        return j;
      });
    });
  }

  function fmtDate(ts){
    var d = new Date(ts * 1000);
    return d.toLocaleString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
  function msgrLink(o){
    var n = o.phone.replace(/\D/g, '');
    return o.messenger === 'viber' ? 'viber://chat?number=%2B' + n : 'https://wa.me/' + n;
  }
  function el(tag, cls, text){
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function field(label, value){
    var d = el('div'); d.appendChild(el('span', null, label)); d.appendChild(document.createTextNode(value || '–')); return d;
  }

  function renderChips(){
    chips.innerHTML = '';
    var all = [['all', 'Усі']].concat(ST);
    all.forEach(function(s){
      var n = s[0] === 'all' ? orders.length : orders.filter(function(o){ return o.status === s[0]; }).length;
      var b = el('button', 'ba-chip', s[1]);
      b.type = 'button'; b.setAttribute('aria-pressed', filter === s[0] ? 'true' : 'false');
      b.appendChild(el('b', null, String(n)));
      b.addEventListener('click', function(){ filter = s[0]; render(); });
      chips.appendChild(b);
    });
  }

  function card(o){
    var c = el('article', 'ba-card'); c.dataset.status = o.status;
    var top = el('div', 'ba-top');
    top.appendChild(el('span', 'ba-name', o.name));
    top.appendChild(el('span', 'ba-date', '№' + o.id + ' · ' + fmtDate(o.created_at)));
    c.appendChild(top);

    var g = el('div', 'ba-grid');
    g.appendChild(field('Телефон', o.phone));
    g.appendChild(field('Месенджер', o.messenger === 'viber' ? 'Viber' : 'WhatsApp'));
    g.appendChild(field('Кількість', String(o.qty)));
    g.appendChild(field('Доставка', o.place));
    g.appendChild(field('Мова сторінки', o.lang));
    c.appendChild(g);
    if (o.note){ c.appendChild(el('p', 'ba-note', o.note)); }

    var acts = el('div', 'ba-acts');
    var a1 = el('a', null, 'Написати'); a1.href = msgrLink(o); a1.target = '_blank'; a1.rel = 'noopener'; acts.appendChild(a1);
    var a2 = el('a', null, 'Подзвонити'); a2.href = 'tel:' + o.phone; acts.appendChild(a2);
    var cp = el('button', null, 'Скопіювати номер'); cp.type = 'button';
    cp.addEventListener('click', function(){
      if (navigator.clipboard) navigator.clipboard.writeText(o.phone).then(function(){ cp.textContent = 'Скопійовано'; setTimeout(function(){ cp.textContent = 'Скопіювати номер'; }, 1600); });
    });
    acts.appendChild(cp);
    var sel = el('select'); sel.setAttribute('aria-label', 'Статус заявки ' + o.id);
    ST.forEach(function(s){ var op = el('option', null, s[1]); op.value = s[0]; if (s[0] === o.status) op.selected = true; sel.appendChild(op); });
    sel.addEventListener('change', function(){
      api('/admin/update', { id: o.id, status: sel.value }).then(function(){ o.status = sel.value; c.dataset.status = o.status; renderChips(); if (filter !== 'all' && filter !== o.status) render(); })
        .catch(function(){ say('Не вдалося зберегти статус.', true); sel.value = o.status; });
    });
    acts.appendChild(sel);
    var del = el('button', 'del', 'Видалити'); del.type = 'button';
    del.addEventListener('click', function(){
      if (!confirm('Видалити заявку №' + o.id + ' (' + o.name + ')? Це не можна скасувати.')) return;
      api('/admin/delete', { id: o.id }).then(function(){ orders = orders.filter(function(x){ return x.id !== o.id; }); render(); })
        .catch(function(){ say('Не вдалося видалити.', true); });
    });
    acts.appendChild(del);
    c.appendChild(acts);

    var ta = el('textarea'); ta.value = o.admin_note || ''; ta.placeholder = 'Нотатка для себе'; ta.setAttribute('aria-label', 'Нотатка до заявки ' + o.id); ta.rows = 1;
    ta.addEventListener('change', function(){
      api('/admin/update', { id: o.id, admin_note: ta.value }).then(function(){ o.admin_note = ta.value; say('Нотатку збережено.'); })
        .catch(function(){ say('Не вдалося зберегти нотатку.', true); });
    });
    c.appendChild(ta);
    return c;
  }

  function render(){
    renderChips();
    list.innerHTML = '';
    var shown = orders.filter(function(o){ return filter === 'all' || o.status === filter; });
    if (!shown.length){ list.appendChild(el('p', 'ba-empty', orders.length ? 'У цьому статусі заявок немає.' : 'Заявок поки немає.')); return; }
    shown.forEach(function(o){ list.appendChild(card(o)); });
  }

  function refresh(){
    say('Оновлюємо…');
    return api('/admin/list').then(function(j){ orders = j.orders || []; say(''); render(); });
  }

  function enter(){
    login.hidden = true; panel.hidden = false;
    refresh().catch(fail);
  }
  function fail(err){
    if (err && err.message === 'auth'){ set('book-pw', null); pw = ''; panel.hidden = true; login.hidden = false; $('login-msg').textContent = 'Невірний пароль.'; $('login-msg').className = 'ba-msg bad'; return; }
    if (err && err.message === 'rate'){ say('Забагато спроб. Зачекайте кілька хвилин.', true); return; }
    say('Сервер не відповідає.', true);
  }

  login.addEventListener('submit', function(e){
    e.preventDefault();
    pw = $('pw').value;
    if (!pw) return;
    api('/admin/list').then(function(j){ set('book-pw', pw); $('pw').value = ''; orders = j.orders || []; login.hidden = true; panel.hidden = false; say(''); render(); })
      .catch(function(err){
        if (err.message === 'auth'){ $('login-msg').textContent = 'Невірний пароль.'; $('login-msg').className = 'ba-msg bad'; }
        else if (err.message === 'rate'){ $('login-msg').textContent = 'Забагато спроб. Зачекайте кілька хвилин.'; $('login-msg').className = 'ba-msg bad'; }
        else { $('login-msg').textContent = 'Сервер не відповідає.'; $('login-msg').className = 'ba-msg bad'; }
      });
  });
  $('refresh').addEventListener('click', function(){ refresh().catch(fail); });
  $('logout').addEventListener('click', function(){ set('book-pw', null); pw = ''; orders = []; panel.hidden = true; login.hidden = false; $('login-msg').textContent = ''; });
  $('csv').addEventListener('click', function(){
    function q(v){ v = String(v == null ? '' : v); if (/^[=+\-@\t\r]/.test(v)) v = "'" + v; return '"' + v.replace(/"/g, '""') + '"'; }
    var rows = [['id', 'дата', 'ім’я', 'телефон', 'месенджер', 'кількість', 'куди', 'коментар', 'статус', 'нотатка']];
    orders.forEach(function(o){ rows.push([o.id, new Date(o.created_at * 1000).toISOString(), o.name, o.phone, o.messenger, o.qty, o.place, o.note, STN[o.status] || o.status, o.admin_note]); });
    var blob = new Blob(['﻿' + rows.map(function(r){ return r.map(q).join(','); }).join('\r\n')], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'book-orders.csv';
    document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500);
  });

  var saved = get('book-pw');
  if (saved){ pw = saved; enter(); }
})();
