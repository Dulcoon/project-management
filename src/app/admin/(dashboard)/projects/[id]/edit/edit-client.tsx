"use client";

import { useRouter } from "next/navigation";
import { ProjectForm } from "../../project-form";

type FeatureItem = {
  icon: string;
  title: string;
  description: string;
  colSpan: 1 | 2;
};

type EditProjectClientProps = {
  initialData: {
    id: string;
    title: string;
    desc: string;
    longDesc: string;
    tech: string[];
    role: string;
    year: number;
    status: string;
    features: string[];
    featureList: Record<string, unknown>[] | null;
    images: string[];
    thumbnail: string | null;
    category: string | null;
    mission: string | null;
    client: string | null;
    impactMetric: { value: string; label: string; subtext: string } | null;
    tags: string[];
    overview: string[] | null;
    demo: string | null;
    github: string | null;
  };
};

export function EditProjectClient({ initialData }: EditProjectClientProps) {
  const router = useRouter();

  const formInitialData = {
    ...initialData,
    featureList: (initialData.featureList ?? null) as FeatureItem[] | null,
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Edit Project
          </h1>
          <p className="text-body-lg text-muted-foreground">
            Update project details for {initialData.title}
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
            Update Project
          </button>
        </div>
      </div>

      <ProjectForm initialData={formInitialData} />
    </div>
  );
}
