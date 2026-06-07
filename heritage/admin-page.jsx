/* Admin Panel v4 — Image Manager · Toast · Colors · Auto-save */

const ADMIN_PIN_KEY = 'donntu_admin_pin';
const ADMIN_PIN_DEFAULT = 'DonNTU2026';
const STORE_KEY   = 'donntu_admin_settings';
const CONTENT_KEY = 'donntu_content';
const COLORS_KEY  = 'donntu_colors';
const SESSION_KEY = 'donntu_admin_unlocked';
const LOG_KEY     = 'donntu_admin_log';
const VISITS_KEY  = 'donntu_visits';
const RECENT_IMG_KEY = 'donntu_recent_imgs';
const DRAFT_KEY   = 'donntu_content_draft';

/* ── Storage helpers ──────────────────────────────────────────── */
const gs = (k,fb) => { try{const r=localStorage.getItem(k);return r?JSON.parse(r):fb;}catch{return fb;} };
const ss = (k,v)  => { try{localStorage.setItem(k,JSON.stringify(v));}catch{} };

const getSettings   = () => ({...defaultSettings, ...gs(STORE_KEY,{})});
const saveSettings  = s  => ss(STORE_KEY,s);
const getContent    = () => gs(CONTENT_KEY,{});
const saveContent   = c  => { ss(CONTENT_KEY,c); window.dispatchEvent(new CustomEvent('donntu-content-updated')); };
const getColors     = () => gs(COLORS_KEY, DEFAULT_COLORS);
const saveColors    = c  => { ss(COLORS_KEY,c); applyColors(c); };
const getRecentImgs = () => gs(RECENT_IMG_KEY,[]);
const addRecentImg  = url => {
  if (!url || url.startsWith('data:')) return; // don't store base64 in recent (too large)
  const r = getRecentImgs().filter(u=>u!==url).slice(0,11);
  ss(RECENT_IMG_KEY,[url,...r]);
};
const addLog = msg => { const l=gs(LOG_KEY,[]); l.unshift({msg,ts:Date.now()}); ss(LOG_KEY,l.slice(0,60)); };
const getLog = () => gs(LOG_KEY,[]);
const getCerts = () => Object.keys(localStorage).filter(k=>k.startsWith('donntu_cert_')).map(k=>{try{return{id:k.replace('donntu_cert_',''),...JSON.parse(localStorage.getItem(k))};}catch{return null;}}).filter(Boolean).sort((a,b)=>(b.issuedAt||0)-(a.issuedAt||0));

const applyColors = c => Object.entries(c).forEach(([k,v])=>document.documentElement.style.setProperty(k,v));

const defaultSettings = { disabledPages:[], maintenanceMode:false, announcementEnabled:false, announcementText:'', announcementType:'info', showAdminBadge:true, buildVersion:'V · 2026.05' };

const DEFAULT_COLORS = { '--ac':'#E07830', '--wuf-blue':'#005ab8', '--wuf-pink':'#f48ba2', '--wuf-teal':'#c0e5e7' };

/* ── Curated image gallery ────────────────────────────────────── */
const GALLERY = {
  people: { label:'👤 Люди / Портрети', imgs:[
    'photo-1507003211169-0a1dd7228f2d','photo-1500648767791-00dcc994a43e',
    'photo-1494790108377-be9c29b29330','photo-1472099645785-5658abf4ff4e',
    'photo-1438761681033-6461ffad8d80','photo-1560250097-0b93528c311a',
    'photo-1573497019940-1c28c88b4f3e','photo-1580489944761-15a19d654956',
    'photo-1535713875002-d1d0cf377fde','photo-1519085360753-af0119f7cbe7',
  ]},
  architecture: { label:'🏛 Місто / Архітектура', imgs:[
    'photo-1574629810360-7efbbe195018','photo-1486325212027-8081e485255e',
    'photo-1519677100203-a0e668c92439','photo-1552832230-c0197dd311b5',
    'photo-1499856871958-5b9627545d1a','photo-1513635269975-59663e0ac1ad',
    'photo-1541332449-f2c1a52e3af3','photo-1587474260584-136574297316',
    'photo-1577960635-6e3f26c65584','photo-1559028012-481c04fa702d',
  ]},
  nature: { label:'🏔 Природа / Карпати', imgs:[
    'photo-1506905925346-21bda4d32df4','photo-1516557070622-c1e4d68f0a37',
    'photo-1441974231531-c6227db76b6e','photo-1472214103451-9374bd1c798e',
    'photo-1501854140801-50d01698950b','photo-1464822759023-fed622ff2c3b',
    'photo-1500534314209-a25ddb2bd429','photo-1433086966358-54859d0ed716',
    'photo-1447752875215-b2761acb3c5d','photo-1418065460487-3e41a6c84dc5',
  ]},
  tech: { label:'⚙️ Технології', imgs:[
    'photo-1485827404703-89b55fcc595e','photo-1461749280684-dccba630e2f6',
    'photo-1518770660439-4636190af475','photo-1517077304055-6e89abbf09b0',
    'photo-1550751827-4bd374c3f58b','photo-1488590528505-98d2b5aba04b',
    'photo-1516321318423-f06f85e504b3','photo-1530819568329-97653eafbbfa',
    'photo-1563206767-5b18f218e8de','photo-1581092918056-0c4c3acd3789',
  ]},
  education: { label:'📚 Освіта / Бібліотека', imgs:[
    'photo-1503676260728-1c00da094a0b','photo-1524178232363-1fb2b075b655',
    'photo-1523050854058-8df90110c9f1','photo-1481627834876-b7833e8f5570',
    'photo-1521587760476-6c12a4b040da','photo-1427504494785-3a9ca7044f45',
    'photo-1509062522246-3755977927d7','photo-1456513080510-7bf3a84b82f8',
    'photo-1580582932707-520aed937b7b','photo-1519389950473-47ba0277781c',
  ]},
  events: { label:'🎤 Події / Конференції', imgs:[
    'photo-1540575467063-178a50c2df87','photo-1475721027785-f74eccf877e2',
    'photo-1511578314322-379afb476865','photo-1524368535928-5b5e00ddc76b',
    'photo-1537204696486-967f1b7198c8','photo-1522158637959-30385a09e0da',
    'photo-1501281668745-f7f57925c3b4','photo-1491438590914-bc09fcaaf77a',
    'photo-1560523159-4a9692d222ef','photo-1573164713714-d95e436ab8d6',
  ]},
};
const ugImg = (id,w=300,h=200) => `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&q=75`;

/* ── Toast system ─────────────────────────────────────────────── */
const ToastCtx = React.createContext(null);
const useToast = () => React.useContext(ToastCtx);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);
  const add = (msg, type='success') => {
    const id = Date.now();
    setToasts(t => [...t, {id,msg,type}]);
    setTimeout(() => setToasts(t => t.filter(x=>x.id!==id)), 3500);
  };
  const ctx = { success: m=>add(m,'success'), error: m=>add(m,'error'), info: m=>add(m,'info') };
  const colors = { success:'#1a4e1a', error:'#6b1a1a', info:'#1a2e5e' };
  const icons  = { success:'✓', error:'✕', info:'ℹ' };
  return (
    <ToastCtx.Provider value={ctx}>
      {children}
      <div style={{position:'fixed',bottom:24,right:24,zIndex:9999,display:'flex',flexDirection:'column',gap:8,pointerEvents:'none'}}>
        {toasts.map(t=>(
          <div key={t.id} style={{
            background:colors[t.type],color:'#fff',
            padding:'0.75rem 1.25rem',borderRadius:6,
            fontSize:'0.875rem',fontWeight:500,
            display:'flex',alignItems:'center',gap:'0.625rem',
            boxShadow:'0 4px 16px rgba(0,0,0,0.25)',
            animation:'slideInRight 0.2s ease',
            minWidth:220,
          }}>
            <span style={{fontSize:'1rem',fontWeight:700}}>{icons[t.type]}</span>
            {t.msg}
          </div>
        ))}
      </div>
      <style>{`@keyframes slideInRight{from{transform:translateX(100%);opacity:0}to{transform:none;opacity:1}}`}</style>
    </ToastCtx.Provider>
  );
};

/* ── Confirm modal ────────────────────────────────────────────── */
const useConfirm = () => {
  const [state, setState] = React.useState(null);
  const confirm = (msg) => new Promise(resolve => {
    setState({ msg, resolve });
  });
  const ConfirmUI = state ? (
    <div style={{position:'fixed',inset:0,zIndex:9000,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'var(--bg)',border:'1px solid var(--b1)',borderRadius:8,padding:'1.5rem',width:340,textAlign:'center',boxShadow:'0 8px 32px rgba(0,0,0,0.2)'}}>
        <div style={{fontSize:'0.9375rem',color:'var(--t1)',marginBottom:'1.25rem',lineHeight:1.5}}>{state.msg}</div>
        <div style={{display:'flex',gap:'0.5rem',justifyContent:'center'}}>
          <button onClick={()=>{state.resolve(false);setState(null);}} style={{padding:'0.5rem 1.25rem',borderRadius:4,border:'1px solid var(--b2)',background:'var(--s1)',color:'var(--t2)',cursor:'pointer',fontSize:'0.875rem'}}>Скасувати</button>
          <button onClick={()=>{state.resolve(true);setState(null);}} style={{padding:'0.5rem 1.25rem',borderRadius:4,border:'none',background:'var(--rust,#c45039)',color:'#fff',cursor:'pointer',fontSize:'0.875rem',fontWeight:600}}>Підтвердити</button>
        </div>
      </div>
    </div>
  ) : null;
  return { confirm, ConfirmUI };
};

