/* DonNTU Heritage — Redesigned Star Field with nebula colors */
const StarField = ({ density = 200, opacity = 1, subtle = false }) => {
  const canvasRef = React.useRef(null);
  const starsRef = React.useRef([]);
  const frameRef = React.useRef(null);

  React.useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext('2d');
    let W, H, dpr;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 2);
      W = c.width = c.offsetWidth * dpr;
      H = c.height = c.offsetHeight * dpr;
      init();
    };

    const init = () => {
      const n = subtle ? Math.floor(density * 0.25) : density;
      const arr = [];
      for (let i = 0; i < n; i++) {
        const big = Math.random() < 0.06;
        arr.push({
          x: Math.random() * W, y: Math.random() * H,
          r: big ? 1.2 + Math.random() * 1.8 : 0.3 + Math.random() * 0.9,
          a: big ? 0.6 + Math.random() * 0.4 : 0.15 + Math.random() * 0.45,
          sp: 0.002 + Math.random() * 0.012,
          ph: Math.random() * 6.28,
          big,
          hue: 220 + Math.random() * 50,
        });
      }
      starsRef.current = arr;
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      for (const s of starsRef.current) {
        const a = s.a * (0.45 + 0.55 * Math.sin(t * s.sp + s.ph));
        if (a < 0.02) continue;
        if (s.big) {
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
          g.addColorStop(0, `hsla(${s.hue},50%,88%,${a * 0.5})`);
          g.addColorStop(0.5, `hsla(${s.hue},40%,80%,${a * 0.12})`);
          g.addColorStop(1, `hsla(${s.hue},30%,70%,0)`);
          ctx.fillStyle = g;
          ctx.fillRect(s.x - s.r * 5, s.y - s.r * 5, s.r * 10, s.r * 10);
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.28);
        ctx.fillStyle = `hsla(${s.hue},30%,92%,${a})`;
        ctx.fill();
      }
      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    frameRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(frameRef.current); window.removeEventListener('resize', resize); };
  }, [density, subtle]);

  return <canvas ref={canvasRef} style={{
    position:'absolute', inset:0, width:'100%', height:'100%',
    pointerEvents:'none', opacity
  }} />;
};

window.StarField = StarField;
