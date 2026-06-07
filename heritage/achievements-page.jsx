/* Achievements Page — comprehensive badge system */
const ACH_CATEGORIES = [
  { id:'engineering', name:'Інженерія',    ic:'⚙', earned:10, total:18, color:'var(--slate)' },
  { id:'memory',      name:'Пам\'ять',      ic:'✦', earned:7,  total:16, color:'var(--amber)' },
  { id:'recovery',    name:'Відновлення',  ic:'↺', earned:4,  total:12, color:'var(--sage)' },
  { id:'discipline',  name:'Дисципліна',   ic:'◆', earned:5,  total:10, color:'var(--violet)' },
];

const ACHIEVEMENTS = [
  // EARNED
  { id:1, tier:'g', cat:'engineering', earned:true, name:'Інженер з безпеки II', desc:'Завершено модуль гірничої безпеки рівня II з результатом 87+.', date:'24 квіт 2026', xp:120, mark:'II' },
  { id:2, tier:'s', cat:'engineering', earned:true, name:'Енергетик', desc:'Завершено три лабораторії з енергосистем.', date:'18 квіт 2026', xp:80, mark:'E' },
  { id:3, tier:'b', cat:'engineering', earned:true, name:'Перший вхід', desc:'Перша симуляційна сесія завершена.', date:'12 лют 2026', xp:25, mark:'I' },
  { id:4, tier:'g', cat:'memory', earned:true, name:'Хранитель архіву', desc:'Переглянуто понад 100 одиниць архіву з різних епох.', date:'02 квіт 2026', xp:150, mark:'A' },
  { id:5, tier:'s', cat:'memory', earned:true, name:'Слухач', desc:'Прослухано 12 усних свідчень із серії «Голоси».', date:'21 бер 2026', xp:75, mark:'V' },
  { id:6, tier:'h', cat:'discipline', earned:true, name:'Спадкоємець', desc:'Прочитано Установчий статут 1921 року. Активований ключовий артефакт.', date:'14 лют 2026', xp:200, mark:'⟡', rare:true },
  { id:7, tier:'b', cat:'recovery', earned:true, name:'Початок шляху', desc:'Розпочато курс відновлення Донбасу.', date:'08 бер 2026', xp:30, mark:'R' },
  { id:8, tier:'s', cat:'discipline', earned:true, name:'Перфекціоніст', desc:'Чотири оцінювання поспіль з результатом ≥90.', date:'15 квіт 2026', xp:90, mark:'★' },

  // NEW EARNED — tied to deepened content
  { id:13, tier:'s', cat:'engineering', earned:true, name:'Кіберзахисник', desc:'Завершено лабораторію з кібербезпеки АСУ ТП. Захист промислових систем.', date:'28 квіт 2026', xp:85, mark:'🛡' },
  { id:14, tier:'b', cat:'engineering', earned:true, name:'Автоматизатор', desc:'Програмування ПЛК для конвеєрної лінії — перша автоматизація.', date:'20 квіт 2026', xp:40, mark:'⚙' },
  { id:15, tier:'s', cat:'memory', earned:true, name:'Картограф переміщень', desc:'Переглянуто всі 4 локації кампусу та порівняння «було-стало».', date:'10 квіт 2026', xp:70, mark:'◈' },
  { id:16, tier:'g', cat:'memory', earned:true, name:'Знавець ректорів', desc:'Прочитано біографії всіх 8 ректорів DonNTU від заснування до сьогодення.', date:'05 квіт 2026', xp:100, mark:'♛' },
  { id:17, tier:'b', cat:'recovery', earned:true, name:'Еколог', desc:'Пройдено лабораторну роботу з екологічної оцінки забруднення ґрунтів.', date:'22 бер 2026', xp:35, mark:'♲' },
  { id:18, tier:'s', cat:'discipline', earned:true, name:'Дослідник інцидентів', desc:'Вивчено всі 4 реальні аварійні сценарії та їхні уроки.', date:'25 квіт 2026', xp:80, mark:'⚠' },

  // LOCKED
  { id:9,  tier:'g', cat:'engineering', earned:false, name:'Майстер симулятора', desc:'Завершити всі 6 рівнів гірничої безпеки без жодної аварії.', xp:250, mark:'M', prog:62 },
  { id:10, tier:'h', cat:'recovery', earned:false, name:'Архітектор відбудови', desc:'Створити повний план відновлення модельного міста Донбасу.', xp:300, mark:'⟡', rare:true, prog:18 },
  { id:11, tier:'g', cat:'memory', earned:false, name:'Літописець', desc:'Внести власне свідчення до архіву усної історії DonNTU.', xp:180, mark:'L', prog:0 },
  { id:12, tier:'s', cat:'discipline', earned:false, name:'Наставник', desc:'Допомогти 5 молодшим студентам пройти базові лабораторії.', xp:100, mark:'N', prog:40 },
  { id:19, tier:'g', cat:'engineering', earned:false, name:'Геомеханік', desc:'Завершити геомеханічний симулятор — аналіз стійкості виробок Донбасу.', xp:200, mark:'⛏', prog:0 },
  { id:20, tier:'h', cat:'recovery', earned:false, name:'Урбаніст Донбасу', desc:'Створити повний план відновлення міської інфраструктури на основі реальних даних.', xp:350, mark:'⟡', rare:true, prog:5 },
  { id:21, tier:'g', cat:'memory', earned:false, name:'Архіваріус', desc:'Переглянуто 20+ одиниць архіву з усіх епох та категорій.', xp:160, mark:'📜', prog:45 },
  { id:22, tier:'s', cat:'engineering', earned:false, name:'Енергетик-оптимізатор', desc:'Завершити симулятор енергосистеми та оптимізувати графік навантаження.', xp:120, mark:'⚡', prog:0 },
  { id:23, tier:'g', cat:'discipline', earned:false, name:'Науковець', desc:'Прочитано 10+ наукових публікацій у лабораторіях DonNTU.', xp:140, mark:'📖', prog:30 },
  { id:24, tier:'h', cat:'memory', earned:false, name:'Голос покоління', desc:'Записати та додати власне усне свідчення до серії «Голоси Донбасу».', xp:250, mark:'⟡', rare:true, prog:0 },
];

