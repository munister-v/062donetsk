/* Certificate Page + CertsList — v4 */

const CertSeal = () => (
  <div className="cert-seal">
    <div className="cert-seal-inner">
      Don<br/>NTU
    </div>
  </div>
);

const CertPage = ({ certId, certData, onBack }) => {
  const [copied, setCopied] = React.useState(false);

  if (!certId) {
    return (
      <div className="cert-page">
        <div style={{textAlign:'center',padding:'4rem 2rem'}}>
          <span className="lbl">СЕРТИФІКАТ</span>
          <h2 className="h2" style={{marginTop:'1rem',marginBottom:'1rem'}}>Ідентифікатор не вказано</h2>
          <button className="btn btn-g" onClick={onBack}>← ПОВЕРНУТИСЬ</button>
        </div>
      </div>
    );
  }

  if (!certData) {
    return (
      <div className="cert-page">
        <div style={{textAlign:'center',padding:'4rem 2rem'}}>
          <span className="lbl lbl-dim">404 · СЕРТИФІКАТ НЕ ЗНАЙДЕНО</span>
          <h2 className="h2" style={{marginTop:'1rem',marginBottom:'0.5rem'}}>
            Сертифікат <code style={{fontFamily:'var(--mono)',fontSize:'0.875em',color:'var(--amber)'}}>{certId}</code> не існує.
          </h2>
          <p className="body" style={{marginTop:'0.75rem',marginBottom:'1.5rem'}}>
            Можливо, він не був збережений у цьому браузері, або посилання є невірним.
          </p>
          <button className="btn btn-g" onClick={onBack}>← ПОВЕРНУТИСЬ</button>
        </div>
      </div>
    );
  }

  const certUrl = window.location.origin + window.location.pathname + '?cert=' + certData.id;

  const handleCopy = () => {
    try { navigator.clipboard.writeText(certUrl); } catch(e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scoreLabel = certData.score >= 90 ? 'ВІДМІННО' : certData.score >= 75 ? 'ДОБРЕ' : certData.score >= 60 ? 'ЗАДОВІЛЬНО' : 'ЗАВЕРШЕНО';

  return (
    <div className="cert-page">
      <div style={{display:'flex',gap:'0.75rem',marginBottom:'1.5rem',width:'100%',maxWidth:720}}>
        <button className="btn btn-sm" onClick={onBack}>← ПОВЕРНУТИСЬ</button>
        <span className="lbl lbl-dim" style={{display:'flex',alignItems:'center'}}>СЕРТИФІКАТ · {certData.id}</span>
      </div>

      <div className="cert-card">
        {/* Top label */}
        <div className="cert-title-line">ДОНЕЦЬКИЙ НАЦІОНАЛЬНИЙ ТЕХНІЧНИЙ УНІВЕРСИТЕТ</div>
        <div className="cert-title-line" style={{marginBottom:'1.25rem'}}>СЕРТИФІКАТ ЗАВЕРШЕННЯ · CERTIFICATE OF COMPLETION</div>

        <CertSeal />

        <div className="cert-title-line">цей сертифікат підтверджує, що</div>
        <div className="cert-student-name">{certData.student}</div>
        <div className="cert-confirms">успішно завершив(ла) навчальний модуль</div>
        <div className="cert-module-name">{certData.module}</div>

        <div className="cert-meta-row">
          <div className="cert-meta-item">
            <span className="cert-meta-value" style={{color:'var(--amber)'}}>{certData.score}</span>
            <span className="cert-meta-label">ЗАГАЛЬНИЙ БАЛ</span>
          </div>
          <div className="cert-meta-item">
            <span className="cert-meta-value">{certData.date}</span>
            <span className="cert-meta-label">ДАТА ВИДАЧІ</span>
          </div>
          <div className="cert-meta-item">
            <span className="cert-meta-value" style={{fontSize:'1.25rem',color:'var(--sage)'}}>{scoreLabel}</span>
            <span className="cert-meta-label">ОЦІНКА</span>
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'0.625rem'}}>
          <div className="cert-title-line">ідентифікатор сертифіката</div>
          <div className="cert-id">{certData.id}</div>
          <div className="cert-title-line" style={{marginTop:'0.75rem'}}>посилання для перевірки</div>
          <div className="cert-link">{certUrl}</div>
        </div>

        <div style={{marginTop:'1.25rem',textAlign:'center',paddingTop:'1.25rem',borderTop:'1px solid rgba(255,255,255,.06)'}}>
          <span className="caption">DonNTU OS · Ректорат · Цифровий кампус · donntu.org</span>
        </div>
      </div>

      <div className="cert-actions">
        <button className="btn btn-g" onClick={handleCopy}>
          {copied ? '✓ СКОПІЙОВАНО' : 'КОПІЮВАТИ ПОСИЛАННЯ'}
        </button>
        <button className="btn" onClick={() => window.print()}>
          ДРУКУВАТИ СЕРТИФІКАТ
        </button>
        <button className="btn" onClick={onBack}>
          ПОВЕРНУТИСЬ
        </button>
      </div>
    </div>
  );
};

