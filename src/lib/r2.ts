import { S3Client } from "@aws-sdk/client-s3";

let client: S3Client | null = null;

export function getR2Client(): S3Client {
  if (!client) {
    const accountId = process.env.R2_ACCOUNT_ID!;
    client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
  }
  return client;
}

export const R2_BUCKET = process.env.R2_BUCKET_NAME!;

export function getR2PublicUrl(key: string): string {
  const base = process.env.R2_PUBLIC_URL;
  if (base) return `${base}/${key}`;
  const accountId = process.env.R2_ACCOUNT_ID;
  const bucket = process.env.R2_BUCKET_NAME;
  return `https://${accountId}.r2.cloudflarestorage.com/${bucket}/${key}`;
}
