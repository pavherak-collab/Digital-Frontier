import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ParticleBackground } from "./components/ParticleBackground";
import { TooltipProvider } from "@/components/ui/tooltip";
import coverImg from "@assets/IMG_9239_1783109906529.jpg";
import contentsImg from "@assets/IMG_9240_1783109912723.jpg";
import pageImg from "@assets/IMG_9241_1783109918971.jpg";

const GOLD = "#D4AF37";
const GOLD_LIGHT = "#FFD86B";
const GOLD_MID = "#E7C86E";

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const whatsInside = [
  { icon: "◈", title: "Digital Thinking", body: "Rewire how you see value, leverage, and creation in the digital age." },
  { icon: "◉", title: "Asset Building", body: "Build things that work for you long after you stop working on them." },
  { icon: "◎", title: "Execution Systems", body: "Turn ideas into finished products with repeatable, proven frameworks." },
  { icon: "◆", title: "Digital Identity", body: "Own your presence. Define how the world sees you before others do." },
  { icon: "◇", title: "Long-Term Leverage", body: "Position yourself for compounding returns — in income, influence, and impact." },
];

const features = [
  "Premium 36-page PDF",
  "Action Steps",
  "Frameworks",
  "Beautiful Layout",
  "Instant Download",
  "Future Updates",
];

const previewPages = [
  { img: coverImg, label: "Cover" },
  { img: contentsImg, label: "What's Inside" },
  { img: pageImg, label: "The Correct Order" },
];

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
  }),
};

