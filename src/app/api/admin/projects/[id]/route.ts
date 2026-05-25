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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  const data = transformProjectUrls(project as Record<string, unknown>, request);

  return Response.json({ data });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  const data: Record<string, unknown> = {};
  if (body.title !== undefined) {
    data.title = body.title;
    data.slug = slugify(body.title);
  }
  if (body.desc !== undefined) data.desc = body.desc;
  if (body.longDesc !== undefined) data.longDesc = body.longDesc;
  if (body.tech !== undefined) data.tech = body.tech;
  if (body.role !== undefined) data.role = body.role;
  if (body.year !== undefined) data.year = body.year;
  if (body.status !== undefined) data.status = body.status;
  if (body.features !== undefined) data.features = body.features;
  if (body.featureList !== undefined) data.featureList = body.featureList;
  if (body.images !== undefined) data.images = body.images;
  if (body.thumbnail !== undefined) data.thumbnail = body.thumbnail;
  if (body.category !== undefined) data.category = body.category;
  if (body.mission !== undefined) data.mission = body.mission;
  if (body.client !== undefined) data.client = body.client;
  if (body.impactMetric !== undefined) data.impactMetric = body.impactMetric;
  if (body.tags !== undefined) data.tags = body.tags;
  if (body.overview !== undefined) data.overview = body.overview;
  if (body.demo !== undefined) data.demo = body.demo;
  if (body.github !== undefined) data.github = body.github;

  const project = await prisma.project.update({
    where: { id },
    data,
  });

  return Response.json({ data: project });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  await prisma.project.delete({ where: { id } });

  return Response.json({ success: true });
}
