/* Voices Podcast Page — audio/video interviews with DonNTU community */
const PODCAST_SEASONS = [
  { id:'s1', name:'Сезон 1: Переміщення', year:'2024', episodes:8, status:'completed',
    desc:'Як DonNTU пережив три переміщення. Голоси тих, хто був поруч у найскладніші дні.' },
  { id:'s2', name:'Сезон 2: Інженери Донбасу', year:'2025', episodes:6, status:'completed',
    desc:'Випускники розповідають про роботу на шахтах, заводах та електростанціях Донбасу.' },
  { id:'s3', name:'Сезон 3: Нове покоління', year:'2026', episodes:4, status:'now',
    desc:'Студенти, які ніколи не бачили Донецьк, але називають себе донеччанами.' },
];

const EPISODES = [
  // Season 1
  { season:'s1', ep:1, title:'«Останній день у Донецьку»', guest:'Ректор В. Бурлака',
    duration:'42 хв', date:'15.01.2024', type:'audio',
    desc:'Ректор розповідає про 14 квітня 2014 року — день, коли озброєні люди зайняли головний корпус. Як приймалося рішення про переміщення. Що вдалося врятувати.',
    quote:'«Я виніс печатку університету в кишені. Це було все, що в мене було.»' },
  { season:'s1', ep:2, title:'«Аудиторія у підвалі»', guest:'Проф. О. Коваленко',
    duration:'38 хв', date:'01.02.2024', type:'audio',
    desc:'Професор гірництва розповідає про перші місяці у Покровську: лекції у підвалах, лабораторні без обладнання, студенти, які залишилися.',
    quote:'«Я малював шахту крейдою на стіні підвалу. Студенти записували на телефони. Це була наша лабораторія.»' },
  { season:'s1', ep:3, title:'«Бібліотека, якої немає»', guest:'Бібліотекар Л. Ващенко',
    duration:'35 хв', date:'15.02.2024', type:'audio',
    desc:'1.2 мільйона книг залишилися в окупованому Донецьку. Як бібліотекарі почали оцифровувати все з нуля.',
    quote:'«Я пам\'ятаю кожну полицю. Рідкісні видання XVIII століття. Рукописи. Все залишилось там.»' },
  { season:'s1', ep:4, title:'«Дистанційка під обстрілами»', guest:'Доц. І. Петренко',
    duration:'44 хв', date:'01.03.2024', type:'video',
    desc:'Як викладач кібербезпеки вів онлайн-лекції під звуки вибухів. Чому не зупинився жодного разу.',
    quote:'«Студент написав: \'Вибачте, ракета. Буду через 10 хвилин.\' І повернувся.»' },
  { season:'s1', ep:5, title:'«Луцьк прийняв нас»', guest:'Мер Луцька І. Поліщук',
    duration:'31 хв', date:'15.03.2024', type:'audio',
    desc:'Мер міста про рішення прийняти DonNTU: як знайшли приміщення, як інтегрували 5 000 людей у місто.',
    quote:'«Луцьк ніколи не мав технічного університету. Тепер має. І це наше багатство.»' },
  { season:'s1', ep:6, title:'«Студентка з Маріуполя»', guest:'Анна Т., 4 курс',
    duration:'29 хв', date:'01.04.2024', type:'video',
    desc:'Анна пережила облогу Маріуполя і вступила до DonNTU. Як знайшла сили продовжувати навчання.',
    quote:'«Я хочу стати інженеркою і відбудувати свій дім. Буквально — свій дім, який зруйнований.»' },
  { season:'s1', ep:7, title:'«Шахта, якої більше немає»', guest:'Гірничий інженер П. Савченко',
    duration:'47 хв', date:'15.04.2024', type:'audio',
    desc:'Випускник 1998 року працював на шахті ім. Засядька 20 років. Тепер шахта пошкоджена. Спогади про підземний світ.',
    quote:'«Кожен камінь у тій шахті знає мої руки. А тепер я дивлюся на неї тільки зі супутника.»' },
  { season:'s1', ep:8, title:'«Диплом у час війни»', guest:'Випускники 2023 року',
    duration:'52 хв', date:'01.05.2024', type:'video',
    desc:'Четверо випускників розповідають, як захищали дипломи онлайн під тривогами. Що означає бути інженером у воєнний час.',
    quote:'«Мій диплом про відновлення мостів. Я його написала, тому що хочу їх будувати, а не бачити зруйнованими.»' },

  // Season 2
  { season:'s2', ep:1, title:'«420 інженерів ДТЕК»', guest:'HR-директор ДТЕК Енерго',
    duration:'36 хв', date:'01.09.2024', type:'audio',
    desc:'Найбільший приватний енергетичний холдинг України. 420 випускників DonNTU. Як університет формує енергетичну галузь країни.',
    quote:'«Кожна третя електростанція України має нашого випускника на ключовій позиції.»' },
  { season:'s2', ep:2, title:'«Під землею 35 років»', guest:'Начальник дільниці ШУ Покровське',
    duration:'41 хв', date:'15.09.2024', type:'audio',
    desc:'Найбільше шахтоуправління України працює в прифронтових умовах. 210 випускників DonNTU тримають видобуток.',
    quote:'«Ми видобуваємо вугілля за 30 км від лінії фронту. DonNTU навчив нас не боятися глибини.»' },
  { season:'s2', ep:3, title:'«Від Донецька до Берліна»', guest:'Інженер Siemens Energy',
    duration:'33 хв', date:'01.10.2024', type:'video',
    desc:'Олексій закінчив DonNTU у 2012, тепер працює у Siemens Energy в Берліні. Про різницю інженерних культур і мрію повернутися.',
    quote:'«Німецька інженерія — це точність. Донецька — це витривалість. Разом — ідеальна комбінація.»' },
  { season:'s2', ep:4, title:'«Метінвест: сталь і люди»', guest:'Головний інженер Метінвест',
    duration:'39 хв', date:'15.10.2024', type:'audio',
    desc:'350 випускників DonNTU у найбільшій гірничо-металургійній групі України. Як компанія переміщувалася разом з університетом.',
    quote:'«Ми переносили заводи з Маріуполя до Запоріжжя. Випускники DonNTU знали, як це робити.»' },
  { season:'s2', ep:5, title:'«Архітектура відбудови»', guest:'Архітекторка М. Ковальчук',
    duration:'28 хв', date:'01.11.2024', type:'video',
    desc:'Випускниця DonNTU проектує житло для переміщених у Львові. Архітектура як інструмент зцілення.',
    quote:'«Кожен будинок, який я проектую — це чийсь загублений дім. Я намагаюся повернути їм відчуття home.»' },
  { season:'s2', ep:6, title:'«Екологія воєнного Донбасу»', guest:'Еколог Н. Ткаченко',
    duration:'45 хв', date:'15.11.2024', type:'audio',
    desc:'Ст. викладач екології DonNTU про екологічну катастрофу Донбасу: затоплені шахти, забруднені ґрунти, зруйновані очисні.',
    quote:'«Донбас стане найбільшим екологічним проектом Європи. Нам потрібні тисячі екологів. DonNTU їх готує.»' },

  // Season 3
  { season:'s3', ep:1, title:'«Я ніколи не була в Донецьку»', guest:'Марія Л., 1 курс, архітектура',
    duration:'25 хв', date:'01.02.2026', type:'video',
    desc:'Першокурсниця з Луцька вступила до DonNTU. Чому обрала переміщений університет і як уявляє Донецьк.',
    quote:'«Мої одногрупники з Донецька показують мені фото свого міста. Я хочу побудувати там парк.»' },
  { season:'s3', ep:2, title:'«Хакатон під тривогою»', guest:'IT-клуб «Binary»',
    duration:'32 хв', date:'15.02.2026', type:'audio',
    desc:'89 студентів IT-клубу про хакатони, open-source проекти та партнерство з EPAM. Як кодити, коли навколо війна.',
    quote:'«Наш останній хакатон тривав 48 годин. 6 тривог. Жодна команда не зупинилася.»' },
  { season:'s3', ep:3, title:'«Волонтери з серцем»', guest:'Загін «Серце»',
    duration:'27 хв', date:'01.03.2026', type:'video',
    desc:'112 студентів-волонтерів: збір коштів для ЗСУ, допомога ВПО, екологічні акції. Зібрано 2.4 млн грн.',
    quote:'«Ми — студенти переміщеного університету. Ми знаємо, що таке втратити дім. Тому допомагаємо іншим.»' },
  { season:'s3', ep:4, title:'«Стипендія як порятунок»', guest:'Стипендіати DonNTU',
    duration:'30 хв', date:'15.03.2026', type:'audio',
    desc:'Три студенти-ВПО розповідають про стипендії, гранти Erasmus+ та DAAD. Як фінансова підтримка змінює життя.',
    quote:'«Стипендія ректора — це не просто гроші. Це визнання, що ти потрібен цьому університету.»' },
];

