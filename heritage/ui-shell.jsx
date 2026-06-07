/* UI Shell v6 — WUF13 style: fixed navbar, no sidebar, no statusbar */
const PAGES = [
  { id:'overview',     n:'01', ua:'Огляд' },
  { id:'heritage',     n:'02', ua:'Спадщина',     core:true },
  { id:'campus',       n:'03', ua:'Кампус' },
  { id:'building',     n:'04', ua:'Корпус' },
  { id:'labs',         n:'05', ua:'Лабораторії' },
  { id:'achievements', n:'07', ua:'Досягнення',   core:true },
  { id:'archive',      n:'08', ua:'Архів' },
  { id:'certs',        n:'09', ua:'Сертифікати',  core:true },
  { id:'future',       n:'12', ua:'Майбутнє',     core:true },
  { id:'library',      n:'13', ua:'Бібліотека' },
  { id:'applicant',    n:'14', ua:'Абітурієнту',  core:true },
  { id:'studentlife',  n:'15', ua:'Студентське життя' },
  { id:'map',          n:'16', ua:'Мапа',         core:true },
  { id:'timecapsule',  n:'17', ua:'Часова капсула' },
  { id:'eras',         n:'18', ua:'Порівняння епох' },
  { id:'science',      n:'20', ua:'Наука' },
  { id:'international',n:'21', ua:'Міжнародне' },
  { id:'departments',  n:'22', ua:'Кафедри',       core:true },
  { id:'panneau',      n:'23', ua:'Панно',         core:true },
];

