/* War & University Page — chronicle of conflict, losses, resilience */
const WAR_PHASES = [
  { id:'ww2', period:'1941–1943', title:'Друга світова війна', icon:'⬟',
    events:[
      { yr:1941, title:'Евакуація до Прокоп\'євська', desc:'Інститут евакуйовано до Кузбасу (Сибір). Збережено обладнання, бібліотеку та кадровий склад. Навчання продовжено для підготовки інженерів оборонної промисловості.' },
      { yr:1942, title:'Робота для фронту', desc:'Студенти та викладачі працюють на оборонних підприємствах. Наукові розробки з видобутку вугілля для потреб армії. Підготовлено 87 інженерів воєнного випуску.' },
      { yr:1943, title:'Повернення та відбудова', desc:'Після звільнення Донбасу інститут повертається. Корпуси зруйновані на 70%. Відбудова починається паралельно з відновленням навчання.' },
    ],
    losses:'Зруйновано 70% приміщень, втрачено частину бібліотеки та обладнання. 127 студентів і викладачів загинули на фронті.',
    resilience:'Інститут не зупинив роботу жодного дня. Випускники воєнних років відбудовували промисловість Донбасу.'
  },
  { id:'donbas2014', period:'2014–2022', title:'Війна на Донбасі', icon:'◈',
    events:[
      { yr:2014, title:'Окупація та переміщення', desc:'Після захоплення Донецька незаконними збройними формуваннями університет переміщується до Красноармійська (Покровськ). Евакуйовано документи, сервери, частину обладнання.' },
      { yr:2015, title:'Відновлення навчання', desc:'Повноцінне навчання у Покровську. Адаптовані приміщення, дистанційні технології. Частина студентів та викладачів залишилась на окупованій території.' },
      { yr:2019, title:'Стабілізація', desc:'Акредитація всіх спеціальностей на новому місці. Розвиток лабораторної бази, нові міжнародні партнерства. Університет визнано як приклад академічної стійкості.' },
    ],
    losses:'Втрачено головний кампус (42 000 м²), 80% лабораторного обладнання, бібліотеку з 1.2 млн примірників. ~40% студентів та ~30% викладачів не змогли переїхати.',
    resilience:'Збережено всі спеціальності та наукові школи. Створено нову лабораторну базу. Кількість вступників зросла на 15% за 5 років.'
  },
  { id:'fullscale', period:'2022–н.ч.', title:'Повномасштабне вторгнення', icon:'⟐',
    events:[
      { yr:2022, title:'Друге переміщення', desc:'Після 24 лютого — евакуація з Покровська. Розподілений кампус: Луцьк (основний), Дрогобич (додатковий). Повний перехід на дистанційне навчання.' },
      { yr:2023, title:'Гібридний формат', desc:'Поєднання очного (Луцьк, Дрогобич) та дистанційного навчання. Нові партнерства з університетами Польщі, Німеччини, Канади.' },
      { yr:2024, title:'Цифрова трансформація', desc:'Запуск DonNTU Heritage OS. Цифровий кампус як форма збереження ідентичності. Симуляційні лабораторії, сертифікаційна платформа.' },
      { yr:2025, title:'Відновлення масштабу', desc:'Зростання кількості студентів. Нові освітні програми з відбудови, кібербезпеки, зеленої енергетики. Підготовка до повернення в Донецьк.' },
    ],
    losses:'Втрачено другий кампус у Покровську (8 000 м²). Місто під постійними обстрілами. Декілька студентів та випускників загинули внаслідок бойових дій.',
    resilience:'Університет працює в 3 містах одночасно. Цифровий кампус доступний з будь-якої точки світу. Наукова продуктивність зросла на 20%.'
  },
];

const WAR_TESTIMONIES = [
  { quote:'Коли ми їхали з Донецька, я взяв тільки диплом і фото кафедри. Все інше — в голові.', author:'Проф. О. Коваленко', role:'Гірнича інженерія · 42 роки в DonNTU', year:2014 },
  { quote:'Ми втратили стіни, але не втратили школу. Школа — це люди та ідеї, а не будівлі.', author:'Доц. М. Лисенко', role:'Архітектура · Випуск 1987', year:2015 },
  { quote:'Мій перший студент захистив дисертацію в Покровську. У тимчасовій аудиторії. Це був найкращий захист, який я бачив.', author:'Проф. В. Бондаренко', role:'Електропривод · Доктор наук', year:2018 },
  { quote:'Коли почалась повномасштабна війна, ми були у Покровську три дні без зв\'язку. Потім зібрались і поїхали далі. DonNTU не зупиняється.', author:'Студентка А. Шевченко', role:'Кібербезпека · 4 курс', year:2022 },
  { quote:'Я вступив у DonNTU з Маріуполя. Мого міста більше немає. Але університет є — і це дає мені майбутнє.', author:'Студент Д. Кравченко', role:'Будівництво · 2 курс', year:2023 },
  { quote:'Аудиторії можна спалити. Знання — не можна. Ми це довели тричі.', author:'Ректор Ю. Завгородній', role:'Звернення до студентів', year:2024 },
];

