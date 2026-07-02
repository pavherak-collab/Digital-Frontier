import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParticleBackground } from "./components/ParticleBackground";
import { TooltipProvider } from "@/components/ui/tooltip";

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
        <div className="mb-8 tracking-[0.3em] text-xs uppercase text-primary/70 font-semibold">
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

function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add dark class to document body manually since it's a forced dark theme
    document.documentElement.classList.add('dark');
    
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <TooltipProvider>
      <div className="bg-background min-h-screen text-foreground relative overflow-hidden font-sans selection:bg-primary/30">
        
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
            onAnimationComplete={() => document.body.style.overflow = 'unset'}
            className="fixed inset-0 z-50 bg-background flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-primary tracking-[0.5em] text-sm uppercase"
            >
              Initializing...
            </motion.div>
          </motion.div>
        )}

        <ParticleBackground />

        {/* Hero Section */}
        <section className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative">
          <motion.div 
            style={{ y }}
            className="absolute inset-0 z-[-1]"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2 }}
            className="text-center w-full max-w-6xl mx-auto"
          >
            <h1 className="font-[Outfit] text-[12vw] leading-[0.9] font-black uppercase text-white mb-8 tracking-tighter text-glow">
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
                Technology changes the world. <br/> Curiosity changes humanity.
              </p>
              
              <button className="group relative inline-flex items-center justify-center px-10 py-5 font-semibold text-white transition-all duration-300 ease-in-out bg-transparent border border-primary/30 rounded-full hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background overflow-hidden">
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-primary group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative uppercase tracking-widest text-sm text-primary group-hover:text-white transition-colors duration-300">
                  Begin the Journey
                </span>
                <div className="absolute inset-0 rounded-full border border-primary/0 group-hover:border-primary/50 group-hover:animate-ping transition-all duration-700"></div>
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Chapters */}
        <Chapter 
          number="001" 
          title="Curiosity" 
          body={[
            "Every breakthrough begins with a question.",
            "Curiosity is the force that transforms impossible ideas into reality.",
            "We believe the future belongs to those who never stop asking 'What if?'"
          ]}
        />
        
        <Chapter 
          number="002" 
          title="Creation" 
          body={[
            "Creating is humanity's greatest superpower.",
            "AI should never replace imagination.",
            "It should amplify it."
          ]}
        />

        <Chapter 
          number="003" 
          title="Technology" 
          body={[
            "Technology is not the destination.",
            "It is the bridge between imagination and reality."
          ]}
        />

        <Chapter 
          number="004" 
          title="Responsibility" 
          body={[
            "Every tool shapes the people who use it.",
            "Every innovation carries responsibility.",
            "Build wisely."
          ]}
        />

        {/* Chapter 5 - Special Formatting */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
          <FadeIn>
            <div className="mb-8 tracking-[0.3em] text-xs uppercase text-primary/70 font-semibold">
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
              <p className="font-[Outfit] text-4xl md:text-6xl text-white font-bold text-glow">
                We create it.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Manifesto Block */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 bg-black/40 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-5xl w-full space-y-16 text-center">
            {[
              "We believe curiosity changes the world.",
              "We believe technology should amplify creativity.",
              "We believe ideas deserve to exist.",
              "We believe creators deserve better tools.",
              "We believe the future belongs to those who build it."
            ].map((belief, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <h3 className="font-[Outfit] text-3xl md:text-5xl lg:text-6xl font-medium text-white/90 tracking-tight">
                  {belief}
                </h3>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Final Close */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden pb-24">
          <FadeIn delay={0.2}>
            <h2 className="font-[Outfit] text-[8vw] leading-[1] font-black uppercase text-white mb-16 tracking-tighter text-glow">
              Don't wait<br/>for the future.<br/>
              <span className="text-primary">Create it.</span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.6}>
            <div className="flex flex-col items-center gap-6 mt-12">
              <div className="font-[Outfit] text-4xl font-bold tracking-[0.5em] text-white/90">
                AURIX
              </div>
              <p className="text-primary/70 uppercase tracking-widest text-sm font-semibold">
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
