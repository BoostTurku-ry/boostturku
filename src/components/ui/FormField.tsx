import { cn } from "@/lib/cn";

const control =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/70 transition-colors focus:border-ink/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boost aria-invalid:border-boost";

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
  children?: React.ReactNode;
};

/** Label + control + error message. Pass a custom control as children, or use the props for a text input. */
export function FormField({
  label,
  name,
  error,
  hint,
  className,
  children,
  ...input
}: FieldProps & React.ComponentProps<"input">) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="label-mono text-ink-muted">
        {label}
      </label>
      <div className="mt-2">
        {children ?? (
          <input
            id={id}
            name={name}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={control}
            {...input}
          />
        )}
      </div>
      {hint && !error && <p className="mt-1.5 text-sm text-ink-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-boost">
          {error}
        </p>
      )}
    </div>
  );
}

export const controlClass = control;

export function Textarea({ name, error, className, ...rest }: React.ComponentProps<"textarea"> & { error?: string }) {
  return (
    <textarea
      id={`f-${name}`}
      name={name}
      aria-invalid={error ? true : undefined}
      className={cn(control, "min-h-36 resize-y", className)}
      {...rest}
    />
  );
}

export function Select({ name, error, className, children, ...rest }: React.ComponentProps<"select"> & { error?: string }) {
  return (
    <select
      id={`f-${name}`}
      name={name}
      aria-invalid={error ? true : undefined}
      className={cn(control, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%238a8480%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:12px] bg-[position:right_1rem_center] bg-no-repeat pr-10", className)}
      {...rest}
    >
      {children}
    </select>
  );
}
