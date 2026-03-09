import { useId } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FieldProps {
  children: React.ReactElement<{ id?: string; "aria-describedby"?: string }>;
  className?: string;
  error?: string;
  hint?: string;
  label?: string;
}

function Field({ label, hint, error, className, children }: FieldProps) {
  const id = useId();
  const descriptionId = hint || error ? `${id}-description` : undefined;

  const child = {
    ...children,
    props: {
      ...children.props,
      id: children.props.id ?? id,
      "aria-describedby": descriptionId,
    },
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      {child}
      {(hint || error) && (
        <p
          className={cn(
            "text-xs",
            error ? "text-destructive" : "text-muted-foreground"
          )}
          id={descriptionId}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export { Field };