const ACH_LEADERBOARD = [
  { rank:1, name:'Олексій Г.', course:5, xp:4280, lvl:'Магістр' },
  { rank:2, name:'Софія К.', course:4, xp:3640, lvl:'Бакалавр VII' },
  { rank:3, name:'Дмитро П.', course:4, xp:3420, lvl:'Бакалавр VII' },
  { rank:7, name:'Ви', course:3, xp:1240, lvl:'Бакалавр V', me:true },
];

const AchievementsPage = ({ onNavigate }) => {
  const [filter, setFilter] = React.useState('all');
  const [modal, setModal] = React.useState(null);

  const total = ACHIEVEMENTS.length;
  const earned = ACHIEVEMENTS.filter(a => a.earned).length;
  const xpTotal = ACHIEVEMENTS.filter(a => a.earned).reduce((s, a) => s + a.xp, 0);
  const nextLevel = 1500;

  const filtered = filter === 'all' ? ACHIEVEMENTS : ACHIEVEMENTS.filter(a => a.cat === filter);

  return (
    <div className="page">
      <span className="lbl">07 · ДОСЯГНЕННЯ · СИСТЕМА ВІДЗНАК ⟡</span>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginTop:'1rem',marginBottom:'2.25rem',gap:'1.5rem',flexWrap:'wrap'}}>
        <div>
          <h1 className="h1">Відзнаки</h1>
          <p className="body" style={{marginTop:'0.5rem',fontSize:'1rem'}}>
            Що ви засвоїли, що пам'ятаєте, що збудували.
          </p>
        </div>
        <div style={{display:'flex',gap:'2rem'}}>
          <div><div className="stat-v" style={{color:'var(--amber)'}}>{earned}<span style={{color:'var(--t3)',fontSize:'1.25rem'}}>/{total}</span></div><span className="stat-l">ВІДЗНАК</span></div>
          <div><div className="stat-v">{xpTotal}<span style={{color:'var(--t3)',fontSize:'1rem',marginLeft:4}}>XP</span></div><span className="stat-l">ДОСВІД</span></div>
        </div>
      </div>

      {/* HERO — Rank + recent */}
      <div className="ach-hero">
        <div className="gc gc-gold ach-rank">
          <span className="lbl lbl-gold">ПОТОЧНИЙ РІВЕНЬ</span>
          <div className="ach-rank-name serif">Бакалавр <em>V</em></div>
          <p className="body" style={{fontSize:'0.875rem',color:'var(--t2)'}}>
            «Інженер, що розуміє метод. Працює самостійно над структурованими задачами.»
          </p>
          <div className="ach-rank-bar-wrap">
            <div className="ach-rank-info">
              <span className="lbl">До рівня <span className="tg">Бакалавр VI</span></span>
              <span className="ach-rank-xp">{xpTotal}<span className="t3" style={{fontSize:'0.875rem'}}> / {nextLevel} XP</span></span>
            </div>
            <Bar value={xpTotal} max={nextLevel} />
            <span className="caption">Залишилось {nextLevel - xpTotal} XP. Завершіть Симуляцію гірничої безпеки для +120 XP.</span>
          </div>
        </div>

        <div className="gc ach-recent">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span className="lbl">ОСТАННІ · ЗДОБУТО</span>
            <span className="caption">КВІТЕНЬ 2026</span>
          </div>
          {ACHIEVEMENTS.filter(a => a.earned).slice(0, 4).map(a => (
            <div key={a.id} className="ach-recent-i" onClick={() => setModal(a)}>
              <div className={`ach-card-icon ach-tier-${a.tier}`} style={{width:36,height:36,fontSize:'0.875rem',marginBottom:0}}>{a.mark}</div>
              <div style={{flex:1,minWidth:0}}>
                <div className="serif" style={{fontSize:'0.95rem',fontWeight:500}}>{a.name}</div>
                <div className="caption">{a.date} · +{a.xp} XP</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="div-row">
        <span className="lbl">КАТЕГОРІЇ · 4 НАПРЯМКИ</span>
        <div className="div-line"></div>
      </div>
      <div className="ach-cats">
        {ACH_CATEGORIES.map(c => (
          <div key={c.id} className="gc ach-cat" onClick={() => setFilter(filter === c.id ? 'all' : c.id)}
            style={{ borderColor: filter === c.id ? c.color + '66' : undefined }}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <div className="ach-cat-ic" style={{borderColor: c.color + '44', color: c.color}}>{c.ic}</div>
              <span className="lbl-gold lbl">{c.earned}/{c.total}</span>
            </div>
            <div className="serif" style={{fontSize:'1.125rem',fontWeight:500,marginTop:'0.625rem'}}>{c.name}</div>
            <Bar value={c.earned} max={c.total} variant={c.id === 'engineering' ? 'cyan' : c.id === 'recovery' ? 'green' : 'gold'} />
          </div>
        ))}
      </div>

      {/* GRID */}
      <div className="ach-section-head">
        <span className="lbl">КОЛЕКЦІЯ · {filter === 'all' ? 'ВСІ' : ACH_CATEGORIES.find(c => c.id === filter)?.name?.toUpperCase()}</span>
        {filter !== 'all' && <button className="btn btn-sm" onClick={() => setFilter('all')}>СКИНУТИ ФІЛЬТР</button>}
      </div>
      <div className="ach-grid">
        {filtered.map(a => (
          <div key={a.id} className={`gc ach-card ${!a.earned ? 'ach-card-locked' : ''}`} onClick={() => setModal(a)}>
            <div className={`ach-card-icon ach-tier-${a.tier}`}>{a.mark}</div>
            <div className="ach-card-name">{a.name}</div>
            <div className="ach-card-desc">{a.desc}</div>
            <div className="ach-card-meta">
              {a.earned ? (
                <>
                  <span className="caption">{a.date}</span>
                  <span className="lbl lbl-gold">+{a.xp} XP</span>
                </>
              ) : (
                <>
                  <span className="caption">{a.prog > 0 ? `Прогрес ${a.prog}%` : 'Не розпочато'}</span>
                  <span className="caption" style={{color:'var(--t3)'}}>● ЗАКРИТО</span>
                </>
              )}
            </div>
            {a.rare && <div style={{position:'absolute',top:'0.875rem',right:'0.875rem'}}><Badge status="rare" label="РІДКІСНА" /></div>}
          </div>
        ))}
      </div>

      {/* LEADERBOARD */}
      <div className="ach-section-head">
        <span className="lbl">ЛІДЕРБОРД · ТОП-СТУДЕНТИ</span>
        <span className="caption">СЕМЕСТР · ВЕСНА 2026</span>
      </div>
      <div className="gc" style={{padding:0}}>
        {ACH_LEADERBOARD.map((p, i) => (
          <div key={i} style={{
            display:'grid', gridTemplateColumns:'50px 1fr 120px 100px 80px',
            padding:'1rem 1.5rem', borderBottom: i < ACH_LEADERBOARD.length - 1 ? '1px solid var(--border)' : 'none',
            alignItems:'center', gap:'1rem',
            background: p.me ? 'var(--gold-g)' : undefined,
            color: p.me ? 'var(--t1)' : undefined,
          }}>
            <span className="serif" style={{fontSize:'1.5rem',fontWeight:300,color: p.me?'var(--amber)':'var(--t2)'}}>{p.rank}</span>
            <div>
              <div className="serif" style={{fontSize:'1rem',fontWeight:500}}>{p.name}{p.me && ' ← ви'}</div>
              <div className="caption">{p.course} курс</div>
            </div>
            <span className="lbl">{p.lvl}</span>
            <span className="lbl lbl-gold">{p.xp.toLocaleString('uk-UA')} XP</span>
            <span className="caption" style={{textAlign:'right'}}>{p.me ? '— ваш ранг' : ''}</span>
          </div>
        ))}
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)}>
        {modal && (
          <div style={{padding:'2rem',textAlign:'center'}}>
            <div className={`ach-card-icon ach-tier-${modal.tier}`} style={{width:80,height:80,fontSize:'2rem',margin:'0 auto 1.25rem'}}>{modal.mark}</div>
            <h2 className="h3" style={{fontSize:'1.75rem'}}>{modal.name}</h2>
            <p className="body" style={{marginTop:'0.75rem',maxWidth:'40ch',margin:'0.75rem auto 0'}}>{modal.desc}</p>
            <div style={{display:'flex',justifyContent:'center',gap:'1.5rem',marginTop:'1.75rem',paddingTop:'1.5rem',borderTop:'1px solid var(--border)'}}>
              <div><span className="lbl">КАТЕГОРІЯ</span><div className="serif" style={{fontSize:'1rem',marginTop:'0.25rem'}}>{ACH_CATEGORIES.find(c => c.id === modal.cat)?.name}</div></div>
              <div><span className="lbl">ДОСВІД</span><div className="serif tg" style={{fontSize:'1rem',marginTop:'0.25rem'}}>+{modal.xp} XP</div></div>
              <div><span className="lbl">СТАТУС</span><div className="serif" style={{fontSize:'1rem',marginTop:'0.25rem',color:modal.earned?'var(--sage)':'var(--t3)'}}>{modal.earned ? 'ЗДОБУТО' : 'ЗАКРИТО'}</div></div>
            </div>
            {modal.earned && <div className="caption" style={{marginTop:'1rem'}}>Здобуто: {modal.date}</div>}
          </div>
        )}
      </Modal>
    </div>
  );
};

window.AchievementsPage = AchievementsPage;
