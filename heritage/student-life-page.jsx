/* Student Life Page — dorms, organizations, events, scholarships */
const DORMITORIES = [
  { city:'Луцьк', name:'Гуртожиток №1', address:'вул. Потебні, 15', places:320, type:'Блочний',
    features:['Wi-Fi','Пральня','Кухня на поверсі','Читальний зал','Охорона 24/7'],
    priority:['ВПО','Іногородні','Сироти','Учасники БД'], condition:'renovated' },
  { city:'Луцьк', name:'Гуртожиток №2', address:'вул. Шопена, 22', places:180, type:'Коридорний',
    features:['Wi-Fi','Кухня на поверсі','Спортзал','Медпункт','Охорона 24/7'],
    priority:['Іногородні','Контрактники'], condition:'good' },
  { city:'Дрогобич', name:'Гуртожиток №3', address:'вул. Грушевського, 48', places:140, type:'Блочний',
    features:['Wi-Fi','Пральня','Кухня','Бібліотека','Охорона 24/7'],
    priority:['ВПО','Іногородні'], condition:'renovated' },
];

const ORGANIZATIONS = [
  { name:'Студентська рада DonNTU', type:'Самоврядування', members:45, icon:'🏛',
    desc:'Представляє інтереси студентів перед адміністрацією. Організовує вибори, контролює побутові умови, розподіляє стипендіальний фонд.',
    achievements:['Ініціювала ремонт гуртожитку №1','Запустила програму менторства','Представництво у Вченій раді'] },
  { name:'Науковий гурток «Інженер»', type:'Наука', members:67, icon:'🔬',
    desc:'Об\'єднує студентів усіх факультетів, які займаються науковою роботою. Підготовка до конференцій, грантові проекти, публікації.',
    achievements:['12 публікацій у 2025','3 гранти МОН','Перемога на Всеукраїнській олімпіаді'] },
  { name:'IT-клуб «Binary»', type:'Технології', members:89, icon:'💻',
    desc:'Хакатони, воркшопи, проекти з відкритим кодом. Мови: Python, JavaScript, Rust, C++. Зустрічі щотижня.',
    achievements:['2 місце на HackUkraine 2025','Open-source проект з 500+ зірок','Партнерство з EPAM'] },
  { name:'Спортивний клуб', type:'Спорт', members:156, icon:'⚽',
    desc:'Футбол, волейбол, баскетбол, шахи, настільний теніс. Міжвузівські змагання, спартакіади, ранкові пробіжки.',
    achievements:['Чемпіони Волині з шахів','3 місце з волейболу серед ВНЗ','Організація благодійного марафону'] },
  { name:'Волонтерський загін «Серце»', type:'Волонтерство', members:112, icon:'❤️',
    desc:'Допомога ВПО, збір коштів для ЗСУ, екологічні акції, допомога літнім людям. Партнерство з Червоним Хрестом.',
    achievements:['Зібрано 2.4 млн грн для ЗСУ','Допомога 340 сім\'ям ВПО','Висадка 1200 дерев'] },
  { name:'Творча студія «Промінь»', type:'Культура', members:38, icon:'🎭',
    desc:'Театральна студія, хор, інструментальний ансамбль. Виступи на святах університету, міських заходах, фестивалях.',
    achievements:['Гран-прі фестивалю «Студентська весна»','Концерт до Дня університету','Благодійний вечір'] },
];

