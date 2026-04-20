// Tweaks panel — lets the user change the hero image to a different real photo.
// Ships with curated presets + a custom URL field. Persists via __edit_mode_set_keys.

const HERO_PRESETS = [
  { label: "Milana — front (default)",   url: "https://agent-69e3ec34dc23ad344ff30ecc--milanareserve.netlify.app/images/photo-exterior-front.jpg" },
  { label: "Milana — front alt",          url: "https://agent-69e3ec34dc23ad344ff30ecc--milanareserve.netlify.app/images/photo-exterior-front-2.jpg" },
  { label: "Milana — side",               url: "https://agent-69e3ec34dc23ad344ff30ecc--milanareserve.netlify.app/images/photo-exterior-side.jpg" },
  { label: "Milana — clubhouse",          url: "https://agent-69e3ec34dc23ad344ff30ecc--milanareserve.netlify.app/images/photo-clubhouse-1.jpg" },
  { label: "Milana — pool",               url: "https://agent-69e3ec34dc23ad344ff30ecc--milanareserve.netlify.app/images/pool.png" },
  { label: "Milana — staged interior",    url: "https://agent-69e3ec34dc23ad344ff30ecc--milanareserve.netlify.app/images/photo-living-staged-wide.jpg" },
];

function applyHeroImage(url) {
  if (!url) return;
  // Use a CSS custom prop so the layered gradient in .hero-bg keeps working.
  document.documentElement.style.setProperty("--hero-image", `url("${url}")`);
}

function TweaksPanel() {
  const defaults = (window.__TWEAKS_DEFAULTS || {});
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [heroUrl, setHeroUrl] = React.useState(defaults.heroImage || HERO_PRESETS[0].url);
  const [draft, setDraft] = React.useState(heroUrl);

  // Apply whatever we currently have on mount.
  React.useEffect(() => { applyHeroImage(heroUrl); }, []);
  React.useEffect(() => { applyHeroImage(heroUrl); }, [heroUrl]);

  // Register the tweaks toggle listener, then announce availability.
  React.useEffect(() => {
    function onMsg(e) {
      const t = e.data && e.data.type;
      if (t === "__activate_edit_mode") { setActive(true); setOpen(true); }
      else if (t === "__deactivate_edit_mode") { setActive(false); setOpen(false); }
    }
    window.addEventListener("message", onMsg);
    try {
      window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    } catch {}
    return () => window.removeEventListener("message", onMsg);
  }, []);

  function persist(url) {
    try {
      window.parent.postMessage({
        type: "__edit_mode_set_keys",
        edits: { heroImage: url },
      }, "*");
    } catch {}
  }

  function commit(url) {
    setHeroUrl(url);
    setDraft(url);
    persist(url);
  }

  if (!active) return null;

  const wrap = {
    position: "fixed", right: 20, bottom: 20, zIndex: 9999,
    width: open ? 360 : 52, height: open ? "auto" : 52,
    background: "#0a1428", color: "#f5f1e8",
    border: "1px solid rgba(201,169,97,0.35)",
    borderRadius: 2,
    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
    fontFamily: "'Inter Tight', system-ui, sans-serif",
    overflow: "hidden",
    transition: "width 220ms ease",
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{ ...wrap, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
        aria-label="Open tweaks"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a961" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.36.22.77.33 1.18.33H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>
    );
  }

  const label = { fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,241,232,0.55)", marginBottom: 8 };
  const input = {
    width: "100%", padding: "10px 12px", background: "#050d22", color: "#f5f1e8",
    border: "1px solid rgba(245,241,232,0.18)", borderRadius: 0, fontSize: 12,
    fontFamily: "'JetBrains Mono', monospace", outline: "none",
  };
  const btn = {
    padding: "8px 14px", background: "#c9a961", color: "#0a1428", border: 0,
    fontFamily: "'Inter Tight', sans-serif", fontSize: 11, letterSpacing: "0.14em",
    textTransform: "uppercase", cursor: "pointer", fontWeight: 600,
  };

  return (
    <div style={wrap}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid rgba(245,241,232,0.08)" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, letterSpacing: "0.04em" }}>Tweaks</div>
        <button onClick={() => setOpen(false)} style={{ background: "transparent", border: 0, color: "rgba(245,241,232,0.6)", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
      </div>

      <div style={{ padding: 18 }}>
        <div style={label}>Hero image — paste any URL</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
          <input
            style={input}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") commit(draft); }}
            placeholder="https://..."
          />
          <button style={btn} onClick={() => commit(draft)}>Set</button>
        </div>
        <div style={{ fontSize: 10, color: "rgba(245,241,232,0.45)", marginBottom: 20 }}>
          Press Enter or Set to apply. Image swaps live.
        </div>

        <div style={label}>Presets</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {HERO_PRESETS.map((p, i) => {
            const selected = p.url === heroUrl;
            return (
              <button
                key={i}
                onClick={() => commit(p.url)}
                style={{
                  position: "relative",
                  padding: 0,
                  border: selected ? "1.5px solid #c9a961" : "1px solid rgba(245,241,232,0.12)",
                  background: "#050d22",
                  cursor: "pointer",
                  aspectRatio: "16 / 10",
                  overflow: "hidden",
                  textAlign: "left",
                }}
                title={p.label}
              >
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `linear-gradient(180deg, transparent 40%, rgba(10,20,40,0.85) 100%), url("${p.url}")`,
                  backgroundSize: "cover", backgroundPosition: "center",
                }} />
                <div style={{
                  position: "absolute", left: 8, right: 8, bottom: 6,
                  color: "#f5f1e8", fontSize: 10, letterSpacing: "0.06em",
                  fontFamily: "'Inter Tight', sans-serif",
                }}>
                  {p.label}
                </div>
                {selected && (
                  <div style={{ position: "absolute", top: 6, right: 6, width: 6, height: 6, background: "#c9a961", borderRadius: "50%" }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TweaksPanel, applyHeroImage });