const WAR_NUMBERS = [
  { v:'3', label:'Переміщення', desc:'1941, 2014, 2022' },
  { v:'105', label:'Років роботи', desc:'Без жодного дня перерви' },
  { v:'70%', label:'Руйнувань 1943', desc:'Головний кампус' },
  { v:'42K м²', label:'Втрачено 2014', desc:'Кампус у Донецьку' },
  { v:'1.2M', label:'Книг втрачено', desc:'Бібліотека Донецьк' },
  { v:'4', label:'Міста роботи', desc:'Донецьк → Покровськ → Луцьк/Дрогобич' },
  { v:'127', label:'Загиблих ВСВ', desc:'Студенти та викладачі' },
  { v:'100%', label:'Спеціальностей', desc:'Збережено після кожного переміщення' },
];

const IN_MEMORIAM = [
  { name:'Студенти та викладачі ДПІ', count:127, conflict:'Друга світова війна 1941–1945', desc:'Загинули на фронтах та в окупації. Пам\'ятна дошка в головному корпусі (Донецьк).' },
  { name:'Випускники DonNTU', count:null, conflict:'Війна на Донбасі 2014–н.ч.', desc:'Випускники, які загинули захищаючи Україну. Вічна пам\'ять героям.' },
  { name:'Мирні жертви', count:null, conflict:'Обстріли Покровська, Маріуполя', desc:'Студенти та їхні родини, які загинули внаслідок обстрілів та бойових дій.' },
];