/* ── Image Manager Modal ──────────────────────────────────────── */
const ImagePicker = ({ label, value, onChange }) => {
  const [open, setOpen]       = React.useState(false);
  const [iTab, setITab]       = React.useState('url');
  const [urlDraft, setUrlDraft] = React.useState(value||'');
  const [cat, setCat]         = React.useState('people');
  const [selected, setSelected] = React.useState(value||'');
  const [dragOver, setDragOver] = React.useState(false);
  const toast = useToast();
  const fileRef = React.useRef();

  React.useEffect(() => { setUrlDraft(value||''); setSelected(value||''); }, [value]);

  const apply = () => {
    if (selected) { addRecentImg(selected); onChange(selected); }
    setOpen(false);
  };

  const handleFile = e => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 4*1024*1024) { toast.error('Файл занадто великий (макс. 4 МБ)'); return; }
    const r = new FileReader();
    r.onload = ev => { setSelected(ev.target.result); setITab('url'); toast.success('Файл завантажено — натисніть «Застосувати»'); };
    r.readAsDataURL(f);
  };

  const handleDrop = e => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) handleFile({target:{files:[f]}});
  };

  const recent = getRecentImgs();
  const galImgs = (GALLERY[cat]?.imgs||[]).map(id=>ugImg(id));

  const TabBtn = ({id,label:lb}) => (
    <button onClick={()=>setITab(id)} style={{
      padding:'0.5rem 0.875rem',border:'none',cursor:'pointer',fontSize:'0.8125rem',
      borderBottom: iTab===id?'2px solid var(--ac)':'2px solid transparent',
      background:'transparent',color:iTab===id?'var(--ac)':'var(--t2)',fontWeight:iTab===id?600:400,
    }}>{lb}</button>
  );

  const ImgThumb = ({src,active,onClick}) => (
    <div onClick={()=>{setSelected(src);}} style={{
      aspectRatio:'3/2',overflow:'hidden',borderRadius:4,cursor:'pointer',position:'relative',
      border: active?'2px solid var(--ac)':'2px solid transparent',
      outline: active?'2px solid rgba(224,120,48,0.3)':'none',
    }}>
      <img src={src} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} loading="lazy"/>
      {active && <div style={{position:'absolute',inset:0,background:'rgba(224,120,48,0.15)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <span style={{fontSize:'1.5rem',color:'#fff',textShadow:'0 1px 4px rgba(0,0,0,0.5)'}}>✓</span>
      </div>}
    </div>
  );

  return (
    <>
      {/* Inline preview + trigger */}
      <div style={{marginBottom:'0.75rem'}}>
        {label && <div style={{fontSize:'0.6875rem',fontWeight:600,letterSpacing:'0.06em',color:'var(--t3)',textTransform:'uppercase',marginBottom:'0.375rem'}}>{label}</div>}
        <div style={{display:'flex',gap:'0.625rem',alignItems:'center',padding:'0.5rem',background:'var(--s1)',border:'1px solid var(--b1)',borderRadius:4}}>
          <div style={{width:96,height:64,borderRadius:3,overflow:'hidden',flexShrink:0,background:'var(--s2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            {value
              ? <img src={value} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} onError={e=>e.target.style.display='none'}/>
              : <span style={{fontSize:'1.25rem'}}>🖼</span>
            }
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:'0.75rem',color:'var(--t3)',marginBottom:'0.25rem',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontFamily:'var(--mono)'}}>
              {value ? value.slice(0,50)+(value.length>50?'…':'') : 'Зображення не вибрано'}
            </div>
            <div style={{display:'flex',gap:'0.375rem'}}>
              <button onClick={()=>setOpen(true)} style={{fontSize:'0.75rem',padding:'0.3rem 0.625rem',borderRadius:3,border:'1px solid var(--b2)',background:'var(--bg)',cursor:'pointer',color:'var(--t1)',fontWeight:500}}>
                📷 Вибрати
              </button>
              {value && <button onClick={()=>onChange('')} style={{fontSize:'0.75rem',padding:'0.3rem 0.5rem',borderRadius:3,border:'1px solid var(--b2)',background:'var(--bg)',cursor:'pointer',color:'var(--t3)'}}>✕</button>}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div style={{position:'fixed',inset:0,zIndex:8000,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}} onClick={e=>{if(e.target===e.currentTarget)setOpen(false);}}>
          <div style={{background:'var(--bg)',borderRadius:10,width:'100%',maxWidth:680,maxHeight:'90vh',display:'flex',flexDirection:'column',boxShadow:'0 12px 48px rgba(0,0,0,0.35)',overflow:'hidden'}}>
            {/* Header */}
            <div style={{padding:'1rem 1.25rem',borderBottom:'1px solid var(--b1)',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
              <div style={{fontSize:'1rem',fontWeight:700,color:'var(--t1)',fontFamily:'var(--display)'}}>📷 Менеджер зображень</div>
              <button onClick={()=>setOpen(false)} style={{fontSize:'1.25rem',color:'var(--t3)',background:'none',border:'none',cursor:'pointer',lineHeight:1}}>×</button>
            </div>

            {/* Tabs */}
            <div style={{display:'flex',borderBottom:'1px solid var(--b1)',padding:'0 0.5rem',flexShrink:0}}>
              <TabBtn id="url"    label="🔗 URL"/>
              <TabBtn id="upload" label="⬆ Завантажити"/>
              <TabBtn id="gallery"label="🖼 Галерея"/>
              {recent.length>0 && <TabBtn id="recent" label={`🕐 Нещодавні (${recent.length})`}/>}
            </div>

            {/* Content */}
            <div style={{flex:1,overflowY:'auto',padding:'1.25rem'}}>

              {iTab==='url' && (
                <div>
                  <div style={{fontSize:'0.8125rem',color:'var(--t2)',marginBottom:'0.75rem'}}>Вставте пряме посилання на зображення (Unsplash, CDN тощо)</div>
                  <input
                    value={urlDraft}
                    onChange={e=>{setUrlDraft(e.target.value);setSelected(e.target.value);}}
                    placeholder="https://images.unsplash.com/photo-..."
                    style={{width:'100%',padding:'0.625rem 0.75rem',border:'1px solid var(--b1)',borderRadius:4,background:'var(--s1)',color:'var(--t1)',fontSize:'0.875rem',fontFamily:'var(--mono)',boxSizing:'border-box',outline:'none'}}
                  />
                  {selected && (
                    <div style={{marginTop:'1rem',borderRadius:6,overflow:'hidden',maxHeight:280,border:'1px solid var(--b1)'}}>
                      <img src={selected} alt="" style={{width:'100%',objectFit:'cover',display:'block'}} onError={e=>{e.target.parentElement.innerHTML='<div style="padding:1rem;color:var(--t3);font-size:0.8125rem">⚠ Зображення не вдалося завантажити</div>';}}/>
                    </div>
                  )}
                </div>
              )}

              {iTab==='upload' && (
                <div>
                  <div
                    onDragOver={e=>{e.preventDefault();setDragOver(true);}}
                    onDragLeave={()=>setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={()=>fileRef.current?.click()}
                    style={{
                      border:`2px dashed ${dragOver?'var(--ac)':'var(--b2)'}`,
                      borderRadius:8,padding:'2.5rem',textAlign:'center',cursor:'pointer',
                      background:dragOver?'rgba(224,120,48,0.05)':'var(--s1)',
                      transition:'all 0.15s',
                    }}
                  >
                    <div style={{fontSize:'2.5rem',marginBottom:'0.5rem'}}>⬆</div>
                    <div style={{fontSize:'0.9375rem',fontWeight:600,color:'var(--t1)',marginBottom:'0.25rem'}}>Перетягніть файл або клікніть</div>
                    <div style={{fontSize:'0.8125rem',color:'var(--t3)'}}>JPG, PNG, WebP · макс. 4 МБ</div>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{display:'none'}}/>
                  {selected && selected.startsWith('data:') && (
                    <div style={{marginTop:'1rem',borderRadius:6,overflow:'hidden',maxHeight:200,border:'1px solid var(--b1)'}}>
                      <img src={selected} alt="" style={{width:'100%',objectFit:'cover',display:'block'}}/>
                    </div>
                  )}
                </div>
              )}

              {iTab==='gallery' && (
                <div>
                  {/* Category selector */}
                  <div style={{display:'flex',gap:'0.375rem',flexWrap:'wrap',marginBottom:'1rem'}}>
                    {Object.entries(GALLERY).map(([id,g])=>(
                      <button key={id} onClick={()=>setCat(id)} style={{
                        padding:'0.375rem 0.75rem',borderRadius:20,border:'1px solid '+(cat===id?'var(--ac)':'var(--b2)'),
                        background:cat===id?'var(--ac)':'var(--s1)',color:cat===id?'#fff':'var(--t2)',
                        fontSize:'0.75rem',cursor:'pointer',fontWeight:cat===id?600:400,
                      }}>{g.label}</button>
                    ))}
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'0.5rem'}}>
                    {galImgs.map((src,i)=>(
                      <ImgThumb key={i} src={src} active={selected===src} onClick={()=>setSelected(src)}/>
                    ))}
                  </div>
                </div>
              )}

              {iTab==='recent' && (
                <div>
                  <div style={{fontSize:'0.8125rem',color:'var(--t2)',marginBottom:'0.75rem'}}>Нещодавно використані зображення</div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'0.5rem'}}>
                    {recent.map((src,i)=>(
                      <ImgThumb key={i} src={src} active={selected===src} onClick={()=>setSelected(src)}/>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{padding:'0.875rem 1.25rem',borderTop:'1px solid var(--b1)',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0,background:'var(--s1)'}}>
              <div style={{fontSize:'0.75rem',color:'var(--t3)',maxWidth:300,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                {selected ? '✓ '+selected.slice(0,50) : 'Нічого не вибрано'}
              </div>
              <div style={{display:'flex',gap:'0.5rem'}}>
                <button onClick={()=>setOpen(false)} style={{padding:'0.5rem 1rem',border:'1px solid var(--b2)',borderRadius:4,background:'var(--bg)',color:'var(--t2)',cursor:'pointer',fontSize:'0.875rem'}}>Скасувати</button>
                <button onClick={apply} disabled={!selected} style={{
                  padding:'0.5rem 1.25rem',border:'none',borderRadius:4,
                  background:selected?'var(--ac)':'var(--b2)',color:'#fff',cursor:selected?'pointer':'default',
                  fontSize:'0.875rem',fontWeight:600,
                }}>Застосувати</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ── UI primitives ────────────────────────────────────────────── */
const F = ({ label, value, onChange, placeholder, mono, note }) => (
  <div style={{marginBottom:'0.75rem'}}>
    {label && <div style={{fontSize:'0.6875rem',fontWeight:600,letterSpacing:'0.06em',color:'var(--t3)',textTransform:'uppercase',marginBottom:'0.25rem'}}>{label}</div>}
    <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder||''}
      style={{width:'100%',background:'var(--s1)',border:'1px solid var(--b1)',borderRadius:4,padding:'0.5rem 0.625rem',fontSize:mono?'0.75rem':'0.8125rem',fontFamily:mono?'var(--mono)':'inherit',color:'var(--t1)',boxSizing:'border-box',outline:'none'}}
    />
    {note && <div style={{fontSize:'0.6875rem',color:'var(--t3)',marginTop:'0.2rem'}}>{note}</div>}
  </div>
);

const TA = ({ label, value, onChange, rows, maxLen }) => (
  <div style={{marginBottom:'0.75rem'}}>
    {label && <div style={{fontSize:'0.6875rem',fontWeight:600,letterSpacing:'0.06em',color:'var(--t3)',textTransform:'uppercase',marginBottom:'0.25rem',display:'flex',justifyContent:'space-between'}}>
      <span>{label}</span>
      {maxLen && <span style={{fontWeight:400,letterSpacing:0}}>{value.length}/{maxLen}</span>}
    </div>}
    <textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows||4}
      style={{width:'100%',background:'var(--s1)',border:'1px solid var(--b1)',borderRadius:4,padding:'0.5rem 0.625rem',fontSize:'0.8125rem',color:'var(--t1)',boxSizing:'border-box',resize:'vertical',outline:'none',lineHeight:1.5}}
    />
  </div>
);

const Btn = ({ onClick, children, primary, danger, small, disabled }) => (
  <button onClick={onClick} disabled={disabled} style={{
    padding:small?'0.3rem 0.625rem':'0.5rem 1rem',fontSize:small?'0.75rem':'0.8125rem',fontWeight:500,borderRadius:4,
    border:'1px solid '+(danger?'rgba(196,80,57,0.4)':primary?'var(--ac)':'var(--b2)'),
    background:danger?'rgba(196,80,57,.08)':primary?'var(--ac)':'var(--s1)',
    color:danger?'#c45039':primary?'#fff':'var(--t1)',cursor:disabled?'default':'pointer',
    whiteSpace:'nowrap',flexShrink:0,opacity:disabled?0.5:1,
  }}>{children}</button>
);

const Tog = ({ on, onChange, label }) => (
  <label style={{display:'flex',alignItems:'center',gap:'0.5rem',cursor:'pointer',userSelect:'none',marginBottom:'0.5rem'}}>
    <div onClick={()=>onChange(!on)} style={{width:36,height:20,borderRadius:10,position:'relative',flexShrink:0,background:on?'var(--ac)':'var(--b2)',transition:'background 0.2s'}}>
      <div style={{position:'absolute',top:2,left:on?16:2,width:16,height:16,borderRadius:'50%',background:'#fff',transition:'left 0.2s'}}/>
    </div>
    <span style={{fontSize:'0.8125rem',color:'var(--t2)'}}>{label}</span>
  </label>
);

const Divider = ({ title }) => (
  <div style={{display:'flex',alignItems:'center',gap:'0.75rem',margin:'1.25rem 0 0.875rem'}}>
    <div style={{fontSize:'0.6875rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--t3)',whiteSpace:'nowrap'}}>{title}</div>
    <div style={{flex:1,height:1,background:'var(--b1)'}}/>
  </div>
);

const Panel = ({ title, badge, open, onToggle, children }) => (
  <div style={{border:'1px solid var(--b1)',borderRadius:6,marginBottom:'0.625rem',overflow:'hidden'}}>
    <button onClick={onToggle} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.875rem 1rem',background:open?'var(--bg)':'var(--s1)',border:'none',cursor:'pointer',textAlign:'left'}}>
      <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
        <span style={{fontSize:'0.875rem',fontWeight:600,color:'var(--t1)'}}>{title}</span>
        {badge&&<span style={{fontSize:'0.6875rem',background:'var(--s2)',color:'var(--t3)',borderRadius:10,padding:'0.1rem 0.5rem',border:'1px solid var(--b1)'}}>{badge}</span>}
      </div>
      <span style={{fontSize:'0.75rem',color:'var(--t3)',transform:open?'rotate(180deg)':'none',transition:'transform 0.15s'}}>▾</span>
    </button>
    {open&&<div style={{padding:'1.125rem',background:'var(--bg)',borderTop:'1px solid var(--b1)'}}>{children}</div>}
  </div>
);

/* ── Array editor ─────────────────────────────────────────────── */
const ArrayEditor = ({ items, onChange, renderItem, newItem, maxItems }) => {
  const move   = (i,d) => { const a=[...items],j=i+d; if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];onChange(a); };
  const remove = (i)   => onChange(items.filter((_,idx)=>idx!==i));
  const dup    = (i)   => { if(!maxItems||items.length<maxItems) onChange([...items.slice(0,i+1),{...items[i]},...items.slice(i+1)]); };
  const add    = ()    => { if(!maxItems||items.length<maxItems) onChange([...items,{...newItem}]); };
  const update = (i,p) => onChange(items.map((x,idx)=>idx===i?{...x,...p}:x));
  return (
    <div>
      {items.map((item,i)=>(
        <div key={i} style={{border:'1px solid var(--b1)',borderRadius:4,padding:'0.75rem',marginBottom:'0.5rem',background:'var(--s1)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.625rem'}}>
            <span style={{fontSize:'0.6875rem',color:'var(--t3)',fontWeight:700,letterSpacing:'0.06em'}}>#{i+1}</span>
            <div style={{display:'flex',gap:'0.25rem'}}>
              <Btn small onClick={()=>move(i,-1)} disabled={i===0}>↑</Btn>
              <Btn small onClick={()=>move(i,+1)} disabled={i===items.length-1}>↓</Btn>
              <Btn small onClick={()=>dup(i)}>⧉</Btn>
              <Btn small danger onClick={()=>remove(i)}>✕</Btn>
            </div>
          </div>
          {renderItem(item,i,p=>update(i,p))}
        </div>
      ))}
      {(!maxItems||items.length<maxItems)&&<Btn onClick={add}>+ Додати</Btn>}
    </div>
  );
};

/* ── Save banner ──────────────────────────────────────────────── */
const SaveBanner = ({ dirty, onSave, onReset }) => dirty?(
  <div style={{position:'sticky',top:0,zIndex:100,background:'#193a19',color:'#fff',padding:'0.625rem 1.25rem',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #2d5e2d',fontSize:'0.8125rem',marginBottom:'1rem',borderRadius:'0 0 4px 4px'}}>
    <span style={{display:'flex',alignItems:'center',gap:'0.5rem'}}><span style={{fontSize:'1rem'}}>⚠</span> Є незбережені зміни</span>
    <div style={{display:'flex',gap:'0.5rem'}}>
      <Btn small onClick={onReset}>Скасувати</Btn>
      <Btn small primary onClick={onSave}>💾 Зберегти та застосувати</Btn>
    </div>
  </div>
):null;

/* ── Default content ──────────────────────────────────────────── */
const DC = {
  heroDate:'1921 — наш час',heroPlace:'Дрогобич · Львівська обл. · Україна',
  heroTitle:'DONNTU',heroTheme:'Цифрова спадщина:\nсторічна історія, пам\'ять і відновлення',
  newsItems:[
    {date:'19 травня 2026',title:'Представники ДонНТУ взяли участь у роботі журі фестивалю робототехніки «Inno Tech»',img:'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&h=560&fit=crop'},
    {date:'18 травня 2026',title:'Заходи до Дня пам\'яті жертв політичних репресій та геноциду кримськотатарського народу',img:''},
    {date:'18 травня 2026',title:'ДонНТУ долучився до розроблення плану профорієнтації Авдіївської громади',img:''},
    {date:'18 травня 2026',title:'V Всеукраїнська науково-практична конференція «Наукові досягнення сучасної молоді»',img:''},
    {date:'15 травня 2026',title:'Перший з 2022 року візит представників місцевої влади Японії (м. Камока) до ДонНТУ',img:''},
  ],
  reachStats:[{n:'1921',label:'Рік заснування університету'},{n:'105',label:'Років інженерної освіти Донбасу'},{n:'40 000+',label:'Випускників за всю історію'}],
  speakers:[
    {name:'Олександр Янчуков',role:'Ректор Донецького національного технічного університету',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=240&fit=crop&q=80'},
    {name:'Олексій Ященко',role:'Проректор з наукової роботи',img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&h=240&fit=crop&q=80'},
    {name:'Валентина Ковальова',role:'Декан факультету інформаційних технологій',img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop&q=80'},
  ],
  themeHeading:'Тема порталу',themeBody:'Тема цифрового порталу — «Цифрова спадщина: сторічна історія, пам\'ять і відновлення» — об\'єднує понад 100 років інженерної освіти, науки та культури з місією зберегти ім\'я, обличчя і голос університету.',
  dialoguesHeading:'Діалоги про спадщину',dialoguesBody:'Серія публічних розмов із істориками, випускниками й учнями про те, як зберегти інженерну культуру Донбасу.',
  dialoguesImg:'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&h=600&fit=crop',dialoguesCount:'12 відеозаписів та транскриптів',
  focusAreas:[
    {n:'Розділ 1',title:'Сторічна історія: від технікуму до університету',page:'heritage'},
    {n:'Розділ 2',title:'Люди, що визначили обличчя ДонНТУ',page:'people'},
    {n:'Розділ 3',title:'Цифровий архів: документи та фотографії',page:'archive'},
    {n:'Розділ 4',title:"Війна, евакуація та незламна пам'ять",page:'war'},
    {n:'Розділ 5',title:'Голоси випускників і викладачів',page:'voices'},
    {n:'Розділ 6',title:'Інтерактивне панно «Історія ДонНТУ»',page:'panneau'},
  ],
  videos:[
    {date:'12 травня 2026',title:'ДонНТУ — 105 років: від гірничого технікуму до національного університету',img:'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop'},
    {date:'4 травня 2026',title:'Евакуація 2022: голоси викладачів і студентів ДонНТУ',img:'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=450&fit=crop'},
    {date:'18 квітня 2026',title:'Інтерактивне панно «Видатні постаті ДонНТУ» — як це працює',img:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop'},
  ],
  hostBlueHeading:'Ми вітаємо ДонНТУ\nу Дрогобичі',
  hostBlueP1:'Донецький національний технічний університет продовжує свою столітню місію в нових умовах — у Дрогобичі, Львівська область.',
  hostBlueP2:'Учасники порталу знайдуть тут унікальне поєднання цифрового архіву, живих спогадів та інтерактивних ресурсів.',
  hostPinkP1:'Дрогобич — стародавнє місто Галичини з багатою культурною спадщиною, розташоване у Львівській області, неподалік Карпат.',
  hostPinkP2:'Відмінна інфраструктура й наукова традиція роблять Дрогобич ідеальним місцем для відродження університету.',
  hostCityPhoto:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=600&fit=crop&q=80',
  hostQuoteName:'Олександр Янчуков',hostQuoteRole:'Ректор Донецького національного технічного університету',
  hostQuoteText:'Ми запрошуємо вас долучитися до нашої цифрової спадщини — зберегти ім\'я, обличчя і голос університету, який подолав евакуацію, але не зломився. Наша місія триває.',
  footerBrand:'DONNTU',footerTagline:'Донецький національний технічний університет.\nЦифрова спадщина · Пам\'ять · Відновлення.',
  footerCopyright:'© 2026 ДонНТУ · Цифрова спадщина · mail@donntu.edu.ua',
  footerAddress:'вул. Самбірська, 76 · Дрогобич · Львівська обл. · donntu.edu.ua',
};

/* ══════════════════════════════════════════════════════════════════
   CONTENT TAB
══════════════════════════════════════════════════════════════════ */
const ContentTab = () => {
  const toast   = useToast();
  const { confirm, ConfirmUI } = useConfirm();
  const [saved, setSaved] = React.useState(getContent);
  const [draft, setDraft] = React.useState(getContent);
  const [open,  setOpen]  = React.useState({hero:true}); // hero open by default

  // Ctrl+S shortcut
  React.useEffect(() => {
    const h = e => { if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();if(dirty)handleSave();} };
    window.addEventListener('keydown',h);
    return ()=>window.removeEventListener('keydown',h);
  });

  // Auto-save draft every 15s
  React.useEffect(() => {
    const t = setInterval(() => { if(dirty) ss(DRAFT_KEY,draft); }, 15000);
    return ()=>clearInterval(t);
  }, [draft]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const set   = (k,v) => setDraft(d=>({...d,[k]:v}));
  const cv    = k => draft[k]!==undefined?draft[k]:DC[k];
  const tog   = k => setOpen(o=>({...o,[k]:!o[k]}));

  const handleSave = () => {
    saveContent(draft);
    setSaved({...draft});
    localStorage.removeItem(DRAFT_KEY);
    addLog('Контент оновлено');
    toast.success('Збережено та застосовано ✓');
  };

  const handleReset = async () => {
    const ok = await confirm('Скасувати всі зміни з останнього збереження?');
    if(ok) setDraft({...saved});
  };

  const handleResetAll = async () => {
    const ok = await confirm('Скинути весь контент до початкових значень? Це незворотно.');
    if(!ok) return;
    saveContent({});
    setSaved({});
    setDraft({});
    toast.success('Контент скинуто до початкових значень');
    addLog('Контент скинуто');
  };

  return (
    <div>
      {ConfirmUI}
      <SaveBanner dirty={dirty} onSave={handleSave} onReset={handleReset}/>

      <Panel title="🏠 Герой" badge="hero" open={open.hero} onToggle={()=>tog('hero')}>
        <F label="Дата / рік" value={cv('heroDate')} onChange={v=>set('heroDate',v)}/>
        <F label="Місцезнаходження" value={cv('heroPlace')} onChange={v=>set('heroPlace',v)}/>
        <F label="Заголовок (великий)" value={cv('heroTitle')} onChange={v=>set('heroTitle',v)}/>
        <TA label="Підзаголовок (\\n = новий рядок)" value={cv('heroTheme')} onChange={v=>set('heroTheme',v)} rows={2}/>
      </Panel>

      <Panel title="📰 Новини" badge={`${cv('newsItems').length} шт.`} open={open.news} onToggle={()=>tog('news')}>
        <ArrayEditor items={cv('newsItems')} onChange={v=>set('newsItems',v)} newItem={{date:'',title:'',img:''}} renderItem={(it,i,upd)=>(
          <div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'0.5rem'}}>
              <F label="Дата" value={it.date} onChange={v=>upd({date:v})}/>
              <F label="Заголовок" value={it.title} onChange={v=>upd({title:v})}/>
            </div>
            <ImagePicker label="Фото" value={it.img||''} onChange={v=>upd({img:v})}/>
          </div>
        )}/>
      </Panel>

      <Panel title="📝 Тема порталу" open={open.theme} onToggle={()=>tog('theme')}>
        <F label="Заголовок" value={cv('themeHeading')} onChange={v=>set('themeHeading',v)}/>
        <TA label="Текст" value={cv('themeBody')} onChange={v=>set('themeBody',v)} rows={4} maxLen={400}/>
      </Panel>

      <Panel title="📊 Статистика (цифри)" badge="3 блоки" open={open.reach} onToggle={()=>tog('reach')}>
        <ArrayEditor items={cv('reachStats')} onChange={v=>set('reachStats',v)} newItem={{n:'',label:''}} maxItems={6} renderItem={(it,i,upd)=>(
          <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'0.5rem'}}>
            <F label="Число" value={it.n} onChange={v=>upd({n:v})}/>
            <F label="Підпис" value={it.label} onChange={v=>upd({label:v})}/>
          </div>
        )}/>
      </Panel>

      <Panel title="👤 Видатні постаті" badge={`${cv('speakers').length} осіб`} open={open.speakers} onToggle={()=>tog('speakers')}>
        <ArrayEditor items={cv('speakers')} onChange={v=>set('speakers',v)} newItem={{name:'',role:'',img:''}} maxItems={6} renderItem={(it,i,upd)=>(
          <div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:'0.5rem'}}>
              <F label="Ім'я" value={it.name} onChange={v=>upd({name:v})}/>
              <F label="Посада" value={it.role} onChange={v=>upd({role:v})}/>
            </div>
            <ImagePicker label="Портрет" value={it.img||''} onChange={v=>upd({img:v})}/>
          </div>
        )}/>
      </Panel>

      <Panel title="💬 Діалоги про спадщину" open={open.dialog} onToggle={()=>tog('dialog')}>
        <F label="Заголовок" value={cv('dialoguesHeading')} onChange={v=>set('dialoguesHeading',v)}/>
        <TA label="Текст" value={cv('dialoguesBody')} onChange={v=>set('dialoguesBody',v)} rows={3} maxLen={300}/>
        <F label="Підпис (кількість)" value={cv('dialoguesCount')} onChange={v=>set('dialoguesCount',v)}/>
        <ImagePicker label="Фотографія (права колонка)" value={cv('dialoguesImg')} onChange={v=>set('dialoguesImg',v)}/>
      </Panel>

      <Panel title="📚 Ключові розділи" badge="6 карток" open={open.focus} onToggle={()=>tog('focus')}>
        <ArrayEditor items={cv('focusAreas')} onChange={v=>set('focusAreas',v)} newItem={{n:'Розділ',title:'',page:'overview'}} maxItems={9} renderItem={(it,i,upd)=>(
          <div style={{display:'grid',gridTemplateColumns:'100px 1fr 120px',gap:'0.5rem'}}>
            <F label="Мітка" value={it.n} onChange={v=>upd({n:v})}/>
            <F label="Назва" value={it.title} onChange={v=>upd({title:v})}/>
            <F label="Сторінка" value={it.page} onChange={v=>upd({page:v})} mono/>
          </div>
        )}/>
      </Panel>

      <Panel title="🎥 Відеоматеріали" badge={`${cv('videos').length} відео`} open={open.videos} onToggle={()=>tog('videos')}>
        <ArrayEditor items={cv('videos')} onChange={v=>set('videos',v)} newItem={{date:'',title:'',img:''}} maxItems={6} renderItem={(it,i,upd)=>(
          <div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'0.5rem'}}>
              <F label="Дата" value={it.date} onChange={v=>upd({date:v})}/>
              <F label="Назва" value={it.title} onChange={v=>upd({title:v})}/>
            </div>
            <ImagePicker label="Прев'ю" value={it.img||''} onChange={v=>upd({img:v})}/>
          </div>
        )}/>
      </Panel>

      <Panel title="🏙 Блок Дрогобич (Місто-хост)" open={open.host} onToggle={()=>tog('host')}>
        <Divider title="Синій блок"/>
        <TA label="Заголовок (\\n = новий рядок)" value={cv('hostBlueHeading')} onChange={v=>set('hostBlueHeading',v)} rows={2}/>
        <TA label="Абзац 1" value={cv('hostBlueP1')} onChange={v=>set('hostBlueP1',v)} rows={3}/>
        <TA label="Абзац 2" value={cv('hostBlueP2')} onChange={v=>set('hostBlueP2',v)} rows={3}/>
        <Divider title="Рожевий блок"/>
        <TA label="Абзац 1" value={cv('hostPinkP1')} onChange={v=>set('hostPinkP1',v)} rows={3}/>
        <TA label="Абзац 2" value={cv('hostPinkP2')} onChange={v=>set('hostPinkP2',v)} rows={2}/>
        <Divider title="Фото міста"/>
        <ImagePicker label="Фотографія (нижній лівий блок)" value={cv('hostCityPhoto')} onChange={v=>set('hostCityPhoto',v)}/>
        <Divider title="Цитата (бірюзовий блок)"/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:'0.5rem'}}>
          <F label="Ім'я" value={cv('hostQuoteName')} onChange={v=>set('hostQuoteName',v)}/>
          <F label="Посада" value={cv('hostQuoteRole')} onChange={v=>set('hostQuoteRole',v)}/>
        </div>
        <TA label="Текст цитати" value={cv('hostQuoteText')} onChange={v=>set('hostQuoteText',v)} rows={3} maxLen={300}/>
      </Panel>

      <Panel title="🔗 Підвал (Footer)" open={open.footer} onToggle={()=>tog('footer')}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'0.5rem'}}>
          <F label="Назва бренду" value={cv('footerBrand')} onChange={v=>set('footerBrand',v)}/>
          <F label="Адреса" value={cv('footerAddress')} onChange={v=>set('footerAddress',v)}/>
        </div>
        <TA label="Опис (\\n = новий рядок)" value={cv('footerTagline')} onChange={v=>set('footerTagline',v)} rows={2}/>
        <F label="Рядок копірайту" value={cv('footerCopyright')} onChange={v=>set('footerCopyright',v)}/>
      </Panel>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'1rem',borderTop:'1px solid var(--b1)',marginTop:'0.75rem'}}>
        <div style={{display:'flex',gap:'0.5rem'}}>
          <Btn danger onClick={handleResetAll}>Скинути все</Btn>
          {!!gs(DRAFT_KEY,null) && <Btn onClick={()=>{const d=gs(DRAFT_KEY,{});setDraft(d);toast.info('Чернетку відновлено');}}>Відновити чернетку</Btn>}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
          <span style={{fontSize:'0.75rem',color:'var(--t3)'}}>Ctrl+S</span>
          <Btn primary onClick={handleSave} disabled={!dirty}>💾 Зберегти та застосувати</Btn>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   COLORS TAB
