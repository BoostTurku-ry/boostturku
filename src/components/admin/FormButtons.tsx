"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "danger" | "quiet";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink/85",
  outline: "border border-line text-ink hover:border-ink/30",
  danger: "text-boost hover:underline",
  quiet: "text-ink-muted hover:text-ink",
};

type SubmitButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  /** Ask before submitting (e.g. "Delete this member permanently?"). */
  confirm?: string;
  className?: string;
};

/** Submit button for admin forms: disables while pending and can ask for confirmation. */
export function SubmitButton({ children, variant = "outline", confirm, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        if (confirm && !window.confirm(confirm)) event.preventDefault();
      }}
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-sm text-[13px] whitespace-nowrap transition-colors disabled:opacity-50",
        variant === "danger" || variant === "quiet" ? "px-1" : "px-3",
        styles[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}
