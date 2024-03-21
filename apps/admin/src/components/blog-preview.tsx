import React from "react";
import { MarkdownRenderer } from "./ui/markdown-renderer";
import { cn } from "@/lib/utils";

export function BlogPreview({
  className,
  content,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-input w-full min-h-[80px] rounded-md bg-background px-3 py-2",
        className
      )}
    >
      <MarkdownRenderer className="prose-sm prose dark:prose-invert w-full">
        {content}
      </MarkdownRenderer>
    </div>
  );
}
