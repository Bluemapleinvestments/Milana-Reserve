// Market & Comps

function TampaSkyline() {
  // Tampa skyline at night — downtown lights reflecting on the Hillsborough River.
  // Animated overlays add flickering window lights, a pulsing horizon glow, and
  // shimmering water highlights to bring the still photograph to life.
  const HERO = "assets/tampa-skyline.png";
  // Procedurally placed "window lights" — twinkle on the tower silhouettes.
  // Coordinates are % of the image. Photo is 1500x1000 (3:2).
  // Towers clustered roughly: 100 N Tampa (~22%), BoA Plaza (~28%), Park Tower (~36%),
  // SunTrust/Rivergate (~52%), Regions (~68%), right cluster (~78-88%).
  const lights = React.useMemo(() => {
    const TOWERS = [
      { x: [18, 26], y: [28, 55], d: 18 }, // left tower
      { x: [27, 35], y: [22, 58], d: 22 }, // BoA Plaza
      { x: [35, 43], y: [30, 60], d: 18 }, // Park Tower
      { x: [47, 58], y: [10, 62], d: 34 }, // SunTrust (tallest, peaked)
      { x: [60, 70], y: [25, 62], d: 24 }, // Regions building
      { x: [72, 82], y: [32, 60], d: 18 }, // right cluster
      { x: [83, 92], y: [42, 60], d: 10 }, // far right
    ];
    const out = [];
    let seed = 7;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    TOWERS.forEach((t) => {
      for (let i = 0; i < t.d; i++) {
        out.push({
          x: t.x[0] + rand() * (t.x[1] - t.x[0]),
          y: t.y[0] + rand() * (t.y[1] - t.y[0]),
          s: 1 + rand() * 1.8,
          dur: 2.4 + rand() * 5.5,
          del: rand() * 6,
          warm: rand() > 0.3,
        });
      }
    });
    return out;
  }, []);

  return (
    <div className="tampa-skyline reveal" style={{
      position: "relative",
      marginBottom: 72,
      background: "#050F23",
      border: "1px solid var(--rule-dark)",
      overflow: "hidden",
      aspectRatio: "1500 / 1000",
    }}>
      {/* Base photograph */}
      <div className="tampa-photo" style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("${HERO}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        filter: "saturate(1.08) contrast(1.06) brightness(1)",
        transform: "scale(1.04)",
      }} />

      {/* Flickering window lights */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none"
           style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", mixBlendMode: "screen" }}>
        {lights.map((l, i) => (
          <circle key={i} cx={l.x} cy={l.y} r={l.s * 0.15}
                  fill={l.warm ? "#FFD38A" : "#BDE0FF"}
                  className="tampa-light"
                  style={{ animationDuration: `${l.dur}s`, animationDelay: `${l.del}s` }} />
        ))}
      </svg>

      {/* Water shimmer — diagonal shine sweeping across the reflection area */}
      <div className="tampa-river" style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "48%",
        background: "linear-gradient(110deg, transparent 0%, transparent 30%, rgba(255,210,140,0.22) 46%, rgba(189,224,255,0.14) 54%, transparent 70%, transparent 100%)",
        mixBlendMode: "screen",
        pointerEvents: "none",
      }} />

      {/* Second water ripple — slower, offset */}
      <div className="tampa-river tampa-river-2" style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "40%",
        background: "linear-gradient(100deg, transparent 0%, transparent 40%, rgba(140,200,255,0.10) 50%, transparent 62%, transparent 100%)",
        mixBlendMode: "screen",
        pointerEvents: "none",
      }} />

      {/* Drifting clouds across the sky */}
      <div className="tampa-clouds" aria-hidden="true" />

      {/* Car light trails along the teal bridge (~49-54% vertical) */}
      <svg viewBox="0 0 1500 1000" preserveAspectRatio="none" className="tampa-traffic"
           style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", mixBlendMode: "screen" }}>
        <defs>
          <linearGradient id="tampaHeadlight" x1="0" x2="1">
            <stop offset="0%" stopColor="#FFF6D6" stopOpacity="0" />
            <stop offset="60%" stopColor="#FFF6D6" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFF6D6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tampaTaillight" x1="1" x2="0">
            <stop offset="0%" stopColor="#FF7A5C" stopOpacity="0" />
            <stop offset="60%" stopColor="#FF5A3C" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FF5A3C" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Eastbound (left → right) — warm headlights along bridge deck */}
        <g className="car-lane car-lane-ew">
          <rect x="-180" y="510" width="160" height="3" fill="url(#tampaHeadlight)" />
        </g>
        <g className="car-lane car-lane-ew car-lane-ew2">
          <rect x="-260" y="516" width="130" height="2.5" fill="url(#tampaHeadlight)" />
        </g>
        {/* Westbound (right → left) — red taillights */}
        <g className="car-lane car-lane-we">
          <rect x="1500" y="525" width="170" height="3" fill="url(#tampaTaillight)" />
        </g>
        <g className="car-lane car-lane-we car-lane-we2">
          <rect x="1500" y="531" width="120" height="2.5" fill="url(#tampaTaillight)" />
        </g>
      </svg>

      {/* Aircraft warning lights on tower tops */}
      <div className="tampa-beacon" style={{ left: "52%", top: "9%" }} />
      <div className="tampa-beacon tampa-beacon-2" style={{ left: "30%", top: "21%" }} />
      <div className="tampa-beacon tampa-beacon-3" style={{ left: "66%", top: "25%" }} />
      <div className="tampa-beacon tampa-beacon-4" style={{ left: "82%", top: "31%" }} />

      {/* Slow searchlight beam from downtown */}
      <div className="tampa-searchlight" aria-hidden="true" />

      {/* Editorial tint — unifies the photo with the rest of the navy palette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(6,14,34,0.20) 0%, rgba(6,14,34,0.05) 40%, rgba(6,14,34,0.55) 100%)",
        pointerEvents: "none",
      }} />
      {/* Side vignettes for caption legibility */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, rgba(6,14,34,0.55) 0%, transparent 28%, transparent 72%, rgba(6,14,34,0.35) 100%)",
        pointerEvents: "none",
      }} />

      {/* Live indicator */}
      <div style={{
        position: "absolute", left: 28, top: 20,
        display: "flex", alignItems: "center", gap: 10,
        fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
        color: "rgba(245,241,232,0.75)", fontFamily: "var(--mono)",
      }}>
        <span className="tampa-pulse" style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#E8B86A",
          boxShadow: "0 0 10px rgba(232,184,106,0.9)",
        }} />
        Downtown · Live
      </div>

      {/* Caption overlay */}
      <div style={{
        position: "absolute",
        left: 28, bottom: 22,
        display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap",
      }}>
        <div style={{
          fontFamily: "var(--serif)",
          fontSize: 30, fontWeight: 400, fontStyle: "italic",
          color: "var(--cream)", letterSpacing: 0.3,
          textShadow: "0 2px 16px rgba(0,0,0,0.45)",
        }}>
          Tampa, Florida
        </div>
        <div style={{ width: 60, height: 1, background: "var(--gold)", opacity: 0.6 }} />
        <div style={{
          fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
          color: "rgba(245,241,232,0.7)",
        }}>
          3.3M MSA · #4 Employment Growth
        </div>
      </div>
      <div style={{
        position: "absolute",
        right: 28, top: 20,
        fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
        color: "rgba(245,241,232,0.55)",
        fontFamily: "var(--mono)",
      }}>
        27.9506° N  ·  82.4572° W
      </div>
    </div>
  );
}

