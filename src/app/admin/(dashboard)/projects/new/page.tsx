"use client";

import { useRouter } from "next/navigation";
import { ProjectForm } from "../project-form";

export default function NewProjectPage() {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            New Project
          </h1>
          <p className="text-body-lg text-muted-foreground">
            Add a new project to your portfolio
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="inline-flex items-center px-8 py-4 rounded-lg border border-outline-variant text-foreground text-body-md font-semibold hover:bg-surface-container-highest transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="project-form"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-primary-container text-white text-body-md font-semibold hover:bg-[#b52701] transition-colors"
          >
            Create Project
          </button>
        </div>
      </div>

      <ProjectForm />
    </div>
  );
}
