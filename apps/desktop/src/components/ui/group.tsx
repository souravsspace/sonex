import { cn } from "@/lib/utils";

interface GroupProps {
  children: React.ReactNode;
  className?: string;
  direction?: "row" | "col";
  gap?: "sm" | "md" | "lg";
}

const gapMap = {
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-4",
} as const;

function Group({
  direction = "row",
  gap = "md",
  className,
  children,
}: GroupProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "row" ? "flex-row items-center" : "flex-col",
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

export { Group };
