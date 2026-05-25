// Interactive Carrollwood map

const { useState: uS3, useRef: uR3, useEffect: uE3 } = React;

// ---- Landmark glyph helpers ----

// Interstate shield (the red-white-blue sign with the state & route number)
function Shield({ x, y, n, kind = "i" }) {
  // kind: "i" = Interstate (blue/red shield), "us" = US highway (white shield)
  if (kind === "us") {
    return (
      <g transform={`translate(${x} ${y})`} style={{ pointerEvents: "none" }}>
        <path d="M -14 -10 L 14 -10 L 14 6 Q 14 14 0 17 Q -14 14 -14 6 Z"
              fill="#F5F1E8" stroke="#0A1833" strokeWidth="1.2"/>
        <text y="3" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="700" fill="#0A1833">{n}</text>
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y})`} style={{ pointerEvents: "none" }}>
      {/* Red top bar */}
      <path d="M -16 -14 L 16 -14 L 16 -8 L -16 -8 Z" fill="#B4353B"/>
      {/* Blue shield */}
      <path d="M -16 -8 L 16 -8 L 16 6 Q 16 15 0 19 Q -16 15 -16 6 Z" fill="#16366B" stroke="#F5F1E8" strokeWidth="1.2"/>
      <text y="-10" textAnchor="middle" fontFamily="Inter Tight" fontSize="5" fontWeight="700"
            letterSpacing="0.5" fill="#F5F1E8">INTERSTATE</text>
      <text y="8" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="700" fill="#F5F1E8">{n}</text>
    </g>
  );
}

// Medical red cross glyph
function HospitalGlyph({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-7" y="-7" width="14" height="14" rx="2" fill="#E0565C" stroke="#0A1833" strokeWidth="1"/>
      <path d="M -4 -1 L 4 -1 L 4 1 L -4 1 Z M -1 -4 L 1 -4 L 1 4 L -1 4 Z" fill="#fff"/>
    </g>
  );
}

// Airport glyph (plane silhouette)
function AirportGlyph({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="10" fill="#132748" stroke="#4A90D9" strokeWidth="1.2"/>
      <path d="M 0 -6 L 1.5 -1 L 7 0.5 L 1.5 2 L 0.5 6 L -0.5 6 L -1.5 2 L -7 0.5 L -1.5 -1 Z"
            fill="#7FB3E6" transform="rotate(45)"/>
    </g>
  );
}

// University glyph (mortarboard)
function UnivGlyph({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="10" fill="#132748" stroke="#C9A961" strokeWidth="1.2"/>
      <path d="M -6 -1 L 0 -4 L 6 -1 L 0 2 Z" fill="#C9A961"/>
      <path d="M 4 -0.2 L 4 3 L 0 4.5 L -4 3 L -4 -0.2" fill="none" stroke="#C9A961" strokeWidth="1"/>
    </g>
  );
}

// Stadium glyph
function StadiumGlyph({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="10" fill="#132748" stroke="#4A90D9" strokeWidth="1.2"/>
      <ellipse rx="6" ry="4" fill="none" stroke="#7FB3E6" strokeWidth="1.2"/>
      <line x1="-6" y1="0" x2="6" y2="0" stroke="#7FB3E6" strokeWidth="0.8"/>
      <circle r="1.3" fill="#7FB3E6"/>
    </g>
  );
}

// Retail/shopping glyph
function RetailGlyph({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="10" fill="#132748" stroke="#C9A961" strokeWidth="1.2"/>
      <path d="M -5 -2 L -5 4 L 5 4 L 5 -2 Z" fill="none" stroke="#C9A961" strokeWidth="1"/>
      <path d="M -3 -2 Q -3 -5 0 -5 Q 3 -5 3 -2" fill="none" stroke="#C9A961" strokeWidth="1"/>
    </g>
  );
}

// Theme park glyph (ferris wheel)
function ThemeParkGlyph({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="10" fill="#132748" stroke="#E0565C" strokeWidth="1.2"/>
      <circle r="5" fill="none" stroke="#E0565C" strokeWidth="0.8"/>
      <line x1="-5" y1="0" x2="5" y2="0" stroke="#E0565C" strokeWidth="0.6"/>
      <line x1="0" y1="-5" x2="0" y2="5" stroke="#E0565C" strokeWidth="0.6"/>
      <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" stroke="#E0565C" strokeWidth="0.6"/>
      <line x1="3.5" y1="-3.5" x2="-3.5" y2="3.5" stroke="#E0565C" strokeWidth="0.6"/>
    </g>
  );
}

// Downtown skyline glyph (three little buildings)
function DowntownGlyph({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="10" fill="#132748" stroke="#7FB3E6" strokeWidth="1.2"/>
      <path d="M -5 3 L -5 -2 L -2 -2 L -2 -4 L 1 -4 L 1 -5 L 4 -5 L 4 3 Z" fill="#7FB3E6" fillOpacity="0.85"/>
    </g>
  );
}

// ---- Main map ----

function LocationMap() {
  const [active, setActive] = uS3(null);
  const data = MR.hospitals;

  // Additional familiar landmarks
  const landmarks = [
    { x: 23, y: 72, type: "airport", name: "Tampa Int'l Airport (TPA)", meta: "9 MI · 15 MIN" },
    { x: 52, y: 88, type: "downtown", name: "Downtown Tampa", meta: "12 MI · 20 MIN" },
    { x: 26, y: 80, type: "stadium", name: "Raymond James Stadium", meta: "10 MI · 18 MIN" },
    { x: 72, y: 30, type: "univ", name: "University of South Florida", meta: "8 MI · 17 MIN" },
    { x: 76, y: 44, type: "themepark", name: "Busch Gardens", meta: "11 MI · 20 MIN" },
    { x: 58, y: 12, type: "retail", name: "Tampa Premium Outlets", meta: "14 MI · 22 MIN" },
    { x: 48, y: 54, type: "retail", name: "Westfield Citrus Park", meta: "6 MI · 12 MIN" },
  ];

  const [activeLm, setActiveLm] = uS3(null);

  return (
    <div className="map-wrap">
      <svg viewBox="0 0 1000 625" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#132748" stopOpacity="1" />
            <stop offset="100%" stopColor="#060E22" stopOpacity="1" />
          </radialGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(74,144,217,0.06)" strokeWidth="0.5" />
          </pattern>
          {/* Road casing filter for subtle glow */}
          <filter id="roadGlow" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>

        <rect width="1000" height="625" fill="url(#mapGlow)" />
        <rect width="1000" height="625" fill="url(#grid)" />

        {/* Tampa Bay water (left side) */}
        <path d="M 0 340 Q 100 320 150 360 Q 180 400 160 460 L 180 520 L 220 580 L 0 600 Z"
              fill="#0A1833" stroke="#1E4A8E" strokeOpacity="0.35" strokeWidth="1"/>
        <path d="M 0 220 Q 60 200 90 230 L 130 260 L 120 290 L 60 280 L 0 300 Z"
              fill="#0A1833" stroke="#1E4A8E" strokeOpacity="0.35" strokeWidth="1"/>
        {/* Water label */}
        <text x="60" y="450" fontFamily="Cormorant Garamond" fontStyle="italic" fontSize="14"
              fill="rgba(127,179,230,0.45)" letterSpacing="2">Tampa Bay</text>

        {/* ===== ROADS — painted in 3 layers: casing, fill, stripe ===== */}
        {/* Layer 1: road casing (dark outline, wider) */}
        <g fill="none" stroke="#0A1833" strokeWidth="8" strokeLinecap="round">
          <path d="M 200 0 L 420 400 L 380 625" />   {/* I-275 */}
          <path d="M 0 420 L 1000 420" />              {/* I-4 */}
          <path d="M 700 0 L 680 300 L 660 625" />     {/* I-75 */}
          <path d="M 400 0 L 410 625" />               {/* Dale Mabry (US-92) */}
          <path d="M 0 260 L 1000 260" strokeWidth="6"/> {/* Fletcher Ave */}
          <path d="M 0 500 L 1000 500" strokeWidth="6"/> {/* Hillsborough Ave */}
        </g>
        {/* Layer 2: road fill (warm amber) */}
        <g fill="none" stroke="#C9A961" strokeOpacity="0.75" strokeWidth="4" strokeLinecap="round">
          <path d="M 200 0 L 420 400 L 380 625" />
          <path d="M 0 420 L 1000 420" />
          <path d="M 700 0 L 680 300 L 660 625" />
        </g>
        {/* Arterials (thinner, lighter) */}
        <g fill="none" stroke="#C9A961" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round">
          <path d="M 400 0 L 410 625" />
          <path d="M 0 260 L 1000 260" />
          <path d="M 0 500 L 1000 500" />
        </g>
        {/* Layer 3: center dashed stripe on interstates */}
        <g fill="none" stroke="#F5F1E8" strokeOpacity="0.22" strokeWidth="0.8" strokeDasharray="6 10">
          <path d="M 200 0 L 420 400 L 380 625" />
          <path d="M 0 420 L 1000 420" />
          <path d="M 700 0 L 680 300 L 660 625" />
        </g>

        {/* Arterial labels */}
        <g fontFamily="Inter Tight" fontSize="9" fill="rgba(245,241,232,0.5)" letterSpacing="1.5">
          <text x="415" y="100" transform="rotate(90 415 100)">DALE MABRY HWY</text>
          <text x="760" y="255">FLETCHER AVE</text>
          <text x="760" y="495">HILLSBOROUGH AVE</text>
        </g>

        {/* Interstate shields — authentic US highway markers */}
        <Shield x={340} y={200} n="275" />
        <Shield x={890} y={420} n="4" />
        <Shield x={688} y={120} n="75" />
        <Shield x={415} y={560} n="92" kind="us" />

        {/* Submarket boundary (Carrollwood) */}
        <path d="M 300 280 Q 380 240 480 270 Q 560 300 540 400 Q 480 460 360 440 Q 280 400 300 280 Z"
              fill="rgba(201,169,97,0.06)" stroke="rgba(201,169,97,0.4)" strokeDasharray="4 4" strokeWidth="1"/>
        <text x="440" y="265" fontFamily="Inter Tight" fontSize="11" fill="#C9A961"
              letterSpacing="3" textAnchor="middle">CARROLLWOOD SUBMARKET</text>

        {/* ===== LANDMARKS (glyphs with labels) ===== */}
        {landmarks.map((lm, i) => {
          const cx = (lm.x / 100) * 1000;
          const cy = (lm.y / 100) * 625;
          const Glyph = {
            airport: AirportGlyph,
            downtown: DowntownGlyph,
            stadium: StadiumGlyph,
            univ: UnivGlyph,
            themepark: ThemeParkGlyph,
            retail: RetailGlyph,
          }[lm.type];
          return (
            <g key={`lm-${i}`}
               onMouseEnter={() => setActiveLm(i)} onMouseLeave={() => setActiveLm(null)}
               style={{ cursor: "pointer" }}>
              <Glyph x={cx} y={cy} />
              <text x={cx} y={cy + 24} textAnchor="middle"
                    fontFamily="Inter Tight" fontSize="9" fill="rgba(245,241,232,0.72)"
                    letterSpacing="0.5" fontWeight="500">
                {lm.name.split(" (")[0].length > 22
                  ? lm.name.split(" ").slice(0, 2).join(" ")
                  : lm.name.split(" (")[0]}
              </text>
            </g>
          );
        })}

        {/* ===== HOSPITALS (medical cross glyphs) ===== */}
        {data.map((p, i) => {
          const cx = (p.x / 100) * 1000;
          const cy = (p.y / 100) * 625;
          return (
            <g key={i} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
               style={{ cursor: "pointer" }}>
              {/* pulse */}
              <circle cx={cx} cy={cy} r="16" fill="#E0565C" fillOpacity="0.0">
                <animate attributeName="r" values="10;22;10" dur="3s" repeatCount="indefinite" begin={`${i*0.3}s`}/>
                <animate attributeName="fill-opacity" values="0.25;0;0.25" dur="3s" repeatCount="indefinite" begin={`${i*0.3}s`}/>
              </circle>
              <HospitalGlyph x={cx} y={cy} />
              <text x={cx} y={cy + 22} textAnchor="middle"
                    fontFamily="Inter Tight" fontSize="9" fill="rgba(245,241,232,0.7)"
                    letterSpacing="0.3" fontWeight="500">
                {p.name.split(" ").slice(0, 2).join(" ")}
              </text>
            </g>
          );
        })}

        {/* ===== SUBJECT (Milana Reserve) ===== */}
        <g>
          {/* drive-time rings */}
          <circle cx="410" cy="360" r="180" fill="none" stroke="#C9A961" strokeOpacity="0.2" strokeDasharray="2 4"/>
          <circle cx="410" cy="360" r="120" fill="none" stroke="#C9A961" strokeOpacity="0.3" strokeDasharray="2 4"/>
          <circle cx="410" cy="360" r="60" fill="none" stroke="#C9A961" strokeOpacity="0.4" strokeDasharray="2 4"/>

          {/* Pulse */}
          <circle cx="410" cy="360" r="14" fill="#C9A961" fillOpacity="0.25">
            <animate attributeName="r" values="10;32;10" dur="2.6s" repeatCount="indefinite"/>
            <animate attributeName="fill-opacity" values="0.4;0;0.4" dur="2.6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="410" cy="360" r="12" fill="#C9A961" stroke="#0A1833" strokeWidth="2"/>
          {/* little house inside */}
          <path d="M 404 356 L 410 351 L 416 356 L 416 366 L 412 366 L 412 362 L 408 362 L 408 366 L 404 366 Z"
                fill="#0A1833" />
        </g>
        <g transform="translate(430 362)" fill="#F5F1E8" fontFamily="Cormorant Garamond">
          <text x="0" y="0" fontSize="17" fontStyle="italic" fontWeight="500">Milana Reserve</text>
          <text x="0" y="14" fontSize="9" fill="rgba(245,241,232,0.55)" fontFamily="Inter Tight" letterSpacing="1.5">
            8730 N HIMES AVE
          </text>
        </g>

        {/* Drive-time ring label */}
        <text x="410" y="178" fontFamily="Inter Tight" fontSize="9" fill="rgba(201,169,97,0.55)"
              letterSpacing="2" textAnchor="middle">18 MIN DRIVE</text>

        {/* Compass rose (bottom-right) */}
        <g transform="translate(950 585)" opacity="0.45">
          <circle r="14" fill="none" stroke="#C9A961" strokeWidth="0.6"/>
          <path d="M 0 -12 L 2 0 L 0 12 L -2 0 Z" fill="#C9A961"/>
          <path d="M -12 0 L 0 2 L 12 0 L 0 -2 Z" fill="#C9A961" opacity="0.5"/>
          <text y="-18" textAnchor="middle" fontFamily="Inter Tight" fontSize="8" fill="#C9A961" letterSpacing="1">N</text>
        </g>
      </svg>

      {/* Hospital popover */}
      {active !== null && (() => {
        const p = data[active];
        return (
          <div className="poi-popover" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <div className="name">{p.name}</div>
            <div className="meta">{p.mi} MI · {p.min} MIN · {p.beds > 0 ? p.beds + " BEDS" : "—"}</div>
          </div>
        );
      })()}

      {/* Landmark popover */}
      {activeLm !== null && (() => {
        const lm = landmarks[activeLm];
        return (
          <div className="poi-popover" style={{ left: `${lm.x}%`, top: `${lm.y}%` }}>
            <div className="name">{lm.name}</div>
            <div className="meta">{lm.meta}</div>
          </div>
        );
      })()}

      <div className="map-legend">
        <div className="lrow">
          <span className="dot" style={{ background: "#C9A961" }}/> Milana Reserve (Subject)
        </div>
        <div className="lrow">
          <span className="dot" style={{ background: "#E0565C" }}/> Major Hospitals (2,200+ beds)
        </div>
        <div className="lrow">
          <span className="dot" style={{ background: "#7FB3E6" }}/> Landmarks & Employment
        </div>
        <div className="lrow">
          <span className="dot" style={{ background: "transparent", border: "1px dashed #C9A961" }}/> Carrollwood Submarket
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LocationMap });
