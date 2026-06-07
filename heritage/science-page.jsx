/* Science & Research Page — nauka, publications, conferences */
const RESEARCH_SCHOOLS = [
  { name:'Підземна розробка родовищ', founder:'М.М. Протод\'яконов', year:1926, dept:'Гірнича інженерія', status:'active',
    desc:'Найстаріша наукова школа DonNTU. Заснована одним із батьків гірничої науки. Теорія гірського тиску Протод\'яконова використовується у всьому світі. Школа підготувала понад 50 докторів наук.',
    achievements:['Теорія гірського тиску (1926)','Метод щитової проходки (1958)','Система вентиляції глибоких шахт (1975)','Технологія дегазації вугільних пластів (1990)'],
    publications:420, patents:38 },
  { name:'Електропривод та автоматизація', founder:'А.О. Горєв', year:1935, dept:'Електротехніка', status:'active',
    desc:'Школа електроприводу — основа промислової автоматизації Донбасу. Розробки впроваджені на 200+ підприємствах. Системи керування шахтними підйомами, конвеєрами, насосними станціями.',
    achievements:['Автоматизація шахтного підйому (1960)','Частотно-регульований привод для конвеєрів (1985)','Енергозберігаючі системи (2005)','Кіберфізичні системи промисловості (2020)'],
    publications:380, patents:45 },
  { name:'Геомеханіка та геотехнології', founder:'В.І. Бузило', year:1952, dept:'Гірнича інженерія', status:'active',
    desc:'Дослідження стійкості підземних виробок, деформації гірського масиву та безпеки гірничих робіт. Після 2014 року — фокус на екологічних ризиках від затоплення шахт.',
    achievements:['Моделювання зсувів у Донбасі (1970)','Прогноз гірських ударів (1988)','Оцінка ризиків затоплення шахт (2016)','Моніторинг деформацій земної поверхні (2023)'],
    publications:290, patents:22 },
  { name:'Промислова екологія', founder:'Л.Д. Пляцук', year:1995, dept:'Екологія', status:'active',
    desc:'Наймолодша наукова школа. Досліджує вплив промисловості та війни на довкілля Донбасу. Гранти від ЄС, ЮНЕП, НАТО. Моніторинг забруднення у зоні бойових дій.',
    achievements:['Екологічний атлас Донбасу (2003)','Оцінка екологічних наслідків війни (2016)','Технології очищення шахтних вод (2019)','Карта мінних забруднень (2024)'],
    publications:175, patents:12 },
  { name:'Кібербезпека промислових систем', founder:'І.С. Петренко', year:2015, dept:'Кібербезпека', status:'active',
    desc:'Створена у відповідь на кібератаки на інфраструктуру України. Захист SCADA-систем, енергомереж, водопостачання. Співпраця з НАТО, ЄС, CERT-UA.',
    achievements:['Методологія захисту SCADA (2017)','Аналіз атаки BlackEnergy на енергомережу (2018)','Кіберполігон для студентів (2022)','AI-система виявлення атак (2025)'],
    publications:95, patents:8 },
];

const KEY_PUBLICATIONS = [
  { title:'Теорія гірського тиску та стійкості виробок', author:'М.М. Протод\'яконов', year:1926, type:'monograph', citations:2400,
    desc:'Фундаментальна праця, що заклала основи гірничої механіки. Коефіцієнт міцності Протод\'яконова — стандарт у гірничій справі.' },
  { title:'Автоматизація шахтних вентиляційних систем', author:'А.О. Горєв та ін.', year:1965, type:'monograph', citations:890,
    desc:'Перша в СРСР монографія з автоматизації провітрювання шахт. Основа для ГОСТ з вентиляції вугільних шахт.' },
  { title:'Екологічні наслідки збройного конфлікту на Донбасі', author:'Колектив DonNTU', year:2017, type:'report', citations:340,
    desc:'Перше комплексне дослідження екологічних наслідків війни на Донбасі. Доповідь для ЮНЕП та Міністерства екології.' },
  { title:'Ризики затоплення вугільних шахт Донбасу', author:'В.І. Бузило та ін.', year:2019, type:'article', citations:280,
    desc:'Прогнозування екологічних ризиків від неконтрольованого затоплення шахт. Вплив на водні ресурси та ґрунти.' },
  { title:'Кіберзахист промислових систем в умовах гібридної війни', author:'І.С. Петренко та ін.', year:2022, type:'article', citations:156,
    desc:'Аналіз кібератак на українську інфраструктуру 2015–2022. Методологія захисту критичних промислових систем.' },
  { title:'Відновлювальна енергетика для деокупованих територій', author:'О.В. Кравченко', year:2024, type:'article', citations:45,
    desc:'Концепція енергонезалежності деокупованих міст через сонячну та вітрову генерацію. Інтеграція з існуючою мережею.' },
];

