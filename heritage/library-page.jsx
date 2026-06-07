/* Library Page — digital library, textbooks, video lectures, publications */
const LIBRARY_COLLECTIONS = [
  { id:'textbooks', icon:'📖', name:'Підручники', count:87, desc:'Авторські підручники викладачів DonNTU з гірництва, металургії, електротехніки, архітектури та інших спеціальностей.',
    items:[
      { title:'Основи підземної розробки родовищ', author:'Проф. О. Коваленко', year:2019, pages:480, lang:'UA', access:'open' },
      { title:'Автоматизація гірничих машин', author:'Проф. В. Бондаренко', year:2020, pages:312, lang:'UA', access:'open' },
      { title:'Промислова архітектура Донбасу', author:'Доц. М. Лисенко', year:2018, pages:256, lang:'UA', access:'open' },
      { title:'Кібербезпека промислових систем', author:'Доц. І. Петренко', year:2023, pages:198, lang:'UA/EN', access:'open' },
      { title:'Екологія воєнних конфліктів', author:'Ст. викл. Н. Ткаченко', year:2024, pages:167, lang:'UA', access:'open' },
      { title:'Металургія нових матеріалів', author:'Проф. С. Григоренко', year:2021, pages:344, lang:'UA', access:'restricted' },
    ]},
  { id:'lectures', icon:'🎬', name:'Відеолекції', count:214, desc:'Записи лекцій з усіх спеціальностей. Від базових курсів до спеціалізованих семінарів. Доступ для всіх студентів DonNTU.',
    items:[
      { title:'Цикл «Гірнича справа XXI століття»', author:'Проф. О. Коваленко', year:2023, duration:'18 год', episodes:12, access:'open' },
      { title:'Основи кібербезпеки', author:'Доц. І. Петренко', year:2024, duration:'24 год', episodes:16, access:'open' },
      { title:'BIM-проектування для відбудови', author:'Каф. будівництва', year:2025, duration:'12 год', episodes:8, access:'open' },
      { title:'Екологічний моніторинг Донбасу', author:'Ст. викл. Н. Ткаченко', year:2024, duration:'9 год', episodes:6, access:'open' },
      { title:'Енергосистеми та відновлювальна енергетика', author:'Каф. електротехніки', year:2024, duration:'15 год', episodes:10, access:'restricted' },
    ]},
  { id:'publications', icon:'📄', name:'Наукові публікації', count:1847, desc:'Статті, дисертації, монографії викладачів та аспірантів DonNTU. Індексовані у Scopus, Web of Science, Google Scholar.',
    items:[
      { title:'Mining safety automation in conflict zones', author:'Kovalenko O., Bondarenko V.', year:2024, journal:'Int. J. Mining Science', citations:23, access:'open' },
      { title:'Cyber resilience of critical infrastructure', author:'Petrenko I. et al.', year:2024, journal:'IEEE Security & Privacy', citations:41, access:'open' },
      { title:'Environmental impact of armed conflict on Donbas soils', author:'Tkachenko N.', year:2023, journal:'Environmental Pollution', citations:67, access:'open' },
      { title:'Recycling war-damaged concrete structures', author:'Grigorenko S.', year:2025, journal:'Construction & Building Materials', citations:8, access:'open' },
      { title:'Digital twin of displaced university campus', author:'DonNTU Research Group', year:2024, journal:'Computers & Education', citations:19, access:'restricted' },
    ]},
  { id:'archives', icon:'🗂', name:'Архівні матеріали', count:342, desc:'Оцифровані документи з історії DonNTU: накази, протоколи, фотографії, листи, дипломні роботи від 1921 року.',
    items:[
      { title:'Наказ про заснування ДГІ', year:1921, type:'Документ', format:'PDF/скан', access:'open' },
      { title:'Фотоальбом евакуації 1941', year:1941, type:'Фотоархів', format:'JPEG', access:'open' },
      { title:'Дипломні роботи 1950-х', year:'1950–1959', type:'Колекція', format:'PDF', access:'restricted' },
      { title:'Хроніка відбудови після ВСВ', year:'1943–1950', type:'Документи', format:'PDF/скан', access:'open' },
      { title:'Відеохроніка переміщення 2014', year:2014, type:'Відео', format:'MP4', access:'open' },
    ]},
];

const LIBRARY_STATS = [
  { v:'2 490', label:'Ресурсів', desc:'У цифровій бібліотеці' },
  { v:'87', label:'Підручників', desc:'Авторські видання' },
  { v:'214', label:'Відеолекцій', desc:'Годин навчального відео' },
  { v:'1 847', label:'Публікацій', desc:'Наукових статей' },
  { v:'342', label:'Архівних', desc:'Оцифрованих документів' },
  { v:'12', label:'Мов', desc:'Матеріалів бібліотеки' },
];

const FEATURED_SERIES = [
  { name:'«Донбас: інженерна спадщина»', episodes:8, desc:'Документальний цикл про інженерні досягнення регіону від 1920-х до сьогодні. Шахти, заводи, мости, електростанції.', status:'completed' },
  { name:'«Голоси переміщення»', episodes:12, desc:'Усні історії викладачів та студентів про три переміщення DonNTU. Записано у 2023–2024 роках.', status:'completed' },
  { name:'«Лабораторія майбутнього»', episodes:6, desc:'Віртуальні екскурсії по лабораторіях DonNTU. Обладнання, дослідження, студентські проекти.', status:'completed' },
  { name:'«Відбудова: інженерний погляд»', episodes:4, desc:'Як інженери DonNTU бачать відновлення Донбасу. Технології, матеріали, екологія.', status:'now' },
];

