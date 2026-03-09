import { cn } from "@/lib/utils";

interface EmptyProps {
  children?: React.ReactNode;
  className?: string;
  description?: string;
  icon?: React.ReactNode;
  title: string;
}

function Empty({ icon, title, description, className, children }: EmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-8 text-center",
        className
      )}
    >
      {icon && (
        <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <p className="font-medium text-sm">{title}</p>
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

export { Empty };
