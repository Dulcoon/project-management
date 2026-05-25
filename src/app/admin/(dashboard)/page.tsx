import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  DashboardStats,
  CompletionChart,
  ProjectsTable,
  RecentActivity,
} from "./dashboard-client";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
  });

  const totalProjects = projects.length;
  const liveProjects = projects.filter((p) => p.status === "Live").length;
  const latestProjects = projects.slice(0, 5);

  const greeting =
    new Date().getHours() < 12
      ? "Good morning"
      : new Date().getHours() < 17
        ? "Good afternoon"
        : "Good evening";

  const displayName = session?.user?.name || session?.user?.email?.split("@")[0] || "there";

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h2 className="text-[32px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-hanken)", letterSpacing: "-0.01em" }}>
          {greeting}, {displayName}
        </h2>
        <p className="text-[var(--on-surface-variant)] mt-1 text-base">
          Stay on top of your tasks, monitor progress, and track status across all portfolios.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 h-full">
          <DashboardStats
            totalProjects={totalProjects}
            liveProjects={liveProjects}
            totalTasks={156}
            teamCount={12}
            onlineCount={3}
          />
        </div>

        <div className="md:col-span-4 h-full">
          <CompletionChart />
        </div>

        <div className="md:col-span-8 h-full">
          <ProjectsTable projects={latestProjects} />
        </div>

        <div className="md:col-span-4 h-full">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
