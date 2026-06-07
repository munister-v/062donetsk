/* Interactive Map Page — Donbas map with DonNTU-related objects */
const MAP_LOCATIONS = [
  { id:'donetsk', name:'Донецьк', type:'campus', lat:48.0159, lng:37.8029, status:'occupied',
    period:'1921–2014', desc:'Головний кампус DonNTU. 6 корпусів, 22 лабораторії, бібліотека з 1.2 млн примірників. Окупований з 2014 року.',
    objects:[
      { name:'Головний корпус (1936–1958)', type:'building', status:'occupied' },
      { name:'Бібліотека DonNTU', type:'building', status:'occupied' },
      { name:'Лабораторний корпус №2', type:'building', status:'occupied' },
      { name:'Гуртожитки №1–5', type:'housing', status:'occupied' },
      { name:'Спортивний комплекс', type:'sports', status:'occupied' },
      { name:'Ботанічний сад', type:'nature', status:'occupied' },
    ]},
  { id:'pokrovsk', name:'Покровськ', type:'campus', lat:48.2864, lng:37.1805, status:'relocated',
    period:'2014–2020', desc:'Перше місце переміщення. Тимчасові аудиторії у школах та адмінбудівлях. Початок дистанційного навчання.',
    objects:[
      { name:'Тимчасовий навчальний центр', type:'building', status:'relocated' },
      { name:'Адміністрація (тимчасова)', type:'admin', status:'relocated' },
    ]},
  { id:'lutsk', name:'Луцьк', type:'campus', lat:50.7472, lng:25.3254, status:'active',
    period:'2020–н.ч.', desc:'Основний кампус з 2020 року. 3 навчальні корпуси, 2 гуртожитки, 12 лабораторій. Тут б\'ється серце DonNTU.',
    objects:[
      { name:'Навчальний корпус №1', type:'building', status:'active' },
      { name:'Навчальний корпус №2', type:'building', status:'active' },
      { name:'Лабораторний корпус', type:'building', status:'active' },
      { name:'Гуртожиток №1', type:'housing', status:'active' },
      { name:'Гуртожиток №2', type:'housing', status:'active' },
      { name:'Адміністрація', type:'admin', status:'active' },
    ]},
  { id:'drohobych', name:'Дрогобич', type:'campus', lat:49.3497, lng:23.5059, status:'active',
    period:'2022–н.ч.', desc:'Додатковий кампус. Навчальний корпус та гуртожиток. Окремі спеціальності та заочне навчання.',
    objects:[
      { name:'Навчальний корпус', type:'building', status:'active' },
      { name:'Гуртожиток №3', type:'housing', status:'active' },
    ]},
  { id:'kyiv', name:'Київ', type:'office', lat:50.4501, lng:30.5234, status:'active',
    period:'2022–н.ч.', desc:'Представництво DonNTU. Зв\'язок з МОН, міжнародними організаціями, грантові проекти.',
    objects:[
      { name:'Представництво DonNTU', type:'admin', status:'active' },
    ]},
];

const INDUSTRIAL_OBJECTS = [
  { name:'Шахта ім. Засядька', city:'Донецьк', type:'mine', status:'damaged', workers_donntu:340,
    desc:'Одна з найбільших шахт Донбасу. Понад 340 випускників DonNTU працювали тут. Пошкоджена внаслідок бойових дій.' },
  { name:'Маріупольський металургійний комбінат', city:'Маріуполь', type:'factory', status:'destroyed', workers_donntu:180,
    desc:'Великий металургійний завод. 180+ інженерів-випускників DonNTU. Зруйнований під час облоги 2022.' },
  { name:'ШУ «Покровське»', city:'Покровськ', type:'mine', status:'operating', workers_donntu:210,
    desc:'Найбільше шахтоуправління України. 210+ випускників DonNTU. Продовжує роботу в прифронтових умовах.' },
  { name:'Вуглегірська ТЕС', city:'Вуглегірськ', type:'energy', status:'occupied', workers_donntu:95,
    desc:'Теплова електростанція. 95 випускників-енергетиків DonNTU. Під окупацією з 2014.' },
  { name:'ДТЕК Енерго', city:'Київ (штаб-квартира)', type:'energy', status:'operating', workers_donntu:420,
    desc:'Найбільша приватна енергокомпанія України. 420+ випускників DonNTU працюють по всій мережі.' },
  { name:'Метінвест', city:'Маріуполь / Запоріжжя', type:'factory', status:'relocated', workers_donntu:350,
    desc:'Гірничо-металургійна група. 350+ випускників DonNTU. Частково переміщена після 2022.' },
  { name:'Шахта «Суходільська-Східна»', city:'Суходільськ', type:'mine', status:'occupied', workers_donntu:120,
    desc:'Шахта Луганської області. 120 випускників DonNTU. Під окупацією з 2014.' },
  { name:'Siemens Energy (партнер)', city:'Берлін', type:'partner', status:'active', workers_donntu:12,
    desc:'Міжнародний партнер DonNTU. 12 випускників пройшли стажування. Спільні проекти з відновлювальної енергетики.' },
];

