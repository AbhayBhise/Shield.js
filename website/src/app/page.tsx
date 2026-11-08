"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { Canvas } from "@react-three/fiber";
import { Shield3D } from "@/components/ui/Shield3D";
import { Features } from "@/components/sections/Features";
import { Quickstart } from "@/components/sections/Quickstart";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[200vh] bg-background text-foreground selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* 3D Shield Hero Container - Centered */}
      <div className="absolute top-0 left-0 w-full h-[120vh] flex justify-center items-center z-0 pointer-events-auto opacity-100 hidden md:flex">
        <div className="w-full max-w-7xl h-full">
          <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <Shield3D />
          </Canvas>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 h-screen flex flex-col justify-center items-center pointer-events-none text-center -mt-16">
        <motion.div 
          style={{ y, opacity }}
          className="container mx-auto px-4 flex flex-col items-center relative max-w-[800px]"
        >
          {/* Eyebrow / Label */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 font-mono text-cyan-500 tracking-[0.2em] text-sm uppercase drop-shadow-md"
          >
            Shield.js
          </motion.div>

          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[8vw] md:text-[6vw] leading-[0.9] font-black tracking-tighter mix-blend-difference drop-shadow-2xl text-white"
          >
            YOUR CONTENT,<br />
            <span className="text-cyan-400">UNSCRAPABLE.</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-12 flex flex-col items-center gap-8 relative z-10"
          >
            <p className="text-xl md:text-2xl font-light tracking-tight max-w-2xl text-foreground drop-shadow-md">
              A zero-dependency, ultra-lightweight client-side JavaScript library designed to provide maximum friction against content theft.
            </p>
            
            <div className="pointer-events-auto flex flex-col sm:flex-row gap-4 items-center">
              <a href="/docs" data-cursor="hover" className="group relative inline-flex h-14 items-center justify-center overflow-hidden bg-white px-8 font-medium text-black transition-all">
                <span className="absolute h-0 w-0 bg-cyan-500 transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56"></span>
                <span className="relative z-10 transition-colors duration-500 ease-out group-hover:text-black uppercase tracking-widest text-sm">
                  Initialize Shield
                </span>
              </a>
              
              <div className="flex items-center justify-center h-14 px-6 border border-border bg-black text-foreground font-mono text-sm shadow-xl">
                npm i shield-js-core
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground mt-4 drop-shadow-md">
              <span>Client-Side Security</span>
              <span className="hidden sm:inline">—</span>
              <span>Zero Dependencies</span>
              <span className="hidden sm:inline">—</span>
              <span>MIT License</span>
            </div>
          </motion.div>
        </motion.div>
      </section>
      
      <Features />
      <Quickstart />
      
    </div>
  );
}
