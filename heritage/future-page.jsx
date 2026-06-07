/* Future Page — vision 2030, reconstruction, partnerships */
const VISION_PILLARS = [
  { id:'return', icon:'⟐', title:'Повернення', subtitle:'Донецьк · коли настане мир',
    desc:'Підготовка до повернення в Донецьк. Аудит збережених будівель, план відновлення кампусу, збереження розподіленої моделі навчання як резервної.',
    goals:['Оцінка стану головного кампусу','Проект відбудови з урахуванням сучасних стандартів','Гібридна модель: фізичний + цифровий кампус','Музей переміщень у відновленому корпусі'],
    timeline:'Після деокупації + 3–5 років' },
  { id:'reconstruction', icon:'🏗', title:'Відбудова Донбасу', subtitle:'Місія університету',
    desc:'DonNTU як інтелектуальний хаб відбудови регіону. Підготовка інженерів, екологів, будівельників, енергетиків для масштабного відновлення.',
    goals:['Нові програми: інженерія відбудови, розмінування, екореабілітація','Центр експертизи будівельних конструкцій','Лабораторія переробки будівельних відходів','Консалтинг для міжнародних донорів'],
    timeline:'2025–2035' },
  { id:'digital', icon:'◈', title:'Цифровий університет', subtitle:'DonNTU Heritage OS 2.0',
    desc:'Розвиток цифрового кампусу як повноцінного освітнього середовища. VR-лабораторії, AI-тьютори, глобальний доступ для студентів з діаспори.',
    goals:['VR-лабораторії з тактильним зворотним зв\'язком','AI-тьютор для персоналізованого навчання','Цифрова бібліотека з 50 000+ ресурсів','Блокчейн-сертифікація дипломів'],
    timeline:'2025–2030' },
  { id:'green', icon:'♲', title:'Зелений Донбас', subtitle:'Екологічне відновлення',
    desc:'Донбас після війни потребує екологічної реабілітації. DonNTU готує спеціалістів та розробляє технології для очищення землі, води, повітря.',
    goals:['Моніторинг забруднення від бойових дій','Технології рекультивації мінних полів','Відновлювальна енергетика для регіону','Програма «Чиста вода Донбасу»'],
    timeline:'2025–2040' },
];

const NEW_PROGRAMS = [
  { name:'Інженерія відбудови', degree:'Бакалавр / Магістр', year:2025, status:'active',
    desc:'Проектування, будівництво та відновлення зруйнованої інфраструктури. Сейсмостійкість, модульне будівництво, BIM-технології.', demand:'Критичний' },
  { name:'Кібербезпека критичної інфраструктури', degree:'Магістр', year:2024, status:'active',
    desc:'Захист енергосистем, водопостачання, транспорту від кібератак. Практика на реальних SCADA-системах.', demand:'Високий' },
  { name:'Екологічна реабілітація', degree:'Бакалавр', year:2025, status:'active',
    desc:'Відновлення екосистем після воєнних конфліктів. Рекультивація, демінування, управління відходами.', demand:'Високий' },
  { name:'Зелена енергетика Донбасу', degree:'Магістр', year:2026, status:'new',
    desc:'Перехід регіону на відновлювальні джерела. Сонячна, вітрова енергія, біогаз з шахтного метану.', demand:'Зростаючий' },
  { name:'Цифрове містобудування', degree:'Магістр', year:2026, status:'new',
    desc:'Розумні міста для відновленого Донбасу. IoT, цифрові двійники міст, оптимізація інфраструктури.', demand:'Зростаючий' },
  { name:'Гуманітарне розмінування', degree:'Сертифікат', year:2025, status:'active',
    desc:'Технології виявлення та знешкодження мін. Дрони, роботи, сенсорні системи. Спільна програма з HALO Trust.', demand:'Критичний' },
];