const WarPage = ({ onNavigate }) => {
  const [expandedPhase, setExpandedPhase] = React.useState('fullscale');

  return (
    <div className="page">
      <span className="lbl">10 · ВІЙНА ТА УНІВЕРСИТЕТ</span>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginTop:'1.5rem',gap:'2rem',flexWrap:'wrap'}}>
        <div style={{maxWidth:'560px'}}>
          <h1 className="h1" style={{fontSize:'2.25rem',lineHeight:1.15}}>
            Університет, що <em>вижив</em> тричі.
          </h1>
          <p className="body" style={{marginTop:'1rem',maxWidth:'480px'}}>
            Три війни. Три переміщення. Жодного дня перерви. Це хроніка стійкості інституції, яка довела: знання не мають географії, а академічна традиція сильніша за руйнування.
          </p>
        </div>
        <div className="gc" style={{minWidth:'280px',textAlign:'center',padding:'1.5rem'}}>
          <div className="serif" style={{fontSize:'4rem',fontWeight:300,color:'var(--amber)',lineHeight:1}}>1941</div>
          <div className="serif" style={{fontSize:'4rem',fontWeight:300,color:'var(--t2)',lineHeight:1,margin:'0.25rem 0'}}>2014</div>
          <div className="serif" style={{fontSize:'4rem',fontWeight:300,color:'var(--rust)',lineHeight:1}}>2022</div>
          <span className="lbl" style={{marginTop:'1rem',display:'block'}}>РОКИ ПЕРЕМІЩЕНЬ</span>
        </div>
      </div>

      {/* War numbers */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ВІЙНА В ЦИФРАХ</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'0.75rem',marginTop:'1rem'}}>
        {WAR_NUMBERS.map((n,i) => (
          <div key={i} className="gc" style={{padding:'1rem',textAlign:'center'}}>
            <div className="serif tg" style={{fontSize:'1.5rem',fontWeight:500}}>{n.v}</div>
            <div className="lbl" style={{marginTop:'0.5rem'}}>{n.label}</div>
            <div className="caption" style={{marginTop:'0.25rem',color:'var(--t3)'}}>{n.desc}</div>
          </div>
        ))}
      </div>

      {/* Phases */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ХРОНОЛОГІЯ КОНФЛІКТІВ</span>
        <div className="div-line"></div>
      </div>

      {WAR_PHASES.map(phase => (
        <div key={phase.id} className="gc" style={{marginTop:'1rem',padding:'1.5rem',cursor:'pointer',borderColor: expandedPhase===phase.id ? 'var(--amber)' : undefined}} onClick={() => setExpandedPhase(expandedPhase===phase.id ? null : phase.id)}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
              <span style={{fontSize:'1.25rem',color:'var(--amber)'}}>{phase.icon}</span>
              <div>
                <h3 className="h3" style={{fontWeight:500}}>{phase.title}</h3>
                <span className="lbl" style={{marginTop:'0.25rem'}}>{phase.period}</span>
              </div>
            </div>
            <span className="lbl" style={{color:'var(--amber)'}}>{expandedPhase===phase.id ? '▲' : '▼'}</span>
          </div>

          {expandedPhase===phase.id && (
            <div style={{marginTop:'1.5rem'}}>
              {/* Timeline */}
              <div style={{borderLeft:'1px solid var(--border)',paddingLeft:'1.5rem',marginLeft:'0.5rem'}}>
                {phase.events.map((ev,i) => (
                  <div key={i} style={{marginBottom:'1.25rem',position:'relative'}}>
                    <div style={{position:'absolute',left:'-2rem',top:'0.25rem',width:'8px',height:'8px',borderRadius:'50%',background:'var(--amber)'}}></div>
                    <div style={{display:'flex',alignItems:'baseline',gap:'0.75rem'}}>
                      <span className="serif tg" style={{fontSize:'1.125rem',fontWeight:500}}>{ev.yr}</span>
                      <span className="h3" style={{fontWeight:500}}>{ev.title}</span>
                    </div>
                    <p className="body" style={{marginTop:'0.375rem',color:'var(--t2)'}}>{ev.desc}</p>
                  </div>
                ))}
              </div>

              {/* Losses & Resilience */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginTop:'1.5rem'}}>
                <div className="gc" style={{padding:'1rem',borderColor:'var(--rust)'}}>
                  <span className="lbl" style={{color:'var(--rust)'}}>ВТРАТИ</span>
                  <p className="body" style={{marginTop:'0.5rem',fontSize:'0.8125rem'}}>{phase.losses}</p>
                </div>
                <div className="gc" style={{padding:'1rem',borderColor:'var(--sage)'}}>
                  <span className="lbl" style={{color:'var(--sage)'}}>СТІЙКІСТЬ</span>
                  <p className="body" style={{marginTop:'0.5rem',fontSize:'0.8125rem'}}>{phase.resilience}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* In Memoriam */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">IN MEMORIAM · ВІЧНА ПАМ'ЯТЬ</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1rem',marginTop:'1rem'}}>
        {IN_MEMORIAM.map((m,i) => (
          <div key={i} className="gc" style={{padding:'1.25rem',borderColor:'var(--t3)',textAlign:'center'}}>
            <span style={{fontSize:'1.5rem',display:'block',marginBottom:'0.75rem'}}>✦</span>
            <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem'}}>{m.name}</h4>
            {m.count && <div className="serif tg" style={{fontSize:'2rem',fontWeight:300,marginTop:'0.5rem'}}>{m.count}</div>}
            <span className="lbl" style={{marginTop:'0.5rem',display:'block'}}>{m.conflict}</span>
            <p className="caption" style={{marginTop:'0.5rem',color:'var(--t3)'}}>{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Testimonies */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ГОЛОСИ · СВІДЧЕННЯ ОЧЕВИДЦІВ</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'1rem',marginTop:'1rem'}}>
        {WAR_TESTIMONIES.map((t,i) => (
          <div key={i} className="gc gc-gold" style={{padding:'1.25rem'}}>
            <blockquote className="serif" style={{fontSize:'0.9375rem',lineHeight:1.5,fontStyle:'italic',color:'var(--t1)'}}>
              «{t.quote}»
            </blockquote>
            <div style={{marginTop:'1rem',borderTop:'1px solid var(--border)',paddingTop:'0.75rem'}}>
              <div className="body" style={{fontWeight:500}}>{t.author}</div>
              <span className="caption" style={{color:'var(--t3)'}}>{t.role} · {t.year}</span>
            </div>
          </div>
        ))}
      </div>

      <Inst />
    </div>
  );
};

window.WarPage = WarPage;
