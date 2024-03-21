"use server";

import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { Resource } from "sst";
import { action, extractFormData } from "./helpers";
import { z } from "zod";

const client = new LambdaClient({ region: "us-east-1" });

const CreatePostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  slug: z.string().optional(),
});
export const createPost = action(async (formData: FormData) => {
  const raw = extractFormData(formData, ["title", "content", "slug"]);
  const data = CreatePostSchema.parse(raw);

  const command = new InvokeCommand({
    FunctionName: Resource.CreatePost.name,
    Payload: JSON.stringify(data),
  });
  const res = await client.send(command);
  const payload = JSON.parse(new TextDecoder().decode(res.Payload));
});
