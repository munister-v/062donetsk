/* Overview Page v4 — content-store aware, live-editable via admin */

/* ── CityscapeSVG ─────────────────────────────────────────────── */
const CityscapeSVG = () => (
  <svg viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
    <rect width="1440" height="600" fill="#6BC8E5"/>
    {/* Sky clouds */}
    <ellipse cx="200" cy="80" rx="90" ry="30" fill="rgba(255,255,255,0.35)"/>
    <ellipse cx="260" cy="70" rx="60" ry="22" fill="rgba(255,255,255,0.35)"/>
    <ellipse cx="1100" cy="90" rx="80" ry="25" fill="rgba(255,255,255,0.3)"/>
    <ellipse cx="1160" cy="78" rx="55" ry="20" fill="rgba(255,255,255,0.3)"/>
    {/* Ground */}
    <rect x="0" y="480" width="1440" height="120" fill="#5FB85F"/>
    {/* Left arch bridge */}
    <rect x="30" y="290" width="18" height="200" fill="#C0392B"/>
    <rect x="130" y="290" width="18" height="200" fill="#C0392B"/>
    <path d="M30,290 Q89,200 148,290" fill="none" stroke="#C0392B" strokeWidth="18"/>
    <rect x="10" y="340" width="160" height="150" fill="#E84A6A" opacity="0.2"/>
    {/* Pink/red building left */}
    <rect x="50" y="330" width="80" height="160" fill="#E84A6A" stroke="#000" strokeWidth="2"/>
    <polygon points="50,330 90,290 130,330" fill="#C0392B" stroke="#000" strokeWidth="2"/>
    {[65,95].map((x,i)=>[350,390,430].map((y,j)=>(
      <rect key={i*3+j} x={x} y={y} width="16" height="18" fill="#6BC8E5" stroke="#000" strokeWidth="1"/>
    )))}
    {/* Center-left buildings */}
    <rect x="200" y="260" width="100" height="230" fill="#9B59B6" stroke="#000" strokeWidth="2.5"/>
    <rect x="220" y="290" width="60" height="200" fill="#8E44AD" stroke="#000" strokeWidth="1.5"/>
    {[215,245,275].map((x,i)=>[270,310,360,410].map((y,j)=>(
      <rect key={i*4+j} x={x} y={y} width="20" height="22" fill="#6BC8E5" stroke="#000" strokeWidth="1.2"/>
    )))}
    {/* Dome building */}
    <rect x="370" y="300" width="140" height="190" fill="#BDC3C7" stroke="#000" strokeWidth="2"/>
    <ellipse cx="440" cy="290" rx="80" ry="40" fill="#E0E0E0" stroke="#000" strokeWidth="2"/>
    {[385,420,455,490].map((x,i)=>[320,370,420,460].map((y,j)=>(
      <rect key={i*4+j} x={x} y={y} width="18" height="20" fill="#6BC8E5" stroke="#000" strokeWidth="1"/>
    )))}
    {/* Main orange tower */}
    <rect x="570" y="140" width="160" height="350" fill="#F08D3F" stroke="#000" strokeWidth="2.5"/>
    <polygon points="570,140 650,90 730,140" fill="#E07830" stroke="#000" strokeWidth="2.5"/>
    {[590,625,660,695].map((x,i)=>[160,210,260,310,370,420].map((y,j)=>(
      <rect key={i*6+j} x={x} y={y} width="20" height="24" fill="#6BC8E5" stroke="#000" strokeWidth="1.5"/>
    )))}
    {/* Right buildings */}
    <rect x="790" y="220" width="120" height="270" fill="#005ab8" stroke="#000" strokeWidth="2.5"/>
    <polygon points="790,220 850,170 910,220" fill="#0045a0" stroke="#000" strokeWidth="2.5"/>
    {[805,840,875].map((x,i)=>[240,290,340,390,440].map((y,j)=>(
      <rect key={i*5+j} x={x} y={y} width="18" height="20" fill="#6BC8E5" stroke="#000" strokeWidth="1.2"/>
    )))}
    {/* Far right buildings */}
    <rect x="970" y="300" width="90" height="190" fill="#2ECC71" stroke="#000" strokeWidth="2"/>
    <polygon points="970,300 1015,255 1060,300" fill="#27AE60" stroke="#000" strokeWidth="2"/>
    <rect x="1100" y="270" width="110" height="220" fill="#F5D248" stroke="#000" strokeWidth="2"/>
    <polygon points="1100,270 1155,220 1210,270" fill="#E8C42A" stroke="#000" strokeWidth="2"/>
    <rect x="1260" y="330" width="140" height="160" fill="#E84A6A" stroke="#000" strokeWidth="2"/>
    {/* Trees */}
    {[160,540,760,1070,1240].map((x,i)=>(
      <g key={i}>
        <rect x={x+4} y="430" width="8" height="55" fill="#7A4A2F"/>
        <ellipse cx={x+8} cy="420" rx="20" ry="25" fill="#27AE60" stroke="#000" strokeWidth="1.5"/>
      </g>
    ))}
  </svg>
);

