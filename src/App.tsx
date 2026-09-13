import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Problem", "How It Works", "Features", "Stack", "Join"];

const STATS = [
  { value: "1", unit: "Health ID", desc: "per patient, valid across every clinic in the network" },
  { value: "47%", unit: "Redundancy", desc: "of diagnostic tests are duplicates that could be avoided" },
  { value: "4", unit: "Layers", desc: "from IoT sensors to doctor portal — fully integrated" },
  { value: "< 2s", unit: "Lookup", desc: "to retrieve a patient's complete history from any clinic" },
];

const LAYERS = [
  {
    id: "01",
    title: "Data Sources",
    color: "#00c9a7",
    desc: "Every touchpoint that generates health data enters the system here.",
    items: ["Wearable sensors (pulse, BP, temp, glucose)", "Hospital diagnostic devices (ECG, X-ray, blood analyzers)", "Paper prescriptions & lab reports (digitized)", "Mobile app for manual patient entry"],
  },
  {
    id: "02",
    title: "Acquisition & Gateway",
    color: "#3b82f6",
    desc: "Raw input from all sources is normalized and tagged before it moves upstream.",
    items: ["IoT gateway — Bluetooth/Wi-Fi → MQTT broker", "OCR engine converts paper reports to structured text", "Every record tagged with Health ID + timestamp + clinic", "Data validated and compressed for upload"],
  },
  {
    id: "03",
    title: "Cloud & Processing",
    color: "#a78bfa",
    desc: "The system's core — encrypted storage, analytics, and deduplication logic.",
    items: ["Unique Health ID auth (Aadhaar / National Health ID)", "Central EHR database — AES-256 encrypted", "Analytics engine flags trends and anomalies", "Duplicate test detection across history"],
  },
  {
    id: "04",
    title: "Access & Delivery",
    color: "#f59e0b",
    desc: "The output layer — wherever and however a doctor or patient needs their data.",
    items: ["Doctor portal — full history before ordering tests", "Patient app — view, download, and share anytime", "SMS fallback for rural / low-bandwidth users", "Offline sync — data uploads when connectivity returns"],
  },
];

const FEATURES = [
  {
    icon: "🔗",
    title: "Universal Health ID",
    desc: "One ID follows a patient across every hospital and clinic in the network. Linked to Aadhaar or a national health identifier for tamper-proof identity.",
    accent: "#00c9a7",
  },
  {
    icon: "🚫",
    title: "Duplicate Test Prevention",
    desc: "Before a doctor orders a blood panel or ECG, the system checks if an equivalent result already exists. Recent results surface automatically.",
    accent: "#00c9a7",
  },
  {
    icon: "📡",
    title: "Real-time Sensor Integration",
    desc: "ESP32 / Arduino-based wearables push pulse, blood pressure, temperature, and glucose readings continuously via MQTT — no manual entry required.",
    accent: "#3b82f6",
  },
  {
    icon: "🔍",
    title: "OCR Paper Digitization",
    desc: "Paper prescriptions and handwritten lab slips are scanned and converted to structured text using Tesseract or Google Vision API, then indexed to the patient record.",
    accent: "#3b82f6",
  },
  {
    icon: "📊",
    title: "Trend & Anomaly Detection",
    desc: "The analytics engine (Python + scikit-learn) identifies patterns across visits — rising BP over 3 appointments, glucose drift, or abnormal trends — and alerts clinicians.",
    accent: "#a78bfa",
  },
  {
    icon: "📶",
    title: "Rural Offline Access",
    desc: "In areas with poor connectivity, patients retrieve their last report summary via SMS. Data syncs automatically when connection is restored — no records are lost.",
    accent: "#f59e0b",
  },
];