const PARTNERSHIPS = [
  { org:'Технічний університет Дрездена', country:'Німеччина', type:'Академічний', focus:'Спільні магістерські програми, обмін студентами, дослідження з відбудови' },
  { org:'AGH Краків', country:'Польща', type:'Академічний', focus:'Гірнича інженерія, спільні наукові проекти, стажування' },
  { org:'Університет Ватерлоо', country:'Канада', type:'Науковий', focus:'Кібербезпека, AI, грантові дослідження' },
  { org:'НАТО CCDCOE', country:'Естонія', type:'Безпековий', focus:'Кіберзахист критичної інфраструктури, тренінги' },
  { org:'ЮНЕП', country:'Міжнародний', type:'Екологічний', focus:'Оцінка екологічних наслідків війни, програми відновлення' },
  { org:'HALO Trust', country:'Великобританія', type:'Гуманітарний', focus:'Програма гуманітарного розмінування, підготовка спеціалістів' },
  { org:'Фонд відбудови України', country:'Україна', type:'Державний', focus:'Експертиза будівельних проектів, підготовка кадрів для відбудови' },
  { org:'Siemens Energy', country:'Німеччина', type:'Індустріальний', focus:'Модернізація енергосистем, стажування, обладнання для лабораторій' },
];

const ROADMAP = [
  { year:'2025', items:['Запуск програм з відбудови та розмінування','Цифрова бібліотека: 10 000 ресурсів','Партнерство з 5 новими університетами'] },
  { year:'2026', items:['DonNTU Heritage OS 2.0 з VR-лабораторіями','Нові програми: зелена енергетика, цифрове місто','1 500 студентів'] },
  { year:'2027', items:['Центр експертизи з відбудови Донбасу','AI-тьютор для дистанційних студентів','Перші випускники програми відбудови'] },
  { year:'2028', items:['Блокчейн-дипломи для всіх випускників','Лабораторія переробки будівельних відходів','Партнерство з 15 університетами'] },
  { year:'2030', items:['Повернення в Донецьк (за умови деокупації)','Гібридний кампус: фізичний + цифровий','2 500 студентів, 20 нових програм'] },
];

