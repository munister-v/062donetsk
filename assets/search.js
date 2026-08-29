/* Пошук по підписах. Індекс лежить у самій сторінці: 351 рядок це десятки
   кілобайт, окремий запит на це витрачати нема сенсу. */
(function () {
  var idx = JSON.parse(document.getElementById('search-index').textContent);
  var halls = JSON.parse(document.getElementById('halls-map').textContent);
  var q = document.getElementById('q'), out = document.getElementById('results'),
      count = document.getElementById('count');

  function norm(s) { return (s || '').toLowerCase().replace(/[’'`]/g, ''); }

  function render(list) {
    out.innerHTML = list.slice(0, 120).map(function (w) {
      return '<a class="sib" href="/works/' + w.i + '/">' +
        '<span class="p"><img src="/media/' + w.i + '-s.webp" alt="" loading="lazy" decoding="async"></span>' +
        '<span class="c"><b>' + (halls[w.h] || 'Донецьк') + '</b>' + w.t + '</span></a>';
    }).join('');
  }
  function run() {
    var s = norm(q.value).trim();
    if (s.length < 2) { out.innerHTML = ''; count.textContent = 'введіть слово'; return; }
    var hit = idx.filter(function (w) {
      return norm(w.t).indexOf(s) >= 0 || norm(w.y).indexOf(s) >= 0 || norm(halls[w.h]).indexOf(s) >= 0;
    });
    count.textContent = hit.length ? 'знайдено ' + hit.length : 'нічого не знайшлося';
    render(hit);
  }
  q.addEventListener('input', run);
  var pre = new URLSearchParams(location.search).get('q');
  if (pre) { q.value = pre; run(); }
  q.focus();
})();
