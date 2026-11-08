"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Menu, X, ArrowRight, Star } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 max-w-7xl items-center justify-between mx-auto px-4 md:px-8">
        
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <Shield className="h-6 w-6 text-cyan-400 transition-transform group-hover:scale-110" />
            <span className="font-black tracking-tight text-white text-lg">
              Shield<span className="text-cyan-400">.js</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/docs"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/#features"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="/playground"
              className="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              Playground
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-cyan-500/20 text-cyan-300 rounded">Live</span>
            </Link>
            <Link
              href="/changelog"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Changelog
            </Link>
            <Link
              href="/feedback"
              className="text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              Feedback
            </Link>
          </nav>
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center space-x-3">
          <a
            href="https://github.com/AbhayBhise/Shield.js"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 hover:text-white transition-all"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
            <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-[11px] text-zinc-400 flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> 1.2k
            </span>
          </a>

          <Link href="/docs">
            <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold text-xs uppercase tracking-wider rounded-md flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/40 bg-zinc-950/95 backdrop-blur-xl px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-medium text-base">
            <Link
              href="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-cyan-400 py-1 transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-cyan-400 py-1 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/playground"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-cyan-400 py-1 transition-colors flex items-center justify-between"
            >
              <span>Playground</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded">Live Demo</span>
            </Link>
            <Link
              href="/changelog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-cyan-400 py-1 transition-colors"
            >
              Changelog
            </Link>
            <Link
              href="/feedback"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-cyan-400 py-1 transition-colors"
            >
              Feedback
            </Link>
          </nav>

          <div className="pt-4 border-t border-border/30 flex flex-col gap-3">
            <a
              href="https://github.com/AbhayBhise/Shield.js"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 text-sm font-mono text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Star on GitHub (1.2k)</span>
            </a>

            <Link href="/docs" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold text-xs uppercase tracking-wider">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
