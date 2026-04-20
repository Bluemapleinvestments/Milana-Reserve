// Intro sections: Hero, Marquee, Exec Summary, Highlights

const { useEffect: uE, useRef: uR, useState: uS } = React;

function Hero() {
  return (
    <section className="hero" data-screen-label="Hero">
      <div className="hero-bg" />
      <div className="hero-vignette" />

      <div className="hero-lockup">
        <div className="brand" style={{ display: "flex", alignItems: "center", gap: 14, color: "var(--cream)", fontFamily: "var(--serif)", letterSpacing: "0.06em", fontSize: 14, textTransform: "uppercase" }}>
          <Leaf size={26} />
          <span>Blue Maple Investments</span>
        </div>
        <div className="confidential">Confidential · Accredited Investors Only · April 2026</div>
      </div>

      <div className="hero-inner">
        <div className="hero-eyebrow reveal in">
          <span className="line" />
          <span style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" }}>
            Tampa, Florida · 232 Units · Class B
          </span>
        </div>
        <h1 className="display reveal in d1">
          Milana<br/>
          <span className="italic">Reserve.</span>
        </h1>
        <div className="hero-sub reveal in d2">
          A value-add acquisition in one of Tampa's most established submarkets — underwritten to deliver
          institutional-grade returns at a material discount to replacement cost.
        </div>

        <div className="hero-meta reveal in d3">
          {MR.hero.meta.map((m, i) => (
            <div className="cell" key={i}>
              <div className="v">{m.v}</div>
              <span className="l">{m.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span><span className="tick" />
      </div>
    </section>
  );
}

function MarqueeBar() {
  return (
    <Marquee items={[
      "232 Units",
      "Tampa · Carrollwood",
      "Value-Add Multifamily",
      "Freddie Mac Financed",
      "30.5% Projected IRR",
      "$47K/Unit Discount to Comps",
    ]} />
  );
}

function AnimatedMetric({ m, i }) {
  // Parse the numeric part out of the value string (e.g. "30.5%", "$37.4M", "2.14×", "+$250").
  // We animate a count-up from 0 to that target on reveal, keeping any prefix / suffix intact.
  const parsed = React.useMemo(() => {
    const s = String(m.val);
    const match = s.match(/-?\d+(?:[.,]\d+)?/);
    if (!match) return null;
    const numStr = match[0];
    const num = parseFloat(numStr.replace(",", "."));
    const decimals = (numStr.split(".")[1] || "").length;
    const idx = s.indexOf(numStr);
    return {
      prefix: s.slice(0, idx),
      suffix: s.slice(idx + numStr.length),
      num, decimals,
      hasComma: numStr.includes(","),
    };
  }, [m.val]);

  const ref = uR();
  const [shown, setShown] = uS(0);
  const [inView, setInView] = uS(false);

  uE(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  uE(() => {
    if (!inView || !parsed) return;
    const start = performance.now();
    const dur = 1400 + i * 90;
    const delay = 120 + i * 90;
    let raf;
    const tick = (t) => {
      const p = Math.max(0, Math.min(1, (t - start - delay) / dur));
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(parsed.num * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, i]);

  const display = parsed
    ? parsed.prefix +
      (Math.abs(shown) >= 1000 && !parsed.hasComma
        ? shown.toLocaleString("en-US", { maximumFractionDigits: parsed.decimals, minimumFractionDigits: parsed.decimals })
        : shown.toFixed(parsed.decimals)) +
      parsed.suffix
    : m.val;

  const isIRR = /IRR/i.test(m.label);

  return (
    <div ref={ref} className={`cell metric-cell${isIRR ? " metric-hero" : ""}`}
         style={{ animationDelay: `${i * 80}ms`, "--idx": i }}>
      <div className="label">
        {isIRR && <span className="metric-pulse" aria-hidden="true" />}
        {m.label}
      </div>
      <div className="val">{display}</div>
      <div className="sub">{m.sub}</div>
      <div className="metric-sweep" aria-hidden="true" />
    </div>
  );
}

function ExecSummary() {
  return (
    <section id="summary" className="bg-navy" data-screen-label="Executive Summary">
      <div className="container">
        <SectionHead n="01" eyebrow="Executive Summary" title={<><span className="italic" style={{ color: "#7FB3E6" }}>The numbers</span> at a glance.</>} />

        <div className="metrics-grid metrics-grid-dynamic reveal">
          {MR.exec.map((m, i) => (
            <AnimatedMetric key={i} m={m} i={i} />
          ))}
        </div>

        <div style={{ marginTop: 80 }}>
          <div className="sec-head reveal">
            <div className="num" style={{ opacity: 0 }}>·</div>
            <div className="title">
              <span className="eyebrow">Investment Highlights</span>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>Six reasons this deal works.</h2>
            </div>
          </div>

          <div className="highlights">
            {MR.highlights.map((h, i) => (
              <div className="highlight reveal" key={i}>
                <div className="idx">{String(i+1).padStart(2,"0")}</div>
                <div>
                  <h3>{h.title}</h3>
                  <p>{h.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pullquote() {
  return (
    <section className="bg-cream tight">
      <div className="container">
        <div className="two-col reveal" style={{ alignItems: "center" }}>
          <div>
            <span className="eyebrow eyebrow-dark">The Thesis</span>
            <div className="pullquote" style={{ marginTop: 24 }}>
              Buy below replacement cost. Renovate to the comp-set leader. Hold through a supply-constrained cycle.
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 300, lineHeight: 1.5, color: "var(--ink-soft)", marginBottom: 20 }}>
              Milana Reserve's current rents trail the Carrollwood comp set by roughly 6%. A targeted unit-turn program
              closes the gap and then some — with no new multifamily deliveries scheduled in the submarket through 2026.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, borderTop: "1px solid var(--rule)", paddingTop: 24, marginTop: 24 }}>
              <div>
                <div className="eyebrow eyebrow-dark">Entry Discount</div>
                <div className="big-num" style={{ marginTop: 8, fontSize: 56 }}>22.8%</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>Below comparable sales average</div>
              </div>
              <div>
                <div className="eyebrow eyebrow-dark">Rent Runway</div>
                <div className="big-num" style={{ marginTop: 8, fontSize: 56 }}>+$170</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>Blended premium per unit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, MarqueeBar, ExecSummary, Pullquote });
