"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export function ProfileDropdown() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const user = session?.user;
  const initial = user?.name?.charAt(0).toUpperCase()
    || user?.email?.charAt(0).toUpperCase()
    || "A";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 cursor-pointer hover:bg-[var(--surface-container)] p-1 rounded transition-colors"
      >
        <div className="size-8 rounded-full border border-[var(--outline-variant)] overflow-hidden flex items-center justify-center bg-[var(--primary-container)]/20 text-xs font-bold text-[var(--primary)]">
          {initial}
        </div>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container)] shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="p-4 flex items-center gap-3">
            <div className="size-10 rounded-full border border-[var(--outline-variant)] overflow-hidden flex items-center justify-center bg-[var(--primary-container)]/20 text-sm font-bold text-[var(--primary)] shrink-0">
              {initial}
            </div>
            <div className="min-w-0">
              <p
                className="text-sm font-semibold text-[var(--on-surface)] truncate"
                style={{ fontFamily: "var(--font-hanken)" }}
              >
                {user?.name || "User"}
              </p>
              <p
                className="text-xs text-[var(--on-surface-variant)] truncate"
                style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "0.05em" }}
              >
                {user?.email || ""}
              </p>
            </div>
          </div>

          <div className="h-px bg-[var(--outline-variant)] mx-3" />

          <div className="p-2">
            <button
              onClick={() => signOut()}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--on-surface-variant)] hover:text-[var(--destructive)] hover:bg-[var(--surface-container-high)] transition-colors"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
