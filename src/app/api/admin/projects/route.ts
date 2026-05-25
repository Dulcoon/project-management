import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { transformProjectUrls } from "@/lib/api-utils";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
  });

  const data = projects.map((project) => transformProjectUrls(project as Record<string, unknown>, request));

  return Response.json({ data });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const slug = slugify(body.title);

  const existing = await prisma.project.findUnique({ where: { slug } });
  if (existing) {
    return Response.json(
      { error: "Project with this title already exists" },
      { status: 409 }
    );
  }

  const project = await prisma.project.create({
    data: {
      slug,
      title: body.title,
      desc: body.desc,
      longDesc: body.longDesc,
      tech: body.tech || [],
      role: body.role,
      year: body.year,
      status: body.status,
      features: body.features || [],
      featureList: body.featureList ?? undefined,
      images: body.images || [],
      thumbnail: body.thumbnail || null,
      category: body.category || null,
      mission: body.mission || null,
      client: body.client || null,
      impactMetric: body.impactMetric ?? undefined,
      tags: body.tags || [],
      overview: body.overview ?? undefined,
      demo: body.demo || null,
      github: body.github || null,
    },
  });

  return Response.json({ data: project }, { status: 201 });
}
