"use client";

import { Input } from "@/components/ui/input";
import type { UserProfile } from "@/types";

interface BasicInfoEditorProps {
  profile: UserProfile;
  isEditing: boolean;
  onUpdate: (
    field: keyof UserProfile["basicInfo"],
    value: string | number
  ) => void;
}

export function BasicInfoEditor({
  profile,
  isEditing,
  onUpdate,
}: BasicInfoEditorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Username</label>
        <Input
          value={profile.basicInfo.username}
          disabled={!isEditing}
          onChange={(e) => onUpdate("username", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Age</label>
        <Input
          type="number"
          value={profile.basicInfo.age}
          disabled={!isEditing}
          onChange={(e) => onUpdate("age", parseInt(e.target.value) || 0)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input
          type="email"
          value={profile.basicInfo.email}
          disabled={!isEditing}
          onChange={(e) => onUpdate("email", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Location</label>
        <Input
          value={profile.basicInfo.location}
          disabled={!isEditing}
          onChange={(e) => onUpdate("location", e.target.value)}
        />
      </div>
    </div>
  );
}
