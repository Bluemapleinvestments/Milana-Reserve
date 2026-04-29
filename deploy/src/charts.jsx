// Charts — pure SVG, animated on reveal

const { useEffect: uE2, useRef: uR2, useState: uS2 } = React;

// ===== NOI Forecast: area + bars =====
function NoiChart() {
  const rows = UW.years.slice(0, 7).map((y, i) => ({
    y: i === 0 ? "T-12" : UW.calYears[i],
    egi: UW.egi[i],
    exp: UW.opex[i],
    noi: UW.noi[i],
  }));
  const W = 900, H = 360, pad = { t: 30, r: 40, b: 52, l: 70 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;

  const maxY = 6_000_000;
  const x = (i) => pad.l + (i / (rows.length - 1)) * iw;
  const y = (v) => pad.t + (1 - v / maxY) * ih;

  // area path for EGI
  const areaPath =
    `M ${x(0)} ${y(0)} ` +
    rows.map((r, i) => `L ${x(i)} ${y(r.egi)}`).join(" ") +
    ` L ${x(rows.length - 1)} ${y(0)} Z`;

  const noiPath = rows.map((r, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(r.noi)}`).join(" ");
  const expPath = rows.map((r, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(r.exp)}`).join(" ");

  const [revealed, setRev] = uS2(false);
  const svgRef = uR2(null);
  uE2(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRev(true); io.disconnect(); }
    }, { threshold: 0.3 });
    if (svgRef.current) io.observe(svgRef.current);
    return () => io.disconnect();
  }, []);

  const ticks = [0, 1_000_000, 2_000_000, 3_000_000, 4_000_000, 5_000_000, 6_000_000];

  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="egiG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A90D9" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#4A90D9" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="noiG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A961" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#C9A961" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* grid */}
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)}
                stroke="rgba(255,255,255,0.08)" strokeDasharray="2 3" />
          <text x={pad.l - 14} y={y(t) + 4} fill="rgba(245,241,232,0.5)"
                fontFamily="JetBrains Mono" fontSize="10" textAnchor="end">
            {t === 0 ? "$0" : "$" + (t / 1e6).toFixed(0) + "M"}
          </text>
        </g>
      ))}
      {/* EGI area */}
      <path d={areaPath} fill="url(#egiG)"
            style={{ opacity: revealed ? 1 : 0, transition: "opacity 1.2s ease 0.3s" }}/>
      {/* EGI line */}
      <path d={rows.map((r,i) => `${i===0?"M":"L"} ${x(i)} ${y(r.egi)}`).join(" ")}
            fill="none" stroke="#4A90D9" strokeWidth="1.5" strokeOpacity="0.6"
            style={{ strokeDasharray: 2000, strokeDashoffset: revealed ? 0 : 2000,
                     transition: "stroke-dashoffset 1.6s ease 0.1s" }}/>
      {/* Exp line */}
      <path d={expPath} fill="none" stroke="#B86A5C" strokeWidth="1.4"
            strokeDasharray="4 4"
            style={{ opacity: revealed ? 0.8 : 0, transition: "opacity 1s ease 0.7s" }}/>
      {/* NOI bars (fills between exp & noi implicit — use bars from baseline to noi) */}
      {rows.map((r, i) => {
        const bx = x(i) - 14;
        const by = y(r.noi);
        const bh = (H - pad.b) - by;
        return (
          <g key={i}>
            <rect x={bx} y={by} width="28" height={bh}
                  fill="url(#noiG)"
                  style={{ transform: revealed ? "scaleY(1)" : "scaleY(0)",
                           transformOrigin: `${bx + 14}px ${H - pad.b}px`,
                           transition: `transform 1.1s cubic-bezier(0.2,0.7,0.2,1) ${0.1 + i*0.08}s` }} />
          </g>
        );
      })}
      {/* NOI line ontop */}
      <path d={rows.map((r,i) => `${i===0?"M":"L"} ${x(i)} ${y(r.noi)}`).join(" ")}
            fill="none" stroke="#C9A961" strokeWidth="2"
            style={{ strokeDasharray: 2000, strokeDashoffset: revealed ? 0 : 2000,
                     transition: "stroke-dashoffset 1.8s ease 0.3s" }}/>
      {/* x labels */}
      {rows.map((r, i) => (
        <text key={i} x={x(i)} y={H - pad.b + 22} fill="rgba(245,241,232,0.6)"
              fontFamily="Inter Tight" fontSize="11" textAnchor="middle"
              style={{ letterSpacing: 0.8 }}>
          {r.y}
        </text>
      ))}
      {/* legend */}
      <g transform={`translate(${W - pad.r - 280}, ${pad.t - 10})`} fontFamily="Inter Tight" fontSize="11" fill="rgba(245,241,232,0.7)">
        <rect x="0" y="-8" width="12" height="12" fill="url(#noiG)" />
        <text x="18" y="2">NOI</text>
        <line x1="78" y1="-2" x2="94" y2="-2" stroke="#4A90D9" strokeWidth="1.5" />
        <text x="100" y="2">EGI</text>
        <line x1="150" y1="-2" x2="166" y2="-2" stroke="#B86A5C" strokeWidth="1.4" strokeDasharray="3 3" />
        <text x="172" y="2">Op. Expenses</text>
      </g>
    </svg>
  );
}

