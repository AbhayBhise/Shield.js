"use client";

import { motion } from "framer-motion";
import { GitCommit, Star, Bug, Zap } from "lucide-react";

const changelog = [
  {
    version: "v1.0.0",
    date: "October 12, 2026",
    title: "The Enterprise Release",
    description: "Shield.js reaches 1.0. Complete rewrite of the core mutation observer engine for zero-latency DOM poisoning.",
    changes: [
      { type: "feature", text: "Introduced advanced Canvas fingerprinting obfuscation." },
      { type: "feature", text: "Added strict mode for overriding browser DevTools shortcuts natively." },
      { type: "improvement", text: "Reduced bundle size from 3.2kb to 2.8kb gzipped." },
    ]
  },
  {
    version: "v0.9.5",
    date: "September 28, 2026",
    title: "Anti-Clickjacking Update",
    description: "Major improvements to iframe busting and clickjacking defenses.",
    changes: [
      { type: "feature", text: "New frame-ancestor validation protocol." },
      { type: "bugfix", text: "Fixed a bug where text selection was still possible on Firefox Mobile." },
    ]
  },
  {
    version: "v0.9.0",
    date: "September 05, 2026",
    title: "Initial Public Beta",
    description: "First public release of Shield.js.",
    changes: [
      { type: "feature", text: "Basic DOM poisoning and right-click disabling." },
      { type: "feature", text: "Drag-and-drop interception for images." },
    ]
  }
];

const getIcon = (type: string) => {
  switch (type) {
    case 'feature': return <Star className="w-4 h-4 text-emerald-400" />;
    case 'bugfix': return <Bug className="w-4 h-4 text-red-400" />;
    case 'improvement': return <Zap className="w-4 h-4 text-amber-400" />;
    default: return <GitCommit className="w-4 h-4 text-cyan-400" />;
  }
};

export default function Changelog() {
  return (
    <div className="min-h-screen pt-24 pb-24 px-4 container mx-auto max-w-4xl flex flex-col">
      
      <div className="text-left mb-16 border-b border-border/40 pb-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 drop-shadow-md uppercase">
          Changelog
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Track the evolution of Shield.js. We push updates constantly to stay ahead of scraping technologies.
        </p>
      </div>

      <div className="relative border-l border-border/40 ml-4 md:ml-8 space-y-16 pb-8">
        {changelog.map((release, index) => (
          <motion.div 
            key={release.version}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Node */}
            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            
            {/* Version Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">{release.version}</h2>
              <span className="text-cyan-400 font-mono text-sm tracking-widest hidden md:inline">—</span>
              <span className="text-muted-foreground font-mono text-sm">{release.date}</span>
            </div>
            
            <h3 className="text-xl font-semibold mb-2 text-zinc-300">{release.title}</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl leading-relaxed">
              {release.description}
            </p>
            
            {/* Changes List */}
            <ul className="space-y-3">
              {release.changes.map((change, i) => (
                <li key={i} className="flex items-start gap-3 bg-zinc-950/50 p-3 border border-border/20 rounded-md max-w-3xl hover:border-cyan-500/30 transition-colors">
                  <div className="mt-0.5 shrink-0">
                    {getIcon(change.type)}
                  </div>
                  <span className="text-sm text-zinc-300 leading-relaxed">{change.text}</span>
                </li>
              ))}
            </ul>
            
          </motion.div>
        ))}
      </div>
      
    </div>
  );
}
