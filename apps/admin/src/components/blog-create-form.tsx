"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { BlogPreview } from "./blog-preview";
import { TextareaAutosize } from "./ui/textarea-autosize";
import { createPost } from "@/lib/actions/blog";
import { ButtonSubmit } from "./button-submit";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";

export function BlogCreateForm() {
  const [content, setContent] = useState("");
  const [generateImage, setGenerateImage] = useState<CheckedState>(true);

  return (
    <form className="grid gap-6">
      <section className="grid max-w-sm items-center gap-1.5">
        <Label htmlFor="title">title</Label>
        <Input
          id="title"
          name="title"
          placeholder="the weirdness of existence v1"
        />
      </section>
      <section className="grid max-w-sm items-center gap-1.5">
        <Label htmlFor="slug">slug</Label>
        <Input
          id="slug"
          name="slug"
          placeholder="the-weirdness-of-existence-v1"
        />
      </section>
      <section className="grid gap-1.5">
        <Label htmlFor="content">content</Label>
        <TextareaAutosize
          placeholder="write crazy ideas here"
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          you can use markdwon to format your content.
        </p>
      </section>
      <section className="grid gap-1.5">
        <Label>preview</Label>
        <BlogPreview content={content} />
      </section>
      <section className="flex gap-3">
        <Checkbox
          id="generate-image"
          name="generate-image"
          checked={generateImage}
          onCheckedChange={(state) => setGenerateImage(state)}
        />
        <Label htmlFor="generate-image">generate image based on content</Label>
      </section>
      <section
        className={cn(
          "grid items-center max-w-sm gap-1.5",
          generateImage && "hidden"
        )}
      >
        <Label htmlFor="image">image</Label>
        <Input id="image" type="file" name="image" required={!generateImage} />
      </section>
      <section className="flex">
        <ButtonSubmit action={createPost}>create</ButtonSubmit>
      </section>
    </form>
  );
}
