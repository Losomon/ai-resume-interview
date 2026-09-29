import clsx from "clsx"; import { useId } from "react";
type P = React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };
export function Input({ label, error, className, ...p }: P) {
  const id = useId();
  return (<div><label htmlFor={id} className="block text-sm mb-1.5 text-soft">{label}</label>
    <input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined}
      className={clsx("h-12 md:h-11 w-full rounded-lg bg-bg2 border px-3 text-ink placeholder:text-mute transition-colors focus:border-primary", error ? "border-bad" : "border-line", className)} {...p} />
    {error && <p id={`${id}-e`} className="mt-1 text-xs text-bad">{error}</p>}</div>);
}
