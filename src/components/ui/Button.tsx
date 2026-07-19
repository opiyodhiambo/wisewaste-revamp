import { clsx } from "clsx";

export default function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
        variant === "primary" && "bg-slate-900 text-white hover:bg-slate-800",
        variant === "ghost" && "bg-transparent text-slate-800 hover:bg-slate-100",
        className
      )}
      {...props}
    />
  );
}