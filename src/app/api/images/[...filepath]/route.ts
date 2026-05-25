import { NextRequest } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getR2Client, R2_BUCKET } from "@/lib/r2";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filepath: string[] }> }
) {
  const { filepath } = await params;
  const key = filepath.join("/");

  try {
    const s3 = getR2Client();
    const obj = await s3.send(
      new GetObjectCommand({ Bucket: R2_BUCKET, Key: key })
    );

    const stream = obj.Body as ReadableStream | null;
    if (!stream) {
      return new Response("Not Found", { status: 404 });
    }

    return new Response(stream, {
      headers: {
        "Content-Type": obj.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e: unknown) {
    const error = e as { name?: string };
    if (error.name === "NoSuchKey") {
      return new Response("Not Found", { status: 404 });
    }
    console.error("Image proxy error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
