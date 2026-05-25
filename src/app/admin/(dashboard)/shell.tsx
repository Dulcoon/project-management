"use client";

import { SessionProvider } from "next-auth/react";
import { Sidebar } from "@/components/admin/sidebar";
import { TopNav } from "@/components/admin/top-nav";

export function AdminShell({
  children,
}: {
  children: React.ReactNode;
  session: unknown;
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-background selection:bg-[var(--primary-container)] selection:text-white overflow-x-hidden">
        <Sidebar />
        <TopNav />
        <main className="md:ml-60 pt-20 min-h-screen p-6">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