/* ── WUF-style hero decorations ──────────────────────────────── */
const HeroLeaf = ({ size = 50 }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" style={{display:'block',flexShrink:0}}>
    <circle cx="25" cy="25" r="24" fill="#1a2e1c"/>
    {[0,51.4,102.8,154.2,205.7,257.1,308.6].map((deg, i) => (
      <ellipse key={i} cx="25" cy="8" rx="5" ry="11"
        fill={i % 2 === 0 ? '#3daa6e' : '#2c8a55'}
        transform={`rotate(${deg} 25 25)`}
      />
    ))}
    <circle cx="25" cy="25" r="4.5" fill="#1a2e1c"/>
  </svg>
);

const HeroPill = ({ w = 22, h = 70 }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display:'block',flexShrink:0}}>
    <rect x="1" y="1" width={w-2} height={h-2} rx={(w-2)/2}
      fill="rgba(181,237,231,0.7)" stroke="#0a0a0a" strokeWidth="1.75"/>
    <line x1={w/2} y1="2" x2={w/2} y2={h-2} stroke="#0a0a0a" strokeWidth="1.25"/>
  </svg>
);

const HeroTree = () => (
  <svg width="34" height="56" viewBox="0 0 34 56" style={{display:'block',flexShrink:0}}>
    <rect x="14" y="42" width="6" height="14" rx="2" fill="#1a2e1c"/>
    <polygon points="17,2 32,44 2,44" fill="#2d7d4a"/>
    <polygon points="17,16 30,48 4,48" fill="#1f5e36"/>
  </svg>
);

const HeroDecoCol = ({ items }) => (
  <div className="wuf-hero-decos">
    {items.map((item, i) => {
      if (item === 'leaf')      return <HeroLeaf key={i} size={50}/>;
      if (item === 'leaf-sm')  return <HeroLeaf key={i} size={38}/>;
      if (item === 'pill')     return <HeroPill key={i} w={22} h={60}/>;
      if (item === 'pill-lg')  return <HeroPill key={i} w={22} h={84}/>;
      if (item === 'tree')     return <HeroTree key={i}/>;
      return null;
    })}
  </div>
);

/* ── Content store helpers ────────────────────────────────────── */
const CONTENT_KEY = 'donntu_content';
const PEOPLE_IMAGE_VERSION = '20260522-restored';

const DEFAULT_NEWS = [
  { date:'19 травня 2026', title:'Представники ДонНТУ взяли участь у роботі журі фестивалю робототехніки «Inno Tech»', img:'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&h=560&fit=crop' },
  { date:'18 травня 2026', title:'Заходи до Дня пам\'яті жертв політичних репресій та геноциду кримськотатарського народу', img:'' },
  { date:'18 травня 2026', title:'ДонНТУ долучився до розроблення плану профорієнтації Авдіївської громади', img:'' },
  { date:'18 травня 2026', title:'V Всеукраїнська науково-практична конференція «Наукові досягнення сучасної молоді»', img:'' },
  { date:'15 травня 2026', title:'Перший з 2022 року візит представників місцевої влади Японії (м. Камока) до ДонНТУ', img:'' },
];

const DEFAULT_REACH = [
  { n:'1921',     label:'Рік заснування університету' },
  { n:'105',      label:'Років інженерної освіти Донбасу' },
  { n:'40 000+', label:'Випускників за всю історію' },
];

/* Видатні випускники ДонНТУ — фото локально в assets/people/ */
const DEFAULT_SPEAKERS = [
  {
    name: "Анатолій Солов'яненко",
    meta: '1932 – 1999 · КУЛЬТУРА',
    role: 'Оперний співак (тенор), Народний артист СРСР',
    bio:  'Соліст Київської опери, виконав понад 30 провідних тенорових партій. Гастролював у Ла Скала. Герой України (2008).',
    img:  'assets/people/solovyanenko.jpg',
  },
  {
    name: 'Олександр Мінаєв',
    meta: 'випуск 1964 · ОСВІТА',
    role: 'Ректор ДонНТУ · 1989–2014',
    bio:  'Провів університет через незалежність, отримання національного статусу (2001) та пік розвитку: 20 000 студентів, QS-рейтинг. Герой України (2012).',
    img:  'assets/people/minaev.jpg',
  },
  {
    name: 'Юрій Баранов',
    meta: 'випуск 1960 · ГІРНИЧА СПРАВА',
    role: 'Інженер-гірник, керівник вугільних підприємств',
    bio:  'Понад 40 років у вугільній промисловості Донбасу. Впроваджував механізацію видобутку. Герой України (2001).',
    img:  'assets/people/baranov.jpg',
  },
  {
    name: 'Борис Грядущий',
    meta: 'випуск 1956 · ЕНЕРГЕТИКА',
    role: 'Інженер-електромеханік гірничий',
    bio:  'Очолював наукові установи з електрифікації гірничих робіт. Зміцнював енергетичну незалежність України. Герой України (2008).',
    img:  'assets/people/gryadushchyi.jpg',
  },
  {
    name: 'Володимир Коновалов',
    meta: '1911 – 1967 · ВІЙСЬКОВА СПРАВА',
    role: 'Командир підводного човна, Герой Радянського Союзу',
    bio:  'Слухач підготовчих курсів ДГТ у 1922–1925 рр. Командував підводним човном Л-3 під час Другої світової війни — одним із найрезультативніших підводних човнів.',
    img:  'assets/people/konovalov.jpg',
  },
  {
    name: 'Олександр Богданов',
    meta: 'випуск 1981 · ГІРНИЧА СПРАВА',
    role: 'Інженер-механік, керівник вугільної галузі',
    bio:  'Розвивав вугільну промисловість України в умовах ринкових трансформацій. Лідер галузевих об\'єднань. Герой України (2013).',
    img:  'assets/people/bogdanov.jpg',
  },
  {
    name: 'Юрій Білобров',
    meta: 'випуск 1965 · МАШИНОБУДУВАННЯ',
    role: 'Інженер-механік, керівник машинобудівних підприємств',
    bio:  'Очолював одне з найбільших машинобудівних об\'єднань Донбасу. Розвивав випуск гірничого обладнання. Герой України (2004).',
    img:  'assets/people/bilobrov.jpg',
  },
  {
    name: 'Микола Сургай',
    meta: 'випуск 1959 · ГІРНИЧА СПРАВА',
    role: 'Інженер-гірник, керівник вугільної галузі',
    bio:  'Очолював профільні установи з видобутку вугілля. Поєднував практичну роботу з науковою діяльністю. Герой України (2003).',
    img:  'assets/people/surgay.jpg',
  },
];

