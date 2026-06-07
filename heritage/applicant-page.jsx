/* Applicant Page — for prospective students */
const SPECIALTIES = [
  { name:'Гірнича інженерія', degree:'Бакалавр / Магістр', faculty:'Гірничий', places:45, cost:'Бюджет / Контракт', demand:'high',
    desc:'Класична спеціальність DonNTU з 1921 року. Підземна розробка, безпека шахт, автоматизація видобутку. Унікальна симуляційна лабораторія.',
    careers:['Гірничий інженер','Маркшейдер','Інженер з охорони праці','Проектувальник шахт'] },
  { name:'Будівництво та цивільна інженерія', degree:'Бакалавр / Магістр', faculty:'Будівельний', places:60, cost:'Бюджет / Контракт', demand:'critical',
    desc:'Проектування та будівництво будівель, мостів, доріг. Нова програма з інженерії відбудови — підготовка до відновлення Донбасу.',
    careers:['Інженер-будівельник','BIM-проектувальник','Інспектор будівель','Інженер відбудови'] },
  { name:'Кібербезпека', degree:'Бакалавр / Магістр', faculty:'ІТ', places:40, cost:'Бюджет / Контракт', demand:'critical',
    desc:'Захист інформаційних систем, мереж, критичної інфраструктури. Практика на реальних SCADA-системах. Партнерство з НАТО CCDCOE.',
    careers:['Аналітик кібербезпеки','Пентестер','SOC-інженер','Архітектор безпеки'] },
  { name:'Електротехніка та електроенергетика', degree:'Бакалавр / Магістр', faculty:'Електротехнічний', places:50, cost:'Бюджет / Контракт', demand:'high',
    desc:'Енергосистеми, електропривод, відновлювальна енергетика. Симулятор енергосистеми для практичних занять.',
    careers:['Енергетик','Електроінженер','Інженер з автоматизації','Проектувальник електромереж'] },
  { name:'Екологія', degree:'Бакалавр', faculty:'Природничий', places:30, cost:'Бюджет / Контракт', demand:'high',
    desc:'Екологічний моніторинг, рекультивація земель, управління відходами. Унікальний фокус на екології воєнних конфліктів.',
    careers:['Еколог','Інспектор довкілля','Фахівець з рекультивації','Екоконсультант'] },
  { name:'Архітектура', degree:'Бакалавр / Магістр', faculty:'Будівельний', places:25, cost:'Бюджет / Контракт', demand:'medium',
    desc:'Промислова та цивільна архітектура. Документування архітектурної спадщини. Проектування для відбудови зруйнованих міст.',
    careers:['Архітектор','Дизайнер інтер\'єрів','Урбаніст','Реставратор'] },
  { name:'Металургія', degree:'Бакалавр / Магістр', faculty:'Металургійний', places:35, cost:'Бюджет / Контракт', demand:'medium',
    desc:'Технології лиття, нові матеріали, переробка вторинної сировини. Розробки з переробки залізобетонних конструкцій зруйнованих будівель.',
    careers:['Металург','Інженер-матеріалознавець','Технолог лиття','Контроль якості'] },
  { name:'Комп\'ютерні науки', degree:'Бакалавр / Магістр', faculty:'ІТ', places:55, cost:'Бюджет / Контракт', demand:'high',
    desc:'Програмування, штучний інтелект, аналіз даних, веб-розробка. Сучасний стек технологій, проектне навчання.',
    careers:['Software Engineer','Data Scientist','DevOps інженер','Full-stack розробник'] },
];

const ADMISSION_TIMELINE = [
  { date:'01.07', title:'Початок реєстрації', desc:'Створення електронного кабінету вступника на vstup.edbo.gov.ua' },
  { date:'01–20.07', title:'Подання заяв', desc:'Електронне подання заяв. Можна обрати до 5 спеціальностей.' },
  { date:'21–31.07', title:'Вступні іспити', desc:'ЗНО/НМТ або внутрішні іспити для окремих категорій.' },
  { date:'01–05.08', title:'Рейтингові списки', desc:'Оприлюднення рейтингових списків вступників.' },
  { date:'05–10.08', title:'Зарахування (бюджет)', desc:'Рекомендація до зарахування. Подання оригіналів документів.' },
  { date:'10–25.08', title:'Зарахування (контракт)', desc:'Укладання контрактів. Додаткове зарахування за наявності місць.' },
  { date:'01.09', title:'Початок навчання', desc:'Урочисте відкриття навчального року. Ласкаво просимо до DonNTU!' },
];

