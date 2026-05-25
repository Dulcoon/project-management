import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FolderKanban, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="relative flex flex-col items-center gap-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 shadow-sm">
          <FolderKanban className="size-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Project Management API
          </h1>
          <p className="text-muted-foreground max-w-md">
            Centralized portfolio project data — consume via API from any
            website or app.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/admin"
            className={cn(buttonVariants({ size: "lg" }), "gap-2")}
          >
            <Terminal className="size-4" />
            Back Office
          </Link>
          <a
            href="/api/projects"
            target="_blank"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2 font-mono text-xs")}
          >
            GET /api/projects
          </a>
        </div>
      </div>
    </div>
  );
}