══════════════════════════════════════════════════════════════════ */
const COLOR_PRESETS = [
  { name:'WUF13 (за замовч.)', c:{'--ac':'#E07830','--wuf-blue':'#005ab8','--wuf-pink':'#f48ba2','--wuf-teal':'#c0e5e7'} },
  { name:'Синьо-золотий',       c:{'--ac':'#d4a017','--wuf-blue':'#1a3a6e','--wuf-pink':'#a8c4e0','--wuf-teal':'#d4e8f0'} },
  { name:'Зелений / Еко',       c:{'--ac':'#2d8a4e','--wuf-blue':'#1a5c2e','--wuf-pink':'#a8d8b8','--wuf-teal':'#c8e8d0'} },
  { name:'Червоний / Сильний',  c:{'--ac':'#c0392b','--wuf-blue':'#6b1a1a','--wuf-pink':'#f0a8a8','--wuf-teal':'#e8c8c8'} },
  { name:'Фіолетовий',          c:{'--ac':'#7b2d8b','--wuf-blue':'#4a1a7a','--wuf-pink':'#c4a8d8','--wuf-teal':'#dac8e8'} },
];

const COLOR_FIELDS = [
  { key:'--ac',        label:'Акцент (кнопки, посилання)', note:'WUF13 orange' },
  { key:'--wuf-blue',  label:'WUF Синій (host-city блок)',  note:'#005ab8' },
  { key:'--wuf-pink',  label:'WUF Рожевий (host-city блок)',note:'#f48ba2' },
  { key:'--wuf-teal',  label:'WUF Бірюзовий (host-city / focus)',note:'#c0e5e7' },
];

