/* Time Capsule Page — digital messages for future generations */
const CAPSULE_INFO = {
  openDate: '01.09.2031',
  event: '110 років DonNTU',
  totalMessages: 247,
  contributors: 189,
  categories: ['Студенти','Викладачі','Випускники','Адміністрація'],
};

const CAPSULE_MESSAGES = [
  { author:'Ірина К.', role:'Студентка, 3 курс, IT', date:'15.03.2026', category:'students',
    preview:'Коли ви це прочитаєте, я вже буду інженеркою. Сподіваюся, що DonNTU повернувся до Донецька...',
    full:'Коли ви це прочитаєте, я вже буду інженеркою. Сподіваюся, що DonNTU повернувся до Донецька і ви бачите той самий головний корпус, який я бачила тільки на фотографіях. Ми вчилися у Луцьку, у тимчасових аудиторіях, але дух університету був справжнім. Дякую викладачам, які не здалися.' },
  { author:'Проф. О. Коваленко', role:'Зав. кафедри гірництва', date:'22.01.2026', category:'faculty',
    preview:'Ми — останнє покоління, яке пам\'ятає шахти Донбасу живими. Наше завдання — зберегти ці знання...',
    full:'Ми — останнє покоління, яке пам\'ятає шахти Донбасу живими. Наше завдання — зберегти ці знання для тих, хто відбудовуватиме. 40 років я навчав студентів під землею. Тепер навчаю онлайн. Але гірнича справа — це не місце, це покликання. У 2031 році, будь ласка, відкрийте нову лабораторію у Донецьку. Від мого імені.' },
  { author:'Олексій М.', role:'Випускник 2008, CEO EnergoPro', date:'08.02.2026', category:'alumni',
    preview:'DonNTU дав мені професію та друзів на все життя. З Берліна слідкую за кожним кроком університету...',
    full:'DonNTU дав мені професію та друзів на все життя. З Берліна слідкую за кожним кроком університету. Коли відкриють цю капсулу, я хочу бути там — у головному корпусі. Я обіцяю привезти обладнання для нової лабораторії електротехніки. Це мій борг перед alma mater.' },
  { author:'Ректор В. Бурлака', role:'Ректор DonNTU', date:'01.01.2026', category:'admin',
    preview:'Цей університет пережив три війни і жодного разу не зупинився. Ми — незупинні...',
    full:'Цей університет пережив три війни і жодного разу не зупинився. Ми — незупинні. Від Юзівського гірничого училища 1921 року до переміщеного DonNTU 2026 року — це одна безперервна історія інженерної освіти. У 2031 році DonNTU святкуватиме 110 років. Хай ця дата стане початком нового розділу — повернення додому.' },
  { author:'Марія Л.', role:'Студентка, 1 курс, архітектура', date:'12.04.2026', category:'students',
    preview:'Я ніколи не була у Донецьку. Але я відчуваю, що це моє місто. Мій проект диплому буде...',
    full:'Я ніколи не була у Донецьку. Але я відчуваю, що це моє місто. Мій проект диплому буде про відбудову центральної площі. Коли ви прочитаєте це у 2031 — подивіться, чи збудували мій парк біля головного корпусу. Якщо ні — побудуйте, будь ласка. Це мій подарунок місту, яке я ще не бачила.' },
  { author:'Доц. І. Петренко', role:'Кафедра кібербезпеки', date:'28.02.2026', category:'faculty',
    preview:'AI змінить інженерну освіту до невпізнання. Але одне залишиться — відповідальність інженера...',
    full:'AI змінить інженерну освіту до невпізнання. Але одне залишиться — відповідальність інженера за безпеку людей. У 2031 році ваші студенти будуть навчатися інакше, але суть гірничої справи — захист людського життя під землею — не зміниться. Передайте їм це від нас.' },
  { author:'Студрада DonNTU', role:'Студентське самоврядування', date:'05.03.2026', category:'students',
    preview:'Ми, студенти 2026 року, вітаємо вас із 110-річчям! Ми вчилися у час війни, але не здалися...',
    full:'Ми, студенти 2026 року, вітаємо вас із 110-річчям! Ми вчилися у час війни, але не здалися. Ми проводили хакатони у підвалах, захищали дипломи онлайн, волонтерили між парами. Якщо ви читаєте це у мирному Донецьку — знайте, що ми про це мріяли кожен день. Слава DonNTU!' },
  { author:'Н. Ткаченко', role:'Ст. викладач екології', date:'14.03.2026', category:'faculty',
    preview:'Донбас потребуватиме екологічного відновлення на десятиліття. Готуйте фахівців...',
    full:'Донбас потребуватиме екологічного відновлення на десятиліття. Готуйте фахівців з рекультивації, очищення водойм, відновлення ґрунтів. Це буде найважливіша спеціальність DonNTU наступних 30 років. Я залишаю вам свої методичні розробки — вони в цифровій бібліотеці. Використовуйте.' },
];