function PDFSlider({ pages }: { pages: { img: string; label: string }[] }) {
  const [[index, direction], setSlide] = useState([0, 0]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const paginate = (dir: number) => {
    setSlide(([prev]) => [(prev + dir + pages.length) % pages.length, dir]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: -dy * 6, y: dx * 6 });
  };

  return (
    <div className="flex flex-col items-center gap-10">
      {/* Slider stage */}
      <div className="flex items-center gap-6 md:gap-10 w-full justify-center">

        {/* Left arrow */}
        <button
          data-testid="button-slider-prev"
          onClick={() => paginate(-1)}
          className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-250"
          style={{
            border: `1px solid ${GOLD}33`,
            color: `${GOLD}99`,
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}88`;
            (e.currentTarget as HTMLButtonElement).style.color = GOLD_LIGHT;
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${GOLD}22`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}33`;
            (e.currentTarget as HTMLButtonElement).style.color = `${GOLD}99`;
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Card viewport */}
        <div
          style={{
            position: "relative",
            width: "clamp(280px, 38vw, 520px)",
            aspectRatio: "1 / 1.414",
            perspective: "1200px",
            overflow: "hidden",
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={index}
              custom={direction}
              variants={SLIDE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                position: "absolute",
                inset: 0,
                perspective: "1200px",
              }}
            >
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.03)",
                  border: hovered ? `1px solid ${GOLD}66` : `1px solid ${GOLD}22`,
                  boxShadow: hovered
                    ? `0 48px 120px rgba(0,0,0,0.85), 0 0 70px ${GOLD}28, inset 0 1px 0 ${GOLD}18`
                    : `0 24px 80px rgba(0,0,0,0.7), 0 0 30px ${GOLD}0D`,
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? "translateY(-8px) scale(1.02)" : ""}`,
                  transition: hovered
                    ? "transform 0.1s ease-out, box-shadow 0.3s ease, border 0.3s ease"
                    : "transform 0.55s cubic-bezier(0.21,0.47,0.32,0.98), box-shadow 0.5s ease, border 0.4s ease",
                  backdropFilter: "blur(8px)",
                  cursor: "default",
                  willChange: "transform",
                }}
              >
                <img
                  src={pages[index].img}
                  alt={pages[index].label}
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block",
                    userSelect: "none",
                  }}
                />
                {/* Hover shimmer */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(135deg, ${GOLD}09 0%, transparent 50%, ${GOLD}06 100%)`,
                  opacity: hovered ? 1 : 0,
                  transition: "opacity 0.4s ease",
                  pointerEvents: "none",
                }} />
                {/* Corner glow */}
                <div style={{
                  position: "absolute", top: 0, right: 0, width: "100px", height: "100px",
                  background: `radial-gradient(circle at top right, ${GOLD}1A, transparent 70%)`,
                  pointerEvents: "none",
                }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <button
          data-testid="button-slider-next"
          onClick={() => paginate(1)}
          className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-250"
          style={{
            border: `1px solid ${GOLD}33`,
            color: `${GOLD}99`,
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}88`;
            (e.currentTarget as HTMLButtonElement).style.color = GOLD_LIGHT;
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${GOLD}22`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}33`;
            (e.currentTarget as HTMLButtonElement).style.color = `${GOLD}99`;
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-xs tracking-[0.3em] uppercase font-semibold"
          style={{ color: GOLD_MID }}
        >
          {pages[index].label}
        </motion.p>
      </AnimatePresence>

      {/* Pagination dots */}
      <div className="flex items-center gap-2.5">
        {pages.map((_, i) => (
          <button
            key={i}
            data-testid={`button-slider-dot-${i}`}
            onClick={() => setSlide(([prev]) => [i, i > prev ? 1 : -1])}
            style={{
              width: i === index ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === index ? GOLD : `${GOLD}33`,
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.35s cubic-bezier(0.32,0.72,0,1)",
              boxShadow: i === index ? `0 0 10px ${GOLD}66` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "20%"]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <TooltipProvider>
      <div className="bg-background min-h-screen text-foreground relative overflow-hidden font-sans">

        {/* ── Loading screen ── */}
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: 2.2 }}
            onAnimationComplete={() => (document.body.style.overflow = "unset")}
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-8"
          >
            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.8em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-[Outfit] text-sm font-bold uppercase"
              style={{ color: GOLD }}
            >
              AURIX.CO
            </motion.div>

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-16"
              style={{ background: `linear-gradient(to right, transparent, ${GOLD}88, transparent)`, transformOrigin: "center" }}
            />

            {/* Presents line */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-base tracking-[0.5em] uppercase font-light"
              style={{ color: `${GOLD}70` }}
            >
              presents
            </motion.div>
          </motion.div>
        )}

        <ParticleBackground />

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative text-center">
          <motion.div style={{ y: heroY }} className="absolute inset-0 z-[-1]" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.25em] font-semibold mb-10"
              style={{ border: `1px solid ${GOLD}33`, color: GOLD_MID, background: `${GOLD}0A` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD_LIGHT }} />
              Free for a limited time
            </motion.div>

            <h1
              className="font-[Outfit] text-[11vw] md:text-[9vw] leading-[0.88] font-black uppercase text-white mb-8 tracking-tighter"
              style={{ textShadow: `0 0 60px ${GOLD}44` }}
            >
              The Digital
              <br />
              Foundation
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 2.8 }}
            >
              <p className="text-xl md:text-2xl text-foreground/60 font-light mb-12 max-w-xl mx-auto leading-relaxed">
                A practical framework for creators, builders and entrepreneurs.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  data-testid="button-get-free-copy-hero"
                  onClick={() => scrollToSection("pricing")}
                  className="relative inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_MID} 50%, ${GOLD_LIGHT} 100%)`,
                    color: "#050505",
                    boxShadow: `0 0 32px ${GOLD}44, 0 8px 24px rgba(0,0,0,0.4)`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 55px ${GOLD}77, 0 12px 36px rgba(0,0,0,0.5)`;
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 32px ${GOLD}44, 0 8px 24px rgba(0,0,0,0.4)`;
                    (e.currentTarget as HTMLButtonElement).style.transform = "";
                  }}
                >
                  Get Your Free Copy
                </button>

                <button
                  data-testid="button-preview-hero"
                  onClick={() => scrollToSection("gallery")}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm uppercase tracking-widest font-semibold transition-all duration-300"
                  style={{ border: `1px solid ${GOLD}33`, color: `${GOLD}BB`, background: "transparent" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}77`;
                    (e.currentTarget as HTMLButtonElement).style.background = `${GOLD}0A`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}33`;
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  Preview Inside
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4 }}
            className="absolute bottom-4 flex flex-col items-center gap-3"
            style={{ color: `${GOLD}77` }}
          >
            <span className="text-xs tracking-[0.35em] uppercase font-semibold">Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-0.5 h-16"
              style={{ background: `linear-gradient(to bottom, ${GOLD}BB, transparent)` }}
            />
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            WHAT'S INSIDE
        ══════════════════════════════════════ */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-20">
              <div className="text-xs uppercase tracking-[0.3em] mb-4 font-semibold" style={{ color: `${GOLD}70` }}>
                What's Inside
              </div>
              <h2 className="font-[Outfit] text-4xl md:text-5xl font-bold text-white tracking-tight">
                Five pillars. One complete system.
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whatsInside.map((item, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div
                    className="rounded-2xl p-7 h-full transition-all duration-400"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      backdropFilter: "blur(12px)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.border = `1px solid ${GOLD}33`;
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 24px ${GOLD}0F`;
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                      (e.currentTarget as HTMLDivElement).style.transform = "";
                    }}
                  >
                    <div
                      className="text-2xl mb-5 w-10 h-10 flex items-center justify-center rounded-xl"
                      style={{ background: `${GOLD}14`, color: GOLD_LIGHT, border: `1px solid ${GOLD}22` }}
                    >
                      {item.icon}
                    </div>
                    <h3 className="font-[Outfit] text-xl font-semibold text-white mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-foreground/55 text-sm leading-relaxed font-light">
                      {item.body}
                    </p>
                  </div>
                </FadeIn>
              ))}

              {/* 6th card — price teaser */}
              <FadeIn delay={0.4}>
                <div
                  className="rounded-2xl p-7 h-full flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-400"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}0F 0%, ${GOLD}05 100%)`,
                    border: `1px solid ${GOLD}33`,
                    backdropFilter: "blur(12px)",
                  }}
                  onClick={() => scrollToSection("pricing")}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px rgba(0,0,0,0.5), 0 0 30px ${GOLD}18`;
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                    (e.currentTarget as HTMLDivElement).style.transform = "";
                  }}
                >
                  <div className="font-[Outfit] text-3xl font-black mb-2" style={{ color: GOLD_LIGHT, textShadow: `0 0 16px ${GOLD}88` }}>
                    FREE
                  </div>
                  <p className="text-xs uppercase tracking-widest mb-4" style={{ color: `${GOLD}77` }}>
                    Limited launch offer
                  </p>
                  <div className="text-xs text-foreground/40 line-through">€19.99</div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PDF PREVIEW GALLERY — VISUAL CENTERPIECE
        ══════════════════════════════════════ */}
        <section id="gallery" className="py-32 relative overflow-hidden">
          {/* Ambient background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${GOLD}09 0%, transparent 70%)` }}
          />

          <FadeIn className="text-center mb-20 px-6">
            <div className="text-xs uppercase tracking-[0.3em] mb-4 font-semibold" style={{ color: `${GOLD}70` }}>
              Preview
            </div>
            <h2 className="font-[Outfit] text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Inside the Foundation
            </h2>
            <p className="text-foreground/40 text-base font-light max-w-sm mx-auto">
              36 pages of premium design and practical insight.
            </p>
          </FadeIn>

          <FadeIn className="px-6">
            <PDFSlider pages={previewPages} />
          </FadeIn>
        </section>

        {/* ══════════════════════════════════════
            FEATURES
        ══════════════════════════════════════ */}
        <section className="py-24 px-6 border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-white tracking-tight">
                Everything you need, nothing you don't.
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((feat, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div
                    className="flex items-center gap-3 px-5 py-4 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{ background: `${GOLD}18`, color: GOLD_LIGHT, border: `1px solid ${GOLD}33` }}
                    >
                      ✓
                    </div>
                    <span className="text-sm text-foreground/80 font-medium">{feat}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PRICING
        ══════════════════════════════════════ */}
        <section id="pricing" className="py-40 px-6 flex flex-col items-center text-center relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${GOLD}08 0%, transparent 70%)` }}
          />

          <FadeIn>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.25em] font-semibold mb-12"
              style={{ border: `1px solid ${GOLD}44`, color: GOLD_MID, background: `${GOLD}0D` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD_LIGHT }} />
              Limited Launch Offer
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-baseline justify-center gap-5 mb-10">
              <span className="text-xl text-foreground/30 line-through font-light">€19.99</span>
              <span
                className="font-[Outfit] text-7xl md:text-9xl font-black tracking-tighter"
                style={{ color: GOLD_LIGHT, textShadow: `0 0 50px ${GOLD}99` }}
              >
                FREE
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <a
              data-testid="button-download-foundation"
              href="https://www.dropbox.com/scl/fi/tjaxh4cyg7adeuhekmh7q/AURIX.CO_TheDigitalFoundation_Premium.pdf?rlkey=af975ndtjy9lclp1vocehkc2a&st=w4323go5&dl=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 mb-5"
              style={{
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_MID} 50%, ${GOLD_LIGHT} 100%)`,
                color: "#050505",
                boxShadow: `0 0 40px ${GOLD}55, 0 12px 32px rgba(0,0,0,0.5)`,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 60px ${GOLD}88, 0 16px 48px rgba(0,0,0,0.6)`;
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 40px ${GOLD}55, 0 12px 32px rgba(0,0,0,0.5)`;
                (e.currentTarget as HTMLAnchorElement).style.transform = "";
              }}
            >
              Download The Digital Foundation
            </a>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-xs tracking-widest uppercase text-foreground/25 font-light">
              Instant download. No account required.
            </p>
          </FadeIn>
        </section>

        {/* ══════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════ */}
        <section className="py-40 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${GOLD}0A 0%, transparent 70%)` }}
          />

          <FadeIn>
            <h2
              className="font-[Outfit] text-[9vw] md:text-[6vw] leading-[1] font-black uppercase text-white mb-5 tracking-tighter"
              style={{ textShadow: `0 0 60px ${GOLD}33` }}
            >
              Don't Wait
              <br />
              For The Future.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2
              className="font-[Outfit] text-[9vw] md:text-[6vw] leading-[1] font-black uppercase mb-16 tracking-tighter"
              style={{ color: GOLD, textShadow: `0 0 50px ${GOLD}AA` }}
            >
              Create It.
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-base tracking-[0.4em] uppercase font-semibold" style={{ color: `${GOLD}77` }}>
              AURIX.CO
            </p>
          </FadeIn>
        </section>

      </div>
    </TooltipProvider>
  );
}

export default App;
