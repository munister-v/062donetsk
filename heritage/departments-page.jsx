/* Departments Page — faculties and departments */
const FACULTIES = [
  { name:'Гірничо-геологічний', code:'ГГФ', dean:'Проф. О. Коваленко', students:280, founded:1921, status:'original',
    desc:'Найстаріший факультет. Заснований разом з університетом у 1921 році. Гірнича інженерія, геологія, геодезія, маркшейдерія. Факультет, з якого почався DonNTU.',
    departments:[
      { name:'Розробка родовищ корисних копалин', head:'Проф. О. Коваленко', staff:18, focus:'Підземна розробка, шахтне будівництво, вентиляція',
        research:'Безпека глибоких шахт, дегазація, нові методи видобутку' },
      { name:'Геологія та розвідка', head:'Доц. Р. Дмитренко', staff:12, focus:'Геологія Донбасу, мінералогія, геохімія',
        research:'Геологічні ризики затоплення шахт, картографування' },
      { name:'Маркшейдерія та геодезія', head:'Доц. П. Савченко', staff:8, focus:'Гірничі вимірювання, деформації земної поверхні',
        research:'Моніторинг просідання над шахтами, GPS-технології' },
    ]},
  { name:'Електротехнічний', code:'ЕТФ', dean:'Проф. В. Бондаренко', students:310, founded:1935, status:'expanded',
    desc:'Факультет електроенергетики та автоматизації. Від шахтних електроприводів до відновлюваної енергетики. Підготовка інженерів для енергосистеми України.',
    departments:[
      { name:'Електропривод та автоматизація', head:'Проф. В. Бондаренко', staff:22, focus:'Промислова автоматизація, частотний привод, робототехніка',
        research:'Енергозберігаючі системи, Smart Grid, автоматизація відбудови' },
      { name:'Електропостачання', head:'Доц. К. Мельник', staff:15, focus:'Електричні мережі, якість електроенергії, захист',
        research:'Відновлення енергомережі Донбасу, мікрогріди' },
      { name:'Відновлювальна енергетика', head:'Доц. О. Кравченко', staff:10, focus:'Сонячна, вітрова енергетика, накопичення енергії',
        research:'Автономне енергозабезпечення деокупованих територій' },
    ]},
  { name:'Інженерно-будівельний', code:'ІБФ', dean:'Доц. М. Лисенко', students:220, founded:1952, status:'expanded',
    desc:'Будівництво, архітектура, міське планування. Після 2022 — фокус на відбудові зруйнованих міст. Унікальна компетенція: будівництво в умовах постконфлікту.',
    departments:[
      { name:'Промислове та цивільне будівництво', head:'Проф. А. Василенко', staff:16, focus:'Конструкції, фундаменти, технологія будівництва',
        research:'Технології швидкої відбудови, модульне будівництво' },
      { name:'Архітектура', head:'Доц. М. Лисенко', staff:12, focus:'Промислова архітектура, реконструкція, міське середовище',
        research:'Архітектурна спадщина Донбасу, відбудова міст' },
      { name:'Міське планування', head:'Доц. С. Ковальчук', staff:8, focus:'Генплани, транспорт, інфраструктура, зелені зони',
        research:'Планування відбудови зруйнованих міст Донбасу' },
    ]},
  { name:'Комп\'ютерних наук та технологій', code:'ФКНТ', dean:'Доц. І. Петренко', students:420, founded:1985, status:'expanded',
    desc:'Найбільший факультет за кількістю студентів. IT, кібербезпека, штучний інтелект, Data Science. Факультет, який зростає попри все.',
    departments:[
      { name:'Кібербезпека', head:'Доц. І. Петренко', staff:14, focus:'Захист інформації, SCADA-безпека, криптографія',
        research:'Кіберзахист критичної інфраструктури, AI-детекція атак' },
      { name:'Комп\'ютерна інженерія', head:'Доц. Н. Гончарук', staff:16, focus:'Програмування, бази даних, хмарні технології',
        research:'IoT для промисловості, цифрові двійники підприємств' },
      { name:'Штучний інтелект та Data Science', head:'Ст. викл. Д. Романенко', staff:10, focus:'Машинне навчання, NLP, комп\'ютерний зір',
        research:'AI для гірничої безпеки, прогнозування аварій' },
    ]},
  { name:'Екології та хімічної технології', code:'ФЕХТ', dean:'Ст. викл. Н. Ткаченко', students:165, founded:1995, status:'new',
    desc:'Наймолодший факультет. Екологія, хімічна технологія, охорона довкілля. Після 2014 — головний центр досліджень екологічних наслідків війни.',
    departments:[
      { name:'Екологія', head:'Ст. викл. Н. Ткаченко', staff:12, focus:'Екологічний моніторинг, оцінка впливу, відновлення екосистем',
        research:'Екологічні наслідки війни, мінні забруднення, затоплення шахт' },
      { name:'Хімічна технологія', head:'Доц. Л. Федоренко', staff:10, focus:'Хімія матеріалів, переробка відходів, водоочищення',
        research:'Очищення шахтних вод, переробка будівельних відходів' },
    ]},
  { name:'Металургії та матеріалознавства', code:'ФММ', dean:'Проф. С. Григоренко', students:135, founded:1930, status:'original',
    desc:'Один з найстаріших факультетів. Металургія, ливарне виробництво, нові матеріали. Історично пов\'язаний з металургійними гігантами Донбасу.',
    departments:[
      { name:'Металургія чорних металів', head:'Проф. С. Григоренко', staff:14, focus:'Виплавка сталі, прокат, термообробка',
        research:'Переробка зруйнованих конструкцій, нові сплави для відбудови' },
      { name:'Матеріалознавство', head:'Доц. В. Шульга', staff:8, focus:'Нові матеріали, композити, кераміка, наноматеріали',
        research:'Матеріали для екстремальних умов, 3D-друк металів' },
    ]},
];

