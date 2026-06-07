/* Gallery Page — локальний фотоархів без зовнішніх thumbnail-залежностей */

const GALLERY_IMAGE_VERSION = '20260522-gallery2026';
const localPhoto = path => `${path}?v=${GALLERY_IMAGE_VERSION}`;
const galleryPhoto = (path, data) => ({
  src: localPhoto(path),
  thumb: localPhoto(path),
  ...data,
});
const portraitPhoto = (path, data) => galleryPhoto(path, {
  portrait: true,
  objectPosition: 'center top',
  ...data,
});

/* ─── ЕРИ ─── */
const ERAS = [
  { id:'donetsk',  label:'ДОНЕЦЬК',          period:'1921–2014', color:'var(--amber)', width:65, desc:'93 роки · вул. Артема 58' },
  { id:'pokrovsk', label:'ПОКРОВСЬК',        period:'2014–2022', color:'var(--slate)', width:22, desc:'8 років · пл. Шибанкова 2' },
  { id:'modern',   label:'ЛУЦЬК / ДРОГОБИЧ', period:'2022–',     color:'var(--sage)',  width:13, desc:'гібридний кампус' },
];

/* ─── СЕКЦІЇ З ФОТО ─── */
const GALLERY_SECTIONS = [
  /* ════════════ ДОНЕЦЬК ════════════ */
  {
    id: 'donetsk-campus',
    era: 'donetsk',
    title: 'Донецький кампус · корпуси і бібліотека',
    sub: 'Локально збережені фото корпусів ДонНТУ у Донецьку',
    photos: [
      galleryPhoto('assets/donetsk-main.jpg', {
        title: 'Головний корпус ДонНТУ',
        year: 'архів',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Один із ключових корпусів університету у донецький період. Фото збережене локально, тому галерея відкривається без зовнішніх серверів.',
        wide: true,
      }),
      galleryPhoto('assets/donetsk-facade.jpg', {
        title: 'Фасад навчального корпусу',
        year: 'архів',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Вуличний фасад корпусу з історичного кампусу ДонНТУ.',
      }),
      galleryPhoto('assets/donetsk-3corp.jpg', {
        title: 'Третій корпус ДонНТУ',
        year: 'архів',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Корпусна архітектура університетського кварталу у Донецьку.',
      }),
      galleryPhoto('assets/donetsk-library.jpg', {
        title: 'Науково-технічна бібліотека',
        year: 'архів',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Будівля бібліотеки і пішохідний простір кампусу.',
        wide: true,
      }),
      galleryPhoto('assets/donetsk-artyoma.jpg', {
        title: 'Вулиця Артема біля кампусу',
        year: 'архів',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Міський контекст головного корпусу ДонНТУ у центрі Донецька.',
      }),
    ],
  },
  {
    id: 'pokrovsk',
    era: 'pokrovsk',
    title: 'Покровськ · переміщення і руйнування',
    sub: 'Перший кампус після евакуації та документування втрат',
    photos: [
      galleryPhoto('assets/pokrovsk-main.jpg', {
        title: 'ДонНТУ у Покровську',
        year: '2014–2022',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Навчальний корпус університету у період першого переміщення.',
        wide: true,
      }),
      galleryPhoto('assets/pokrovsk-war-2023.jpg', {
        title: 'Пошкодження корпусу · 2023',
        year: '2023',
        author: 'Національна поліція України / архів',
        license: 'архів',
        desc: 'Фіксація пошкоджень університетської інфраструктури під час війни.',
      }),
      galleryPhoto('assets/pokrovsk-war-2024.jpg', {
        title: 'Наслідки ракетного удару · 2024',
        year: '2024',
        author: 'Національна поліція України / архів',
        license: 'архів',
        desc: 'Фото руйнувань після удару по корпусах ДонНТУ у Покровську.',
      }),
      galleryPhoto('assets/pokrovsk-war-3corp.jpg', {
        title: 'Третій корпус після обстрілів',
        year: '2024',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Документування стану університетських будівель після атак.',
        wide: true,
      }),
    ],
  },
  {
    id: 'digital-2026',
    era: 'modern',
    title: '2026 · цифровий портал і нова візуальна система',
    sub: 'Свіжі матеріали з травня 2026: інтерфейси, панелі, архівні екрани',
    photos: [
      galleryPhoto('uploads/photo_2026-05-17_10-02-27.jpg', {
        title: 'DonNTU OS · стартовий екран',
        year: '2026',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Початковий екран цифрової спадщини ДонНТУ.',
        wide: true,
      }),
      galleryPhoto('uploads/photo_2026-05-17_10-02-28%20(2).jpg', {
        title: 'Мапа памʼяті та вузли архіву',
        year: '2026',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Темна карта звʼязків між подіями, корпусами й людьми університету.',
      }),
      galleryPhoto('uploads/photo_2026-05-17_10-02-28.jpg', {
        title: 'Персональний кабінет студента',
        year: '2026',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Огляд навчального прогресу, подій і кампусного життя у цифровому середовищі.',
        wide: true,
      }),
      galleryPhoto('uploads/photo_2026-05-17_10-02-29.jpg', {
        title: 'Архівні картки і корпуси',
        year: '2026',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Сторінка памʼяті з матеріалами про корпуси, документи й переміщення.',
      }),
      galleryPhoto('uploads/photo_2026-05-17_10-02-30.jpg', {
        title: 'Аналітична панель лабораторій',
        year: '2026',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Симуляційний екран з показниками й траєкторіями навчального сценарію.',
        wide: true,
      }),
      galleryPhoto('uploads/photo_2026-05-17_10-02-31.jpg', {
        title: 'Сертифікаційний екран',
        year: '2026',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Модуль оцінювання та сертифікатів у цифровому кампусі.',
      }),
      galleryPhoto('uploads/photo_2026-05-17_10-02-32.jpg', {
        title: 'Donbas Recovery Lab',
        year: '2026',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Сторінка лабораторії відновлення Донбасу з освітніми напрямами.',
      }),
      galleryPhoto('uploads/photo_2026-05-17_10-02-33.jpg', {
        title: 'План аудиторій і кімнат',
        year: '2026',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Інтерфейс навігації по аудиторіях цифрового простору.',
      }),
      galleryPhoto('uploads/chatgpt-render.png', {
        title: 'Візуальна метафора цифрової памʼяті',
        year: '2026',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Атмосферне зображення для розділів про памʼять, майбутнє і нічний режим порталу.',
        wide: true,
      }),
    ],
  },
  {
    id: 'people',
    era: 'modern',
    title: 'Видатні випускники · портретний архів',
    sub: 'Портрети людей, які формували інженерну, освітню і культурну історію ДонНТУ',
    photos: [
      portraitPhoto('assets/shylenko.jpg', {
        title: 'Денис Шиленко · ректор ДонНТУ',
        year: '2024–2026',
        author: 'DonNTU Heritage',
        license: 'локальний архів',
        desc: 'Ректор періоду другого переміщення та відновлення університету у Дрогобичі.',
      }),
      portraitPhoto('assets/people/solovyanenko.jpg', {
        title: 'Анатолій Соловʼяненко',
        year: '1932–1999',
        author: 'архів',
        license: 'локальний архів',
        desc: 'Оперний співак, Народний артист СРСР, випускник ДонНТУ.',
      }),
      portraitPhoto('assets/people/minaev.jpg', {
        title: 'Олександр Мінаєв',
        year: 'випуск 1964',
        author: 'архів',
        license: 'локальний архів',
        desc: 'Ректор ДонНТУ у 1989–2014 роках, Герой України.',
      }),
      portraitPhoto('assets/people/baranov.jpg', {
        title: 'Юрій Баранов',
        year: 'випуск 1960',
        author: 'архів',
        license: 'локальний архів',
        desc: 'Інженер-гірник і керівник вугільних підприємств Донбасу.',
      }),
      portraitPhoto('assets/people/gryadushchyi.jpg', {
        title: 'Борис Грядущий',
        year: 'випуск 1956',
        author: 'архів',
        license: 'локальний архів',
        desc: 'Інженер-електромеханік, фахівець з електрифікації гірничих робіт.',
      }),
      portraitPhoto('assets/people/konovalov.jpg', {
        title: 'Володимир Коновалов',
        year: '1911–1967',
        author: 'архів',
        license: 'локальний архів',
        desc: 'Командир підводного човна, Герой Радянського Союзу, слухач підготовчих курсів ДГТ.',
      }),
      portraitPhoto('assets/people/bogdanov.jpg', {
        title: 'Олександр Богданов',
        year: 'випуск 1981',
        author: 'архів',
        license: 'локальний архів',
        desc: 'Інженер-механік, керівник вугільної галузі, Герой України.',
      }),
      portraitPhoto('assets/people/bilobrov.jpg', {
        title: 'Юрій Білобров',
        year: 'випуск 1965',
        author: 'архів',
        license: 'локальний архів',
        desc: 'Інженер-механік, керівник машинобудівних підприємств.',
      }),
      portraitPhoto('assets/people/surgay.jpg', {
        title: 'Микола Сургай',
        year: 'випуск 1959',
        author: 'архів',
        license: 'локальний архів',
        desc: 'Інженер-гірник, керівник вугільної галузі, Герой України.',
      }),
      portraitPhoto('assets/people/kalashnykov.jpg', {
        title: 'Віктор Калашников',
        year: 'наука · енергетика',
        author: 'архів',
        license: 'локальний архів',
        desc: 'Професор, кандидат технічних наук, лауреат Державної премії України.',
      }),
      portraitPhoto('assets/people/tulub.jpg', {
        title: 'Сергій Тулуб',
        year: 'випуск 1976',
        author: 'архів',
        license: 'локальний архів',
        desc: 'Інженер-економіст гірничий, керівник профільних структур атомної енергетики.',
      }),
      portraitPhoto('assets/people/povazhnyi.jpg', {
        title: 'Станіслав Поважний',
        year: 'випуск 1961',
        author: 'архів',
        license: 'локальний архів',
        desc: 'Інженер-електромеханік, освітянин, Герой України.',
      }),
      portraitPhoto('assets/people/ryzhenkov.jpg', {
        title: 'Олександр Риженков',
        year: 'випуск 1972',
        author: 'архів',
        license: 'локальний архів',
        desc: 'Інженер-металург, керівник металургійних підприємств, Герой України.',
      }),
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   КОМПОНЕНТИ
═══════════════════════════════════════════════════════ */

/* ── Hook для адаптивності ── */
const useViewport = () => {
  const [w, setW] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  React.useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return { width: w, isMobile: w < 640, isTablet: w < 900 };
};

/* ── Таймлайн ── */
const GalleryTimeline = ({ activeEra, onEraClick, isMobile }) => (
  <div style={{ marginBottom:'1.5rem' }}>
    <span className="lbl" style={{ display:'block', marginBottom:'0.625rem' }}>
      ХРОНОЛОГІЯ · {isMobile ? 'ТАПНИ' : 'КЛІКНИ'} ДЛЯ ФІЛЬТРА
    </span>
    <div style={{
      display:'flex', gap:'3px',
      height: isMobile ? '44px' : '38px',
      borderRadius:'3px', overflow:'hidden',
    }}>
      {ERAS.map(era => (
        <div
          key={era.id}
          onClick={() => onEraClick(era.id === activeEra ? null : era.id)}
          title={era.label + ' · ' + era.period}
          style={{
            width: era.width + '%',
            background: activeEra === era.id
              ? era.color
              : activeEra ? era.color + '33' : era.color + '66',
            cursor:'pointer',
            display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center',
            padding:'0 0.4rem',
            transition:'background 0.25s',
            overflow:'hidden',
            minWidth: 0,
          }}
        >
          <span style={{
            fontFamily:'var(--mono)',
            fontSize: isMobile ? '0.42rem' : '0.48rem',
            fontWeight:700, letterSpacing:'0.08em', color:'#fff',
            textShadow:'0 1px 2px rgba(0,0,0,0.5)',
            whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
            maxWidth:'100%',
          }}>
            {era.label}
          </span>
          {!isMobile && (
            <span style={{
              fontFamily:'var(--mono)', fontSize:'0.4rem',
              color:'rgba(255,255,255,0.75)',
              whiteSpace:'nowrap',
            }}>
              {era.period}
            </span>
          )}
        </div>
      ))}
    </div>
    {/* Era detail row */}
    <div style={{ display:'flex', gap:'0.4rem', marginTop:'0.5rem', flexWrap:'wrap' }}>
      {ERAS.map(era => (
        <button
          key={era.id}
          onClick={() => onEraClick(era.id === activeEra ? null : era.id)}
          style={{
            fontFamily:'var(--mono)', fontSize:'0.45rem', letterSpacing:'0.07em',
            background: activeEra === era.id ? era.color + '22' : 'none',
            border:'1px solid ' + (activeEra === era.id ? era.color : 'var(--b2)'),
            color: activeEra === era.id ? era.color : 'var(--t3)',
            padding:'0.25rem 0.5rem', borderRadius:'2px', cursor:'pointer',
            transition:'all 0.15s',
          }}
        >
          {activeEra === era.id ? '✕ ' : ''}{era.period} · {era.desc}
        </button>
      ))}
    </div>
  </div>
);

/* ── Anchor nav — горизонтальний скрол на мобілі ── */
const GalleryAnchors = ({ sections, activeId }) => {
  const scrollTo = (id) => {
    const el = document.getElementById('gsec-' + id);
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
  };
  return (
    <div style={{
      display:'flex', gap:'0.4rem',
      padding:'0.75rem 0',
      marginBottom:'1.5rem',
      borderBottom:'1px solid var(--b1)',
      position:'sticky', top:0, zIndex:20,
      background:'var(--bg)',
      backdropFilter:'blur(8px)',
      WebkitBackdropFilter:'blur(8px)',
      overflowX:'auto', overflowY:'hidden',
      scrollbarWidth:'thin',
    }}>
      {sections.map(s => {
        const era = ERAS.find(e => e.id === s.era);
        const active = activeId === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            style={{
              fontFamily:'var(--mono)', fontSize:'0.5rem', letterSpacing:'0.07em',
              background: active ? (era ? era.color + '22' : 'rgba(196,132,58,0.12)') : 'none',
              border:'1px solid ' + (active ? (era ? era.color : 'var(--amber)') : 'var(--b2)'),
              color: active ? (era ? era.color : 'var(--amber)') : 'var(--t3)',
              padding:'0.3rem 0.65rem', borderRadius:'2px', cursor:'pointer',
              transition:'all 0.2s',
              display:'flex', alignItems:'center', gap:'0.3rem',
              flexShrink:0,
              whiteSpace:'nowrap',
            }}
          >
            <span style={{ opacity:0.5 }}>#</span>{s.id}
          </button>
        );
      })}
    </div>
  );
};

/* ── Lightbox ── */
const GalleryLightbox = ({ photo, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hasPrev, hasNext]);

  if (!photo) return null;
  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, zIndex:9999,
      background:'rgba(0,0,0,0.95)',
      display:'flex', alignItems:'center', justifyContent:'center',
      flexDirection:'column', gap:'1rem',
      padding:'1rem',
    }}>
      {hasPrev && (
        <button onClick={e => { e.stopPropagation(); onPrev(); }} style={{
          position:'absolute', left:'0.5rem', top:'50%', transform:'translateY(-50%)',
          background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)',
          color:'var(--t1)', fontSize:'1.5rem', width:'2.5rem', height:'2.5rem',
          cursor:'pointer', borderRadius:'2px',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>&#8249;</button>
      )}
      {hasNext && (
        <button onClick={e => { e.stopPropagation(); onNext(); }} style={{
          position:'absolute', right:'0.5rem', top:'50%', transform:'translateY(-50%)',
          background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)',
          color:'var(--t1)', fontSize:'1.5rem', width:'2.5rem', height:'2.5rem',
          cursor:'pointer', borderRadius:'2px',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>&#8250;</button>
      )}
      <button onClick={e => { e.stopPropagation(); onClose(); }} style={{
        position:'absolute', top:'0.75rem', right:'0.75rem',
        background:'rgba(0,0,0,0.6)', border:'1px solid rgba(255,255,255,0.2)',
        color:'var(--t2)', fontSize:'0.875rem', width:'2rem', height:'2rem',
        cursor:'pointer', borderRadius:'2px',
        display:'flex', alignItems:'center', justifyContent:'center',
        zIndex:1,
      }}>&#10005;</button>

      <img
        src={photo.src}
        alt={photo.title}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth:'92vw', maxHeight:'70vh',
          objectFit:'contain', display:'block',
          border:'1px solid rgba(255,255,255,0.08)',
        }}
        onError={e => {
          if (e.target.src !== photo.thumb && photo.thumb) e.target.src = photo.thumb;
        }}
      />
      <div onClick={e => e.stopPropagation()} style={{
        maxWidth:'680px', textAlign:'center',
        display:'flex', flexDirection:'column', gap:'0.4rem',
        padding:'0 1rem',
      }}>
        <div style={{ fontFamily:'var(--serif)', fontSize:'1rem', color:'var(--t1)' }}>
          {photo.title}
        </div>
        <div style={{ fontFamily:'var(--mono)', fontSize:'0.5rem', letterSpacing:'0.08em', color:'var(--t3)' }}>
          {photo.year} &middot; {photo.author} &middot; {photo.license}
        </div>
        <div style={{ fontFamily:'var(--ui)', fontSize:'0.75rem', color:'var(--t2)', lineHeight:1.55 }}>
          {photo.desc}
        </div>
      </div>
    </div>
  );
};

