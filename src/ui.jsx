// Reusable UI primitives & SVG icons

const { useEffect: uE, useRef: uR, useState: uS } = React;

function Leaf({ size = 28, onDark = true }) {
  // Real Blue Maple mark, transparent background
  return (
    <img
      src="assets/blue-maple-mark-transparent.png"
      alt=""
      aria-hidden="true"
      style={{
        width: size,
        height: size * (534/512),
        display: "inline-block",
        objectFit: "contain",
        filter: onDark ? "drop-shadow(0 2px 10px rgba(74,144,217,0.25))" : "none",
      }}
    />
  );
}

function SectionHead({ n, eyebrow, title }) {
  return (
    <div className="sec-head reveal">
      <div className="num">{n}</div>
      <div className="title">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

// Before / After slider
function BeforeAfter({ before, after, beforeLabel = "Before", afterLabel = "After" }) {
  const [pct, setPct] = uS(50);
  const wrapRef = uR(null);
  const dragging = uR(false);

  const move = (clientX) => {
    const r = wrapRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setPct(p);
  };

  const onDown = (e) => { dragging.current = true; move(e.clientX ?? e.touches?.[0]?.clientX); };
  const onMove = (e) => { if (!dragging.current) return; move(e.clientX ?? e.touches?.[0]?.clientX); };
  const onUp = () => { dragging.current = false; };

  uE(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div
      className="ba-wrap"
      ref={wrapRef}
      onMouseDown={onDown}
      onTouchStart={onDown}
    >
      <div className="ba-img" style={{ backgroundImage: `url(${before})` }} />
      <div className="ba-after-clip" style={{ clipPath: `inset(0 0 0 ${pct}%)` }}>
        <div className="ba-img" style={{ backgroundImage: `url(${after})` }} />
      </div>
      <div className="ba-handle" style={{ left: `${pct}%` }} />
      <div className="ba-label l">{beforeLabel}</div>
      <div className="ba-label r">{afterLabel}</div>
    </div>
  );
}

// Animated marquee
function Marquee({ items }) {
  const inner = (
    <span>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {it}
          <span className="dot" />
        </React.Fragment>
      ))}
    </span>
  );
  return (
    <div className="marquee">
      <div className="marquee-inner">
        {inner}{inner}
      </div>
    </div>
  );
}

// Nav + progress
function Nav() {
  useNavSolid();
  return (
    <>
      <div className="progress"><div className="bar" /></div>
      <nav className="nav">
        <div className="brand">
          <Leaf size={22} />
          <span>Blue Maple</span>
          <span className="sep">/</span>
          <span style={{ fontStyle: "italic", letterSpacing: 0 }}>Milana Reserve</span>
        </div>
        <ul>
          <li><a href="#summary">Summary</a></li>
          <li><a href="#strategy">Strategy</a></li>
          <li><a href="#property">Property</a></li>
          <li><a href="#market">Market</a></li>
          <li><a href="#financials">Financials</a></li>
          <li><a href="#returns">Returns</a></li>
          <li><a href="#disclaimer">Legal</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </>
  );
}

Object.assign(window, { Leaf, SectionHead, BeforeAfter, Marquee, Nav });
