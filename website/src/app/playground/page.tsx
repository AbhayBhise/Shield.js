"use client";

import { useState } from "react";
import { Shield, ShieldAlert, AlertTriangle, ShieldCheck, Activity, Terminal } from "lucide-react";

interface InterceptedEvent {
  id: string;
  type: string;
  details: string;
  time: string;
}

export default function Playground() {
  const [isArmed, setIsArmed] = useState(false);
  const [events, setEvents] = useState<InterceptedEvent[]>([]);

  const armShield = () => {
    if (isArmed) return;
    
    // Initialize Shield.js in its official way with real onBlock callback
    import("shield-js-core").then(({ Shield }) => {
      new Shield({
        onBlock: (event: any) => {
          const detailStr = event.metadata?.eventName
            ? `Blocked ${event.metadata.eventName} event`
            : event.metadata?.key
            ? `Blocked shortcut [${event.metadata.key}]`
            : event.metadata?.trigger
            ? `Intercepted ${event.metadata.trigger}`
            : 'Countermeasure engaged';

          const newLog: InterceptedEvent = {
            id: Math.random().toString(36).substring(2, 9),
            type: event.type,
            details: detailStr,
            time: new Date().toLocaleTimeString(),
          };

          setEvents((prev) => [newLog, ...prev].slice(0, 8));
        },
      });
      setIsArmed(true);
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 container mx-auto max-w-5xl flex flex-col items-center">
      
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          Native Browser Security Engine
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 drop-shadow-md">
          INTERACTIVE <span className="text-cyan-400">PLAYGROUND</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Experience the true power of Shield.js DOM poisoning, asset shielding, and event trapping natively in your browser.
        </p>
      </div>

      {/* Instructions Panel */}
      <div className="w-full max-w-3xl bg-zinc-950 border border-border/40 p-8 mb-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500"></div>
        <h2 className="text-xl font-bold mb-4 text-white uppercase tracking-wider flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          Test Protocol Before Arming:
        </h2>
        <ul className="space-y-3 text-zinc-400 mb-8 list-disc list-inside marker:text-cyan-500 text-sm">
          <li><strong>Try selecting text:</strong> Highlight the confidential memo below. You can easily select and copy it.</li>
          <li><strong>Try dragging the image:</strong> Click and drag the shield image to your desktop, or right-click to save it.</li>
          <li><strong>Try taking a screenshot:</strong> Press <kbd className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300 font-mono text-xs">Win + Shift + S</kbd> or <kbd className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300 font-mono text-xs">Cmd + Shift + 4</kbd> and notice nothing stops you.</li>
          <li><strong>Try right-clicking:</strong> The standard browser context menu opens freely.</li>
        </ul>

        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-md flex gap-4 items-start mb-8">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-1">One-Way Client Armor</h4>
            <p className="text-amber-200/80 text-xs leading-relaxed">
              Shield.js permanently mutates the DOM tree and binds capture-phase listeners to counter scrapers. Once you arm the shield, you cannot disarm it without refreshing the page (F5).
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={armShield}
            disabled={isArmed}
            className={`group relative inline-flex h-14 items-center justify-center overflow-hidden px-10 font-bold transition-all ${
              isArmed 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)]'
            }`}
          >
            <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest text-sm">
              {isArmed ? (
                <>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Shield Active & Protected
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Arm Shield (Initialize)
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Real-time Defense Console (When Armed) */}
      {isArmed && (
        <div className="w-full max-w-3xl mb-8 bg-black/90 border border-cyan-500/40 p-6 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                Live Defense Stream (`onBlock` Hook Active)
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500">
              {events.length} threat(s) intercepted
            </span>
          </div>

          {events.length === 0 ? (
            <div className="py-6 text-center text-zinc-500 font-mono text-xs">
              Waiting for attack vector... Try right-clicking, copying text, or dragging the asset below.
            </div>
          ) : (
            <div className="space-y-2 font-mono text-xs">
              {events.map((evt) => (
                <div key={evt.id} className="flex items-center justify-between bg-zinc-900/80 px-3 py-2 border-l-2 border-cyan-500 text-zinc-300">
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 font-bold">[{evt.type}]</span>
                    <span>{evt.details}</span>
                  </div>
                  <span className="text-zinc-500 text-[11px]">{evt.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Test Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        
        {/* Text Protection Test */}
        <div className="bg-zinc-950/80 border border-border/40 p-8 flex flex-col">
          <h4 className="text-cyan-400 font-mono text-sm tracking-widest uppercase border-b border-border/40 pb-4 mb-6 flex items-center justify-between">
            <span>Test 1: Content Extraction</span>
            {isArmed && <span className="text-emerald-400 text-xs">POISONED</span>}
          </h4>
          <div className="flex-1 bg-black/40 p-6 border border-border/20">
            <p className="mb-4 text-lg font-medium text-white">
              Confidential Internal Memo
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              This text contains proprietary intelligence. Try to highlight this paragraph and copy it to your clipboard. When the shield is disarmed, you can copy it freely. When armed, the browser's selection API is blocked, DOM poisoner inserts decoy nodes, and clipboard copy is completely neutralized.
            </p>
            <div className="mt-6 pt-6 border-t border-border/20">
              <p className="text-xs font-mono text-zinc-500">
                ATTACK VECTOR: Mouse Drag Select, Ctrl+A, Ctrl+C, Right-Click -&gt; Copy
              </p>
            </div>
          </div>
        </div>

        {/* Image Protection Test */}
        <div className="bg-zinc-950/80 border border-border/40 p-8 flex flex-col">
          <h4 className="text-cyan-400 font-mono text-sm tracking-widest uppercase border-b border-border/40 pb-4 mb-6 flex items-center justify-between">
            <span>Test 2: Asset Theft</span>
            {isArmed && <span className="text-emerald-400 text-xs">ARMORED</span>}
          </h4>
          <div className="flex-1 bg-black/40 p-6 border border-border/20 flex flex-col items-center justify-center">
            
            <div className="relative w-full aspect-video bg-zinc-900 overflow-hidden border border-zinc-800 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 to-black pointer-events-none"></div>
              <Shield className="w-12 h-12 text-cyan-500/50 pointer-events-none" />
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='transparent'/%3E%3C/svg%3E"
                alt="Protected Asset" 
                draggable={true}
                className="absolute inset-0 w-full h-full object-cover z-10"
              />
            </div>

            <div className="mt-6 w-full text-left">
              <p className="text-muted-foreground text-sm">
                Try to drag the asset to your desktop, or right-click to select "Save Image As...". Notice how right-click and drag gestures are instantly blocked when armed.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
