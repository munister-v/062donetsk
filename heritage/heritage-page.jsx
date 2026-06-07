/* Heritage Page v10 — unified type scale matching wuf-host section 1 exactly */

const HERITAGE_TIMELINE_DATA = [
  { yr: 1921, label: 'ЗАСНУВАННЯ',    title: 'Гірничий технікум у Юзівці',                  body: 'Перший технічний заклад вищої освіти Донбасу. Відкритий 30 травня 1921 року.' },
  { yr: 1941, label: 'ВІЙНА',         title: "Евакуація до Прокоп'євська",                  body: 'Інститут не припиняв навчання — готував інженерів для оборонної промисловості.' },
  { yr: 1944, label: 'НАГОРОДА',      title: 'Орден Трудового Червоного Прапора',            body: 'Перший технічний університет України, удостоєний цієї державної нагороди.' },
  { yr: 2001, label: 'РОЗКВІТ',       title: 'Національний статус',                          body: '12 факультетів, понад 20 000 студентів, QS-рейтинг 251–300 EECA.' },
  { yr: 2014, label: 'ОКУПАЦІЯ',      title: 'Переміщення до Покровська',                    body: 'Кампус під окупацією. Університет зберіг людей, акредитацію, ліцензії.' },
  { yr: 2022, label: 'ЕВАКУАЦІЯ II',  title: 'Луцьк → Дрогобич',                            body: '12 квітня 2022 — Луцьк. 28 серпня 2024 — відкриття кампусу в Дрогобичі.' },
  { yr: 2026, label: 'СЬОГОДНІ',      title: 'Heritage OS',                                  body: 'Цифровий двійник університету. Симуляції, архів, сертифікати.' },
];

const FAMOUS_ALUMNI = [
  { name: 'Микита Хрущов',      born: 1894, field: 'Робітничий факультет',   role: 'Перший секретар ЦК КПРС (1953–1964)',   body: 'Ініціатор «відлиги» та першого космічного польоту. Навчався в технікумі.' },
  { name: "Анатолій Солов'яненко", born: 1932, field: 'Гірнича інженерія · 1954', role: 'Тенор · Народний артист СРСР (1975)', body: 'Закінчив ДПІ і викладав інженерну графіку. La Scala, Метрополітен, Ковент-Гарден.' },
  { name: 'Юхим Звягільський',  born: 1933, field: 'Гірнича справа',          role: "В.о. Прем'єр-міністра України (1993–1994)", body: 'Директор шахти «Засядька», народний депутат України.' },
  { name: 'Ольга Буславець',    born: 1975, field: 'Економічний факультет',   role: 'Міністр енергетики України (2020)',     body: 'Перша жінка-Міністр енергетики. Реформа ринку та інтеграція з ENTSO-E.' },
  { name: 'Станіслав Асєєв',    born: 1989, field: 'КН / Журналістика',       role: 'Журналіст, правозахисник',              body: 'Залишився в окупованому Донецьку. Захоплений у 2017, звільнений у 2019.' },
];

const RECTORS = [
  { name: 'Г. В. Малєєв',   years: '1968–1989', era: 'Науковий розквіт',        body: 'Понад 20 років очолював інститут. ДПІ виріс до провідного технічного вузу УРСР.' },
  { name: 'О. А. Мінаєв',   years: '1989–2014', era: 'Трансформація та розквіт', body: 'Герой України. 20 000+ студентів, QS-рейтинг, національний статус 2001.' },
  { name: 'Я. О. Ляшок',    years: '2014–2019', era: 'Перше переміщення',        body: 'Зберіг акредитацію і академічний склад у переміщенні до Покровська.' },
  { name: 'Д. С. Шиленко',  years: '2019–н.ч.', era: 'Стійкість і відродження', body: 'Відкрив кампус у Дрогобичі 2024. Розвиває Erasmus+ та цифрову інфраструктуру.' },
];