/* ── Photo card ── */
const GalleryCard = ({ photo, onClick, span }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error,  setError]  = React.useState(false);
  const [retry,  setRetry]  = React.useState(0);

  /* при error — спробувати ще раз з оригіналом */
  const imgSrc = error && retry === 0 && photo.src ? photo.src : photo.thumb;

  return (
    <div
      onClick={() => onClick(photo)}
      style={{
        cursor:'pointer', position:'relative', overflow:'hidden',
        background:'var(--s1)', borderRadius:'2px',
        border:'1px solid var(--b1)',
        gridColumn: span > 1 ? `span ${span}` : 'auto',
        aspectRatio: span > 1 ? '21/9' : (photo.portrait ? '3/4' : '4/3'),
        transition:'border-color 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--amber)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--b1)'; }}
    >
      {!loaded && (
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(90deg, var(--s1) 0%, var(--s2) 50%, var(--s1) 100%)',
          backgroundSize:'200% 100%',
          animation:'shimmer 1.4s ease infinite',
        }} />
      )}
      <img
        key={retry + (error ? '_err' : '')}
        src={imgSrc}
        alt={photo.title}
        loading="lazy"
        decoding="async"
        onLoad={() => { setLoaded(true); setError(false); }}
        onError={() => {
          if (retry === 0 && photo.src && photo.src !== photo.thumb) {
            setRetry(1); setError(true);
          } else {
            setError(true); setLoaded(true);
          }
        }}
        style={{
          width:'100%', height:'100%',
          objectFit: photo.fit || 'cover',
          objectPosition: photo.objectPosition || 'center center',
          display:'block',
          opacity: loaded && !error ? 1 : 0,
          transition:'opacity 0.5s ease',
        }}
      />
      {error && loaded && (
        <div style={{
          position:'absolute', inset:0,
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          gap:'0.5rem', padding:'1rem', textAlign:'center',
        }}>
          <span style={{ fontSize:'1.5rem', opacity:0.2 }}>&#9633;</span>
          <span style={{ fontFamily:'var(--mono)', fontSize:'0.45rem', color:'var(--t3)', letterSpacing:'0.06em' }}>
            ФОТО НЕДОСТУПНЕ
          </span>
          <span style={{ fontFamily:'var(--serif)', fontSize:'0.65rem', color:'var(--t2)', lineHeight:1.4 }}>
            {photo.title}
          </span>
        </div>
      )}
      {!error && (
        <>
          <div style={{
            position:'absolute', bottom:0, left:0, right:0,
            background:'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
            padding:'1.25rem 0.75rem 0.55rem',
            opacity: loaded ? 1 : 0,
            transition:'opacity 0.4s',
            pointerEvents:'none',
          }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:'0.8rem', color:'#fff', lineHeight:1.3 }}>
              {photo.title}
            </div>
            <div style={{
              fontFamily:'var(--mono)', fontSize:'0.42rem',
              color:'rgba(255,255,255,0.55)', letterSpacing:'0.07em',
              marginTop:'0.2rem',
            }}>
              {photo.year} &middot; {photo.author}
            </div>
          </div>
          <div style={{
            position:'absolute', top:'0.4rem', right:'0.4rem',
            background:'rgba(0,0,0,0.55)', padding:'0.18rem 0.4rem',
            fontFamily:'var(--mono)', fontSize:'0.4rem',
            color:'rgba(255,255,255,0.65)',
            letterSpacing:'0.06em', borderRadius:'2px',
            opacity: loaded ? 0.85 : 0,
            transition:'opacity 0.4s',
            pointerEvents:'none',
          }}>
            ⊕
          </div>
        </>
      )}
    </div>
  );
};