const ColorsTab = () => {
  const toast = useToast();
  const { confirm, ConfirmUI } = useConfirm();
  const [colors, setColors] = React.useState(getColors);

  const set = (k,v) => {
    const next = {...colors,[k]:v};
    setColors(next);
    applyColors(next); // live preview
  };

  const apply = preset => { setColors(preset.c); applyColors(preset.c); };
  const save  = () => { saveColors(colors); toast.success('Кольори збережено'); addLog('Кольори оновлено'); };
  const reset = async () => {
    const ok = await confirm('Скинути кольори до початкових (WUF13)?');
    if(!ok)return;
    saveColors(DEFAULT_COLORS);
    setColors(DEFAULT_COLORS);
    toast.success('Кольори скинуто');
  };

  return (
    <div>
      {ConfirmUI}
      <div style={{background:'rgba(224,120,48,0.06)',border:'1px solid rgba(224,120,48,0.2)',borderRadius:6,padding:'0.75rem 1rem',marginBottom:'1.25rem',fontSize:'0.8125rem',color:'var(--t2)'}}>
        💡 Зміни застосовуються <strong>миттєво</strong> як прев'ю. Натисніть «Зберегти» щоб зафіксувати.
      </div>

      <Divider title="Швидкі пресети"/>
      <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginBottom:'1.5rem'}}>
        {COLOR_PRESETS.map(p=>(
          <button key={p.name} onClick={()=>apply(p)} style={{
            padding:'0.5rem 0.875rem',borderRadius:4,border:'1px solid var(--b2)',
            background:'var(--s1)',color:'var(--t1)',cursor:'pointer',fontSize:'0.8125rem',
            display:'flex',alignItems:'center',gap:'0.5rem',
          }}>
            <span style={{display:'inline-flex',gap:2}}>
              {Object.values(p.c).slice(0,3).map((c,i)=>(
                <span key={i} style={{width:12,height:12,borderRadius:'50%',background:c,display:'inline-block',border:'1px solid rgba(0,0,0,0.1)'}}/>
              ))}
            </span>
            {p.name}
          </button>
        ))}
      </div>

      <Divider title="Ручне редагування"/>
      <div style={{display:'flex',flexDirection:'column',gap:'0.875rem'}}>
        {COLOR_FIELDS.map(f=>(
          <div key={f.key} style={{display:'flex',alignItems:'center',gap:'0.75rem',padding:'0.75rem',background:'var(--s1)',border:'1px solid var(--b1)',borderRadius:6}}>
            <div style={{width:40,height:40,borderRadius:6,background:colors[f.key]||'#ccc',border:'2px solid var(--b2)',flexShrink:0,cursor:'pointer'}} onClick={()=>document.getElementById('ci_'+f.key)?.click()}/>
            <input id={'ci_'+f.key} type="color" value={colors[f.key]||'#000000'} onChange={e=>set(f.key,e.target.value)} style={{position:'absolute',opacity:0,width:0,height:0,pointerEvents:'none'}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:'0.8125rem',fontWeight:600,color:'var(--t1)'}}>{f.label}</div>
              <div style={{fontSize:'0.75rem',color:'var(--t3)'}}>{f.key} · {f.note}</div>
            </div>
            <input type="text" value={colors[f.key]||''} onChange={e=>set(f.key,e.target.value)} style={{width:90,padding:'0.375rem 0.5rem',border:'1px solid var(--b1)',borderRadius:4,background:'var(--bg)',color:'var(--t1)',fontSize:'0.8125rem',fontFamily:'var(--mono)',textTransform:'uppercase',outline:'none'}}/>
            <button onClick={()=>document.getElementById('ci_'+f.key)?.click()} style={{padding:'0.375rem 0.625rem',border:'1px solid var(--b2)',borderRadius:4,background:'var(--bg)',cursor:'pointer',fontSize:'0.8125rem'}}>🎨</button>
          </div>
        ))}
      </div>

      <div style={{display:'flex',justifyContent:'space-between',marginTop:'1.5rem',paddingTop:'1rem',borderTop:'1px solid var(--b1)'}}>
        <Btn danger onClick={reset}>Скинути до WUF13</Btn>
        <Btn primary onClick={save}>💾 Зберегти кольори</Btn>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   DASHBOARD TAB
