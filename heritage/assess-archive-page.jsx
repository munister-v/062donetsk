/* Assessment + Archive Pages v4 — certification system, amber palette */

const generateCertId = () =>
  'DONTU-' + new Date().getFullYear() + '-M01-' +
  Math.random().toString(36).slice(2, 6).toUpperCase();

const AssessmentPage = ({ onNavigate, onCertGenerated }) => {
  const [certGenerated, setCertGenerated] = React.useState(null);
  const [copied, setCopied] = React.useState(false);

  const sc = [
    { l:'РЕАКЦІЯ НА СЦЕНАРІЙ', v:91 },
    { l:'ДОТРИМАННЯ ПРОТОКОЛУ', v:86 },
    { l:'ШВИДКІСТЬ РІШЕНЬ', v:78 },
    { l:'КОМУНІКАЦІЯ РИЗИКУ', v:94 },
  ];
  const ov = Math.round(sc.reduce((s,c) => s+c.v, 0) / sc.length);

  const handleGenerateCert = () => {
    const settings = (() => { try { return JSON.parse(localStorage.getItem('donntu_admin_settings') || '{}'); } catch { return {}; } })();
    const cert = {
      id: generateCertId(),
      student: settings.studentName || 'Студент',
      module: 'Гірнича безпека · Рівень II',
      score: ov,
      date: new Date().toLocaleDateString('uk-UA'),
      issued: new Date().toISOString(),
    };
    try {
      localStorage.setItem('donntu_cert_' + cert.id, JSON.stringify(cert));
    } catch(e) {}
    setCertGenerated(cert);
    if (onCertGenerated) onCertGenerated(cert.id);
  };

  const certUrl = certGenerated
    ? window.location.origin + window.location.pathname + '?cert=' + certGenerated.id
    : '';

  const handleCopy = () => {
    if (certUrl) {
      try { navigator.clipboard.writeText(certUrl); } catch(e) {}
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="page">
      <div className="as-hdr">
        <div>
          <span className="lbl">06 · РЕЗУЛЬТАТ ОЦІНЮВАННЯ</span>
          <h1 className="h1" style={{marginTop:'0.75rem'}}>Гірнича безпека.</h1>
          <p className="body" style={{marginTop:'0.5rem'}}>Сесія 06 · завершено 24 квітня 2026</p>
        </div>
        <div className="as-ov">
          <span className="lbl lbl-amber">ЗАГАЛЬНИЙ БАЛ</span>
          <div className="as-score">{ov}</div>
          <Badge status="featured" label="ВІДМІННО" />
        </div>
      </div>

      <div className="sc-cards">
        {sc.map(s => (
          <div key={s.l} className="gc">
            <span className="lbl">{s.l}</span>
            <div className="sc-v serif">{s.v}</div>
            <Bar value={s.v} />
          </div>
        ))}
      </div>

      <div className="as-bot">
        <div className="gc cert">
          <div className="cert-in">
            <span className="lbl">СЕРТИФІКАТ ЗАВЕРШЕННЯ</span>
            <div className="cert-nm">{(() => { try { return JSON.parse(localStorage.getItem('donntu_admin_settings') || '{}').studentName || 'Студент'; } catch { return 'Студент'; } })()}</div>
            <div style={{color:'var(--t3)',fontSize:'0.875rem',fontStyle:'italic'}}>підтверджує засвоєння модуля</div>
            <div className="cert-co">Гірнича безпека · <em>рівень II</em></div>
            <div className="caption">DonNTU OS · Ректорат · 24.04.2026</div>

            {!certGenerated ? (
              <button
                className="btn btn-g"
                style={{marginTop:'1.25rem',padding:'0.875rem 2rem',fontSize:'0.75rem'}}
                onClick={handleGenerateCert}
              >
                ГЕНЕРУВАТИ СЕРТИФІКАТ →
              </button>
            ) : (
              <div className="cert-gen-box" style={{width:'100%',marginTop:'1.25rem',textAlign:'left'}}>
                <span className="lbl lbl-amber" style={{display:'block',marginBottom:'0.5rem'}}>СЕРТИФІКАТ ВИДАНО</span>
                <div className="cert-id-display">{certGenerated.id}</div>
                <div className="cert-url-display">{certUrl}</div>
                <div style={{display:'flex',gap:'0.5rem',marginTop:'0.875rem',flexWrap:'wrap'}}>
                  <button className="btn btn-sm btn-g" onClick={handleCopy}>
                    {copied ? 'СКОПІЙОВАНО ✓' : 'КОПІЮВАТИ ПОСИЛАННЯ'}
                  </button>
                  <button className="btn btn-sm" onClick={() => onNavigate && onNavigate('certs')}>
                    МОЇ СЕРТИФІКАТИ →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column'}}>
          <span className="lbl">ЗДОБУТО</span>
          <div className="gc gc-static" style={{marginTop:'0.75rem'}}>
            <div className="bdg-row">
              <div className="bdg-ic"><span className="bdg-rm">II</span></div>
              <div>
                <div style={{fontFamily:'var(--sans)',fontSize:'1rem',fontWeight:600}}>Інженер з безпеки II</div>
                <span className="caption">SAFETY ENGINEER II</span>
                <div className="lbl lbl-amber" style={{marginTop:'0.375rem'}}>+120 XP · НОВИЙ РІВЕНЬ</div>
              </div>
            </div>
          </div>

          <span className="lbl" style={{marginTop:'1.5rem'}}>ДАЛІ</span>
          <button className="btn btn-full" style={{marginTop:'0.625rem'}} onClick={() => onNavigate && onNavigate('achievements')}>
            УСІ ДОСЯГНЕННЯ <span>→</span>
          </button>
          <button className="btn btn-full" style={{marginTop:'0.5rem'}} onClick={() => onNavigate && onNavigate('labs')}>
            НАСТУПНА ЛАБОРАТОРІЯ <span>→</span>
          </button>
          {certGenerated && (
            <button className="btn btn-full btn-g" style={{marginTop:'0.5rem'}} onClick={() => onNavigate && onNavigate('certs')}>
              МОЇ СЕРТИФІКАТИ <span>→</span>
            </button>
          )}
          <button className="btn btn-full" style={{marginTop:'0.5rem'}} onClick={() => window.print()}>
            ДРУКУВАТИ СЕРТИФІКАТ <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ARC_F = [
  { id:'all',       ua:'ВСІ' },
  { id:'PHOTOGRAPH', ua:'ФОТО' },
  { id:'PLAN',      ua:'ПЛАНИ' },
  { id:'ORAL',      ua:'УСНІ' },
  { id:'DOCUMENT',  ua:'ДОКУМЕНТИ' },
  { id:'VIDEO',     ua:'ВІДЕО' },
  { id:'ARTIFACT',  ua:'АРТЕФАКТИ' },
];

const ARC_ERAS = [
  { id:'all', label:'ВСІ ЕПОХИ' },
  { id:'founding', label:'1921–1940', from:1921, to:1940 },
  { id:'war', label:'1941–1945', from:1941, to:1945 },
  { id:'soviet', label:'1946–1990', from:1946, to:1990 },
  { id:'independence', label:'1991–2013', from:1991, to:2013 },
  { id:'displacement', label:'2014–н.ч.', from:2014, to:2099 },
];

const ARC_I = [
  { tp:'DOCUMENT', st:'УСТАНОВЧИЙ СТАТУТ', yr:1921, en:'Установчий статут', ua:'Засновницький документ Донецького гірничого практичного інституту',
    desc:'Оригінальний статут 1921 року, транскрибовано та звірено з документами розширення 1976 року. Активація цього артефакту відкриває рідкісну відзнаку «Спадкоємець».',
    feat:true, geo:'Донецьк', img:'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&h=800&fit=crop' },
  { tp:'PHOTOGRAPH', yr:2013, en:'Інженерний корпус', ua:'Головний фасад · до переміщення', geo:'Донецьк', img:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop' },
  { tp:'PHOTOGRAPH', yr:2008, en:'Головний кампус', ua:'Аерофотозйомка · Донецьк', geo:'Донецьк', img:'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&h=400&fit=crop' },
  { tp:'ORAL', yr:2024, en:'Інтерв\'ю проф. Коваленко', ua:'42 роки в інституції · 38 хв', geo:'Луцьк', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop' },
  { tp:'PLAN', yr:1976, en:'План розширення кампусу', ua:'Креслення нових корпусів', geo:'Донецьк', img:'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop' },
  { tp:'DOCUMENT', yr:2014, en:'Запис переміщення', ua:'Протокол евакуації · Покровськ', geo:'Покровськ', img:'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop' },
  { tp:'PHOTOGRAPH', yr:2022, en:'Відкриття кампусу в Луцьку', ua:'Перший день нової адреси', geo:'Луцьк', img:'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop' },
  { tp:'ORAL', yr:2023, en:'Свідчення студентів', ua:'12 голосів · збірка', geo:'Луцьк · Дрогобич', img:'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop' },
  { tp:'PLAN', yr:2025, en:'Карта відновлення', ua:'Інфраструктура Донбасу · робочий план', geo:'Луцьк', img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop' },
  { tp:'PHOTOGRAPH', yr:1936, en:'Будівництво головного корпусу', ua:'Фундамент та перші поверхи · вул. Артема, 58', geo:'Донецьк',
    desc:'Рідкісне фото початку будівництва головного корпусу. Проєкт архітектора у стилі соціалістичного класицизму.',
    img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop' },
  { tp:'DOCUMENT', yr:1941, en:'Наказ про евакуацію', ua:'Евакуація до Прокоп\'євська · Кузбас', geo:'Донецьк → Прокоп\'євськ',
    desc:'Наказ Наркомату освіти про евакуацію інституту до Кузбасу. Збережено частину обладнання та бібліотеку.',
    img:'https://images.unsplash.com/photo-1569025743873-ea3a9ber?w=600&h=400&fit=crop' },
  { tp:'PHOTOGRAPH', yr:1958, en:'Реорганізація в політехнічний', ua:'Церемонія перейменування · Донецький політехнічний', geo:'Донецьк',
    img:'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&h=400&fit=crop' },
  { tp:'ARTIFACT', yr:1971, en:'Ювілейна медаль 50 років', ua:'Пам\'ятна медаль · бронза · Ø 60 мм', geo:'Донецьк',
    desc:'Ювілейна медаль до 50-річчя заснування інституту. Аверс — герб із копром та шестернею, реверс — «1921–1971».',
    img:'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=600&h=400&fit=crop' },
  { tp:'ORAL', yr:2024, en:'Свідчення ректора Завгороднього', ua:'Подвійне переміщення · 45 хв', geo:'Луцьк',
    desc:'Ю.Є. Завгородній розповідає про досвід керівництва університетом під час двох переміщень — 2014 та 2022 років.',
    img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop' },
  { tp:'VIDEO', yr:2022, en:'Евакуація з Покровська', ua:'Документальні кадри · 12 хв', geo:'Покровськ',
    desc:'Відеозапис евакуації обладнання та архівів з Покровська після 24 лютого 2022 року. Знято співробітниками університету.',
    img:'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&h=400&fit=crop' },
  { tp:'PHOTOGRAPH', yr:2000, en:'Церемонія надання національного статусу', ua:'ДонНТУ — національний університет', geo:'Донецьк',
    desc:'Урочисте вручення свідоцтва про надання статусу національного технічного університету.',
    feat:true, img:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop' },
  { tp:'DOCUMENT', yr:2022, en:'Угода з Луцьким НТУ', ua:'Меморандум про співпрацю та спільне використання кампусу', geo:'Луцьк',
    img:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop' },
  { tp:'PLAN', yr:1935, en:'Генеральний план кампусу', ua:'Оригінальне креслення · масштаб 1:500', geo:'Донецьк',
    desc:'Генеральний план розташування корпусів, гуртожитків та навчально-виробничих споруд.',
    img:'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop' },
  { tp:'ARTIFACT', yr:2014, en:'Прапор DonNTU', ua:'Прапор університету, вивезений з Донецька', geo:'Донецьк → Покровськ → Луцьк',
    desc:'Офіційний прапор ДонНТУ, евакуйований у 2014 році. Пройшов три міста разом з університетом.',
    img:'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=600&h=400&fit=crop' },
  { tp:'VIDEO', yr:2024, en:'100 років ДонНТУ — документальний фільм', ua:'Прем\'єра · 52 хв', geo:'Луцьк',
    desc:'Повнометражний документальний фільм до 103-річчя університету. Інтерв\'ю з випускниками, хроніка, сучасні кадри.',
    img:'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop' },
  { tp:'ORAL', yr:2023, en:'Голоси Донбасу — подкаст', ua:'Серія з 8 епізодів · викладачі та студенти', geo:'Луцьк · Дрогобич',
    desc:'Подкаст-серія, де викладачі та студенти діляться досвідом навчання та життя після переміщення.',
    img:'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop' },
];

const ArchivePage = ({ onNavigate }) => {
  const [fi, setFi] = React.useState('all');
  const [era, setEra] = React.useState('all');
  const flt = ARC_I.filter(it => {
    if (fi !== 'all' && it.tp !== fi) return false;
    if (era !== 'all') {
      const e = ARC_ERAS.find(er => er.id === era);
      if (e && (it.yr < e.from || it.yr > e.to)) return false;
    }
    return true;
  });

  return (
    <div className="page">
      <span className="lbl">08 · АРХІВ</span>
      <div className="arc-hero">
        <div>
          <h1 className="arc-h1">Пам'ять — це <em>акт</em>,<br/>а не сховище.</h1>
          <p className="body" style={{marginTop:'1.25rem',fontSize:'1rem',maxWidth:'48ch'}}>
            Не музей. Активна система пам'яті: фотографічний запис, усні свідчення,
            реконструйовані плани, наукові джерела — кожна одиниця повʼязана з
            корпусом, дисципліною та живим свідком.
          </p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'0.75rem'}}>
          <Stat v="4 832" label="Одиниці" />
          <Stat v="412" label="Усні свідчення" />
          <Stat v="89" label="Плани" />
          <Stat v="105" label="Років охоплено" />
        </div>
      </div>

      <div className="arc-filt">
        <div className="arc-tabs">
          {ARC_F.map(f => (
            <button key={f.id} className={`arc-tab ${fi===f.id?'act':''}`} onClick={() => setFi(f.id)}>
              {f.ua}
            </button>
          ))}
        </div>
        <span className="lbl lbl-dim">ПОКАЗАНО {flt.length} З {ARC_I.length}</span>
      </div>

      <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginBottom:'1.25rem'}}>
        {ARC_ERAS.map(e => (
          <button key={e.id} className={`arc-tab ${era===e.id?'act':''}`}
            style={{fontSize:'0.625rem',padding:'0.25rem 0.625rem'}}
            onClick={() => setEra(e.id)}>
            {e.label}
          </button>
        ))}
      </div>

      <div className="arc-grid">
        {flt.map((it,i) => (
          <div key={i} className={`arc-item ${it.feat?'arc-feat':''}`}>
            <div className="arc-img">
              <LazyImg src={it.img} alt={it.en} style={{width:'100%',height:'100%'}} />
              <div className="arc-img-ov"></div>
              {it.feat && (
                <div style={{position:'absolute',top:'1rem',left:'1rem',zIndex:2}}>
                  <Badge status="featured" label="ПОКАЗОВИЙ" />
                </div>
              )}
              <div style={{position:'absolute',bottom:'1rem',left:'1rem',zIndex:2}}>
                <span className="lbl" style={{color:'rgba(255,255,255,.7)'}}>{it.tp} · {it.yr}</span>
              </div>
            </div>
            <div className="arc-info">
              <span className="lbl">{it.tp}{it.st ? ' · ' + it.st : ''}</span>
              <h3 style={{fontFamily:'var(--display)',fontSize:it.feat?'1.75rem':'1.125rem',fontWeight:500,marginTop:'0.5rem',lineHeight:1.25}}>
                {it.en}
              </h3>
              <p className="caption" style={{marginTop:'0.25rem'}}>{it.ua}</p>
              {it.geo && (
                <div style={{display:'flex',alignItems:'center',gap:'0.375rem',marginTop:'0.375rem'}}>
                  <span className="mono" style={{fontSize:'0.6875rem',color:'var(--amber)'}}>◈</span>
                  <span className="caption" style={{color:'var(--t3)'}}>{it.geo}</span>
                </div>
              )}
              {it.desc && <p className="body" style={{fontSize:'0.875rem',marginTop:'0.75rem'}}>{it.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { AssessmentPage, ArchivePage });