/* ── Era badge ── */
const EraBadge = ({ eraId }) => {
  const era = ERAS.find(e => e.id === eraId);
  if (!era) return null;
  return (
    <span style={{
      fontFamily:'var(--mono)', fontSize:'0.45rem', letterSpacing:'0.1em',
      color: era.color, background: era.color + '18',
      border:'1px solid ' + era.color + '44',
      padding:'0.18rem 0.5rem', borderRadius:'2px',
      whiteSpace:'nowrap',
    }}>
      {era.label} · {era.period}
    </span>
  );
};

/* ═══ Main Gallery Page ═══ */
const GalleryPage = ({ onNavigate }) => {
  const { width, isMobile, isTablet } = useViewport();
  const [lightbox,      setLightbox]      = React.useState(null);
  const [activeSection, setActiveSection] = React.useState(null);
  const [activeEra,     setActiveEra]     = React.useState(null);

  const visibleSections = activeEra
    ? GALLERY_SECTIONS.filter(s => s.era === activeEra)
    : GALLERY_SECTIONS;

  const allPhotos = visibleSections.flatMap(s => s.photos);

  const openPhoto = (photo) => {
    const idx = allPhotos.findIndex(p => p.src === photo.src);
    setLightbox({ photo, idx });
  };
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = () => {
    if (!lightbox || lightbox.idx <= 0) return;
    const idx = lightbox.idx - 1;
    setLightbox({ photo: allPhotos[idx], idx });
  };
  const nextPhoto = () => {
    if (!lightbox || lightbox.idx >= allPhotos.length - 1) return;
    const idx = lightbox.idx + 1;
    setLightbox({ photo: allPhotos[idx], idx });
  };

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id.replace('gsec-', ''));
        });
      },
      { threshold: 0.15, rootMargin:'-100px 0px -50% 0px' }
    );
    GALLERY_SECTIONS.forEach(s => {
      const el = document.getElementById('gsec-' + s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [visibleSections.length]);

  const totalPhotos = GALLERY_SECTIONS.reduce((n, s) => n + s.photos.length, 0);

  /* Адаптивна сітка: на мобілі 1 колонка, планшет 2, десктоп auto-fill */
  const gridCols = isMobile ? 1 : isTablet ? 2 : 0;
  const gridTemplate = gridCols
    ? `repeat(${gridCols}, 1fr)`
    : 'repeat(auto-fill, minmax(260px, 1fr))';

  return (
    <div className="page" style={{ paddingLeft: isMobile ? '0.75rem' : undefined, paddingRight: isMobile ? '0.75rem' : undefined }}>
      {/* Header */}
      <div style={{ marginBottom:'1.5rem' }}>
        <span className="lbl">ФОТОГАЛЕРЕЯ · ЛОКАЛЬНИЙ АРХІВ · 2026</span>
        <h2 className="serif" style={{
          fontSize: isMobile ? '1.4rem' : '1.75rem',
          fontWeight:400, marginTop:'0.5rem', lineHeight:1.2,
        }}>
          ДонНТУ у фотографіях
        </h2>
        <div style={{
          display:'flex', gap: isMobile ? '0.75rem' : '1.5rem',
          marginTop:'0.75rem', flexWrap:'wrap',
        }}>
          <Stat v={String(totalPhotos)} label="фото" />
          <Stat v={String(GALLERY_SECTIONS.length)} label="розділів" />
          <Stat v="3" label="ери" />
          {!isMobile && <Stat v="2026" label="свіжий розділ" />}
        </div>
        <p className="body" style={{ marginTop: '0.75rem', maxWidth: '52ch', color: 'var(--t2)' }}>
          Корпуси ДонНТУ, Покровськ, цифровий портал 2026 року та портретний архів
          випускників тепер відкриваються з локальних файлів сайту. Клікніть на фото
          для перегляду у повному розмірі та опису.
        </p>
      </div>

      {/* Timeline filter */}
      <GalleryTimeline activeEra={activeEra} onEraClick={setActiveEra} isMobile={isMobile} />

      {/* Anchor nav */}
      <GalleryAnchors sections={visibleSections} activeId={activeSection} />

      {/* Sections */}
      {visibleSections.map(section => (
        <div
          key={section.id}
          id={'gsec-' + section.id}
          style={{ marginBottom:'2.5rem', scrollMarginTop:'4rem' }}
        >
          <div style={{ marginBottom:'0.9rem' }}>
            <div style={{
              display:'flex', alignItems:'center', gap:'0.5rem',
              flexWrap:'wrap', marginBottom:'0.35rem',
            }}>
              <EraBadge eraId={section.era} />
              <span className="lbl" style={{ color:'var(--t3)' }}>
                {section.photos.length} фото
              </span>
              <span style={{
                fontFamily:'var(--mono)', fontSize:'0.42rem',
                color:'var(--t4)', letterSpacing:'0.08em', opacity:0.6,
              }}>
                #{section.id}
              </span>
            </div>
            <h3 style={{
              fontFamily:'var(--serif)',
              fontSize: isMobile ? '1.05rem' : '1.25rem',
              fontWeight:400, color:'var(--t1)',
              margin:'0 0 0.25rem', lineHeight:1.25,
            }}>
              {section.title}
            </h3>
            <p style={{
              fontFamily:'var(--ui)', fontSize:'0.72rem',
              color:'var(--t3)', margin:0, lineHeight:1.45,
            }}>
              {section.sub}
            </p>
          </div>

          <div style={{
            display:'grid',
            gridTemplateColumns: gridTemplate,
            gap:'0.75rem',
          }}>
            {section.photos.map((photo, i) => (
              <GalleryCard
                key={i}
                photo={photo}
                onClick={openPhoto}
                span={isMobile ? 1 : (photo.wide ? 2 : 1)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Attribution footer */}
      <div style={{
        marginTop:'2rem', padding:'1rem',
        border:'1px solid var(--b1)', borderRadius:'2px',
        background:'var(--s1)',
      }}>
        <span className="lbl" style={{ color: 'var(--t3)' }}>АТРИБУЦІЯ · ЛОКАЛЬНИЙ ФОТОАРХІВ</span>
        <p style={{ fontFamily: 'var(--ui)', fontSize: '0.6875rem', color: 'var(--t3)', margin: '0.5rem 0 0', lineHeight: 1.6 }}>
          Матеріали збережені у локальних папках <code>assets</code> та <code>uploads</code>,
          тому галерея не залежить від Wikimedia thumbnail-сервера і не показує порожні
          картки при мережевих збоях. Частина портретів і корпусних фото походить з відкритих
          архівних джерел, частина — з матеріалів порталу ДонНТУ 2026 року.
        </p>
      </div>

      {lightbox && (
        <GalleryLightbox
          photo={lightbox.photo}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          hasPrev={lightbox.idx > 0}
          hasNext={lightbox.idx < allPhotos.length - 1}
        />
      )}
    </div>
  );
};

window.GalleryPage = GalleryPage;
