import { clsx } from "clsx";

export default function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        // center + width
        "mx-auto w-full max-w-6xl",

        // global horizontal breathing room
        "px-4 sm:px-6 lg:px-10",

        className
      )}
      {...props}
    />
  );
}