function MarketSection() {
  return (
    <section id="market" className="bg-navy" data-screen-label="Market">
      <div className="container">
        <SectionHead n="04" eyebrow="Market Overview"
          title={<>Tampa. <span className="italic" style={{color:"#7FB3E6"}}>Built to grow.</span></>} />

        <TampaSkyline />

        <div className="two-col reveal" style={{ alignItems: "start", marginBottom: 80 }}>
          <div>
            <p className="lede" style={{ color: "rgba(245,241,232,0.8)" }}>
              The Tampa MSA — 3.3M residents — posted the <em>4th fastest employment growth</em> and <em>8th fastest
              population growth</em> among the Top 30 U.S. metros over the past five years. Forecast to add
              <em> 168,810 new residents</em> and <em>63,610 new jobs</em> by 2031.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {[
              { v: "3.3M", l: "MSA Population" },
              { v: "#4", l: "Employment Growth" },
              { v: "+5.0%", l: "Pop. Forecast (5Y)" },
              { v: "+4.1%", l: "Job Growth (5Y)" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "20px 20px", borderTop: "1px solid var(--rule-dark)", borderLeft: i % 2 === 1 ? "1px solid var(--rule-dark)" : "0" }}>
                <div className="big-num" style={{ fontSize: 54 }}>{s.v}</div>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,0.55)", marginTop: 10 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rankings */}
        <div className="reveal" style={{ marginBottom: 80 }}>
          <span className="eyebrow">2024 National Rankings</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: "var(--rule-dark)", marginTop: 24, border: "1px solid var(--rule-dark)" }}>
            {MR.rankings.map((r, i) => (
              <div key={i} style={{ background: "var(--navy-900)", padding: "32px 24px" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 56, color: "var(--gold)", lineHeight: 1 }}>{r.rank}</div>
                <div style={{ fontSize: 14, marginTop: 14, color: "var(--cream)", lineHeight: 1.35 }}>{r.text}</div>
                <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,241,232,0.5)", marginTop: 14 }}>{r.src}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sectors + rental fundamentals */}
        <div className="two-col reveal">
          <div>
            <span className="eyebrow">Employment by Sector · Tampa MSA</span>
            <div style={{ marginTop: 20 }}>
              {MR.sectors.map((s, i) => (
                <Sector key={i} name={s.name} pct={s.pct} delay={i*0.1} />
              ))}
            </div>
          </div>
          <div>
            <span className="eyebrow">Tampa Rental Fundamentals</span>
            <table className="table" style={{ marginTop: 16 }}>
              <thead>
                <tr><th>Metric</th><th className="num">Tampa</th><th className="num">National</th></tr>
              </thead>
              <tbody>
                <tr><td>Avg Rent · Class B</td><td className="num">$1,580</td><td className="num">$1,510</td></tr>
                <tr><td>Rent Growth YoY</td><td className="num" style={{color:"#C9A961"}}>+4.2%</td><td className="num">+2.8%</td></tr>
                <tr><td>Vacancy</td><td className="num">4.8%</td><td className="num">6.1%</td></tr>
                <tr><td>12-Mo Absorption</td><td className="num">2,840 u</td><td className="num">—</td></tr>
                <tr><td>12-Mo Supply</td><td className="num">3,120 u</td><td className="num">—</td></tr>
                <tr className="subject"><td>Carrollwood Vacancy</td><td className="num">3.2%</td><td className="num">—</td></tr>
                <tr className="subject"><td>Carrollwood Rent Growth YoY</td><td className="num">+5.1%</td><td className="num">—</td></tr>
              </tbody>
            </table>
            <div style={{ marginTop: 24, padding: "20px 24px", border: "1px solid var(--gold)", background: "rgba(201,169,97,0.08)" }}>
              <div className="eyebrow" style={{ color: "var(--gold)" }}>Carrollwood Pipeline</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 48, color: "var(--gold)", margin: "8px 0", lineHeight: 1 }}>Zero</div>
              <div style={{ fontSize: 13, color: "rgba(245,241,232,0.75)" }}>new multifamily deliveries announced through 2026</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sector({ name, pct, delay = 0 }) {
  const [rev, setRev] = uS2(false);
  const ref = uR2(null);
  uE2(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRev(true); io.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div className="sector-row" ref={ref}>
      <div className="name" style={{ color: "rgba(245,241,232,0.85)" }}>{name}</div>
      <div className="pct">{pct}%</div>
      <div className="bar"><div className="fill" style={{ width: rev ? `${pct * 4}%` : 0, transitionDelay: `${delay}s` }} /></div>
    </div>
  );
}

