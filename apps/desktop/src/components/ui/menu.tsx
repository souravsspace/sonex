import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckboxItem as DropdownCheckboxItem,
  Content as DropdownContent,
  Item as DropdownItem,
  ItemIndicator as DropdownItemIndicator,
  Label as DropdownLabel,
  Portal as DropdownPortal,
  RadioGroup as DropdownRadioGroup,
  RadioItem as DropdownRadioItem,
  Root as DropdownRoot,
  Separator as DropdownSeparator,
  Sub as DropdownSub,
  SubContent as DropdownSubContent,
  SubTrigger as DropdownSubTrigger,
  Trigger as DropdownTrigger,
} from "@radix-ui/react-dropdown-menu";
import type React from "react";
import { cn } from "@/lib/utils";

const Root = DropdownRoot;
const Trigger = DropdownTrigger;
const Portal = DropdownPortal;
const Sub = DropdownSub;
const RadioGroup = DropdownRadioGroup;

function Content({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownContent>) {
  return (
    <DropdownPortal>
      <DropdownContent
        className={cn(
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 min-w-32 overflow-hidden rounded-lg border-border/30 bg-popover/80 p-1 text-popover-foreground shadow-lg backdrop-blur-xl data-[state=closed]:animate-out data-[state=open]:animate-in dark:border-border/20 dark:bg-popover/60",
          className
        )}
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownPortal>
  );
}

function Item({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownItem> & {
  inset?: boolean;
}) {
  return (
    <DropdownItem
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

function CheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownCheckboxItem>) {
  return (
    <DropdownCheckboxItem
      checked={checked}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownItemIndicator>
          <svg
            aria-hidden="true"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              d="M20 6 9 17l-5-5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </DropdownItemIndicator>
      </span>
      {children}
    </DropdownCheckboxItem>
  );
}

function RadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownRadioItem>) {
  return (
    <DropdownRadioItem
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownItemIndicator>
          <svg
            aria-hidden="true"
            className="size-2 fill-current"
            viewBox="0 0 8 8"
          >
            <circle cx="4" cy="4" r="4" />
          </svg>
        </DropdownItemIndicator>
      </span>
      {children}
    </DropdownRadioItem>
  );
}

function Label({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownLabel> & {
  inset?: boolean;
}) {
  return (
    <DropdownLabel
      className={cn(
        "px-2 py-1.5 font-semibold text-muted-foreground text-xs",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

function Separator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownSeparator>) {
  return (
    <DropdownSeparator
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function SubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownSubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownSubTrigger
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&>svg]:size-4 [&>svg]:shrink-0",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <HugeiconsIcon className="ml-auto" icon={ArrowRight01Icon} size={14} />
    </DropdownSubTrigger>
  );
}

function SubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownSubContent>) {
  return (
    <DropdownPortal>
      <DropdownSubContent
        className={cn(
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 min-w-32 overflow-hidden rounded-lg border-border/30 bg-popover/80 p-1 text-popover-foreground shadow-lg backdrop-blur-xl data-[state=closed]:animate-out data-[state=open]:animate-in dark:border-border/20 dark:bg-popover/60",
          className
        )}
        {...props}
      />
    </DropdownPortal>
  );
}

export const Menu = {
  Root,
  Trigger,
  Portal,
  Content,
  Item,
  CheckboxItem,
  RadioItem,
  RadioGroup,
  Label,
  Separator,
  Sub,
  SubTrigger,
  SubContent,
};
