// Risks, CTA, Footer, and Returns presentation

function RisksSection() {
  const risks = [
    { t: "General Real Estate", p: "Real estate investments may not generate income sufficient to meet expenses. Values may be affected by local conditions, competition, and interest rates." },
    { t: "Value-Add Execution", p: "The renovation program may cost more than budgeted, take longer to execute, or fail to achieve targeted $250/unit rent premiums." },
    { t: "Vacancy & Lease", p: "No assurance the Partnership will maintain targeted 95%+ occupancy. Tenant defaults and sustained vacancies may reduce distributions and impair debt service." },
    { t: "Leverage", p: "Leverage amplifies both returns and losses. Decreased cash flow may impair debt service, potentially resulting in default or foreclosure." },
    { t: "Market / Supply", p: "Future multifamily supply in the Carrollwood submarket could constrain rent growth and occupancy assumptions used in the underwriting." },
    { t: "Tax & Regulatory", p: "Florida real estate taxes may increase upon sale reassessment beyond the $2,297/unit estimate. Changes in law or zoning may adversely affect returns." },
  ];
  return (
    <section id="risks" className="bg-paper" data-screen-label="Risks">
      <div className="container">
        <SectionHead n="08" eyebrow="Risk Factors" title={<>Important <span className="italic">disclosures.</span></>} />

        <div style={{ padding: "20px 24px", borderLeft: "2px solid var(--gold)", marginBottom: 40, fontFamily: "var(--serif)", fontSize: 18, fontStyle: "italic", color: "var(--ink-soft)", fontWeight: 300 }} className="reveal">
          The purchase of units involves a high degree of risk. Consult your own tax, investment, and legal advisors before investing.
        </div>

        <div className="risks reveal">
          {risks.map((r, i) => (
            <div className="risk" key={i}>
              <div className="eyebrow eyebrow-dark" style={{ marginBottom: 12 }}>{String(i+1).padStart(2,"0")}</div>
              <h4>{r.t}</h4>
              <p>{r.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Disclaimer() {
  const sections = [
    {
      h: "No Offer or Solicitation",
      p: "This presentation is for informational and discussion purposes only. It does not constitute an offer to sell or the solicitation of an offer to purchase any security or interest in Milana Reserve or any related partnership, fund, or vehicle. Any such offer will be made only by means of a definitive Private Placement Memorandum (the \"PPM\"), Limited Partnership Agreement, and Subscription Agreement delivered to qualified recipients. In the event of a conflict between this presentation and the PPM, the PPM shall control.",
    },
    {
      h: "Accredited Investors Only",
      p: "The securities described herein have not been and will not be registered under the Securities Act of 1933, as amended, or under the securities laws of any state or jurisdiction. Interests will be offered and sold only to persons who are \"accredited investors\" within the meaning of Rule 501(a) of Regulation D under the Securities Act, and in reliance upon Rule 506(c) thereunder. Interests are subject to significant restrictions on transfer.",
    },
    {
      h: "Forward-Looking Statements",
      p: "Projections, targets, returns, and illustrative scenarios (including IRR, equity multiple, cash-on-cash, and exit value figures) are forward-looking and reflect the Sponsor's current views based on assumptions the Sponsor believes reasonable. Actual results may differ materially. No representation is made that any investor will or is likely to achieve results comparable to those shown. Past performance is not indicative of future results.",
    },
    {
      h: "Underwriting Assumptions",
      p: "Financial data, rent comparables, expense figures, and market information are derived from Sponsor underwriting (Freddie Mac Optigo scenario, February 2026), third-party reports, and sources deemed reliable but not independently verified. Assumptions include but are not limited to renovation scope and cost, lease-up pace, rent growth, exit cap rate, financing terms, and operating expenses. Any change to these assumptions may materially affect projected returns.",
    },
    {
      h: "Risk of Loss",
      p: "An investment in private real estate is speculative, illiquid, and involves a high degree of risk, including the risk of loss of the entire investment. Prospective investors should review the Risk Factors section above and the full risk disclosures in the PPM. Leverage, concentration in a single asset and single market (Tampa, FL), renovation execution, tenant demand, interest rate movement, insurance cost, and property tax reassessment are among the principal risks.",
    },
    {
      h: "No Tax or Legal Advice",
      p: "Nothing herein constitutes tax, legal, accounting, or investment advice. Each prospective investor should consult with its own tax, legal, and financial advisors regarding the merits, risks, and consequences of an investment, including tax consequences under U.S. federal, state, local, and non-U.S. law.",
    },
    {
      h: "Confidentiality",
      p: "This document is confidential and is furnished solely for the use of the intended recipient. It may not be reproduced, distributed, forwarded, or used in whole or in part for any purpose without the prior written consent of Blue Maple Investments. By accepting this presentation, the recipient agrees to return it upon request.",
    },
    {
      h: "Sponsor & Contact",
      p: "Blue Maple Investments serves as Sponsor and General Partner. All questions and requests for the PPM should be directed to Assaf Halperin, Managing Partner, Blue Maple Investments.",
    },
  ];

  return (
    <section id="disclaimer" className="bg-paper disclaimer" data-screen-label="Legal Disclaimer">
      <div className="container">
        <SectionHead n="·" eyebrow="Legal Disclaimer" title={<>Important <span className="italic">notices.</span></>} />

        <div className="reveal disclaimer-lede">
          The following notices apply to this entire presentation. Please read carefully before
          making any investment decision.
        </div>

        <div className="disclaimer-grid">
          {sections.map((s, i) => (
            <div className="disclaimer-item reveal" key={i} style={{ animationDelay: `${i * 40}ms` }}>
              <div className="disclaimer-idx">§{String(i + 1).padStart(2, "0")}</div>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </div>
          ))}
        </div>

        <div className="disclaimer-footnote reveal">
          <div className="disclaimer-footnote-rule" />
          <div className="disclaimer-footnote-text">
            © {new Date().getFullYear()} Blue Maple Investments. Milana Reserve · 8730 N Himes Avenue, Tampa, Florida.
            All rights reserved. Confidential — Accredited Investors Only.
          </div>
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section id="contact" className="bg-navy-deep cta" data-screen-label="Contact">
      <div className="container">
        <div className="reveal" style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <Leaf size={48} />
        </div>
        <span className="eyebrow reveal d1" style={{ display: "block", textAlign: "center", marginBottom: 20 }}>Next Steps</span>
        <h2 className="big reveal d2" style={{ color: "var(--cream)", maxWidth: "20ch", margin: "0 auto" }}>
          Next <em>step.</em>
        </h2>
        <p className="reveal d3" style={{ margin: "32px auto 0", maxWidth: "56ch", fontFamily: "var(--serif)", fontSize: 20, fontWeight: 300, color: "rgba(245,241,232,0.7)", lineHeight: 1.5, textAlign: "center" }}>
          Choose the path that fits. Sign the Limited Partnership Agreement directly, or meet the
          Blue Maple team first to walk the model and submarket together.
        </p>

        <div className="reveal d4" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, maxWidth: 820, margin: "56px auto 0" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--rule-dark)", background: "var(--navy-deep)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 14, color: "rgba(245,241,232,0.55)", zIndex: 2 }}>or</div>
          {[
            { n: "A", k: "Sign LPA", v: "Execute the Limited Partnership Agreement and complete accredited-investor verification to allocate directly." },
            { n: "B", k: "Meet the Blue Maple Team", v: "Book a one-on-one with the sponsor to review underwriting, the renovation program, and the Carrollwood submarket." },
          ].map((s, i) => (
            <div key={i} style={{ padding: "28px 28px 32px", border: "1px solid var(--rule-dark)", background: "rgba(245,241,232,0.02)", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", color: "var(--gold)" }}>{s.n}</div>
                <div style={{ flex: 1, height: 1, background: "var(--rule-dark)" }} />
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 26, color: "var(--cream)", marginBottom: 12, letterSpacing: "0.01em" }}>{s.k}</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(245,241,232,0.62)" }}>{s.v}</div>
            </div>
          ))}
        </div>

        <div className="reveal d4" style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginTop: 44 }}>
          <a className="btn" href="mailto:assaf@bluemapleinvestments.com?subject=Milana%20Reserve%20%E2%80%94%20LPA%20%26%20Meeting">
            assaf@bluemapleinvestments.com →
          </a>
        </div>

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, maxWidth: 620, margin: "80px auto 0", border: "1px solid var(--rule-dark)", borderRight: 0 }}>
          {[
            ["Min. Investment", "Contact for details"],
            ["Offering Type", "Private Placement"],
          ].map(([k, v], i) => (
            <div key={i} style={{ padding: "24px 20px", borderRight: "1px solid var(--rule-dark)" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,241,232,0.5)", marginBottom: 10 }}>{k}</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--cream)" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-deep footer">
      <div className="footer-inner">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--cream)", marginBottom: 16 }}>
            <Leaf size={24} />
            <span style={{ fontFamily: "var(--serif)", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 13 }}>Blue Maple Investments</span>
          </div>
          <p className="disclaimer">
            This presentation is strictly confidential and furnished solely for informational purposes. It is not an offer
            or solicitation to sell securities. All projections are forward-looking and subject to material risk. Intended
            for Qualified and Accredited Investors only.
          </p>
        </div>
        <div style={{ textAlign: "right", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,241,232,0.5)" }}>
          <div>© 2026 Blue Maple Investments</div>
          <div style={{ marginTop: 6 }}>Tampa, Florida · 8730 N Himes Ave</div>
          <div style={{ marginTop: 20, fontFamily: "var(--serif)", fontStyle: "italic", textTransform: "none", letterSpacing: 0, fontSize: 14, color: "var(--gold-soft)" }}>Milana Reserve</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { RisksSection, Disclaimer, Cta, Footer });
