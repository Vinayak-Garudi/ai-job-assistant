"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FieldError } from "@/components/ui/field-error";
import { cn } from "@/lib/utils";

interface SelectWithOtherProps {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  placeholder?: string;
  otherPlaceholder?: string;
  searchPlaceholder?: string;
  /** Shown first under a "Suggested" heading; the full list stays selectable. */
  suggestions?: readonly string[];
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
}

export function SelectWithOther({
  id,
  label,
  value,
  options,
  placeholder = "Select an option",
  otherPlaceholder = "Type your own",
  searchPlaceholder = "Search…",
  suggestions = [],
  disabled = false,
  error,
  onChange,
}: SelectWithOtherProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [pickedOther, setPickedOther] = useState(false);

  // A recognised value always wins over local state, so a parent that resets the
  // value (ProfileForm's Cancel) snaps the control back to the dropdown. Anything
  // unrecognised counts as "Other" so free text saved before these option lists
  // existed stays editable instead of silently disappearing.
  const isKnownOption = value !== "" && options.includes(value);
  const isOther = !isKnownOption && (pickedOther || value !== "");
  const errorId = error ? `${id}-error` : undefined;

  // "Other" is never filtered out — it is the escape hatch when nothing matches.
  const needle = query.trim().toLowerCase();
  const matchesQuery = (option: string) =>
    option.toLowerCase().includes(needle);

  // Suggestions are listed separately, so drop them from the main list to keep
  // every cmdk item value unique.
  const suggested = suggestions.filter(
    (option) => options.includes(option) && matchesQuery(option),
  );
  const rest = options.filter(
    (option) => !suggestions.includes(option) && matchesQuery(option),
  );
  const hasResults = suggested.length > 0 || rest.length > 0;

  const selectOption = (option: string) => {
    setPickedOther(false);
    onChange(option);
    setQuery("");
    setOpen(false);
  };

  const selectOther = () => {
    setPickedOther(true);
    // Carry whatever they typed into the free-text field rather than losing it.
    onChange(query.trim());
    setQuery("");
    setOpen(false);
  };

  const backToList = () => {
    setPickedOther(false);
    onChange("");
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>

      {isOther ? (
        <div className="space-y-1.5">
          <Input
            id={id}
            value={value}
            disabled={disabled}
            placeholder={otherPlaceholder}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            onChange={(e) => onChange(e.target.value)}
          />
          {!disabled && (
            <button
              type="button"
              onClick={backToList}
              className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Choose from the list instead
            </button>
          )}
        </div>
      ) : (
        <Popover
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            if (!next) setQuery("");
          }}
        >
          <PopoverTrigger asChild>
            <button
              id={id}
              type="button"
              role="combobox"
              aria-expanded={open}
              aria-invalid={Boolean(error)}
              aria-describedby={errorId}
              disabled={disabled}
              className={cn(
                "border-input flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none",
                "dark:bg-input/30 dark:hover:bg-input/50",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              <span
                className={cn("truncate", !value && "text-muted-foreground")}
              >
                {value || placeholder}
              </span>
              <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-(--radix-popover-trigger-width) overflow-hidden p-0"
            align="start"
            sideOffset={4}
          >
            {/* Filtering is ours so that "Other" survives every query. */}
            <Command shouldFilter={false}>
              <CommandInput
                placeholder={searchPlaceholder}
                value={query}
                onValueChange={setQuery}
              />
              <CommandList>
                {suggested.length > 0 && (
                  <CommandGroup heading="Suggested for your role">
                    {suggested.map((option) => (
                      <CommandItem
                        key={option}
                        value={option}
                        onSelect={() => selectOption(option)}
                      >
                        <span className="flex size-4 shrink-0 items-center justify-center">
                          {value === option && <Check className="size-4" />}
                        </span>
                        {option}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                {rest.length > 0 && (
                  <CommandGroup
                    heading={suggested.length > 0 ? "All options" : undefined}
                  >
                    {rest.map((option) => (
                      <CommandItem
                        key={option}
                        value={option}
                        onSelect={() => selectOption(option)}
                      >
                        <span className="flex size-4 shrink-0 items-center justify-center">
                          {value === option && <Check className="size-4" />}
                        </span>
                        {option}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                {hasResults && <CommandSeparator />}
                <CommandGroup>
                  <CommandItem value="__other__" onSelect={selectOther}>
                    <Pencil className="size-4" />
                    {query.trim() ? `Use "${query.trim()}"` : "Other"}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}

      <FieldError id={errorId} message={error} />
    </div>
  );
}
