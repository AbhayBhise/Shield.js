"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleGitHubLogin = () => {
    window.location.href = "https://github.com/AbhayBhise/Shield.js";
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 container mx-auto max-w-md flex flex-col items-center justify-center">
      
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center space-x-2 text-white group mb-4">
          <Shield className="h-8 w-8 text-cyan-400 transition-transform group-hover:scale-110" />
          <span className="font-black text-2xl tracking-tight">Shield<span className="text-cyan-400">.js</span></span>
        </Link>
        <h1 className="text-2xl font-black tracking-tight uppercase text-white mb-2">
          Developer Access
        </h1>
        <p className="text-zinc-400 text-sm">
          Sign in to access telemetry streams and security audit logs.
        </p>
      </div>

      <div className="w-full bg-zinc-950/80 border border-border/40 p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

        {isDone ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Access Granted</h3>
            <p className="text-zinc-400 text-xs">
              Welcome, operator. Your developer session is now authenticated.
            </p>
            <div className="pt-4">
              <Link href="/playground">
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold text-xs uppercase tracking-wider">
                  Open Playground
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            <button
              onClick={handleGitHubLogin}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 text-white font-medium rounded-none text-sm transition-all"
            >
              <GithubIcon className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-border/40 w-full"></div>
              <span className="bg-zinc-950 px-3 text-xs font-mono text-zinc-500 uppercase tracking-widest relative">Or</span>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Developer Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@domain.com"
                  className="w-full bg-black/50 border border-border/40 p-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Enter Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-zinc-500">
              Protected by Shield.js client armor. <Lock className="w-3 h-3 inline ml-1" />
            </div>

          </div>
        )}

      </div>

      <div className="mt-8 text-center text-xs text-zinc-500">
        Need an account?{" "}
        <Link href="/signup" className="text-cyan-400 hover:underline">
          Register new operator
        </Link>
      </div>

    </div>
  );
}
