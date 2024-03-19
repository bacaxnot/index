import Textarea from "react-textarea-autosize";
import { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof Textarea>;

const TextareaAutosize = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 standalone:text-base",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TextareaAutosize.displayName = "Textarea";

export { TextareaAutosize };
