"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface EditButtonProps {
  onEditToggle: (isEditing: boolean) => void;
}

export function EditButton({ onEditToggle }: EditButtonProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    const newEditingState = !isEditing;
    setIsEditing(newEditingState);
    onEditToggle(newEditingState);
  };

  return (
    <Button onClick={handleToggle}>
      <Settings className="h-4 w-4 mr-2" />
      {isEditing ? "Cancel" : "Edit Profile"}
    </Button>
  );
}