const DEFAULT_FOCUS = [
  { n:'Розділ 1', title:'Сторічна історія: від технікуму до університету', page:'heritage' },
  { n:'Розділ 2', title:'Цифровий архів: документи та фотографії',         page:'archive' },
  { n:'Розділ 3', title:'Інтерактивне панно «Історія ДонНТУ»',             page:'panneau' },
  { n:'Розділ 4', title:'Кампус і будівлі університету',                   page:'campus' },
  { n:'Розділ 5', title:'Наукові досягнення та видатні випускники',         page:'achievements' },
  { n:'Розділ 6', title:'Майбутнє університету',                           page:'future' },
];

const DEFAULT_VIDEOS = [
  { date:'12 травня 2026', title:'ДонНТУ — 105 років: від гірничого технікуму до національного університету', img:'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop' },
  { date:'4 травня 2026',  title:'Евакуація 2022: голоси викладачів і студентів ДонНТУ', img:'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=450&fit=crop' },
  { date:'18 квітня 2026', title:'Інтерактивне панно «Видатні постаті ДонНТУ» — як це працює', img:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop' },
];

const readContent = () => {
  try { return JSON.parse(localStorage.getItem(CONTENT_KEY) || '{}'); }
  catch { return {}; }
};

/* ── OverviewPage ─────────────────────────────────────────────── */
const OverviewPage = ({ onNavigate }) => {
  const [ct, setCt] = React.useState(readContent);

  React.useEffect(() => {
    const h = () => setCt(readContent());
    window.addEventListener('donntu-content-updated', h);
    window.addEventListener('storage', h);
    return () => {
      window.removeEventListener('donntu-content-updated', h);
      window.removeEventListener('storage', h);
    };
  }, []);

  /* accessor: content store value with fallback to default */
  const cv = (k, d) => (ct[k] !== undefined && ct[k] !== null && ct[k] !== '') ? ct[k] : d;

  /* dynamic data */
  const news        = cv('newsItems',   DEFAULT_NEWS);
  const reach       = cv('reachStats',  DEFAULT_REACH);
  const speakers    = cv('speakers',    DEFAULT_SPEAKERS);
  const focusAreas  = cv('focusAreas',  DEFAULT_FOCUS);
  const videos      = cv('videos',      DEFAULT_VIDEOS);

  /* hero */
  const heroDate    = cv('heroDate',    '1921 — наш час');
  const heroPlace   = cv('heroPlace',   'Дрогобич · Львівська обл. · Україна');
  const heroTitle   = cv('heroTitle',   'DONNTU\nЦИФРОВА\nСПАДЩИНА');
  const heroTheme   = cv('heroTheme',   'Цифрова спадщина:\nсторічна історія, пам\'ять і відновлення');

  /* theme section */
  const themeH      = cv('themeHeading', 'Тема порталу');
  const themeBody   = cv('themeBody',    'Тема цифрового порталу — «Цифрова спадщина: сторічна історія, пам\'ять і відновлення» — об\'єднує понад 100 років інженерної освіти, науки та культури з місією зберегти ім\'я, обличчя і голос університету. Заснований у 1921 році як гірничий технікум, ДонНТУ пройшов шлях від Донецька через евакуацію до Дрогобича. Тут — архіви, портрети, біографії і надія.');

  /* dialogues */
  const dialogH     = cv('dialoguesHeading', 'Діалоги про спадщину');
  const dialogBody  = cv('dialoguesBody',    'Серія публічних розмов із істориками, випускниками й учнями про те, як зберегти інженерну культуру Донбасу, передати її новим поколінням і вписати у спільну українську спадщину.');
  const dialogImg   = cv('dialoguesImg',     'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&h=600&fit=crop');
  const dialogCount = cv('dialoguesCount',   '12 відеозаписів та транскриптів');

  /* host city */
  const hostBlueH   = cv('hostBlueHeading', 'Ми вітаємо ДонНТУ\nу Дрогобичі');
  const hostBlueP1  = cv('hostBlueP1', 'Донецький національний технічний університет продовжує свою столітню місію в нових умовах — у Дрогобичі, Львівська область. Як університет-переселенець, ДонНТУ зберігає понад 100 років інженерної освіти Донбасу й відкриває нову сторінку в серці Галичини.');
  const hostBlueP2  = cv('hostBlueP2', 'Учасники порталу знайдуть тут унікальне поєднання цифрового архіву, живих спогадів та інтерактивних ресурсів — де спадщина і сучасність існують поруч, а люди залишаються в центрі кожної сторінки.');
  const hostPinkP1  = cv('hostPinkP1', 'Дрогобич — стародавнє місто Галичини з багатою культурною спадщиною, розташоване у Львівській області, неподалік Карпат. Місто, де народилися Іван Франко та Бруно Шульц, стало новим домом для ДонНТУ.');
  const hostPinkP2  = cv('hostPinkP2', 'Відмінна інфраструктура й наукова традиція роблять Дрогобич ідеальним місцем для відродження університету.');
  const hostPhoto   = cv('hostCityPhoto', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=600&fit=crop&q=80');
  const hostQName   = cv('hostQuoteName', 'Денис Шиленко');
  const hostQRole   = cv('hostQuoteRole', 'В. о. ректора Донецького національного технічного університету');
  const hostQText   = cv('hostQuoteText', 'Ми евакуювали університет двічі — і щоразу зберегли головне: людей, знання та ідентичність. Наша місія — готувати інженерів для відбудови України.');

  /* footer */
  const footerBrand   = cv('footerBrand',   'DONNTU');
  const footerTagline = cv('footerTagline',  'Донецький національний технічний університет.\nЦифрова спадщина · Пам\'ять · Відновлення.');
  const footerCopy    = cv('footerCopyright','© 2026 ДонНТУ · Цифрова спадщина · mail@donntu.edu.ua');
  const footerAddr    = cv('footerAddress',  'вул. Самбірська, 76 · Дрогобич · Львівська обл. · donntu.edu.ua');

  const personImg = src => (
    src && src.startsWith('assets/people/') && !src.includes('?')
      ? `${src}?v=${PEOPLE_IMAGE_VERSION}`
      : src
  );

  return (
    <div>

      {/* ══ HOST CITY — Mondrian block ══ */}
      <section className="wuf-host">
        <div className="wuf-host-grid">
          {/* ① Blue */}
          <div className="wuf-host-blue">
            <h2 className="wuf-host-blue-h">
              {hostBlueH.split('\n').map((l,i,a)=>(
                <React.Fragment key={i}>{l}{i<a.length-1&&<br/>}</React.Fragment>
              ))}
            </h2>
            <p className="wuf-host-blue-p">{hostBlueP1}</p>
            <p className="wuf-host-blue-p">{hostBlueP2}</p>
          </div>
          {/* ② Pink */}
          <div className="wuf-host-pink">
            <p className="wuf-host-pink-p">{hostPinkP1}</p>
            <p className="wuf-host-pink-p">{hostPinkP2}</p>
          </div>
          {/* ③ Photo — Вілла Яроша */}
          <div className="wuf-host-photo-box">
            <div className="wuf-host-photo-inner">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Casco_hist%C3%B3rico_de_Drogobych.jpg" alt="Історичний центр Дрогобича" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} loading="lazy"/>
            </div>
          </div>
          {/* ④ City photo — Вілла Б'янки */}
          <div className="wuf-host-city-photo">
            <img src="assets/drohobych-168.jpg" alt="Вілла Б'янки (Палац мистецтв) — вул. Шевченка, 38" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} loading="lazy"/>
          </div>
          {/* ⑤ City panorama — Ратуша */}
          <div className="wuf-host-illustration">
            <img src="assets/drohobych-panorama.jpg" alt="Дрогобицька Ратуша — символ міста" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} loading="lazy"/>
          </div>
          {/* ⑥ Quote */}
          <div className="wuf-host-quote">
            <div className="wuf-host-quote-avatar">
              <img src="assets/shylenko.jpg" alt="Денис Шиленко" loading="lazy"/>
            </div>
            <div className="wuf-host-quote-name">{hostQName}</div>
            <div className="wuf-host-quote-role">{hostQRole}</div>
            <blockquote className="wuf-host-quote-text">«{hostQText}»</blockquote>
          </div>
        </div>
      </section>

      {/* ══ HERITAGE OS SECTION — dark Mondrian ══ */}
      <section style={{background:'#0d0f14'}}>

        {/* Row 1: heading + Donetsk photo */}
        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', minHeight:440}}>

          {/* Dark title tile */}
          <div style={{background:'#0d0f14', color:'#f0ede6', padding:'3rem',
            display:'flex', flexDirection:'column', justifyContent:'center', gap:'1.5rem',
            borderRight:'1px solid rgba(255,255,255,0.07)', borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
            <div style={{fontFamily:'var(--mono)', fontSize:'0.6rem', letterSpacing:'0.16em',
              textTransform:'uppercase', color:'rgba(240,237,230,0.35)'}}>
              ЦИФРОВА ПЛАТФОРМА · DONNTU
            </div>
            <h2 style={{fontFamily:'var(--display)', fontWeight:400, margin:0,
              fontSize:'2rem', lineHeight:'2.5rem', color:'#f0ede6'}}>
              DONNTU{' '}
              <em style={{fontStyle:'italic', color:'#f26522'}}>Heritage</em>{' '}OS
            </h2>
            <p style={{fontFamily:'var(--display)', fontSize:'1.5rem', lineHeight:'2rem',
              fontWeight:400, color:'rgba(240,237,230,0.75)', margin:0}}>
              Цифровий двійник університету — архів, симуляції, сертифікаційна платформа
              та часова капсула. Університет, що існує незалежно від адреси.
            </p>
            <div style={{display:'flex', gap:'0.75rem', flexWrap:'wrap', marginTop:'0.5rem'}}>
              <button className="wuf-hos-btn wuf-hos-btn--primary" onClick={() => onNavigate('heritage')}>
                Спадщина →
              </button>
              <button className="wuf-hos-btn wuf-hos-btn--ghost" style={{borderColor:'rgba(255,255,255,0.2)', color:'rgba(240,237,230,0.7)'}}>
                Про систему
              </button>
            </div>
          </div>

          {/* Donetsk city photo from Wikimedia */}
          <div style={{position:'relative', overflow:'hidden',
            borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donetsk_city_panorama.jpg/1280px-Donetsk_city_panorama.jpg"
              onError={function(e){ e.target.src='assets/donetsk-main.jpg'; }}
              alt="Донецьк · панорама міста"
              loading="lazy"
              style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}
            />
            <div style={{position:'absolute', bottom:0, left:0, right:0,
              background:'linear-gradient(transparent, rgba(0,0,0,0.8))',
              padding:'3rem 1.5rem 1.25rem',
              fontFamily:'var(--mono)', fontSize:'0.6rem', letterSpacing:'0.12em',
              textTransform:'uppercase', color:'rgba(255,255,255,0.7)'}}>
              Донецьк · місто, яке чекає · Wikimedia Commons
            </div>
          </div>
        </div>

        {/* Row 2: three centers */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr'}}>

          {/* Центр сертифікації — blue */}
          <div style={{background:'#005ab8', color:'#fff', padding:'3rem',
            borderRight:'1px solid rgba(255,255,255,0.1)',
            display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:320}}>
            <div>
              <div style={{fontFamily:'var(--mono)', fontSize:'0.6rem', letterSpacing:'0.14em',
                textTransform:'uppercase', color:'rgba(255,255,255,0.5)', marginBottom:'1.25rem'}}>
                01 · ЦЕНТР СЕРТИФІКАЦІЇ
              </div>
              <h3 style={{fontFamily:'var(--display)', fontWeight:400, fontSize:'2rem',
                lineHeight:'2.5rem', color:'#fff', margin:'0 0 1rem'}}>
                Цифрові сертифікати
              </h3>
              <p style={{fontFamily:'var(--display)', fontSize:'1.5rem', lineHeight:'2rem',
                fontWeight:400, color:'rgba(255,255,255,0.75)', margin:0}}>
                Верифіковані цифрові документи для студентів та випускників ДонНТУ.
                Підтвердження ідентичності та освіти — незалежно від того, де ви зараз.
              </p>
            </div>
            <button className="wuf-hos-btn" onClick={() => onNavigate('certs')}
              style={{marginTop:'2rem', background:'rgba(255,255,255,0.12)',
                border:'1px solid rgba(255,255,255,0.25)', color:'#fff', alignSelf:'flex-start'}}>
              Отримати сертифікат →
            </button>
          </div>

          {/* Центр симуляції — teal/dark */}
          <div style={{background:'#0d7f72', color:'#fff', padding:'3rem',
            borderRight:'1px solid rgba(255,255,255,0.1)',
            display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:320}}>
            <div>
              <div style={{fontFamily:'var(--mono)', fontSize:'0.6rem', letterSpacing:'0.14em',
                textTransform:'uppercase', color:'rgba(255,255,255,0.5)', marginBottom:'1.25rem'}}>
                02 · ЦЕНТР ЕМУЛЯЦІЇ
              </div>
              <h3 style={{fontFamily:'var(--display)', fontWeight:400, fontSize:'2rem',
                lineHeight:'2.5rem', color:'#fff', margin:'0 0 1rem'}}>
                Симуляція кампусу
              </h3>
              <p style={{fontFamily:'var(--display)', fontSize:'1.5rem', lineHeight:'2rem',
                fontWeight:400, color:'rgba(255,255,255,0.75)', margin:0}}>
                Інтерактивні лабораторії, симульований кампус ДонНТУ та навчальні
                модулі — доступні з будь-якої точки світу.
              </p>
            </div>
            <button className="wuf-hos-btn" onClick={() => onNavigate('simulation')}
              style={{marginTop:'2rem', background:'rgba(255,255,255,0.12)',
                border:'1px solid rgba(255,255,255,0.25)', color:'#fff', alignSelf:'flex-start'}}>
              Увійти до симуляції →
            </button>
          </div>

          {/* Часова капсула — orange */}
          <div style={{background:'#f26522', color:'#fff', padding:'3rem',
            display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:320}}>
            <div>
              <div style={{fontFamily:'var(--mono)', fontSize:'0.6rem', letterSpacing:'0.14em',
                textTransform:'uppercase', color:'rgba(255,255,255,0.5)', marginBottom:'1.25rem'}}>
                03 · ЧАСОВА КАПСУЛА
              </div>
              <h3 style={{fontFamily:'var(--display)', fontWeight:400, fontSize:'2rem',
                lineHeight:'2.5rem', color:'#fff', margin:'0 0 1rem'}}>
                Послання майбутньому
              </h3>
              <p style={{fontFamily:'var(--display)', fontSize:'1.5rem', lineHeight:'2rem',
                fontWeight:400, color:'rgba(255,255,255,0.85)', margin:0}}>
                Залиште своє послання для майбутніх поколінь ДонНТУ. Відкриється,
                коли університет повернеться до Донецька.
              </p>
            </div>
            <button className="wuf-hos-btn" onClick={() => onNavigate('timecapsule')}
              style={{marginTop:'2rem', background:'rgba(0,0,0,0.15)',
                border:'1px solid rgba(255,255,255,0.3)', color:'#fff', alignSelf:'flex-start'}}>
              Залишити послання →
            </button>
          </div>
        </div>

        {/* Row 3: additional features strip */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)',
          borderTop:'1px solid rgba(255,255,255,0.07)'}}>
          {[
            { n:'01', title:'Цифровий архів', desc:'Документи, фото та відео з понад 100-річної історії.', page:'archive' },
            { n:'02', title:'Інтерактивне панно', desc:'Портрети видатних постатей ДонНТУ — клікайте, читайте.', page:'panneau' },
            { n:'03', title:'Наука та досягнення', desc:'Патенти, наукові школи, лауреати — задокументовано.', page:'achievements' },
          ].map((f, i) => (
            <div key={i} onClick={() => onNavigate(f.page)}
              style={{padding:'2rem 2.5rem', cursor:'pointer',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                background:'#111318', transition:'background 0.2s'}}
              onMouseEnter={e => e.currentTarget.style.background='#161b24'}
              onMouseLeave={e => e.currentTarget.style.background='#111318'}>
              <div style={{fontFamily:'var(--mono)', fontSize:'0.55rem', letterSpacing:'0.14em',
                color:'rgba(255,255,255,0.25)', marginBottom:'0.75rem'}}>{f.n}</div>
              <div style={{fontFamily:'var(--display)', fontWeight:700, fontSize:'1rem',
                color:'#f0ede6', marginBottom:'0.4rem'}}>{f.title}</div>
              <div style={{fontFamily:'var(--display)', fontSize:'0.85rem', lineHeight:'1.4rem',
                color:'rgba(240,237,230,0.45)'}}>{f.desc}</div>
            </div>
          ))}
        </div>

      </section>

      {/* ══ REACH STATS ══ */}
      <section className="wuf-reach">
        <div className="wuf-reach-inner">
          <h2 className="wuf-reach-title">ДонНТУ у цифрах</h2>
          <div className="wuf-reach-grid">
            {reach.map((r, i) => (
              <div key={i} className="wuf-reach-item">
                <div className="wuf-reach-n">{r.n}</div>
                <div className="wuf-reach-l">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ПАННО ══ */}
      <section className="wuf-panneau-sec">
        <div className="wuf-panneau-embed">
          <HeritageDonntuPage onNavigate={onNavigate}/>
        </div>
      </section>

      {/* ══ SPEAKERS ══ */}
      <section className="wuf-alumni">
        <div className="wuf-alumni-head">
          <div className="wuf-alumni-head-text">
            <h2 className="wuf-alumni-h">Видатні випускники</h2>
            <p className="wuf-alumni-lead">
              Понад 100 років ДонНТУ виховує інженерів, науковців і державних діячів.
              Серед випускників — Герої України, лауреати державних премій, видатні
              митці й політичні постаті.
            </p>
          </div>
        </div>

        <div className="wuf-alumni-grid">
          {speakers.map((s, i) => (
            <article key={i} className="wuf-person">
              <div className="wuf-person-img">
                {s.img
                  ? <img src={personImg(s.img)} alt={s.name} loading={i < 8 ? 'eager' : 'lazy'} decoding="async"/>
                  : <div className="wuf-person-img-fb">{s.name.charAt(0)}</div>
                }
              </div>
              <div className="wuf-person-body">
                {s.meta && <div className="wuf-person-meta">{s.meta}</div>}
                <h3 className="wuf-person-name">{s.name}</h3>
                <div className="wuf-person-role">{s.role}</div>
                {s.bio && <p className="wuf-person-bio">{s.bio}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══ WAR & UNIVERSITY ══ */}
      <section className="wuf-war">
        <div className="wuf-war-mondrian">

          {/* 1а — Донецьк · текстовий блок */}
          <div className="wuf-wm-don-txt">
            <div className="wuf-wm-don-label">1921 — 2014 · Перша адреса</div>
            <h2 className="wuf-wm-don-h">Донецьк</h2>
            <div className="wuf-wm-don-period">Під окупацією з квітня 2014</div>
            <p className="wuf-wm-don-p">
              Головний кампус на 11 корпусів — місце народження університету.
              Бібліотека, аудиторії, лабораторії — залишені, але не забуті.
              З квітня 2014 — під окупацією.
            </p>
            <div className="wuf-wm-don-addr">вул. Артема, 58 · Донецьк</div>
          </div>

          {/* 1б — Донецьк · фото корпусу */}
          <div className="wuf-wm-cell wuf-wm-don-img">
            <img src="assets/donetsk-main.jpg" alt="Головний корпус ДонНТУ у Донецьку" loading="lazy"/>
            <div className="wuf-wm-badge wuf-wm-badge--red">окупований з квітня 2014</div>
          </div>

          {/* 2 — Покровськ до удару */}
          <div className="wuf-wm-cell wuf-wm-pokr-b">
            <img src="assets/pokrovsk-main.jpg" alt="Покровськ до удару" loading="lazy"/>
            <div className="wuf-wm-badge wuf-wm-badge--teal">2014 — 2024 · до удару</div>
            <div className="wuf-wm-caption">
              <div className="wuf-wm-caption-period">Друга адреса · Покровськ · вул. Центральна, 84</div>
              <div className="wuf-wm-caption-city">10 років відродження</div>
            </div>
          </div>

          {/* 3 — Покровськ знищено */}
          <div className="wuf-wm-cell wuf-wm-pokr-d wuf-wm-ruins">
            <img src="https://pokrovsk.news/uploads/news/1200x675/llmuisleiwryfhi4kvyezgca5m78fj70.jpg" alt="Університет після удару" loading="lazy"/>
            <div className="wuf-wm-badge wuf-wm-badge--red">28.02.2024 · 00:50 · знищено</div>
            <div className="wuf-wm-caption">
              <div className="wuf-wm-caption-period">4 ракети · 2 влучили в університет</div>
              <div className="wuf-wm-caption-city">Знищено</div>
            </div>
          </div>

          {/* 4 — Луцьк */}
          <div className="wuf-wm-cell wuf-wm-lutsk">
            <img src="https://donntu.edu.ua/wp-content/uploads/2022/04/1649868313173.jpeg" alt="Евакуація ДонНТУ до Луцька, квітень 2022" loading="lazy"/>
            <div className="wuf-wm-badge wuf-wm-badge--teal">квітень 2022 – 2024</div>
            <div className="wuf-wm-caption">
              <div className="wuf-wm-caption-period">Третя адреса · Луцьк / ЛНТУ</div>
              <div className="wuf-wm-caption-city">2 роки евакуації</div>
            </div>
          </div>

          {/* 5 — Рятувальна операція */}
          <div className="wuf-wm-cell wuf-wm-rescue wuf-wm-ruins">
            <img src="https://pokrovsk.news/uploads/news/resize/w/750x750/rxj0nmbs8i1nc9oh.jpg" alt="Рятувальники" loading="lazy"/>
            <div className="wuf-wm-badge wuf-wm-badge--red">28.02.2024 · рятувальники</div>
            <div className="wuf-wm-caption">
              <div className="wuf-wm-caption-period">Покровськ · 00:50</div>
              <div className="wuf-wm-caption-city">Жертв не було</div>
            </div>
          </div>

          {/* 6 — Центр міста */}
          <div className="wuf-wm-cell wuf-wm-center wuf-wm-ruins">
            <img src="https://pokrovsk.news/uploads/news/resize/w/750x750/otwbqh4z06ncgbuk.jpg" alt="Центр Покровська" loading="lazy"/>
            <div className="wuf-wm-badge wuf-wm-badge--red">14+ будівель · пошкоджено</div>
            <div className="wuf-wm-caption">
              <div className="wuf-wm-caption-period">Покровськ · лютий 2024</div>
              <div className="wuf-wm-caption-city">Центр міста</div>
            </div>
          </div>

          {/* 7 — Навчання не зупинилось · фото + оверлей */}
          <div className="wuf-wm-cell wuf-wm-online">
            <img src="https://pokrovsk.news/uploads/news/resize/w/750x750/spfejone5rx5accl.jpg" alt="Навчання тривало після удару" loading="lazy"/>
            <div className="wuf-wm-badge wuf-wm-badge--teal">01.03.2024 · навчання тривало</div>
            <div className="wuf-wm-caption">
              <div className="wuf-wm-caption-period">Березень 2024 · онлайн</div>
              <div className="wuf-wm-caption-city">Навчання не зупинилось</div>
              <div className="wuf-wm-caption-sub">
                Наступного ж дня після удару — заняття онлайн. Жодної спеціальності не закрито.
              </div>
            </div>
          </div>

          {/* 8 — Дрогобич */}
          <div className="wuf-wm-cell wuf-wm-dro">
            <img src="assets/drohobych-campus.jpg" alt="Кампус ДонНТУ у Дрогобичі" loading="lazy"/>
            <div className="wuf-wm-badge wuf-wm-badge--green">серпень 2024 → зараз</div>
            <div className="wuf-wm-caption">
              <div className="wuf-wm-caption-period">Четверта адреса · Дрогобич · вул. Шевченка, 18</div>
              <div className="wuf-wm-caption-city">Новий дім університету</div>
            </div>
          </div>

        </div>

        <div className="wuf-war-quote">
          <blockquote className="wuf-war-blockquote">
            «Ми евакуювали не лише людей і документи. Ми евакуювали ідентичність.»
          </blockquote>
        </div>
      </section>

      {/* ══ LIBRARY / UNREALIZED DREAM ══ */}
      <section className="wuf-library">
        {/* Mondrian grid — same style as СЕКЦІЯ 01 */}
        <div className="wuf-host-grid">
          {/* ① Blue — heading + intro */}
          <div className="wuf-host-blue">
            <h2 className="wuf-host-blue-h">
              НТБ ДонНТУ<br/>Науково-технічна<br/>бібліотека
            </h2>
            <p className="wuf-host-blue-p">Понад 1 300 000 томів. Сто років зібраних знань. Залишилась у Донецьку.</p>
            <p className="wuf-host-blue-p">Заснована у 1921 році — одна з найбільших технічних бібліотек України.</p>
          </div>
          {/* ② Pink — stats */}
          <div className="wuf-host-pink">
            <p className="wuf-host-pink-p">1,3 млн томів до 2014 року</p>
            <p className="wuf-host-pink-p">250 000 записів в електронному каталозі</p>
            <p className="wuf-host-pink-p">32 000+ документів у репозиторії ELARDONTU</p>
          </div>
          {/* ③ Photo — бібліотека */}
          <div className="wuf-host-photo-box">
            <div className="wuf-host-photo-inner">
              <img src="assets/donetsk-library.jpg" alt="НТБ ДонНТУ — будівля бібліотеки у Донецьку" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} loading="lazy"/>
            </div>
          </div>
          {/* ④ Wide photo — читальний зал */}
          <div className="wuf-host-city-photo">
            <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&h=600&fit=crop" alt="Читальний зал" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} loading="lazy"/>
          </div>
          {/* ⑤ Illustration — архів */}
          <div className="wuf-host-illustration">
            <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=500&fit=crop" alt="Книжковий архів" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} loading="lazy"/>
          </div>
          {/* ⑥ Quote — цифрова спадщина */}
          <div className="wuf-host-quote">
            <div className="wuf-library-dream-tag" style={{marginBottom:'1rem'}}>Цифрова спадщина</div>
            <p className="wuf-host-quote-text">
              Попри втрату фізичного фонду, бібліотека продовжує роботу онлайн. Електронний каталог — ~250 000 записів, репозиторій ELARDONTU — понад 32 000 документів. Доступ до Web of Science, Scopus та EBSCO.
            </p>
            <p className="wuf-host-quote-text" style={{marginTop:'1rem',color:'#c0392b',fontWeight:600}}>
              0 томів евакуйовано у 2014
            </p>
          </div>
        </div>
      </section>

      {/* ══ TIMELINE STRIP ══ */}
      <section className="wuf-tl-strip">
        {[
          { yr:'1921', label:'Заснування' },
          { yr:'1941', label:'Евакуація I' },
          { yr:'2001', label:'Національний статус' },
          { yr:'2014', label:'Окупація' },
          { yr:'2022', label:'Евакуація II' },
          { yr:'2024', label:'Дрогобич' },
          { yr:'2026', label:'Heritage OS' },
        ].map((t, i, arr) => (
          <React.Fragment key={t.yr}>
            <div className="wuf-tl-item">
              <div className="wuf-tl-yr">{t.yr}</div>
              <div className="wuf-tl-dot"/>
              <div className="wuf-tl-label">{t.label}</div>
            </div>
            {i < arr.length - 1 && <div className="wuf-tl-line"/>}
          </React.Fragment>
        ))}
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="wuf-footer">
        <div className="wuf-footer-inner">
          <div className="wuf-footer-top">

            {/* Brand */}
            <div>
              <div className="wuf-footer-brand">DONNTU</div>
              <div className="wuf-footer-brand" style={{fontSize:'1rem',letterSpacing:'0.06em',opacity:.55,marginTop:'-0.25rem',marginBottom:'1rem'}}>HERITAGE OS</div>
              <p className="wuf-footer-tagline">Цифрова спадщина<br/>сторічної інженерної освіти<br/>Донбасу.</p>
            </div>

            {/* Спадщина */}
            <div>
              <div className="wuf-footer-heading">СПАДЩИНА</div>
              <div className="wuf-footer-links">
                <button className="wuf-footer-link" onClick={() => onNavigate('heritage')}>Сторічна історія</button>
                <button className="wuf-footer-link" onClick={() => onNavigate('panneau')}>Інтерактивне панно</button>
                <button className="wuf-footer-link" onClick={() => onNavigate('archive')}>Цифровий архів</button>
                <button className="wuf-footer-link" onClick={() => onNavigate('campus')}>Кампус та адреси</button>
                <button className="wuf-footer-link" onClick={() => onNavigate('library')}>Бібліотека НТБ</button>
              </div>
            </div>

            {/* Heritage OS */}
            <div>
              <div className="wuf-footer-heading">HERITAGE OS</div>
              <div className="wuf-footer-links">
                <button className="wuf-footer-link" onClick={() => onNavigate('future')}>Майбутнє</button>
                <button className="wuf-footer-link" onClick={() => onNavigate('certs')}>Сертифікація</button>
                <button className="wuf-footer-link" onClick={() => onNavigate('simulation')}>Симуляція</button>
                <button className="wuf-footer-link" onClick={() => onNavigate('timecapsule')}>Часова капсула</button>
                <button className="wuf-footer-link" onClick={() => onNavigate('applicant')}>Абітурієнту</button>
              </div>
            </div>

          </div>
          <div className="wuf-footer-bottom">
            <span className="wuf-footer-copy">{footerCopy}</span>
            <span className="wuf-footer-copy">{footerAddr}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

Object.assign(window, { OverviewPage });
