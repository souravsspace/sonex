import { useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface AutocompleteProps {
  className?: string;
  onSelect: (value: string) => void;
  onValueChange: (value: string) => void;
  placeholder?: string;
  suggestions: string[];
  value: string;
}

function Autocomplete({
  suggestions,
  value,
  onValueChange,
  onSelect,
  placeholder,
  className,
}: AutocompleteProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = suggestions.filter((s) =>
    s.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <Command className="rounded-lg border" shouldFilter={false}>
        <CommandInput
          onValueChange={(v) => {
            onValueChange(v);
            setOpen(v.length > 0);
          }}
          placeholder={placeholder}
          value={value}
        />
        {open && filtered.length > 0 && (
          <div className="absolute top-full z-50 mt-1 w-full rounded-lg border bg-popover shadow-md">
            <CommandList>
              <CommandEmpty>No results</CommandEmpty>
              <CommandGroup>
                {filtered.map((s) => (
                  <CommandItem
                    key={s}
                    onSelect={() => {
                      onSelect(s);
                      setOpen(false);
                    }}
                    value={s}
                  >
                    {s}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
}

export { Autocomplete };