const VOICES = [
  { q: 'Ми приймаємо студентів, які ніколи не побачать стін, де вчилися їхні батьки. Але вони отримують ті самі знання, той самий диплом, ту саму відповідальність.', who: 'Д. С. Шиленко', role: 'Ректор ДонНТУ · Дрогобич, 2024' },
  { q: "Університет пережив окупацію 1941 року — і продовжив роботу у Прокоп'євську. Пережив 2014-й. Переживе і це.", who: 'Академічний щорічник ДонНТУ', role: 'Офіційне видання, 2022' },
  { q: 'Кампус існує не в місці. Він існує в людях, які його несуть з собою.', who: 'Викладач гірничого факультету', role: 'Дрогобич, 2025' },
  { q: 'Мій дід закінчив ДПІ в Донецьку, мій батько — ДонНТУ там само. Я закінчую ДонНТУ в Луцьку. Один університет — три адреси, одна якість.', who: 'Студент гірничого факультету', role: '4 курс · 2025' },
];

/* ── Colours ───────────────────────────────────────────────── */
const BLUE  = '#005ab8';
const PINK  = '#f48ba2';
const TEAL  = '#c0e5e7';
const YELL  = '#f5d248';
const ORG   = '#f26522';
const DARK  = '#0d0f14';
const NAVY  = '#1a1a2e';
const CREAM = '#f0ede6';
const WHITE = '#fff';
const OFF   = '#111214';

/* ── Type tokens — IDENTICAL to wuf-host section 1 ─────────── */
const H  = { fontFamily:'var(--display)', fontSize:'2rem',   lineHeight:'2.5rem', fontWeight:400 };  /* wuf-host-blue-h  */
const B  = { fontFamily:'var(--display)', fontSize:'1.5rem', lineHeight:'2rem',   fontWeight:400 };  /* wuf-host-blue-p  */
const LB = { fontFamily:'var(--mono)',    fontSize:'0.6rem', letterSpacing:'0.14em', textTransform:'uppercase', lineHeight:'1rem' };
/* Big display year / stat — purely decorative, not section-1 text */
const BIG = (size='clamp(3rem,8vw,6rem)') => ({ fontFamily:'var(--display)', fontSize:size, fontWeight:800, lineHeight:1 });

const PAD  = '3rem';
const PADV = '5rem 3rem';
const BR   = '1px solid rgba(0,0,0,0.08)';
const BRD  = '1px solid rgba(255,255,255,0.07)';

/* ── Shared components ────────────────────────────────────── */
const Photo = ({ src, caption, style={} }) => (
  <div style={{ position:'relative', overflow:'hidden', ...style }}>
    <img src={src} loading="lazy"
      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
    {caption && (
      <div style={{ position:'absolute', bottom:0, left:0, right:0,
        background:'linear-gradient(transparent,rgba(0,0,0,0.7))',
        padding:'3rem 1.25rem 1rem', ...LB, color:'rgba(255,255,255,0.8)' }}>
        {caption}
      </div>
    )}
  </div>
);

const Label = ({ text, light }) => (
  <div style={{ ...LB, color: light ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
    marginBottom:'1rem' }}>{text}</div>
);

const Divider = ({ text, sub }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'2.5rem 3rem 1.25rem',
    borderTop: BR }}>
    <span style={{ ...LB, color:'rgba(0,0,0,0.35)', flexShrink:0 }}>{text}</span>
    <div style={{ flex:1, height:1, background:'rgba(0,0,0,0.08)' }}/>
    {sub && <span style={{ ...LB, color:'rgba(0,0,0,0.2)', flexShrink:0 }}>{sub}</span>}
  </div>
);

