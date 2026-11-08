"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

const scriptCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Protected Website</title>
    
    <!-- Drop this into the head tag -->
    <script src="/path/to/dist/shield.min.js"></script>
    
</head>
<body>
    <p>This text is protected against scrapers!</p>
    <img src="photo.jpg" alt="Protected image" />
</body>
</html>`;

const npmCode = `// Just import it! It auto-initializes and secures the entire app globally.
import 'shield-js-core'; 

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`;

export function Quickstart() {
  const [activeTab, setActiveTab] = useState<'npm' | 'script'>('npm');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = activeTab === 'npm' ? npmCode : scriptCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 relative z-10 bg-black/60 border-t border-border/10">
      <div className="container mx-auto px-4 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white drop-shadow-md">
            ZERO CONFIGURATION.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The moment the script loads into the browser, it automatically initializes and arms all security protocols. Choose your integration method below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex flex-col w-full">
            <div className="flex w-full mb-8 bg-black/50 border border-border/40 p-1">
              <button
                onClick={() => setActiveTab('npm')}
                className={`flex-1 py-2 font-mono text-sm tracking-widest uppercase transition-colors ${
                  activeTab === 'npm' 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'text-muted-foreground hover:text-white'
                }`}
              >
                NPM / ES Module
              </button>
              <button
                onClick={() => setActiveTab('script')}
                className={`flex-1 py-2 font-mono text-sm tracking-widest uppercase transition-colors ${
                  activeTab === 'script' 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'text-muted-foreground hover:text-white'
                }`}
              >
                HTML Script Tag
              </button>
            </div>

            <div className="relative group rounded-none border border-border/40 bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-black/40">
                <span className="text-xs font-mono text-muted-foreground">
                  {activeTab === 'npm' ? 'React / Next.js / Vue' : 'index.html'}
                </span>
                <button 
                  onClick={handleCopy}
                  className="text-muted-foreground hover:text-cyan-400 transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-widest"
                >
                  {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
                </button>
              </div>
              <div className="p-6 overflow-x-auto min-h-[300px]">
                <pre className="font-mono text-sm leading-relaxed text-emerald-400/90">
                  <code>
                    {activeTab === 'npm' ? (
                      <>
                        <span className="text-zinc-500 block mb-4"># 1. Install via NPM</span>
                        <span className="text-cyan-400 block mb-6">npm install shield-js-core</span>
                        {npmCode}
                      </>
                    ) : (
                      <>{scriptCode}</>
                    )}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
