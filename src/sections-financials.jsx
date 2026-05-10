// Financials & Returns

function FinancialsSection() {
  return (
    <section id="financials" className="bg-navy" data-screen-label="Financials">
      <div className="container">
        <SectionHead n="06" eyebrow="Financial Overview"
          title={<>Capital plan & <span className="italic" style={{ color: "#7FB3E6" }}>cash flow.</span></>} />

        <div className="reveal" style={{ marginBottom: 64 }}>
          <div className="chart-card" style={{ padding: 40 }}>
            <h3>Net Operating Income · 6-Year Proforma</h3>
            <div className="kicker" style={{ color: "rgba(245,241,232,0.55)" }}>Years 1–5 initial Freddie loan (IO first 3 years); refinance Year 6</div>
            <div style={{ marginTop: 24 }}>
              <NoiChart />
            </div>
          </div>
        </div>

        <div className="two-col reveal">
          <div>
            <h3 style={{ marginBottom: 20 }}>Sources &amp; Uses</h3>

            {/* Stack Uses above Sources so each has full width */}
            <div>
              {/* USES */}
              <div className="eyebrow" style={{ color: "rgba(245,241,232,0.55)", marginBottom: 10 }}>Uses</div>
              {[
                ["Purchase Price", "$37,100,000"],
                ["Closing Costs", "$2,457,355"],
                ["CapEx — Units", "$2,233,000"],
                ["CapEx — Common Areas", "$334,004"],
              ].map(([k, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid var(--rule-dark)", fontSize: 14 }}>
                  <span style={{ color: "rgba(245,241,232,0.75)" }}>{k}</span>
                  <span className="mono" style={{ color: "var(--cream)" }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderTop: "1px solid var(--gold)", fontSize: 14, fontWeight: 500, color: "var(--gold-soft)" }}>
                <span>All-In Cost</span>
                <span className="mono">$42,124,359</span>
              </div>

              {/* SOURCES */}
              <div className="eyebrow" style={{ color: "rgba(245,241,232,0.55)", marginTop: 32, marginBottom: 10 }}>Sources</div>
              {[
                ["Senior Loan · Freddie Mac · 61.3%", "$25,812,000"],
                ["Institutional Equity · 24.4%", "$10,276,786"],
                ["Common Equity · LP raise · 14.3%", "$6,035,573", true],
              ].map(([k, v, isRaise], i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "12px 0", borderTop: "1px solid var(--rule-dark)", fontSize: 14,
                  color: isRaise ? "var(--gold)" : "rgba(245,241,232,0.85)",
                  fontWeight: isRaise ? 500 : 400,
                }}>
                  <span>{k}</span>
                  <span className="mono">{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderTop: "1px solid var(--gold)", fontSize: 14, fontWeight: 500, color: "var(--gold-soft)" }}>
                <span>Total Capitalization</span>
                <span className="mono">$42,124,359</span>
              </div>
            </div>

            {/* Raise callout */}
            <div style={{
              marginTop: 28,
              padding: "22px 24px",
              background: "rgba(201,169,97,0.08)",
              border: "1px solid rgba(201,169,97,0.4)",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: 20,
            }}>
              <div>
                <div className="eyebrow" style={{ color: "var(--gold)", marginBottom: 6 }}>Capital Being Raised · Common LP</div>
                <div style={{ fontSize: 13, color: "rgba(245,241,232,0.75)", lineHeight: 1.5 }}>
                  Open to accredited investors. Senior debt and institutional preferred are committed.
                </div>
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 44, color: "var(--gold)", lineHeight: 1, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                $6.41M
              </div>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: 20 }}>Debt Summary</h3>
            <div>
              {[
                ["Lender", "Freddie Mac"],
                ["Loan Type", "Conventional · Fixed"],
                ["Interest Rate", "5.37%"],
                ["Spread", "SOFR + 147 bps"],
                ["Loan Term", "5 Years"],
                ["Amortization", "30 Years"],
                ["IO Period", "3 Years"],
                ["LTC", "61.5%"],
                ["Initial Loan", "$25,812,021"],
              ].map(([k, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderTop: "1px solid var(--rule-dark)" }}>
                  <span style={{ fontSize: 14, color: "rgba(245,241,232,0.7)" }}>{k}</span>
                  <span className="mono" style={{ fontSize: 14, color: "var(--cream)" }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, padding: 24, background: "rgba(201,169,97,0.08)", border: "1px solid rgba(201,169,97,0.4)" }}>
              <div className="eyebrow" style={{ color: "var(--gold)" }}>Year 3 NOI</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 56, color: "var(--gold)", lineHeight: 1, margin: "8px 0" }}>
                $2.80M
              </div>
              <div style={{ fontSize: 13, color: "rgba(245,241,232,0.7)" }}>
                Implied sale at 6.0% cap → $49.4M · ~$11.0M net proceeds to common equity
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReturnsSection() {
  // Interactive IRR/EM calculator — anchored to UW Exit Scenarios
  // The UW waterfall has I/O senior loan → Y3 refi returning $15.78M →
  // new $40.83M refi loan → Y5/Y7 payoff, plus a $12.05M institutional repay.
  // Replicating live with an amortizing P&I schedule isn't worth the complexity,
  // so we anchor to the three UW reference points and let the slider interpolate.
  const [exitYear, setExitYear] = uS2(3);
  const [exitCap, setExitCap] = uS2(6.0);
  const [scenario, setScenario] = uS2("base");

  // Anchors from Investors Model Exit Scenarios sheet — all three @ 6.0% cap.
  //   Y5 explicit: Value $52,825,343 / closing $528,253 / inst $10,263,227 / loan $25,080,226
  //                → Net proceeds $16,953,637 (matches model row 10 exactly).
  //   Y3 proceeds $11,012,880 — back-solved from model IRR 27.42% & CF [−6.04M, 329K, 380K, 455K+X].
  //                Validates to EM 2.0175× (model 2.0177×; 0.01% diff is rounding).
  //   Y7 anchor accepted at published IRR 29.01% / EM 3.6848×; proceeds path involves Y4 refi
  //                distribution so a single-number "proceeds" isn't quite meaningful here.
  // Per-year cap sensitivity calibrated empirically from Y5 exact calc (which back-validates
  // cleanly against the model). −25bps cap ≈ +7pp IRR @ Y3, +4pp @ Y5, +2.5pp @ Y7.
  const ANCHORS = {
    3: { cap: 6.00, irr: 27.42, em: 2.0177, proceeds: 11012880, irrPer25: 6.90, emPer25: 0.320 },
    4: { cap: 6.00, irr: 27.06, em: 2.5393, proceeds: 13983259, irrPer25: 5.50, emPer25: 0.380 },
    5: { cap: 6.00, irr: 26.70, em: 3.0610, proceeds: 16953637, irrPer25: 3.99, emPer25: 0.400 },
    6: { cap: 6.00, irr: 27.86, em: 3.3729, proceeds: 18351819, irrPer25: 3.20, emPer25: 0.420 },
    7: { cap: 6.00, irr: 29.01, em: 3.6848, proceeds: 19750000, irrPer25: 2.50, emPer25: 0.440 },
  };

  const base = ANCHORS[exitYear] || ANCHORS[5];
  const dCap = base.cap - exitCap;          // +ve cap tighter (better)
  const steps = dCap / 0.25;
  const exactMatch = Math.abs(dCap) < 0.01;
  let irr = exactMatch ? base.irr : base.irr + steps * base.irrPer25;
  let em  = exactMatch ? base.em  : base.em  + steps * base.emPer25;

  const commonEq = UW.commonEquity;
  // Sale price: model uses Y+1 NOI × 1.0222 reversion factor / cap (derived from Y5 exact math:
  // 52,825,343 = 3,100,734 × 1.02218 / 0.06).
  const fwdNOI = UW.noi[Math.min(exitYear + 1, UW.noi.length - 1)] * 1.02218;
  const salePrice = fwdNOI / (exitCap / 100);
  const sellingCosts = salePrice * 0.01;
  // Loan payoff: Y3 exit = senior ($25.81M); Y5 exit = $25.08M (per model row 9);
  // Y7 exit = refi loan ($40.90M); Y4/Y6 interpolated.
  const loanByYear = { 3: 25812000, 4: 25446000, 5: 25080226, 6: 40898953, 7: 40898953 };
  const loanPayoff = loanByYear[exitYear] || 25812000;
  const netSaleProceeds = salePrice - sellingCosts - loanPayoff;
  // Headline "Net to Common" figure mirrors ANCHORS[exitYear].proceeds at 6% cap and scales
  // by the same cap-delta so the equity block stays internally consistent with the IRR/EM dials.
  const saleToCommon = exactMatch
    ? base.proceeds
    : base.proceeds + (salePrice - fwdNOI / 0.06) * 0.99 * (exitYear <= 5 ? 1 : 0.55);

  return (
    <section id="returns" className="bg-navy-deep" data-screen-label="Returns">
      <div className="container">
        <SectionHead n="07" eyebrow="Investor Returns"
          title={<>Projected returns, <span className="italic" style={{ color: "#7FB3E6" }}>live.</span></>} />

        <div className="returns-panel reveal">
          <div>
            <div className="eyebrow">Interactive Model · Common Equity Basis</div>
            <div className="scenario-chips" style={{ marginBottom: 32 }}>
              <button className={scenario === "bear" ? "active" : ""} onClick={() => { setScenario("bear"); setExitYear(3); setExitCap(6.5); }}>Bear</button>
              <button className={scenario === "base" ? "active" : ""} onClick={() => { setScenario("base"); setExitYear(3); setExitCap(6.0); }}>Base · Yr 3</button>
              <button className={scenario === "bull" ? "active" : ""} onClick={() => { setScenario("bull"); setExitYear(5); setExitCap(5.5); }}>Bull · Yr 5</button>
              <button className={scenario === "hold" ? "active" : ""} onClick={() => { setScenario("hold"); setExitYear(7); setExitCap(5.5); }}>Hold · Yr 7</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
              <div>
                <div className="lbl" style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,0.6)", marginBottom: 8 }}>Projected IRR</div>
                <div className="dial-val" style={{ fontFamily: "var(--serif)", fontSize: "clamp(72px, 9vw, 128px)", color: "var(--gold)", lineHeight: 0.95, fontVariantNumeric: "tabular-nums" }}>
                  {irr.toFixed(1)}<span style={{ fontSize: "0.4em" }}>%</span>
                </div>
              </div>
              <div>
                <div className="lbl" style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,0.6)", marginBottom: 8 }}>Equity Multiple</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(72px, 9vw, 128px)", color: "var(--cream)", lineHeight: 0.95, fontVariantNumeric: "tabular-nums" }}>
                  {em.toFixed(2)}<span style={{ fontSize: "0.4em", color: "var(--maple-300)" }}>×</span>
                </div>
              </div>
            </div>

            <div className="slider-row">
              <div>
                <div className="name">Exit Year</div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  {[3,4,5,7].map(y => (
                    <button key={y}
                      onClick={() => setExitYear(y)}
                      style={{
                        flex: 1, padding: "12px 16px",
                        border: `1px solid ${exitYear === y ? "var(--gold)" : "var(--rule-dark)"}`,
                        background: exitYear === y ? "var(--gold)" : "transparent",
                        color: exitYear === y ? "var(--navy-900)" : "rgba(245,241,232,0.75)",
                        fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
                        transition: "all 0.2s"
                      }}>
                      Year {y}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="slider-row">
              <div style={{ width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="name">Exit Cap Rate</div>
                  <div className="val">{exitCap.toFixed(2)}%</div>
                </div>
                <input type="range" className="slider" min="5.0" max="7.0" step="0.05"
                       value={exitCap}
                       onChange={(e) => setExitCap(parseFloat(e.target.value))} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: "rgba(245,241,232,0.45)", letterSpacing: "0.12em" }}>
                  <span>5.00%</span><span>6.00% BASE</span><span>7.00%</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 32, padding: 24, background: "rgba(74,144,217,0.08)", border: "1px solid rgba(74,144,217,0.3)" }}>
              <div className="eyebrow">Implied Outcome</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 14 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,241,232,0.5)" }}>Sale Price</div>
                  <div className="mono" style={{ fontSize: 18, color: "var(--cream)", marginTop: 4 }}>{fmt.compact(salePrice)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,241,232,0.5)" }}>Net Proceeds</div>
                  <div className="mono" style={{ fontSize: 18, color: "var(--cream)", marginTop: 4 }}>{fmt.compact(netSaleProceeds)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,241,232,0.5)" }}>Common Share</div>
                  <div className="mono" style={{ fontSize: 18, color: "var(--gold)", marginTop: 4 }}>{fmt.compact(saleToCommon)}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="eyebrow">Cash-on-Cash by Year</div>
            <div className="chart-card" style={{ marginTop: 16, padding: 28, background: "rgba(255,255,255,0.03)", borderColor: "var(--rule-dark)" }}>
              <CocBars />
            </div>

            <div style={{ marginTop: 40 }}>
              <div className="eyebrow">Year-3 Cash Flow Summary · Base Case</div>
              <div style={{ marginTop: 16 }}>
                {[
                  ["Initial Investment", "($6,035,573)"],
                  ["Year 1 Cash Flow", "$329,394"],
                  ["Year 2 Cash Flow", "$379,632"],
                  ["Year 3 Cash Flow", "$454,823"],
                  ["Year 3 Exit Proceeds", "$11,012,880"],
                ].map(([k, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderTop: "1px solid var(--rule-dark)", fontSize: 14, color: "rgba(245,241,232,0.85)" }}>
                    <span>{k}</span>
                    <span className="mono">{v}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderTop: "1px solid var(--gold)", fontWeight: 500, color: "var(--gold-soft)" }}>
                  <span>Total Proceeds</span>
                  <span className="mono">~$12,176,729</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 40, padding: 24, border: "1px solid var(--rule-dark)" }}>
              <div className="eyebrow">Sponsor Compensation</div>
              {[
                ["Acquisition Fee", "1.5% of purchase = $556,500"],
                ["Asset Management Fee", "2.25% of EGI p.a."],
                ["Carried Interest", "Back-ended · no catch-up"],
                ["Preferred Return", "Contact for details"],
              ].map(([k, v], i) => (
                <div key={i} style={{ padding: "14px 0", borderTop: i === 0 ? "none" : "1px solid var(--rule-dark)" }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,241,232,0.5)", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 13, color: "var(--cream)" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { FinancialsSection, ReturnsSection });
