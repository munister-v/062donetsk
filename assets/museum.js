/* Лайтбокс залу: та сама поведінка, що в museum.eprisjournal.com.
   Дані беруться з works-data, картинка з /media/<id>-m.webp. */
(function () {
  var data = document.getElementById('works-data');
  if (!data) return;
  var W = JSON.parse(data.textContent), i = 0, opener = null;

  var lb = document.createElement('div');
  lb.className = 'lb'; lb.id = 'lb'; lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Знімок на весь екран');
  lb.dataset.open = 'false';
  lb.innerHTML =
    '<div class="lb-stage"><img id="lb-img" alt=""></div>' +
    '<div class="lb-bar"><div>' +
      '<span class="w-artist">Донецьк</span>' +
      '<span class="w-title"><i id="lb-title"></i></span>' +
      '<span class="w-meta" id="lb-meta"></span>' +
    '</div><div class="lb-controls">' +
      '<span class="lb-count" id="lb-count"></span>' +
      '<button type="button" id="lb-prev" aria-label="Попередній">←</button>' +
      '<button type="button" id="lb-next" aria-label="Наступний">→</button>' +
      '<button type="button" id="lb-close" aria-label="Закрити">✕</button>' +
    '</div></div>';
  document.body.appendChild(lb);

  var img = lb.querySelector('#lb-img');
  function show(k) {
    i = (k + W.length) % W.length;
    var w = W[i];
    img.src = '/media/' + w.id + '-m.webp';
    img.alt = w.title;
    lb.querySelector('#lb-title').textContent = w.title;
    lb.querySelector('#lb-meta').textContent = (w.year ? w.year + ' · ' : '') + 'авторський архів';
    lb.querySelector('#lb-count').textContent = (i + 1) + ' / ' + W.length;
  }
  function open(k, from) { opener = from; show(k); lb.dataset.open = 'true'; document.body.style.overflow = 'hidden'; }
  function close() {
    lb.dataset.open = 'false'; document.body.style.overflow = '';
    if (opener) { opener.focus(); opener = null; }
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('.plate[data-i]') : null;
    if (!a) return;
    e.preventDefault();
    open(parseInt(a.dataset.i, 10) || 0, a);
  });
  lb.querySelector('#lb-next').onclick = function () { show(i + 1); };
  lb.querySelector('#lb-prev').onclick = function () { show(i - 1); };
  lb.querySelector('#lb-close').onclick = close;
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.className === 'lb-stage') close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.dataset.open !== 'true') return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(i + 1);
    if (e.key === 'ArrowLeft') show(i - 1);
  });
})();
