"use server";

import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import type { BlobPayloadInputTypes } from "@smithy/types";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function generateUploadURL({ bucket }: { bucket: string }) {
  const client = new S3Client({ region: "us-east-1" });
  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: bucket,
  });
  const url = await getSignedUrl(client, command);
  return url;
}

export async function uploadFile({
  bucket,
  file,
}: {
  bucket: string;
  file: File;
}) {
  const url = await generateUploadURL({ bucket });
  const uploadedFile = await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
      "Content-Disposition": `attachment; filename="${file.name}"`,
    },
  });
  const uploadedFileURL = uploadedFile.url.split("?")[0];
  return uploadedFileURL;
}

export async function invokeFunction({
  name,
  payload,
}: {
  name: string;
  payload: BlobPayloadInputTypes;
}) {
  const client = new LambdaClient({ region: "us-east-1" });
  const command = new InvokeCommand({
    FunctionName: name,
    Payload: payload,
  });
  await client.send(command);
}