const CONFERENCES = [
  { name:'«Інженерія Донбасу»', freq:'Щорічна', since:1998, next:'Жовтень 2026', location:'Луцьк',
    desc:'Головна конференція DonNTU. Об\'єднує гірників, металургів, екологів, IT-фахівців. 200+ учасників щороку.', editions:26 },
  { name:'«Кіберзахист критичної інфраструктури»', freq:'Щорічна', since:2018, next:'Березень 2027', location:'Луцьк + онлайн',
    desc:'Міжнародна конференція з кібербезпеки. Партнери: НАТО, ENISA, CERT-UA. 15 країн-учасниць.', editions:8 },
  { name:'«Відбудова: інженерні рішення»', freq:'Раз на 2 роки', since:2022, next:'Травень 2027', location:'Луцьк',
    desc:'Конференція присвячена технологіям відновлення зруйнованої інфраструктури. Архітектори, будівельники, екологи.', editions:3 },
  { name:'«Студентська наука DonNTU»', freq:'Щорічна', since:1965, next:'Квітень 2027', location:'Луцьк + Дрогобич',
    desc:'Студентська наукова конференція. 300+ доповідей, 50+ секцій. Найкращі роботи публікуються у «Віснику DonNTU».', editions:59 },
];

const SCIENCE_STATS = [
  { v:'5', label:'Наукових шкіл', desc:'Від 1926 до сьогодні' },
  { v:'1 360', label:'Публікацій', desc:'Монографій, статей, доповідей' },
  { v:'125', label:'Патентів', desc:'Винаходи та корисні моделі' },
  { v:'4', label:'Конференцій', desc:'Регулярних наукових форумів' },
  { v:'50+', label:'Докторів наук', desc:'Підготовлено за історію' },
  { v:'200+', label:'Впроваджень', desc:'На підприємствах Донбасу' },
];

const PUB_TYPES = { monograph:'МОНОГРАФІЯ', article:'СТАТТЯ', report:'ДОПОВІДЬ' };

