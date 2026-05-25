"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/generated/prisma/client";

type StatCardProps = {
  icon: string;
  label: string;
  value: string | number;
  trend?: string;
  trendIcon?: string;
  accent?: boolean;
  children?: React.ReactNode;
};

function StatCard({ icon, label, value, trend, trendIcon, accent, children }: StatCardProps) {
  return (
    <div
      className={cn(
          "relative overflow-hidden rounded p-4 group h-full",
          accent
            ? "bg-[var(--primary-container)] text-white shadow-[0_0_15px_rgba(255,92,53,0.15)]"
            : "bg-surface border border-[var(--outline-variant)]"
        )}
    >
      {accent && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      )}
      <div
        className={cn(
          "absolute -right-4 -top-4 w-24 h-24 rounded-full blur-xl transition-all duration-500",
          accent
            ? "bg-white/10"
            : "bg-[var(--primary-container)]/10 group-hover:bg-[var(--primary-container)]/20"
        )}
      />
      <div className="flex justify-between items-start mb-6 relative z-10">
        <span
          className={cn(
            "text-xs font-semibold tracking-[0.05em]",
            accent ? "text-white/80" : "text-[var(--on-surface-variant)]"
          )}
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {label}
        </span>
        <div
          className={cn(
            "p-1 rounded border",
            accent
              ? "bg-white/20 border-white/20 text-white backdrop-blur-sm"
              : "bg-[var(--surface-container)] border-[var(--outline-variant)] text-[var(--primary)]"
          )}
        >
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
      </div>
      <div className="relative z-10">
        <div className="text-4xl font-bold tracking-tight mb-1" style={{ fontFamily: "var(--font-hanken)" }}>
          {value}
        </div>
        {trend && (
          <div className={cn("flex items-center gap-1 text-xs font-semibold tracking-[0.05em]", accent ? "text-white/90" : "text-[var(--primary)]")} style={{ fontFamily: "var(--font-jetbrains)" }}>
            <span className="material-symbols-outlined text-sm">{trendIcon}</span>
            <span>{trend}</span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

type DashboardStatsProps = {
  totalProjects: number;
  liveProjects: number;
  totalTasks: number;
  teamCount: number;
  onlineCount: number;
};

export function DashboardStats({ totalProjects, liveProjects, totalTasks, teamCount, onlineCount }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
      <StatCard
        icon="folder_special"
        label="Total Projects"
        value={totalProjects}
        trend="+12% from last month"
        trendIcon="trending_up"
      />
      <StatCard
        icon="task_alt"
        label="Active Tasks"
        value={totalTasks}
        trend="24 due this week"
        trendIcon="arrow_upward"
        accent
      />
      <StatCard
        icon="groups"
        label="Team Members"
        value={teamCount}
        trendIcon=""
        trend=""
      >
        <div className="flex items-center gap-1 text-xs text-[var(--on-surface-variant)] font-semibold" style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "0.05em" }}>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="size-5 rounded-full border-2 border-surface bg-[var(--primary-container)]/30 flex items-center justify-center text-[8px] font-bold text-[var(--primary)]"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <span className="ml-1">+{onlineCount} online now</span>
        </div>
      </StatCard>
    </div>
  );
}

export function CompletionChart() {
  return (
    <div className="bg-surface border border-[var(--outline-variant)] rounded p-4 flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-[var(--outline-variant)] pb-3 mb-4">
        <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-hanken)" }}>
          Completion Progress
        </h3>
        <button className="text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors">
          <span className="material-symbols-outlined text-xl">more_horiz</span>
        </button>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="relative size-40 flex items-center justify-center">
          <svg className="size-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e2e3" strokeWidth="12" />
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FF5C35" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" strokeWidth="12" />
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#dadadb" strokeDasharray="251.2" strokeDashoffset="200" strokeLinecap="round" strokeWidth="12" className="origin-center rotate-[270deg]" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[32px] font-bold" style={{ fontFamily: "var(--font-hanken)" }}>
              75%
            </span>
            <span className="text-xs text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "0.05em" }}>
              Overall
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs font-semibold tracking-[0.05em] text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-[var(--primary-container)]" />
            Completed
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-[var(--surface-dim)]" />
            In Progress
          </div>
        </div>
      </div>
    </div>
  );
}

