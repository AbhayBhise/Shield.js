"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, Bug, Lightbulb, CheckCircle2 } from "lucide-react";

export default function Feedback() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"bug" | "feature" | "general">("general");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after a few seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 container mx-auto max-w-3xl flex flex-col items-center">
      
      <div className="text-center mb-12 w-full">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 drop-shadow-md uppercase">
          Submit <span className="text-cyan-400">Feedback</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Help us improve the ultimate anti-scraping engine. Report bugs, suggest features, or just say hello.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-zinc-950/80 border border-border/40 p-8 relative overflow-hidden backdrop-blur-sm shadow-xl shadow-cyan-900/5"
      >
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center h-full"
          >
            <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6 border border-cyan-500/20">
              <CheckCircle2 className="w-10 h-10 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Transmission Received</h3>
            <p className="text-zinc-400 max-w-md">
              Thank you for your feedback. Our engineers will review your report shortly.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Feedback Type Selector */}
            <div className="space-y-4">
              <label className="text-sm font-mono tracking-widest text-zinc-400 uppercase">Category</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <button
                  type="button"
                  onClick={() => setFeedbackType("bug")}
                  className={`flex flex-col items-center justify-center p-4 border transition-all ${
                    feedbackType === "bug" 
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" 
                      : "bg-black/40 border-border/40 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900"
                  }`}
                >
                  <Bug className="w-6 h-6 mb-2" />
                  <span className="text-sm font-bold uppercase tracking-wider">Bug Report</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFeedbackType("feature")}
                  className={`flex flex-col items-center justify-center p-4 border transition-all ${
                    feedbackType === "feature" 
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" 
                      : "bg-black/40 border-border/40 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900"
                  }`}
                >
                  <Lightbulb className="w-6 h-6 mb-2" />
                  <span className="text-sm font-bold uppercase tracking-wider">Feature</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFeedbackType("general")}
                  className={`flex flex-col items-center justify-center p-4 border transition-all ${
                    feedbackType === "general" 
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" 
                      : "bg-black/40 border-border/40 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900"
                  }`}
                >
                  <MessageSquare className="w-6 h-6 mb-2" />
                  <span className="text-sm font-bold uppercase tracking-wider">General</span>
                </button>

              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-mono tracking-widest text-zinc-400 uppercase">Name</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  className="w-full bg-black/40 border border-border/40 p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Anonymous Operator"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-mono tracking-widest text-zinc-400 uppercase">Email</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  className="w-full bg-black/40 border border-border/40 p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="operator@domain.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-mono tracking-widest text-zinc-400 uppercase">Message</label>
              <textarea 
                id="message"
                required
                rows={5}
                className="w-full bg-black/40 border border-border/40 p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                placeholder={
                  feedbackType === "bug" ? "Describe the issue, steps to reproduce, and environment..." :
                  feedbackType === "feature" ? "Describe the feature you'd like to see..." :
                  "What's on your mind?"
                }
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full group relative inline-flex h-14 items-center justify-center overflow-hidden px-8 font-bold transition-all ${
                isSubmitting 
                  ? 'bg-zinc-800 text-zinc-500 cursor-wait' 
                  : 'bg-cyan-500 text-white hover:bg-cyan-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
              }`}
            >
              <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest text-lg">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Submit Report
                  </>
                )}
              </span>
            </button>

          </form>
        )}
      </motion.div>
    </div>
  );
}
