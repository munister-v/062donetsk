/* Labs Page v6 — wuf-host type scale, virtual interactive labs tied to DonNTU history */

/* ── Type tokens (wuf-host exact) ─────────────────────────────── */
const LH  = { fontFamily:'var(--display)', fontSize:'2rem',   lineHeight:'2.5rem', fontWeight:400 };
const LB2 = { fontFamily:'var(--display)', fontSize:'1.5rem', lineHeight:'2rem',   fontWeight:400 };
const LBL = { fontFamily:'var(--mono)',    fontSize:'0.6rem', letterSpacing:'0.14em', textTransform:'uppercase', lineHeight:'1rem' };
const LPAD = '3rem';
const LBR  = '1px solid rgba(0,0,0,0.08)';

/* ── Colours ───────────────────────────────────────────────────── */
const LBLUE='#005ab8', LPINK='#f48ba2', LTEAL='#c0e5e7', LYELL='#f5d248';
const LORG='#f26522', LDARK='#0d0f14', LCREAM='#f0ede6', LNAVY='#1a1a2e';
const LWHITE='#fff', LOFF='#111214';

/* ── Status config ─────────────────────────────────────────────── */
const STATUS = {
  open:      { color: LBLUE,  dot: LBLUE  },
  completed: { color: '#4a7c59', dot: '#4a7c59' },
  flagship:  { color: LORG,   dot: LORG   },
};

/* ── Labs data ─────────────────────────────────────────────────── */
const LABS = [
  {
    id:'L·01', ua:'Шахта ім. Засядька', disc:'Гірнича інженерія',
    d:4, t:'60 хв', s:'open', sLbl:'ВІДКРИТО',
    brief:'SCADA-тренажер диспетчера: метан, вентиляція та аварійний сценарій у реальному часі.',
    fullDesc:"Цифровий двійник диспетчерського пункту шахти ім. Засядька — найбільшої шахти Донбасу (25 000 гірників, глибина 1400 м). Студент бере роль чергового диспетчера і в реальному часі відстежує показники вентиляції, рівень метану в трьох вибоях та стан підйомних механізмів. Сценарій завершується аварійною ситуацією, яку треба розв'язати за 8 хвилин.",
    interactions:['Моніторинг метану CH₄ по вибоях','Управління вентиляційними дверима','Аварія: газовий викид — евакуація зміни',"Зв'язок з гірничорятувальниками"],
    context:"Шахта ім. Засядька, вул. Стратонавтів, Донецьк. Діяла 1958–2018.",
    color: LTEAL,
  },
  {
    id:'L·02', ua:'Кампус Артема, 58', disc:'Архів університету',
    d:1, t:'30 хв', s:'open', sLbl:'ВІДКРИТО',
    brief:'3D-прогулянка кампусом Донецька — аудиторії, архівні фото 1950–2014, останній день.',
    fullDesc:"Реконструйований цифровий кампус ДонНТУ на вул. Артема, 58. Ходиш по коридорах, заходиш в аудиторії, дивишся архівні фото і документи. Кожна кімната — шар часу: переключаєш між 1960, 1991, 2005 та 2014 роками і бачиш як змінювалось середовище. Завершується 16 лютого 2022 — останній день перед евакуацією.",
    interactions:['Навігація по корпусах (схема поверхів)','Перемикач часових шарів 1960→2014','Архівні документи і фотографії','Остання перекличка: 16.02.2022'],
    context:"Головний корпус ДонНТУ, Донецьк. Відкритий 1926, окупований 2014.",
    color: LYELL,
  },
  {
    id:'L·03', ua:'Евакуація × 3', disc:'Історія університету',
    d:2, t:'45 хв', s:'open', sLbl:'ВІДКРИТО',
    brief:'Три евакуації: 1941, 2014, 2022. Порівняльна карта, документи, рішення.',
    fullDesc:"Інтерактивна карта трьох евакуацій університету. 1941: під бомбардуваннями — до Прокоп'євська. 2014: під обстрілами — до Покровська. 2022: знову — до Луцька, потім Дрогобич. Для кожної евакуації: маршрут, перелік вивезеного обладнання, накази ректора, листи викладачів і студентів.",
    interactions:['Карта маршрутів трьох евакуацій','Архів наказів і документів по роках','Порівняння: що вдалось зберегти',"Інтерв'ю очевидців (аудіо)"],
    context:"Прокоп'євськ (1941) → Покровськ (2014) → Луцьк → Дрогобич (2022–2024).",
    color: LPINK,
  },
  {
    id:'L·04', ua:'Геологічний розріз Донбасу', disc:'Геологія',
    d:3, t:'50 хв', s:'open', sLbl:'ВІДКРИТО',
    brief:'Профіль надр до 2000 м: клікай шари, визначай породи, знаходь вугільні пласти.',
    fullDesc:"Вертикальний розріз донецького басейну від поверхні до глибини 2000 м. Клікаєш на геологічний шар — отримуєш інформацію про породу, вік, характеристики. Завдання: знайти 6 вугільних пластів, оцінити їх промислову цінність, нанести на карту шахтне поле. Дані базуються на реальних геологічних звітах ДонНТУ.",
    interactions:['Вертикальний розріз з 12 шарами','Визначення мінералів та порід','Розрахунок запасів пласта','Побудова геологічної карти шахтного поля'],
    context:"Реальні геологічні дані Донецького кам'яновугільного басейну, архів ДонНТУ.",
    color: LTEAL,
  },
  {
    id:'L·05', ua:'Реконструкція міста', disc:'Містобудування',
    d:4, t:'75 хв', s:'open', sLbl:'ВІДКРИТО',
    brief:'Симулятор відбудови: супутникові дані руйнувань, тріаж, розподіл ресурсів.',
    fullDesc:"Ти — керівник відділу відновлення. Є супутникові знімки пошкодженого міста, обмежений бюджет і 500 днів. Потрібно: оцінити збитки за категоріями, скласти тріаж інфраструктури (лікарні → школи → житло → промисловість), обрати підрядників, розподілити фінансування. Сценарії побудовані на основі даних CEDOS та World Bank.",
    interactions:['Карта пошкоджень з фільтрами','Тріаж: розстав пріоритети відбудови','Бюджетний калькулятор','Підсумковий звіт та рейтинг рішень'],
    context:"Методологія RAPID Assessment, World Bank. Синтетичні дані на основі відкритих джерел.",
    color: LBLUE,
  },
  {
    id:'L·06', ua:'Метанова хвиля', disc:'Безпека праці',
    d:5, t:'40 хв', s:'open', sLbl:'ВІДКРИТО',
    brief:'Фізика вибуху в шахті: розрахуй вентиляцію, встанови кордон безпеки, врятуй зміну.',
    fullDesc:"Симуляція поширення метанової хвилі в гірничій виробці. Задаєш параметри вентиляції, довжину виробки, концентрацію газу. Модель розраховує зону вибуху, ударну хвилю, температуру. Твоя задача — встановити правильний вентиляційний режим і евакуювати зміну до моменту займання. Ціна помилки — статистика реальних аварій.",
    interactions:['Параметрична модель вибуху','Розрахунок вентиляційного тиску','Евакуаційний план (таймер)','Статистика аварій Донбасу 1990–2014'],
    context:"Базується на методиці ННДІПБОП (Донецьк). Параметри реальних шахт Донбасу.",
    color: LORG,
  },
  {
    id:'L·07', ua:'Коксова піч', disc:'Хімічні технології',
    d:3, t:'45 хв', s:'open', sLbl:'ВІДКРИТО',
    brief:'Повний цикл коксування: від донецького вугілля до металургійного коксу та побічних продуктів.',
    fullDesc:"Повний цикл виробництва коксу від завантаження вугільної шихти до вивантаження готового продукту. Студент контролює температуру, тривалість, хімічний склад. Побічні продукти (бензол, смола, аміак) збираються і оцінюються. Фінальний крок: перевірка якості коксу за стандартом ДСТУ для металургії.",
    interactions:['Завантаження шихти та склад вугілля','Температурний графік піролізу','Збір та ідентифікація побічних продуктів','QC: перевірка якості коксу'],
    context:"Донецький коксохімічний завод — один з найбільших в Європі. Сировина: вугілля марок Ж, КЖ.",
    color: LYELL,
  },
  {
    id:'L·08', ua:'Аудиторія 1921', disc:'Історія університету',
    d:1, t:'25 хв', s:'completed', sLbl:'ЗАВЕРШЕНО',
    brief:'Перша лекція ДГІ, 30 травня 1921. Засновники, перші залікові книжки, голоси епохи.',
    fullDesc:"Віртуальна реконструкція першої аудиторії Донецького гірничого інституту. Дата: 30 травня 1921. Ти — студент першого набору. Перша лекція з геодезії, 23 студенти, крейда на дошці. Між заняттями — архівна колекція: перші залікові книжки, список викладачів, фотографії юзівського технікуму.",
    interactions:['Реконструйована аудиторія (3D)','Архів: перший список студентів 1921','Перші залікові книжки (скани)','Хронологія: ДГІ → ДПІ → ДНТУ → ДонНТУ'],
    context:"Гірничий технікум у Юзівці (нині Донецьк), відкритий 30 травня 1921 р.",
    color: LCREAM,
  },
  {
    id:'L·09', ua:'Дрон над Донецьком', disc:'Дистанційне зондування',
    d:3, t:'55 хв', s:'open', sLbl:'ВІДКРИТО',
    brief:'Пілотуєш дрон над реконструйованим містом, фіксуєш пошкодження, складаєш HALO-звіт.',
    fullDesc:"Симулятор польоту розвідувального дрону над умовним містом (геометрія — реальний Донецьк, текстури — нейтральні). Місія: за 20 хвилин польоту обстежити 6 кварталів, зафіксувати пошкодження, класифікувати об'єкти (житло, лікарня, дорога, міст). Зібрані дані автоматично формуються у звіт HALO-формату.",
    interactions:['Симулятор польоту (WASD + камера)',"Класифікатор пошкоджень (клік на об'єкт)",'Тепловізійний і RGB режими','Генерація HALO-звіту'],
    context:"Методологія HALO Trust та UN Habitat для оцінки пошкоджень в зонах конфліктів.",
    color: LBLUE,
  },
  {
    id:'L·10', ua:'Рішення ректора', disc:'Управління в кризі',
    d:5, t:'90 хв', s:'flagship', sLbl:'ФЛАГМАН',
    brief:'28 лютого 2022, 04:00. Ти — ректор. 72 години щоб врятувати університет. Квест з реальними документами.',
    fullDesc:"Текстовий квест-симулятор на основі реальних подій лютого–квітня 2022. Ти — ректор ДонНТУ. Почалось повномасштабне вторгнення. Є 72 години, команда, список майна, бази даних студентів і 50 000 справ в архіві. Кожне рішення має наслідки. Наприкінці — порівняння з тим, що насправді зробив Д. С. Шиленко.",
    interactions:['Текстовий квест (розгалужені рішення)','Документи: накази, списки, листи (реальні скани)','Лічильник часу і ресурсів','Фінал: порівняння з реальними рішеннями'],
    context:"Реальна хронологія: 24 лютого — вторгнення, 12 квітня 2022 — ДонНТУ в Луцьку.",
    color: LDARK,
    partners:['Кризовий менеджмент','Право','Психологія','Логістика','Архівна справа','Цифрова безпека'],
  },
];

