/* Main App v7 — clean query-param routing (?p=heritage), backwards-compatible with old #heritage */
/* Init CSS vars from localStorage or defaults so wuf-host-* colours work on every page */
(()=>{
  const DEFAULTS = {'--ac':'#E07830','--wuf-blue':'#005ab8','--wuf-pink':'#f48ba2','--wuf-teal':'#c0e5e7'};
  let saved = DEFAULTS;
  try { saved = JSON.parse(localStorage.getItem('donntu_colors')) || DEFAULTS; } catch(e){}
  Object.entries(saved).forEach(([k,v])=>document.documentElement.style.setProperty(k,v));
})();
const VALID_PAGES = new Set([
  'overview','heritage','campus','building','labs','simulation','achievements',
  'archive','certs','future','library','applicant','studentlife',
  'map','timecapsule','eras','science','international','departments','admin','panneau'
]);
const PUBLIC_PAGES = new Set(['overview', 'panneau']);

const getRoutedPage = () => {
  const params = new URLSearchParams(window.location.search);
  const q = (params.get('p') || '').toLowerCase().trim();
  if (VALID_PAGES.has(q)) return q;
  // Backwards-compatible: old links with #heritage still work, but rewrite URL on first load
  const h = window.location.hash.replace('#','').toLowerCase().trim();
  if (VALID_PAGES.has(h)) return h;
  return null;
};

const App = () => {
  const [page, setPage] = React.useState('overview');
  const [lang, setLang] = React.useState('ua');
  const [certId, setCertId] = React.useState(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cert = params.get('cert');
    if (cert) {
      setCertId(cert);
      setPage('cert');
      return;
    }
    // Query/hash routing on first load
    const routed = getRoutedPage();
    if (routed) {
      setPage(routed);
      // If we got here via legacy #hash, rewrite to clean ?p= URL
      if (window.location.hash && !params.get('p')) {
        const cleanUrl = window.location.pathname + '?p=' + routed;
        history.replaceState(null, '', cleanUrl);
      }
    }
  }, []);

  // React to browser back/forward
  React.useEffect(() => {
    const onChange = () => {
      const r = getRoutedPage();
      setPage(r || 'overview');
    };
    window.addEventListener('popstate', onChange);
    window.addEventListener('hashchange', onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('hashchange', onChange);
    };
  }, []);

  const nav = (p) => {
    setPage(p);
    if (p !== 'cert') {
      const url = window.location.pathname + (p === 'overview' ? '' : '?p=' + p);
      history.pushState(null, '', url);
    }
    const main = document.querySelector('.main');
    if (main) main.scrollTop = 0;
    try {
      const v = JSON.parse(localStorage.getItem('donntu_visits') || '{}');
      v[p] = (v[p] || 0) + 1;
      localStorage.setItem('donntu_visits', JSON.stringify(v));
    } catch {}
  };

  const copyLink = (targetPage) => {
    const p = targetPage || page;
    const url = window.location.origin + window.location.pathname + (p === 'overview' ? '' : '?p=' + p);
    try {
      navigator.clipboard.writeText(url);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = url; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCertGenerated = (id) => {
    setCertId(id);
    nav('certs');
  };

  const PM = {
    overview:     OverviewPage,
    panneau:      HeritageDonntuPage,
  };
  const isPublicPage = PUBLIC_PAGES.has(page);
  const P = isPublicPage ? PM[page] : ComingSoonPage;
  const pageProps = isPublicPage
    ? { onNavigate: nav }
    : { onNavigate: nav, requestedPage: page };

  return (
    <Shell cur={page} nav={nav} lang={lang} copyLink={copyLink} copied={copied}>
      <P key={page} {...pageProps} />
    </Shell>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
