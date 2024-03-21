"use server";

import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { Resource } from "sst";

const client = new LambdaClient({ region: "us-east-1" });

export async function generatePost(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const slug = formData.get("slug");

  const command = new InvokeCommand({
    FunctionName: Resource.CreatePost.name,
    Payload: JSON.stringify({ title, content, slug }),
  });
  try {
    const res = await client.send(command);
    const payload = JSON.parse(new TextDecoder().decode(res.Payload));
    console.log(payload);
  } catch (e) {
    console.error(e);
  }
}
