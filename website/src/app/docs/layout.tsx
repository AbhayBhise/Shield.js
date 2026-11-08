"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Settings, Code, Layers } from "lucide-react";

const navigation = [
  { name: "Quickstart", href: "/docs", icon: FileText },
  { name: "Configuration", href: "/docs/configuration", icon: Settings },
  { name: "API Reference", href: "/docs/api", icon: Code },
  { name: "Framework Guides", href: "/docs/frameworks", icon: Layers },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row py-8 md:py-12 gap-8 md:gap-12 flex-1">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0">
        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 sticky top-24">
          <h4 className="font-semibold mb-2 px-2 text-muted-foreground hidden md:block uppercase tracking-widest text-xs">Documentation</h4>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-foreground/60 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 min-w-0 max-w-4xl">
        <div className="prose prose-invert max-w-none">
          {children}
        </div>
      </main>
      
    </div>
  );
}
