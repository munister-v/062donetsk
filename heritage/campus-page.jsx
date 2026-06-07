/* Campus Page v5 — deepened: displacement locations, було-стало comparison */
const BLDS = [
  { id:'B-01', ua:'Головний корпус', en:'Main Building', x:35, y:52, act:true, depth:'6 поверхів (вежа) · 38 кімнат', use:'Адмін., великі лекційні, Ректорат' },
  { id:'B-02', ua:'Інженерний корпус', en:'Engineering', x:52, y:42, depth:'4 поверхи · 24 кімнати', use:'Автоматизація, кіберсистеми' },
  { id:'B-03', ua:'Лабораторний корпус', en:'Laboratory', x:68, y:62, depth:'4 поверхи · 18 лабораторій', use:'Енергосистеми, гірнича справа' },
  { id:'B-04', ua:'Бібліотека', en:'Library', x:48, y:68, depth:'4 поверхи · 2 чит. зали', use:'Книги, цифрові ресурси, читальний зал' },
  { id:'B-05', ua:'Індустрія 4.0', en:'Industry 4.0', x:72, y:35, depth:'3 поверхи · 12 студій', use:'Цифрова економіка, AI, STEM' },
  { id:'B-06', ua:"Архів пам'яті", en:'Memory Archive', x:30, y:78, depth:'2 поверхи · 4 800 одиниць', use:'Документи, плани, усні свідчення' },
];

const BUILDING_INFO = {
  address: 'вул. Артема, 58, Донецьк, 83001',
  status: 'нині окупована',
  built: '1936–1958',
  style: 'Соціалістичний класицизм (сталінська архітектура)',
  area: '~42 000 м²',
  floors: '6 (головний корпус з вежею), 4 (крила)',
  shape: 'П-подібний (U-shaped)',
};

const DISPLACEMENT_LOCATIONS = [
  {
    id: 'donetsk', name: 'Донецьк', period: '1921–2014', status: 'Окуповано',
    address: 'вул. Артема, 58, Донецьк, 83001',
    desc: 'Історичний кампус. Головний корпус у стилі соціалістичного класицизму (1936–1958). П-подібна будівля з вежею, ~42 000 м². 6 корпусів, бібліотека, 8 гуртожитків, стадіон.',
    stats: { buildings: 6, students: '~20 000', staff: 1500, area: '42 000 м²' },
    color: 'var(--t3)',
  },
  {
    id: 'pokrovsk', name: 'Покровськ', period: '2014–2022', status: 'Евакуйовано',
    address: 'м. Покровськ, Донецька обл.',
    desc: 'Тимчасовий кампус після першого переміщення. Орендовані приміщення, адаптовані під навчальний процес. Збережено основні факультети та наукові школи. Обмежена лабораторна база.',
    stats: { buildings: 2, students: '~4 000', staff: 420, area: '8 000 м²' },
    color: 'var(--amber)',
  },
  {
    id: 'lutsk', name: 'Луцьк', period: '2022–н.ч.', status: 'Активний',
    address: 'м. Луцьк, Волинська обл.',
    desc: 'Основний кампус після другого переміщення. Навчальні корпуси Луцького НТУ, спільне використання аудиторій та лабораторій. Гібридний формат навчання.',
    stats: { buildings: 3, students: '~2 800', staff: 310, area: '12 000 м²' },
    color: 'var(--sage)',
  },
  {
    id: 'drohobych', name: 'Дрогобич', period: '2022–н.ч.', status: 'Активний',
    address: 'м. Дрогобич, Львівська обл.',
    desc: 'Додатковий кампус. Корпуси Дрогобицького державного педагогічного університету. Гірничо-геологічний та екологічний факультети. Близькість до Карпатського регіону — нові можливості для геологічної практики.',
    stats: { buildings: 2, students: '~1 200', staff: 140, area: '6 000 м²' },
    color: 'var(--slate)',
  },
];

