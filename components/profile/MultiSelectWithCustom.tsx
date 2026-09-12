"use client";

import { useState } from "react";
import { Check, Pencil, Plus, Sparkles, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

interface MultiSelectWithCustomProps {
  id: string;
  label: string;
  values: string[];
  options: readonly string[];
  /** Shown first under a "Suggested" heading; the full list stays selectable. */
  suggestions?: readonly string[];
  triggerLabel?: string;
  searchPlaceholder?: string;
  /** Picking this clears everything else; picking anything else clears it. */
  exclusiveOption?: string;
  disabled?: boolean;
  error?: string;
  onChange: (values: string[]) => void;
}

export function MultiSelectWithCustom({
  id,
  label,
  values,
  options,
  suggestions = [],
  triggerLabel = "Add",
  searchPlaceholder = "Search or type your own…",
  exclusiveOption,
  disabled = false,
  error,
  onChange,
}: MultiSelectWithCustomProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const errorId = error ? `${id}-error` : undefined;
  const needle = query.trim().toLowerCase();
  const typed = query.trim();

  const isOffered = (option: string) =>
    !values.includes(option) && option.toLowerCase().includes(needle);

  // Suggestions render in their own group, so drop them from the main list to
  // keep every cmdk item value unique.
  const suggested = suggestions.filter(
    (option) => options.includes(option) && isOffered(option),
  );
  const available = options.filter(
    (option) => !suggestions.includes(option) && isOffered(option),
  );

  // Only offer free text that isn't already an option or already chosen.
  const canAddTyped =
    typed !== "" &&
    !values.some((value) => value.toLowerCase() === typed.toLowerCase()) &&
    !options.some((option) => option.toLowerCase() === typed.toLowerCase()) &&
    typed.toLowerCase() !== exclusiveOption?.toLowerCase();

  const showExclusive =
    Boolean(exclusiveOption) &&
    !values.includes(exclusiveOption as string) &&
    (exclusiveOption as string).toLowerCase().includes(needle);

  const add = (value: string) => {
    if (exclusiveOption && value === exclusiveOption) {
      onChange([exclusiveOption]);
    } else {
      const kept = exclusiveOption
        ? values.filter((v) => v !== exclusiveOption)
        : values;
      onChange([...kept, value]);
    }
    setQuery("");
  };

  const remove = (value: string) => {
    onChange(values.filter((v) => v !== value));
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>

      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((value) => (
            <Badge key={value} variant="secondary" className="gap-1">
              {value}
              {!disabled && (
                <button
                  type="button"
                  aria-label={`Remove ${value}`}
                  onClick={() => remove(value)}
                  className="-mr-0.5 cursor-pointer rounded-full outline-none hover:text-destructive focus-visible:ring-[2px] focus-visible:ring-ring/50"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}
        </div>
      )}

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
              "border-input flex h-9 w-full items-center gap-2 rounded-md border bg-transparent px-3 py-2 text-sm text-muted-foreground shadow-xs transition-[color,box-shadow] outline-none",
              "dark:bg-input/30 dark:hover:bg-input/50",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            <Plus className="size-4 shrink-0" />
            <span className="truncate">{triggerLabel}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-(--radix-popover-trigger-width) overflow-hidden p-0"
          align="start"
          sideOffset={4}
        >
          {/* Filtering is ours so the free-text and exclusive rows always show. */}
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={searchPlaceholder}
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              {suggested.length > 0 && (
                <CommandGroup heading="Suggested for you">
                  {suggested.map((option) => (
                    <CommandItem
                      key={option}
                      value={option}
                      onSelect={() => add(option)}
                    >
                      <Sparkles className="size-4" />
                      {option}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {available.length > 0 && (
                <CommandGroup
                  heading={suggested.length > 0 ? "All options" : undefined}
                >
                  {available.map((option) => (
                    <CommandItem
                      key={option}
                      value={option}
                      onSelect={() => add(option)}
                    >
                      <span className="flex size-4 shrink-0 items-center justify-center" />
                      {option}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {(suggested.length > 0 || available.length > 0) && (
                <CommandSeparator />
              )}
              <CommandGroup>
                {canAddTyped ? (
                  <CommandItem value="__add__" onSelect={() => add(typed)}>
                    <Plus className="size-4" />
                    Add &quot;{typed}&quot;
                  </CommandItem>
                ) : (
                  typed === "" && (
                    <CommandItem value="__other__" disabled>
                      <Pencil className="size-4" />
                      Other — type to add your own
                    </CommandItem>
                  )
                )}
              </CommandGroup>

              {showExclusive && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      value="__exclusive__"
                      onSelect={() => add(exclusiveOption as string)}
                    >
                      <Check className="size-4" />
                      {exclusiveOption}
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <FieldError id={errorId} message={error} />
    </div>
  );
}