const PODCAST_STATS = [
  { v:'18', label:'Епізодів', desc:'У трьох сезонах' },
  { v:'11+ год', label:'Контенту', desc:'Аудіо та відео' },
  { v:'24', label:'Гостей', desc:'Ректор, професори, студенти, інженери' },
  { v:'3', label:'Сезони', desc:'2024–2026' },
  { v:'8', label:'Відео', desc:'Інтерв\'ю з візуалом' },
  { v:'10', label:'Аудіо', desc:'Класичний подкаст' },
];

const VoicesPage = ({ onNavigate }) => {
  const [activeSeason, setActiveSeason] = React.useState('s3');
  const [expandedEp, setExpandedEp] = React.useState(null);

  const seasonEpisodes = EPISODES.filter(e => e.season === activeSeason);
  const season = PODCAST_SEASONS.find(s => s.id === activeSeason);

  return (
    <div className="page">
      <span className="lbl">19 · ГОЛОСИ</span>

      <div style={{marginTop:'1.5rem'}}>
        <h1 className="h1" style={{fontSize:'2.25rem',lineHeight:1.15}}>
          Голоси <em>DonNTU.</em>
        </h1>
        <p className="body" style={{marginTop:'1rem',maxWidth:'560px'}}>
          Подкаст «Голоси» — живі розповіді людей, які творять історію DonNTU. Ректор, професори, студенти, випускники-інженери. Кожен епізод — свідчення епохи.
        </p>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'0.75rem',marginTop:'2rem'}}>
        {PODCAST_STATS.map((s,i) => (
          <div key={i} className="gc" style={{padding:'1rem',textAlign:'center'}}>
            <div className="serif tg" style={{fontSize:'1.375rem',fontWeight:500}}>{s.v}</div>
            <div className="lbl" style={{marginTop:'0.5rem'}}>{s.label}</div>
            <div className="caption" style={{marginTop:'0.25rem',color:'var(--t3)'}}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Season tabs */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">СЕЗОНИ</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'flex',gap:'0.5rem',marginTop:'1rem',flexWrap:'wrap'}}>
        {PODCAST_SEASONS.map(s => (
          <button key={s.id}
            style={{padding:'0.625rem 1rem',border:'1px solid '+(activeSeason===s.id?'var(--amber)':'var(--border)'),background:activeSeason===s.id?'var(--s1)':'transparent',cursor:'pointer',color:activeSeason===s.id?'var(--amber)':'var(--t1)',fontSize:'0.8125rem',flex:'1 1 auto',textAlign:'left'}}
            onClick={() => { setActiveSeason(s.id); setExpandedEp(null); }}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontWeight:500}}>{s.name}</span>
              <Badge status={s.status==='completed'?'completed':'now'} label={s.status==='completed'?'ЗАВЕРШЕНО':'В ЕФІРІ'} />
            </div>
            <div className="caption" style={{marginTop:'0.25rem',color:'var(--t3)'}}>{s.year} · {s.episodes} еп. · {s.desc}</div>
          </button>
        ))}
      </div>

      {/* Episodes */}
      <div className="div-row" style={{marginTop:'2rem'}}>
        <span className="lbl">{season?.name.toUpperCase()} · {seasonEpisodes.length} ЕПІЗОДІВ</span>
        <div className="div-line"></div>
      </div>
      <div style={{marginTop:'1rem'}}>
        {seasonEpisodes.map((ep,i) => {
          const isExpanded = expandedEp === `${ep.season}-${ep.ep}`;
          return (
            <div key={i} className="gc" style={{padding:'1.25rem',marginBottom:'0.75rem',cursor:'pointer'}}
              onClick={() => setExpandedEp(isExpanded ? null : `${ep.season}-${ep.ep}`)}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'1rem'}}>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:'0.75rem',flexWrap:'wrap'}}>
                    <span className="caption" style={{color:'var(--amber)'}}>EP {ep.ep.toString().padStart(2,'0')}</span>
                    <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem'}}>{ep.title}</h4>
                    <Badge status={ep.type==='video'?'featured':'open'} label={ep.type==='video'?'ВІДЕО':'АУДІО'} />
                  </div>
                  <div className="caption" style={{marginTop:'0.375rem',color:'var(--t3)'}}>
                    {ep.guest} · {ep.duration} · {ep.date}
                  </div>
                </div>
                <span style={{color:'var(--t3)',fontSize:'0.75rem'}}>{isExpanded ? '▲' : '▼'}</span>
              </div>

              {isExpanded && (
                <div style={{marginTop:'1rem',borderTop:'1px solid var(--border)',paddingTop:'1rem'}}>
                  <p className="body" style={{fontSize:'0.8125rem',color:'var(--t2)'}}>{ep.desc}</p>
                  <blockquote className="serif" style={{fontSize:'0.9375rem',fontStyle:'italic',marginTop:'0.75rem',paddingLeft:'1rem',borderLeft:'2px solid var(--amber)',color:'var(--t1)'}}>
                    {ep.quote}
                  </blockquote>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* About */}
      <div className="gc gc-gold" style={{padding:'1.5rem',marginTop:'2rem',textAlign:'center'}}>
        <span className="lbl lbl-gold">ПРО ПОДКАСТ</span>
        <blockquote className="serif" style={{fontSize:'1.125rem',lineHeight:1.6,marginTop:'1rem',fontStyle:'italic'}}>
          «"Голоси" — це не просто подкаст. Це усна історія університету, записана у реальному часі. Кожен епізод — документ епохи, який збережеться назавжди у цифровому архіві DonNTU.»
        </blockquote>
        <p className="caption" style={{marginTop:'1rem',color:'var(--t3)'}}>
          Автори: Студентська медіа-лабораторія DonNTU · Луцьк · 2024–2026
        </p>
      </div>

      <Inst />
    </div>
  );
};

window.VoicesPage = VoicesPage;