const STACK_ROWS = [
  { layer: "Frontend", tech: "Flutter · React Native", role: "Patient & doctor mobile apps", color: "#00c9a7" },
  { layer: "Backend API", tech: "Node.js · Django REST", role: "Record management, auth, analytics", color: "#3b82f6" },
  { layer: "Database", tech: "PostgreSQL + S3/MinIO", role: "Structured records + scanned files", color: "#3b82f6" },
  { layer: "OCR", tech: "Tesseract · Google Vision", role: "Paper report digitization", color: "#a78bfa" },
  { layer: "IoT", tech: "ESP32/Arduino + MQTT", role: "Wearable sensor data acquisition", color: "#a78bfa" },
  { layer: "Analytics", tech: "Python · pandas · scikit-learn", role: "Trend detection, anomaly flagging", color: "#f59e0b" },
  { layer: "Security", tech: "JWT · AES-256 · RBAC", role: "Auth, encryption, role-based access", color: "#f59e0b" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLayer, setActiveLayer] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-[#e8edf5]" style={{ fontFamily: "'Work Sans', sans-serif" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ backgroundColor: scrolled ? "#0b1120ee" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid #1e3353" : "1px solid transparent" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-sm bg-[#00c9a7] flex items-center justify-center">
              <span className="text-[#0b1120] text-xs font-bold">M</span>
            </div>
            <span className="font-bold text-[15px] tracking-tight">MedLink</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase().replace(/\s+/g, "-"))}
                className="text-[13px] text-[#a3b8cc] hover:text-[#e8edf5] transition-colors"
              >
                {link}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo("join")}
              className="px-4 py-2 rounded-sm border border-[#00c9a7] text-[#00c9a7] text-[12px] font-semibold hover:bg-[#00c9a712] transition-colors"
            >
              Join Network
            </button>
          </div>

          <button className="md:hidden text-[#a3b8cc]" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="flex flex-col gap-1.5 w-5">
              <span className="block h-px bg-current transition-all" style={{ transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "" }} />
              <span className="block h-px bg-current transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="block h-px bg-current transition-all" style={{ transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "" }} />
            </div>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-[#1e3353] bg-[#0b1120] px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase().replace(/\s+/g, "-"))} className="text-left text-[14px] text-[#a3b8cc]">{link}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#00c9a7 1px, transparent 1px), linear-gradient(90deg, #00c9a7 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(ellipse, #00c9a7 0%, transparent 70%)" }} />

        <div className="relative max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 bg-[#00c9a7]" />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] tracking-[0.25em] uppercase text-[#00c9a7]">
                Health Record Infrastructure
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
              One ID.<br />
              Every clinic.<br />
              <span className="text-[#00c9a7]">Full history.</span>
            </h1>

            <p className="text-[16px] text-[#a3b8cc] leading-relaxed mb-8 max-w-lg">
              MedLink gives every patient a single retrievable Health ID — so any doctor, at any clinic, instantly sees their complete diagnostic history before ordering a single test.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("join")}
                className="px-6 py-3 bg-[#00c9a7] text-[#0b1120] text-[13px] font-bold rounded-sm hover:bg-[#00b898] transition-colors"
              >
                Register Your Clinic
              </button>
              <button
                onClick={() => scrollTo("how-it-works")}
                className="px-6 py-3 border border-[#1e3353] text-[#a3b8cc] text-[13px] rounded-sm hover:border-[#00c9a740] hover:text-[#e8edf5] transition-colors"
              >
                See How It Works →
              </button>
            </div>

            {/* Health ID chip */}
            <div className="mt-10 inline-flex items-center gap-3 border border-[#1e3353] bg-[#0d1829] rounded-sm px-4 py-3">
              <div className="w-2 h-2 rounded-full bg-[#00c9a7] animate-pulse" />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[11px] text-[#6b8aaa]">PATIENT_ID</span>
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[11px] text-[#00c9a7] font-medium">NHI-2024-4872991</span>
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-[#6b8aaa]">47 records · 6 clinics</span>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 rounded-sm opacity-20" style={{ background: "linear-gradient(135deg, #00c9a730, transparent)" }} />
            <img
              src="https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?w=700&h=520&fit=crop&auto=format"
              alt="Two doctors reviewing a patient's digital health record on a tablet"
              className="relative rounded-sm w-full object-cover"
              style={{ height: "420px", filter: "brightness(0.75) saturate(0.8)" }}
            />
            {/* Overlay badge */}
            <div className="absolute bottom-4 left-4 right-4 border border-[#1e3353] bg-[#0b1120cc] backdrop-blur-sm rounded-sm p-3 flex items-center gap-3">
              <div>
                <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[9px] tracking-widest uppercase text-[#6b8aaa]">Last accessed</p>
                <p className="text-[12px] font-semibold text-[#e8edf5]">City General Hospital · Dr. Sharma</p>
              </div>
              <div className="ml-auto text-right">
                <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[9px] text-[#6b8aaa]">2026-09-11</p>
                <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-[#00c9a7]">AUTHORIZED ✓</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-[#1e3353] bg-[#0d1829]">
          <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.unit} className="flex flex-col gap-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold text-[#00c9a7]">{s.value}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] tracking-widest uppercase text-[#6b8aaa]">{s.unit}</span>
                </div>
                <p className="text-[11px] text-[#6b8aaa] leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="py-24 border-t border-[#1e3353]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1.5 h-6 bg-[#f59e0b]" />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] tracking-[0.25em] uppercase text-[#f59e0b]">The Problem</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-6">
              Every new clinic<br />starts from zero.
            </h2>
            <p className="text-[15px] text-[#a3b8cc] leading-relaxed mb-6">
              A patient sees Doctor A at one clinic, then Doctor B at another. Doctor B has no visibility into A's tests — so they re-order the same blood panel, the same ECG, the same X-ray. The patient pays twice. The system wastes time.
            </p>
            <p className="text-[15px] text-[#a3b8cc] leading-relaxed">
              In rural areas it's worse: paper slips get lost, clinics don't communicate, and a chronic condition goes unmanaged simply because no one has the full picture.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex flex-col gap-3">
              {[
                { emoji: "📄", title: "Paper records lost", desc: "Prescriptions and lab slips get misplaced between visits, leaving doctors to guess at history.", color: "#f59e0b" },
                { emoji: "🔁", title: "Tests re-ordered repeatedly", desc: "Without shared records, every new clinic orders the same diagnostics from scratch.", color: "#f59e0b" },
                { emoji: "🌐", title: "Clinics don't talk to each other", desc: "No shared infrastructure means each facility operates as an isolated silo.", color: "#f59e0b" },
                { emoji: "📶", title: "Rural patients fall through the gaps", desc: "Poor connectivity and no offline access means remote patients have no continuity of care.", color: "#f59e0b" },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-4 p-4 border border-[#1e3353] rounded-sm bg-[#0d1829] hover:border-[#f59e0b40] transition-colors">
                  <span className="text-2xl mt-0.5">{item.emoji}</span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#e8edf5] mb-0.5">{item.title}</p>
                    <p className="text-[12px] text-[#6b8aaa] leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 border-t border-[#1e3353] bg-[#0d1829]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-6 bg-[#00c9a7]" />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] tracking-[0.25em] uppercase text-[#00c9a7]">Architecture</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-12">
              <h2 className="text-4xl font-bold leading-tight">Four layers.<br />One patient record.</h2>
              <p className="text-[14px] text-[#6b8aaa] max-w-sm lg:text-right">
                Click a layer to explore its components and role in the data pipeline.
              </p>
            </div>
          </FadeIn>

          {/* Layer tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
            {LAYERS.map((layer, i) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(i)}
                style={{
                  borderColor: activeLayer === i ? layer.color : "#1e3353",
                  backgroundColor: activeLayer === i ? `${layer.color}12` : "transparent",
                  color: activeLayer === i ? layer.color : "#6b8aaa",
                }}
                className="text-left p-4 border rounded-sm transition-all"
              >
                <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[9px] tracking-widest uppercase block mb-1 opacity-60">Layer {layer.id}</span>
                <span className="text-[13px] font-semibold">{layer.title}</span>
              </button>
            ))}
          </div>

          {/* Active layer detail */}
          {LAYERS.map((layer, i) => activeLayer === i && (
            <div
              key={layer.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 border rounded-sm"
              style={{ borderColor: `${layer.color}30`, backgroundColor: `${layer.color}08` }}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    style={{ backgroundColor: layer.color, fontFamily: "'DM Mono', monospace" }}
                    className="text-[9px] font-bold px-2 py-0.5 text-[#0b1120]"
                  >
                    LAYER {layer.id}
                  </span>
                  <h3 style={{ color: layer.color }} className="text-lg font-bold">{layer.title}</h3>
                </div>
                <p className="text-[14px] text-[#a3b8cc] leading-relaxed mb-4">{layer.desc}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveLayer(Math.max(0, i - 1))}
                    disabled={i === 0}
                    className="text-[12px] text-[#6b8aaa] disabled:opacity-30 hover:text-[#e8edf5] transition-colors"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setActiveLayer(Math.min(LAYERS.length - 1, i + 1))}
                    disabled={i === LAYERS.length - 1}
                    className="text-[12px] text-[#6b8aaa] disabled:opacity-30 hover:text-[#e8edf5] transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {layer.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-3 p-3 border border-[#1e335360] rounded-sm bg-[#0b112060]">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: layer.color }} />
                    <span className="text-[13px] text-[#a3b8cc]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Flow summary */}
          <div className="mt-8 flex flex-wrap items-center gap-0">
            {LAYERS.map((layer, i) => (
              <div key={layer.id} className="flex items-center">
                <button
                  onClick={() => setActiveLayer(i)}
                  className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-[#1e3353] transition-colors"
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color }} />
                  <span className="text-[11px] text-[#a3b8cc]">{layer.title}</span>
                </button>
                {i < LAYERS.length - 1 && <span className="text-[#1e3353] mx-1">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 border-t border-[#1e3353]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-6 bg-[#a78bfa]" />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] tracking-[0.25em] uppercase text-[#a78bfa]">Features</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-12">Built to eliminate<br />medical redundancy.</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 60}>
                <div className="h-full flex flex-col gap-3 p-5 border border-[#1e3353] rounded-sm bg-[#0d1829] hover:border-[#1e3353cc] group transition-all" style={{ "--accent": f.accent } as React.CSSProperties}>
                  <div className="flex items-start justify-between">
                    <span className="text-2xl">{f.icon}</span>
                    <div className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: f.accent }} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#e8edf5] mb-2">{f.title}</h3>
                    <p className="text-[12px] text-[#6b8aaa] leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="mt-auto pt-2">
                    <div className="h-px w-8 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: f.accent, opacity: 0.3 }} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTOR IMAGE BREAK */}
      <section className="relative h-64 overflow-hidden border-y border-[#1e3353]">
        <img
          src="https://images.unsplash.com/photo-1758691462668-046fd85ceac9?w=1400&h=400&fit=crop&auto=format"
          alt="Doctor examining a patient's brain scan on a tablet"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.3) saturate(0.5)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] tracking-[0.3em] uppercase text-[#00c9a7] mb-2">No more guesswork</p>
            <p className="text-2xl font-bold text-[#e8edf5]">A doctor's best tool is the patient's own history.</p>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="py-24 border-t border-[#1e3353] bg-[#0d1829]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-6 bg-[#3b82f6]" />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] tracking-[0.25em] uppercase text-[#3b82f6]">Tech Stack</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
              <h2 className="text-4xl font-bold leading-tight">Open, proven,<br />interoperable.</h2>
              <p className="text-[14px] text-[#6b8aaa] max-w-sm">
                No proprietary lock-in. Every component is replaceable as the network grows.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="border border-[#1e3353] rounded-sm overflow-hidden">
              <div
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="grid grid-cols-[1fr_1fr_2fr] text-[9px] tracking-widest uppercase text-[#6b8aaa] bg-[#0b1120] border-b border-[#1e3353] px-5 py-2.5"
              >
                <span>Layer</span>
                <span>Technology</span>
                <span>Role</span>
              </div>
              {STACK_ROWS.map((row, i) => (
                <div
                  key={row.layer}
                  className="grid grid-cols-[1fr_1fr_2fr] items-center px-5 py-3.5 border-b border-[#1e3353] last:border-b-0 hover:bg-[#0b112060] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                    <span className="text-[13px] font-semibold text-[#e8edf5]">{row.layer}</span>
                  </div>
                  <span style={{ fontFamily: "'DM Mono', monospace", color: row.color }} className="text-[11px]">{row.tech}</span>
                  <span className="text-[12px] text-[#6b8aaa]">{row.role}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <FadeIn delay={120}>
              <div className="p-5 border border-[#00c9a730] rounded-sm bg-[#00c9a708]">
                <h3 className="text-[13px] font-bold text-[#00c9a7] mb-3">Security model</h3>
                <div className="flex flex-col gap-2">
                  {["JWT-based stateless authentication", "AES-256 encryption at rest", "Role-based access control (RBAC)", "Patient consent-gated record sharing", "Immutable audit log on every access"].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="text-[#00c9a7] text-xs">✓</span>
                      <span className="text-[12px] text-[#a3b8cc]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={160}>
              <div className="p-5 border border-[#f59e0b30] rounded-sm bg-[#f59e0b08]">
                <h3 className="text-[13px] font-bold text-[#f59e0b] mb-3">Rural & offline support</h3>
                <div className="flex flex-col gap-2">
                  {["SMS fallback for last report summary", "Offline-first mobile app with local cache", "Progressive sync on reconnect", "Compressed data for low-bandwidth upload", "ESP32 sensor with on-device buffer"].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="text-[#f59e0b] text-xs">✓</span>
                      <span className="text-[12px] text-[#a3b8cc]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className="py-24 border-t border-[#1e3353]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1.5 h-6 bg-[#00c9a7]" />
                  <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] tracking-[0.25em] uppercase text-[#00c9a7]">Join the Network</span>
                </div>
                <h2 className="text-4xl font-bold leading-tight mb-5">
                  Every clinic that joins<br />makes the network<br />stronger.
                </h2>
                <p className="text-[14px] text-[#a3b8cc] leading-relaxed mb-6">
                  When your clinic connects to MedLink, your patients' records become available to any other clinic in the network — and every other clinic's records become available to your doctors. The value compounds with each new participant.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Integration time", value: "2–4 weeks for standard clinic setup" },
                    { label: "Hardware required", value: "Any internet-connected device" },
                    { label: "Data ownership", value: "Patients own their records; clinics own their submissions" },
                    { label: "Pricing", value: "Free for public health clinics during pilot phase" },
                  ].map(row => (
                    <div key={row.label} className="flex gap-4 py-2.5 border-b border-[#1e3353] last:border-b-0">
                      <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-[#6b8aaa] w-32 shrink-0 mt-0.5 uppercase tracking-wider">{row.label}</span>
                      <span className="text-[13px] text-[#a3b8cc]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              {formSubmitted ? (
                <div className="p-8 border border-[#00c9a730] rounded-sm bg-[#00c9a708] text-center">
                  <div className="w-12 h-12 rounded-full bg-[#00c9a720] flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#00c9a7] mb-2">Application received</h3>
                  <p className="text-[13px] text-[#6b8aaa]">
                    Our integration team will reach out within 2 business days to begin your onboarding.
                  </p>
                </div>
              ) : (
                <div className="p-6 border border-[#1e3353] rounded-sm bg-[#0d1829]">
                  <h3 className="text-[15px] font-bold mb-5">Register your clinic</h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { label: "Clinic / Hospital Name", placeholder: "City General Hospital", type: "text" },
                      { label: "State / Region", placeholder: "Maharashtra", type: "text" },
                      { label: "Contact Email", placeholder: "admin@cityhospital.org", type: "email" },
                      { label: "Approximate Patient Volume", placeholder: "e.g. 200 patients/day", type: "text" },
                    ].map(field => (
                      <div key={field.label}>
                        <label className="block text-[11px] text-[#6b8aaa] mb-1.5">{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full bg-[#0b1120] border border-[#1e3353] rounded-sm px-3 py-2.5 text-[13px] text-[#e8edf5] placeholder-[#3a5070] focus:outline-none focus:border-[#00c9a7] transition-colors"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-[11px] text-[#6b8aaa] mb-1.5">Primary use case</label>
                      <select className="w-full bg-[#0b1120] border border-[#1e3353] rounded-sm px-3 py-2.5 text-[13px] text-[#e8edf5] focus:outline-none focus:border-[#00c9a7] transition-colors">
                        <option>General outpatient clinic</option>
                        <option>Specialist hospital</option>
                        <option>Rural health centre</option>
                        <option>Diagnostic laboratory</option>
                        <option>Government / public hospital</option>
                      </select>
                    </div>
                    <button
                      onClick={() => setFormSubmitted(true)}
                      className="mt-2 w-full py-3 bg-[#00c9a7] text-[#0b1120] text-[13px] font-bold rounded-sm hover:bg-[#00b898] transition-colors"
                    >
                      Submit Application
                    </button>
                    <p className="text-[10px] text-[#3a5070] text-center">
                      No commitment required. Our team reviews all applications within 48 hours.
                    </p>
                  </div>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1e3353] bg-[#0d1829]">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-sm bg-[#00c9a7] flex items-center justify-center">
                <span className="text-[#0b1120] text-[10px] font-bold">M</span>
              </div>
              <span className="font-bold text-[14px]">MedLink</span>
            </div>
            <p className="text-[12px] text-[#6b8aaa] leading-relaxed">
              Centralized health record infrastructure for the public healthcare network. One ID. Every clinic. Full history.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[9px] tracking-widest uppercase text-[#6b8aaa] mb-3">System</p>
            <div className="flex flex-col gap-2">
              {["Architecture", "Security Model", "API Reference", "Integration Guide"].map(l => (
                <span key={l} className="text-[12px] text-[#a3b8cc] hover:text-[#e8edf5] transition-colors cursor-pointer">{l}</span>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[9px] tracking-widest uppercase text-[#6b8aaa] mb-3">Network Status</p>
            <div className="flex flex-col gap-2">
              {[
                { label: "EHR Database", status: "Operational", ok: true },
                { label: "OCR Engine", status: "Operational", ok: true },
                { label: "IoT Gateway", status: "Operational", ok: true },
                { label: "SMS Fallback", status: "Operational", ok: true },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[12px] text-[#a3b8cc]">{item.label}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.ok ? "#00c9a7" : "#f59e0b" }} />
                    <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-[#6b8aaa]">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[#1e3353]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <p style={{ fontFamily: "'DM Mono', monospace" }} className="text-[10px] text-[#3a5070]">
              MedLink Health Infrastructure · 4-layer centralized EHR system
            </p>
            <div className="flex items-center gap-4">
              {["Privacy Policy", "Terms", "Security"].map(l => (
                <span key={l} className="text-[10px] text-[#3a5070] hover:text-[#6b8aaa] transition-colors cursor-pointer">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
