import { cn } from "@/lib/utils";

interface FormProps extends React.ComponentProps<"form"> {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  resetOnSubmit?: boolean;
}

function Form({
  resetOnSubmit = false,
  onSubmit,
  className,
  ...props
}: FormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit?.(e);
    if (resetOnSubmit) {
      e.currentTarget.reset();
    }
  };

  return (
    <form
      className={cn("space-y-4", className)}
      onSubmit={handleSubmit}
      {...props}
    />
  );
}

export { Form };
