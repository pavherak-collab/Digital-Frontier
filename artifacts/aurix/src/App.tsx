import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParticleBackground } from "./components/ParticleBackground";
import { TooltipProvider } from "@/components/ui/tooltip";

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

const PDFCard = ({
  index,
  label,
  delay = 0,
}: {
  index: number;
  label: string;
  delay?: number;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 w-56 md:w-72"
      style={{
        transform: hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "transform 0.45s cubic-bezier(0.21,0.47,0.32,0.98)",
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          aspectRatio: "1/1.414",
          background: "rgba(255,255,255,0.03)",
          border: hovered ? `1px solid ${GOLD}55` : "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
          boxShadow: hovered
            ? `0 32px 80px rgba(0,0,0,0.7), 0 0 40px ${GOLD}1A`
            : "0 8px 40px rgba(0,0,0,0.5)",
          transition: "border 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Placeholder inner layout */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-7">
          <div className="space-y-2">
            <div className="h-2 w-3/4 rounded-full" style={{ background: `${GOLD}28` }} />
            <div className="h-2 w-1/2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
          <div
            className="w-full rounded-xl"
            style={{
              height: "45%",
              background: `linear-gradient(135deg, ${GOLD}0D 0%, rgba(255,255,255,0.03) 100%)`,
              border: `1px solid ${GOLD}18`,
            }}
          />
          <div className="space-y-1.5">
            <div className="h-2 w-full rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
            <div className="h-2 w-4/5 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }} />
            <div className="h-2 w-3/5 rounded-full" style={{ background: "rgba(255,255,255,0.03)" }} />
          </div>
        </div>

        {/* Corner glow */}
        <div
          className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
          style={{ background: `radial-gradient(circle at top right, ${GOLD}15, transparent 70%)` }}
        />
        {/* Page label */}
        <div
          className="absolute bottom-3 right-4 text-xs tracking-widest font-light"
          style={{ color: `${GOLD}55` }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
      <p className="mt-3 text-center text-xs tracking-[0.2em] uppercase" style={{ color: `${GOLD}55` }}>
        {label}
      </p>
    </motion.div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "20%"]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const scrollGallery = (dir: "left" | "right") => {
    if (!galleryRef.current) return;
    galleryRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

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
            transition={{ duration: 0.8, delay: 1.2 }}
            onAnimationComplete={() => (document.body.style.overflow = "unset")}
            className="fixed inset-0 z-50 bg-background flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="tracking-[0.5em] text-sm uppercase"
              style={{ color: GOLD }}
            >
              Initializing...
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
            {/* Eyebrow */}
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
            className="absolute bottom-10 flex flex-col items-center gap-2"
            style={{ color: `${GOLD}40` }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-px h-8"
              style={{ background: `linear-gradient(to bottom, ${GOLD}50, transparent)` }}
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
                    className="group rounded-2xl p-7 h-full transition-all duration-400"
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

              {/* 6th card — CTA */}
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
            PDF PREVIEW GALLERY
        ══════════════════════════════════════ */}
        <section id="gallery" className="py-32 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${GOLD}07 0%, transparent 70%)` }}
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

          {/* Gallery */}
          <div className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #050505, transparent)" }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #050505, transparent)" }}
            />

            <div
              ref={galleryRef}
              className="flex gap-6 overflow-x-auto pb-8 px-16 md:px-32"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {[
                "Cover",
                "Introduction",
                "Digital Thinking",
                "Asset Building",
                "Execution Systems",
                "Digital Identity",
                "Long-Term Leverage",
                "Action Plan",
              ].map((label, i) => (
                <PDFCard key={i} index={i} label={label} delay={i * 0.06} />
              ))}
            </div>
          </div>

          {/* Arrows */}
          <div className="flex justify-center gap-3 mt-6">
            {(["left", "right"] as const).map((dir) => (
              <button
                key={dir}
                data-testid={`button-gallery-${dir}`}
                onClick={() => scrollGallery(dir)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-200"
                style={{ border: `1px solid ${GOLD}33`, color: `${GOLD}88`, background: "rgba(255,255,255,0.02)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}77`;
                  (e.currentTarget as HTMLButtonElement).style.color = GOLD_LIGHT;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}33`;
                  (e.currentTarget as HTMLButtonElement).style.color = `${GOLD}88`;
                }}
              >
                {dir === "left" ? "←" : "→"}
              </button>
            ))}
          </div>
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
            <button
              data-testid="button-download-foundation"
              className="inline-flex items-center justify-center px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 mb-5"
              style={{
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_MID} 50%, ${GOLD_LIGHT} 100%)`,
                color: "#050505",
                boxShadow: `0 0 40px ${GOLD}55, 0 12px 32px rgba(0,0,0,0.5)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 60px ${GOLD}88, 0 16px 48px rgba(0,0,0,0.6)`;
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 40px ${GOLD}55, 0 12px 32px rgba(0,0,0,0.5)`;
                (e.currentTarget as HTMLButtonElement).style.transform = "";
              }}
            >
              Download The Digital Foundation
            </button>
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
          {/* Background glow */}
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
            <button
              data-testid="button-get-copy-final"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 mb-14"
              style={{
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_MID} 50%, ${GOLD_LIGHT} 100%)`,
                color: "#050505",
                boxShadow: `0 0 36px ${GOLD}55, 0 8px 24px rgba(0,0,0,0.4)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 55px ${GOLD}88, 0 12px 40px rgba(0,0,0,0.5)`;
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 36px ${GOLD}55, 0 8px 24px rgba(0,0,0,0.4)`;
                (e.currentTarget as HTMLButtonElement).style.transform = "";
              }}
            >
              Get Your Copy
            </button>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="flex flex-col items-center gap-3">
              <div
                className="font-[Outfit] text-3xl font-black tracking-[0.4em] text-white"
                style={{ textShadow: `0 0 20px ${GOLD}44` }}
              >
                AURIX
              </div>
              <p className="text-xs tracking-[0.3em] uppercase" style={{ color: `${GOLD}55` }}>
                AURIX.CO
              </p>
            </div>
          </FadeIn>
        </section>

      </div>
    </TooltipProvider>
  );
}

export default App;
