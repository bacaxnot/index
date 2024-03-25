"use server";

import { Resource } from "sst";
import { invokeFunction, uploadFile } from "./aws";
import { action, extractFormData } from "./helpers";
import { z } from "zod";

const CreatePostSchema = z.object({
  title: z.string(),
  content: z.string(),
  slug: z.string().optional(),
  "generate-image": z.literal("on").nullable(),
  image: z.instanceof(File),
});

export const createPost = action(async (formData: FormData) => {
  const raw = extractFormData(formData, [
    "title",
    "content",
    "slug",
    "generate-image",
    "image",
  ]);
  const data = CreatePostSchema.parse(raw);
  const generateImage = data["generate-image"] === "on";

  const imageURL = generateImage
    ? null
    : await uploadFile({
        file: data.image,
        bucket: Resource.Assets.name,
      });

  const payload = {
    title: data.title,
    content: data.content,
    slug: data.slug,
    generateImage,
    image: imageURL,
  };

  await invokeFunction({
    name: Resource.CreatePost.name,
    payload: JSON.stringify(payload),
  });

  return { success: true };
});