/* ── Interactive Lab Simulators ────────────────────────────────── */

/* L·01 — Mine SCADA dispatcher */
const SimMine = () => {
  const [methane, setMethane] = React.useState(0.8);
  const [vent, setVent] = React.useState(true);
  const [alarm, setAlarm] = React.useState(false);
  const [evacCountdown, setEvacCountdown] = React.useState(null);

  React.useEffect(() => {
    const t = setInterval(() => {
      setMethane(m => {
        const delta = (vent ? -0.15 : 0.35) + (Math.random() - 0.5) * 0.4;
        const next = Math.max(0, Math.min(5, m + delta));
        if (next > 2.5) setAlarm(true);
        if (next < 1) setAlarm(false);
        return next;
      });
    }, 1200);
    return () => clearInterval(t);
  }, [vent]);

  React.useEffect(() => {
    if (evacCountdown === null) return;
    if (evacCountdown <= 0) return;
    const t = setTimeout(() => setEvacCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [evacCountdown]);

  const pct = (methane / 5) * 100;
  const danger = methane > 2.5;

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem', padding:'2rem' }}>
      {/* Methane gauge */}
      <div style={{ background:'rgba(255,255,255,0.04)', padding:'2rem', border:'1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ ...LBL, color:'rgba(255,255,255,0.4)' }}>МЕТАН · CH₄ · ВИБІЙ №1</div>
        <div style={{ fontFamily:'var(--display)', fontSize:'4rem', color: danger ? LORG : LTEAL, marginTop:'1rem', lineHeight:1 }}>
          {methane.toFixed(2)}<span style={{ fontSize:'1.5rem', color:'rgba(255,255,255,0.4)' }}> %</span>
        </div>
        <div style={{ height:8, background:'rgba(255,255,255,0.08)', marginTop:'1.5rem', position:'relative' }}>
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:`${pct}%`, background: danger ? LORG : LTEAL, transition:'width 0.8s' }} />
          <div style={{ position:'absolute', left:'50%', top:-4, bottom:-4, width:2, background:'#fff', opacity:0.3 }} />
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
          <span style={{ ...LBL, fontSize:'0.5rem', color:'rgba(255,255,255,0.4)' }}>0 %</span>
          <span style={{ ...LBL, fontSize:'0.5rem', color: LORG }}>МЕЖА · 2.5 %</span>
          <span style={{ ...LBL, fontSize:'0.5rem', color:'rgba(255,255,255,0.4)' }}>5 %</span>
        </div>
        {danger && <div style={{ marginTop:'1rem', padding:'0.75rem', background:`${LORG}22`, border:`1px solid ${LORG}`, ...LBL, color:LORG, fontSize:'0.65rem' }}>⚠ ПЕРЕВИЩЕННЯ ДОПУСТИМОЇ КОНЦЕНТРАЦІЇ</div>}
      </div>

      {/* Controls */}
      <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
        <button onClick={() => setVent(!vent)} style={{
          ...LBL, padding:'1.25rem', background: vent ? LTEAL : 'rgba(255,255,255,0.06)',
          color: vent ? LDARK : '#fff', border:'none', cursor:'pointer', fontSize:'0.7rem',
        }}>
          ВЕНТИЛЯЦІЯ · {vent ? 'УВІМК' : 'ВИМК'}
        </button>
        <button
          onClick={() => setEvacCountdown(180)}
          disabled={evacCountdown !== null}
          style={{
            ...LBL, padding:'1.25rem', background: alarm ? LORG : 'rgba(255,255,255,0.06)',
            color:'#fff', border:`1px solid ${alarm ? LORG : 'rgba(255,255,255,0.15)'}`,
            cursor: evacCountdown !== null ? 'default' : 'pointer', fontSize:'0.7rem',
            opacity: evacCountdown !== null ? 0.5 : 1,
          }}
        >
          {evacCountdown !== null
            ? `ЕВАКУАЦІЯ · ${Math.floor(evacCountdown/60)}:${String(evacCountdown%60).padStart(2,'0')}`
            : 'АВАРІЙНА ЕВАКУАЦІЯ ЗМІНИ'}
        </button>
        <div style={{ marginTop:'auto', padding:'1rem', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ ...LBL, color:'rgba(255,255,255,0.4)', fontSize:'0.55rem', marginBottom:'0.5rem' }}>ОПЕРАТИВНА ЗВЕДЕНКА</div>
          <div style={{ ...LBL, color:'#fff', fontSize:'0.65rem', lineHeight:'1.2rem' }}>
            Зміна: 247 гірників<br/>
            Глибина: 1320 м<br/>
            Вентилятор: {vent ? '⊙ ОБЕРТИ 1450 об/хв' : '✕ ЗУПИНЕНО'}
          </div>
        </div>
      </div>
    </div>
  );
};

/* L·02 — Campus time slider */
const SimCampus = () => {
  const [year, setYear] = React.useState(1991);
  const eras = [
    { y:1960, e:'ДПІ · повоєнне відродження', dets:['12 кафедр', '4800 студентів', 'Перший електронно-обчислювальний клас'] },
    { y:1991, e:'Незалежність · перехід', dets:['Перейменування ДПІ → ДДТУ', '12 факультетів', '15 200 студентів'] },
    { y:2005, e:'Розквіт · національний статус', dets:['ДонНТУ · 22 000 студентів', 'QS-рейтинг 251–300', 'Міжнародні гранти Erasmus'] },
    { y:2014, e:'Окупація · останні місяці', dets:['Серпень — обстріли', 'Втрата кампусу', 'Переміщення до Покровська'] },
  ];
  const active = eras.reduce((a,b) => Math.abs(b.y - year) < Math.abs(a.y - year) ? b : a);

  return (
    <div style={{ padding:'2rem' }}>
      <div style={{ ...LBL, color:'rgba(255,255,255,0.4)', marginBottom:'0.5rem' }}>ШАР ЧАСУ · ВУЛ. АРТЕМА, 58</div>
      <div style={{ fontFamily:'var(--display)', fontSize:'4rem', color:LTEAL, lineHeight:1 }}>{year}</div>

      <input
        type="range" min="1960" max="2014" value={year}
        onChange={e => setYear(+e.target.value)}
        style={{ width:'100%', marginTop:'2rem', accentColor: LTEAL }}
      />
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
        {eras.map(e => (
          <span key={e.y} style={{ ...LBL, fontSize:'0.55rem', color: Math.abs(e.y-year)<3 ? LTEAL : 'rgba(255,255,255,0.4)' }}>{e.y}</span>
        ))}
      </div>

      <div style={{ marginTop:'2.5rem', padding:'1.75rem', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ ...LBL, color: LTEAL, fontSize:'0.65rem', marginBottom:'1rem' }}>{active.e}</div>
        {active.dets.map((d,i) => (
          <div key={i} style={{ ...LBL, color:'#fff', fontSize:'0.7rem', lineHeight:'1.6rem', display:'flex', gap:'1rem' }}>
            <span style={{ color: LTEAL }}>◇</span>{d}
          </div>
        ))}
      </div>
    </div>
  );
};

/* L·03 — Three evacuations */
const SimEvac = () => {
  const evacs = [
    { y:1941, from:'Сталіно', to:"Прокоп'євськ", km:3200, days:42, color:LPINK,
      details:['Бомбардування 17 жовтня 1941', 'Вивезено 2 ешелони обладнання', 'Втрачено 70% колекції бібліотеки', 'Продовжили навчання січень 1942'] },
    { y:2014, from:'Донецьк', to:'Покровськ', km:84, days:14, color:LYELL,
      details:['Обстріли серпень–вересень', 'Вивезено документи акредитації', 'Залишок майна заблоковано', '450 викладачів виїхали'] },
    { y:2022, from:'Покровськ', to:'Дрогобич', km:1280, days:51, color:LBLUE,
      details:['Початок: 24 лютого 2022', 'Луцьк → Дрогобич за 8 місяців', 'Кампус-побратим: ДДПУ', '28 серпня 2024 — відкриття'] },
  ];
  const [sel, setSel] = React.useState(0);
  const e = evacs[sel];

  return (
    <div style={{ padding:'2rem' }}>
      <div style={{ display:'flex', gap:'0.5rem', marginBottom:'2rem' }}>
        {evacs.map((ev, i) => (
          <button key={ev.y} onClick={() => setSel(i)} style={{
            flex:1, ...LBL, padding:'1rem',
            background: i === sel ? ev.color : 'rgba(255,255,255,0.04)',
            color: i === sel ? LDARK : '#fff',
            border: i === sel ? 'none' : '1px solid rgba(255,255,255,0.08)',
            cursor:'pointer', fontSize:'0.7rem',
          }}>
            ЕВАКУАЦІЯ {ev.y}
          </button>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'2rem' }}>
        <div>
          <div style={{ ...LBL, color:'rgba(255,255,255,0.4)' }}>МАРШРУТ</div>
          <div style={{ fontFamily:'var(--display)', fontSize:'1.5rem', color:'#fff', marginTop:'0.5rem', lineHeight:1.3 }}>
            {e.from}<br/>
            <span style={{ color: e.color }}>↓</span><br/>
            {e.to}
          </div>
          <div style={{ marginTop:'1.5rem', display:'flex', gap:'1.5rem' }}>
            <div>
              <div style={{ fontFamily:'var(--display)', fontSize:'2rem', color: e.color, lineHeight:1 }}>{e.km}</div>
              <div style={{ ...LBL, fontSize:'0.5rem', color:'rgba(255,255,255,0.4)', marginTop:4 }}>КМ</div>
            </div>
            <div>
              <div style={{ fontFamily:'var(--display)', fontSize:'2rem', color: e.color, lineHeight:1 }}>{e.days}</div>
              <div style={{ ...LBL, fontSize:'0.5rem', color:'rgba(255,255,255,0.4)', marginTop:4 }}>ДНІВ</div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ ...LBL, color:'rgba(255,255,255,0.4)', marginBottom:'1rem' }}>ХРОНОЛОГІЯ ПОДІЙ</div>
          {e.details.map((d,i) => (
            <div key={i} style={{ display:'flex', gap:'1rem', padding:'0.75rem 0', borderBottom: i < e.details.length-1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <span style={{ ...LBL, fontSize:'0.55rem', color: e.color, minWidth:'1.25rem' }}>{String(i+1).padStart(2,'0')}</span>
              <span style={{ ...LBL, color:'#fff', fontSize:'0.65rem', lineHeight:'1.1rem' }}>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* L·04 — Geological cross-section */
const SimGeo = () => {
  const layers = [
    { d:'0–50',     n:'Ґрунт',                color:'#8b6f47', coal:false },
    { d:'50–250',   n:'Глини, піски',         color:'#a89070', coal:false },
    { d:'250–400',  n:'Пісковики кам.-вуг.',   color:'#6b5a3f', coal:false },
    { d:'400–500',  n:'Пласт m₃ · 0.9 м',      color:'#1a1a1a', coal:true, label:'Антрацит' },
    { d:'500–700',  n:'Сланці аргілітові',     color:'#3d3a35', coal:false },
    { d:'700–850',  n:'Пласт l₁ · 1.4 м',      color:'#1a1a1a', coal:true, label:'Коксівне Ж' },
    { d:'850–1100', n:'Пісковики світло-сірі', color:'#7a6d52', coal:false },
    { d:'1100–1200',n:'Пласт k₈ · 1.1 м',      color:'#1a1a1a', coal:true, label:'Газове Г' },
    { d:'1200–1500',n:'Аргіліти, алевроліти', color:'#4a4339', coal:false },
    { d:'1500–1600',n:'Пласт h₈ · 1.8 м',      color:'#1a1a1a', coal:true, label:'Коксівне К' },
    { d:'1600–1850',n:'Девонські породи',     color:'#5c4e3a', coal:false },
    { d:'1850–2000',n:'Кристалічний фундамент',color:'#3a3530', coal:false },
  ];
  const [sel, setSel] = React.useState(3);
  const found = layers.map((l,i) => sel === i && l.coal ? 1 : 0).reduce((a,b) => a+b, 0);
  const totalCoal = layers.filter(l => l.coal).length;

  return (
    <div style={{ padding:'2rem' }}>
      <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:'2rem' }}>
        {/* Cross-section */}
        <div>
          <div style={{ ...LBL, color:'rgba(255,255,255,0.4)', marginBottom:'0.75rem' }}>РОЗРІЗ · 0–2000 М</div>
          <div style={{ display:'flex', flexDirection:'column', border:'1px solid rgba(255,255,255,0.1)' }}>
            {layers.map((l, i) => (
              <div key={i} onClick={() => setSel(i)} style={{
                background: l.color, height: 36, cursor:'pointer',
                position:'relative',
                border: sel === i ? `2px solid ${LORG}` : 'none',
                transition:'border 0.15s',
              }}>
                {l.coal && <span style={{ position:'absolute', top:'50%', left:6, transform:'translateY(-50%)', color: LORG, fontSize:'0.6rem' }}>◆</span>}
              </div>
            ))}
          </div>
        </div>
        {/* Detail */}
        <div>
          <div style={{ ...LBL, color: layers[sel].coal ? LORG : 'rgba(255,255,255,0.4)' }}>
            ШАР · {layers[sel].d} М {layers[sel].coal && '· ВУГІЛЬНИЙ ПЛАСТ'}
          </div>
          <div style={{ fontFamily:'var(--display)', fontSize:'1.75rem', color:'#fff', marginTop:'0.5rem' }}>
            {layers[sel].n}
          </div>
          {layers[sel].coal && (
            <div style={{ marginTop:'1.5rem', padding:'1.25rem', background:`${LORG}11`, border:`1px solid ${LORG}`, color: LORG }}>
              <div style={{ ...LBL, fontSize:'0.55rem' }}>МАРКА ВУГІЛЛЯ</div>
              <div style={{ fontFamily:'var(--display)', fontSize:'1.25rem', marginTop:6 }}>{layers[sel].label}</div>
            </div>
          )}
          <div style={{ marginTop:'2rem', padding:'1rem', background:'rgba(255,255,255,0.04)', display:'flex', justifyContent:'space-between' }}>
            <span style={{ ...LBL, color:'rgba(255,255,255,0.5)', fontSize:'0.6rem' }}>ЗНАЙДЕНО ПЛАСТІВ:</span>
            <span style={{ ...LBL, color: LORG, fontSize:'0.7rem' }}>{layers.filter((l,i) => l.coal).map((l,i) => i).slice(0,1).length} / {totalCoal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* L·05 — Reconstruction triage */
const SimRecon = () => {
  const items = [
    { n:'Лікарня № 4',             cost:120, days:90,  cat:"Здоров'я" },
    { n:'Школа № 12',              cost:45,  days:60,  cat:'Освіта' },
    { n:'Водогін, мікрор. Лазурний',cost:80,  days:45,  cat:'Інфраструктура' },
    { n:'Житловий блок A-7',       cost:200, days:120, cat:'Житло' },
    { n:'Міст через р. Бик',       cost:60,  days:30,  cat:'Транспорт' },
    { n:'Підстанція 110 кВ',       cost:90,  days:75,  cat:'Енергетика' },
  ];
  const [budget] = React.useState(400);
  const [sel, setSel] = React.useState({});
  const total = Object.entries(sel).reduce((s, [k,v]) => v ? s + items[+k].cost : s, 0);
  const days  = Object.entries(sel).reduce((s, [k,v]) => v ? Math.max(s, items[+k].days) : s, 0);

  return (
    <div style={{ padding:'2rem' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 220px', gap:'2rem' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
          {items.map((it, i) => {
            const chosen = !!sel[i];
            const wouldExceed = !chosen && total + it.cost > budget;
            return (
              <div key={i} onClick={() => !wouldExceed && setSel({ ...sel, [i]: !chosen })}
                style={{
                  display:'grid', gridTemplateColumns:'1fr 80px 80px',
                  padding:'0.875rem 1rem',
                  background: chosen ? `${LTEAL}22` : 'rgba(255,255,255,0.03)',
                  border: chosen ? `1px solid ${LTEAL}` : '1px solid rgba(255,255,255,0.08)',
                  cursor: wouldExceed ? 'not-allowed' : 'pointer',
                  opacity: wouldExceed ? 0.4 : 1,
                  alignItems:'center', gap:'0.5rem',
                }}>
                <div>
                  <div style={{ ...LBL, color: chosen ? LTEAL : '#fff', fontSize:'0.7rem' }}>{it.n}</div>
                  <div style={{ ...LBL, color:'rgba(255,255,255,0.4)', fontSize:'0.5rem', marginTop:3 }}>{it.cat}</div>
                </div>
                <span style={{ ...LBL, color:'#fff', fontSize:'0.7rem', textAlign:'right' }}>{it.cost} млн</span>
                <span style={{ ...LBL, color:'rgba(255,255,255,0.5)', fontSize:'0.6rem', textAlign:'right' }}>{it.days} дн</span>
              </div>
            );
          })}
        </div>
        <div style={{ padding:'1.5rem', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ ...LBL, color:'rgba(255,255,255,0.4)' }}>БЮДЖЕТ</div>
          <div style={{ fontFamily:'var(--display)', fontSize:'1.75rem', color:'#fff' }}>{total} <span style={{ color:'rgba(255,255,255,0.4)' }}>/ {budget}</span></div>
          <div style={{ height:6, background:'rgba(255,255,255,0.06)', marginTop:'0.5rem' }}>
            <div style={{ width:`${Math.min(100, total/budget*100)}%`, height:'100%', background: total > budget * 0.9 ? LORG : LTEAL, transition:'width .3s' }} />
          </div>
          <div style={{ marginTop:'1.5rem', ...LBL, color:'rgba(255,255,255,0.4)' }}>ТЕРМІН</div>
          <div style={{ fontFamily:'var(--display)', fontSize:'1.5rem', color:'#fff' }}>{days} <span style={{ fontSize:'0.875rem', color:'rgba(255,255,255,0.4)' }}>днів</span></div>
          <div style={{ marginTop:'1.5rem', ...LBL, color:'rgba(255,255,255,0.4)' }}>ОБРАНО ОБ'ЄКТІВ</div>
          <div style={{ fontFamily:'var(--display)', fontSize:'1.5rem', color: LTEAL }}>{Object.values(sel).filter(Boolean).length} / {items.length}</div>
        </div>
      </div>
    </div>
  );
};

/* L·06 — Methane explosion physics */
const SimBlast = () => {
  const [conc, setConc] = React.useState(8);
  const [vent, setVent] = React.useState(50);
  const ignites = conc >= 5 && conc <= 15;
  const blastR = ignites ? Math.round((conc - 5) * (1 - vent/100) * 12 + 8) : 0;
  return (
    <div style={{ padding:'2rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem' }}>
      <div>
        <div style={{ ...LBL, color:'rgba(255,255,255,0.4)' }}>КОНЦЕНТРАЦІЯ CH₄</div>
        <div style={{ fontFamily:'var(--display)', fontSize:'3rem', color: ignites ? LORG : LTEAL, lineHeight:1 }}>{conc}<span style={{ fontSize:'1rem' }}> %</span></div>
        <input type="range" min="0" max="25" value={conc} onChange={e => setConc(+e.target.value)} style={{ width:'100%', marginTop:'1rem', accentColor: LORG }} />
        <div style={{ ...LBL, color:'rgba(255,255,255,0.4)', fontSize:'0.5rem', marginTop:6 }}>
          ЗОНА ВИБУХУ: 5–15 % · НИЖЧЕ — НЕ ГОРИТЬ · ВИЩЕ — БРАК O₂
        </div>

        <div style={{ ...LBL, color:'rgba(255,255,255,0.4)', marginTop:'2rem' }}>ВЕНТИЛЯЦІЯ</div>
        <div style={{ fontFamily:'var(--display)', fontSize:'2rem', color:'#fff' }}>{vent}<span style={{ fontSize:'0.875rem' }}> %</span></div>
        <input type="range" min="0" max="100" value={vent} onChange={e => setVent(+e.target.value)} style={{ width:'100%', marginTop:'1rem', accentColor: LTEAL }} />
      </div>
      <div style={{ background:'rgba(255,255,255,0.04)', border:`1px solid ${ignites ? LORG : 'rgba(255,255,255,0.08)'}`, padding:'1.5rem', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center' }}>
        <div style={{ ...LBL, color: ignites ? LORG : LTEAL }}>{ignites ? '⚠ ВИБУХ' : '✓ БЕЗПЕЧНО'}</div>
        <div style={{ fontFamily:'var(--display)', fontSize:'4rem', color: ignites ? LORG : LTEAL, lineHeight:1, marginTop:'1rem' }}>
          {ignites ? `${blastR} м` : '—'}
        </div>
        <div style={{ ...LBL, color:'rgba(255,255,255,0.5)', fontSize:'0.6rem', marginTop:'0.5rem' }}>РАДІУС ВИБУХОВОЇ ХВИЛІ</div>
        <div style={{ marginTop:'2rem', ...LBL, color:'rgba(255,255,255,0.4)', fontSize:'0.55rem', lineHeight:'1.1rem' }}>
          {ignites
            ? `Евакуація: ${Math.ceil(blastR * 1.5)} м від епіцентру`
            : conc < 5 ? 'Метан розсіюється — займання неможливе'
            : 'Концентрація вище верхньої межі вибуху'}
        </div>
      </div>
    </div>
  );
};

/* L·07 — Coking process */
const SimCoke = () => {
  const stages = [
    { t:100,  n:'Сушіння',         out:'Волога',   c:LTEAL },
    { t:350,  n:'Виділення газу',  out:'Метан',    c:LYELL },
    { t:550,  n:'Піроліз',         out:'Смола',    c:LORG },
    { t:800,  n:'Спікання',        out:'Напівкокс',c:LPINK },
    { t:1050, n:'Готовий кокс',    out:'Кокс М₂₅',c:LWHITE },
  ];
  const [t, setT] = React.useState(100);
  const stage = stages.reduce((a, b) => Math.abs(b.t - t) < Math.abs(a.t - t) ? b : a);

  return (
    <div style={{ padding:'2rem' }}>
      <div style={{ ...LBL, color:'rgba(255,255,255,0.4)' }}>ТЕМПЕРАТУРА В ПЕЧІ</div>
      <div style={{ fontFamily:'var(--display)', fontSize:'4rem', color: stage.c, lineHeight:1 }}>{t}<span style={{ fontSize:'1.5rem', color:'rgba(255,255,255,0.4)' }}> °C</span></div>
      <input type="range" min="20" max="1100" value={t} onChange={e => setT(+e.target.value)} style={{ width:'100%', marginTop:'1.5rem', accentColor: LORG }} />

      <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:'0.5rem', marginTop:'2rem' }}>
        {stages.map((s,i) => (
          <div key={i} style={{
            padding:'1rem', textAlign:'center',
            background: s === stage ? `${s.c}22` : 'rgba(255,255,255,0.03)',
            border: s === stage ? `1px solid ${s.c}` : '1px solid rgba(255,255,255,0.06)',
            transition:'all .2s',
          }}>
            <div style={{ ...LBL, color: s === stage ? s.c : 'rgba(255,255,255,0.4)', fontSize:'0.55rem' }}>{s.t} °C</div>
            <div style={{ ...LBL, color:'#fff', fontSize:'0.6rem', marginTop:6 }}>{s.n}</div>
            <div style={{ ...LBL, color:'rgba(255,255,255,0.5)', fontSize:'0.5rem', marginTop:3 }}>→ {s.out}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop:'2rem', padding:'1.5rem', background:`${stage.c}11`, borderLeft:`3px solid ${stage.c}` }}>
        <div style={{ ...LBL, color: stage.c }}>ПОТОЧНИЙ ПРОДУКТ</div>
        <div style={{ fontFamily:'var(--display)', fontSize:'1.5rem', color:'#fff', marginTop:6 }}>{stage.out}</div>
      </div>
    </div>
  );
};

/* L·08 — 1921 classroom */
const SimAuditorium = () => {
  const items = [
    { x:20, y:30, t:'Дошка', d:'Крейда, ребра з геометричних побудов. Перша лекція — нарисна геометрія.' },
    { x:50, y:55, t:'Студенти · 23 ос.', d:'Перший набір ДГІ, 30 травня 1921. Серед них — майбутній академік М.В.Луговцов.' },
    { x:80, y:40, t:'Вікно', d:'Вид на терикон шахти "Юзівка-Південна". Усі лекції — під свистом шахтних гудків.' },
    { x:35, y:75, t:'Залікова', d:'Перші залікові книжки видані 12 червня 1921. Виготовлені з обгорткового паперу.' },
    { x:65, y:80, t:'Викладач', d:'А.П.Маньківський — перший директор Гірничого технікуму. Викладав сам.' },
  ];
  const [sel, setSel] = React.useState(0);
  return (
    <div style={{ padding:'2rem', display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:'2rem' }}>
      <div style={{
        position:'relative', aspectRatio:'4/3',
        background:'#3a2f24', border:'1px solid rgba(255,255,255,0.1)',
        backgroundImage:'linear-gradient(135deg, #3a2f24 0%, #2a201a 100%)',
      }}>
        {items.map((it, i) => (
          <button key={i} onClick={() => setSel(i)} style={{
            position:'absolute', left:`${it.x}%`, top:`${it.y}%`,
            width:32, height:32, borderRadius:'50%',
            background: sel === i ? LYELL : 'rgba(255,255,255,0.15)',
            border:`2px solid ${sel === i ? LYELL : 'rgba(255,255,255,0.3)'}`,
            color: sel === i ? LDARK : '#fff', cursor:'pointer',
            ...LBL, fontSize:'0.55rem',
          }}>{i+1}</button>
        ))}
        <div style={{ position:'absolute', bottom:8, left:8, ...LBL, color:'rgba(255,255,255,0.4)', fontSize:'0.5rem' }}>
          ГІРНИЧИЙ ТЕХНІКУМ · ЮЗІВКА · 30.05.1921
        </div>
      </div>
      <div>
        <div style={{ ...LBL, color: LYELL }}>{String(sel+1).padStart(2,'0')} · {items[sel].t}</div>
        <p style={{ ...LBL, color:'#fff', fontSize:'0.75rem', lineHeight:'1.4rem', marginTop:'1rem', textTransform:'none', letterSpacing:0, fontFamily:'var(--display)' }}>
          {items[sel].d}
        </p>
      </div>
    </div>
  );
};

/* L·09 — Drone reconnaissance */
const SimDrone = () => {
  const [pos, setPos] = React.useState({ x:50, y:50 });
  const targets = [
    { x:25, y:30, t:'ЖИТЛО',   damaged:true,  c:LORG },
    { x:65, y:25, t:'ШКОЛА',   damaged:false, c:LTEAL },
    { x:80, y:60, t:'МІСТ',    damaged:true,  c:LORG },
    { x:20, y:70, t:'ЛІКАРНЯ', damaged:false, c:LTEAL },
    { x:55, y:80, t:'ДОРОГА',  damaged:true,  c:LORG },
  ];
  const nearest = targets
    .map(t => ({ ...t, d: Math.hypot(t.x - pos.x, t.y - pos.y) }))
    .sort((a, b) => a.d - b.d)[0];

  const move = (dx, dy) => setPos(p => ({ x: Math.max(0, Math.min(100, p.x + dx)), y: Math.max(0, Math.min(100, p.y + dy)) }));

  return (
    <div style={{ padding:'2rem', display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:'2rem' }}>
      <div style={{
        position:'relative', aspectRatio:'4/3',
        background:'#1d2530', border:'1px solid rgba(255,255,255,0.1)',
        backgroundImage:'repeating-linear-gradient(0deg, transparent 0, transparent 11%, rgba(255,255,255,0.04) 11%, rgba(255,255,255,0.04) 11.5%), repeating-linear-gradient(90deg, transparent 0, transparent 11%, rgba(255,255,255,0.04) 11%, rgba(255,255,255,0.04) 11.5%)',
      }}>
        {targets.map((t,i) => (
          <div key={i} style={{
            position:'absolute', left:`${t.x}%`, top:`${t.y}%`,
            transform:'translate(-50%,-50%)',
            width:14, height:14, background: t.c, borderRadius:2,
          }} />
        ))}
        <div style={{
          position:'absolute', left:`${pos.x}%`, top:`${pos.y}%`,
          transform:'translate(-50%,-50%)',
          width:24, height:24, border:`2px solid ${LYELL}`, borderRadius:'50%',
          boxShadow:`0 0 0 8px ${LYELL}22`,
          transition:'left .15s, top .15s',
        }} />
      </div>
      <div>
        <div style={{ ...LBL, color:'rgba(255,255,255,0.4)' }}>УПРАВЛІННЯ ДРОНОМ</div>
        <div style={{ display:'grid', gridTemplateColumns:'40px 40px 40px', gap:4, marginTop:'1rem', width:'fit-content' }}>
          <div></div>
          <button onClick={() => move(0,-8)} style={{ ...LBL, height:40, background:'rgba(255,255,255,0.06)', color:'#fff', border:'1px solid rgba(255,255,255,0.1)', cursor:'pointer' }}>↑</button>
          <div></div>
          <button onClick={() => move(-8,0)} style={{ ...LBL, height:40, background:'rgba(255,255,255,0.06)', color:'#fff', border:'1px solid rgba(255,255,255,0.1)', cursor:'pointer' }}>←</button>
          <button onClick={() => move(0,8)} style={{ ...LBL, height:40, background:'rgba(255,255,255,0.06)', color:'#fff', border:'1px solid rgba(255,255,255,0.1)', cursor:'pointer' }}>↓</button>
          <button onClick={() => move(8,0)} style={{ ...LBL, height:40, background:'rgba(255,255,255,0.06)', color:'#fff', border:'1px solid rgba(255,255,255,0.1)', cursor:'pointer' }}>→</button>
        </div>
        <div style={{ marginTop:'2rem', padding:'1rem', background:'rgba(255,255,255,0.04)' }}>
          <div style={{ ...LBL, color:'rgba(255,255,255,0.4)' }}>НАЙБЛИЖЧИЙ ОБ'ЄКТ</div>
          <div style={{ fontFamily:'var(--display)', fontSize:'1.25rem', color: nearest.c, marginTop:6 }}>{nearest.t}</div>
          <div style={{ ...LBL, color:'rgba(255,255,255,0.5)', fontSize:'0.55rem', marginTop:4 }}>
            СТАТУС: {nearest.damaged ? '⚠ ПОШКОДЖЕНО' : '✓ ЦІЛЕ'}
          </div>
          <div style={{ ...LBL, color:'rgba(255,255,255,0.4)', fontSize:'0.55rem', marginTop:4 }}>
            ВІДСТАНЬ: {Math.round(nearest.d * 10)} М
          </div>
        </div>
      </div>
    </div>
  );
};

/* L·10 — Rector's decision (text quest) */
const SimQuest = () => {
  const nodes = {
    start: {
      t:'28 лютого 2022, 04:00. Дзвонить чергова. Над Покровськом — гуркіт. Що робиш?',
      ch:[
        { l:'Скликаю екстрене засідання ректорату', g:'meeting' },
        { l:'Сам перевіряю кампус — потім вирішую', g:'check' },
        { l:'Дзвоню в МОН за вказівками',          g:'mon' },
      ],
    },
    meeting: {
      t:'Деканат зібрався за 25 хвилин. Усі — за продовження роботи. Але дані студентів і реєстри — на серверах кампусу. Що в першу чергу?',
      ch:[
        { l:'Витяг даних на флешки і хмару',          g:'data' },
        { l:'Евакуація викладачів і їхніх родин',     g:'people' },
        { l:'Дзвінок до ДДПУ Дрогобича — про притулок',g:'drohobych' },
      ],
    },
    check: { t:"Поки ти їздив — пройшло 4 години. Зв'язок з МОН втрачено. Деканат розгублений. Це програш — потрібна швидка координація.", ch:[ { l:'Почати спочатку', g:'start' } ], final:true, win:false },
    mon: { t:'МОН видав загальну вказівку. Але вона не враховує специфіку ДонНТУ. Час йде. Втрачено ініціативу.', ch:[ { l:'Спробувати інакше', g:'start' } ], final:true, win:false },
    data: { t:'Дані вивезено. Тепер — люди. Але хто організовує транспорт?', ch:[ { l:'Власні автомобілі викладачів', g:'drohobych' }, { l:'Орендований автобус', g:'drohobych' } ] },
    people: { t:'Викладачі організували логістику самі. Тепер критично — куди?', ch:[ { l:'Дрогобич, ДДПУ', g:'drohobych' } ] },
    drohobych: {
      t:'ДДПУ погодився прийняти. 12 квітня 2022 — перша лекція в Луцьку (тимчасово), серпень 2024 — відкриття кампусу в Дрогобичі. Університет збережено.',
      ch:[ { l:'Завершити', g:'start' } ],
      final:true, win:true,
    },
  };
  const [n, setN] = React.useState('start');
  const node = nodes[n];

  return (
    <div style={{ padding:'2rem', maxWidth:700, margin:'0 auto' }}>
      <div style={{ ...LBL, color: node.final ? (node.win ? LTEAL : LORG) : LYELL }}>
        {node.final ? (node.win ? '★ УНІВЕРСИТЕТ ЗБЕРЕЖЕНО' : '✕ СПРОБУЙ ЗНОВУ') : 'РІШЕННЯ РЕКТОРА'}
      </div>
      <p style={{ fontFamily:'var(--display)', fontSize:'1.5rem', color:'#fff', marginTop:'1.25rem', lineHeight:'2.25rem' }}>
        {node.t}
      </p>
      <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem', marginTop:'2rem' }}>
        {node.ch.map((c, i) => (
          <button key={i} onClick={() => setN(c.g)} style={{
            ...LBL, padding:'1rem 1.25rem', textAlign:'left',
            background:'rgba(255,255,255,0.04)', color:'#fff',
            border:'1px solid rgba(255,255,255,0.1)',
            cursor:'pointer', fontSize:'0.7rem', lineHeight:'1.2rem',
          }}
          onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.04)'}>
            → {c.l}
          </button>
        ))}
      </div>
    </div>
  );
};

const SIM_MAP = {
  'L·01': SimMine,
  'L·02': SimCampus,
  'L·03': SimEvac,
  'L·04': SimGeo,
  'L·05': SimRecon,
  'L·06': SimBlast,
  'L·07': SimCoke,
  'L·08': SimAuditorium,
  'L·09': SimDrone,
  'L·10': SimQuest,
};

/* ── Full-screen lab simulator modal ───────────────────────────── */
const LabSimulator = ({ lab, onClose }) => {
  const Sim = SIM_MAP[lab.id];
  React.useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:9999,
      background: LDARK, color:'#fff',
      overflowY:'auto',
      backgroundImage:'url(assets/logo/DONNTU_PATTERN_white.png)',
      backgroundRepeat:'repeat-x', backgroundPosition:'bottom left',
      backgroundSize:'600px auto',
    }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(13,15,20,0.85)' }} />
      <div style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column' }}>
        {/* Header */}
        <div style={{
          padding:'1.5rem 2rem',
          borderBottom:'1px solid rgba(255,255,255,0.07)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          background:'rgba(0,0,0,0.5)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
            <img src="assets/logo/logo_D_white.png" alt="" style={{ width:32, height:32, objectFit:'contain' }} />
            <div>
              <div style={{ ...LBL, color:'rgba(255,255,255,0.4)' }}>{lab.id} · {lab.disc} · СИМУЛЯТОР</div>
              <div style={{ fontFamily:'var(--display)', fontSize:'1.25rem', color:'#fff', marginTop:3 }}>{lab.ua}</div>
            </div>
          </div>
          <button onClick={onClose} style={{
            ...LBL, padding:'0.625rem 1.25rem',
            background:'transparent', color:'#fff',
            border:'1px solid rgba(255,255,255,0.2)', cursor:'pointer',
          }}>ESC · ЗАКРИТИ</button>
        </div>
        {/* Sim body */}
        <div style={{ flex:1, padding:'1rem 0' }}>
          {Sim ? <Sim /> : (
            <div style={{ padding:'4rem', textAlign:'center', ...LBL, color:'rgba(255,255,255,0.4)' }}>
              СИМУЛЯТОР У РОЗРОБЦІ
            </div>
          )}
        </div>
        {/* Footer */}
        <div style={{
          padding:'1rem 2rem', borderTop:'1px solid rgba(255,255,255,0.07)',
          background:'rgba(0,0,0,0.5)', ...LBL, color:'rgba(255,255,255,0.4)', fontSize:'0.55rem',
          display:'flex', justifyContent:'space-between',
        }}>
          <span>ДОННТУ · ЦИФРОВА ЛАБОРАТОРІЯ · {lab.context}</span>
          <span>v1.0 · Симуляція</span>
        </div>
      </div>
    </div>
  );
};

/* ── Shared micro-components ───────────────────────────────────── */
const Dots = ({ filled, total=5 }) => (
  <div style={{ display:'flex', gap:4, alignItems:'center' }}>
    {Array.from({ length: total }, (_, i) => (
      <span key={i} style={{
        width: 7, height: 7, borderRadius:'50%',
        background: i < filled ? LDARK : 'transparent',
        border: `1.5px solid ${i < filled ? LDARK : 'rgba(0,0,0,0.2)'}`,
        display:'inline-block', flexShrink:0,
      }} />
    ))}
  </div>
);

const Badge = ({ s, label }) => {
  const cfg = STATUS[s] || STATUS.open;
  return (
    <span style={{
      ...LBL,
      display:'inline-flex', alignItems:'center', gap:5,
      padding:'4px 10px',
      border:`1px solid ${cfg.color}`,
      color: cfg.color,
    }}>
      <span style={{ width:5, height:5, borderRadius:'50%', background:cfg.dot, flexShrink:0 }} />
      {label}
    </span>
  );
};

/* ── Single lab row ────────────────────────────────────────────── */
const LabRow = ({ lab, open, onToggle, onLaunch }) => {
  const isFlg = lab.s === 'flagship';
  const rowBg = open ? 'rgba(0,0,0,0.03)' : LWHITE;

  return (
    <div style={{ borderBottom: LBR }}>

      {/* ── Main row ── */}
      <div
        onClick={onToggle}
        style={{
          display:'grid',
          gridTemplateColumns:'5.5rem 1fr 12rem 6rem 5rem 9rem 5.5rem',
          alignItems:'center',
          padding:'1.25rem 1.5rem',
          cursor:'pointer',
          background: rowBg,
          transition:'background .15s',
          gap:'1rem',
        }}
        onMouseEnter={e => { if(!open) e.currentTarget.style.background='rgba(0,0,0,0.02)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = open ? 'rgba(0,0,0,0.03)' : LWHITE; }}
      >

        {/* ID */}
        <span style={{ ...LBL, color:'rgba(0,0,0,0.35)', fontSize:'0.55rem' }}>{lab.id}</span>

        {/* Name */}
        <div>
          <div style={{ ...LH, fontSize:'1.125rem', lineHeight:'1.5rem', color: LDARK }}>
            {lab.ua}
            {isFlg && <span style={{ ...LBL, color:LORG, marginLeft:'0.75rem', fontSize:'0.5rem' }}>★ ФЛАГМАН</span>}
          </div>
          <div style={{ ...LBL, color:'rgba(0,0,0,0.4)', marginTop:3, fontSize:'0.55rem' }}>{lab.context}</div>
        </div>

        {/* Discipline */}
        <span style={{ ...LBL, color:'rgba(0,0,0,0.5)', fontSize:'0.55rem' }}>{lab.disc}</span>

        {/* Dots */}
        <Dots filled={lab.d} />

        {/* Duration */}
        <span style={{ ...LBL, color:'rgba(0,0,0,0.5)', fontSize:'0.55rem' }}>{lab.t}</span>

        {/* Status */}
        <Badge s={lab.s} label={lab.sLbl} />

        {/* Open */}
        <span style={{
          ...LBL, color: open ? LBLUE : LDARK,
          fontSize:'0.55rem', textAlign:'right',
          transition:'color .15s',
        }}>
          {open ? '↑ ЗГОРН.' : 'ВІДКРИТИ →'}
        </span>
      </div>

      {/* ── Expanded panel ── */}
      {open && (
        <div style={{
          borderTop: LBR,
          display:'grid', gridTemplateColumns:'1fr 1fr',
          borderLeft:`3px solid ${isFlg ? LORG : LBLUE}`,
        }}>

          {/* Left: description + context */}
          <div style={{
            padding:`2rem ${LPAD}`,
            borderRight: LBR,
            display:'flex', flexDirection:'column', gap:'1.5rem',
          }}>
            <div>
              <div style={{ ...LBL, color:'rgba(0,0,0,0.35)', marginBottom:'0.75rem' }}>ОПИС ЛАБОРАТОРІЇ</div>
              <p style={{ ...LB2, fontSize:'1rem', lineHeight:'1.6rem', color:LDARK }}>{lab.fullDesc}</p>
            </div>
            <div style={{
              padding:'1rem 1.25rem',
              background: lab.color === LDARK ? '#f5f0e8' : `${lab.color}22`,
              borderLeft:`3px solid ${lab.color === LDARK ? '#555' : lab.color}`,
            }}>
              <div style={{ ...LBL, color:'rgba(0,0,0,0.4)', marginBottom:'0.375rem', fontSize:'0.55rem' }}>КОНТЕКСТ</div>
              <span style={{ ...LBL, color: LDARK, fontSize:'0.6rem' }}>{lab.context}</span>
            </div>
          </div>

          {/* Right: interactions */}
          <div style={{ padding:`2rem ${LPAD}`, display:'flex', flexDirection:'column', gap:'1.5rem' }}>
            <div>
              <div style={{ ...LBL, color:'rgba(0,0,0,0.35)', marginBottom:'1rem' }}>ІНТЕРАКТИВНІ МОДУЛІ</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {lab.interactions.map((item, i) => (
                  <div key={i} style={{
                    display:'flex', gap:'1rem', alignItems:'flex-start',
                    padding:'0.75rem 1rem',
                    border: LBR,
                    background: LWHITE,
                  }}>
                    <span style={{
                      ...LBL, fontSize:'0.55rem',
                      color: isFlg ? LORG : LBLUE,
                      flexShrink:0, minWidth:'1.25rem',
                    }}>
                      {String(i+1).padStart(2,'0')}
                    </span>
                    <span style={{ ...LBL, color:LDARK, fontSize:'0.6rem', lineHeight:'1rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              marginTop:'auto',
              paddingTop:'1.25rem',
              borderTop: LBR,
              display:'flex', gap:'0.75rem',
            }}>
              <button
                style={{
                  ...LBL, fontSize:'0.6rem',
                  padding:'0.75rem 1.5rem',
                  background: isFlg ? LORG : LBLUE,
                  color: LWHITE, border:'none', cursor:'pointer',
                }}
                onClick={e => { e.stopPropagation(); onLaunch && onLaunch(lab); }}
              >
                ЗАПУСТИТИ →
              </button>
              <button
                style={{
                  ...LBL, fontSize:'0.6rem',
                  padding:'0.75rem 1.25rem',
                  background:'transparent',
                  color: LDARK,
                  border:`1px solid rgba(0,0,0,0.2)`,
                  cursor:'pointer',
                }}
                onClick={e => { e.stopPropagation(); }}
              >
                МЕТОДИЧКА
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Flagship block ────────────────────────────────────────────── */
const FlagshipBlock = ({ lab, onLaunch }) => (
  <div style={{
    display:'grid', gridTemplateColumns:'2fr 1fr',
    background: LDARK, color: LWHITE,
    border:`1px solid rgba(255,255,255,0.06)`,
  }}>
    {/* Left */}
    <div style={{
      padding: LPAD,
      borderRight:'1px solid rgba(255,255,255,0.06)',
      display:'flex', flexDirection:'column', gap:'1.5rem',
    }}>
      <div style={{ ...LBL, color: LORG, fontSize:'0.6rem' }}>ФЛАГМАН · {lab.id}</div>

      <div>
        <h2 style={{ ...LH, fontSize:'2.5rem', lineHeight:'3rem', color:LWHITE, margin:0 }}>
          {lab.ua}
        </h2>
        <p style={{ ...LB2, color:'rgba(255,255,255,0.55)', marginTop:'1rem', maxWidth:'44ch' }}>
          {lab.brief}
        </p>
      </div>

      <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
        <button
          style={{
            ...LBL, fontSize:'0.6rem',
            padding:'0.875rem 1.75rem',
            background: LORG, color:LWHITE,
            border:'none', cursor:'pointer',
          }}
          onClick={() => onLaunch && onLaunch(lab)}
        >
          ЗАПУСТИТИ ФЛАГМАН →
        </button>
        <button
          style={{
            ...LBL, fontSize:'0.6rem',
            padding:'0.875rem 1.5rem',
            background:'transparent', color:LWHITE,
            border:'1px solid rgba(255,255,255,0.2)',
            cursor:'pointer',
          }}
        >
          МЕТОДИЧНИЙ ОПИС
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:'flex', gap:'2.5rem', paddingTop:'1.5rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
        <div>
          <div style={{ fontFamily:'var(--display)', fontSize:'2rem', fontWeight:400, color:LORG, lineHeight:1 }}>72</div>
          <div style={{ ...LBL, color:'rgba(255,255,255,0.4)', marginTop:6, fontSize:'0.55rem' }}>ГОДИНИ КВЕСТУ</div>
        </div>
        <div>
          <div style={{ fontFamily:'var(--display)', fontSize:'2rem', fontWeight:400, color:LWHITE, lineHeight:1 }}>48</div>
          <div style={{ ...LBL, color:'rgba(255,255,255,0.4)', marginTop:6, fontSize:'0.55rem' }}>РІШЕНЬ</div>
        </div>
        <div>
          <div style={{ fontFamily:'var(--display)', fontSize:'2rem', fontWeight:400, color:LTEAL, lineHeight:1 }}>6</div>
          <div style={{ ...LBL, color:'rgba(255,255,255,0.4)', marginTop:6, fontSize:'0.55rem' }}>ДИСЦИПЛІН</div>
        </div>
      </div>
    </div>

    {/* Right: partner disciplines */}
    <div style={{ padding: LPAD, display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      <div style={{ ...LBL, color:'rgba(255,255,255,0.35)', fontSize:'0.55rem' }}>ПАРТНЕРСЬКІ ДИСЦИПЛІНИ</div>
      <div style={{ display:'flex', flexDirection:'column' }}>
        {(lab.partners || []).map((d, i, arr) => (
          <div key={d} style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'0.875rem 0',
            borderBottom: i < arr.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}>
            <span style={{ ...LBL, color:'rgba(255,255,255,0.7)', fontSize:'0.6rem' }}>{d}</span>
            <span style={{ color: LORG, fontSize:'0.5rem' }}>•</span>
          </div>
        ))}
      </div>
      <div style={{
        marginTop:'auto', paddingTop:'1.5rem',
        borderTop:'1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ ...LBL, color:'rgba(255,255,255,0.35)', fontSize:'0.55rem', marginBottom:'0.75rem' }}>БАЗА МАТЕРІАЛІВ</div>
        <p style={{ ...LBL, color:'rgba(255,255,255,0.55)', fontSize:'0.6rem', lineHeight:'1.4rem' }}>
          Реальні накази ДонНТУ · Архів МОН України · Хронологія CEDOS · Матеріали ОБСЄ
        </p>
      </div>
    </div>
  </div>
);

/* ── Column headers ────────────────────────────────────────────── */
const TableHead = () => (
  <div style={{
    display:'grid',
    gridTemplateColumns:'5.5rem 1fr 12rem 6rem 5rem 9rem 5.5rem',
    alignItems:'center',
    padding:'0.75rem 1.5rem',
    gap:'1rem',
    borderBottom: LBR,
    background:'rgba(0,0,0,0.02)',
  }}>
    {['КОД','ЛАБОРАТОРІЯ','ДИСЦИПЛІНА','РІВЕНЬ','ЧАС','СТАТУС',''].map((h, i) => (
      <span key={i} style={{ ...LBL, color:'rgba(0,0,0,0.3)', fontSize:'0.5rem' }}>{h}</span>
    ))}
  </div>
);

/* ── Main page ─────────────────────────────────────────────────── */
const LabsPage = ({ onNavigate }) => {
  const [expanded, setExpanded] = React.useState(null);
  const [activeLab, setActiveLab] = React.useState(null);
  const flagship = LABS.find(l => l.s === 'flagship');
  const rows = LABS.filter(l => l.s !== 'flagship');

  const toggle = id => setExpanded(prev => prev === id ? null : id);
  const launch = lab => setActiveLab(lab);
  const close = () => setActiveLab(null);

  return (
    <div style={{ background: LCREAM, minHeight:'100vh' }}>

      {/* ── Hero ── */}
      <div style={{
        display:'grid', gridTemplateColumns:'2fr 1fr',
        borderBottom: LBR,
        minHeight: 320,
      }}>
        {/* Title tile */}
        <div style={{
          padding: LPAD,
          paddingTop:'4rem',
          background: LWHITE,
          borderRight: LBR,
          display:'flex', flexDirection:'column', gap:'1.25rem',
        }}>
          <div style={{ ...LBL, color:'rgba(0,0,0,0.35)', fontSize:'0.55rem' }}>05 · ЛАБОРАТОРІЇ · ЦИФРОВІ СИМУЛЯЦІЇ</div>
          <h1 style={{ ...LH, fontSize:'2.5rem', lineHeight:'3rem', color:LDARK, margin:0 }}>
            Віртуальні<br/><em style={{ fontStyle:'italic', color:LBLUE }}>лабораторії</em>
          </h1>
          <p style={{ ...LB2, color:'rgba(0,0,0,0.6)', maxWidth:'42ch', margin:0 }}>
            Десять інтерактивних модулів прив'язаних до реальної історії ДонНТУ — від шахти Засядька до рішень ректора 2022 року.
          </p>
        </div>

        {/* Stats grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', background: LDARK }}>
          {[
            { v:'10', l:'Лабораторій' },
            { v:'9', l:'Дисциплін' },
            { v:'5', l:'Рівнів складності' },
            { v:'100+', l:'Років історії' },
          ].map((s, i) => (
            <div key={i} style={{
              padding:'2rem 1.5rem',
              borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              display:'flex', flexDirection:'column', justifyContent:'flex-end', gap:8,
            }}>
              <div style={{ fontFamily:'var(--display)', fontSize:'2.5rem', fontWeight:400, lineHeight:1, color: i===0 ? LORG : i===3 ? LTEAL : LWHITE }}>
                {s.v}
              </div>
              <div style={{ ...LBL, color:'rgba(255,255,255,0.4)', fontSize:'0.55rem' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ background: LWHITE, borderBottom: LBR }}>
        <TableHead />
        {rows.map(lab => (
          <LabRow
            key={lab.id}
            lab={lab}
            open={expanded === lab.id}
            onToggle={() => toggle(lab.id)}
            onLaunch={launch}
          />
        ))}
      </div>

      {/* ── Flagship ── */}
      {flagship && (
        <div>
          <div style={{
            padding:'1.25rem 1.5rem',
            background: LCREAM,
            borderBottom: LBR,
            display:'flex', alignItems:'center', gap:'1rem',
          }}>
            <span style={{ ...LBL, color:'rgba(0,0,0,0.35)', fontSize:'0.55rem', whiteSpace:'nowrap' }}>
              ФЛАГМАНСЬКА ЛАБОРАТОРІЯ
            </span>
            <div style={{ flex:1, height:1, background:'rgba(0,0,0,0.08)' }} />
            <Badge s="flagship" label="ФЛАГМАН" />
          </div>
          <FlagshipBlock lab={flagship} onLaunch={launch} />
        </div>
      )}

      {/* Lab simulator modal */}
      {activeLab && <LabSimulator lab={activeLab} onClose={close} />}

    </div>
  );
};

/* ── Building page (unchanged) ─────────────────────────────────── */
const FLOORS = ['F·09','F·08','F·07','F·06','F·05','F·04','F·03','F·02','F·01'];
const ROOMS = [
  { tp:'ЗАЛА',   id:'R·01', ua:'Лекційна зала А',           en:'Lecture Hall A',    dp:40, cp:16 },
  { tp:'ЛАБ.',   id:'R·03', ua:'Лабораторія автоматизації',  en:'Automation Lab',   dp:46, cp:24 },
  { tp:'СТУДІЯ', id:'R·05', ua:'Студія креслення',           en:'Drafting Studio',  dp:52, cp:32 },
];

const BuildingPage = ({ onNavigate }) => {
  const [af, setAf] = React.useState(7);
  return (
    <div className="page">
      <span className="lbl">04 · КОРПУС B-02</span>
      <div className="bld-head">
        <div>
          <h1 className="h1">Інженерний корпус · <em>B-02</em></h1>
          <p className="caption" style={{marginTop:'0.375rem',fontSize:'0.875rem'}}>9 поверхів · 24 кімнати · 1976 рік</p>
        </div>
        <div style={{width:220,height:130,overflow:'hidden',border:'1px solid var(--b1)',position:'relative',flexShrink:0}}>
          <img src="https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=480&h=280&fit=crop" alt=""
            style={{width:'100%',height:'100%',objectFit:'cover',opacity:.5,filter:'grayscale(.3)'}} />
          <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(5,5,5,.3),rgba(5,5,5,.75))'}}></div>
          <div style={{position:'absolute',bottom:'0.625rem',left:'0.75rem'}}>
            <span className="lbl" style={{color:'rgba(255,255,255,.7)'}}>РЕКОНСТРУЙОВАНО · 2022</span>
          </div>
        </div>
      </div>
      <div className="bld-lay">
        <div>
          <span className="lbl">РОЗРІЗ · ОБЕРІТЬ ПОВЕРХ</span>
          <div className="fl-stack">
            {FLOORS.map((f,i) => (
              <div key={f} className={`fl-row ${(9-i)===af?'fl-act':''}`} onClick={() => setAf(9-i)}>
                <span className="fl-lbl">{f}</span>
                <div className="fl-cells">{Array.from({length:8},(_,j) => <div key={j} className="fl-cell"></div>)}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div>
            <span className="lbl">ПОВЕРХ · F·0{af}</span>
            <h2 className="h2" style={{marginTop:'0.5rem',fontSize:'1.75rem'}}>Кімнати поверху</h2>
          </div>
          {ROOMS.map(r => (
            <div key={r.id} className="gc rm-card">
              <div className="rm-hd">
                <span className="lbl">{r.tp} · {r.id}</span>
                <span className="lbl-dim" style={{fontSize:'0.5rem'}}>●</span>
              </div>
              <div className="rm-title">{r.ua}</div>
              <div className="rm-en">{r.en}</div>
              <div className="rm-ft">
                <span className="caption">{r.dp} м² · до {r.cp} осіб</span>
                <span className="lbl lbl-amber">УВІЙТИ →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { LabsPage, BuildingPage });
