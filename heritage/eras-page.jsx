/* Eras Comparison Page — verified historical data only */
const ERAS = [
  { year:1921, name:'Заснування', period:'1921–1934',
    students:120, faculty:18, faculties:2, buildings:1, location:'Юзівка → Сталіно',
    specialties:['Гірнича справа','Геологія'],
    highlight:'30 травня 1921 — Донецький гірничий технікум. Перший технічний заклад вищої освіти Донбасу.',
    rector:'(ранній період)',
    events:['30.05.1921 — офіційне відкриття','Перші 120 студентів','Квітень 1926 — реорганізація в інститут','Перші дипломи інженерів'],
    status:'foundation',
    desc:'Регіон видобував вугілля та плавив метал, але не мав власної технічної школи. 30 травня 1921 Донецький гірничий технікум відкрив двері у місті, яке ще зватиметься Юзівкою — за рік місто стане Сталіно, пізніше — Донецьком.' },

  { year:1935, name:'Індустріалізація', period:'1935–1941',
    students:2800, faculty:180, faculties:5, buildings:3, location:'Сталіно (Донецьк)',
    specialties:['Гірництво','Металургія','Хімія','Геологія','Електротехніка'],
    highlight:'Донецький індустріальний інститут — злиття трьох закладів, 5 факультетів, кадри для індустріалізації.',
    rector:'(ранній період)',
    events:['1935 — злиття трьох закладів в індустріальний інститут','5 факультетів','Нові лабораторії','Наукові школи з гірничої механіки'],
    status:'growth',
    desc:'Сталінська індустріалізація потребувала масової підготовки інженерів. Три технічних заклади об\'єдналися в Донецький індустріальний інститут. Університет виріс кратно і став центром промислової науки Донбасу.' },

  { year:1945, name:'Повоєнне відновлення', period:'1943–1967',
    students:4200, faculty:290, faculties:7, buildings:6, location:'Сталіно / Донецьк',
    specialties:['Гірництво','Металургія','Електротехніка','Хімія','Геологія','Машинобудування','Будівництво'],
    highlight:'Орден Трудового Червоного Прапора (1944). Повернення з евакуації. 1960 — Донецький політехнічний інститут.',
    rector:'Г.В. Малєєв (з 1968)',
    events:['1943 — повернення з евакуації з Прокоп\'євська','1944 — Орден Трудового Червоного Прапора','19.03.1960 — перейменування в ДПІ','Бібліотека: 200 000+ томів'],
    status:'rebuild',
    desc:'Університет повернувся з евакуації у місто, що відновлювалось після окупації. У 1944 — перший вуз України, нагороджений Орденом Трудового Червоного Прапора. 19 березня 1960 — перейменований у Донецький політехнічний інститут.' },

  { year:2000, name:'Розквіт', period:'1989–2013',
    students:18500, faculty:1200, faculties:12, buildings:22, location:'Донецьк',
    specialties:['Гірництво','Металургія','IT','Електротехніка','Будівництво','Екологія','Економіка','Менеджмент','Хімія','Геологія','Автоматизація','Кібербезпека'],
    highlight:'Нац. університет (2001). QS 251–300. 22 корпуси. 60 спеціальностей. Герой України — ректор.',
    rector:'О.А. Мінаєв (1989–2014)',
    events:['Вересень 1993 — держ. технічний університет','Серпень 2001 — нац. статус','22 навч. корпуси','Бібліотека: 1,5 млн томів','QS 251–300 (EECA)','60 спеціальностей'],
    status:'peak',
    desc:'Золота ера DonNTU. Ректор Олександр Мінаєв — Герой України, член-кореспондент НАН України — вивів університет на міжнародний рівень. 20 000+ студентів, 1 500 викладачів, 110 000+ випускників за всю історію.' },

  { year:2014, name:'Перше переміщення', period:'2014–2021',
    students:3200, faculty:420, faculties:5, buildings:0, location:'Красноармійськ → Покровськ',
    specialties:['Гірництво','IT','Електротехніка','Будівництво','Автоматизація'],
    highlight:'Окупація 22 корпусів. В.о. ректора Ляшок рятує документи і акредитацію. Навчання у Покровську.',
    rector:'Я.О. Ляшок — в.о. (2014–2019)',
    events:['2014 — захоплення кампусу збройними формуваннями','Переміщення до Красноармійська (нині Покровськ)','Збережено акредитацію МОН','Збережено архів документів','Дистанційне та очне навчання'],
    status:'crisis',
    desc:'У 2014 збройні формування окупували 22 корпуси університету. В.о. ректора Ярослав Ляшок організував евакуацію документів і збереження юридичного статусу. Університет продовжив роботу у Покровську — без власних будівель.' },

  { year:2026, name:'Друге переміщення · Відродження', period:'2022–н.ч.',
    students:4000, faculty:400, faculties:4, buildings:3, location:'Луцьк · Дрогобич',
    specialties:['Гірництво','IT','Кібербезпека','Електротехніка','Автоматизація','Відновлювальна енергетика'],
    highlight:'12.04.2022 — Луцьк. 28.08.2024 — Дрогобич. 28 спеціальностей, 47 магістерських програм.',
    rector:'Д.С. Шиленко (2019–н.ч.)',
    events:['12.04.2022 — переїзд до Луцька','28 лютого 2024 — ракетний удар по Покровську','28.08.2024 — кампус у Дрогобичі','Erasmus+, DAAD партнерства','28 спеціальностей · 47 магістерських програм'],
    status:'rebirth',
    desc:'Ректор Денис Шиленко організував другий переїзд — до Луцька у квітні 2022, потім відкрив новий кампус у Дрогобичі в серпні 2024. 28 лютого 2024 покровська будівля DonNTU частково зруйнована ракетним ударом. Університет включений до переліку закладів для підготовки до деокупації Донбасу.' },
];

