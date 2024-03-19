import Markdown from "react-markdown";
import { ComponentProps } from "react";

type MarkdownProps = ComponentProps<typeof Markdown>;

export function MarkdownRenderer({ children, ...props }: MarkdownProps) {
  return <Markdown {...props}>{children}</Markdown>;
}
