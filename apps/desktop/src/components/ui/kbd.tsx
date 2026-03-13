import { cn } from "@/lib/utils";

function Kbd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-medium font-mono text-[0.65rem] text-muted-foreground",
        className
      )}
    >
      {children}
    </kbd>
  );
}

export { Kbd };