const STUDENT_BENEFITS = [
  { icon:'🎓', title:'Стипендія', desc:'Академічна стипендія для бюджетних студентів. Підвищена — за відмінне навчання. Соціальна — для пільгових категорій.' },
  { icon:'🏠', title:'Гуртожиток', desc:'Місця у гуртожитку в Луцьку та Дрогобичі. Пріоритет для переміщених осіб та іногородніх студентів.' },
  { icon:'🌍', title:'Міжнародні програми', desc:'Обмін з університетами Польщі, Німеччини, Канади. Гранти на стажування за кордоном. Подвійні дипломи.' },
  { icon:'💼', title:'Працевлаштування', desc:'85% випускників працевлаштовані протягом 6 місяців. Партнерства з Siemens, ДТЕК, Метінвест та іншими.' },
  { icon:'🛡', title:'Підтримка ВПО', desc:'Спеціальні умови для внутрішньо переміщених осіб. Психологічна підтримка, матеріальна допомога, гнучкий графік.' },
  { icon:'💻', title:'Дистанційне навчання', desc:'Повноцінне дистанційне навчання для студентів, які не можуть бути присутніми очно. LMS, відеолекції, онлайн-лабораторії.' },
];

const FAQ = [
  { q:'Чи можна навчатись повністю дистанційно?', a:'Так. DonNTU пропонує повноцінне дистанційне навчання для всіх спеціальностей. Це особливо актуально для студентів з зони бойових дій або тих, хто за кордоном.' },
  { q:'Які документи потрібні для вступу?', a:'Паспорт, атестат (або диплом бакалавра для магістратури), результати ЗНО/НМТ, фото 3×4. Для ВПО — довідка про переміщення.' },
  { q:'Чи є пільги для дітей учасників бойових дій?', a:'Так. Діти учасників бойових дій, ветеранів та загиблих захисників мають право на позаконкурсний вступ на бюджет та додаткові стипендії.' },
  { q:'Де відбувається навчання?', a:'Основний кампус — Луцьк. Додатковий — Дрогобич. Дистанційне навчання доступне з будь-якої точки. Після деокупації — повернення в Донецьк.' },
  { q:'Чи визнаються дипломи DonNTU за кордоном?', a:'Так. DonNTU має акредитацію МОН України. Дипломи визнаються в ЄС через Болонський процес. Є програми подвійних дипломів з університетами Польщі та Німеччини.' },
];