// ===== Rent Comp Scatter =====
function RentScatter() {
  const data = MR.rentComps;
  const W = 900, H = 420, pad = { t: 30, r: 30, b: 50, l: 70 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const xmin = 500, xmax = 1100;
  const ymin = 1300, ymax = 1900;
  const x = (v) => pad.l + ((v - xmin) / (xmax - xmin)) * iw;
  const y = (v) => pad.t + (1 - (v - ymin) / (ymax - ymin)) * ih;
  const [rev, setRev] = uS2(false);
  const ref = uR2(null);
  uE2(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRev(true); io.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const xticks = [600, 700, 800, 900, 1000];
  const yticks = [1400, 1500, 1600, 1700, 1800];

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="full" style={{ overflow: "visible" }}>
      {/* grid */}
      {yticks.map(t => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="rgba(18,21,28,0.08)" strokeDasharray="2 3" />
          <text x={pad.l - 12} y={y(t) + 4} fontFamily="JetBrains Mono" fontSize="10" fill="#6B7280" textAnchor="end">${t}</text>
        </g>
      ))}
      {xticks.map(t => (
        <g key={t}>
          <text x={x(t)} y={H - pad.b + 22} fontFamily="JetBrains Mono" fontSize="10" fill="#6B7280" textAnchor="middle">{t} SF</text>
        </g>
      ))}
      {/* Post-reno target line */}
      <line x1={pad.l} x2={W - pad.r} y1={y(1646)} y2={y(1646)}
            stroke="#C9A961" strokeDasharray="4 4" strokeWidth="1"
            style={{ opacity: rev ? 1 : 0, transition: "opacity 0.8s ease 0.6s" }} />
      <text x={W - pad.r} y={y(1646) - 6} textAnchor="end"
            fontFamily="Inter Tight" fontSize="11" fill="#C9A961" fontStyle="italic"
            style={{ opacity: rev ? 1 : 0, transition: "opacity 0.8s ease 0.8s" }}>
        Post-reno target · $1,646
      </text>
      {/* points with collision-aware labels */}
      {(() => {
        // Compute label position per point: detect close-by neighbors and alternate above/below
        const positioned = data.map((d, i) => {
          const cx = x(d.avgSF), cy = y(d.rent);
          return { ...d, i, cx, cy, dir: 1 }; // dir: 1 = above, -1 = below
        });
        // For each point, look for any prior point within label-collision range; alternate dir
        positioned.forEach((p, i) => {
          for (let j = 0; j < i; j++) {
            const q = positioned[j];
            if (Math.abs(p.cx - q.cx) < 80 && Math.abs(p.cy - q.cy) < 18) {
              // collision — flip direction relative to neighbor
              p.dir = -q.dir;
            }
          }
        });
        return positioned.map((d) => {
          const { cx, cy, i, dir } = d;
          const isSubj = d.subject;
          const labelOffset = dir > 0 ? -(isSubj ? 18 : 14) : (isSubj ? 26 : 18);
          return (
            <g key={i} style={{ opacity: rev ? 1 : 0, transition: `opacity 0.6s ease ${0.1 + i*0.06}s, transform 0.6s ease ${0.1 + i*0.06}s`,
                                transform: rev ? "scale(1)" : "scale(0.2)", transformOrigin: `${cx}px ${cy}px` }}>
              {isSubj && <circle cx={cx} cy={cy} r="24" fill="none" stroke="#C9A961" strokeOpacity="0.4" />}
              <circle cx={cx} cy={cy} r={isSubj ? 10 : 6}
                      fill={isSubj ? "#C9A961" : "#1E4A8E"}
                      stroke={isSubj ? "#0A1833" : "none"} strokeWidth="2" />
              <text x={cx} y={cy + labelOffset} textAnchor="middle"
                    fontFamily="Inter Tight" fontSize={isSubj ? "12" : "10"}
                    fontWeight={isSubj ? "500" : "400"}
                    fill={isSubj ? "#0A1833" : "#3A4151"}>
                {d.name}
              </text>
            </g>
          );
        });
      })()}
      {/* axis labels */}
      <text x={pad.l} y={H - 8} fontFamily="Inter Tight" fontSize="10" fill="#6B7280" letterSpacing="1.2">AVG UNIT SIZE →</text>
      <text x={pad.l - 60} y={pad.t + 10} fontFamily="Inter Tight" fontSize="10" fill="#6B7280" letterSpacing="1.2">AVG RENT ↑</text>
    </svg>
  );
}