type ProjectsTableProps = {
  projects: Pick<Project, "id" | "title" | "desc" | "status" | "thumbnail" | "year">[];
};

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const statusBadge = (status: string) => {
    const isLive = status === "Live" || status === "Production";
    const isProgress = status.toLowerCase().includes("progress") || status.toLowerCase().includes("development");
    return (
      <span
        className={cn(
          "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border tracking-[0.05em]",
          isLive
            ? "bg-[var(--surface-variant)] text-[var(--on-surface-variant)] border-[var(--outline-variant)]"
            : isProgress
              ? "bg-[var(--primary-container)]/10 text-[var(--primary)] border-[var(--primary-container)]/30"
              : "bg-[var(--surface-variant)] text-[var(--on-surface-variant)] border-[var(--outline-variant)]"
        )}
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        <span
          className={cn(
            "size-1.5 rounded-full mr-1.5",
            isLive ? "bg-[var(--on-surface-variant)]" : isProgress ? "bg-[var(--primary-container)] animate-pulse" : "bg-[var(--on-surface-variant)]"
          )}
        />
        {status}
      </span>
    );
  };

  const progressData: Record<string, number> = {
    "Paulus Connect": 100,
    "Strive to High": 65,
    "siTika": 30,
    "Homeliving E-Commerce App": 45,
    "Holiday Bali Villa Booking Platform": 80,
  };

  const dueDates: Record<string, string> = {
    "Paulus Connect": "Oct 12, 2025",
    "Strive to High": "Dec 05, 2025",
    "siTika": "Jan 20, 2026",
    "Homeliving E-Commerce App": "Mar 15, 2026",
    "Holiday Bali Villa Booking Platform": "Nov 30, 2025",
  };

  return (
    <div className="bg-surface border border-[var(--outline-variant)] rounded flex flex-col overflow-hidden h-full">
      <div className="p-4 border-b border-[var(--outline-variant)] flex items-center justify-between bg-[var(--surface-container)]">
        <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-hanken)" }}>
          Active Portfolios
        </h3>
        <div className="flex gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-base text-[var(--on-surface-variant)]">search</span>
            <input
              className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded py-1 pl-8 pr-2 text-sm text-[var(--on-surface)] focus:border-[var(--primary-container)] focus:ring-1 focus:ring-[var(--primary-container)] w-48 placeholder:text-[var(--on-surface-variant)] transition-colors"
              placeholder="Search projects..."
              style={{ fontFamily: "var(--font-hanken)" }}
            />
          </div>
          <button className="flex items-center gap-1 px-2 py-1 border border-[var(--outline-variant)] rounded text-sm text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)] hover:text-[var(--on-surface)] transition-colors">
            <span className="material-symbols-outlined text-base">filter_list</span>
            Filter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-[var(--surface-container)] text-[var(--on-surface-variant)] text-xs font-semibold tracking-[0.05em] border-b border-[var(--outline-variant)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
              <th className="p-4 font-medium">Project Title</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Progress</th>
              <th className="p-4 font-medium">Due Date</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-[var(--outline-variant)]">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[var(--on-surface-variant)]">
                  <div className="flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-3xl text-[var(--on-surface-variant)]/50">folder_open</span>
                    <p>No projects yet</p>
                    <Link href="/admin/projects/new" className={cn(buttonVariants({ size: "sm" }), "mt-1")}>
                      Create your first project
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              projects.map((p) => {
                const progress = progressData[p.title] ?? 50;
                const isProgress = p.status.toLowerCase().includes("progress") || p.status.toLowerCase().includes("development");
                return (
                  <tr key={p.id} className="hover:bg-[var(--surface-container-low)] transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] flex items-center justify-center p-1 overflow-hidden">
                          {p.thumbnail ? (
                            <img src={p.thumbnail} alt="" className="size-full object-cover rounded-sm" />
                          ) : (
                            <div className={cn(
                              "size-full rounded-sm border",
                              isProgress ? "bg-[var(--primary-container)]/20 border-[var(--primary-container)]/30" : "bg-[var(--surface-variant)] border-[var(--outline-variant)]"
                            )} />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{p.title}</div>
                          <div className="text-xs text-[var(--on-surface-variant)] mt-0.5" style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "0.05em" }}>
                            {p.desc}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{statusBadge(p.status)}</td>
                    <td className="p-4 w-48">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-[var(--surface-container)] rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full", isProgress ? "bg-[var(--primary-container)]" : "bg-[var(--on-surface-variant)]")}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold tracking-[0.05em] text-[var(--on-surface-variant)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                          {progress}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-[var(--on-surface-variant)] text-xs">{dueDates[p.title] ?? "TBD"}</td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/projects/${p.id}/edit`}
                        className="text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 inline-flex"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const activities = [
  {
    icon: "commit",
    title: (
      <>
        Pushed code to{" "}
        <span className="text-xs font-semibold text-[var(--primary)] bg-[var(--primary-container)]/10 px-1 rounded border border-[var(--primary-container)]/20" style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "0.05em" }}>
          main
        </span>{" "}
        branch
      </>
    ),
    time: "2 hours ago",
    project: "Paulus Connect",
    color: "text-[var(--primary)]",
  },
  {
    icon: "check_circle",
    title: (
      <>
        Completed task{" "}
        <span className="font-medium">&ldquo;Setup Firebase Auth&rdquo;</span>
      </>
    ),
    time: "5 hours ago",
    project: "Strive to High",
    color: "text-[var(--on-surface-variant)]",
  },
  {
    icon: "comment",
    title: (
      <>
        Left a comment on{" "}
        <span className="font-medium">API Design Spec</span>
      </>
    ),
    time: "Yesterday",
    project: "siTika",
    color: "text-[var(--on-surface-variant)]",
    comment: "Looks good, let's proceed with v2 endpoints.",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-surface border border-[var(--outline-variant)] rounded p-4 flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-[var(--outline-variant)] pb-3 mb-4 shrink-0">
        <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-hanken)" }}>
          Recent Activity
        </h3>
        <a href="#" className="text-xs text-[var(--primary)] font-semibold tracking-[0.05em] hover:underline" style={{ fontFamily: "var(--font-jetbrains)" }}>
          View All
        </a>
      </div>
      <div className="flex-1 overflow-y-auto pr-1 space-y-4">
        {activities.map((item, i) => (
          <div key={i} className="flex gap-2.5 relative">
            {i < activities.length - 1 && (
              <div className="absolute left-[15px] top-8 bottom-[-16px] w-px bg-[var(--outline-variant)]" />
            )}
            <div className={cn(
              "size-8 rounded-full bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] flex items-center justify-center shrink-0 z-10",
              item.color
            )}>
              <span className="material-symbols-outlined text-base">{item.icon}</span>
            </div>
            <div>
              <p className="text-sm">{item.title}</p>
              {"comment" in item && item.comment && (
                <div className="bg-[var(--surface-container)] border border-[var(--outline-variant)] rounded p-2 mt-1 text-sm text-[var(--on-surface-variant)] italic">
                  &ldquo;{item.comment}&rdquo;
                </div>
              )}
              <div className="flex items-center gap-1 text-xs text-[var(--on-surface-variant)] mt-1 font-semibold tracking-[0.05em]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                <span className="material-symbols-outlined text-sm">schedule</span>
                {item.time} &bull; {item.project}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