const ApplicantPage = ({ onNavigate }) => {
  const [expandedFaq, setExpandedFaq] = React.useState(null);
  const [selectedSpec, setSelectedSpec] = React.useState(null);

  return (
    <div className="page">
      <span className="lbl">14 · АБІТУРІЄНТУ</span>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginTop:'1.5rem',gap:'2rem',flexWrap:'wrap'}}>
        <div style={{maxWidth:'560px'}}>
          <h1 className="h1" style={{fontSize:'2.25rem',lineHeight:1.15}}>
            Твоє <em>майбутнє</em> починається тут.
          </h1>
          <p className="body" style={{marginTop:'1rem'}}>
            DonNTU — університет, що пережив три війни і не зупинився жодного дня. Ми готуємо інженерів, які відбудують Донбас та всю Україну. Приєднуйся.
          </p>
        </div>
        <div className="gc gc-gold" style={{minWidth:'220px',padding:'1.25rem',textAlign:'center'}}>
          <span className="lbl lbl-gold">ВСТУПНА КАМПАНІЯ 2026</span>
          <div className="serif tg" style={{fontSize:'2rem',fontWeight:500,marginTop:'0.5rem'}}>340</div>
          <span className="caption">бюджетних місць</span>
          <div style={{marginTop:'0.75rem'}}>
            <span className="lbl" style={{color:'var(--sage)'}}>8 СПЕЦІАЛЬНОСТЕЙ</span>
          </div>
        </div>
      </div>

      {/* Specialties */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">СПЕЦІАЛЬНОСТІ · ВСТУП 2026</span>
        <div className="div-line"></div>
      </div>
      <div style={{marginTop:'1rem'}}>
        {SPECIALTIES.map((s,i) => (
          <div key={i} className="gc" style={{padding:'1rem',marginBottom:'0.75rem',cursor:'pointer',borderColor:selectedSpec===i?'var(--amber)':undefined}} onClick={() => setSelectedSpec(selectedSpec===i?null:i)}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'1rem'}}>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'baseline',gap:'0.75rem',flexWrap:'wrap'}}>
                  <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem'}}>{s.name}</h4>
                  <Badge status={s.demand==='critical'?'elevated':s.demand==='high'?'now':'open'} label={s.demand==='critical'?'КРИТИЧНИЙ ПОПИТ':s.demand==='high'?'ВИСОКИЙ ПОПИТ':'ПОПИТ'} />
                </div>
                <span className="caption" style={{color:'var(--t3)'}}>{s.degree} · {s.faculty} факультет · {s.places} місць · {s.cost}</span>
              </div>
            </div>

            {selectedSpec===i && (
              <div style={{marginTop:'1rem',borderTop:'1px solid var(--border)',paddingTop:'1rem'}}>
                <p className="body" style={{fontSize:'0.8125rem'}}>{s.desc}</p>
                <div style={{marginTop:'0.75rem'}}>
                  <span className="lbl">КАР'ЄРА</span>
                  <div style={{display:'flex',gap:'0.5rem',marginTop:'0.375rem',flexWrap:'wrap'}}>
                    {s.careers.map((c,j) => (
                      <span key={j} style={{padding:'0.25rem 0.5rem',border:'1px solid var(--border)',fontSize:'0.75rem',color:'var(--t2)'}}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">КАЛЕНДАР ВСТУПНИКА · 2026</span>
        <div className="div-line"></div>
      </div>
      <div style={{marginTop:'1rem'}}>
        {ADMISSION_TIMELINE.map((t,i) => (
          <div key={i} style={{display:'flex',gap:'1.5rem',marginBottom:'1rem'}}>
            <div style={{minWidth:'70px'}}>
              <span className="mono tg" style={{fontSize:'0.875rem',fontWeight:500}}>{t.date}</span>
            </div>
            <div style={{flex:1,borderLeft:'1px solid var(--border)',paddingLeft:'1.5rem'}}>
              <h4 className="h3" style={{fontWeight:500,fontSize:'0.875rem'}}>{t.title}</h4>
              <p className="caption" style={{marginTop:'0.25rem',color:'var(--t3)'}}>{t.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ПЕРЕВАГИ · ЧОМУ DONNTU</span>
        <div className="div-line"></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1rem',marginTop:'1rem'}}>
        {STUDENT_BENEFITS.map((b,i) => (
          <div key={i} className="gc" style={{padding:'1.25rem'}}>
            <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
              <span style={{fontSize:'1.5rem'}}>{b.icon}</span>
              <h4 className="h3" style={{fontWeight:500}}>{b.title}</h4>
            </div>
            <p className="body" style={{marginTop:'0.75rem',fontSize:'0.8125rem',color:'var(--t2)'}}>{b.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ПИТАННЯ ТА ВІДПОВІДІ</span>
        <div className="div-line"></div>
      </div>
      <div style={{marginTop:'1rem'}}>
        {FAQ.map((f,i) => (
          <div key={i} className="gc" style={{padding:'1rem',marginBottom:'0.5rem',cursor:'pointer',borderColor:expandedFaq===i?'var(--amber)':undefined}} onClick={() => setExpandedFaq(expandedFaq===i?null:i)}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h4 className="h3" style={{fontWeight:500,fontSize:'0.875rem'}}>{f.q}</h4>
              <span className="caption" style={{color:'var(--amber)'}}>{expandedFaq===i?'▲':'▼'}</span>
            </div>
            {expandedFaq===i && (
              <p className="body" style={{marginTop:'0.75rem',fontSize:'0.8125rem',color:'var(--t2)',borderTop:'1px solid var(--border)',paddingTop:'0.75rem'}}>{f.a}</p>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="gc gc-gold" style={{padding:'1.5rem',marginTop:'2.5rem',textAlign:'center'}}>
        <span className="lbl lbl-gold">ПОДАТИ ЗАЯВУ</span>
        <p className="serif" style={{fontSize:'1.125rem',lineHeight:1.6,marginTop:'0.75rem',fontStyle:'italic'}}>
          vstup.edbo.gov.ua · приймальна комісія: +380 (332) 24-81-47 · email: vstup@donntu.edu.ua
        </p>
        <p className="caption" style={{marginTop:'0.5rem',color:'var(--t3)'}}>
          Консультації: пн–пт 9:00–17:00 · Луцьк, вул. Львівська 75
        </p>
      </div>

      <Inst />
    </div>
  );
};

window.ApplicantPage = ApplicantPage;
