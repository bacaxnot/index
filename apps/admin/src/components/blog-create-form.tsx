"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export function BlogCreateForm() {
  const { toast } = useToast();
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
        <Textarea placeholder="write crazy ideas here" id="content" />
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
