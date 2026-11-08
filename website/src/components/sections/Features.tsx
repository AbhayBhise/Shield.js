"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Skull, 
  ImageOff, 
  TerminalSquare, 
  Frame, 
  Printer, 
  Keyboard, 
  Scissors 
} from "lucide-react";

const features = [
  {
    title: "DOM Poisoning",
    description: "Injects dynamic noise and fake nodes to break automated scraping scripts and LLM data extractors.",
    icon: <Skull className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Image Protection",
    description: "Blocks right-click, drag-and-drop, and long-press saving to prevent asset theft.",
    icon: <ImageOff className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "DevTools Trap",
    description: "Detects and aggressively counters browser inspector and debugging tools in real time.",
    icon: <TerminalSquare className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Anti-Clickjacking",
    description: "Prevents your site from being secretly loaded inside malicious iframes.",
    icon: <Frame className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Print Shield",
    description: "Instantly redacts and scrambles the page content if a user attempts to print or PDF the page.",
    icon: <Printer className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Shortcut Blocking",
    description: "Intercepts and nullifies common exfiltration shortcuts (Ctrl+C, Ctrl+S, Ctrl+P).",
    icon: <Keyboard className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Snipping Tool Defeat",
    description: "Utilizes advanced focus-loss detection to obscure content when screenshot utilities are activated.",
    icon: <Scissors className="h-6 w-6 text-cyan-400" />,
  },
];

export function Features() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="features" className="py-32 relative z-10 bg-background/50 border-t border-border/10">
      <div className="container mx-auto px-4 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 drop-shadow-md">
            MAXIMUM <span className="text-cyan-400">FRICTION.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
            Shield.js deploys an arsenal of client-side countermeasures to protect your proprietary content from bots, scrapers, and bad actors.
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-none border border-border/40 bg-black/40 backdrop-blur-sm p-8 transition-colors hover:bg-black/60 hover:border-cyan-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-cyan-500/20 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
