// Shared hooks & helpers

const { useEffect, useRef, useState, useMemo, useLayoutEffect, useCallback } = React;

// Reveal on scroll using IntersectionObserver. Elements get `in` class when in view.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach(e => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  });
}

// Format currency / numbers
const fmt = {
  usd: (n) => "$" + Math.round(n).toLocaleString("en-US"),
  usd0: (n) => "$" + Math.round(n).toLocaleString("en-US"),
  num: (n) => n.toLocaleString("en-US"),
  pct: (n, d=1) => n.toFixed(d) + "%",
  mult: (n) => n.toFixed(2) + "×",
  compact: (n) => {
    if (n >= 1e6) return "$" + (n/1e6).toFixed(1) + "M";
    if (n >= 1e3) return "$" + (n/1e3).toFixed(0) + "K";
    return "$" + n;
  },
};

// Count-up on reveal
function CountUp({ to, prefix = "", suffix = "", decimals = 0, duration = 1400, className = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const from = 0;
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const e = 1 - Math.pow(1 - p, 3);
            setVal(from + (to - from) * e);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  const formatted = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString("en-US");
  return <span ref={ref} className={className}>{prefix}{formatted}{suffix}</span>;
}

// Scroll progress bar
function useScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector(".progress .bar");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = pct + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

// Nav solid on scroll
function useNavSolid() {
  useEffect(() => {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    const onScroll = () => {
      nav.classList.toggle("solid", window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

Object.assign(window, { useReveal, fmt, CountUp, useScrollProgress, useNavSolid });
