"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { ProfileDropdown } from "@/components/admin/profile-dropdown";
import Link from "next/link";

const navLinks = [
  { href: "/admin", label: "Overview" },
  { href: "#", label: "Activity" },
  { href: "#", label: "Manage" },
  { href: "#", label: "Program" },
];

export function TopNav() {
  return (
    <nav className="fixed top-0 right-0 z-30 hidden h-16 items-center justify-between border-b bg-background/80 backdrop-blur-md md:flex border-[var(--outline-variant)] px-8 transition-all duration-200" style={{ width: "calc(100% - 240px)" }}>
      <div className="flex items-center gap-6">
        <span className="text-xl font-semibold text-[var(--on-surface)]" style={{ fontFamily: "var(--font-hanken)" }}>
          Project Management
        </span>
        <div className="flex items-center gap-6 ml-8 text-xs" style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "0.05em", fontWeight: 600 }}>
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={
                i === 0
                  ? "text-[var(--primary)] border-b-2 border-[var(--primary)] pb-2 h-full flex items-center pt-2 transition-colors"
                  : "text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-colors h-full flex items-center pt-2"
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-1 text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors">
          <span className="material-symbols-outlined text-xl">search</span>
        </button>
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors rounded-full hover:bg-[var(--surface-container)]">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
          <ThemeToggle />
          <button className="p-1.5 text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors rounded-full hover:bg-[var(--surface-container)]">
            <span className="material-symbols-outlined text-xl">info</span>
          </button>
        </div>
        <div className="w-px h-6 bg-[var(--outline-variant)] mx-1" />
        <Link
          href="/admin/projects/new"
          className="bg-[var(--primary-container)] text-white text-sm font-bold px-4 py-1.5 rounded hover:bg-[var(--primary)] transition-colors shadow-[0_0_15px_rgba(255,92,53,0.15)]"
        >
          New Project
        </Link>
        <ProfileDropdown />
      </div>
    </nav>
  );
}
