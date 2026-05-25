"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "dashboard", fill: true },
  { href: "/admin/projects", label: "Projects", icon: "folder_open" },
  { href: "#", label: "Tasks", icon: "assignment_turned_in" },
  { href: "#", label: "Team", icon: "group" },
  { href: "#", label: "Settings", icon: "settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-60 flex-col border-r bg-surface-container md:flex border-[var(--outline-variant)] py-6 px-1">
      <div className="flex items-center gap-2.5 px-4 mb-8">
        <div className="flex size-8 items-center justify-center rounded bg-[var(--primary-container)] text-white font-bold text-lg glow-primary shadow-sm">
          P
        </div>
        <div>
          <h1 className="text-[var(--primary)] text-xl font-bold leading-tight" style={{ fontFamily: "var(--font-hanken)" }}>
            Project
          </h1>
          <p className="text-[11px] text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "0.05em" }}>
            Management
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 text-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-150 text-sm",
                isActive
                  ? "text-[var(--primary)] font-bold bg-[var(--primary-container)]/10 border-l-4 border-[var(--primary)] scale-95"
                  : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-highest)] hover:text-[var(--on-surface)] scale-95"
              )}
            >
              <span className="material-symbols-outlined text-xl" style={isActive && item.fill ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-[var(--outline-variant)] px-1 space-y-2">
        <button className="flex w-full items-center justify-center gap-1.5 py-2 px-4 text-sm text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors border border-[var(--outline-variant)] rounded hover:bg-[var(--surface-container-highest)]">
          <span className="material-symbols-outlined text-lg">add</span>
          Add Task
        </button>
        <div className="space-y-0 pt-1 text-sm">
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-r-full text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-highest)] hover:text-[var(--on-surface)] transition-colors">
            <span className="material-symbols-outlined text-lg">help</span>
            Support
          </a>
          <a href="/api/auth/signout" className="flex items-center gap-3 px-4 py-2 rounded-r-full text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-highest)] hover:text-[var(--destructive)] transition-colors">
            <span className="material-symbols-outlined text-lg">logout</span>
            Log Out
          </a>
        </div>
      </div>
    </aside>
  );
}
