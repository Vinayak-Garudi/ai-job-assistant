"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Briefcase,
  GraduationCap,
  FileText,
  Loader2,
} from "lucide-react";
import type { UserProfile } from "@/types";
import { saveProfile } from "@/app/profile/actions";
import { BasicInfoEditor } from "./BasicInfoEditor";
import { ProfessionalInfoEditor } from "./ProfessionalInfoEditor";
import { SkillsEditor } from "./SkillsEditor";
import { JobPreferenceSelector } from "./JobPreferenceSelector";
import { toast } from "sonner";
import { FileUpload } from "@/components/FileUpload";

interface ProfileFormProps {
  initialProfile: UserProfile;
}

export function ProfileForm({ initialProfile }: ProfileFormProps) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveProfile(profile);
      if (result.success) {
        toast.success(result.message);
        setIsEditing(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  const updateBasicInfo = (
    field: keyof UserProfile["basicInfo"],
    value: string | number,
  ) => {
    setProfile({
      ...profile,
      basicInfo: { ...profile.basicInfo, [field]: value },
    });
  };

  const updateProfessionalInfo = (
    field: keyof UserProfile["professionalInfo"],
    value: string | number,
  ) => {
    setProfile({
      ...profile,
      professionalInfo: { ...profile.professionalInfo, [field]: value },
    });
  };

  const updateEducation = (
    field: keyof UserProfile["education"],
    value: any,
  ) => {
    setProfile({
      ...profile,
      education: { ...profile.education, [field]: value },
    });
  };

  const addSkill = (skill: string) => {
    setProfile({
      ...profile,
      otherInfo: {
        ...profile.otherInfo,
        skills: [...profile.otherInfo.skills, skill],
      },
    });
  };

  const removeSkill = (skill: string) => {
    setProfile({
      ...profile,
      otherInfo: {
        ...profile.otherInfo,
        skills: profile.otherInfo.skills.filter((s) => s !== skill),
      },
    });
  };

  const addHobby = (hobby: string) => {
    setProfile({
      ...profile,
      otherInfo: {
        ...profile.otherInfo,
        hobbiesAndInterests: [...profile.otherInfo.hobbiesAndInterests, hobby],
      },
    });
  };

  const removeHobby = (hobby: string) => {
    setProfile({
      ...profile,
      otherInfo: {
        ...profile.otherInfo,
        hobbiesAndInterests: profile.otherInfo.hobbiesAndInterests.filter(
          (h) => h !== hobby,
        ),
      },
    });
  };

  const addSoftSkill = (skill: string) => {
    setProfile({
      ...profile,
      otherInfo: {
        ...profile.otherInfo,
        softSkills: [...profile.otherInfo.softSkills, skill],
      },
    });
  };

  const removeSoftSkill = (skill: string) => {
    setProfile({
      ...profile,
      otherInfo: {
        ...profile.otherInfo,
        softSkills: profile.otherInfo.softSkills.filter((s) => s !== skill),
      },
    });
  };

  const addCertification = (cert: string) => {
    setProfile({
      ...profile,
      education: {
        ...profile.education,
        certifications: [...profile.education.certifications, cert],
      },
    });
  };

  const removeCertification = (cert: string) => {
    setProfile({
      ...profile,
      education: {
        ...profile.education,
        certifications: profile.education.certifications.filter(
          (c) => c !== cert,
        ),
      },
    });
  };

  const addPreferredLocation = (location: string) => {
    setProfile({
      ...profile,
      jobPreferences: {
        ...profile.jobPreferences,
        preferredLocations: [
          ...profile.jobPreferences.preferredLocations,
          location,
        ],
      },
    });
  };

  const removePreferredLocation = (location: string) => {
    setProfile({
      ...profile,
      jobPreferences: {
        ...profile.jobPreferences,
        preferredLocations: profile.jobPreferences.preferredLocations.filter(
          (l) => l !== location,
        ),
      },
    });
  };

  const addDesiredRole = (role: string) => {
    setProfile({
      ...profile,
      jobPreferences: {
        ...profile.jobPreferences,
        desiredRoles: [...profile.jobPreferences.desiredRoles, role],
      },
    });
  };

  const removeDesiredRole = (role: string) => {
    setProfile({
      ...profile,
      jobPreferences: {
        ...profile.jobPreferences,
        desiredRoles: profile.jobPreferences.desiredRoles.filter(
          (r) => r !== role,
        ),
      },
    });
  };

  const toggleJobType = (type: string) => {
    const types = profile.jobPreferences.jobTypes.includes(type as any)
      ? profile.jobPreferences.jobTypes.filter((t) => t !== type)
      : [...profile.jobPreferences.jobTypes, type as any];
    setProfile({
      ...profile,
      jobPreferences: { ...profile.jobPreferences, jobTypes: types },
    });
  };

  const toggleWorkMode = (mode: string) => {
    const modes = profile.jobPreferences.workModes.includes(mode as any)
      ? profile.jobPreferences.workModes.filter((m) => m !== mode)
      : [...profile.jobPreferences.workModes, mode as any];
    setProfile({
      ...profile,
      jobPreferences: { ...profile.jobPreferences, workModes: modes },
    });
  };

  const handleResumeUpload = (fileData: {
    url: string;
    fileName: string;
    uploadedAt: Date;
  }) => {
    setProfile({
      ...profile,
      documents: {
        ...profile.documents,
        resume: fileData,
      },
    });
  };

  return (
    <>
      {/* Header Actions */}
      <div className="flex justify-end gap-2 mb-6">
        {isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
        )}
        <Button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          disabled={isPending}
        >
          {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Basic Information</CardTitle>
            </div>
            <CardDescription>Your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <BasicInfoEditor
              profile={profile}
              isEditing={isEditing}
              onUpdate={updateBasicInfo}
            />
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <CardTitle>Professional Information</CardTitle>
            </div>
            <CardDescription>Your work experience and industry</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfessionalInfoEditor
              profile={profile}
              isEditing={isEditing}
              onUpdate={updateProfessionalInfo}
            />
          </CardContent>
        </Card>

        {/* Skills and Interests */}
        <Card>
          <CardHeader>
            <CardTitle>Skills & Interests</CardTitle>
            <CardDescription>
              Your technical skills, hobbies, and soft skills
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Technical Skills */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Technical Skills</label>
              <SkillsEditor
                skills={profile.otherInfo.skills}
                isEditing={isEditing}
                onAdd={addSkill}
                onRemove={removeSkill}
                variant="secondary"
                placeholder="Add a skill"
              />
            </div>

            {/* Hobbies and Interests */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Hobbies & Interests</label>
              <SkillsEditor
                skills={profile.otherInfo.hobbiesAndInterests}
                isEditing={isEditing}
                onAdd={addHobby}
                onRemove={removeHobby}
                variant="outline"
                placeholder="Add a hobby or interest"
              />
            </div>

            {/* Soft Skills */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Soft Skills</label>
              <SkillsEditor
                skills={profile.otherInfo.softSkills}
                isEditing={isEditing}
                onAdd={addSoftSkill}
                onRemove={removeSoftSkill}
                variant="secondary"
                placeholder="Add a soft skill"
              />
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <CardTitle>Education</CardTitle>
            </div>
            <CardDescription>
              Your educational background and certifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Degree</label>
                <Input
                  value={profile.education.degree}
                  disabled={!isEditing}
                  onChange={(e) => updateEducation("degree", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">University</label>
                <Input
                  value={profile.education.university}
                  disabled={!isEditing}
                  onChange={(e) =>
                    updateEducation("university", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Graduation Year</label>
                <Select
                  value={profile.education.graduationYear.toString()}
                  disabled={!isEditing}
                  onValueChange={(value) =>
                    updateEducation("graduationYear", parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select graduation year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 50 }, (_, i) => {
                      const year = new Date().getFullYear() + 5 - i;
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Certifications</label>
              <SkillsEditor
                skills={profile.education.certifications}
                isEditing={isEditing}
                onAdd={addCertification}
                onRemove={removeCertification}
                variant="secondary"
                placeholder="Add a certification"
              />
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <CardTitle>Documents</CardTitle>
            </div>
            <CardDescription>Upload and manage your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload
              onUploadSuccess={handleResumeUpload}
              acceptedFormats={[".pdf", ".docx", ".doc"]}
              maxSizeInMB={10}
              currentFile={profile.documents.resume}
              disabled={!isEditing}
            />
          </CardContent>
        </Card>

        {/* Job Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Job Preferences</CardTitle>
            <CardDescription>Define your ideal job criteria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Job Types */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Job Types</label>
              <JobPreferenceSelector
                options={["Full Time", "Part Time", "Internship", "Contract"]}
                selected={profile.jobPreferences.jobTypes}
                isEditing={isEditing}
                onToggle={toggleJobType}
              />
            </div>

            {/* Work Modes */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Work Modes</label>
              <JobPreferenceSelector
                options={["Remote", "On-site", "Hybrid"]}
                selected={profile.jobPreferences.workModes}
                isEditing={isEditing}
                onToggle={toggleWorkMode}
              />
            </div>

            {/* Preferred Locations */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Preferred Locations</label>
              <SkillsEditor
                skills={profile.jobPreferences.preferredLocations}
                isEditing={isEditing}
                onAdd={addPreferredLocation}
                onRemove={removePreferredLocation}
                variant="secondary"
                placeholder="Add a preferred location"
              />
            </div>

            {/* Desired Roles */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Desired Roles</label>
              <SkillsEditor
                skills={profile.jobPreferences.desiredRoles}
                isEditing={isEditing}
                onAdd={addDesiredRole}
                onRemove={removeDesiredRole}
                variant="secondary"
                placeholder="Add a desired role"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
