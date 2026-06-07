/* International Relations Page — partnerships, exchanges, grants */
const PARTNER_UNIVERSITIES = [
  { name:'Технічний університет Дрездена', country:'Німеччина', since:2016, type:'erasmus',
    desc:'Партнерство через Erasmus+. Обмін студентами та викладачами у сфері гірничої інженерії та екології. 45 студентів DonNTU пройшли стажування.',
    programs:['Обмін студентами','Спільні дослідження','Літні школи'] },
  { name:'Краківська гірничо-металургійна академія (AGH)', country:'Польща', since:2015, type:'bilateral',
    desc:'Найближчий партнер. Спільні наукові проекти з геомеханіки та екології шахт. Подвійні дипломи для магістрів. 30+ спільних публікацій.',
    programs:['Подвійний диплом (магістр)','Спільні конференції','Наукове стажування'] },
  { name:'Університет Лоррен', country:'Франція', since:2018, type:'erasmus',
    desc:'Співпраця у сфері матеріалознавства та металургії. Французька програма підтримки переміщених університетів. 12 студентів на семестровому обміні.',
    programs:['Семестровий обмін','Дослідницькі гранти','Мовні курси'] },
  { name:'Талліннський технічний університет (TalTech)', country:'Естонія', since:2019, type:'bilateral',
    desc:'Партнерство у кібербезпеці та цифровій трансформації. Спільний кіберполігон. Естонський досвід e-governance для українських міст.',
    programs:['Кіберполігон','Цифрова трансформація','Студентські проекти'] },
  { name:'RWTH Aachen', country:'Німеччина', since:2020, type:'daad',
    desc:'Програма DAAD для підтримки українських університетів. Стажування для молодих дослідників. Спільні проекти з відновлюваної енергетики.',
    programs:['DAAD стажування','Енергетичні дослідження','Менторська програма'] },
  { name:'Університет Ньюкасла', country:'Великобританія', since:2022, type:'bilateral',
    desc:'Співпраця після повномасштабного вторгнення. Підтримка переміщених дослідників. Спільний проект з відбудови постконфліктних територій.',
    programs:['Підтримка дослідників','Відбудова територій','Онлайн-лекції'] },
  { name:'Університет Вітватерсранд', country:'ПАР', since:2017, type:'bilateral',
    desc:'Історичний партнер у гірничій справі. Обмін досвідом глибоких шахт (найглибші шахти світу — у ПАР та Донбасі). Спільні дослідження.',
    programs:['Гірнича інженерія','Обмін досвідом','Наукові публікації'] },
  { name:'Технічний університет Острави', country:'Чехія', since:2016, type:'erasmus',
    desc:'Партнерство через Erasmus+. Гірнича інженерія та екологія. Чеська програма підтримки українських студентів після 2022 року.',
    programs:['Erasmus+ обмін','Екологічні проекти','Літні школи'] },
];

const INTL_GRANTS = [
  { name:'Erasmus+ KA171', funder:'Європейський Союз', period:'2023–2026', amount:'€420 000',
    desc:'Міжнародна кредитна мобільність. Обмін студентами та викладачами з 5 університетами ЄС. 60 мобільностей за 3 роки.',
    status:'active' },
  { name:'DAAD «Підтримка українських університетів»', funder:'DAAD (Німеччина)', period:'2022–2025', amount:'€180 000',
    desc:'Стажування для молодих дослідників DonNTU в Німеччині. Обладнання для лабораторій. Підтримка переміщеного університету.',
    status:'completed' },
  { name:'NATO SPS «Кіберзахист критичної інфраструктури»', funder:'NATO', period:'2024–2027', amount:'€250 000',
    desc:'Спільний проект з TalTech (Естонія) та AGH (Польща). Розробка методології кіберзахисту промислових систем. Створення кіберполігону.',
    status:'active' },
  { name:'ЮНЕП «Екологічний моніторинг Донбасу»', funder:'ООН (ЮНЕП)', period:'2023–2026', amount:'$320 000',
    desc:'Моніторинг екологічних наслідків війни. Забруднення ґрунтів, води, повітря. Оцінка ризиків від затоплення шахт та руйнування промислових об\'єктів.',
    status:'active' },
  { name:'Світовий банк «Відбудова інфраструктури»', funder:'Світовий банк', period:'2025–2028', amount:'$500 000',
    desc:'Розробка інженерних рішень для відбудови Донбасу. Навчальні програми для інженерів-відбудовників. Пілотні проекти відновлення.',
    status:'active' },
  { name:'British Council «Дослідники в ризику»', funder:'British Council', period:'2022–2024', amount:'£95 000',
    desc:'Підтримка дослідників, які постраждали від війни. Стажування в Університеті Ньюкасла. Онлайн-менторство.',
    status:'completed' },
];

const EXCHANGE_STATS = [
  { v:'8', label:'Університетів-партнерів', desc:'У 7 країнах світу' },
  { v:'145', label:'Студентських обмінів', desc:'За 2016–2026 роки' },
  { v:'6', label:'Активних грантів', desc:'Від ЄС, НАТО, ООН, Світового банку' },
  { v:'€1.77M', label:'Грантове фінансування', desc:'Залучено за 2022–2028' },
  { v:'32', label:'Спільних публікацій', desc:'З міжнародними партнерами' },
  { v:'7', label:'Країн-партнерів', desc:'Від Великобританії до ПАР' },
];

const PARTNER_TYPES = { erasmus:'ERASMUS+', bilateral:'ДВОСТОРОННІЙ', daad:'DAAD' };