/* ── Tile helper — coloured content block ────────────────── */
const Tile = ({ bg=WHITE, tc=OFF, pad=PAD, border, style={}, children }) => (
  <div style={{ background:bg, color:tc, padding:pad, ...border, ...style }}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════ */
const HeritagePage = ({ onNavigate }) => (
  <div style={{ background:WHITE, minHeight:'100%' }}>

    {/* §1  HERO */}
    <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr',
      minHeight:500, borderBottom:BR }}>

      <Tile bg={BLUE} tc={WHITE} pad={PAD}
        style={{ display:'flex', flexDirection:'column', justifyContent:'center',
          gap:'1.5rem', borderRight:BR }}>
        <Label text="02 · СПАДЩИНА · ОСЕРДЯ СИСТЕМИ" light/>
        <h1 style={{ ...H, fontSize:'clamp(2rem,4vw,3rem)', lineHeight:'clamp(2.5rem,5vw,3.75rem)',
          color:WHITE, margin:0 }}>
          Університет,{' '}що{' '}
          <em style={{ fontStyle:'italic', color:YELL }}>не має</em>{' '}
          фізичного місця.
        </h1>
        <p style={{ ...B, color:'rgba(255,255,255,0.8)', margin:0 }}>
          DonNTU існує понад сто років. Два переміщення, дві евакуації, три міста —
          і жодного разу університет не закрився.
        </p>
        <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
          <button className="wuf-hos-btn wuf-hos-btn--primary">Цифровий архів →</button>
          <button className="wuf-hos-btn wuf-hos-btn--ghost"
            style={{ borderColor:'rgba(255,255,255,0.3)', color:WHITE }}>Кампус</button>
        </div>
      </Tile>

      <Photo src="assets/donetsk-main.jpg" caption="1-й корпус · вул. Артема, 58"
        style={{ borderRight:BR }}/>

      <Tile bg={ORG} tc={WHITE} pad={PAD}
        style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
        <Label text="ЗАСНОВАНО" light/>
        <div style={{ ...BIG(), color:WHITE, marginBottom:'0.5rem' }}>1921</div>
        <div style={{ ...LB, color:'rgba(255,255,255,0.6)' }}>105 РОКІВ · БЕЗПЕРЕРВНА РОБОТА</div>
      </Tile>
    </div>

    {/* §2  STATS */}
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderBottom:BR }}>
      {[
        { n:'110 000+', l:'Випускників за всю історію',  bg:WHITE,  tc:OFF  },
        { n:'~20 000',  l:'Студентів на піку 2001–2014', bg:TEAL,   tc:OFF  },
        { n:'QS 251–300',l:'Рейтинг EECA 2022',          bg:BLUE,   tc:WHITE },
        { n:'1,5 млн',  l:'Томів у бібліотеці Донецька', bg:PINK,   tc:OFF  },
      ].map((s,i) => (
        <div key={i} style={{ background:s.bg, color:s.tc, padding:'2.5rem 2rem',
          borderRight: i<3 ? BR : 'none',
          display:'flex', flexDirection:'column', justifyContent:'flex-end', gap:'0.5rem' }}>
          <div style={{ ...BIG('clamp(2rem,4vw,3rem)'), color:s.tc }}>{s.n}</div>
          <div style={{ ...LB, color: s.bg===BLUE ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.45)' }}>{s.l}</div>
        </div>
      ))}
    </div>

    {/* §3  КАМПУС */}
    <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr',
      gridTemplateRows:'340px 300px', borderBottom:BR }}>

      <Photo src="assets/donetsk-main.jpg" caption="1-й корпус · вул. Артема, 58 · Донецьк"
        style={{ gridRow:'1/2', borderRight:BR }}/>

      <Tile bg={PINK} tc={OFF} pad={PADV}
        style={{ display:'flex', flexDirection:'column', justifyContent:'center', borderRight:BR }}>
        <Label text="КАМПУС · ДОНЕЦЬК"/>
        <p style={{ ...B, color:OFF, margin:0 }}>
          Одинадцять корпусів у центрі Донецька.
          Головна будівля — пам'ятник архітектури 1930-х.
          Бібліотека з 1,5 млн томів. Все залишилось там — нетронуте, недоступне.
        </p>
      </Tile>

      <Photo src="assets/donetsk-facade.jpg" caption="Фасад · вул. Артема"/>

      <Photo src="assets/donetsk-artyoma.jpg" caption="Вул. Артема · Донецьк"
        style={{ borderTop:BR, borderRight:BR }}/>

      <Photo src="assets/drohobych-campus.jpg" caption="Кампус ДонНТУ · Дрогобич · 2024"
        style={{ borderTop:BR, borderRight:BR }}/>

      <Tile bg={ORG} tc={WHITE} pad={PAD}
        style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end', borderTop:BR }}>
        <Label text="ЗАРАЗ" light/>
        <h2 style={{ ...H, color:WHITE, margin:'0 0 0.5rem' }}>
          Дрогобич,<br/>Львівська обл.
        </h2>
        <div style={{ ...LB, color:'rgba(255,255,255,0.6)' }}>ВІДКРИТО · 28.08.2024</div>
      </Tile>
    </div>

    {/* §4  ХРОНОЛОГІЯ */}
    <Divider text="Хронологія · 1921 – 2026"/>

    {/* Row A — big 1921 + 1941 + 1944 */}
    <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', borderTop:BR }}>

      <Tile bg={TEAL} tc={OFF} pad={PAD}
        style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end',
          minHeight:300, borderRight:BR }}>
        <Label text="ЗАСНУВАННЯ"/>
        <div style={{ ...BIG('clamp(4rem,8vw,7rem)'), color:OFF, marginBottom:'1rem' }}>1921</div>
        <p style={{ ...B, color:OFF, margin:0 }}>
          Гірничий технікум у Юзівці.<br/>Перший технічний заклад Донбасу.
        </p>
      </Tile>

      <Tile bg={PINK} tc={OFF} pad={PAD}
        style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end', borderRight:BR }}>
        <Label text="ВІЙНА · ЕВАКУАЦІЯ"/>
        <div style={{ ...BIG(), color:OFF, marginBottom:'1rem' }}>1941</div>
        <p style={{ ...B, color:OFF, margin:0 }}>
          До Прокоп'євська.<br/>Навчання тривало<br/>навіть під час війни.
        </p>
      </Tile>

      <Tile bg={YELL} tc={OFF} pad={PAD}
        style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
        <Label text="НАГОРОДА ДЕРЖАВИ"/>
        <div style={{ ...BIG(), color:OFF, marginBottom:'1rem' }}>1944</div>
        <p style={{ ...B, color:OFF, margin:0 }}>
          Орден Трудового<br/>Червоного Прапора.
        </p>
      </Tile>
    </div>

    {/* Row B — 2001 + 2014 + photo + 2026 */}
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', borderTop:BR }}>

      <Tile bg={BLUE} tc={WHITE} pad={PAD}
        style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end',
          minHeight:300, borderRight:BR }}>
        <Label text="РОЗКВІТ" light/>
        <div style={{ ...BIG(), color:WHITE, marginBottom:'1rem' }}>2001</div>
        <p style={{ ...B, color:'rgba(255,255,255,0.85)', margin:0 }}>
          Національний статус.<br/>20 000 студентів.<br/>QS 251–300.
        </p>
      </Tile>

      <Tile bg={NAVY} tc={CREAM} pad={PAD}
        style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end', borderRight:BR }}>
        <Label text="ОКУПАЦІЯ" light/>
        <div style={{ ...BIG(), color:CREAM, marginBottom:'1rem' }}>2014</div>
        <p style={{ ...B, color:'rgba(240,237,230,0.75)', margin:0 }}>
          Переміщення до Покровська.<br/>Без корпусів —<br/>але з людьми.
        </p>
      </Tile>

      <Photo src="assets/drohobych-panorama.jpg" caption="Дрогобич · нова адреса · 2024"
        style={{ borderRight:BR, minHeight:300 }}/>

      <Tile bg={ORG} tc={WHITE} pad={PAD}
        style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
        <Label text="СЬОГОДНІ" light/>
        <div style={{ ...BIG(), color:WHITE, marginBottom:'1rem' }}>2026</div>
        <p style={{ ...B, color:'rgba(255,255,255,0.85)', margin:0 }}>
          Heritage OS.<br/>Цифровий двійник<br/>університету.
        </p>
      </Tile>
    </div>

    {/* §5  ЗНАМЕНИТІ ВИПУСКНИКИ */}
    <Divider text="Знамениті випускники · Верифіковані особи"/>

    {/* Big 2-col tile */}
    <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', borderTop:BR, borderBottom:BR }}>

      <Tile bg={BLUE} tc={WHITE} pad={PAD}
        style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end',
          minHeight:360, borderRight:BR }}>
        <Label text={`РОБІТНИЧИЙ ФАКУЛЬТЕТ · Н. ${FAMOUS_ALUMNI[0].born}`} light/>
        <h2 style={{ ...H, color:WHITE, margin:'0 0 1rem' }}>{FAMOUS_ALUMNI[0].name}</h2>
        <p style={{ ...B, fontStyle:'italic', color:'rgba(255,255,255,0.75)', margin:'0 0 1rem' }}>
          {FAMOUS_ALUMNI[0].role}
        </p>
        <p style={{ ...B, color:'rgba(255,255,255,0.75)', margin:0 }}>{FAMOUS_ALUMNI[0].body}</p>
      </Tile>

      <Tile bg={PINK} tc={OFF} pad={PAD}
        style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
        <Label text={`ГІРНИЧА ІНЖЕНЕРІЯ · Н. ${FAMOUS_ALUMNI[1].born}`}/>
        <h2 style={{ ...H, color:OFF, margin:'0 0 1rem' }}>{FAMOUS_ALUMNI[1].name}</h2>
        <p style={{ ...B, fontStyle:'italic', color:'rgba(0,0,0,0.65)', margin:'0 0 1rem' }}>
          {FAMOUS_ALUMNI[1].role}
        </p>
        <p style={{ ...B, color:'rgba(0,0,0,0.65)', margin:0 }}>{FAMOUS_ALUMNI[1].body}</p>
      </Tile>
    </div>

    {/* 3-col alumni row */}
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', borderBottom:BR }}>
      {[
        { a: FAMOUS_ALUMNI[2], bg:TEAL,  tc:OFF,   mc:'rgba(0,0,0,0.45)'   },
        { a: FAMOUS_ALUMNI[3], bg:WHITE, tc:OFF,   mc:'rgba(0,0,0,0.45)'   },
        { a: FAMOUS_ALUMNI[4], bg:DARK,  tc:CREAM, mc:'rgba(255,255,255,0.4)' },
      ].map(({ a, bg, tc, mc }, i) => (
        <Tile key={i} bg={bg} tc={tc} pad={PAD}
          style={{ minHeight:300, borderRight: i<2 ? BR : 'none',
            display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
          <Label text={`${a.field} · Н. ${a.born}`}/>
          <h2 style={{ ...H, color:tc, margin:'0 0 1rem' }}>{a.name}</h2>
          <p style={{ ...B, fontStyle:'italic', color:mc, margin:'0 0 0.75rem' }}>{a.role}</p>
          <p style={{ ...B, color:mc, margin:0 }}>{a.body}</p>
        </Tile>
      ))}
    </div>

    {/* §6  РЕКТОРИ */}
    <Divider text="Ректори · Верифіковані дані" sub="donntu.edu.ua · Wikipedia"/>

    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderTop:BR, borderBottom:BR }}>
      {RECTORS.map((r, i) => {
        const sch = [
          { bg:TEAL,  tc:OFF,   mc:'rgba(0,0,0,0.45)'    },
          { bg:WHITE, tc:OFF,   mc:'rgba(0,0,0,0.45)'    },
          { bg:BLUE,  tc:WHITE, mc:'rgba(255,255,255,0.6)'},
          { bg:PINK,  tc:OFF,   mc:'rgba(0,0,0,0.45)'    },
        ][i];
        return (
          <Tile key={i} bg={sch.bg} tc={sch.tc} pad={PAD}
            style={{ minHeight:280,
              borderRight: i%2===0 ? BR : 'none',
              borderBottom: i<2 ? BR : 'none',
              display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
            <div style={{ ...LB, color:sch.mc, background:'rgba(0,0,0,0.07)',
              display:'inline-block', padding:'0.2rem 0.6rem', borderRadius:2,
              alignSelf:'flex-start', marginBottom:'1rem' }}>{r.era}</div>
            <h2 style={{ ...H, color:sch.tc, margin:'0 0 0.25rem' }}>{r.name}</h2>
            <div style={{ ...LB, color:sch.mc, marginBottom:'1rem' }}>{r.years}</div>
            <p style={{ ...B, color:sch.mc, margin:0 }}>{r.body}</p>
          </Tile>
        );
      })}
    </div>

    {/* §7  ГОЛОСИ */}
    <Divider text="Голоси · Свідчення"/>

    <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', borderTop:BR, borderBottom:BR }}>

      {/* Big quote */}
      <Tile bg={TEAL} tc={OFF} pad={PAD}
        style={{ display:'flex', flexDirection:'column', justifyContent:'center',
          minHeight:360, borderRight:BR }}>
        <blockquote style={{ ...B, fontStyle:'italic', color:OFF,
          margin:'0 0 2rem', fontSize:'1.5rem', lineHeight:'2rem' }}>
          «{VOICES[0].q}»
        </blockquote>
        <div style={{ ...LB, color:'rgba(0,0,0,0.5)', marginBottom:'0.25rem' }}>{VOICES[0].who}</div>
        <div style={{ ...LB, color:'rgba(0,0,0,0.35)' }}>{VOICES[0].role}</div>
      </Tile>

      {/* Stack 2 quotes */}
      <div style={{ display:'flex', flexDirection:'column' }}>
        <Tile bg={BLUE} tc={WHITE} pad={PAD}
          style={{ flex:1, display:'flex', flexDirection:'column',
            justifyContent:'center', borderBottom:BR }}>
          <blockquote style={{ ...B, fontStyle:'italic', color:WHITE, margin:'0 0 1.5rem' }}>
            «{VOICES[1].q}»
          </blockquote>
          <div style={{ ...LB, color:'rgba(255,255,255,0.5)' }}>{VOICES[1].who}</div>
        </Tile>
        <Tile bg={PINK} tc={OFF} pad={PAD}
          style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <blockquote style={{ ...B, fontStyle:'italic', color:OFF, margin:'0 0 1.5rem' }}>
            «{VOICES[2].q}»
          </blockquote>
          <div style={{ ...LB, color:'rgba(0,0,0,0.45)' }}>{VOICES[2].who}</div>
        </Tile>
      </div>
    </div>

    {/* 2-col quote row */}
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:BR }}>
      {[
        { v: VOICES[2], bg:WHITE },
        { v: VOICES[3], bg:YELL  },
      ].map(({ v, bg }, i) => (
        <Tile key={i} bg={bg} tc={OFF} pad={PAD}
          style={{ minHeight:280, borderRight: i===0 ? BR : 'none',
            display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <blockquote style={{ ...B, fontStyle:'italic', color:OFF, margin:'0 0 1.5rem' }}>
            «{v.q}»
          </blockquote>
          <div style={{ ...LB, color:'rgba(0,0,0,0.5)', marginBottom:'0.25rem' }}>{v.who}</div>
          <div style={{ ...LB, color:'rgba(0,0,0,0.35)' }}>{v.role}</div>
        </Tile>
      ))}
    </div>

    {/* §8  МАНІФЕСТ */}
    <Tile bg={DARK} tc={CREAM} pad="clamp(4rem,8vw,8rem) 3rem"
      style={{ textAlign:'center', display:'flex', flexDirection:'column',
        alignItems:'center', gap:'2rem' }}>
      <div style={{ ...LB, color:ORG }}>МАНІФЕСТ</div>
      <h2 style={{ ...H, fontSize:'clamp(2rem,6vw,4rem)', lineHeight:'clamp(2.5rem,7vw,5rem)',
        color:CREAM, margin:0, maxWidth:800, fontWeight:400 }}>
        Пам'ять{' '}
        <em style={{ fontStyle:'italic', color:YELL }}>активується</em>,<br/>
        а не зберігається.
      </h2>
      <p style={{ ...B, color:'rgba(240,237,230,0.65)', maxWidth:600, margin:0 }}>
        Кожна лабораторія, кожна сесія симуляції, кожен документ архіву —
        акт активації. Ви не вивчаєте університет. Ви <em>є</em> університетом.
      </p>
      <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', justifyContent:'center' }}>
        <button className="wuf-hos-btn wuf-hos-btn--primary">Отримати сертифікат →</button>
        <button className="wuf-hos-btn wuf-hos-btn--ghost">Цифровий архів</button>
        <button className="wuf-hos-btn wuf-hos-btn--ghost">Симуляція</button>
      </div>
    </Tile>

  </div>
);
