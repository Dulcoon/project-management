export function toAbsoluteUrl(url: string, request: Request): string {
  if (!url || url.startsWith("http")) return url;
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";

  // Rewrite old local paths to proxy
  if (url.startsWith("/projects/") && !url.startsWith("/api/images/")) {
    url = `/api/images${url}`;
  }

  return `${protocol}://${host}${url}`;
}

export function transformProjectUrls(project: Record<string, unknown>, request: Request) {
  return {
    ...project,
    thumbnail: project.thumbnail ? toAbsoluteUrl(project.thumbnail as string, request) : null,
    images: (project.images as string[] | undefined)?.map((img: string) => toAbsoluteUrl(img, request)) ?? [],
  };
}
