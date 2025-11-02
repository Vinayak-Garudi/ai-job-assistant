"use client";

import { Badge } from "@/components/ui/badge";

interface JobPreferenceSelectorProps {
  options: string[];
  selected: string[];
  isEditing: boolean;
  onToggle: (option: string) => void;
}

export function JobPreferenceSelector({
  options,
  selected,
  isEditing,
  onToggle,
}: JobPreferenceSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Badge
          key={option}
          variant={selected.includes(option) ? "default" : "outline"}
          className={isEditing ? "cursor-pointer" : ""}
          onClick={() => isEditing && onToggle(option)}
        >
          {option}
        </Badge>
      ))}
    </div>
  );
}