const InternationalPage = ({ onNavigate }) => {
  const [expandedPartner, setExpandedPartner] = React.useState(null);
  const [expandedGrant, setExpandedGrant] = React.useState(null);
  const [filter, setFilter] = React.useState('all');

  const filteredPartners = filter === 'all' ? PARTNER_UNIVERSITIES : PARTNER_UNIVERSITIES.filter(p => p.type === filter);

  return (
    <div className="page">
      <span className="lbl">21 · МІЖНАРОДНЕ</span>

      <div style={{marginTop:'1.5rem'}}>
        <h1 className="h1" style={{fontSize:'2.25rem',lineHeight:1.15}}>
          Без кордонів — <em>попри все.</em>
        </h1>
        <p className="body" style={{marginTop:'1rem',maxWidth:'580px'}}>
          Війна змусила DonNTU переміститися, але відкрила нові можливості. 8 університетів-партнерів у 7 країнах. Гранти від ЄС, НАТО, ООН, Світового банку. 145 студентських обмінів. Міжнародна спільнота, яка допомагає відновлювати Донбас.
        </p>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'0.75rem',marginTop:'2rem'}}>
        {EXCHANGE_STATS.map((s,i) => (
          <div key={i} className="gc" style={{padding:'1rem',textAlign:'center'}}>
            <div className="serif tg" style={{fontSize:'1.375rem',fontWeight:500}}>{s.v}</div>
            <div className="lbl" style={{marginTop:'0.5rem'}}>{s.label}</div>
            <div className="caption" style={{marginTop:'0.25rem',color:'var(--t3)'}}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Partner Universities */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">УНІВЕРСИТЕТИ-ПАРТНЕРИ</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'flex',gap:'0.5rem',marginTop:'1rem',flexWrap:'wrap'}}>
        {[{k:'all',l:'Всі'},{k:'erasmus',l:'Erasmus+'},{k:'bilateral',l:'Двосторонні'},{k:'daad',l:'DAAD'}].map(f => (
          <button key={f.k} className={`lbl ${filter===f.k?'lbl-gold':''}`} onClick={() => setFilter(f.k)}
            style={{padding:'0.375rem 0.75rem',border:'1px solid var(--border)',borderRadius:'2px',background: filter===f.k ? 'rgba(196,132,52,0.1)' : 'transparent',cursor:'pointer',color: filter===f.k ? 'var(--amber)' : 'var(--t3)'}}>
            {f.l}
          </button>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:'1rem',marginTop:'1rem'}}>
        {filteredPartners.map((p,i) => (
          <div key={i} className="gc" style={{padding:'1.25rem',cursor:'pointer',borderColor: expandedPartner===i ? 'var(--amber)' : undefined}} onClick={() => setExpandedPartner(expandedPartner===i ? null : i)}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <div style={{flex:1}}>
                <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem'}}>{p.name}</h4>
                <span className="lbl" style={{marginTop:'0.25rem'}}>{p.country} · з {p.since} р.</span>
              </div>
              <Badge status="completed" label={PARTNER_TYPES[p.type]} />
            </div>
            {expandedPartner===i && (
              <div style={{marginTop:'1rem',borderTop:'1px solid var(--border)',paddingTop:'1rem'}}>
                <p className="body" style={{fontSize:'0.8125rem'}}>{p.desc}</p>
                <div className="lbl" style={{marginTop:'0.75rem'}}>ПРОГРАМИ</div>
                <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginTop:'0.5rem'}}>
                  {p.programs.map((pr,j) => (
                    <span key={j} className="mono" style={{fontSize:'0.6875rem',padding:'0.25rem 0.5rem',border:'1px solid var(--border)',borderRadius:'2px',color:'var(--t2)'}}>{pr}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Grants */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ГРАНТИ ТА ПРОЕКТИ</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'grid',gap:'0.75rem',marginTop:'1rem'}}>
        {INTL_GRANTS.map((g,i) => (
          <div key={i} className="gc" style={{padding:'1.25rem',cursor:'pointer',borderColor: expandedGrant===i ? 'var(--amber)' : undefined}} onClick={() => setExpandedGrant(expandedGrant===i ? null : i)}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <div style={{flex:1}}>
                <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem'}}>{g.name}</h4>
                <span className="lbl" style={{marginTop:'0.25rem'}}>{g.funder} · {g.period}</span>
              </div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'0.25rem'}}>
                <Badge status={g.status==='active'?'completed':'open'} label={g.status==='active'?'АКТИВНИЙ':'ЗАВЕРШЕНО'} />
                <span className="mono" style={{fontSize:'0.75rem',color:'var(--amber)',fontWeight:600}}>{g.amount}</span>
              </div>
            </div>
            {expandedGrant===i && (
              <div style={{marginTop:'0.75rem',borderTop:'1px solid var(--border)',paddingTop:'0.75rem'}}>
                <p className="body" style={{fontSize:'0.8125rem'}}>{g.desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="gc gc-gold" style={{marginTop:'2.5rem',padding:'2rem',textAlign:'center'}}>
        <span className="lbl lbl-gold">ВІДКРИТІ МОЖЛИВОСТІ</span>
        <h3 className="serif tg" style={{fontSize:'1.25rem',marginTop:'0.75rem'}}>
          Міжнародна мобільність для студентів DonNTU
        </h3>
        <p className="body" style={{marginTop:'1rem',maxWidth:'480px',margin:'1rem auto 0',fontSize:'0.8125rem',color:'var(--t2)'}}>
          Erasmus+ обміни до Німеччини, Польщі, Франції, Чехії. DAAD стажування для дослідників. NATO SPS для кібербезпеки. Зверніться до Відділу міжнародних зв'язків — international@donntu.edu.ua
        </p>
      </div>
    </div>
  );
};
