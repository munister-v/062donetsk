/* SimulationPage — DonNTU Heritage OS Simulation Hub — WeeGo design */

// ─── MODULE 1: MINE SAFETY ────────────────────────────────────────────────────
const MineSafety = () => {
  const [ch4, setCh4] = React.useState(2.8);
  const [airflow, setAirflow] = React.useState(40);
  const [fans, setFans] = React.useState(1);
  const [sealed, setSealed] = React.useState(false);
  const [alarm, setAlarm] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(300);
  const [missionDone, setMissionDone] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [log, setLog] = React.useState([
    '[00:00] Сектор D-4 активовано. Рівень CH₄: 2.80%',
    '[00:00] Запуск моніторингу атмосфери'
  ]);
  const [score, setScore] = React.useState(0);
  const [okStreak, setOkStreak] = React.useState(0);

  const intervalRef = React.useRef(null);
  const ch4Ref = React.useRef(ch4);
  const okRef = React.useRef(0);
  const doneRef = React.useRef(false);
  const elRef = React.useRef(0);

  ch4Ref.current = ch4;
  okRef.current = okStreak;

  const addLog = React.useCallback((msg) => {
    setLog(prev => {
      const t = elRef.current;
      const mm = String(Math.floor(t / 60)).padStart(2, '0');
      const ss = String(t % 60).padStart(2, '0');
      return [`[${mm}:${ss}] ${msg}`, ...prev].slice(0, 20);
    });
  }, []);

  React.useEffect(() => {
    if (missionDone || failed) return;
    intervalRef.current = setInterval(() => {
      elRef.current += 1;
      setElapsed(e => e + 1);
      setTimeLeft(t => {
        if (t <= 1) { setFailed(true); addLog('ПРОВАЛ: Час вийшов. Евакуація!'); return 0; }
        return t - 1;
      });
      setCh4(prev => {
        const delta = 0.025 - (fans * 0.012) - (airflow / 100 * 0.02) - (sealed ? 0.015 : 0);
        const next = Math.max(0.1, Math.min(8.0, prev + delta + (Math.random() - 0.5) * 0.005));
        if (next > 4.0 && prev <= 4.0) { setAlarm(true); addLog('⚠ ТРИВОГА: CH₄ > 4.0%! Автоматична евакуація!'); setScore(s => Math.max(0, s - 20)); }
        if (next > 3.0 && prev <= 3.0) addLog('⚠ CH₄ перевищив 3.0% — критичний рівень');
        if (next > 2.5 && prev <= 2.5) addLog('! CH₄ перевищив 2.5% — небезпечно');
        if (next < 2.5 && prev >= 2.5) addLog('✓ CH₄ знизився до безпечного рівня');
        if (next < 2.0 && !doneRef.current) {
          okRef.current += 1;
          setOkStreak(okRef.current);
          if (okRef.current >= 10) {
            doneRef.current = true;
            setMissionDone(true);
            const sc = Math.max(10, 100 - elRef.current);
            setScore(sc);
            addLog(`✓ МІСІЯ ВИКОНАНА! Рахунок: ${sc}`);
          }
        } else if (next >= 2.0) {
          okRef.current = 0;
          setOkStreak(0);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [fans, airflow, sealed, missionDone, failed, addLog]);

  const ch4Color = ch4 < 2.0 ? 'var(--lime)' : ch4 < 2.5 ? 'var(--gr)' : ch4 < 3.5 ? 'var(--ac)' : 'var(--rust)';
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  const shaftRows = [
    '│  ↓↓↓  [F1] CH₄:' + ch4.toFixed(2) + '%  ↓↓↓  │',
    '│       ═══════════════       │',
    '│  →→→  [F2]           →→→  │',
    '│       ─────────────────     │',
    '│  →→→  [F3] ВЕНТИЛЯЦІЯ →→→ │',
    '│       ═══════════════       │',
    '│  ↑↑↑  [F4] СЕКТОР D-4 ↑↑↑ │',
  ];

  const s = { card: { border: '1px solid var(--b1)', background: '#0d0d0d', padding: '12px' }, label: { fontFamily: 'var(--mono)', fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--t3)' }, btn: { border: '1px solid var(--b1)', background: 'transparent', color: 'var(--t2)', fontFamily: 'var(--mono)', fontSize: '0.6rem', padding: '4px 10px', cursor: 'pointer', letterSpacing: '0.08em' }, btnActive: { border: '1px solid var(--lime)', background: 'var(--lime)', color: '#050505', fontFamily: 'var(--mono)', fontSize: '0.6rem', padding: '4px 10px', cursor: 'pointer', letterSpacing: '0.08em' }, btnDanger: { border: '1px solid var(--rust)', background: 'transparent', color: 'var(--rust)', fontFamily: 'var(--mono)', fontSize: '0.6rem', padding: '4px 10px', cursor: 'pointer', letterSpacing: '0.08em' } };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 220px', gap: '8px' }}>
      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={s.card}>
          <div style={s.label}>Вентиляція</div>
          <div style={{ marginTop: '8px' }}>
            <div style={{ ...s.label, color: 'var(--t2)', marginBottom: '4px' }}>Потік повітря: {airflow}%</div>
            <input type="range" min={0} max={100} value={airflow} onChange={e => setAirflow(+e.target.value)} style={{ width: '100%', accentColor: 'var(--lime)' }} />
          </div>
          <div style={{ marginTop: '10px' }}>
            <div style={s.label}>Вентилятори ({fans}/3)</div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
              {[0, 1, 2, 3].map(n => (
                <button key={n} style={fans === n ? s.btnActive : s.btn} onClick={() => { setFans(n); addLog(`Вентиляторів: ${n}`); }}>{n}</button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <button style={sealed ? s.btnActive : s.btn} onClick={() => { setSealed(v => !v); addLog(!sealed ? 'Сектор ізольовано' : 'Ізоляцію знято'); }} style={{ width: '100%', ...(sealed ? s.btnActive : s.btn) }}>
              {sealed ? '✓ ІЗОЛЬОВАНО' : 'ІЗОЛЮВАТИ СЕКТОР'}
            </button>
          </div>
        </div>
        <div style={s.card}>
          <div style={s.label}>Тривога</div>
          <button style={{ width: '100%', marginTop: '6px', ...(alarm ? s.btnDanger : s.btn) }} onClick={() => { setAlarm(v => !v); addLog(!alarm ? 'ТРИВОГА активована вручну' : 'Тривогу скасовано'); }}>
            {alarm ? '⚠ ТРИВОГА АКТИВНА' : 'АКТИВУВАТИ ТРИВОГУ'}
          </button>
        </div>
        <button style={{ ...s.btnDanger, padding: '8px', fontSize: '0.55rem', letterSpacing: '0.1em' }} onClick={() => { addLog('ЕВАКУАЦІЯ СЕКТОРА D-4 РОЗПОЧАТА'); setFailed(true); }}>
          ЕВАКУАЦІЯ СЕКТОРА
        </button>
        <button style={{ ...s.btn, padding: '8px', fontSize: '0.55rem' }} onClick={() => addLog('Рішення записано до журналу')}>
          ЗАПИСАТИ РІШЕННЯ
        </button>
      </div>

      {/* Shaft viz */}
      <div style={s.card}>
        <div style={{ ...s.label, marginBottom: '8px' }}>Переріз шахти · Сектор D-4</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.625rem', lineHeight: '1.8', color: ch4Color, background: '#050505', padding: '10px', border: '1px solid var(--b1)' }}>
          {'┌─────────────────────────────┐'}<br />
          {shaftRows.map((r, i) => <span key={i}>{r}<br /></span>)}
          {'└─────────────────────────────┘'}
        </div>
        <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {['F1','F2','F3','F4'].map((f, i) => (
            <div key={f} style={{ ...s.card, padding: '6px' }}>
              <div style={{ ...s.label, color: 'var(--t3)' }}>Датчик {f}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: ch4Color, marginTop: '2px' }}>
                {(ch4 + (i - 1.5) * 0.06).toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
        {(missionDone || failed) && (
          <div style={{ marginTop: '10px', padding: '10px', border: `1px solid ${missionDone ? 'var(--lime)' : 'var(--rust)'}`, background: missionDone ? 'rgba(205,242,79,.08)' : 'rgba(196,80,57,.08)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1rem', color: missionDone ? 'var(--lime)' : 'var(--rust)' }}>
              {missionDone ? 'МІСІЯ ВИКОНАНА' : 'МІСІЯ ПРОВАЛЕНА'}
            </div>
            <div style={{ ...s.label, marginTop: '4px' }}>Рахунок: {score}</div>
          </div>
        )}
      </div>

      {/* Telemetry */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={s.card}>
          <div style={s.label}>CH₄ · Сектор D-4</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '2.2rem', fontWeight: 700, color: ch4Color, marginTop: '4px', letterSpacing: '-0.02em' }}>
            {ch4.toFixed(2)}<span style={{ fontSize: '0.8rem' }}>%</span>
          </div>
          <div style={{ height: '6px', background: 'var(--b1)', marginTop: '6px' }}>
            <div style={{ height: '100%', width: `${Math.min(100, ch4 / 6 * 100)}%`, background: ch4Color, transition: 'width .4s, background .4s' }} />
          </div>
          <div style={{ ...s.label, marginTop: '4px', color: 'var(--t3)' }}>Норма &lt; 2.5% · Критично &gt; 4.0%</div>
        </div>
        <div style={s.card}>
          <div style={s.label}>Таймер</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '1.6rem', color: timeLeft < 60 ? 'var(--rust)' : 'var(--t1)', marginTop: '4px' }}>{mm}:{ss}</div>
          <div style={{ ...s.label, color: 'var(--t3)', marginTop: '2px' }}>Час місії: {elapsed}с</div>
        </div>
        <div style={s.card}>
          <div style={{ ...s.label, marginBottom: '6px' }}>Журнал датчиків</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', lineHeight: '1.7', color: 'var(--t3)', maxHeight: '130px', overflowY: 'auto' }}>
            {log.slice(0, 6).map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </div>
        <div style={s.card}>
          <div style={s.label}>Рахунок</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '1.4rem', color: 'var(--lime)', marginTop: '4px' }}>{score}</div>
          <div style={{ ...s.label, color: 'var(--t3)' }}>Стабільно: {okStreak}с / 10с</div>
        </div>
      </div>
    </div>
  );
};

// ─── MODULE 2: POWER GRID ─────────────────────────────────────────────────────
const PowerGrid = () => {
  const initStations = [
    { id: 1, name: 'SS-1 Ш.Засядька',  load: 78,  breaker: true,  critical: false },
    { id: 2, name: 'SS-2 Центральна',  load: 82,  breaker: true,  critical: false },
    { id: 3, name: 'SS-3 Промислова',  load: 103, breaker: true,  critical: true  },
    { id: 4, name: 'SS-4 Північна',    load: 71,  breaker: true,  critical: false },
    { id: 5, name: 'SS-5 Залізнична',  load: 88,  breaker: true,  critical: false },
    { id: 6, name: 'SS-6 Резервна',    load: 95,  breaker: true,  critical: false },
  ];
  const [substations, setSubstations] = React.useState(initStations);
  const [selected, setSelected] = React.useState(null);
  const [elapsed, setElapsed] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(240);
  const [log, setLog] = React.useState(['[00:00] Перевантаження SS-3 виявлено: 103%']);
  const [missionDone, setMissionDone] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [okStreak, setOkStreak] = React.useState(0);
  const intervalRef = React.useRef(null);
  const elRef = React.useRef(0);
  const okRef = React.useRef(0);
  const stRef = React.useRef(substations);
  stRef.current = substations;

  const addLog = React.useCallback((msg) => {
    setLog(prev => {
      const t = elRef.current;
      const mm = String(Math.floor(t / 60)).padStart(2, '0');
      const ss = String(t % 60).padStart(2, '0');
      return [`[${mm}:${ss}] ${msg}`, ...prev].slice(0, 25);
    });
  }, []);

  const neighbors = { 1:[2,4], 2:[1,3,5], 3:[2,6], 4:[1,5], 5:[2,4,6], 6:[3,5] };

  React.useEffect(() => {
    if (missionDone || failed) return;
    intervalRef.current = setInterval(() => {
      elRef.current += 1;
      setElapsed(e => e + 1);
      setTimeLeft(t => { if (t <= 1) { setFailed(true); addLog('ПРОВАЛ: Час вийшов'); return 0; } return t - 1; });
      setSubstations(prev => {
        let next = prev.map(s => ({
          ...s,
          load: s.breaker ? Math.max(0, Math.min(150, s.load + (Math.random() - 0.5) * 0.8)) : 0
        }));
        // check trips
        let tripped = 0;
        next = next.map(s => {
          if (s.breaker && s.load > 110) {
            tripped++;
            addLog(`⚡ ${s.name} ВІДКЛЮЧЕНО (${s.load.toFixed(0)}%)`);
            const ns = neighbors[s.id] || [];
            ns.forEach(nid => { const ni = next.findIndex(x => x.id === nid); if (ni >= 0 && next[ni].breaker) next[ni] = { ...next[ni], load: Math.min(150, next[ni].load + 12) }; });
            return { ...s, breaker: false, load: 0 };
          }
          return s;
        });
        if (tripped >= 3) { setFailed(true); addLog('КАСКАД: 3+ станції відключено. Блекаут!'); }
        // check success
        const active = next.filter(s => s.breaker);
        if (active.every(s => s.load < 90) && active.length > 0) {
          okRef.current += 1;
          setOkStreak(okRef.current);
          if (okRef.current >= 10) { setMissionDone(true); addLog('✓ МІСІЯ ВИКОНАНА! Мережа стабільна'); }
        } else { okRef.current = 0; setOkStreak(0); }
        return next;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [missionDone, failed, addLog]);

  const adjustLoad = (id, delta) => {
    setSubstations(prev => prev.map(s => s.id === id ? { ...s, load: Math.max(0, Math.min(150, s.load + delta)) } : s));
    addLog(`${substations.find(s => s.id === id)?.name}: навантаження ${delta > 0 ? '+' : ''}${delta}%`);
  };
  const toggleBreaker = (id) => {
    setSubstations(prev => {
      const ns = prev.map(s => { if (s.id !== id) return s; const nb = !s.breaker; addLog(`${s.name}: вимикач ${nb ? 'УВІМКНЕНО' : 'ВИМКНЕНО'}`); return { ...s, breaker: nb, load: nb ? 50 : 0 }; });
      if (!prev.find(s => s.id === id)?.breaker) {
        const nids = neighbors[id] || [];
        return ns.map(s => nids.includes(s.id) && s.breaker ? { ...s, load: Math.min(150, s.load + 12) } : s);
      }
      return ns;
    });
  };

  const loadColor = (l) => l < 75 ? 'var(--gr)' : l < 90 ? 'var(--lime)' : l < 105 ? 'var(--ac)' : 'var(--rust)';
  const s = { card: { border: '1px solid var(--b1)', background: '#0d0d0d', padding: '10px' }, label: { fontFamily: 'var(--mono)', fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--t3)' }, btn: { border: '1px solid var(--b1)', background: 'transparent', color: 'var(--t2)', fontFamily: 'var(--mono)', fontSize: '0.6rem', padding: '4px 8px', cursor: 'pointer' }, btnDanger: { border: '1px solid var(--rust)', background: 'transparent', color: 'var(--rust)', fontFamily: 'var(--mono)', fontSize: '0.6rem', padding: '4px 8px', cursor: 'pointer' } };
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss2 = String(timeLeft % 60).padStart(2, '0');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '8px' }}>
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '8px' }}>
          {substations.map(st => (
            <div key={st.id} onClick={() => setSelected(st.id)} style={{ ...s.card, cursor: 'pointer', outline: selected === st.id ? `1px solid var(--lime)` : 'none', background: selected === st.id ? 'rgba(205,242,79,.05)' : '#0d0d0d' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', color: 'var(--t3)' }}>{st.name}</div>
                {st.critical && <span style={{ fontFamily: 'var(--mono)', fontSize: '0.45rem', color: 'var(--rust)', border: '1px solid var(--rust)', padding: '1px 4px' }}>КРИТИЧНА</span>}
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '1.5rem', fontWeight: 700, color: st.breaker ? loadColor(st.load) : 'var(--t3)', marginTop: '4px' }}>
                {st.breaker ? st.load.toFixed(0) : '--'}<span style={{ fontSize: '0.7rem' }}>%</span>
              </div>
              <div style={{ height: '4px', background: 'var(--b1)', marginTop: '4px' }}>
                <div style={{ height: '100%', width: `${Math.min(100, st.load)}%`, background: loadColor(st.load) }} />
              </div>
              <div style={{ ...s.label, marginTop: '4px', color: st.breaker ? 'var(--gr)' : 'var(--rust)' }}>{st.breaker ? 'АКТИВНА' : 'ВІДКЛЮЧЕНА'}</div>
            </div>
          ))}
        </div>
        {selected && (() => {
          const st = substations.find(s => s.id === selected);
          if (!st) return null;
          return (
            <div style={s.card}>
              <div style={{ ...s.label, marginBottom: '8px' }}>Керування · {st.name}</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button style={s.btn} onClick={() => adjustLoad(st.id, -10)}>−10%</button>
                <button style={s.btn} onClick={() => adjustLoad(st.id, +10)}>+10%</button>
                <button style={{ ...s.btn, border: st.breaker ? '1px solid var(--rust)' : '1px solid var(--lime)', color: st.breaker ? 'var(--rust)' : 'var(--lime)' }} onClick={() => toggleBreaker(st.id)}>
                  ВИМИКАЧ {st.breaker ? 'ВИМКНУТИ' : 'УВІМКНУТИ'}
                </button>
              </div>
            </div>
          );
        })()}
        {(missionDone || failed) && (
          <div style={{ marginTop: '8px', padding: '10px', border: `1px solid ${missionDone ? 'var(--lime)' : 'var(--rust)'}`, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1rem', color: missionDone ? 'var(--lime)' : 'var(--rust)' }}>
              {missionDone ? 'МЕРЕЖУ СТАБІЛІЗОВАНО' : 'КАСКАДНЕ ВІДКЛЮЧЕННЯ'}
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={s.card}>
          <div style={s.label}>Таймер</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '1.6rem', color: timeLeft < 60 ? 'var(--rust)' : 'var(--t1)' }}>{mm}:{ss2}</div>
          <div style={{ ...s.label, marginTop: '2px', color: 'var(--t3)' }}>Стабільно: {okStreak}с</div>
        </div>
        <div style={{ ...s.card, flex: 1 }}>
          <div style={{ ...s.label, marginBottom: '6px' }}>Журнал мережі</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', lineHeight: '1.7', color: 'var(--t3)', maxHeight: '280px', overflowY: 'auto' }}>
            {log.map((l, i) => <div key={i} style={{ color: l.includes('ВІДКЛЮЧЕНО') || l.includes('КАСКАД') ? 'var(--rust)' : l.includes('✓') ? 'var(--lime)' : 'var(--t3)' }}>{l}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MODULE 3: CYBER ATTACK ───────────────────────────────────────────────────
const CyberAttack = () => {
  const initNodes = [
    { id: 1, name: 'DISPATCH',    status: 'infected',  critical: true  },
    { id: 2, name: 'VENTILATION', status: 'clean',     critical: true  },
    { id: 3, name: 'PUMP-CTRL',   status: 'clean',     critical: true  },
    { id: 4, name: 'SENSORS-A',   status: 'clean',     critical: false },
    { id: 5, name: 'COMM-HUB',    status: 'infected',  critical: false },
  ];
  const topology = { 1:[2,4,5], 2:[1,3], 3:[2,4], 4:[1,3,5], 5:[1,4] };

  const [nodes, setNodes] = React.useState(initNodes);
  const [selected, setSelected] = React.useState(null);
  const [attackLog, setAttackLog] = React.useState(['[00:00] RANSOMWARE виявлено в мережі SCADA']);
  const [timeLeft, setTimeLeft] = React.useState(360);
  const [elapsed, setElapsed] = React.useState(0);
  const [missionDone, setMissionDone] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [score, setScore] = React.useState(50);
  const [actionProgress, setActionProgress] = React.useState({});
  const intervalRef = React.useRef(null);
  const spreadRef = React.useRef(0);
  const elRef = React.useRef(0);
  const nodesRef = React.useRef(nodes);
  nodesRef.current = nodes;

  const logEntries = [
    n => `ANOMALY виявлено на ${n}`,
    n => `Port scan from 192.168.${Math.floor(Math.random()*9)+1}.${Math.floor(Math.random()*99)+10}`,
    () => `Modbus write attempt на регістр 0x${Math.floor(Math.random()*0xff).toString(16).toUpperCase()}`,
    () => `Auth failure ×${Math.floor(Math.random()*3)+3} — блокування IP`,
    n => `Encryption активовано на ${n}`,
    () => `DNS запит до C2: x7f${Math.random().toString(36).slice(2,8)}.onion`,
    () => `Payload delivered — очікується виконання`,
  ];

  const addLog = React.useCallback((msg, sev='info') => {
    setAttackLog(prev => {
      const t = elRef.current;
      const mm = String(Math.floor(t / 60)).padStart(2, '0');
      const ss = String(t % 60).padStart(2, '0');
      return [`[${mm}:${ss}] ${msg}`, ...prev].slice(0, 40);
    });
  }, []);

  React.useEffect(() => {
    if (missionDone || failed) return;
    intervalRef.current = setInterval(() => {
      elRef.current += 1;
      setElapsed(e => e + 1);
      setTimeLeft(t => { if (t <= 1) { setFailed(true); addLog('ПРОВАЛ: Час вийшов'); return 0; } return t - 1; });
      // random attack log
      if (Math.random() < 0.5) {
        const inf = nodesRef.current.filter(n => n.status === 'infected');
        if (inf.length) {
          const nd = inf[Math.floor(Math.random() * inf.length)];
          const entry = logEntries[Math.floor(Math.random() * logEntries.length)](nd.name);
          addLog(entry);
        }
      }
      // spread every 8s
      spreadRef.current += 1;
      if (spreadRef.current >= 8) {
        spreadRef.current = 0;
        setNodes(prev => {
          const infected = prev.filter(n => n.status === 'infected').map(n => n.id);
          if (!infected.length) return prev;
          const src = infected[Math.floor(Math.random() * infected.length)];
          const neighbors = (topology[src] || []).filter(nid => { const nd = prev.find(n => n.id === nid); return nd && nd.status === 'clean'; });
          if (!neighbors.length) return prev;
          const target = neighbors[Math.floor(Math.random() * neighbors.length)];
          const tnd = prev.find(n => n.id === target);
          addLog(`⚠ Зараження поширилось на ${tnd?.name}`);
          setScore(s => Math.max(0, s - 15));
          return prev.map(n => n.id === target ? { ...n, status: 'infected' } : n);
        });
      }
      // check critical
      setNodes(prev => {
        const critInf = prev.filter(n => n.critical && n.status === 'infected');
        if (critInf.length >= 2) { setFailed(true); addLog('ПРОВАЛ: Критична інфраструктура скомпрометована'); }
        // check win
        const allOk = prev.every(n => n.status === 'clean' || n.status === 'isolated' || n.status === 'restored');
        if (allOk) { setMissionDone(true); setScore(s => Math.min(100, s + 40)); addLog('✓ МЕРЕЖУ ЗАХИЩЕНО'); }
        return prev;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [missionDone, failed, addLog]);

  const doAction = (action) => {
    if (!selected) return;
    const nd = nodes.find(n => n.id === selected);
    if (!nd) return;
    const key = `${selected}-${action}`;
    const delay = action === 'scan' ? 3000 : action === 'restore' ? 5000 : 500;
    setActionProgress(p => ({ ...p, [key]: true }));
    addLog(`${action.toUpperCase()} на ${nd.name} — ${action === 'scan' ? '3с' : action === 'restore' ? '5с' : '...'}`);
    setTimeout(() => {
      setActionProgress(p => { const np = { ...p }; delete np[key]; return np; });
      setNodes(prev => prev.map(n => {
        if (n.id !== selected) return n;
        if (action === 'isolate' && n.status === 'infected') { addLog(`✓ ${n.name} ізольовано`); return { ...n, status: 'isolated' }; }
        if (action === 'scan') { addLog(`Сканування ${n.name}: ${n.status}`); return n; }
        if (action === 'restore' && n.status === 'isolated') { addLog(`✓ ${n.name} відновлено`); setScore(s => Math.min(100, s + 10)); return { ...n, status: 'restored' }; }
        return n;
      }));
    }, delay);
  };

  const statusColor = { clean: 'var(--gr)', infected: 'var(--rust)', isolated: 'var(--ac)', restored: 'var(--lime)' };
  const s = { card: { border: '1px solid var(--b1)', background: '#0d0d0d', padding: '10px' }, label: { fontFamily: 'var(--mono)', fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--t3)' }, btn: { border: '1px solid var(--b1)', background: 'transparent', color: 'var(--t2)', fontFamily: 'var(--mono)', fontSize: '0.6rem', padding: '5px 10px', cursor: 'pointer' } };
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss2 = String(timeLeft % 60).padStart(2, '0');
  const selNode = nodes.find(n => n.id === selected);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '8px' }}>
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', marginBottom: '8px' }}>
          {nodes.map(nd => (
            <div key={nd.id} onClick={() => setSelected(nd.id)} style={{ ...s.card, cursor: 'pointer', outline: selected === nd.id ? `1px solid var(--lime)` : `1px solid ${statusColor[nd.status]}`, background: nd.status === 'infected' ? 'rgba(196,80,57,.08)' : '#0d0d0d' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 700, color: statusColor[nd.status] }}>{nd.name}</div>
              {nd.critical && <div style={{ fontFamily: 'var(--mono)', fontSize: '0.45rem', color: 'var(--rust)', marginTop: '2px' }}>КРИТИЧНИЙ</div>}
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', color: statusColor[nd.status], marginTop: '6px', textTransform: 'uppercase' }}>{nd.status}</div>
            </div>
          ))}
        </div>
        {/* connections hint */}
        <div style={{ ...s.card, marginBottom: '8px', padding: '8px' }}>
          <div style={s.label}>Топологія мережі</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', color: 'var(--t3)', marginTop: '4px' }}>
            {Object.entries(topology).map(([from, tos]) => {
              const fn = nodes.find(n => n.id === +from); return `${fn?.name} → ${tos.map(id => nodes.find(n => n.id === id)?.name).join(', ')}`;
            }).join(' | ')}
          </div>
        </div>
        {selNode && (
          <div style={s.card}>
            <div style={{ ...s.label, marginBottom: '8px' }}>Дії · {selNode.name} [{selNode.status.toUpperCase()}]</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button disabled={selNode.status !== 'infected' || actionProgress[`${selected}-isolate`]} style={{ ...s.btn, borderColor: 'var(--ac)', color: 'var(--ac)', opacity: selNode.status !== 'infected' ? .4 : 1 }} onClick={() => doAction('isolate')}>
                {actionProgress[`${selected}-isolate`] ? '...' : 'ІЗОЛЮВАТИ'}
              </button>
              <button disabled={actionProgress[`${selected}-scan`]} style={s.btn} onClick={() => doAction('scan')}>
                {actionProgress[`${selected}-scan`] ? 'СКАНУВАННЯ...' : 'СКАНУВАТИ (3с)'}
              </button>
              <button disabled={selNode.status !== 'isolated' || actionProgress[`${selected}-restore`]} style={{ ...s.btn, borderColor: 'var(--lime)', color: 'var(--lime)', opacity: selNode.status !== 'isolated' ? .4 : 1 }} onClick={() => doAction('restore')}>
                {actionProgress[`${selected}-restore`] ? 'ВІДНОВЛЕННЯ...' : 'ВІДНОВИТИ (5с)'}
              </button>
            </div>
          </div>
        )}
        {(missionDone || failed) && (
          <div style={{ marginTop: '8px', padding: '10px', border: `1px solid ${missionDone ? 'var(--lime)' : 'var(--rust)'}`, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1rem', color: missionDone ? 'var(--lime)' : 'var(--rust)' }}>
              {missionDone ? 'МЕРЕЖУ ЗАХИЩЕНО' : 'АТАКА УСПІШНА — ПРОВАЛ'}
            </div>
            <div style={{ ...s.label, marginTop: '4px' }}>Рахунок: {score}</div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          <div style={s.card}>
            <div style={s.label}>Таймер</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '1.4rem', color: timeLeft < 60 ? 'var(--rust)' : 'var(--t1)' }}>{mm}:{ss2}</div>
          </div>
          <div style={s.card}>
            <div style={s.label}>Рахунок</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '1.4rem', color: 'var(--lime)' }}>{score}</div>
          </div>
        </div>
        <div style={{ ...s.card, flex: 1 }}>
          <div style={{ ...s.label, marginBottom: '6px' }}>Журнал атак</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.48rem', lineHeight: '1.8', maxHeight: '340px', overflowY: 'auto' }}>
            {attackLog.map((l, i) => (
              <div key={i} style={{ color: l.includes('⚠') || l.includes('ПРОВАЛ') ? 'var(--rust)' : l.includes('✓') ? 'var(--lime)' : l.includes('Auth') || l.includes('Encryption') ? 'var(--ac)' : 'var(--t3)' }}>{l}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MODULE 4: CITY RECOVERY ──────────────────────────────────────────────────
const CityRecovery = () => {
  const initBuildings = [
    { id:1,  type:'🏥', name:'Лікарня №3',              damage:4, population:280, repairCost:25, status:'untouched', critical:true  },
    { id:2,  type:'🏫', name:'Школа №14',               damage:3, population:450, repairCost:18, status:'untouched', critical:false },
    { id:3,  type:'🏢', name:'Житловий блок А',         damage:5, population:180, repairCost:30, status:'untouched', critical:false },
    { id:4,  type:'🏢', name:'Житловий блок Б',         damage:2, population:320, repairCost:12, status:'untouched', critical:false },
    { id:5,  type:'⚡', name:'Підстанція',              damage:3, population:0,   repairCost:20, status:'untouched', critical:true  },
    { id:6,  type:'💧', name:'Водопровідна станція',    damage:4, population:0,   repairCost:22, status:'untouched', critical:true  },
    { id:7,  type:'🏢', name:'Житловий блок В',         damage:1, population:210, repairCost:8,  status:'untouched', critical:false },
    { id:8,  type:'🏪', name:'Ринок / магазини',        damage:3, population:90,  repairCost:14, status:'untouched', critical:false },
    { id:9,  type:'🏢', name:'Гуртожиток ДонНТУ',      damage:4, population:380, repairCost:24, status:'untouched', critical:false },
    { id:10, type:'🏛', name:'Адмінбудівля',            damage:2, population:45,  repairCost:10, status:'untouched', critical:false },
    { id:11, type:'🏗', name:'Промисловий об\'єкт',     damage:5, population:0,   repairCost:28, status:'untouched', critical:false },
    { id:12, type:'🏢', name:'Новий житловий квартал',  damage:1, population:520, repairCost:9,  status:'untouched', critical:false },
  ];

  const [buildings, setBuildings] = React.useState(initBuildings);
  const [budget, setBudget] = React.useState(100);
  const [selected, setSelected] = React.useState(null);
  const [savedPop, setSavedPop] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(360);
  const [missionDone, setMissionDone] = React.useState(false);
  const [log, setLog] = React.useState(['[00:00] Тріаж розпочато. Бюджет: 100 одиниць']);
  const intervalRef = React.useRef(null);
  const elRef = React.useRef(0);
  const repairingRef = React.useRef({});

  const addLog = React.useCallback((msg) => {
    setLog(prev => {
      const t = elRef.current;
      const mm = String(Math.floor(t / 60)).padStart(2, '0');
      const ss = String(t % 60).padStart(2, '0');
      return [`[${mm}:${ss}] ${msg}`, ...prev].slice(0, 20);
    });
  }, []);

  React.useEffect(() => {
    if (missionDone) return;
    intervalRef.current = setInterval(() => {
      elRef.current += 1;
      setTimeLeft(t => { if (t <= 1) { setMissionDone(true); addLog('Час вийшов. Місія завершена'); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [missionDone, addLog]);

  const doAction = (action) => {
    if (!selected || missionDone) return;
    const b = buildings.find(x => x.id === selected);
    if (!b || b.status === 'repairing') return;
    if (action === 'restore') {
      if (budget < b.repairCost) { addLog(`Недостатньо коштів для ${b.name}`); return; }
      setBudget(bd => bd - b.repairCost);
      setBuildings(prev => prev.map(x => x.id === selected ? { ...x, status: 'repairing' } : x));
      addLog(`Відновлення ${b.name} розпочато (вартість: ${b.repairCost})`);
      const delay = (b.damage * 4 + 8) * 1000;
      setTimeout(() => {
        setBuildings(prev => prev.map(x => x.id === selected ? { ...x, status: 'restored' } : x));
        setSavedPop(sp => sp + b.population);
        addLog(`✓ ${b.name} відновлено! +${b.population} людей`);
      }, delay);
    } else if (action === 'demolish') {
      if (budget < 3) { addLog('Недостатньо коштів для знесення'); return; }
      setBudget(bd => bd - 3);
      setBuildings(prev => prev.map(x => x.id === selected ? { ...x, status: 'demolished' } : x));
      addLog(`${b.name} — знесено`);
      setSelected(null);
    } else if (action === 'skip') {
      setBuildings(prev => prev.map(x => x.id === selected ? { ...x, status: 'untouched' } : x));
      addLog(`${b.name} — відкладено`);
      setSelected(null);
    }
  };

  const damageColor = [null, 'var(--gr)', '#9cbf5a', 'var(--ac)', '#c47a39', 'var(--rust)'];
  const statusBorder = { untouched: 'var(--b1)', repairing: 'var(--ac)', restored: 'var(--lime)', demolished: '#333' };
  const s = { card: { border: '1px solid var(--b1)', background: '#0d0d0d', padding: '10px' }, label: { fontFamily: 'var(--mono)', fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--t3)' }, btn: { border: '1px solid var(--b1)', background: 'transparent', color: 'var(--t2)', fontFamily: 'var(--mono)', fontSize: '0.6rem', padding: '5px 10px', cursor: 'pointer' } };
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss2 = String(timeLeft % 60).padStart(2, '0');
  const selB = buildings.find(x => x.id === selected);
  const totalPop = initBuildings.reduce((a, b) => a + b.population, 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '8px' }}>
      <div>
        {/* budget/timer bar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '6px', marginBottom: '8px' }}>
          <div style={s.card}>
            <div style={s.label}>Бюджет</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '1.4rem', color: budget < 15 ? 'var(--rust)' : 'var(--lime)' }}>{budget}<span style={{ fontSize: '0.7rem' }}> од</span></div>
            <div style={{ height: '4px', background: 'var(--b1)', marginTop: '4px' }}>
              <div style={{ height: '100%', width: `${budget}%`, background: 'var(--lime)' }} />
            </div>
          </div>
          <div style={s.card}>
            <div style={s.label}>Врятовано</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '1.4rem', color: 'var(--gr)' }}>{savedPop}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', color: 'var(--t3)' }}>із {totalPop}</div>
          </div>
          <div style={s.card}>
            <div style={s.label}>Таймер</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '1.4rem', color: timeLeft < 60 ? 'var(--rust)' : 'var(--t1)' }}>{mm}:{ss2}</div>
          </div>
          <div style={s.card}>
            <div style={s.label}>Рахунок</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '1.4rem', color: 'var(--lime)' }}>{savedPop + (budget > 0 ? budget * 2 : 0)}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
          {buildings.map(b => (
            <div key={b.id} onClick={() => setSelected(b.id)} style={{ ...s.card, cursor: 'pointer', border: `1px solid ${statusBorder[b.status]}`, opacity: b.status === 'demolished' ? .4 : 1, background: selected === b.id ? 'rgba(205,242,79,.05)' : '#0d0d0d' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.1rem' }}>{b.type}</span>
                {b.critical && <span style={{ fontFamily: 'var(--mono)', fontSize: '0.45rem', color: 'var(--rust)' }}>●</span>}
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.52rem', color: 'var(--t2)', marginTop: '3px', lineHeight: 1.3 }}>{b.name}</div>
              <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                {[1,2,3,4,5].map(i => <div key={i} style={{ width: '8px', height: '4px', background: i <= b.damage ? damageColor[b.damage] : 'var(--b1)' }} />)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.48rem', color: 'var(--t3)' }}>{b.population > 0 ? `${b.population} ос` : '—'}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.48rem', color: 'var(--ac)' }}>{b.repairCost} од</span>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.45rem', color: statusBorder[b.status], marginTop: '2px', textTransform: 'uppercase' }}>{b.status}</div>
            </div>
          ))}
        </div>
        {selB && (
          <div style={{ ...s.card, marginTop: '8px' }}>
            <div style={{ ...s.label, marginBottom: '8px' }}>{selB.type} {selB.name} · Пошкодження {selB.damage}/5</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button disabled={selB.status !== 'untouched' || budget < selB.repairCost} style={{ ...s.btn, borderColor: 'var(--lime)', color: 'var(--lime)', opacity: (selB.status !== 'untouched' || budget < selB.repairCost) ? .4 : 1 }} onClick={() => doAction('restore')}>
                ВІДНОВИТИ ({selB.repairCost} од)
              </button>
              <button disabled={selB.status === 'demolished'} style={{ ...s.btn, borderColor: 'var(--rust)', color: 'var(--rust)', opacity: selB.status === 'demolished' ? .4 : 1 }} onClick={() => doAction('demolish')}>ЗНЕСТИ (3 од)</button>
              <button style={s.btn} onClick={() => doAction('skip')}>ПРОПУСТИТИ</button>
            </div>
          </div>
        )}
      </div>
      <div style={{ ...s.card, overflowY: 'auto' }}>
        <div style={{ ...s.label, marginBottom: '6px' }}>Журнал відбудови</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', lineHeight: '1.8', color: 'var(--t3)' }}>
          {log.map((l, i) => <div key={i} style={{ color: l.includes('✓') ? 'var(--lime)' : l.includes('Недостатньо') ? 'var(--rust)' : 'var(--t3)' }}>{l}</div>)}
        </div>
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const SimulationPage = ({ onNavigate }) => {
  const [activeModule, setActiveModule] = React.useState('mine');

  const MODULES = [
    { id: 'mine',     label: '01 · ШАХТА',     icon: '⛏', badge: 'LAB-M01' },
    { id: 'grid',     label: '02 · МЕРЕЖА',    icon: '⚡', badge: 'LAB-E01' },
    { id: 'cyber',    label: '03 · КІБЕР',     icon: '🛡', badge: 'LAB-C01' },
    { id: 'recovery', label: '04 · ВІДБУДОВА', icon: '🏗', badge: 'LAB-R01' },
  ];

  const moduleDesc = {
    mine:     'CH₄ зростає в секторі D-4. Завдання: стабілізувати рівень нижче 2.5% до евакуації.',
    grid:     'Підстанція SS-3 перевантажена на 103%. Ризик каскадного відключення. Мета: < 90% по всіх вузлах.',
    cyber:    'Ransomware у мережі SCADA. Ізолюйте інфіковані вузли та відновіть чисті до втрати контролю.',
    recovery: 'Тріаж зруйнованих будівель. 100 одиниць бюджету. Максимізуйте кількість врятованих людей.',
  };

  const tabStyle = (id) => ({
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '10px 16px',
    border: activeModule === id ? '1px solid var(--lime)' : '1px solid var(--b1)',
    background: activeModule === id ? 'rgba(205,242,79,.07)' : 'transparent',
    cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.6rem',
    letterSpacing: '0.1em', textTransform: 'uppercase',
    color: activeModule === id ? 'var(--lime)' : 'var(--t2)',
    transition: 'all .15s',
  });

  return (
    <div className="page page-anim" style={{ padding: '0', minHeight: '100vh', background: '#050505' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--b1)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 300, color: 'var(--t1)', letterSpacing: '0.04em' }}>
            Heritage OS · Simulation Hub
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', color: 'var(--t3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '3px' }}>
            ДонНТУ · Інтерактивні навчальні сценарії · Кризовий менеджмент
          </div>
        </div>
        {onNavigate && (
          <button onClick={() => onNavigate('labs')} style={{ border: '1px solid var(--b1)', background: 'transparent', color: 'var(--t3)', fontFamily: 'var(--mono)', fontSize: '0.55rem', padding: '6px 12px', cursor: 'pointer', letterSpacing: '0.08em' }}>
            ← ЛАБОРАТОРІЇ
          </button>
        )}
      </div>

      {/* Module tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--b1)', padding: '0 24px', gap: '0', overflowX: 'auto' }}>
        {MODULES.map(m => (
          <button key={m.id} onClick={() => setActiveModule(m.id)} style={tabStyle(m.id)}>
            <span>{m.icon}</span>
            <span>{m.label}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.45rem', color: activeModule === m.id ? 'var(--lime)' : 'var(--t3)', border: `1px solid ${activeModule === m.id ? 'var(--lime)' : 'var(--b1)'}`, padding: '1px 5px' }}>{m.badge}</span>
          </button>
        ))}
      </div>

      {/* Scenario description */}
      <div style={{ padding: '10px 24px', borderBottom: '1px solid var(--b1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', color: 'var(--rust)', letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid var(--rust)', padding: '2px 6px' }}>СЦЕНАРІЙ</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--ac)' }}>{moduleDesc[activeModule]}</div>
      </div>

      {/* Active module */}
      <div style={{ padding: '16px 24px' }}>
        {activeModule === 'mine'     && <MineSafety key="mine" />}
        {activeModule === 'grid'     && <PowerGrid  key="grid" />}
        {activeModule === 'cyber'    && <CyberAttack key="cyber" />}
        {activeModule === 'recovery' && <CityRecovery key="recovery" />}
      </div>
    </div>
  );
};

window.SimulationPage = SimulationPage;
