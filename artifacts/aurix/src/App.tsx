import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParticleBackground } from "./components/ParticleBackground";
import { TooltipProvider } from "@/components/ui/tooltip";

const GOLD = "#D4AF37";
const GOLD_LIGHT = "#FFD86B";
const GOLD_MID = "#E7C86E";

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

const Chapter = ({ number, title, body, delay = 0 }: { number: string; title: string; body: string[]; delay?: number }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
      <FadeIn delay={delay}>
        <div className="mb-8 tracking-[0.3em] text-xs uppercase font-semibold" style={{ color: `${GOLD}99` }}>
          Chapter {number}
        </div>
      </FadeIn>
      <FadeIn delay={delay + 0.2}>
        <h2 className="font-[Outfit] text-5xl md:text-7xl font-bold mb-12 text-white tracking-tight">
          {title}
        </h2>
      </FadeIn>
      <div className="max-w-[70ch] space-y-6">
        {body.map((paragraph, idx) => (
          <FadeIn key={idx} delay={delay + 0.3 + idx * 0.1}>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-light">
              {paragraph}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

const PDFPageMockup = ({ pageNum, label, delay = 0 }: { pageNum: number; label: string; delay?: number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0px) scale(1)",
        transition: "transform 0.4s cubic-bezier(0.21,0.47,0.32,0.98)",
      }}
      className="flex-shrink-0 w-52 md:w-64"
    >
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: hovered ? `1px solid ${GOLD}55` : "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          boxShadow: hovered
            ? `0 24px 60px rgba(0,0,0,0.6), 0 0 30px ${GOLD}22`
            : "0 8px 32px rgba(0,0,0,0.4)",
          transition: "border 0.4s ease, box-shadow 0.4s ease",
          aspectRatio: "1/1.414",
        }}
      >
        {/* Placeholder content for PDF page */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-4">
          <div className="w-full h-3 rounded-full" style={{ background: `${GOLD}30` }} />
          <div className="w-4/5 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="w-3/4 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="w-full h-16 rounded-lg mt-2" style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}20` }} />
          <div className="w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="w-4/5 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }} />
          <div className="w-3/5 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }} />
        </div>
        {/* Gold corner accent */}
        <div
          className="absolute top-3 right-3 w-2 h-2 rounded-full"
          style={{ background: GOLD_LIGHT, boxShadow: `0 0 8px ${GOLD}` }}
        />
        {/* Page number */}
        <div
          className="absolute bottom-3 right-4 text-xs font-light tracking-widest"
          style={{ color: `${GOLD}70` }}
        >
          {String(pageNum).padStart(2, "0")}
        </div>
      </div>
      <p className="mt-3 text-center text-xs tracking-widest uppercase" style={{ color: `${GOLD}60` }}>
        {label}
      </p>
    </motion.div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const scrollGallery = (dir: "left" | "right") => {
    if (!galleryRef.current) return;
    galleryRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <TooltipProvider>
      <div className="bg-background min-h-screen text-foreground relative overflow-hidden font-sans">

        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
            onAnimationComplete={() => (document.body.style.overflow = "unset")}
            className="fixed inset-0 z-50 bg-background flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="tracking-[0.5em] text-sm uppercase"
              style={{ color: GOLD }}
            >
              Initializing...
            </motion.div>
          </motion.div>
        )}

        <ParticleBackground />

        {/* ── Hero ── */}
        <section className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative">
          <motion.div style={{ y }} className="absolute inset-0 z-[-1]" />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2 }}
            className="text-center w-full max-w-6xl mx-auto"
          >
            <h1
              className="font-[Outfit] text-[12vw] leading-[0.9] font-black uppercase text-white mb-8 tracking-tighter"
              style={{ textShadow: `0 0 40px ${GOLD}55` }}
            >
              The Digital
              <br />
              Foundation
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 3 }}
            >
              <p className="text-2xl md:text-3xl text-foreground/70 font-light mb-16 max-w-2xl mx-auto leading-relaxed">
                Technology changes the world. <br /> Curiosity changes humanity.
              </p>

              <button
                data-testid="button-begin-journey"
                className="group relative inline-flex items-center justify-center px-10 py-5 font-semibold transition-all duration-300 ease-in-out bg-transparent rounded-full focus:outline-none overflow-hidden"
                style={{
                  border: `1px solid ${GOLD}44`,
                  color: GOLD,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 30px ${GOLD}44, inset 0 0 20px ${GOLD}11`;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}99`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}44`;
                }}
              >
                <span className="relative uppercase tracking-widest text-sm">Begin the Journey</span>
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Chapters ── */}
        <Chapter number="001" title="Curiosity" body={[
          "Every breakthrough begins with a question.",
          "Curiosity is the force that transforms impossible ideas into reality.",
          "We believe the future belongs to those who never stop asking 'What if?'"
        ]} />

        <Chapter number="002" title="Creation" body={[
          "Creating is humanity's greatest superpower.",
          "AI should never replace imagination.",
          "It should amplify it."
        ]} />

        <Chapter number="003" title="Technology" body={[
          "Technology is not the destination.",
          "It is the bridge between imagination and reality."
        ]} />

        <Chapter number="004" title="Responsibility" body={[
          "Every tool shapes the people who use it.",
          "Every innovation carries responsibility.",
          "Build wisely."
        ]} />

        {/* ── Chapter 005 — The Future ── */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
          <FadeIn>
            <div className="mb-8 tracking-[0.3em] text-xs uppercase font-semibold" style={{ color: `${GOLD}99` }}>
              Chapter 005
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="font-[Outfit] text-5xl md:text-7xl font-bold mb-12 text-white tracking-tight">
              The Future
            </h2>
          </FadeIn>
          <div className="max-w-[70ch] space-y-12">
            <FadeIn delay={0.3}>
              <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-light">
                We don't wait for the future.
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <p className="font-[Outfit] text-4xl md:text-6xl text-white font-bold" style={{ textShadow: `0 0 30px ${GOLD}66` }}>
                We create it.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Manifesto Block ── */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 bg-black/40 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-5xl w-full space-y-16 text-center">
            {[
              "We believe curiosity changes the world.",
              "We believe technology should amplify creativity.",
              "We believe ideas deserve to exist.",
              "We believe creators deserve better tools.",
              "We believe the future belongs to those who build it.",
            ].map((belief, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <h3 className="font-[Outfit] text-3xl md:text-5xl lg:text-6xl font-medium text-white/90 tracking-tight">
                  {belief}
                </h3>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Download Section ── */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 text-center relative">
          {/* Subtle gold bloom */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${GOLD}09 0%, transparent 70%)` }}
          />

          <FadeIn>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.25em] font-semibold mb-10"
              style={{
                border: `1px solid ${GOLD}44`,
                color: GOLD_MID,
                background: `${GOLD}0D`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: GOLD_LIGHT }}
              />
              Limited Launch Offer
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-[Outfit] text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Download The Digital Foundation
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl text-foreground/60 font-light max-w-xl mx-auto mb-14 leading-relaxed">
              Experience the complete philosophy of AURIX in a beautifully designed digital PDF.
            </p>
          </FadeIn>

          {/* PDF mockup card */}
          <FadeIn delay={0.3}>
            <div
              className="relative mx-auto mb-14 rounded-2xl overflow-hidden"
              style={{
                width: "min(380px, 90vw)",
                aspectRatio: "1/1.414",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${GOLD}33`,
                backdropFilter: "blur(20px)",
                boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 60px ${GOLD}18`,
              }}
            >
              {/* Cover design */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
                <div>
                  <div className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: `${GOLD}80` }}>
                    AURIX
                  </div>
                  <div
                    className="font-[Outfit] font-black text-3xl md:text-4xl text-white leading-tight tracking-tight mb-3"
                    style={{ textShadow: `0 0 20px ${GOLD}44` }}
                  >
                    The Digital<br />Foundation
                  </div>
                  <div className="text-sm font-light" style={{ color: `${GOLD}70` }}>
                    A Manifesto for the Future
                  </div>
                </div>

                <div className="space-y-2.5">
                  {["Curiosity", "Creation", "Technology", "Responsibility", "The Future"].map((ch, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-px" style={{ background: GOLD }} />
                      <span className="text-xs tracking-widest text-white/40 uppercase">{ch}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-end justify-between">
                  <div
                    className="w-10 h-10 rounded-full"
                    style={{ background: `radial-gradient(circle, ${GOLD_LIGHT} 0%, ${GOLD} 60%, transparent 100%)`, boxShadow: `0 0 20px ${GOLD}88` }}
                  />
                  <div className="text-xs tracking-widest text-white/20 uppercase">2025 Edition</div>
                </div>
              </div>

              {/* Top-right corner gradient */}
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${GOLD}20, transparent 70%)` }}
              />
            </div>
          </FadeIn>

          {/* Price + CTA */}
          <FadeIn delay={0.4}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-lg text-foreground/30 line-through font-light">€19.99</span>
              <span
                className="font-[Outfit] text-4xl font-black tracking-tight"
                style={{ color: GOLD_LIGHT, textShadow: `0 0 20px ${GOLD}88` }}
              >
                FREE
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <button
              data-testid="button-download-free"
              className="group relative inline-flex items-center justify-center px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_MID} 50%, ${GOLD_LIGHT} 100%)`,
                color: "#050505",
                boxShadow: `0 0 30px ${GOLD}55, 0 8px 24px rgba(0,0,0,0.4)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 50px ${GOLD}88, 0 12px 40px rgba(0,0,0,0.5)`;
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 30px ${GOLD}55, 0 8px 24px rgba(0,0,0,0.4)`;
                (e.currentTarget as HTMLButtonElement).style.transform = "";
              }}
            >
              Download Free
            </button>
          </FadeIn>

          <FadeIn delay={0.6}>
            <p className="mt-5 text-xs tracking-widest uppercase text-foreground/30 font-light">
              Limited-time launch offer.
            </p>
          </FadeIn>
        </section>

        {/* ── PDF Preview Gallery ── */}
        <section className="py-32 relative overflow-hidden">
          <FadeIn>
            <h3
              className="font-[Outfit] text-2xl md:text-3xl font-semibold text-center text-white/80 mb-4 tracking-tight"
            >
              Inside the Foundation
            </h3>
            <p className="text-center text-sm tracking-widest uppercase mb-14" style={{ color: `${GOLD}60` }}>
              Five chapters. One complete philosophy.
            </p>
          </FadeIn>

          {/* Scrollable gallery */}
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #050505, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #050505, transparent)" }} />

            <div
              ref={galleryRef}
              className="flex gap-6 overflow-x-auto pb-6 px-12 md:px-24 scrollbar-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {[
                { label: "Cover", num: 1 },
                { label: "Curiosity", num: 2 },
                { label: "Creation", num: 3 },
                { label: "Technology", num: 4 },
                { label: "Responsibility", num: 5 },
                { label: "The Future", num: 6 },
                { label: "Manifesto", num: 7 },
              ].map((pg, i) => (
                <PDFPageMockup key={i} pageNum={pg.num} label={pg.label} delay={i * 0.08} />
              ))}
            </div>
          </div>

          {/* Scroll arrows */}
          <div className="flex justify-center gap-4 mt-8">
            {(["left", "right"] as const).map((dir) => (
              <button
                key={dir}
                data-testid={`button-gallery-${dir}`}
                onClick={() => scrollGallery(dir)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  border: `1px solid ${GOLD}33`,
                  color: `${GOLD}99`,
                  background: "rgba(255,255,255,0.02)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}88`;
                  (e.currentTarget as HTMLButtonElement).style.color = GOLD_LIGHT;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}33`;
                  (e.currentTarget as HTMLButtonElement).style.color = `${GOLD}99`;
                }}
              >
                {dir === "left" ? "←" : "→"}
              </button>
            ))}
          </div>
        </section>

        {/* ── Premium CTA ── */}
        <section className="py-40 flex flex-col items-center justify-center text-center px-6 relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${GOLD}08 0%, transparent 70%)` }}
          />
          <FadeIn>
            <p className="font-[Outfit] text-3xl md:text-5xl text-white/80 font-medium mb-3 tracking-tight">
              The future doesn't wait.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="font-[Outfit] text-3xl md:text-5xl text-white/80 font-medium mb-14 tracking-tight">
              Neither should you.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <button
              data-testid="button-get-foundation"
              className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full font-semibold text-sm uppercase tracking-widest transition-all duration-300"
              style={{
                border: `1px solid ${GOLD}55`,
                color: GOLD,
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = `${GOLD}12`;
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 30px ${GOLD}33`;
                (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}99`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
                (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}55`;
              }}
            >
              Get The Digital Foundation
            </button>
          </FadeIn>
        </section>

        {/* ── Final Close ── */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden pb-24">
          <FadeIn delay={0.2}>
            <h2
              className="font-[Outfit] text-[8vw] leading-[1] font-black uppercase text-white mb-16 tracking-tighter"
              style={{ textShadow: `0 0 60px ${GOLD}44` }}
            >
              Don't wait<br />for the future.<br />
              <span style={{ color: GOLD, textShadow: `0 0 40px ${GOLD}88` }}>Create it.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex flex-col items-center gap-6 mt-12">
              <div
                className="font-[Outfit] text-4xl font-bold tracking-[0.5em] text-white/90"
                style={{ textShadow: `0 0 20px ${GOLD}55` }}
              >
                AURIX
              </div>
              <p className="uppercase tracking-widest text-sm font-semibold" style={{ color: `${GOLD}70` }}>
                Creating the future, one idea at a time.
              </p>
            </div>
          </FadeIn>
        </section>

      </div>
    </TooltipProvider>
  );
}

export default App;