const FACULTY_STATS = [
  { v:'6', label:'Факультетів', desc:'Від гірничого до IT' },
  { v:'17', label:'Кафедр', desc:'Навчальних підрозділів' },
  { v:'1 530', label:'Студентів', desc:'На всіх факультетах' },
  { v:'310', label:'Викладачів', desc:'Професори, доценти, асистенти' },
  { v:'48', label:'Докторів наук', desc:'Наукових керівників' },
  { v:'9', label:'Спеціальностей', desc:'Бакалавр + магістр' },
];

const STATUS_LABELS = { original:'ЗАСНОВНИЙ', expanded:'РОЗШИРЕНИЙ', new:'НОВИЙ' };

const DepartmentsPage = ({ onNavigate }) => {
  const [expandedFac, setExpandedFac] = React.useState(null);
  const [expandedDept, setExpandedDept] = React.useState(null);

  return (
    <div className="page">
      <span className="lbl">22 · КАФЕДРИ</span>

      <div style={{marginTop:'1.5rem'}}>
        <h1 className="h1" style={{fontSize:'2.25rem',lineHeight:1.15}}>
          Структура <em>знань.</em>
        </h1>
        <p className="body" style={{marginTop:'1rem',maxWidth:'580px'}}>
          6 факультетів, 17 кафедр, 310 викладачів. Від гірничої справи 1921 року до кібербезпеки та AI 2025-го. Кожна кафедра — це наукова школа, команда дослідників та покоління студентів, об'єднаних спільною місією.
        </p>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'0.75rem',marginTop:'2rem'}}>
        {FACULTY_STATS.map((s,i) => (
          <div key={i} className="gc" style={{padding:'1rem',textAlign:'center'}}>
            <div className="serif tg" style={{fontSize:'1.375rem',fontWeight:500}}>{s.v}</div>
            <div className="lbl" style={{marginTop:'0.5rem'}}>{s.label}</div>
            <div className="caption" style={{marginTop:'0.25rem',color:'var(--t3)'}}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Faculties */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ФАКУЛЬТЕТИ</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'grid',gap:'1rem',marginTop:'1rem'}}>
        {FACULTIES.map((f,fi) => (
          <div key={fi} className="gc" style={{padding:'1.25rem',borderColor: expandedFac===fi ? 'var(--amber)' : undefined}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',cursor:'pointer'}} onClick={() => {setExpandedFac(expandedFac===fi ? null : fi); setExpandedDept(null);}}>
              <div>
                <div style={{display:'flex',alignItems:'baseline',gap:'0.75rem'}}>
                  <h3 className="h3" style={{fontWeight:500,fontSize:'1rem'}}>{f.name}</h3>
                  <span className="mono" style={{fontSize:'0.6875rem',color:'var(--t3)'}}>{f.code}</span>
                </div>
                <span className="lbl" style={{marginTop:'0.25rem'}}>Декан: {f.dean} · з {f.founded} р.</span>
              </div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'0.25rem'}}>
                <Badge status={f.status==='original'?'completed':'open'} label={STATUS_LABELS[f.status]} />
                <span className="mono" style={{fontSize:'0.75rem',color:'var(--amber)'}}>{f.students} студентів</span>
              </div>
            </div>

            {expandedFac===fi && (
              <div style={{marginTop:'1rem',borderTop:'1px solid var(--border)',paddingTop:'1rem'}}>
                <p className="body" style={{fontSize:'0.8125rem'}}>{f.desc}</p>

                <div className="lbl" style={{marginTop:'1.25rem'}}>КАФЕДРИ · {f.departments.length}</div>
                <div style={{display:'grid',gap:'0.75rem',marginTop:'0.75rem'}}>
                  {f.departments.map((d,di) => (
                    <div key={di} style={{padding:'1rem',border:'1px solid var(--border)',borderRadius:'3px',cursor:'pointer',borderColor: expandedDept===`${fi}-${di}` ? 'var(--amber)' : undefined,background:'rgba(0,0,0,0.15)'}}
                         onClick={(e) => {e.stopPropagation(); setExpandedDept(expandedDept===`${fi}-${di}` ? null : `${fi}-${di}`);}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                        <h4 className="h3" style={{fontWeight:500,fontSize:'0.875rem'}}>{d.name}</h4>
                        <span className="mono" style={{fontSize:'0.6875rem',color:'var(--t3)'}}>{d.staff} осіб</span>
                      </div>
                      <span className="caption" style={{display:'block',marginTop:'0.25rem',color:'var(--t3)'}}>Зав. кафедри: {d.head}</span>

                      {expandedDept===`${fi}-${di}` && (
                        <div style={{marginTop:'0.75rem',borderTop:'1px solid var(--border)',paddingTop:'0.75rem'}}>
                          <div style={{marginBottom:'0.5rem'}}>
                            <span className="lbl" style={{fontSize:'0.5625rem'}}>НАПРЯМКИ</span>
                            <p className="body" style={{fontSize:'0.8125rem',marginTop:'0.25rem'}}>{d.focus}</p>
                          </div>
                          <div>
                            <span className="lbl" style={{fontSize:'0.5625rem'}}>ДОСЛІДЖЕННЯ</span>
                            <p className="body" style={{fontSize:'0.8125rem',marginTop:'0.25rem',color:'var(--amber)'}}>{d.research}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Historical note */}
      <div className="gc gc-gold" style={{marginTop:'2.5rem',padding:'2rem',textAlign:'center'}}>
        <span className="lbl lbl-gold">ЕВОЛЮЦІЯ СТРУКТУРИ</span>
        <h3 className="serif tg" style={{fontSize:'1.25rem',marginTop:'0.75rem'}}>
          Від 2 спеціальностей до 9
        </h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'1rem',marginTop:'1.5rem'}}>
          <div>
            <div className="mono" style={{fontSize:'0.75rem',color:'var(--t3)'}}>1921</div>
            <div className="serif tg" style={{fontSize:'1.125rem'}}>2</div>
            <div className="caption" style={{color:'var(--t3)'}}>спеціальності</div>
          </div>
          <div>
            <div className="mono" style={{fontSize:'0.75rem',color:'var(--t3)'}}>1960</div>
            <div className="serif tg" style={{fontSize:'1.125rem'}}>12</div>
            <div className="caption" style={{color:'var(--t3)'}}>спеціальностей</div>
          </div>
          <div>
            <div className="mono" style={{fontSize:'0.75rem',color:'var(--t3)'}}>2000</div>
            <div className="serif tg" style={{fontSize:'1.125rem'}}>28</div>
            <div className="caption" style={{color:'var(--t3)'}}>спеціальностей</div>
          </div>
          <div>
            <div className="mono" style={{fontSize:'0.75rem',color:'var(--t3)'}}>2026</div>
            <div className="serif tg" style={{fontSize:'1.125rem'}}>9</div>
            <div className="caption" style={{color:'var(--t3)'}}>спеціальностей</div>
          </div>
        </div>
        <p className="body" style={{marginTop:'1.5rem',maxWidth:'520px',margin:'1.5rem auto 0',fontSize:'0.8125rem',color:'var(--t2)'}}>
          Університет, що мав 28 спеціальностей та 18 000 студентів, зараз працює з 9 спеціальностями та 1 530 студентами. Але кожна з цих спеціальностей — це відповідь на реальну потребу: кібербезпека, відновлювальна енергетика, відбудова міст. Якість замість кількості.
        </p>
      </div>
    </div>
  );
};