const БУЛО_СТАЛО = [
  { category: 'Площа кампусу', було: '42 000 м²', стало: '~18 000 м² (розподілено)', trend: 'down' },
  { category: 'Студенти', було: '~20 000', стало: '~4 000 (очно + дистанційно)', trend: 'down' },
  { category: 'Корпуси', було: '6 корпусів', стало: '7 корпусів (3 міста)', trend: 'up' },
  { category: 'Локації', було: '1 місто', стало: '3 міста + онлайн', trend: 'up' },
  { category: 'Факультети', було: '12 факультетів', стало: '8 факультетів (реорганізовано)', trend: 'neutral' },
  { category: 'Формат навчання', було: '100% очно', стало: 'Гібридний (очно + дистанційно)', trend: 'neutral' },
  { category: 'Бібліотека', було: '2 чит. зали · 500 000 томів', стало: 'Цифрова бібліотека + 1 зал', trend: 'neutral' },
  { category: 'Гуртожитки', було: '8 гуртожитків', стало: '2 гуртожитки (орендовані)', trend: 'down' },
];

// SVG floor plan of main building — schematic U-shape
const FloorPlanSVG = () => (
  <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg"
       style={{width:'100%',height:'100%',maxHeight:420}}>
    <defs>
      <pattern id="fp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,.04)" strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="600" height="420" fill="var(--surface)"/>
    <rect width="600" height="420" fill="url(#fp-grid)"/>

    {/* Main U-shape: top bar + two side wings */}
    {/* Top bar */}
    <rect x="80" y="60" width="440" height="100" fill="rgba(196,132,58,.06)" stroke="rgba(196,132,58,.35)" strokeWidth="1.5" rx="2"/>
    {/* Left wing */}
    <rect x="80" y="60" width="100" height="240" fill="rgba(196,132,58,.05)" stroke="rgba(196,132,58,.3)" strokeWidth="1.5" rx="2"/>
    {/* Right wing */}
    <rect x="420" y="60" width="100" height="240" fill="rgba(196,132,58,.05)" stroke="rgba(196,132,58,.3)" strokeWidth="1.5" rx="2"/>

    {/* Clock tower on top center */}
    <rect x="268" y="28" width="64" height="50" fill="rgba(196,132,58,.1)" stroke="rgba(196,132,58,.5)" strokeWidth="1.5" rx="1"/>
    <text x="300" y="60" textAnchor="middle" fill="rgba(196,132,58,.8)" fontSize="9" fontFamily="Space Mono, monospace">ВЕЖА</text>

    {/* Interior room labels — top bar */}
    <rect x="100" y="75" width="80" height="60" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.08)" strokeWidth="1" rx="1"/>
    <text x="140" y="100" textAnchor="middle" fill="rgba(236,230,220,.5)" fontSize="8" fontFamily="Space Mono, monospace">РЕКТОРАТ</text>

    <rect x="200" y="75" width="120" height="60" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.08)" strokeWidth="1" rx="1"/>
    <text x="260" y="97" textAnchor="middle" fill="rgba(236,230,220,.5)" fontSize="8" fontFamily="Space Mono, monospace">АУД. А-1</text>
    <text x="260" y="110" textAnchor="middle" fill="rgba(168,158,144,.4)" fontSize="7" fontFamily="Space Mono, monospace">300 місць</text>

    <rect x="340" y="75" width="100" height="60" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.08)" strokeWidth="1" rx="1"/>
    <text x="390" y="97" textAnchor="middle" fill="rgba(236,230,220,.5)" fontSize="8" fontFamily="Space Mono, monospace">ДЕКАНАТИ</text>
    <text x="390" y="110" textAnchor="middle" fill="rgba(168,158,144,.4)" fontSize="7" fontFamily="Space Mono, monospace">ФФ 01–04</text>

    {/* Left wing rooms */}
    <rect x="90" y="175" width="80" height="55" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.08)" strokeWidth="1" rx="1"/>
    <text x="130" y="197" textAnchor="middle" fill="rgba(236,230,220,.5)" fontSize="8" fontFamily="Space Mono, monospace">ЧИТАЛЬНИЙ</text>
    <text x="130" y="210" textAnchor="middle" fill="rgba(168,158,144,.4)" fontSize="7" fontFamily="Space Mono, monospace">ЗАЛ</text>

    <rect x="90" y="240" width="80" height="50" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.08)" strokeWidth="1" rx="1"/>
    <text x="130" y="262" textAnchor="middle" fill="rgba(236,230,220,.5)" fontSize="8" fontFamily="Space Mono, monospace">АУД. Б-12</text>
    <text x="130" y="275" textAnchor="middle" fill="rgba(168,158,144,.4)" fontSize="7" fontFamily="Space Mono, monospace">120 місць</text>

    {/* Right wing rooms */}
    <rect x="430" y="175" width="80" height="55" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.08)" strokeWidth="1" rx="1"/>
    <text x="470" y="197" textAnchor="middle" fill="rgba(236,230,220,.5)" fontSize="8" fontFamily="Space Mono, monospace">ЛАБ. КОРП.</text>
    <text x="470" y="210" textAnchor="middle" fill="rgba(168,158,144,.4)" fontSize="7" fontFamily="Space Mono, monospace">18 лаб.</text>

    <rect x="430" y="240" width="80" height="50" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.08)" strokeWidth="1" rx="1"/>
    <text x="470" y="262" textAnchor="middle" fill="rgba(236,230,220,.5)" fontSize="8" fontFamily="Space Mono, monospace">КАФЕДРИ</text>
    <text x="470" y="275" textAnchor="middle" fill="rgba(168,158,144,.4)" fontSize="7" fontFamily="Space Mono, monospace">ГГФ · ЕТФ</text>

    {/* Courtyard label */}
    <text x="300" y="220" textAnchor="middle" fill="rgba(91,158,207,.35)" fontSize="11" fontFamily="Space Mono, monospace">ДВІР</text>
    <text x="300" y="235" textAnchor="middle" fill="rgba(91,158,207,.25)" fontSize="8" fontFamily="Space Mono, monospace">ВНУТРІШНІЙ</text>

    {/* North arrow */}
    <text x="560" y="50" textAnchor="middle" fill="rgba(168,158,144,.5)" fontSize="9" fontFamily="Space Mono, monospace">N</text>
    <line x1="560" y1="55" x2="560" y2="72" stroke="rgba(168,158,144,.4)" strokeWidth="1"/>
    <polygon points="560,55 556,67 564,67" fill="none" stroke="rgba(168,158,144,.4)" strokeWidth="1"/>

    {/* Scale */}
    <line x1="80" y1="390" x2="200" y2="390" stroke="rgba(168,158,144,.3)" strokeWidth="1"/>
    <line x1="80" y1="385" x2="80" y2="395" stroke="rgba(168,158,144,.3)" strokeWidth="1"/>
    <line x1="200" y1="385" x2="200" y2="395" stroke="rgba(168,158,144,.3)" strokeWidth="1"/>
    <text x="140" y="405" textAnchor="middle" fill="rgba(94,90,82,.7)" fontSize="8" fontFamily="Space Mono, monospace">~50М</text>

    {/* Address label */}
    <text x="300" y="360" textAnchor="middle" fill="rgba(168,158,144,.4)" fontSize="8" fontFamily="Space Mono, monospace">ВУЛ. АРТЕМА, 58 · ДОНЕЦЬК</text>
    <text x="300" y="373" textAnchor="middle" fill="rgba(94,90,82,.6)" fontSize="7" fontFamily="Space Mono, monospace">СТИЛЬ: СОЦІАЛІСТИЧНИЙ КЛАСИЦИЗМ · 1936–1958</text>
  </svg>
);

