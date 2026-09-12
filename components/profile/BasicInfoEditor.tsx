"use client";

import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field-error";
import type { UserProfile } from "@/types";

type BasicInfoErrors = Partial<Record<keyof UserProfile["basicInfo"], string>>;

interface BasicInfoEditorProps {
  profile: UserProfile;
  isEditing: boolean;
  errors?: BasicInfoErrors;
  onUpdate: (
    field: keyof UserProfile["basicInfo"],
    value: string | number,
  ) => void;
}

export function BasicInfoEditor({
  profile,
  isEditing,
  errors = {},
  onUpdate,
}: BasicInfoEditorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <Input
          id="username"
          value={profile.basicInfo.username || ""}
          disabled={!isEditing}
          aria-invalid={Boolean(errors.username)}
          aria-describedby={errors.username ? "username-error" : undefined}
          onChange={(e) => onUpdate("username", e.target.value)}
        />
        <FieldError id="username-error" message={errors.username} />
      </div>
      <div className="space-y-2">
        <label htmlFor="age" className="text-sm font-medium">
          Age
        </label>
        <Input
          id="age"
          type="number"
          value={profile.basicInfo.age || ""}
          disabled={!isEditing}
          min={0}
          max={120}
          aria-invalid={Boolean(errors.age)}
          aria-describedby={errors.age ? "age-error" : undefined}
          onChange={(e) => onUpdate("age", parseInt(e.target.value) || 0)}
        />
        <FieldError id="age-error" message={errors.age} />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={profile.basicInfo.email || ""}
          disabled={!isEditing}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          onChange={(e) => onUpdate("email", e.target.value)}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>
      <div className="space-y-2">
        <label htmlFor="location" className="text-sm font-medium">
          Location
        </label>
        <Input
          id="location"
          value={profile.basicInfo.location || ""}
          disabled={!isEditing}
          aria-invalid={Boolean(errors.location)}
          aria-describedby={errors.location ? "location-error" : undefined}
          onChange={(e) => onUpdate("location", e.target.value)}
        />
        <FieldError id="location-error" message={errors.location} />
      </div>
    </div>
  );
}