const LibraryPage = ({ onNavigate }) => {
  const [activeCollection, setActiveCollection] = React.useState('textbooks');
  const [filter, setFilter] = React.useState('all');

  const collection = LIBRARY_COLLECTIONS.find(c => c.id === activeCollection);

  return (
    <div className="page">
      <span className="lbl">13 · БІБЛІОТЕКА</span>

      <div style={{marginTop:'1.5rem'}}>
        <h1 className="h1" style={{fontSize:'2.25rem',lineHeight:1.15}}>
          Цифрова <em>бібліотека.</em>
        </h1>
        <p className="body" style={{marginTop:'1rem',maxWidth:'560px'}}>
          Фізичну бібліотеку з 1.2 мільйона примірників втрачено у Донецьку. Але знання не зникають — вони оцифровуються, систематизуються та стають доступними для всіх.
        </p>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'0.75rem',marginTop:'2rem'}}>
        {LIBRARY_STATS.map((s,i) => (
          <div key={i} className="gc" style={{padding:'1rem',textAlign:'center'}}>
            <div className="serif tg" style={{fontSize:'1.375rem',fontWeight:500}}>{s.v}</div>
            <div className="lbl" style={{marginTop:'0.5rem'}}>{s.label}</div>
            <div className="caption" style={{marginTop:'0.25rem',color:'var(--t3)'}}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Collection tabs */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">КОЛЕКЦІЇ</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'flex',gap:'0.5rem',marginTop:'1rem',flexWrap:'wrap'}}>
        {LIBRARY_COLLECTIONS.map(c => (
          <button key={c.id} className={`si ${activeCollection===c.id?'act':''}`}
            style={{padding:'0.5rem 1rem',border:'1px solid var(--border)',background:activeCollection===c.id?'var(--s1)':'transparent',cursor:'pointer',color:'var(--t1)',fontSize:'0.8125rem'}}
            onClick={() => setActiveCollection(c.id)}>
            {c.icon} {c.name} <span className="caption" style={{color:'var(--t3)',marginLeft:'0.25rem'}}>({c.count})</span>
          </button>
        ))}
      </div>

      {/* Active collection */}
      {collection && (
        <div style={{marginTop:'1.5rem'}}>
          <div className="gc gc-gold" style={{padding:'1rem',marginBottom:'1rem'}}>
            <span className="lbl lbl-gold">{collection.name.toUpperCase()}</span>
            <p className="body" style={{marginTop:'0.5rem',fontSize:'0.8125rem'}}>{collection.desc}</p>
          </div>

          <div style={{display:'flex',gap:'0.5rem',marginBottom:'1rem'}}>
            {['all','open','restricted'].map(f => (
              <button key={f} style={{padding:'0.375rem 0.75rem',border:'1px solid var(--border)',background:filter===f?'var(--s1)':'transparent',cursor:'pointer',color:'var(--t1)',fontSize:'0.75rem'}}
                onClick={() => setFilter(f)}>
                {f==='all'?'ВСІ':f==='open'?'ВІДКРИТИЙ ДОСТУП':'ОБМЕЖЕНИЙ'}
              </button>
            ))}
          </div>

          <div style={{marginTop:'0.5rem'}}>
            {collection.items.filter(item => filter==='all' || item.access===filter).map((item,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.875rem 0',borderBottom:'1px solid var(--border)',gap:'1rem'}}>
                <div style={{flex:1}}>
                  <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem'}}>{item.title}</h4>
                  <span className="caption" style={{color:'var(--t3)'}}>
                    {item.author && `${item.author} · `}{item.year}
                    {item.pages && ` · ${item.pages} стор.`}
                    {item.duration && ` · ${item.duration}`}
                    {item.episodes && ` · ${item.episodes} еп.`}
                    {item.journal && ` · ${item.journal}`}
                    {item.citations !== undefined && ` · ${item.citations} цитувань`}
                    {item.type && ` · ${item.type}`}
                    {item.format && ` · ${item.format}`}
                  </span>
                </div>
                <Badge status={item.access==='open'?'completed':'locked'} label={item.access==='open'?'ВІДКРИТИЙ':'ОБМЕЖЕНИЙ'} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured series */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ДОКУМЕНТАЛЬНІ СЕРІЇ</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1rem',marginTop:'1rem'}}>
        {FEATURED_SERIES.map((s,i) => (
          <div key={i} className="gc" style={{padding:'1.25rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem'}}>{s.name}</h4>
              <Badge status={s.status==='completed'?'completed':'now'} label={s.status==='completed'?'ЗАВЕРШЕНО':'В ПРОЦЕСІ'} />
            </div>
            <span className="caption" style={{color:'var(--t3)'}}>{s.episodes} епізодів</span>
            <p className="body" style={{marginTop:'0.5rem',fontSize:'0.8125rem',color:'var(--t2)'}}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Lost library memorial */}
      <div className="gc gc-gold" style={{padding:'1.5rem',marginTop:'2.5rem',textAlign:'center'}}>
        <span className="lbl lbl-gold">ПАМ'ЯТІ БІБЛІОТЕКИ</span>
        <blockquote className="serif" style={{fontSize:'1.125rem',lineHeight:1.6,marginTop:'1rem',fontStyle:'italic'}}>
          «1 200 000 примірників. Рукописи, рідкісні видання, дисертації за 93 роки. Бібліотека DonNTU у Донецьку — втрачена, але не забута. Кожен оцифрований ресурс — крок до відновлення.»
        </blockquote>
      </div>

      <Inst />
    </div>
  );
};

window.LibraryPage = LibraryPage;
