"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { BlogPreview } from "./blog-preview";
import { TextareaAutosize } from "./ui/textarea-autosize";
import { createPost } from "@/lib/actions/generate-post";
import { ButtonSubmit } from "./button-submit";

export function BlogCreateForm() {
  const [content, setContent] = useState("");

  return (
    <form className="grid gap-6">
      <section className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">title</Label>
        <Input
          id="title"
          name="title"
          placeholder="the weirdness of existence v1"
        />
      </section>
      <section className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="slug">slug</Label>
        <Input
          id="slug"
          name="slug"
          placeholder="the-weirdness-of-existence-v1"
        />
      </section>
      <section className="grid gap-1.5 w-full">
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
      <section className="grid gap-1.5 w-full">
        <Label>preview</Label>
        <BlogPreview content={content} />
      </section>
      <section className="flex">
        <ButtonSubmit action={createPost}>create</ButtonSubmit>
      </section>
    </form>
  );
}
