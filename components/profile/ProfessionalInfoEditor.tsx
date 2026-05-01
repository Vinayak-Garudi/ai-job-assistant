"use client";


import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserProfile } from "@/types";

interface ProfessionalInfoEditorProps {
  profile: UserProfile;
  isEditing: boolean;
  onUpdate: (
    field: keyof UserProfile["professionalInfo"],
    value: string | number | null,
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
        <label className="text-sm font-medium">Experience</label>
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Years"
              min={0}
              value={profile.professionalInfo.experienceYears}
              disabled={!isEditing}
              onChange={(e) =>
                onUpdate("experienceYears", parseInt(e.target.value) || 0)
              }
            />
            <span className="text-xs text-muted-foreground mt-1 block">
              Years
            </span>
          </div>
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Months"
              min={0}
              max={11}
              value={profile.professionalInfo.experienceMonths ?? 0}
              disabled={!isEditing}
              onChange={(e) =>
                onUpdate(
                  "experienceMonths",
                  Math.min(11, parseInt(e.target.value) || 0),
                )
              }
            />
            <span className="text-xs text-muted-foreground mt-1 block">
              Months
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Industry</label>
        <Input
          value={profile.professionalInfo.industry}
          disabled={!isEditing}
          onChange={(e) => onUpdate("industry", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Current CTC per Annum</label>
        <div className="flex gap-2">
          <Select
            value={profile.professionalInfo.salaryCurrency ?? "INR"}
            disabled={!isEditing}
            onValueChange={(value) => onUpdate("salaryCurrency", value)}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INR">INR</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Enter Current CTC per Annum"
            min={0}
            value={profile.professionalInfo.currentCTCPerAnum ?? ""}
            disabled={!isEditing}
            onChange={(e) =>
              onUpdate(
                "currentCTCPerAnum",
                e.target.value === "" ? null : parseInt(e.target.value),
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
