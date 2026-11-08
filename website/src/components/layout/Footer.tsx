"use client";

import Link from "next/link";
import { Shield, ArrowUp, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/40 bg-zinc-950/90 text-zinc-400 relative z-20 backdrop-blur-md">
      <div className="container max-w-7xl mx-auto px-4 md:px-8 py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand & Mission (Col 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-2 text-white group">
              <Shield className="h-6 w-6 text-cyan-400 transition-transform group-hover:scale-110" />
              <span className="font-black text-xl tracking-tight">Shield.js</span>
            </Link>
            
            <p className="text-sm leading-relaxed text-zinc-400 max-w-sm">
              The zero-dependency, ultra-lightweight client-side JavaScript engine providing maximum friction against content theft, automated scraping, and asset leakage.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
                v1.0.4 • All Systems Protected
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/docs" className="hover:text-cyan-400 transition-colors">Documentation</Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-cyan-400 transition-colors">Features</Link>
              </li>
              <li>
                <Link href="/playground" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  Playground
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 rounded">Live</span>
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-cyan-400 transition-colors">Changelog</Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-cyan-400 transition-colors">Submit Feedback</Link>
              </li>
            </ul>
          </div>

          {/* Developers & Integration */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200">Developers</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/docs/api" className="hover:text-cyan-400 transition-colors">API Reference</Link>
              </li>
              <li>
                <Link href="/docs/configuration" className="hover:text-cyan-400 transition-colors">Configuration</Link>
              </li>
              <li>
                <Link href="/docs/frameworks" className="hover:text-cyan-400 transition-colors">Framework Guides</Link>
              </li>
              <li>
                <a 
                  href="https://www.npmjs.com/package/shield-js-core" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  npm Package <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/AbhayBhise/Shield.js" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  GitHub Repository <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200">Community & Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="https://github.com/AbhayBhise" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-cyan-400 transition-colors"
                >
                  Author (@AbhayBhise)
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/AbhayBhise/Shield.js/blob/main/CONTRIBUTING.md" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  Contributing Guide <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/AbhayBhise/Shield.js/blob/main/CLA.md" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  Contributor License Agreement <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/AbhayBhise/Shield.js/blob/main/SECURITY.md" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  Security Policy <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/AbhayBhise/Shield.js/blob/main/LICENSE" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  Source-Available License <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center space-x-2 text-zinc-500 text-center sm:text-left">
            <span>Proprietary work by</span>
            <a
              href="https://github.com/AbhayBhise"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 font-bold hover:text-cyan-400 transition-colors underline underline-offset-4"
            >
              Abhay Bhise
            </a>
            <span>• All Rights Reserved</span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/AbhayBhise/Shield.js"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <button
              onClick={scrollToTop}
              className="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
