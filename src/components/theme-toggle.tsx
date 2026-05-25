"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="p-1.5 text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors rounded-full hover:bg-[var(--surface-container)]"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <span className="material-symbols-outlined text-xl">
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