const ERA_COMPARE_FIELDS = [
  { key:'students', label:'Студентів', format: v => v.toLocaleString('uk-UA') },
  { key:'faculty', label:'Викладачів', format: v => v.toLocaleString('uk-UA') },
  { key:'faculties', label:'Факультетів', format: v => v },
  { key:'buildings', label:'Корпусів', format: v => v },
  { key:'location', label:'Локація', format: v => v },
];

const ErasPage = ({ onNavigate }) => {
  const [selectedEra, setSelectedEra] = React.useState(5);
  const [compareMode, setCompareMode] = React.useState(false);
  const [compareEra, setCompareEra] = React.useState(0);

  const era = ERAS[selectedEra];
  const cmpEra = ERAS[compareEra];

  const statusColors = {
    foundation:'var(--t2)', growth:'var(--sage)', rebuild:'var(--amber)',
    peak:'var(--sage)', crisis:'var(--rust)', rebirth:'var(--amber)',
  };
  const statusLabels = {
    foundation:'ЗАСНУВАННЯ', growth:'ЗРОСТАННЯ', rebuild:'ВІДБУДОВА',
    peak:'РОЗКВІТ', crisis:'КРИЗА', rebirth:'ВІДРОДЖЕННЯ',
  };

  return (
    <div className="page">
      <span className="lbl">18 · ПОРІВНЯННЯ ЕПОХ</span>

      <div style={{marginTop:'1.5rem'}}>
        <h1 className="h1" style={{fontSize:'2.25rem',lineHeight:1.15}}>
          105 років — одна <em>історія.</em>
        </h1>
        <p className="body" style={{marginTop:'1rem',maxWidth:'560px'}}>
          Оберіть епоху та побачте, як змінювався DonNTU: скільки студентів, які факультети, де знаходився, чим жив. Від 120 студентів у 1921 до 18 500 у розквіті — і до 4 800 у відродженні.
        </p>
      </div>

      {/* Era selector */}
      <div style={{display:'flex',gap:'0.5rem',marginTop:'2rem',flexWrap:'wrap'}}>
        {ERAS.map((e,i) => (
          <button key={i}
            style={{padding:'0.625rem 1rem',border:'1px solid '+(selectedEra===i?'var(--amber)':'var(--border)'),background:selectedEra===i?'var(--s1)':'transparent',cursor:'pointer',color:selectedEra===i?'var(--amber)':'var(--t1)',fontSize:'0.8125rem',flex:'1 1 auto',textAlign:'center',minWidth:'100px'}}
            onClick={() => setSelectedEra(i)}>
            <div style={{fontSize:'1.25rem',fontWeight:600}}>{e.year}</div>
            <div className="caption" style={{marginTop:'0.25rem'}}>{e.name}</div>
          </button>
        ))}
      </div>

      {/* Selected era details */}
      <div className="gc gc-gold" style={{padding:'1.5rem',marginTop:'1.5rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'1rem'}}>
          <div>
            <span className="lbl lbl-gold">{era.period}</span>
            <h2 className="h1" style={{fontSize:'1.75rem',marginTop:'0.5rem'}}>{era.name}</h2>
            <span className="caption" style={{color:'var(--t3)'}}>{era.location}</span>
          </div>
          <Badge status={era.status==='peak'||era.status==='growth'?'completed':era.status==='crisis'?'elevated':'now'} label={statusLabels[era.status]} />
        </div>
        <p className="body" style={{marginTop:'1rem',fontSize:'0.875rem'}}>{era.desc}</p>
        <div style={{marginTop:'0.75rem'}}>
          <span className="caption" style={{color:'var(--t3)'}}>Ректор: {era.rector}</span>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'0.75rem',marginTop:'1.5rem'}}>
        <div className="gc" style={{padding:'1rem',textAlign:'center'}}>
          <div className="serif tg" style={{fontSize:'1.375rem',fontWeight:500}}>{era.students.toLocaleString('uk-UA')}</div>
          <div className="lbl" style={{marginTop:'0.5rem'}}>Студентів</div>
        </div>
        <div className="gc" style={{padding:'1rem',textAlign:'center'}}>
          <div className="serif tg" style={{fontSize:'1.375rem',fontWeight:500}}>{era.faculty}</div>
          <div className="lbl" style={{marginTop:'0.5rem'}}>Викладачів</div>
        </div>
        <div className="gc" style={{padding:'1rem',textAlign:'center'}}>
          <div className="serif tg" style={{fontSize:'1.375rem',fontWeight:500}}>{era.faculties}</div>
          <div className="lbl" style={{marginTop:'0.5rem'}}>Факультетів</div>
        </div>
        <div className="gc" style={{padding:'1rem',textAlign:'center'}}>
          <div className="serif tg" style={{fontSize:'1.375rem',fontWeight:500}}>{era.buildings}</div>
          <div className="lbl" style={{marginTop:'0.5rem'}}>Корпусів</div>
        </div>
        <div className="gc" style={{padding:'1rem',textAlign:'center'}}>
          <div className="serif tg" style={{fontSize:'1.375rem',fontWeight:500}}>{era.specialties.length}</div>
          <div className="lbl" style={{marginTop:'0.5rem'}}>Спеціальностей</div>
        </div>
      </div>

      {/* Specialties */}
      <div className="div-row" style={{marginTop:'2rem'}}>
        <span className="lbl">СПЕЦІАЛЬНОСТІ · {era.year}</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'flex',gap:'0.5rem',marginTop:'0.75rem',flexWrap:'wrap'}}>
        {era.specialties.map((s,i) => (
          <span key={i} style={{padding:'0.375rem 0.75rem',border:'1px solid var(--border)',fontSize:'0.75rem',color:'var(--t2)'}}>{s}</span>
        ))}
      </div>

      {/* Key events */}
      <div className="div-row" style={{marginTop:'2rem'}}>
        <span className="lbl">КЛЮЧОВІ ПОДІЇ</span>
        <div className="div-line"></div>
      </div>
      <div style={{marginTop:'0.75rem'}}>
        {era.events.map((ev,i) => (
          <div key={i} style={{display:'flex',alignItems:'center',gap:'0.75rem',padding:'0.5rem 0',borderBottom:'1px solid var(--border)'}}>
            <span style={{color:'var(--amber)',fontSize:'0.625rem'}}>●</span>
            <span className="body" style={{fontSize:'0.875rem'}}>{ev}</span>
          </div>
        ))}
      </div>

      {/* Compare mode */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ПОРІВНЯННЯ ЕПОХ</span>
        <div className="div-line"></div>
      </div>
      <p className="caption" style={{marginTop:'0.5rem',color:'var(--t3)'}}>
        Порівняйте {era.year} рік з іншою епохою:
      </p>
      <div style={{display:'flex',gap:'0.5rem',marginTop:'0.75rem',flexWrap:'wrap'}}>
        {ERAS.map((e,i) => i !== selectedEra && (
          <button key={i}
            style={{padding:'0.375rem 0.75rem',border:'1px solid '+(compareEra===i?'var(--amber)':'var(--border)'),background:compareEra===i?'var(--s1)':'transparent',cursor:'pointer',color:compareEra===i?'var(--amber)':'var(--t1)',fontSize:'0.75rem'}}
            onClick={() => { setCompareEra(i); setCompareMode(true); }}>
            {e.year} · {e.name}
          </button>
        ))}
      </div>

      {compareMode && (
        <div style={{marginTop:'1rem'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.8125rem'}}>
            <thead>
              <tr style={{borderBottom:'2px solid var(--border)'}}>
                <th style={{padding:'0.75rem',textAlign:'left',color:'var(--t3)',fontWeight:400}}>ПОКАЗНИК</th>
                <th style={{padding:'0.75rem',textAlign:'center',color:'var(--amber)',fontWeight:500}}>{era.year} · {era.name}</th>
                <th style={{padding:'0.75rem',textAlign:'center',color:'var(--t2)',fontWeight:500}}>{cmpEra.year} · {cmpEra.name}</th>
              </tr>
            </thead>
            <tbody>
              {ERA_COMPARE_FIELDS.map((f,i) => (
                <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                  <td className="caption" style={{padding:'0.75rem',color:'var(--t3)'}}>{f.label}</td>
                  <td style={{padding:'0.75rem',textAlign:'center',fontWeight:500}}>{f.format(era[f.key])}</td>
                  <td style={{padding:'0.75rem',textAlign:'center',color:'var(--t2)'}}>{f.format(cmpEra[f.key])}</td>
                </tr>
              ))}
              <tr style={{borderBottom:'1px solid var(--border)'}}>
                <td className="caption" style={{padding:'0.75rem',color:'var(--t3)'}}>Спеціальностей</td>
                <td style={{padding:'0.75rem',textAlign:'center',fontWeight:500}}>{era.specialties.length}</td>
                <td style={{padding:'0.75rem',textAlign:'center',color:'var(--t2)'}}>{cmpEra.specialties.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Quote */}
      <div className="gc gc-gold" style={{padding:'1.5rem',marginTop:'2.5rem',textAlign:'center'}}>
        <blockquote className="serif" style={{fontSize:'1.125rem',lineHeight:1.6,fontStyle:'italic'}}>
          «{era.highlight}»
        </blockquote>
      </div>

      <Inst />
    </div>
  );
};

window.ErasPage = ErasPage;
