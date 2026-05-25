import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "./delete-button";
import {
  Globe,
  Rocket,
  ShoppingCart,
  Home,
  GraduationCap,
  FolderKanban,
  ListFilter,
  ChevronDown,
} from "lucide-react";

const statusStyles: Record<
  string,
  { bg: string; text: string; border: string; dot: string }
> = {
  Live: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800/50",
    dot: "bg-emerald-500",
  },
  Production: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800/50",
    dot: "bg-emerald-500",
  },
  Prototype: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800/50",
    dot: "bg-amber-500",
  },
  "In Progress": {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800/50",
    dot: "bg-blue-500",
  },
};

const projectIcons: Record<string, typeof Globe> = {
  paulus: Globe,
  strive: Rocket,
  living: ShoppingCart,
  holiday: Home,
  sitika: GraduationCap,
  school: GraduationCap,
};

function getProjectIcon(title: string) {
  const key = Object.keys(projectIcons).find((k) =>
    title.toLowerCase().includes(k)
  );
  return key ? projectIcons[key] : FolderKanban;
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="size-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
            <FolderKanban className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Projects
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {projects.length} project
              {projects.length !== 1 ? "s" : ""} in your portfolio requiring
              attention.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <ListFilter className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <select className="h-8 appearance-none rounded-lg border border-input bg-transparent pl-8 pr-7 text-sm text-foreground focus:border-ring focus:ring-2 focus:ring-ring/50 outline-none cursor-pointer">
              <option value="">Status: All</option>
              <option value="live">Live</option>
              <option value="prototype">Prototype</option>
              <option value="progress">In Progress</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          </div>
          <div className="relative">
            <select className="h-8 appearance-none rounded-lg border border-input bg-transparent px-7 pr-7 text-sm text-foreground focus:border-ring focus:ring-2 focus:ring-ring/50 outline-none cursor-pointer">
              <option value="">Year</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="h-10 px-6 text-left text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                  Title
                </th>
                <th className="h-10 px-6 text-left text-xs font-semibold text-muted-foreground tracking-wider uppercase w-20">
                  Year
                </th>
                <th className="h-10 px-6 text-left text-xs font-semibold text-muted-foreground tracking-wider uppercase w-40">
                  Status
                </th>
                <th className="h-10 px-6 text-left text-xs font-semibold text-muted-foreground tracking-wider uppercase hidden md:table-cell">
                  Role
                </th>
                <th className="h-10 px-6 text-right text-xs font-semibold text-muted-foreground tracking-wider uppercase w-36">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-muted-foreground py-16"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <FolderKanban className="size-8 text-muted-foreground/50 mx-auto" />
                      <p>No projects yet</p>
                      <Link
                        href="/admin/projects/new"
                        className="inline-flex items-center gap-1.5 h-8 px-4 text-sm font-medium bg-primary text-primary-foreground rounded-lg mt-2 no-underline"
                      >
                        Create your first project
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                projects.map((project) => {
                  const status =
                    statusStyles[project.status] ?? statusStyles["Prototype"];
                  const Icon = getProjectIcon(project.title);
                  return (
                    <tr
                      key={project.id}
                      className="border-b last:border-0 transition-colors hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 shrink-0 rounded-lg border bg-muted flex items-center justify-center">
                            <Icon className="size-5 text-muted-foreground" />
                          </div>
                          <span className="font-medium text-foreground">
                            {project.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {project.year}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.bg} ${status.text} ${status.border}`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${status.dot}`}
                          />
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">
                        {project.role}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="inline-flex items-center h-7 px-3 rounded border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors no-underline"
                          >
                            Edit
                          </Link>
                          <DeleteButton id={project.id} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
