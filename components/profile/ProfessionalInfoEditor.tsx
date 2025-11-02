"use client";

import { Input } from "@/components/ui/input";
import type { UserProfile } from "@/types";

interface ProfessionalInfoEditorProps {
  profile: UserProfile;
  isEditing: boolean;
  onUpdate: (
    field: keyof UserProfile["professionalInfo"],
    value: string | number
  ) => void;
}

export function ProfessionalInfoEditor({
  profile,
  isEditing,
  onUpdate,
}: ProfessionalInfoEditorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Current Title</label>
        <Input
          value={profile.professionalInfo.currentTitle}
          disabled={!isEditing}
          onChange={(e) => onUpdate("currentTitle", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Current Company</label>
        <Input
          value={profile.professionalInfo.currentCompany}
          disabled={!isEditing}
          onChange={(e) => onUpdate("currentCompany", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Years of Experience</label>
        <Input
          type="number"
          value={profile.professionalInfo.experienceYears}
          disabled={!isEditing}
          onChange={(e) =>
            onUpdate("experienceYears", parseInt(e.target.value) || 0)
          }
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Industry</label>
        <Input
          value={profile.professionalInfo.industry}
          disabled={!isEditing}
          onChange={(e) => onUpdate("industry", e.target.value)}
        />
      </div>
    </div>
  );
}