const EVENTS_CALENDAR = [
  { month:'Вересень', events:[
    { name:'День знань · Посвята у студенти', date:'01.09', type:'tradition', desc:'Урочисте відкриття навчального року. Посвята першокурсників. Концерт.' },
    { name:'Ярмарок студентських організацій', date:'10–12.09', type:'social', desc:'Усі гуртки та організації представляють себе. Реєстрація нових учасників.' },
  ]},
  { month:'Жовтень', events:[
    { name:'Хакатон «Code for Donbas»', date:'18–20.10', type:'tech', desc:'48-годинний хакатон. Теми: відбудова, екологія, безпека. Призовий фонд та менторство від IT-компаній.' },
    { name:'Наукова конференція студентів', date:'25.10', type:'science', desc:'Доповіді з усіх спеціальностей. Найкращі роботи публікуються у збірнику.' },
  ]},
  { month:'Листопад', events:[
    { name:'День DonNTU · 103 роки', date:'11.11', type:'tradition', desc:'День заснування університету (1921). Урочистості, нагородження, концерт, зустріч випускників.' },
  ]},
  { month:'Грудень', events:[
    { name:'Благодійний вечір', date:'15.12', type:'charity', desc:'Збір коштів на підтримку студентів-ВПО та ЗСУ. Аукціон студентських робіт.' },
    { name:'Новорічний концерт', date:'22.12', type:'culture', desc:'Музика, театр, поезія. Студентські таланти на великій сцені.' },
  ]},
  { month:'Березень', events:[
    { name:'Студентська весна', date:'10–14.03', type:'culture', desc:'Тиждень культури: конкурси, виставки, концерти, квести. Головна подія весняного семестру.' },
  ]},
  { month:'Квітень', events:[
    { name:'День відкритих дверей', date:'12.04', type:'applicants', desc:'Для абітурієнтів: екскурсії, презентації спеціальностей, знайомство з викладачами та студентами.' },
    { name:'Спартакіада DonNTU', date:'20–26.04', type:'sport', desc:'Міжфакультетські змагання: футбол, волейбол, баскетбол, шахи, легка атлетика.' },
  ]},
  { month:'Червень', events:[
    { name:'Випуск · Церемонія вручення дипломів', date:'28.06', type:'tradition', desc:'Урочисте вручення дипломів. Промова ректора, найкращі випускники, подяки, сльози радості.' },
  ]},
];

const SCHOLARSHIPS = [
  { name:'Академічна стипендія', amount:'2 100 грн/міс', who:'Бюджетники з середнім балом ≥ 4.0', type:'academic' },
  { name:'Підвищена академічна', amount:'3 150 грн/міс', who:'Бюджетники з середнім балом ≥ 4.75 + наукова/громадська діяльність', type:'academic' },
  { name:'Стипендія ректора', amount:'5 000 грн/міс', who:'Топ-10 студентів університету за навчальними та науковими досягненнями', type:'merit' },
  { name:'Соціальна стипендія', amount:'2 500 грн/міс', who:'Сироти, діти учасників БД, студенти з інвалідністю, ВПО', type:'social' },
  { name:'Грант DAAD (Німеччина)', amount:'€861/міс', who:'Магістри та аспіранти для навчання/стажування в Німеччині. Конкурс щорічно.', type:'international' },
  { name:'Програма Erasmus+', amount:'€800–1100/міс', who:'Студенти 2-4 курсу для семестрового обміну в університетах ЄС.', type:'international' },
  { name:'Стипендія Фонду «Відродження»', amount:'4 000 грн/міс', who:'Студенти-ВПО з Донецької та Луганської областей.', type:'social' },
  { name:'Іменна стипендія ім. Кірічка', amount:'3 500 грн/міс', who:'Найкращий студент гірничого факультету за результатами року.', type:'merit' },
];

const EVENT_TYPES = {
  tradition:'var(--amber)', tech:'var(--sage)', science:'var(--violet)',
  culture:'var(--rust)', sport:'var(--sage)', charity:'var(--amber)',
  social:'var(--t2)', applicants:'var(--amber)',
};