const MAP_STATS = [
  { v:'~65 000', label:'Випускників', desc:'За 105 років' },
  { v:'1 700+', label:'Інженерів', desc:'На підприємствах Донбасу' },
  { v:'4', label:'Кампуси', desc:'Донецьк → Покровськ → Луцьк/Дрогобич' },
  { v:'8+', label:'Країн', desc:'Де працюють випускники' },
  { v:'42', label:'Підприємства', desc:'Ключові роботодавці' },
  { v:'3', label:'Переміщення', desc:'Але жодної зупинки' },
];

const STATUS_COLORS = {
  active:'var(--sage)', occupied:'var(--rust)', damaged:'var(--rust)',
  destroyed:'var(--rust)', relocated:'var(--amber)', operating:'var(--sage)',
};
const STATUS_LABELS = {
  active:'АКТИВНИЙ', occupied:'ОКУПОВАНИЙ', damaged:'ПОШКОДЖЕНИЙ',
  destroyed:'ЗРУЙНОВАНИЙ', relocated:'ПЕРЕМІЩЕНИЙ', operating:'ПРАЦЮЄ',
};

const MapPage = ({ onNavigate }) => {
  const [selectedLocation, setSelectedLocation] = React.useState('donetsk');
  const [showIndustrial, setShowIndustrial] = React.useState(false);

  const loc = MAP_LOCATIONS.find(l => l.id === selectedLocation);

  return (
    <div className="page">
      <span className="lbl">16 · МАПА</span>

      <div style={{marginTop:'1.5rem'}}>
        <h1 className="h1" style={{fontSize:'2.25rem',lineHeight:1.15}}>
          Географія <em>впливу.</em>
        </h1>
        <p className="body" style={{marginTop:'1rem',maxWidth:'560px'}}>
          DonNTU — це не лише кампус. Це тисячі інженерів на шахтах, заводах, електростанціях від Донбасу до Берліна. Карта показує масштаб впливу університету на регіон і світ.
        </p>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'0.75rem',marginTop:'2rem'}}>
        {MAP_STATS.map((s,i) => (
          <div key={i} className="gc" style={{padding:'1rem',textAlign:'center'}}>
            <div className="serif tg" style={{fontSize:'1.375rem',fontWeight:500}}>{s.v}</div>
            <div className="lbl" style={{marginTop:'0.5rem'}}>{s.label}</div>
            <div className="caption" style={{marginTop:'0.25rem',color:'var(--t3)'}}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Visual map representation */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ШЛЯХ ПЕРЕМІЩЕННЯ</span>
        <div className="div-line"></div>
      </div>
      <div className="gc" style={{padding:'1.5rem',marginTop:'1rem'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem',flexWrap:'wrap'}}>
          {MAP_LOCATIONS.filter(l => l.type==='campus').map((l,i,arr) => (
            <React.Fragment key={l.id}>
              <button style={{padding:'0.75rem 1.25rem',border:selectedLocation===l.id?'2px solid var(--amber)':'1px solid var(--border)',background:selectedLocation===l.id?'var(--s1)':'transparent',cursor:'pointer',color:'var(--t1)',textAlign:'center',minWidth:'120px'}}
                onClick={() => { setSelectedLocation(l.id); setShowIndustrial(false); }}>
                <div className="lbl" style={{color:STATUS_COLORS[l.status]||'var(--t3)',fontSize:'0.625rem'}}>{STATUS_LABELS[l.status]}</div>
                <div className="h3" style={{fontWeight:500,marginTop:'0.25rem'}}>{l.name}</div>
                <div className="caption" style={{color:'var(--t3)',marginTop:'0.25rem'}}>{l.period}</div>
              </button>
              {i < arr.length-1 && <span style={{color:'var(--amber)',fontSize:'1.25rem'}}>→</span>}
            </React.Fragment>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:'1rem'}}>
          <span className="caption" style={{color:'var(--t3)'}}>
            {MAP_LOCATIONS.filter(l=>l.type==='campus').map(l => `${l.name} (${l.lat.toFixed(2)}°N, ${l.lng.toFixed(2)}°E)`).join(' → ')}
          </span>
        </div>
      </div>

      {/* Selected location details */}
      {loc && (
        <div style={{marginTop:'1.5rem'}}>
          <div className="gc gc-gold" style={{padding:'1.25rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <div>
                <span className="lbl lbl-gold">{loc.name.toUpperCase()} · {loc.period}</span>
                <p className="body" style={{marginTop:'0.75rem',fontSize:'0.875rem'}}>{loc.desc}</p>
              </div>
              <Badge status={loc.status==='active'?'completed':loc.status==='occupied'?'locked':'featured'}
                label={STATUS_LABELS[loc.status]} />
            </div>
            <div style={{marginTop:'1rem'}}>
              <span className="lbl" style={{fontSize:'0.6875rem'}}>ОБ'ЄКТИ</span>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'0.5rem',marginTop:'0.5rem'}}>
                {loc.objects.map((o,i) => (
                  <div key={i} style={{padding:'0.5rem 0.75rem',border:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span className="body" style={{fontSize:'0.8125rem'}}>{o.name}</span>
                    <span style={{width:6,height:6,borderRadius:'50%',background:STATUS_COLORS[o.status]||'var(--t3)',flexShrink:0}}></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Industrial objects */}
      <div className="div-row" style={{marginTop:'2.5rem'}}>
        <span className="lbl">ПІДПРИЄМСТВА · ДЕ ПРАЦЮЮТЬ ВИПУСКНИКИ</span>
        <div className="div-line"></div>
      </div>
      <div style={{marginTop:'1rem'}}>
        {INDUSTRIAL_OBJECTS.map((obj,i) => (
          <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem 0',borderBottom:'1px solid var(--border)',gap:'1rem'}}>
            <div style={{flex:1}}>
              <h4 className="h3" style={{fontWeight:500,fontSize:'0.9375rem'}}>{obj.name}</h4>
              <span className="caption" style={{color:'var(--t3)'}}>
                📍 {obj.city} · {obj.type==='mine'?'Шахта':obj.type==='factory'?'Завод':obj.type==='energy'?'Енергетика':'Партнер'}
              </span>
              <p className="body" style={{marginTop:'0.375rem',fontSize:'0.8125rem',color:'var(--t2)'}}>{obj.desc}</p>
            </div>
            <div style={{textAlign:'right',flexShrink:0}}>
              <div className="serif tg" style={{fontSize:'1rem',fontWeight:500}}>{obj.workers_donntu}</div>
              <span className="caption" style={{color:'var(--t3)'}}>випускників</span>
              <div style={{marginTop:'0.375rem'}}>
                <Badge status={obj.status==='operating'||obj.status==='active'?'completed':obj.status==='relocated'?'featured':'locked'}
                  label={STATUS_LABELS[obj.status]} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total impact */}
      <div className="gc gc-gold" style={{padding:'1.5rem',marginTop:'2.5rem',textAlign:'center'}}>
        <span className="lbl lbl-gold">МАСШТАБ ВПЛИВУ</span>
        <blockquote className="serif" style={{fontSize:'1.125rem',lineHeight:1.6,marginTop:'1rem',fontStyle:'italic'}}>
          «Від Донецька до Берліна, від шахт Покровська до лабораторій Луцька — випускники DonNTU формують інженерний ландшафт. 65 000 спеціалістів за 105 років. Університет, який неможливо зупинити.»
        </blockquote>
      </div>

      <Inst />
    </div>
  );
};

window.MapPage = MapPage;