══════════════════════════════════════════════════════════════════ */
const DashTab = () => {
  const visits = gs(VISITS_KEY,{});
  const top    = Object.entries(visits).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const maxV   = top.length?top[0][1]:1;
  const total  = Object.values(visits).reduce((s,n)=>s+n,0);
  const log    = getLog().slice(0,10);
  const contentKeys = Object.keys(getContent()).length;

  const fmtTs = ts => {
    const d=new Date(ts),diff=Math.floor((Date.now()-d)/60000);
    if(diff<1)return'щойно';if(diff<60)return`${diff} хв`;if(diff<1440)return`${Math.floor(diff/60)} год`;
    return d.toLocaleDateString('uk');
  };

  const Card=({n,label,sub,color})=>(
    <div style={{background:'var(--s1)',border:'1px solid var(--b1)',borderRadius:6,padding:'1rem',flex:1,minWidth:90}}>
      <div style={{fontSize:'1.625rem',fontWeight:700,color:color||'var(--ac)',fontFamily:'var(--display)',lineHeight:1}}>{n}</div>
      <div style={{fontSize:'0.75rem',color:'var(--t2)',marginTop:'0.2rem',fontWeight:500}}>{label}</div>
      {sub&&<div style={{fontSize:'0.6875rem',color:'var(--t3)',marginTop:'0.125rem'}}>{sub}</div>}
    </div>
  );

  return (
    <div>
      <div style={{display:'flex',gap:'0.625rem',flexWrap:'wrap',marginBottom:'1.5rem'}}>
        <Card n={total||0}      label="Переглядів"         color="var(--ac)"/>
        <Card n={top.length}   label="Унікальних сторінок" color="var(--wuf-blue)"/>
        <Card n={contentKeys}  label="Редагованих полів"   color="#2d8a4e"/>
        <Card n={getCerts().length} label="Сертифікатів"  color="#7b2d8b"/>
      </div>

      <Divider title="Активність сторінок"/>
      {top.length===0?<p style={{color:'var(--t3)',fontSize:'0.8125rem'}}>Переглядів ще немає.</p>:
        top.map(([page,count])=>(
          <div key={page} style={{display:'flex',alignItems:'center',gap:'0.625rem',marginBottom:'0.375rem'}}>
            <div style={{width:100,fontSize:'0.75rem',color:'var(--t1)',fontWeight:600,flexShrink:0}}>{page}</div>
            <div style={{flex:1,height:8,background:'var(--s2)',borderRadius:4,overflow:'hidden'}}>
              <div style={{width:`${(count/maxV)*100}%`,height:'100%',background:'var(--ac)',borderRadius:4}}/>
            </div>
            <div style={{width:24,fontSize:'0.75rem',color:'var(--t2)',textAlign:'right',fontWeight:600}}>{count}</div>
          </div>
        ))
      }

      <Divider title="Журнал подій"/>
      <div style={{border:'1px solid var(--b1)',borderRadius:6,overflow:'hidden'}}>
        {log.length===0?<div style={{padding:'0.75rem 1rem',fontSize:'0.8125rem',color:'var(--t3)'}}>Порожньо.</div>:
          log.map((e,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'0.5rem 1rem',borderBottom:i<log.length-1?'1px solid var(--b1)':'none',background:i%2===0?'var(--bg)':'var(--s1)'}}>
              <span style={{fontSize:'0.8125rem',color:'var(--t1)'}}>{e.msg}</span>
              <span style={{fontSize:'0.75rem',color:'var(--t3)',flexShrink:0,marginLeft:'1rem'}}>{fmtTs(e.ts)}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   PAGES TAB
══════════════════════════════════════════════════════════════════ */
const ALL_PAGES=[
  {id:'heritage',label:'Спадщина'},{id:'campus',label:'Кампус'},{id:'labs',label:'Лабораторії'},
  {id:'simulation',label:'Симуляція'},{id:'achievements',label:'Досягнення'},{id:'archive',label:'Архів'},
  {id:'war',label:'Пам\'ять'},{id:'people',label:'Люди'},{id:'future',label:'Майбутнє'},
  {id:'library',label:'Бібліотека'},{id:'applicant',label:'Абітурієнту'},{id:'studentlife',label:'Студ. Життя'},
  {id:'map',label:'Карта'},{id:'timecapsule',label:'Часова Капсула'},{id:'eras',label:'Ери'},
  {id:'voices',label:'Голоси'},{id:'science',label:'Наука'},{id:'international',label:'Міжнар.'},
  {id:'departments',label:'Кафедри'},{id:'panneau',label:'Панно'},{id:'admin',label:'Адмін'},
];

const PagesTab = ({ settings, onChange }) => {
  const toggle = id => {
    const dis=settings.disabledPages.includes(id)?settings.disabledPages.filter(p=>p!==id):[...settings.disabledPages,id];
    onChange({...settings,disabledPages:dis});
  };
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
        <span style={{fontSize:'0.8125rem',color:'var(--t2)'}}>{settings.disabledPages.length} сторінок вимкнено з {ALL_PAGES.length}</span>
        <Btn small onClick={()=>onChange({...settings,disabledPages:[]})}>Увімкнути всі</Btn>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'0.5rem',marginBottom:'1.5rem'}}>
        {ALL_PAGES.map(p=>{const on=!settings.disabledPages.includes(p.id);return(
          <div key={p.id} onClick={()=>toggle(p.id)} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.625rem 0.75rem',borderRadius:4,cursor:'pointer',border:'1px solid '+(on?'var(--b1)':'rgba(196,80,57,0.3)'),background:on?'var(--s1)':'rgba(196,80,57,0.05)'}}>
            <span style={{fontSize:'0.8125rem',color:on?'var(--t1)':'#c45039',fontWeight:on?400:500}}>{p.label}</span>
            <span style={{fontSize:'0.625rem',fontWeight:700,color:on?'var(--t3)':'#c45039',letterSpacing:'0.05em'}}>{on?'ON':'OFF'}</span>
          </div>
        );})}
      </div>
      <Tog on={settings.maintenanceMode} onChange={v=>onChange({...settings,maintenanceMode:v})} label="Режим обслуговування (заглушка для всіх сторінок)"/>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   ANNOUNCE + CERTS + ANALYTICS + SYSTEM TABS (compact)
══════════════════════════════════════════════════════════════════ */
const AnnounceTab = ({ settings, onChange }) => (
  <div>
    <Tog on={settings.announcementEnabled} onChange={v=>onChange({...settings,announcementEnabled:v})} label="Показувати банер оголошення"/>
    {settings.announcementEnabled && <>
      <div style={{marginTop:'0.75rem'}}/>
      <F label="Текст оголошення" value={settings.announcementText||''} onChange={v=>onChange({...settings,announcementText:v})}/>
      <div style={{marginBottom:'0.75rem'}}>
        <div style={{fontSize:'0.6875rem',fontWeight:600,letterSpacing:'0.06em',color:'var(--t3)',textTransform:'uppercase',marginBottom:'0.375rem'}}>Тип</div>
        <div style={{display:'flex',gap:'0.375rem',flexWrap:'wrap'}}>
          {['info','warning','success','error'].map(t=>(
            <button key={t} onClick={()=>onChange({...settings,announcementType:t})} style={{padding:'0.375rem 0.875rem',borderRadius:4,fontSize:'0.75rem',cursor:'pointer',fontWeight:500,border:'1px solid '+(settings.announcementType===t?'var(--ac)':'var(--b2)'),background:settings.announcementType===t?'var(--ac)':'var(--s1)',color:settings.announcementType===t?'#fff':'var(--t2)'}}>{t}</button>
          ))}
        </div>
      </div>
    </>}
  </div>
);

const CertsTab = () => {
  const toast = useToast();
  const { confirm, ConfirmUI } = useConfirm();
  const [certs,setCerts]=React.useState(getCerts);
  const del=async id=>{
    const ok=await confirm('Видалити цей сертифікат?');
    if(!ok)return;
    localStorage.removeItem('donntu_cert_'+id);
    setCerts(getCerts());
    toast.success('Сертифікат видалено');
    addLog(`Сертифікат ${id} видалено`);
  };
  const fmtDate=ts=>ts?new Date(ts).toLocaleDateString('uk'):'—';
  return(
    <div>
      {ConfirmUI}
      <div style={{marginBottom:'0.75rem',fontSize:'0.8125rem',color:'var(--t2)'}}>Всього: {certs.length} сертифікатів</div>
      {certs.length===0?<p style={{color:'var(--t3)',fontSize:'0.8125rem'}}>Сертифікати ще не видавались.</p>:
        <div style={{border:'1px solid var(--b1)',borderRadius:6,overflow:'hidden'}}>
          {certs.map((c,i)=>(
            <div key={c.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.625rem 1rem',borderBottom:i<certs.length-1?'1px solid var(--b1)':'none',background:i%2?'var(--s1)':'var(--bg)'}}>
              <div><div style={{fontSize:'0.8125rem',fontWeight:600,color:'var(--t1)'}}>{c.name||'—'}</div><div style={{fontSize:'0.75rem',color:'var(--t3)'}}>{c.id} · {fmtDate(c.issuedAt)}</div></div>
              <Btn small danger onClick={()=>del(c.id)}>✕</Btn>
            </div>
          ))}
        </div>
      }
      {certs.length>0&&<div style={{marginTop:'1rem'}}><Btn danger onClick={async()=>{const ok=await confirm('Видалити ВСІ сертифікати?');if(!ok)return;getCerts().forEach(c=>localStorage.removeItem('donntu_cert_'+c.id));setCerts([]);toast.success('Всі сертифікати видалено');addLog('Всі сертифікати видалено');}}>Видалити всі</Btn></div>}
    </div>
  );
};

const AnalyticsTab = () => {
  const visits=gs(VISITS_KEY,{});
  const all=Object.entries(visits).sort((a,b)=>b[1]-a[1]);
  const total=all.reduce((s,[,n])=>s+n,0);
  const maxV=all.length?all[0][1]:1;
  const toast=useToast();
  const {confirm,ConfirmUI}=useConfirm();
  return(
    <div>
      {ConfirmUI}
      <div style={{display:'flex',gap:'0.625rem',marginBottom:'1.5rem'}}>
        <div style={{background:'var(--s1)',border:'1px solid var(--b1)',borderRadius:6,padding:'1rem',flex:1}}><div style={{fontSize:'1.625rem',fontWeight:700,color:'var(--ac)',fontFamily:'var(--display)'}}>{total}</div><div style={{fontSize:'0.75rem',color:'var(--t2)',marginTop:'0.2rem'}}>Всього переглядів</div></div>
        <div style={{background:'var(--s1)',border:'1px solid var(--b1)',borderRadius:6,padding:'1rem',flex:1}}><div style={{fontSize:'1.625rem',fontWeight:700,color:'var(--wuf-blue)',fontFamily:'var(--display)'}}>{all.length}</div><div style={{fontSize:'0.75rem',color:'var(--t2)',marginTop:'0.2rem'}}>Сторінок відвідано</div></div>
      </div>
      {all.map(([page,count])=>(
        <div key={page} style={{display:'flex',alignItems:'center',gap:'0.625rem',marginBottom:'0.5rem'}}>
          <div style={{width:110,fontSize:'0.8125rem',color:'var(--t1)',fontWeight:500,flexShrink:0}}>{page}</div>
          <div style={{flex:1,height:10,background:'var(--s2)',borderRadius:5,overflow:'hidden'}}><div style={{width:`${(count/maxV)*100}%`,height:'100%',background:'var(--wuf-blue)',borderRadius:5}}/></div>
          <div style={{width:28,fontSize:'0.8125rem',color:'var(--t2)',textAlign:'right',fontWeight:600}}>{count}</div>
        </div>
      ))}
      {all.length>0&&<div style={{marginTop:'1rem'}}><Btn danger onClick={async()=>{const ok=await confirm('Очистити всю аналітику?');if(!ok)return;localStorage.removeItem(VISITS_KEY);window.location.reload();}}>Очистити аналітику</Btn></div>}
    </div>
  );
};

const SystemTab = ({ settings, onChange }) => {
  const toast=useToast();
  const {confirm,ConfirmUI}=useConfirm();
  const [np,setNp]=React.useState('');
  const [np2,setNp2]=React.useState('');

  const storageUsed=(()=>{try{let t=0;for(let k in localStorage){if(localStorage.hasOwnProperty(k))t+=(localStorage[k].length+k.length)*2;}return(t/1024).toFixed(1)+' KB';}catch{return'?';}})();

  const handlePin=()=>{
    if(np.length<6){toast.error('PIN має бути ≥ 6 символів');return;}
    if(np!==np2){toast.error('PIN-коди не збігаються');return;}
    ss(ADMIN_PIN_KEY,np);
    setNp('');setNp2('');
    toast.success('PIN успішно змінено');
    addLog('PIN адмін-панелі змінено');
  };

  return(
    <div>
      {ConfirmUI}
      <Divider title="Зміна PIN-коду"/>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.5rem'}}>
        <F label="Новий PIN (мін. 6 символів)" value={np} onChange={setNp} placeholder="мін. 6 символів" mono/>
        <F label="Повторіть PIN" value={np2} onChange={setNp2} placeholder="підтвердження" mono/>
      </div>
      <div style={{marginBottom:'1rem'}}><Btn primary onClick={handlePin} disabled={np.length<6||np!==np2}>Змінити PIN</Btn></div>

      <Divider title="Налаштування інтерфейсу"/>
      <Tog on={settings.showAdminBadge} onChange={v=>onChange({...settings,showAdminBadge:v})} label="Показувати значок адміна у навбарі"/>

      <Divider title="Системна інформація"/>
      <div style={{border:'1px solid var(--b1)',borderRadius:6,overflow:'hidden',marginBottom:'1.5rem'}}>
        {[['PIN за замовч.',ADMIN_PIN_DEFAULT],['localStorage',storageUsed],['Сертифікатів',getCerts().length],['Подій у журналі',getLog().length],['Редагованих полів',Object.keys(getContent()).length]].map(([k,v],i)=>(
          <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'0.5rem 1rem',borderBottom:i<4?'1px solid var(--b1)':'none',background:i%2===0?'var(--bg)':'var(--s1)'}}>
            <span style={{fontSize:'0.8125rem',color:'var(--t2)'}}>{k}</span>
            <span style={{fontSize:'0.8125rem',color:'var(--t1)',fontWeight:600,fontFamily:'var(--mono)'}}>{String(v)}</span>
          </div>
        ))}
      </div>

      <Divider title="Небезпечна зона"/>
      <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
        <Btn danger onClick={async()=>{const ok=await confirm('Вийти з адмін-сесії?');if(ok){localStorage.removeItem(SESSION_KEY);window.location.reload();}}}>↩ Вийти з сесії</Btn>
        <Btn danger onClick={async()=>{const ok=await confirm('Очистити журнал подій?');if(ok){localStorage.removeItem(LOG_KEY);toast.success('Журнал очищено');}}}>Очистити журнал</Btn>
        <Btn danger onClick={async()=>{const ok=await confirm('Скинути ВСІ налаштування? Це незворотно.');if(ok){[STORE_KEY,CONTENT_KEY,COLORS_KEY,LOG_KEY,RECENT_IMG_KEY,DRAFT_KEY,SESSION_KEY].forEach(k=>localStorage.removeItem(k));applyColors(DEFAULT_COLORS);window.location.reload();}}}>Скинути все</Btn>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   MAIN AdminPage
══════════════════════════════════════════════════════════════════ */
const TABS=[
  {id:'dash',    icon:'▦', label:'Дашборд'},
  {id:'content', icon:'✎', label:'Контент'},
  {id:'colors',  icon:'🎨',label:'Кольори'},
  {id:'pages',   icon:'≡', label:'Сторінки'},
  {id:'announce',icon:'⊙', label:'Банер'},
  {id:'certs',   icon:'✦', label:'Серт.'},
  {id:'analytics',icon:'▸',label:'Аналіт.'},
  {id:'system',  icon:'⚙', label:'Система'},
];

const AdminPage = ({ onNavigate }) => {
  const [pin,     setPin]      = React.useState('');
  const [unlocked,setUnlocked] = React.useState(()=>!!localStorage.getItem(SESSION_KEY));
  const [pinErr,  setPinErr]   = React.useState('');
  const [pinVis,  setPinVis]   = React.useState(false);
  const [tab,     setTab]      = React.useState('dash');
  const [settings,setSettings] = React.useState(getSettings);

  // Apply saved colors on mount
  React.useEffect(()=>applyColors(getColors()), []);

  const handleUnlock = () => {
    const stored = localStorage.getItem(ADMIN_PIN_KEY) || ADMIN_PIN_DEFAULT;
    if(pin===stored){
      localStorage.setItem(SESSION_KEY,'1');
      setUnlocked(true);
      addLog('Вхід в адмін-панель');
    } else {
      setPinErr('Невірний PIN');
      setTimeout(()=>setPinErr(''),2500);
    }
  };

  const handleSettings = s => { setSettings(s); saveSettings(s); addLog('Налаштування змінено'); };

  /* ── Lock screen ── */
  if(!unlocked) return (
    <div style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}}>
      <div style={{background:'var(--s1)',border:'1px solid var(--b1)',borderRadius:10,padding:'2.5rem 2rem',width:340,textAlign:'center',boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
        <div style={{fontSize:'2.25rem',marginBottom:'0.625rem'}}>⚙</div>
        <div style={{fontSize:'1.125rem',fontWeight:700,color:'var(--t1)',marginBottom:'0.25rem',fontFamily:'var(--display)'}}>Адмін-панель</div>
        <div style={{fontSize:'0.8125rem',color:'var(--t3)',marginBottom:'1.75rem'}}>DonNTU Heritage OS</div>
        <div style={{position:'relative',marginBottom:'0.625rem'}}>
          <input
            type={pinVis?'text':'password'}
            value={pin}
            onChange={e=>setPin(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&handleUnlock()}
            placeholder="Введіть PIN"
            autoFocus
            style={{width:'100%',textAlign:'center',letterSpacing:'0.15em',fontSize:'1.125rem',padding:'0.75rem 2.5rem 0.75rem 0.75rem',border:'1px solid '+(pinErr?'#c45039':'var(--b1)'),borderRadius:6,background:'var(--bg)',color:'var(--t1)',boxSizing:'border-box',outline:'none',fontFamily:'var(--mono)'}}
          />
          <button onClick={()=>setPinVis(v=>!v)} style={{position:'absolute',right:'0.625rem',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'var(--t3)',fontSize:'0.875rem'}}>
            {pinVis?'🙈':'👁'}
          </button>
        </div>
        {pinErr&&<div style={{color:'#c45039',fontSize:'0.8125rem',marginBottom:'0.625rem',fontWeight:500}}>{pinErr}</div>}
        <button onClick={handleUnlock} style={{width:'100%',padding:'0.75rem',background:'var(--ac)',color:'#fff',border:'none',borderRadius:6,fontSize:'0.9375rem',fontWeight:700,cursor:'pointer',marginBottom:'1rem',letterSpacing:'0.03em'}}>
          Увійти →
        </button>
        <div style={{fontSize:'0.75rem',color:'var(--t3)',display:'flex',alignItems:'center',gap:'0.375rem',justifyContent:'center'}}>
          <span style={{fontSize:'0.875rem'}}>🔒</span>
          PIN за замовч.: <span style={{fontFamily:'var(--mono)',fontWeight:600}}>DonNTU2026</span>
        </div>
      </div>
    </div>
  );

  /* ── Admin UI ── */
  return (
    <ToastProvider>
      <div style={{display:'flex',minHeight:'calc(100vh - 64px)'}}>
        {/* Sidebar */}
        <nav style={{width:145,flexShrink:0,background:'var(--s1)',borderRight:'1px solid var(--b1)',display:'flex',flexDirection:'column',position:'sticky',top:64,height:'calc(100vh - 64px)',overflowY:'auto',boxSizing:'border-box'}}>
          <div style={{padding:'1.125rem 1rem 0.875rem',borderBottom:'1px solid var(--b1)'}}>
            <div style={{fontSize:'0.625rem',fontWeight:800,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--t3)'}}>ADMIN PANEL</div>
            <div style={{fontSize:'0.75rem',color:'var(--t2)',marginTop:'0.125rem',fontFamily:'var(--display)'}}>DonNTU OS</div>
          </div>
          <div style={{flex:1,padding:'0.5rem 0'}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{
                display:'flex',alignItems:'center',gap:'0.5rem',width:'100%',
                padding:'0.6rem 1rem',textAlign:'left',border:'none',cursor:'pointer',
                fontSize:'0.8125rem',background:tab===t.id?'rgba(224,120,48,0.1)':'transparent',
                color:tab===t.id?'var(--ac)':'var(--t2)',fontWeight:tab===t.id?700:400,
                borderRight:tab===t.id?'2.5px solid var(--ac)':'2.5px solid transparent',
                transition:'all 0.1s',
              }}>
                <span style={{fontSize:'0.875rem',width:16,textAlign:'center'}}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{padding:'0.75rem 1rem',borderTop:'1px solid var(--b1)'}}>
            <button onClick={()=>{localStorage.removeItem(SESSION_KEY);window.location.reload();}} style={{fontSize:'0.75rem',color:'var(--t3)',background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'0.375rem'}}>
              ↩ Вийти
            </button>
          </div>
        </nav>

        {/* Main content */}
        <main style={{flex:1,padding:'1.5rem 2rem',overflowY:'auto',maxWidth:820,boxSizing:'border-box'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
            <div>
              <h1 style={{fontSize:'1.25rem',fontWeight:700,color:'var(--t1)',fontFamily:'var(--display)',margin:0}}>{TABS.find(t=>t.id===tab)?.icon} {TABS.find(t=>t.id===tab)?.label}</h1>
              <div style={{fontSize:'0.75rem',color:'var(--t3)',marginTop:'0.125rem'}}>DonNTU Heritage OS · Адмін-панель</div>
            </div>
            <button onClick={()=>onNavigate('overview')} style={{fontSize:'0.8125rem',color:'var(--t2)',background:'var(--s1)',border:'1px solid var(--b2)',borderRadius:4,padding:'0.4rem 0.875rem',cursor:'pointer'}}>
              ← На головну
            </button>
          </div>

          {tab==='dash'     && <DashTab/>}
          {tab==='content'  && <ContentTab/>}
          {tab==='colors'   && <ColorsTab/>}
          {tab==='pages'    && <PagesTab settings={settings} onChange={handleSettings}/>}
          {tab==='announce' && <AnnounceTab settings={settings} onChange={handleSettings}/>}
          {tab==='certs'    && <CertsTab/>}
          {tab==='analytics'&& <AnalyticsTab/>}
          {tab==='system'   && <SystemTab settings={settings} onChange={handleSettings}/>}
        </main>
      </div>
    </ToastProvider>
  );
};

Object.assign(window,{AdminPage});
