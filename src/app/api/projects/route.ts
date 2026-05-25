import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { transformProjectUrls } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");
  const year = searchParams.get("year");

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (year) where.year = parseInt(year);

  const projects = await prisma.project.findMany({
    where,
    orderBy: { year: "desc" },
  });

  const data = projects.map((project) => transformProjectUrls(project as Record<string, unknown>, request));

  return Response.json({ data });
}
