"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, View } from "lucide-react";
import BlogPreview from "./blog-preview";
import { TextareaAutosize } from "./ui/textarea-autosize";

export function BlogCreateForm() {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  const togglePreview = () => setPreview((prev) => !prev);

  return (
    <form action="/" className="grid gap-6">
      <section className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">title</Label>
        <Input
          type="title"
          id="title"
          placeholder="the weirdness of existence v1"
        />
      </section>
      <section className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">slug</Label>
        <Input
          type="title"
          id="title"
          placeholder="the-weirdness-of-existence-v1"
        />
      </section>
      <section className="grid gap-1.5 w-full">
        <Label htmlFor="content">content</Label>
        <section>
          <Button
            variant={"ghost"}
            size={"icon"}
            type="button"
            onClick={togglePreview}
          >
            {preview ? <Pencil /> : <View />}
          </Button>
        </section>
        {preview ? (
          <BlogPreview content={content} />
        ) : (
          <TextareaAutosize
            placeholder="write crazy ideas here"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
        <p className="text-sm text-muted-foreground">
          you can use markdwon to format your content.
        </p>
      </section>
      <Button
        className="max-w-max"
        type="button"
        onClick={() => toast({ title: "test" })}
      >
        create
      </Button>
    </form>
  );
}
