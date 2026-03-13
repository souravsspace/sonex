import {
  ArrowDown01Icon,
  Cancel01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface ComboboxOption {
  label: string;
  value: string;
}

interface ComboboxProps {
  className?: string;
  emptyMessage?: string;
  onSelect: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  value?: string;
}

function Combobox({
  options,
  value,
  onSelect,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results",
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <Button
        aria-expanded={open}
        className="w-full justify-between font-normal"
        onClick={() => setOpen((v) => !v)}
        role="combobox"
        variant="outline"
      >
        <span className={cn(!selected && "text-muted-foreground")}>
          {selected ? selected.label : placeholder}
        </span>
        <HugeiconsIcon
          className="ml-2 opacity-50"
          icon={open ? Cancel01Icon : ArrowDown01Icon}
          size={14}
        />
      </Button>
      {open && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-lg border-border/30 bg-popover/80 shadow-lg backdrop-blur-xl dark:border-border/20 dark:bg-popover/60">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      onSelect(option.value);
                      setOpen(false);
                    }}
                    value={option.value}
                  >
                    {option.label}
                    {value === option.value && (
                      <HugeiconsIcon
                        className="ml-auto"
                        icon={Tick02Icon}
                        size={14}
                      />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}

export { Combobox };
export type { ComboboxOption };
