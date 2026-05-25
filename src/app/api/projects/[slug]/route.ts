import { prisma } from "@/lib/prisma";
import { transformProjectUrls } from "@/lib/api-utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  const data = transformProjectUrls(project as Record<string, unknown>, request);

  return Response.json({ data });
}
