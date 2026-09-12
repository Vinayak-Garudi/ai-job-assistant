"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldError } from "@/components/ui/field-error";
import { SelectWithOther } from "./SelectWithOther";
import {
  INDUSTRY_OPTIONS,
  JOB_TITLE_OPTIONS,
  getSuggestedIndustries,
} from "@/lib/profileOptions";
import type { UserProfile } from "@/types";

type ProfessionalInfoErrors = Partial<
  Record<keyof UserProfile["professionalInfo"], string>
>;

interface ProfessionalInfoEditorProps {
  profile: UserProfile;
  isEditing: boolean;
  errors?: ProfessionalInfoErrors;
  onUpdate: (
    field: keyof UserProfile["professionalInfo"],
    value: string | number | null,
  ) => void;
}

export function ProfessionalInfoEditor({
  profile,
  isEditing,
  errors = {},
  onUpdate,
}: ProfessionalInfoEditorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SelectWithOther
        id="currentTitle"
        label="Current Title"
        value={profile.professionalInfo.currentTitle}
        options={JOB_TITLE_OPTIONS}
        placeholder="Select your job title"
        otherPlaceholder="Type your job title"
        disabled={!isEditing}
        error={errors.currentTitle}
        onChange={(value) => onUpdate("currentTitle", value)}
      />

      <div className="space-y-2">
        <label htmlFor="currentCompany" className="text-sm font-medium">
          Current Company
        </label>
        <Input
          id="currentCompany"
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
              aria-label="Years of experience"
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
              aria-label="Months of experience"
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

      <SelectWithOther
        id="industry"
        label="Industry"
        value={profile.professionalInfo.industry}
        options={INDUSTRY_OPTIONS}
        suggestions={getSuggestedIndustries(
          profile.professionalInfo.currentTitle,
        )}
        placeholder="Select your industry"
        otherPlaceholder="Type your industry"
        disabled={!isEditing}
        error={errors.industry}
        onChange={(value) => onUpdate("industry", value)}
      />

      <div className="space-y-2">
        <label htmlFor="currentCTC" className="text-sm font-medium">
          Current CTC per Annum
        </label>
        <div className="flex gap-2">
          <Select
            value={profile.professionalInfo.salaryCurrency ?? "INR"}
            disabled={!isEditing}
            onValueChange={(value) => onUpdate("salaryCurrency", value)}
          >
            <SelectTrigger className="w-24" aria-label="Salary currency">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INR">INR</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>
          <Input
            id="currentCTC"
            type="number"
            placeholder="Enter Current CTC per Annum"
            min={0}
            value={profile.professionalInfo.currentCTCPerAnum ?? ""}
            disabled={!isEditing}
            aria-invalid={Boolean(errors.currentCTCPerAnum)}
            onChange={(e) =>
              onUpdate(
                "currentCTCPerAnum",
                e.target.value === "" ? null : parseInt(e.target.value),
              )
            }
          />
        </div>
        <FieldError message={errors.currentCTCPerAnum} />
      </div>
    </div>
  );
}