const SciencePage = ({ onNavigate }) => {
  const [expandedSchool, setExpandedSchool] = React.useState(null);
  const [expandedPub, setExpandedPub] = React.useState(null);

  return (
    <div className="page">
      <span className="lbl">20 · НАУКА</span>

      <div style={{marginTop:'1.5rem'}}>
        <h1 className="h1" style={{fontSize:'2.25rem',lineHeight:1.15}}>
          Наука, що <em>переміщується.</em>
        </h1>
        <p className="body" style={{marginTop:'1rem',maxWidth:'580px'}}>
          DonNTU втратив корпуси, лабораторії, обладнання. Але не втратив наукові школи — бо вони живуть у людях. 5 наукових шкіл, 1 360 публікацій, 125 патентів. Від теорії гірського тиску 1926 року до кіберзахисту 2025-го.
        </p>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'0.75rem',marginTop:'2rem'}}>
        {SCIENCE_STATS.map((s,i) => (
          <div key={i} className="gc" style={{padding:'1rem',textAlign:'center'}}>
            <div className="serif tg" style={{fontSize:'1.375rem',fontWeight:500}}>{s.v}</div>
            <div className="lbl" style={{marginTop:'0.5rem'}}>{s.label}</div>
            <div className="caption" style={{marginTop:'0.25rem',color:'var(--t3)'}}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Research Schools */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">НАУКОВІ ШКОЛИ</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'grid',gap:'1rem',marginTop:'1rem'}}>
        {RESEARCH_SCHOOLS.map((s,i) => (
          <div key={i} className="gc" style={{padding:'1.25rem',cursor:'pointer',borderColor: expandedSchool===i ? 'var(--amber)' : undefined}} onClick={() => setExpandedSchool(expandedSchool===i ? null : i)}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <div>
                <h3 className="h3" style={{fontWeight:500,fontSize:'1rem'}}>{s.name}</h3>
                <span className="lbl" style={{marginTop:'0.25rem'}}>{s.dept} · з {s.year} р.</span>
              </div>
              <Badge status="completed" label="АКТИВНА" />
            </div>
            <span className="caption" style={{display:'block',marginTop:'0.5rem',color:'var(--t3)'}}>Засновник: {s.founder}</span>
            <div style={{display:'flex',gap:'1.5rem',marginTop:'0.75rem'}}>
              <span className="mono" style={{fontSize:'0.75rem',color:'var(--amber)'}}>{s.publications} публікацій</span>
              <span className="mono" style={{fontSize:'0.75rem',color:'var(--t3)'}}>{s.patents} патентів</span>
            </div>

            {expandedSchool===i && (
              <div style={{marginTop:'1rem',borderTop:'1px solid var(--border)',paddingTop:'1rem'}}>
                <p className="body" style={{fontSize:'0.8125rem'}}>{s.desc}</p>
                <div className="lbl" style={{marginTop:'1rem'}}>КЛЮЧОВІ ДОСЯГНЕННЯ</div>
                <ul style={{marginTop:'0.5rem',paddingLeft:'1.25rem'}}>
                  {s.achievements.map((a,j) => (
                    <li key={j} className="body" style={{fontSize:'0.8125rem',marginTop:'0.25rem',color:'var(--t2)'}}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Key Publications */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">КЛЮЧОВІ ПУБЛІКАЦІЇ</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'grid',gap:'0.75rem',marginTop:'1rem'}}>
        {KEY_PUBLICATIONS.map((p,i) => (
          <div key={i} className="gc" style={{padding:'1.25rem',cursor:'pointer',borderColor: expandedPub===i ? 'var(--amber)' : undefined}} onClick={() => setExpandedPub(expandedPub===i ? null : i)}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem',flex:1}}>{p.title}</h4>
              <Badge status={p.type==='monograph'?'completed':'open'} label={PUB_TYPES[p.type]} />
            </div>
            <div style={{display:'flex',gap:'1rem',marginTop:'0.5rem',flexWrap:'wrap'}}>
              <span className="caption" style={{color:'var(--t2)'}}>{p.author}</span>
              <span className="mono" style={{fontSize:'0.6875rem',color:'var(--t3)'}}>{p.year}</span>
              <span className="mono" style={{fontSize:'0.6875rem',color:'var(--amber)'}}>{p.citations} цитувань</span>
            </div>
            {expandedPub===i && (
              <div style={{marginTop:'0.75rem',borderTop:'1px solid var(--border)',paddingTop:'0.75rem'}}>
                <p className="body" style={{fontSize:'0.8125rem'}}>{p.desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Conferences */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">НАУКОВІ КОНФЕРЕНЦІЇ</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1rem',marginTop:'1rem'}}>
        {CONFERENCES.map((c,i) => (
          <div key={i} className="gc" style={{padding:'1.25rem'}}>
            <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem'}}>{c.name}</h4>
            <span className="lbl" style={{marginTop:'0.25rem',display:'block'}}>{c.freq} · з {c.since} р.</span>
            <p className="body" style={{marginTop:'0.75rem',fontSize:'0.8125rem'}}>{c.desc}</p>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:'0.75rem',paddingTop:'0.75rem',borderTop:'1px solid var(--border)'}}>
              <span className="caption" style={{color:'var(--t3)'}}>{c.editions} проведено</span>
              <span className="mono" style={{fontSize:'0.6875rem',color:'var(--amber)'}}>НАСТУПНА: {c.next}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lost science */}
      <div className="gc gc-gold" style={{marginTop:'2.5rem',padding:'2rem',textAlign:'center'}}>
        <span className="lbl lbl-gold">ВТРАЧЕНА НАУКА</span>
        <h3 className="serif tg" style={{fontSize:'1.25rem',marginTop:'0.75rem'}}>
          Що залишилось у Донецьку
        </h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'1rem',marginTop:'1.5rem',textAlign:'center'}}>
          <div>
            <div className="serif tg" style={{fontSize:'1.25rem'}}>12</div>
            <div className="caption" style={{color:'var(--t3)'}}>Лабораторій з обладнанням</div>
          </div>
          <div>
            <div className="serif tg" style={{fontSize:'1.25rem'}}>~50 000</div>
            <div className="caption" style={{color:'var(--t3)'}}>Наукових зразків та колекцій</div>
          </div>
          <div>
            <div className="serif tg" style={{fontSize:'1.25rem'}}>3</div>
            <div className="caption" style={{color:'var(--t3)'}}>Унікальні стенди (не відтворені)</div>
          </div>
          <div>
            <div className="serif tg" style={{fontSize:'1.25rem'}}>~200</div>
            <div className="caption" style={{color:'var(--t3)'}}>Дисертацій (паперові копії)</div>
          </div>
        </div>
        <p className="body" style={{marginTop:'1.5rem',maxWidth:'480px',margin:'1.5rem auto 0',fontSize:'0.8125rem',color:'var(--t2)'}}>
          Наукове обладнання, колекції мінералів, геологічні зразки, унікальні стенди — все це залишилось у захоплених корпусах. Але наукові школи продовжують працювати — бо знання неможливо захопити.
        </p>
      </div>
    </div>
  );
};