const FuturePage = ({ onNavigate }) => {
  const [expandedPillar, setExpandedPillar] = React.useState('reconstruction');

  return (
    <div className="page">
      <span className="lbl">12 · МАЙБУТНЄ</span>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginTop:'1.5rem',gap:'2rem',flexWrap:'wrap'}}>
        <div style={{maxWidth:'560px'}}>
          <h1 className="h1" style={{fontSize:'2.25rem',lineHeight:1.15}}>
            Будувати <em>майбутнє</em> з руїн.
          </h1>
          <p className="body" style={{marginTop:'1rem',maxWidth:'480px'}}>
            DonNTU не чекає закінчення війни. Університет вже готує інженерів, екологів, будівельників та кіберспеціалістів для відбудови Донбасу та всієї України.
          </p>
        </div>
        <div className="gc gc-gold" style={{minWidth:'260px',padding:'1.25rem',textAlign:'center'}}>
          <span className="lbl lbl-gold">ВІЗІЯ</span>
          <blockquote className="serif" style={{fontSize:'1rem',lineHeight:1.5,marginTop:'0.75rem',fontStyle:'italic'}}>
            «Університет, що відбудує регіон, який його створив.»
          </blockquote>
        </div>
      </div>

      {/* Vision pillars */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">СТРАТЕГІЧНІ НАПРЯМКИ · ВІЗІЯ 2030</span>
        <div className="div-line"></div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1rem',marginTop:'1rem'}}>
        {VISION_PILLARS.map(p => (
          <div key={p.id} className="gc" style={{padding:'1.25rem',cursor:'pointer',borderColor: expandedPillar===p.id ? 'var(--amber)' : undefined}} onClick={() => setExpandedPillar(expandedPillar===p.id ? null : p.id)}>
            <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
              <span style={{fontSize:'1.5rem'}}>{p.icon}</span>
              <div>
                <h3 className="h3" style={{fontWeight:500}}>{p.title}</h3>
                <span className="caption" style={{color:'var(--t3)'}}>{p.subtitle}</span>
              </div>
            </div>
            <p className="body" style={{marginTop:'0.75rem',fontSize:'0.8125rem'}}>{p.desc}</p>

            {expandedPillar===p.id && (
              <div style={{marginTop:'1rem',borderTop:'1px solid var(--border)',paddingTop:'1rem'}}>
                <span className="lbl">ЦІЛІ</span>
                <ul style={{marginTop:'0.5rem',paddingLeft:'1rem'}}>
                  {p.goals.map((g,i) => (
                    <li key={i} className="body" style={{fontSize:'0.8125rem',marginBottom:'0.375rem',color:'var(--t2)'}}>
                      <span style={{color:'var(--amber)',marginRight:'0.5rem'}}>→</span>{g}
                    </li>
                  ))}
                </ul>
                <div style={{marginTop:'0.75rem'}}>
                  <span className="lbl" style={{color:'var(--sage)'}}>ГОРИЗОНТ: {p.timeline}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New programs */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">НОВІ ОСВІТНІ ПРОГРАМИ</span>
        <div className="div-line"></div>
      </div>
      <div style={{marginTop:'1rem'}}>
        {NEW_PROGRAMS.map((p,i) => (
          <div key={i} style={{display:'flex',gap:'1rem',alignItems:'center',padding:'0.875rem 0',borderBottom:'1px solid var(--border)'}}>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'baseline',gap:'0.75rem'}}>
                <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem'}}>{p.name}</h4>
                <Badge status={p.status==='active' ? 'completed' : 'featured'} label={p.status==='active' ? 'АКТИВНА' : 'НОВА'} />
              </div>
              <span className="caption" style={{color:'var(--t3)'}}>{p.degree} · з {p.year}</span>
              <p className="body" style={{marginTop:'0.375rem',fontSize:'0.8125rem',color:'var(--t2)'}}>{p.desc}</p>
            </div>
            <div style={{minWidth:'90px',textAlign:'right'}}>
              <span className="lbl" style={{color: p.demand==='Критичний' ? 'var(--rust)' : p.demand==='Високий' ? 'var(--amber)' : 'var(--sage)'}}>
                ПОПИТ: {p.demand.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Partnerships */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ПАРТНЕРСТВА · МІЖНАРОДНА МЕРЕЖА</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1rem',marginTop:'1rem'}}>
        {PARTNERSHIPS.map((p,i) => (
          <div key={i} className="gc" style={{padding:'1rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <h4 className="h3" style={{fontWeight:500,fontSize:'0.875rem'}}>{p.org}</h4>
              <span className="mono" style={{fontSize:'0.625rem',color:'var(--t3)'}}>{p.country}</span>
            </div>
            <Badge status={p.type==='Академічний'?'open':p.type==='Науковий'?'completed':p.type==='Безпековий'?'elevated':p.type==='Індустріальний'?'featured':'now'} label={p.type.toUpperCase()} />
            <p className="caption" style={{marginTop:'0.5rem',color:'var(--t3)'}}>{p.focus}</p>
          </div>
        ))}
      </div>

      {/* Roadmap */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ДОРОЖНЯ КАРТА · 2025–2030</span>
        <div className="div-line"></div>
      </div>
      <div style={{marginTop:'1rem'}}>
        {ROADMAP.map((r,i) => (
          <div key={i} style={{display:'flex',gap:'1.5rem',marginBottom:'1.5rem'}}>
            <div style={{minWidth:'60px'}}>
              <span className="serif tg" style={{fontSize:'1.5rem',fontWeight:500}}>{r.year}</span>
            </div>
            <div style={{flex:1,borderLeft:'1px solid var(--border)',paddingLeft:'1.5rem'}}>
              {r.items.map((item,j) => (
                <div key={j} style={{display:'flex',alignItems:'baseline',gap:'0.5rem',marginBottom:'0.5rem'}}>
                  <span style={{color:'var(--amber)',fontSize:'0.5rem'}}>●</span>
                  <span className="body" style={{fontSize:'0.875rem'}}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Inst />
    </div>
  );
};

window.FuturePage = FuturePage;
