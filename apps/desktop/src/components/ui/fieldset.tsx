import { cn } from "@/lib/utils";

interface FieldsetProps {
  children: React.ReactNode;
  className?: string;
  legend: string;
}

function Fieldset({ legend, className, children }: FieldsetProps) {
  return (
    <fieldset className={cn("space-y-4", className)}>
      <legend className="font-medium text-sm leading-none">{legend}</legend>
      {children}
    </fieldset>
  );
}

export { Fieldset };