function LocationSection() {
  return (
    <section className="bg-navy-deep" data-screen-label="Location">
      <div className="container">
        <SectionHead n="·" eyebrow="Location" title={<>Within eighteen <span className="italic" style={{color:"#7FB3E6"}}>minutes.</span></>} />

        <div className="reveal" style={{ marginBottom: 28 }}>
          <LocationMap />
        </div>

        <div className="two-col" style={{ alignItems: "start" }}>
          <div className="reveal">
            <p className="lede" style={{ color: "rgba(245,241,232,0.85)" }}>
              Milana Reserve sits at the center of Tampa's healthcare employment corridor — with
              <em> 2,200+ hospital beds</em> inside an 18-minute drive.
            </p>
          </div>
          <div className="reveal d1">
            <table className="table">
              <thead>
                <tr><th>Hospital / Facility</th><th className="num">Miles</th><th className="num">Drive</th><th className="num">Beds</th></tr>
              </thead>
              <tbody>
                {MR.hospitals.map((h, i) => (
                  <tr key={i}>
                    <td>{h.name}</td>
                    <td className="num">{h.mi}</td>
                    <td className="num">{h.min} min</td>
                    <td className="num">{h.beds || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompsSection() {
  return (
    <section id="comps" className="bg-cream" data-screen-label="Comparables">
      <div className="container">
        <SectionHead n="05" eyebrow="Rent & Sales Comparables"
          title={<>Where Milana <span className="italic">trades — and where it should.</span></>} />

        <div className="reveal" style={{ marginBottom: 80 }}>
          <h3 style={{ marginBottom: 6 }}>Rent Comparables</h3>
          <div className="kicker" style={{ marginBottom: 24 }}>Avg rent by unit size — Carrollwood competitive set</div>
          <div style={{ background: "var(--paper)", padding: 32, border: "1px solid var(--rule)" }}>
            <RentScatter />
          </div>
          <p style={{ marginTop: 24, fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 22, fontWeight: 300, color: "var(--ink-soft)", maxWidth: "60ch" }}>
            Milana's in-place average rent of $1,476 trails comparable properties averaging $1,620+. Post-renovation
            market rents of $1,646 represent a <span style={{ color: "var(--gold)", fontWeight: 500, fontStyle: "normal", fontFamily: "var(--sans)" }}>+$170/unit blended premium</span> opportunity.
          </p>
        </div>

        <div className="reveal">
          <h3 style={{ marginBottom: 6 }}>Sales Comparables</h3>
          <div className="kicker" style={{ marginBottom: 24 }}>Price per unit · Tampa MSA, similar vintage</div>
          <div style={{ background: "var(--paper)", padding: 32, border: "1px solid var(--rule)" }}>
            <PPUBars />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, marginTop: 40, border: "1px solid var(--rule)", borderRight: 0 }}>
            {[
              { v: "$159,914", l: "Milana Reserve · Price/Unit" },
              { v: "$208,920", l: "Comp Average · Price/Unit" },
              { v: "−23.5%", l: "Discount to Comps", hi: true },
            ].map((s, i) => (
              <div key={i} style={{ padding: "32px 28px", borderRight: "1px solid var(--rule)" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 48, color: s.hi ? "var(--gold)" : "var(--navy-900)", lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginTop: 12 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MarketSection, LocationSection, CompsSection });