/* WUF13-style top navbar — logo · nav links · CTA */
const TopBar = ({ cur, nav }) => {
  const NAV_LINKS = [
    { id:'overview',  ua:'Огляд' },
    { id:'panneau',   ua:'Панно' },
    { id:'heritage',  ua:'Розділи · скоро', locked:true },
  ];

  const MOBILE_MENU_LINKS = [
    { id:'overview',     ua:'Огляд' },
    { id:'panneau',      ua:'Панно' },
    { id:'heritage',     ua:'Інші розділи · скоро', locked:true },
  ];

  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogoClick = () => {
    nav('overview');
    setMenuOpen(false);
  };

  const handleNav = (id) => {
    nav(id);
    setMenuOpen(false);
  };

  return (
    <header className="wuf-nav">
      {/* Logo */}
      <div className="wuf-nav-logo" onClick={handleLogoClick} title="На головну Heritage">
        <div className="wuf-nav-logo-mark">
          <img src="assets/logo/logo_D_white.png" alt="DONNTU" />
        </div>
        <div className="wuf-nav-logo-text">
          <span className="wuf-nav-brand">DONNTU</span>
          <span className="wuf-nav-sub">ЦИФРОВА СПАДЩИНА</span>
        </div>
      </div>

      {/* Nav links (desktop) */}
      <nav className="wuf-nav-links">
        {NAV_LINKS.map(l => (
          <button
            key={l.id}
            className={`wuf-nav-link ${cur === l.id ? 'act' : ''} ${l.locked ? 'is-locked' : ''}`}
            onClick={() => handleNav(l.id)}
          >
            {l.ua}
          </button>
        ))}
      </nav>

      {/* CTA */}
      <div className="wuf-nav-cta">
        <a className="heritage-parent-link" href="../">062.DN.UA</a>
        <span className="wuf-nav-state">
          {cur === 'panneau' ? 'Інтерактивне панно' : 'Огляд проєкту'}
        </span>
        <button className="btn btn-g wuf-nav-btn" onClick={() => handleNav('panneau')}>
          ВІДКРИТИ ПАННО →
        </button>
        {/* Burger button (mobile only) */}
        <button
          className={`wuf-nav-burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Меню"
        >
          <span/><span/><span/>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="wuf-mobile-menu" onClick={() => setMenuOpen(false)}>
          {MOBILE_MENU_LINKS.map(l => (
            <button
              key={l.id}
              className={`wuf-mobile-link ${cur === l.id ? 'act' : ''} ${l.locked ? 'is-locked' : ''}`}
              onClick={(e) => { e.stopPropagation(); handleNav(l.id); }}
            >
              {l.ua}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

/* Full-width shell — no sidebar, no statusbar */
const Shell = ({ cur, nav, lang, children, copyLink, copied }) => (
  <div className="shell">
    <TopBar cur={cur} nav={nav} lang={lang} copyLink={copyLink} copied={copied} />
    <main className="main">{children}</main>
  </div>
);

const Inst = () => (
  <div className="inst">
    <span className="lbl">ВУЗОЛ</span>
    <span className="lbl-dim">NODE · LUTSK-02</span>
    <span className="lbl-dim">50.7472°N · 25.3254°E</span>
  </div>
);

const Badge = ({ status, label }) => {
  const colors = {
    open:'var(--t2)', completed:'var(--sage)', flagship:'var(--sage)',
    now:'var(--amber)', featured:'var(--amber)', elevated:'var(--rust)',
    locked:'var(--t3)', earned:'var(--amber)', rare:'var(--violet)',
  };
  const c = colors[status] || colors.open;
  return (
    <span className="badge" style={{ borderColor: c+'44' }}>
      <span className="badge-dot" style={{ background: c }}></span>
      {label||status.toUpperCase()}
    </span>
  );
};

const Bar = ({ value, max=100, variant='gold' }) => (
  <div className="bar">
    <div className={`bar-fill ${variant==='cyan'?'bar-c':variant==='green'?'bar-g':''}`}
         style={{ width: Math.min(100, value/max*100) + '%' }}></div>
  </div>
);

const PDots = ({ filled, total=5 }) => (
  <span className="pdots">
    {Array.from({length:total},(_,i) =>
      <span key={i} className={i<filled?'pd-f':'pd-e'}>●</span>
    )}
  </span>
);

const Stat = ({ v, label }) => (
  <div className="stat">
    <div className="stat-v">{v}</div>
    <span className="stat-l">{label}</span>
  </div>
);

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="gc modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
};

const LazyImg = ({ src, alt, style, className, fallbackText }) => {
  const [status, setStatus] = React.useState('loading');

  React.useEffect(() => {
    if (!src) { setStatus('error'); return; }
    setStatus('loading');
    const img = new window.Image();
    img.onload = () => setStatus('loaded');
    img.onerror = () => setStatus('error');
    img.src = src;
    return () => { img.onload = null; img.onerror = null; };
  }, [src]);

  return (
    <div style={{ position:'relative', overflow:'hidden', background:'var(--s1)', ...style }} className={className}>
      {status === 'loading' && (
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(90deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)',
          backgroundSize:'200% 100%',
          animation:'shimmer 1.4s ease infinite',
        }}/>
      )}
      {status !== 'error' && src && (
        <img src={src} alt={alt||''}
          loading="lazy"
          decoding="async"
          style={{
            width:'100%', height:'100%', objectFit:'cover', display:'block',
            opacity: status === 'loaded' ? 1 : 0,
            transition:'opacity 0.5s ease',
          }}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
      {status === 'error' && (
        <div style={{
          position:'absolute', inset:0, display:'flex',
          flexDirection:'column', alignItems:'center', justifyContent:'center',
          gap:'0.5rem',
        }}>
          <span style={{fontSize:'1.25rem', opacity:0.2}}>⊡</span>
          <span style={{fontFamily:'var(--mono)', fontSize:'0.5625rem', color:'var(--t3)', letterSpacing:'0.06em'}}>
            {fallbackText || 'ЗОБРАЖЕННЯ НЕДОСТУПНЕ'}
          </span>
          {src && <button onClick={() => setStatus('loading')} style={{
            fontFamily:'var(--mono)', fontSize:'0.5rem', color:'var(--t3)',
            background:'none', border:'1px solid var(--b2)', cursor:'pointer',
            padding:'0.2rem 0.5rem', letterSpacing:'0.06em', marginTop:'0.25rem',
          }}>↺ RETRY</button>}
        </div>
      )}
    </div>
  );
};

/* ── SectionNav — sticky in-page anchor links ── */
/* Usage: <SectionNav sections={[{id:'overview', label:'Огляд'}, ...]} /> */
const SectionNav = ({ sections, style }) => {
  const [active, setActive] = React.useState(sections[0]?.id);

  React.useEffect(() => {
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections.map(s => s.id).join(',')]);

  const scroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: '0.35rem',
      marginBottom: '1.5rem',
      padding: '0.6rem 0',
      borderBottom: '1px solid var(--b1)',
      position: 'sticky', top: 0, zIndex: 10,
      background: 'var(--bg)',
      backdropFilter: 'blur(8px)',
      ...style,
    }}>
      {sections.map(s => (
        <button
          key={s.id}
          onClick={() => scroll(s.id)}
          style={{
            fontFamily: 'var(--mono)', fontSize: '0.5rem', letterSpacing: '0.07em',
            background: active === s.id ? 'rgba(196,132,58,0.1)' : 'none',
            border: '1px solid ' + (active === s.id ? 'var(--amber)' : 'var(--b2)'),
            color: active === s.id ? 'var(--amber)' : 'var(--t3)',
            padding: '0.25rem 0.6rem', borderRadius: '2px', cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
};

Object.assign(window, { PAGES, Shell, Inst, Badge, Bar, PDots, Stat, Modal, LazyImg, SectionNav });