const CampusPage = ({ onNavigate }) => {
  const [sel, setSel] = React.useState('B-01');
  const [vm, setVm] = React.useState('ПЛАН');
  const selected = BLDS.find(b => b.id === sel);

  return (
    <div className="page camp">
      <div className="camp-sub">
        <div style={{display:'flex',gap:'1rem',alignItems:'baseline',flexWrap:'wrap'}}>
          <span className="lbl">03 · КАМПУС · ВІРТУАЛЬНЕ ВІКНО</span>
          <span className="caption" style={{fontStyle:'italic'}}>Розподілений кампус — шість обʼємів.</span>
        </div>
        <div style={{display:'flex',gap:'1rem',alignItems:'center',flexWrap:'wrap'}}>
          {['ПЛАН','ПЛАН ПОВЕРХУ','РОЗРІЗ'].map(m => (
            <button key={m} className={`camp-vb ${vm===m?'act':''}`} onClick={() => setVm(m)}>{m}</button>
          ))}
          <span className="lbl lbl-dim">МАСШТАБ · 1:4000</span>
        </div>
      </div>

      <div className="camp-bd">
        <div className="camp-info">
          <div style={{textAlign:'right'}}>
            <span className="lbl">КОМПАС · ПЛАН</span>
            <div className="compass">
              <span className="c-n">N</span><span className="c-e">E</span>
              <span className="c-s">S</span><span className="c-w">W</span>
            </div>
          </div>
          <div>
            <span className="lbl" style={{display:'block',marginBottom:'0.625rem'}}>ПЕРЕМІЩЕННЯ · ПАМ'ЯТЬ</span>
            <div className="disp-path">
              <span className="disp-i">ДОНЕЦЬК →</span>
              <span className="disp-i" style={{paddingLeft:16}}>ПОКРОВСЬК →</span>
              <span className="disp-i" style={{paddingLeft:32}}>ЛУЦЬК →</span>
              <span className="disp-i tg" style={{paddingLeft:48}}>ДРОГОБИЧ <span style={{fontSize:'0.5rem'}}>●</span></span>
            </div>
            <p className="body" style={{fontSize:'0.75rem',marginTop:'1rem',lineHeight:1.65}}>
              Інституція переміщувалась чотири рази. Кампус — жодного.
            </p>
          </div>
          {vm === 'ПЛАН ПОВЕРХУ' && (
            <div style={{display:'flex',flexDirection:'column',gap:'0.375rem',marginTop:'0.5rem'}}>
              <span className="lbl">СХЕМА · ГОЛОВНИЙ КОРПУС</span>
              <p className="caption" style={{lineHeight:1.65}}>
                П-подібний план. Центральна частина — вежа з годинником. Крила — факультети та лабораторії.
              </p>
              <div style={{marginTop:'0.5rem',display:'flex',flexDirection:'column',gap:4}}>
                {Object.entries(BUILDING_INFO).slice(0,4).map(([k,v]) => (
                  <div key={k} style={{display:'flex',gap:8,fontSize:'0.7rem'}}>
                    <span style={{color:'var(--t3)',fontFamily:'var(--mono)',minWidth:60,fontSize:'0.625rem',textTransform:'uppercase',letterSpacing:'0.08em'}}>{k === 'address' ? 'Адреса' : k === 'built' ? 'Побудовано' : k === 'style' ? 'Стиль' : k === 'status' ? 'Статус' : k}:</span>
                    <span style={{color:'var(--t2)'}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {vm === 'ПЛАН ПОВЕРХУ' ? (
          <div className="camp-floorplan">
            <FloorPlanSVG />
          </div>
        ) : (
          <div className="camp-map">
            <div className="camp-grid"></div>
            {BLDS.map(b => (
              <div key={b.id}
                   className={`camp-mk ${sel===b.id?'sel':''}`}
                   style={{left:b.x+'%',top:b.y+'%'}}
                   onClick={() => setSel(b.id)}>
                <span className={`mk-d ${b.act?'mk-df':''}`}>◇</span>
                <div className="mk-info">
                  <span className="mk-id">{b.id}</span>
                  <span className="mk-name">{b.ua}</span>
                  <span className="mk-en">{b.en}</span>
                </div>
              </div>
            ))}

            {selected && (
              <div className="camp-detail show">
                <div className="gc gc-static" style={{padding:'1.25rem'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'0.625rem'}}>
                    <span className="lbl">{selected.id} · ОБРАНО</span>
                    <button className="modal-close" onClick={() => setSel('')} style={{width:24,height:24,fontSize:'0.75rem',position:'static',marginLeft:'auto'}}>✕</button>
                  </div>
                  <h3 className="h3" style={{fontSize:'1.125rem',fontWeight:600}}>{selected.ua}</h3>
                  <p className="caption" style={{marginTop:'0.25rem'}}>{selected.depth}</p>
                  <p className="body" style={{fontSize:'0.8125rem',marginTop:'0.75rem',color:'var(--t2)'}}>{selected.use}</p>
                  <div style={{display:'flex',gap:'0.5rem',marginTop:'1rem',flexWrap:'wrap'}}>
                    <button className="btn btn-sm btn-g" onClick={() => onNavigate('building')}>УВІЙТИ →</button>
                    <button className="btn btn-sm" onClick={() => onNavigate('labs')}>ЛАБОРАТОРІЇ</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {vm === 'ПЛАН ПОВЕРХУ' && (
        <div className="gc gc-amber" style={{marginTop:'1.25rem',padding:'1.25rem'}}>
          <div style={{display:'flex',gap:'2rem',flexWrap:'wrap'}}>
            {Object.entries(BUILDING_INFO).map(([k,v]) => (
              <div key={k} style={{display:'flex',flexDirection:'column',gap:2}}>
                <span className="lbl lbl-dim" style={{fontSize:'0.5875rem'}}>
                  {k === 'address' ? 'АДРЕСА' : k === 'status' ? 'СТАТУС' : k === 'built' ? 'ПОБУДОВАНО' : k === 'style' ? 'СТИЛЬ' : k === 'area' ? 'ПЛОЩА' : k === 'floors' ? 'ПОВЕРХІВ' : 'ФОРМА'}
                </span>
                <span style={{fontSize:'0.8125rem',color:'var(--t1)'}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="camp-bot">
        <span className="lbl lbl-dim">МАСШТАБ 1:4000 · ВУЗОЛ ЛУЦЬК-02</span>
        <div className="camp-acts">
          <button className="btn btn-g" onClick={() => onNavigate('building')}>УВІЙТИ В КОРПУС</button>
          <button className="btn" onClick={() => onNavigate('labs')}>ЛАБОРАТОРІЇ</button>
          <button className="btn" onClick={() => onNavigate('simulation')}>СИМУЛЯЦІЯ</button>
          <button className="btn" onClick={() => onNavigate('archive')}>АРХІВ</button>
        </div>
      </div>

      {/* DISPLACEMENT LOCATIONS */}
      <div style={{marginTop:'2rem'}}>
        <div className="div-row">
          <span className="lbl">ЛОКАЦІЇ · ГЕОГРАФІЯ ПЕРЕМІЩЕНЬ</span>
          <div className="div-line"></div>
        </div>
        <p className="body" style={{maxWidth:'60ch',marginBottom:'1.25rem'}}>
          Один університет — чотири адреси. Кожне переміщення — втрата і водночас адаптація.
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1rem'}}>
          {DISPLACEMENT_LOCATIONS.map(loc => (
            <div key={loc.id} className="gc" style={{padding:'1.5rem',borderLeft:`3px solid ${loc.color}`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'0.75rem'}}>
                <span className="lbl lbl-amber">{loc.period}</span>
                <span className="badge" style={{
                  borderColor: loc.status === 'Активний' ? 'var(--sage)' : loc.status === 'Окуповано' ? 'var(--err)' : 'var(--amber)',
                  color: loc.status === 'Активний' ? 'var(--sage)' : loc.status === 'Окуповано' ? 'var(--err)' : 'var(--amber)',
                }}>
                  <span className="badge-dot" style={{
                    background: loc.status === 'Активний' ? 'var(--sage)' : loc.status === 'Окуповано' ? 'var(--err)' : 'var(--amber)',
                  }}></span>
                  {loc.status}
                </span>
              </div>
              <h3 className="h3" style={{fontSize:'1.25rem',marginBottom:'0.375rem'}}>{loc.name}</h3>
              <span className="mono caption" style={{display:'block',marginBottom:'0.75rem'}}>{loc.address}</span>
              <p className="caption" style={{lineHeight:1.65,marginBottom:'1rem'}}>{loc.desc}</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.5rem',paddingTop:'0.75rem',borderTop:'1px solid var(--border)'}}>
                <div><span className="lbl lbl-dim" style={{fontSize:'0.5625rem'}}>КОРПУСИ</span><div className="mono" style={{fontSize:'0.875rem',color:'var(--t1)'}}>{loc.stats.buildings}</div></div>
                <div><span className="lbl lbl-dim" style={{fontSize:'0.5625rem'}}>СТУДЕНТИ</span><div className="mono" style={{fontSize:'0.875rem',color:'var(--t1)'}}>{loc.stats.students}</div></div>
                <div><span className="lbl lbl-dim" style={{fontSize:'0.5625rem'}}>ПЕРСОНАЛ</span><div className="mono" style={{fontSize:'0.875rem',color:'var(--t1)'}}>{loc.stats.staff}</div></div>
                <div><span className="lbl lbl-dim" style={{fontSize:'0.5625rem'}}>ПЛОЩА</span><div className="mono" style={{fontSize:'0.875rem',color:'var(--t1)'}}>{loc.stats.area}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* БУЛО — СТАЛО */}
      <div style={{marginTop:'2rem'}}>
        <div className="div-row">
          <span className="lbl">БУЛО — СТАЛО · ПОРІВНЯННЯ ЕПОХ</span>
          <div className="div-line"></div>
        </div>
        <p className="body" style={{maxWidth:'60ch',marginBottom:'1.25rem'}}>
          Що змінилось після подвійного переміщення. Цифри — не вирок, а відправна точка відновлення.
        </p>
        <div className="gc gc-amber" style={{padding:'1.5rem',overflow:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.8125rem'}}>
            <thead>
              <tr style={{borderBottom:'1px solid var(--border)'}}>
                <th style={{textAlign:'left',padding:'0.625rem 0.75rem',fontFamily:'var(--mono)',fontSize:'0.625rem',letterSpacing:'0.1em',color:'var(--t3)',fontWeight:400}}>ПАРАМЕТР</th>
                <th style={{textAlign:'left',padding:'0.625rem 0.75rem',fontFamily:'var(--mono)',fontSize:'0.625rem',letterSpacing:'0.1em',color:'var(--t3)',fontWeight:400}}>БУЛО (2014)</th>
                <th style={{textAlign:'left',padding:'0.625rem 0.75rem',fontFamily:'var(--mono)',fontSize:'0.625rem',letterSpacing:'0.1em',color:'var(--t3)',fontWeight:400}}>СТАЛО (2026)</th>
                <th style={{textAlign:'center',padding:'0.625rem 0.75rem',fontFamily:'var(--mono)',fontSize:'0.625rem',letterSpacing:'0.1em',color:'var(--t3)',fontWeight:400}}>ТРЕНД</th>
              </tr>
            </thead>
            <tbody>
              {БУЛО_СТАЛО.map((row, i) => (
                <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                  <td style={{padding:'0.625rem 0.75rem',fontWeight:600,color:'var(--t1)'}}>{row.category}</td>
                  <td style={{padding:'0.625rem 0.75rem',color:'var(--t2)'}}>{row.було}</td>
                  <td style={{padding:'0.625rem 0.75rem',color:'var(--t2)'}}>{row.стало}</td>
                  <td style={{padding:'0.625rem 0.75rem',textAlign:'center',fontSize:'1rem'}}>
                    {row.trend === 'up' ? '↑' : row.trend === 'down' ? '↓' : '→'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="gc" style={{marginTop:'1rem',padding:'1.5rem',textAlign:'center'}}>
          <span className="lbl lbl-amber">ВИСНОВОК</span>
          <p className="body" style={{marginTop:'0.75rem',maxWidth:'52ch',margin:'0.75rem auto 0',lineHeight:1.7}}>
            Університет втратив 80% площі, 80% студентів. Але зберіг 100% наукових шкіл, 
            100% акредитацій, 100% волі до існування. Розподілений кампус — не слабкість, а нова архітектура стійкості.
          </p>
        </div>
      </div>

      <Inst />
    </div>
  );
};

window.CampusPage = CampusPage;
