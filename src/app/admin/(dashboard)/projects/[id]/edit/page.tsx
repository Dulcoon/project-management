import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EditProjectClient } from "./edit-client";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    notFound();
  }

  return (
    <EditProjectClient
      initialData={{
        id: project.id,
        title: project.title,
        desc: project.desc,
        longDesc: project.longDesc,
        tech: project.tech,
        role: project.role,
        year: project.year,
        status: project.status,
        features: project.features,
        featureList: project.featureList as Record<string, unknown>[] | null,
        images: project.images,
        thumbnail: project.thumbnail,
        category: project.category,
        mission: project.mission,
        client: project.client,
        impactMetric: project.impactMetric as { value: string; label: string; subtext: string } | null,
        tags: project.tags,
        overview: project.overview as string[] | null,
        demo: project.demo,
        github: project.github,
      }}
    />
  );
}
