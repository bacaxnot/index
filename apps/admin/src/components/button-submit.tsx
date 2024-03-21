"use client";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import { useFormStatus } from "react-dom";
import { ServerFormAction } from "@/lib/actions/helpers";
import { useToast } from "./ui/use-toast";
import { ToastProps } from "./ui/toast";

type Props<TActionResponse = void> = ButtonProps & {
  loaderClassname?: string;
  handleSuccess?: (response: TActionResponse) => void;
  handleError?: (error: string) => void;
  action?: ServerFormAction<TActionResponse>;
  toast?: {
    success?: ToastProps;
    error?: ToastProps;
  };
};

export function ButtonSubmit<TActionResponse = void>({
  type,
  disabled,
  children,
  loaderClassname,
  formAction,
  toast,
  action,
  ...props
}: Props<TActionResponse>) {
  const { pending } = useFormStatus();
  const { toast: toaster } = useToast();

  function handleSuccess(response: TActionResponse) {
    toaster(
      toast?.success ?? {
        title: "Success",
        description: "Action completed successfully",
      }
    );
    props.handleSuccess?.(response);
  }

  function handleError(error: string) {
    toaster(
      toast?.error ?? {
        title: "Error",
        variant: "destructive",
        description: error,
      }
    );
    props.handleError?.(error);
  }

  async function handleSubmit(formData: FormData) {
    if (!action) return;
    const res = await action(formData);
    if ("error" in res) handleError(res.error);
    else handleSuccess(res.data);
  }
  return (
    <Button
      type="submit"
      aria-disabled={pending || disabled}
      disabled={pending || disabled}
      formAction={handleSubmit}
      {...props}
    >
      {pending ? <IconSpinner className={loaderClassname} /> : children}
    </Button>
  );
}

function IconSpinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("size-6 animate-spin", className)}
      {...props}
    >
      <path d="M232 128a104 104 0 0 1-208 0c0-41 23.81-78.36 60.66-95.27a8 8 0 0 1 6.68 14.54C60.15 61.59 40 93.27 40 128a88 88 0 0 0 176 0c0-34.73-20.15-66.41-51.34-80.73a8 8 0 0 1 6.68-14.54C208.19 49.64 232 87 232 128Z" />
    </svg>
  );
}