const CAPSULE_STATS = [
  { v:'247', label:'Послань', desc:'Залишено у капсулі' },
  { v:'189', label:'Авторів', desc:'Студенти, викладачі, випускники' },
  { v:'01.09.2031', label:'Дата відкриття', desc:'110 років DonNTU' },
  { v:'5', label:'Років', desc:'До відкриття' },
];

const MILESTONES = [
  { year:2026, event:'Створення цифрової капсули', status:'completed', desc:'Збір послань від студентів, викладачів та випускників DonNTU.' },
  { year:2027, event:'100 послань', status:'completed', desc:'Перші 100 авторів залишили свої слова для майбутнього.' },
  { year:2028, event:'Міжнародні послання', status:'now', desc:'Випускники з 8 країн долучаються до капсули.' },
  { year:2029, event:'Відео-послання', status:'pending', desc:'Запуск формату відео-звернень до майбутніх поколінь.' },
  { year:2030, event:'Закриття прийому', status:'pending', desc:'Останній день для додавання послань — 31.12.2030.' },
  { year:2031, event:'ВІДКРИТТЯ КАПСУЛИ', status:'pending', desc:'1 вересня 2031 — урочисте відкриття на 110-річчя DonNTU.' },
];

const TimeCapsulePage = ({ onNavigate }) => {
  const [filter, setFilter] = React.useState('all');
  const [expanded, setExpanded] = React.useState(null);

  const filtered = filter === 'all' ? CAPSULE_MESSAGES : CAPSULE_MESSAGES.filter(m => m.category === filter);
  const categories = [
    { id:'all', label:'ВСІ' },
    { id:'students', label:'СТУДЕНТИ' },
    { id:'faculty', label:'ВИКЛАДАЧІ' },
    { id:'alumni', label:'ВИПУСКНИКИ' },
    { id:'admin', label:'АДМІНІСТРАЦІЯ' },
  ];

  return (
    <div className="page">
      <span className="lbl">17 · ЧАСОВА КАПСУЛА</span>

      <div style={{marginTop:'1.5rem'}}>
        <h1 className="h1" style={{fontSize:'2.25rem',lineHeight:1.15}}>
          Послання у <em>майбутнє.</em>
        </h1>
        <p className="body" style={{marginTop:'1rem',maxWidth:'560px'}}>
          Цифрова часова капсула DonNTU — послання від тих, хто навчає і навчається сьогодні, для тих, хто прийде після. Відкриється 1 вересня 2031 року — на 110-річчя університету.
        </p>
      </div>

      {/* Countdown */}
      <div className="gc gc-gold" style={{padding:'1.5rem',marginTop:'2rem',textAlign:'center'}}>
        <span className="lbl lbl-gold">ЗВОРОТНІЙ ВІДЛІК</span>
        <div className="serif tg" style={{fontSize:'2rem',marginTop:'0.75rem'}}>01.09.2031 — 110 років DonNTU</div>
        <p className="caption" style={{marginTop:'0.5rem',color:'var(--t2)'}}>
          Капсула відкриється через ~5 років. Залишено {CAPSULE_INFO.totalMessages} послань від {CAPSULE_INFO.contributors} авторів.
        </p>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'0.75rem',marginTop:'2rem'}}>
        {CAPSULE_STATS.map((s,i) => (
          <div key={i} className="gc" style={{padding:'1rem',textAlign:'center'}}>
            <div className="serif tg" style={{fontSize:'1.375rem',fontWeight:500}}>{s.v}</div>
            <div className="lbl" style={{marginTop:'0.5rem'}}>{s.label}</div>
            <div className="caption" style={{marginTop:'0.25rem',color:'var(--t3)'}}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ХРОНОЛОГІЯ КАПСУЛИ</span>
        <div className="div-line"></div>
      </div>
      <div style={{marginTop:'1rem'}}>
        {MILESTONES.map((m,i) => (
          <div key={i} style={{display:'flex',gap:'1rem',padding:'0.875rem 0',borderBottom:'1px solid var(--border)',alignItems:'flex-start'}}>
            <span className="serif tg" style={{fontSize:'1.125rem',minWidth:'3rem',fontWeight:500}}>{m.year}</span>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
                <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem'}}>{m.event}</h4>
                <Badge status={m.status==='completed'?'completed':m.status==='now'?'now':'locked'} label={m.status==='completed'?'ВИКОНАНО':m.status==='now'?'ЗАРАЗ':'ОЧІКУЄТЬСЯ'} />
              </div>
              <p className="caption" style={{marginTop:'0.25rem',color:'var(--t3)'}}>{m.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Messages */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ПОСЛАННЯ · ПОПЕРЕДНІЙ ПЕРЕГЛЯД</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'flex',gap:'0.5rem',marginTop:'1rem',flexWrap:'wrap'}}>
        {categories.map(c => (
          <button key={c.id}
            style={{padding:'0.375rem 0.75rem',border:'1px solid var(--border)',background:filter===c.id?'var(--s1)':'transparent',cursor:'pointer',color:'var(--t1)',fontSize:'0.75rem'}}
            onClick={() => setFilter(c.id)}>
            {c.label}
          </button>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:'1rem',marginTop:'1rem'}}>
        {filtered.map((m,i) => (
          <div key={i} className="gc" style={{padding:'1.25rem',cursor:'pointer'}} onClick={() => setExpanded(expanded===i?null:i)}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <div>
                <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem'}}>{m.author}</h4>
                <span className="caption" style={{color:'var(--t3)'}}>{m.role}</span>
              </div>
              <span className="caption" style={{color:'var(--t3)'}}>{m.date}</span>
            </div>
            <p className="body" style={{marginTop:'0.75rem',fontSize:'0.8125rem',fontStyle:'italic',color:'var(--t2)'}}>
              «{expanded===i ? m.full : m.preview}»
            </p>
            <span className="caption" style={{marginTop:'0.5rem',display:'block',color:'var(--amber)',cursor:'pointer'}}>
              {expanded===i ? '▲ Згорнути' : '▼ Розгорнути'}
            </span>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="gc gc-gold" style={{padding:'1.5rem',marginTop:'2.5rem',textAlign:'center'}}>
        <span className="lbl lbl-gold">ЗАЛИШИТИ ПОСЛАННЯ</span>
        <blockquote className="serif" style={{fontSize:'1.125rem',lineHeight:1.6,marginTop:'1rem',fontStyle:'italic'}}>
          «Капсула приймає послання до 31 грудня 2030 року. Кожен, хто пов'язаний з DonNTU — студент, викладач, випускник — може залишити слова для тих, хто прийде після. Ваше послання збережеться назавжди.»
        </blockquote>
      </div>

      <Inst />
    </div>
  );
};

window.TimeCapsulePage = TimeCapsulePage;
