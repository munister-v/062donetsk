/* Boot Page v4 — Fraunces display, amber palette, cert platform emphasis */
const BootPage = ({ onEnter }) => {
  const [prog, setProg] = React.useState(0);
  const [rdy, setRdy] = React.useState(false);
  const [out, setOut] = React.useState(false);
  const [seqVisible, setSeqVisible] = React.useState([false, false, false, false]);

  const SEQ = [
    { label: 'АРХІВ · СПАДЩИНА', status: 'ЗАВАНТАЖЕНО' },
    { label: 'ЛАБОРАТОРІЇ · СИМУЛЯЦІЇ', status: 'ONLINE' },
    { label: 'СЕРТИФІКАЦІЙНА ПЛАТФОРМА', status: 'АКТИВНА' },
    { label: 'ЦИФРОВИЙ ДВІЙНИК', status: 'SYNC' },
  ];

  React.useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 6 + 2;
      if (p >= 100) { p = 100; clearInterval(iv); setTimeout(() => setRdy(true), 500); }
      setProg(Math.min(100, Math.round(p)));
    }, 130);

    // reveal seq lines with stagger
    const timers = SEQ.map((_, i) =>
      setTimeout(() => {
        setSeqVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 900 + i * 420)
    );

    return () => { clearInterval(iv); timers.forEach(clearTimeout); };
  }, []);

  const go = () => { setOut(true); setTimeout(onEnter, 700); };

  return (
    <div className="boot" style={out ? {opacity:0, transform:'scale(.98)', transition:'all .7s'} : {}}>
      <div className="boot-grad"></div>
      <StarField density={400} opacity={0.55} />
      <div className="boot-neb boot-n1"></div>
      <div className="boot-neb boot-n2"></div>

      <div className="boot-ui">
        <div className="boot-top">
          <div style={{display:'flex',alignItems:'center',gap:'0.625rem'}}>
            <span style={{fontSize:'1.1rem',opacity:.55}}>⊡</span>
            <span className="lbl">DONNTU OS · BOOT · V 2026.05</span>
          </div>
          <div style={{display:'flex',gap:'0.5rem'}}>
            <span className="lbl">EN</span>
            <span className="lbl lbl-dim">·</span>
            <span className="lbl lbl-amber">UA</span>
          </div>
        </div>

        <div className="boot-c">
          <div className="boot-path lbl">
            ЗАСНОВАНО · 1921 &nbsp;·&nbsp; ДОНЕЦЬК → ПОКРОВСЬК → ЛУЦЬК → ДРОГОБИЧ
          </div>

          <h1 className="boot-h1"><em>Don</em>NTU</h1>
          <div className="boot-tagline">ЦИФРОВА СПАДЩИНА · СЕРТИФІКАЦІЙНА ПЛАТФОРМА</div>
          <div className="boot-sub2">DIGITAL HERITAGE · CERTIFICATION PLATFORM</div>

          <div className="boot-seq">
            {SEQ.map((s, i) => (
              <div key={i} className={`boot-seq-line ${seqVisible[i] ? 'visible' : ''}`}>
                <span className="boot-seq-dot"></span>
                <span className="boot-seq-label">{s.label}</span>
                {seqVisible[i] && <span className="boot-seq-status">{s.status}</span>}
              </div>
            ))}
          </div>

          <div className="boot-prog">
            <span className="lbl" style={{minWidth:65}}>{rdy ? 'ГОТОВО' : 'ЗАВАНТАЖ.'}</span>
            <div className="boot-track">
              <div className="boot-bar" style={{width:prog+'%'}}></div>
            </div>
            <span className="lbl" style={{minWidth:32,textAlign:'right'}}>{prog}%</span>
          </div>

          <button className={`boot-go ${rdy?'rdy':''}`} onClick={go} disabled={!rdy}>
            УВІЙТИ В СИСТЕМУ →
          </button>
        </div>

        <div className="boot-ft">
          <div>
            <span className="lbl lbl-amber">РОЗПОДІЛЕНИЙ ВУЗОЛ</span>
            <span className="lbl lbl-dim">ЛУЦЬК · ПОКРОВСЬК · ДРОГОБИЧ · КИЇВ</span>
          </div>
          <div className="r">
            <span className="lbl lbl-amber">ПЕРЕМІЩЕНИЙ УНІВЕРСИТЕТ · УКРАЇНА</span>
            <span className="lbl lbl-dim">ДОНЕЦЬКИЙ НАЦІОНАЛЬНИЙ ТЕХНІЧНИЙ УНІВЕРСИТЕТ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

window.BootPage = BootPage;