// ===== Price per unit bar chart (sales comps) =====
function PPUBars() {
  const data = MR.salesComps;
  const W = 900, H = 320, pad = { t: 30, r: 30, b: 70, l: 80 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const max = 320000;
  const bw = iw / data.length - 14;
  const [rev, setRev] = uS2(false);
  const ref = uR2(null);
  uE2(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRev(true); io.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const compAvg = 208920;

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="full">
      {[0, 100000, 200000, 300000].map(t => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r}
                y1={pad.t + (1 - t/max) * ih} y2={pad.t + (1 - t/max) * ih}
                stroke="rgba(18,21,28,0.08)" />
          <text x={pad.l - 10} y={pad.t + (1 - t/max) * ih + 4}
                fontFamily="JetBrains Mono" fontSize="10" fill="#6B7280" textAnchor="end">
            ${(t/1000).toFixed(0)}K
          </text>
        </g>
      ))}
      {/* avg line */}
      <line x1={pad.l} x2={W - pad.r}
            y1={pad.t + (1 - compAvg/max) * ih} y2={pad.t + (1 - compAvg/max) * ih}
            stroke="#C9A961" strokeDasharray="4 4" strokeWidth="1"
            style={{ opacity: rev ? 1 : 0, transition: "opacity 0.8s ease 0.8s" }} />
      <text x={W - pad.r} y={pad.t + (1 - compAvg/max) * ih - 6}
            fontFamily="Inter Tight" fontSize="11" fontStyle="italic" fill="#C9A961"
            textAnchor="end"
            style={{ opacity: rev ? 1 : 0, transition: "opacity 0.8s ease 1s" }}>
        Comp Avg · $208,920
      </text>
      {data.map((d, i) => {
        const bh = (d.ppu / max) * ih;
        const bx = pad.l + i * (iw / data.length) + 7;
        const by = pad.t + ih - bh;
        const isSubj = d.subject;
        return (
          <g key={i}>
            <rect x={bx} y={by} width={bw} height={bh}
                  fill={isSubj ? "#C9A961" : "#1E4A8E"}
                  style={{
                    transform: rev ? "scaleY(1)" : "scaleY(0)",
                    transformOrigin: `${bx + bw/2}px ${pad.t + ih}px`,
                    transition: `transform 1s cubic-bezier(0.2,0.7,0.2,1) ${0.15 + i*0.08}s`
                  }} />
            <text x={bx + bw/2} y={by - 8} textAnchor="middle"
                  fontFamily="JetBrains Mono" fontSize="11"
                  fill={isSubj ? "#C9A961" : "#0A1833"} fontWeight={isSubj ? "600" : "400"}
                  style={{ opacity: rev ? 1 : 0, transition: `opacity 0.4s ease ${0.8 + i*0.08}s` }}>
              ${(d.ppu/1000).toFixed(0)}K
            </text>
            <text x={bx + bw/2} y={pad.t + ih + 18} textAnchor="middle"
                  fontFamily="Inter Tight" fontSize="10" fill="#3A4151">
              <tspan x={bx + bw/2} dy="0">{d.name.length > 18 ? d.name.slice(0,16) + "…" : d.name}</tspan>
              <tspan x={bx + bw/2} dy="14" fill="#6B7280">{d.date}</tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ===== CoC bar chart (simple) =====
function CocBars() {
  const v = UW.coc.slice(1, 7).map(x => x * 100);
  const W = 600, H = 180, pad = { t: 10, r: 10, b: 30, l: 30 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const max = 14;
  const bw = iw / v.length - 12;
  const [rev, setRev] = uS2(false);
  const ref = uR2(null);
  uE2(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRev(true); }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="full">
      {v.map((x, i) => {
        const bh = (x/max) * ih;
        const bx = pad.l + i * (iw / v.length) + 6;
        const by = pad.t + ih - bh;
        return (
          <g key={i}>
            <rect x={bx} y={by} width={bw} height={bh} fill="#C9A961"
                  style={{ transform: rev ? "scaleY(1)" : "scaleY(0)",
                           transformOrigin: `${bx + bw/2}px ${pad.t + ih}px`,
                           transition: `transform 0.9s cubic-bezier(0.2,0.7,0.2,1) ${0.1 + i*0.1}s` }}/>
            <text x={bx + bw/2} y={by - 6} fontFamily="JetBrains Mono" fontSize="11"
                  fill="rgba(245,241,232,0.85)" textAnchor="middle"
                  style={{ opacity: rev ? 1 : 0, transition: `opacity 0.3s ease ${0.8 + i*0.1}s` }}>
              {x.toFixed(1)}%
            </text>
            <text x={bx + bw/2} y={pad.t + ih + 18} fontFamily="Inter Tight" fontSize="10"
                  fill="rgba(245,241,232,0.55)" textAnchor="middle">
              Y{i+1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

Object.assign(window, { NoiChart, RentScatter, PPUBars, CocBars });