const StudentLifePage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = React.useState('orgs');
  const [expandedOrg, setExpandedOrg] = React.useState(null);
  const [expandedMonth, setExpandedMonth] = React.useState('Вересень');

  return (
    <div className="page">
      <span className="lbl">15 · СТУДЕНТСЬКЕ ЖИТТЯ</span>

      <div style={{marginTop:'1.5rem'}}>
        <h1 className="h1" style={{fontSize:'2.25rem',lineHeight:1.15}}>
          Більше ніж <em>навчання.</em>
        </h1>
        <p className="body" style={{marginTop:'1rem',maxWidth:'560px'}}>
          DonNTU — це спільнота, яка живе повноцінним життям попри всі випробування. Спорт, наука, волонтерство, творчість, дружба — все це частина студентського досвіду.
        </p>
      </div>

      {/* Tab navigation */}
      <div style={{display:'flex',gap:'0.5rem',marginTop:'2rem',flexWrap:'wrap'}}>
        {[
          {id:'orgs',label:'ОРГАНІЗАЦІЇ'},
          {id:'dorms',label:'ГУРТОЖИТКИ'},
          {id:'events',label:'ПОДІЇ'},
          {id:'scholarships',label:'СТИПЕНДІЇ'},
        ].map(t => (
          <button key={t.id} style={{padding:'0.5rem 1.25rem',border:'1px solid var(--border)',background:activeTab===t.id?'var(--s1)':'transparent',cursor:'pointer',color:activeTab===t.id?'var(--amber)':'var(--t1)',fontSize:'0.8125rem',fontFamily:'var(--mono)'}}
            onClick={() => setActiveTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Organizations */}
      {activeTab === 'orgs' && (
        <div style={{marginTop:'1.5rem'}}>
          <div className="div-row">
            <span className="lbl">СТУДЕНТСЬКІ ОРГАНІЗАЦІЇ · {ORGANIZATIONS.length}</span>
            <div className="div-line"></div>
          </div>
          <div style={{marginTop:'1rem'}}>
            {ORGANIZATIONS.map((org,i) => (
              <div key={i} className="gc" style={{padding:'1.25rem',marginBottom:'0.75rem',cursor:'pointer'}}
                onClick={() => setExpandedOrg(expandedOrg===i?null:i)}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div style={{flex:1}}>
                    <h3 className="h3" style={{fontWeight:500}}>{org.icon} {org.name}</h3>
                    <div style={{display:'flex',gap:'1rem',marginTop:'0.5rem',flexWrap:'wrap'}}>
                      <span className="caption" style={{color:'var(--t3)'}}>{org.type}</span>
                      <span className="caption" style={{color:'var(--amber)'}}>{org.members} учасників</span>
                    </div>
                  </div>
                  <span style={{color:'var(--t3)',fontSize:'0.75rem'}}>{expandedOrg===i?'▲':'▼'}</span>
                </div>
                {expandedOrg === i && (
                  <div style={{marginTop:'1rem',paddingTop:'1rem',borderTop:'1px solid var(--border)'}}>
                    <p className="body" style={{fontSize:'0.875rem',color:'var(--t2)'}}>{org.desc}</p>
                    <div style={{marginTop:'1rem'}}>
                      <span className="lbl" style={{fontSize:'0.6875rem'}}>ДОСЯГНЕННЯ</span>
                      <ul style={{marginTop:'0.5rem',paddingLeft:'1.25rem'}}>
                        {org.achievements.map((a,j) => (
                          <li key={j} className="body" style={{fontSize:'0.8125rem',color:'var(--t2)',marginBottom:'0.25rem'}}>→ {a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dormitories */}
      {activeTab === 'dorms' && (
        <div style={{marginTop:'1.5rem'}}>
          <div className="div-row">
            <span className="lbl">ГУРТОЖИТКИ · {DORMITORIES.reduce((s,d) => s+d.places, 0)} МІСЦЬ</span>
            <div className="div-line"></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'1rem',marginTop:'1rem'}}>
            {DORMITORIES.map((d,i) => (
              <div key={i} className="gc" style={{padding:'1.25rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <h3 className="h3" style={{fontWeight:500}}>{d.name}</h3>
                  <Badge status={d.condition==='renovated'?'completed':'open'} label={d.condition==='renovated'?'ОНОВЛЕНИЙ':'ДОБРИЙ СТАН'} />
                </div>
                <div className="caption" style={{color:'var(--t3)',marginTop:'0.5rem'}}>
                  📍 {d.city} · {d.address}
                </div>
                <div style={{display:'flex',gap:'1rem',marginTop:'0.75rem'}}>
                  <div>
                    <div className="serif tg" style={{fontSize:'1.25rem',fontWeight:500}}>{d.places}</div>
                    <span className="caption" style={{color:'var(--t3)'}}>місць</span>
                  </div>
                  <div>
                    <div className="body" style={{fontSize:'0.875rem',fontWeight:500}}>{d.type}</div>
                    <span className="caption" style={{color:'var(--t3)'}}>тип</span>
                  </div>
                </div>
                <div style={{marginTop:'1rem'}}>
                  <span className="lbl" style={{fontSize:'0.6875rem'}}>ЗРУЧНОСТІ</span>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'0.375rem',marginTop:'0.5rem'}}>
                    {d.features.map((f,j) => (
                      <span key={j} style={{padding:'0.25rem 0.5rem',border:'1px solid var(--border)',fontSize:'0.6875rem',color:'var(--t2)'}}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{marginTop:'1rem'}}>
                  <span className="lbl" style={{fontSize:'0.6875rem'}}>ПРІОРИТЕТ</span>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'0.375rem',marginTop:'0.5rem'}}>
                    {d.priority.map((p,j) => (
                      <span key={j} style={{padding:'0.25rem 0.5rem',border:'1px solid var(--amber)44',fontSize:'0.6875rem',color:'var(--amber)'}}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Events Calendar */}
      {activeTab === 'events' && (
        <div style={{marginTop:'1.5rem'}}>
          <div className="div-row">
            <span className="lbl">КАЛЕНДАР ПОДІЙ · НАВЧАЛЬНИЙ РІК 2025–2026</span>
            <div className="div-line"></div>
          </div>
          <div style={{display:'flex',gap:'0.5rem',marginTop:'1rem',flexWrap:'wrap'}}>
            {EVENTS_CALENDAR.map(m => (
              <button key={m.month} style={{padding:'0.375rem 0.75rem',border:'1px solid var(--border)',background:expandedMonth===m.month?'var(--s1)':'transparent',cursor:'pointer',color:expandedMonth===m.month?'var(--amber)':'var(--t1)',fontSize:'0.75rem'}}
                onClick={() => setExpandedMonth(m.month)}>
                {m.month.toUpperCase()} <span className="caption" style={{color:'var(--t3)'}}>({m.events.length})</span>
              </button>
            ))}
          </div>
          {EVENTS_CALENDAR.filter(m => m.month === expandedMonth).map(m => (
            <div key={m.month} style={{marginTop:'1rem'}}>
              {m.events.map((e,i) => (
                <div key={i} className="gc" style={{padding:'1.25rem',marginBottom:'0.75rem'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <div style={{flex:1}}>
                      <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem'}}>{e.name}</h4>
                      <p className="body" style={{marginTop:'0.5rem',fontSize:'0.8125rem',color:'var(--t2)'}}>{e.desc}</p>
                    </div>
                    <div style={{textAlign:'right',marginLeft:'1rem',flexShrink:0}}>
                      <span className="serif tg" style={{fontSize:'0.875rem',fontWeight:500}}>{e.date}</span>
                      <div style={{width:8,height:8,borderRadius:'50%',background:EVENT_TYPES[e.type]||'var(--t3)',marginTop:'0.25rem',marginLeft:'auto'}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Scholarships */}
      {activeTab === 'scholarships' && (
        <div style={{marginTop:'1.5rem'}}>
          <div className="div-row">
            <span className="lbl">СТИПЕНДІЇ ТА ГРАНТИ</span>
            <div className="div-line"></div>
          </div>
          <div style={{marginTop:'1rem'}}>
            {SCHOLARSHIPS.map((s,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem 0',borderBottom:'1px solid var(--border)',gap:'1rem'}}>
                <div style={{flex:1}}>
                  <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem'}}>{s.name}</h4>
                  <p className="caption" style={{marginTop:'0.375rem',color:'var(--t3)'}}>{s.who}</p>
                </div>
                <div style={{textAlign:'right',flexShrink:0}}>
                  <div className="serif tg" style={{fontSize:'1rem',fontWeight:500,color:s.type==='international'?'var(--sage)':'var(--amber)'}}>{s.amount}</div>
                  <Badge status={s.type==='international'?'flagship':s.type==='merit'?'featured':s.type==='social'?'elevated':'open'}
                    label={s.type==='international'?'МІЖНАРОДНА':s.type==='merit'?'ІМЕННА':s.type==='social'?'СОЦІАЛЬНА':'АКАДЕМІЧНА'} />
                </div>
              </div>
            ))}
          </div>

          <div className="gc gc-gold" style={{padding:'1.25rem',marginTop:'2rem'}}>
            <span className="lbl lbl-gold">ЗАГАЛОМ</span>
            <p className="body" style={{marginTop:'0.5rem',fontSize:'0.875rem'}}>
              76% бюджетних студентів DonNTU отримують стипендію. 23 студенти навчаються за кордоном за грантовими програмами. Університет активно шукає нові джерела фінансової підтримки для студентів-ВПО.
            </p>
          </div>
        </div>
      )}

      <Inst />
    </div>
  );
};

window.StudentLifePage = StudentLifePage;
