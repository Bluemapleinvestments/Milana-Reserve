// Strategy + Property + Before/After sections

function Strategy() {
  return (
    <section id="strategy" className="bg-paper" data-screen-label="Strategy">
      <div className="container">
        <SectionHead n="02" eyebrow="Value Creation" title={<>A three-part <span className="italic">value-add</span> plan.</>} />

        <div className="strategy reveal">
          {MR.strategy.map((s, i) => (
            <div className="card" key={i}>
              <div className="head">
                <div className="n">{s.n}</div>
                <div className="tag">{s.tag}</div>
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ul>
                {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
              <div className="kpi">
                <div className="v">{s.kpi.v}</div>
                <div className="l">{s.kpi.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  return (
    <section className="bg-cream">
      <div className="container">
        <SectionHead n="·" eyebrow="Interior Renovation" title={<>From original <span className="italic">to premium.</span></>} />

        <div className="reveal" style={{ marginBottom: 24 }}>
          <BeforeAfter
            before={MR.photos.kitchen}
            after={MR.photos.staged}
            beforeLabel="Original Interior (2009)"
            afterLabel="Post-Renovation"
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 40 }} className="reveal">
          {[
            { img: MR.photos.stagedWide, cap: "Staged interior · post-renovation" },
            { img: MR.photos.pool, cap: "Pool & amenity courtyard" },
            { img: MR.photos.fitness, cap: "Modernized fitness center" },
          ].map((p, i) => (
            <figure key={i} style={{ margin: 0 }}>
              <div style={{ aspectRatio: "4/3", backgroundImage: `url(${p.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <figcaption style={{ marginTop: 10, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)" }}>
                {p.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertySlab() {
  return (
    <section style={{ padding: 0 }}>
      <div className="slab" style={{ backgroundImage: `url(${MR.photos.exterior2})` }}>
        <div className="caption">
          <div className="eyebrow" style={{ color: "var(--gold-soft)", marginBottom: 12 }}>The Property</div>
          <div style={{ fontSize: "clamp(28px, 3.2vw, 52px)", maxWidth: "22ch" }}>
            Twelve residential buildings across 13 acres — lakeside, shaded, Carrollwood proper.
          </div>
        </div>
      </div>
    </section>
  );
}

function PropertySummary() {
  const specs = [
    ["Address", "8730 N Himes Ave, Tampa FL"],
    ["Asset Type", "Multifamily · Garden Style"],
    ["Year Built / Reno", "1985 / 2009"],
    ["Total Units", "232"],
    ["Rentable SF", "170,920 SF"],
    ["Avg Unit Size", "737 SF"],
    ["Land Area", "13.05 Acres"],
    ["Occupancy", "95.7% (Aug 2025)"],
    ["Stories", "3"],
    ["Buildings", "12 Residential + 1 Clubhouse"],
    ["Parking", "347 spaces"],
    ["Flood Zone", "X (Low Risk)"],
  ];
  return (
    <section id="property" className="bg-paper" data-screen-label="Property Summary">
      <div className="container">
        <SectionHead n="03" eyebrow="Property Summary" title={<>Specs & <span className="italic">unit mix.</span></>} />

        <div className="two-col">
          <div className="reveal">
            <h3 style={{ marginBottom: 24 }}>Site Description</h3>
            <dl className="spec-list">
              {specs.map(([k, v], i) => (
                <div className="spec-row" key={i}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal d1">
            <h3 style={{ marginBottom: 20 }}>232 Units · 5 Floor Plans</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Units</th><th>Type</th><th className="num">Avg SF</th><th className="num">Current</th><th className="num">Market</th>
                </tr>
              </thead>
              <tbody>
                {MR.unitMix.map((r, i) => (
                  <tr key={i}>
                    <td className="num">{r.units}</td>
                    <td>{r.type}</td>
                    <td className="num">{r.sf}</td>
                    <td className="num">${r.cur.toLocaleString()}</td>
                    <td className="num" style={{ color: "var(--gold)", fontWeight: 500 }}>${r.mkt.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="total">
                  <td className="num">232</td>
                  <td>Total / Avg</td>
                  <td className="num">737</td>
                  <td className="num">$1,476</td>
                  <td className="num" style={{ color: "var(--gold)" }}>$1,646</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const P = MR.photos;
  const tiles = [
    { img: P.exterior,   span: "6 / span 6", row: "span 2", cap: "Exterior" },
    { img: P.pool,       span: "1 / span 3", row: "span 2", cap: "Pool" },
    { img: P.clubhouse,  span: "4 / span 2", row: "span 1", cap: "Clubhouse" },
    { img: P.fitness,    span: "4 / span 2", row: "span 1", cap: "Fitness" },
    { img: P.bedroom,    span: "1 / span 2", row: "span 1", cap: "Bedroom" },
    { img: P.bathroom,   span: "3 / span 2", row: "span 1", cap: "Bathroom (pre-reno)" },
    { img: P.living1,    span: "5 / span 4", row: "span 2", cap: "Living · Pre-reno" },
    { img: P.leasing,    span: "9 / span 4", row: "span 2", cap: "Leasing Office" },
    { img: P.exteriorSide,span: "1 / span 4", row: "span 1", cap: "Exterior Side" },
  ];
  return (
    <section className="bg-cream tight">
      <div className="container">
        <div className="reveal" style={{ marginBottom: 40 }}>
          <span className="eyebrow eyebrow-dark">Property & Interiors</span>
          <h2 style={{ marginTop: 8 }}>Photography</h2>
        </div>
        <div className="gallery reveal">
          {tiles.map((t, i) => (
            <div key={i} className="g" data-cap={t.cap}
                 style={{ gridColumn: t.span, gridRow: t.row, backgroundImage: `url(${t.img})` }}/>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Strategy, BeforeAfterSection, PropertySlab, PropertySummary, Gallery });
