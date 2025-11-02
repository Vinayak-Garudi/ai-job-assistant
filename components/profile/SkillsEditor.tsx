"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface SkillsEditorProps {
  skills: string[];
  isEditing: boolean;
  onAdd: (skill: string) => void;
  onRemove: (skill: string) => void;
  variant?: "default" | "secondary" | "outline";
  placeholder?: string;
}

export function SkillsEditor({
  skills,
  isEditing,
  onAdd,
  onRemove,
  variant = "secondary",
  placeholder = "Add a skill",
}: SkillsEditorProps) {
  const [newSkill, setNewSkill] = useState("");

  const handleAdd = () => {
    if (newSkill.trim()) {
      onAdd(newSkill.trim());
      setNewSkill("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant={variant} className="gap-1">
            {skill}
            {isEditing && (
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => onRemove(skill)}
              />
            )}
          </Badge>
        ))}
      </div>
      {isEditing && (
        <div className="flex gap-2">
          <Input
            placeholder={placeholder}
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button type="button" onClick={handleAdd} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}