// Certs list page — shows all saved certs from localStorage
const CertsListPage = ({ onNavigate }) => {
  const [certs, setCerts] = React.useState([]);
  const [viewCert, setViewCert] = React.useState(null);

  React.useEffect(() => {
    const found = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('donntu_cert_')) {
          const data = JSON.parse(localStorage.getItem(key) || 'null');
          if (data) found.push(data);
        }
      }
    } catch(e) {}
    found.sort((a, b) => new Date(b.issued) - new Date(a.issued));
    setCerts(found);
  }, []);

  if (viewCert) {
    return (
      <CertPage
        certId={viewCert.id}
        certData={viewCert}
        onBack={() => setViewCert(null)}
      />
    );
  }

  return (
    <div className="page">
      <span className="lbl">09 · СЕРТИФІКАТИ · ЦИФРОВІ ВІДЗНАКИ ⟡</span>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginTop:'1rem',marginBottom:'2rem',gap:'1.5rem',flexWrap:'wrap'}}>
        <div>
          <h1 className="h1">Сертифікати</h1>
          <p className="body" style={{marginTop:'0.5rem',fontSize:'1rem',maxWidth:'50ch'}}>
            Кожен сертифікат — підтвердження знань, отриманих у стінах відтвореного університету.
            Унікальне посилання дозволяє поділитися досягненням.
          </p>
        </div>
        <div style={{display:'flex',gap:'1.5rem'}}>
          <div>
            <div className="stat-v" style={{color:'var(--amber)'}}>{certs.length}</div>
            <span className="stat-l">СЕРТИФІКАТІВ</span>
          </div>
        </div>
      </div>

      {certs.length === 0 ? (
        <div className="gc gc-amber" style={{padding:'3rem',textAlign:'center',marginTop:'1rem'}}>
          <span className="lbl lbl-dim" style={{display:'block',marginBottom:'1rem'}}>СЕРТИФІКАТІВ НЕ ЗНАЙДЕНО</span>
          <h2 className="h3" style={{marginBottom:'1rem'}}>Пройдіть тест, щоб отримати перший сертифікат</h2>
          <p className="body" style={{maxWidth:'44ch',margin:'0 auto 1.5rem'}}>
            Після завершення оцінювання ви зможете згенерувати сертифікат з унікальним ID та персональним посиланням.
          </p>
          <button className="btn btn-g" onClick={() => onNavigate && onNavigate('assessment')}>
            ПРОЙТИ ОЦІНЮВАННЯ →
          </button>
        </div>
      ) : (
        <>
          <div className="certs-grid">
            {certs.map(cert => (
              <div key={cert.id} className="gc cert-list-item" onClick={() => setViewCert(cert)}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'0.5rem'}}>
                  <span className="lbl lbl-amber">DonNTU</span>
                  <Badge status="earned" label="ВИДАНО" />
                </div>
                <div className="cert-list-item-name">{cert.student}</div>
                <div className="cert-list-item-module">{cert.module}</div>
                <div className="cert-list-item-meta">
                  <span className="lbl lbl-dim">{cert.id}</span>
                  <span style={{fontFamily:'var(--display)',fontSize:'1.25rem',fontWeight:300,color:'var(--amber)'}}>{cert.score}</span>
                </div>
                <div style={{marginTop:'0.5rem'}}>
                  <span className="caption">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:'2rem',textAlign:'center'}}>
            <button className="btn btn-g" onClick={() => onNavigate && onNavigate('assessment')}>
              ПРОЙТИ ЩЕ ОДНЕ ОЦІНЮВАННЯ →
            </button>
          </div>
        </>
      )}

      <Inst />
    </div>
  );
};

Object.assign(window, { CertPage, CertsListPage });
