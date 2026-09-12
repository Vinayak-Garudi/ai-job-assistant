"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  CheckCircle2,
  FileText,
  GraduationCap,
  Loader2,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileUpload } from "@/components/FileUpload";
import { FieldError } from "@/components/ui/field-error";
import { BasicInfoEditor } from "@/components/profile/BasicInfoEditor";
import { ProfessionalInfoEditor } from "@/components/profile/ProfessionalInfoEditor";
import { SkillsEditor } from "@/components/profile/SkillsEditor";
import { MultiSelectWithCustom } from "@/components/profile/MultiSelectWithCustom";
import { JobPreferenceSelector } from "@/components/profile/JobPreferenceSelector";
import { saveProfile } from "@/app/profile/actions";
import { getItem, removeItem, setItem } from "@/lib/localStorage";
import { withProfileDefaults } from "@/lib/profileDefaults";
import {
  NOT_APPLICABLE,
  ROLE_OPTIONS,
  SOFT_SKILL_OPTIONS,
  TECHNICAL_SKILL_OPTIONS,
  getSuggestedRoles,
} from "@/lib/profileOptions";
import { cn } from "@/lib/utils";
import type { UserProfile } from "@/types";

const DRAFT_KEY_PREFIX = "onboarding-draft";

function draftKey(userId: string) {
  return userId ? `${DRAFT_KEY_PREFIX}:${userId}` : DRAFT_KEY_PREFIX;
}

interface OnboardingDraft {
  profile: UserProfile;
  step: number;
}

type FieldErrors = Record<string, string>;

interface StepDefinition {
  id: string;
  shortLabel: string;
  encouragement: string;
  title: string;
  description: string;
  Icon: typeof User;
  validate?: (profile: UserProfile) => FieldErrors;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const steps: StepDefinition[] = [
  {
    id: "basic",
    shortLabel: "About you",
    encouragement: "Let's get started",
    title: "Let's start with you",
    description:
      "The basics help us tailor every recommendation to your location and market.",
    Icon: User,
    validate: ({ basicInfo }) => {
      const errors: FieldErrors = {};
      if (!basicInfo.username.trim()) errors.username = "Add your name";
      if (!basicInfo.age || basicInfo.age < 16 || basicInfo.age > 100)
        errors.age = "Enter an age between 16 and 100";
      if (!EMAIL_PATTERN.test(basicInfo.email.trim()))
        errors.email = "Enter a valid email address";
      if (!basicInfo.location.trim())
        errors.location = "Add the city you're based in";
      return errors;
    },
  },
  {
    id: "professional",
    shortLabel: "Your work",
    encouragement: "Nice start",
    title: "What do you do today?",
    description:
      "Your current role and experience drive match scores and your salary estimate. Just starting out? Leave experience at zero.",
    Icon: Briefcase,
    validate: ({ professionalInfo }) => {
      const errors: FieldErrors = {};
      if (!professionalInfo.currentTitle.trim())
        errors.currentTitle = "Pick your current or most recent job title";
      if (!professionalInfo.industry.trim())
        errors.industry = "Pick the industry you work in";
      return errors;
    },
  },
  {
    id: "skills",
    shortLabel: "Skills",
    encouragement: "You're rolling",
    title: "What are you good at?",
    description:
      "Skills are what we match job descriptions against — the more specific, the better the score.",
    Icon: Sparkles,
    validate: ({ otherInfo }): FieldErrors =>
      otherInfo.skills.length === 0
        ? { skills: "Add at least one skill" }
        : {},
  },
  {
    id: "education",
    shortLabel: "Education",
    encouragement: "Halfway there",
    title: "Education & certifications",
    description:
      "Plenty of roles screen on qualifications before a human reads your resume — this is what gets you past that filter.",
    Icon: GraduationCap,
    validate: ({ education }) => {
      const errors: FieldErrors = {};
      if (!education.degree.trim()) errors.degree = "Add your degree";
      if (!education.university.trim())
        errors.university = "Add where you studied";
      if (!education.graduationYear)
        errors.graduationYear = "Pick your graduation year";
      return errors;
    },
  },
  {
    id: "preferences",
    shortLabel: "Preferences",
    encouragement: "Nearly done",
    title: "What are you looking for?",
    description:
      "Tell us the shape of the role you want and we'll weight matches accordingly.",
    Icon: Target,
    validate: ({ jobPreferences }) => {
      const errors: FieldErrors = {};
      if (jobPreferences.jobTypes.length === 0)
        errors.jobTypes = "Pick at least one job type";
      if (jobPreferences.workModes.length === 0)
        errors.workModes = "Pick at least one work mode";
      if (jobPreferences.desiredRoles.length === 0)
        errors.desiredRoles = "Add at least one role you're targeting";
      return errors;
    },
  },
  {
    id: "resume",
    shortLabel: "Resume",
    encouragement: "Almost there",
    title: "Upload your resume",
    description:
      "We read your resume to write the feedback and rewrite suggestions you'll get on every job match.",
    Icon: FileText,
    validate: ({ documents }): FieldErrors =>
      documents.resume ? {} : { resume: "Upload your resume to continue" },
  },
  {
    id: "review",
    shortLabel: "Review",
    encouragement: "Last one",
    title: "You're all set",
    description: "Have a quick look, then save your profile.",
    Icon: CheckCircle2,
  },
];

interface OnboardingWizardProps {
  initialProfile: UserProfile;
}

export default function OnboardingWizard({
  initialProfile,
}: OnboardingWizardProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isPending, startTransition] = useTransition();
  const hydrated = useRef(false);

  // Restore an in-progress draft after mount so the server and client markup match.
  useEffect(() => {
    const draft = getItem(draftKey(initialProfile._id)) as OnboardingDraft | null;
    if (draft?.profile && typeof draft.profile === "object") {
      setProfile(
        withProfileDefaults({ ...draft.profile, _id: initialProfile._id }),
      );
      setStepIndex(
        Math.min(Math.max(draft.step ?? 0, 0), steps.length - 1),
      );
    }
    hydrated.current = true;
  }, [initialProfile._id]);

  useEffect(() => {
    if (!hydrated.current) return;
    setItem(draftKey(initialProfile._id), {
      profile,
      step: stepIndex,
    } satisfies OnboardingDraft);
  }, [profile, stepIndex, initialProfile._id]);

  const step = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;
  const progress = ((stepIndex + 1) / steps.length) * 100;

  const clearErrors = (...fields: string[]) => {
    setErrors((prev) => {
      if (!fields.some((field) => field in prev)) return prev;
      const next = { ...prev };
      fields.forEach((field) => delete next[field]);
      return next;
    });
  };

  const patch = <K extends keyof UserProfile>(
    key: K,
    value: Partial<UserProfile[K]>,
  ) => {
    setProfile((prev) => ({
      ...prev,
      [key]: { ...(prev[key] as object), ...(value as object) },
    }));
    clearErrors(...Object.keys(value as object));
  };

  const toggleInList = <K extends "jobTypes" | "workModes">(
    key: K,
    option: string,
  ) => {
    setProfile((prev) => {
      const current = prev.jobPreferences[key] as string[];
      const next = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
      return {
        ...prev,
        jobPreferences: { ...prev.jobPreferences, [key]: next },
      };
    });
    clearErrors(key);
  };

  const goNext = () => {
    const stepErrors = step.validate?.(profile) ?? {};
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const handleFinish = () => {
    // A draft restored from an earlier session can land on Review with gaps —
    // re-check every step rather than trusting how the user got here.
    const firstIncomplete = steps.findIndex(
      (s) => Object.keys(s.validate?.(profile) ?? {}).length > 0,
    );
    if (firstIncomplete !== -1) {
      setStepIndex(firstIncomplete);
      setErrors(steps[firstIncomplete].validate?.(profile) ?? {});
      return;
    }

    startTransition(async () => {
      const result = await saveProfile(profile);
      if (result.success) {
        removeItem(draftKey(initialProfile._id));
        toast.success("Profile saved — your matches are ready");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{step.shortLabel}</span>
          <span className="text-muted-foreground">{step.encouragement}</span>
        </div>
        <Progress value={progress} />
        <div className="flex flex-wrap items-center gap-1.5">
          {steps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => i < stepIndex && setStepIndex(i)}
              disabled={i > stepIndex}
              aria-label={
                i < stepIndex
                  ? `${s.shortLabel} — done, go back to edit`
                  : i === stepIndex
                    ? `${s.shortLabel} — current`
                    : `${s.shortLabel} — not yet reached`
              }
              aria-current={i === stepIndex ? "step" : undefined}
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full outline-none",
                "focus-visible:ring-[3px] focus-visible:ring-ring/50",
                i < stepIndex ? "cursor-pointer" : "cursor-default",
              )}
            >
              {i < stepIndex ? (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-2.5 w-2.5" />
                </span>
              ) : i === stepIndex ? (
                <span className="h-4 w-4 rounded-full border-2 border-primary bg-primary/25" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-border" />
              )}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <step.Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-xl">{step.title}</CardTitle>
          <CardDescription>{step.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step.id === "basic" && (
            <BasicInfoEditor
              profile={profile}
              isEditing
              errors={errors}
              onUpdate={(field, value) => patch("basicInfo", { [field]: value })}
            />
          )}

          {step.id === "professional" && (
            <ProfessionalInfoEditor
              profile={profile}
              isEditing
              errors={errors}
              onUpdate={(field, value) =>
                patch("professionalInfo", { [field]: value })
              }
            />
          )}

          {step.id === "skills" && (
            <>
              <MultiSelectWithCustom
                id="skills"
                label="Technical skills"
                values={profile.otherInfo.skills}
                options={TECHNICAL_SKILL_OPTIONS}
                exclusiveOption={NOT_APPLICABLE}
                triggerLabel="Add a technical skill"
                error={errors.skills}
                onChange={(skills) => patch("otherInfo", { skills })}
              />
              <MultiSelectWithCustom
                id="softSkills"
                label="Soft skills"
                values={profile.otherInfo.softSkills}
                options={SOFT_SKILL_OPTIONS}
                triggerLabel="Add a soft skill"
                onChange={(softSkills) =>
                  patch("otherInfo", { softSkills })
                }
              />
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Hobbies & interests
                </label>
                <SkillsEditor
                  skills={profile.otherInfo.hobbiesAndInterests}
                  isEditing
                  onAdd={(hobby) =>
                    patch("otherInfo", {
                      hobbiesAndInterests: [
                        ...profile.otherInfo.hobbiesAndInterests,
                        hobby,
                      ],
                    })
                  }
                  onRemove={(hobby) =>
                    patch("otherInfo", {
                      hobbiesAndInterests:
                        profile.otherInfo.hobbiesAndInterests.filter(
                          (h) => h !== hobby,
                        ),
                    })
                  }
                  variant="outline"
                  placeholder="e.g. Chess, Running"
                />
              </div>
            </>
          )}

          {step.id === "education" && (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Degree</label>
                  <Input
                    placeholder="e.g. B.Tech, Computer Science"
                    value={profile.education.degree}
                    aria-invalid={Boolean(errors.degree)}
                    onChange={(e) =>
                      patch("education", { degree: e.target.value })
                    }
                  />
                  <FieldError message={errors.degree} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">University</label>
                  <Input
                    placeholder="Where you studied"
                    value={profile.education.university}
                    aria-invalid={Boolean(errors.university)}
                    onChange={(e) =>
                      patch("education", { university: e.target.value })
                    }
                  />
                  <FieldError message={errors.university} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Graduation year</label>
                  <Select
                    value={profile.education.graduationYear?.toString()}
                    onValueChange={(value) =>
                      patch("education", { graduationYear: parseInt(value) })
                    }
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={Boolean(errors.graduationYear)}
                    >
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
                  <FieldError message={errors.graduationYear} />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium">Certifications</label>
                <SkillsEditor
                  skills={profile.education.certifications}
                  isEditing
                  onAdd={(cert) =>
                    patch("education", {
                      certifications: [
                        ...profile.education.certifications,
                        cert,
                      ],
                    })
                  }
                  onRemove={(cert) =>
                    patch("education", {
                      certifications: profile.education.certifications.filter(
                        (c) => c !== cert,
                      ),
                    })
                  }
                  placeholder="e.g. AWS Solutions Architect"
                />
              </div>
            </>
          )}

          {step.id === "preferences" && (
            <>
              <div className="space-y-3">
                <label className="text-sm font-medium">Job types</label>
                <JobPreferenceSelector
                  options={[
                    "Full Time",
                    "Part Time",
                    "Internship",
                    "Contract",
                  ]}
                  selected={profile.jobPreferences.jobTypes}
                  isEditing
                  onToggle={(option) => toggleInList("jobTypes", option)}
                />
                <FieldError message={errors.jobTypes} />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium">Work modes</label>
                <JobPreferenceSelector
                  options={["Remote", "On-site", "Hybrid"]}
                  selected={profile.jobPreferences.workModes}
                  isEditing
                  onToggle={(option) => toggleInList("workModes", option)}
                />
                <FieldError message={errors.workModes} />
              </div>
              <MultiSelectWithCustom
                id="desiredRoles"
                label="Roles you want"
                values={profile.jobPreferences.desiredRoles}
                options={ROLE_OPTIONS}
                suggestions={getSuggestedRoles(
                  profile.professionalInfo.currentTitle,
                  profile.professionalInfo.experienceYears,
                  profile.professionalInfo.experienceMonths,
                )}
                triggerLabel="Add a role you're targeting"
                error={errors.desiredRoles}
                onChange={(desiredRoles) =>
                  patch("jobPreferences", { desiredRoles })
                }
              />
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Preferred locations
                </label>
                <SkillsEditor
                  skills={profile.jobPreferences.preferredLocations}
                  isEditing
                  onAdd={(location) =>
                    patch("jobPreferences", {
                      preferredLocations: [
                        ...profile.jobPreferences.preferredLocations,
                        location,
                      ],
                    })
                  }
                  onRemove={(location) =>
                    patch("jobPreferences", {
                      preferredLocations:
                        profile.jobPreferences.preferredLocations.filter(
                          (l) => l !== location,
                        ),
                    })
                  }
                  variant="outline"
                  placeholder="e.g. Bengaluru, Remote"
                />
              </div>
            </>
          )}

          {step.id === "resume" && (
            <div className="space-y-2">
              <FileUpload
                onUploadSuccess={(fileData) =>
                  patch("documents", { resume: fileData })
                }
                acceptedFormats={[".pdf", ".docx", ".doc"]}
                maxSizeInMB={10}
                currentFile={profile.documents.resume}
              />
              <FieldError message={errors.resume} />
            </div>
          )}

          {step.id === "review" && <ReviewSummary profile={profile} />}

        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant="ghost"
          onClick={goBack}
          disabled={stepIndex === 0 || isPending}
          className="gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="flex gap-2">
          {isLastStep ? (
            <Button onClick={handleFinish} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Saving…" : "Finish & see my matches"}
            </Button>
          ) : (
            <Button onClick={goNext} className="gap-1.5">
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-3 last:border-0 sm:flex-row sm:gap-4">
      <span className="w-44 shrink-0 text-sm text-muted-foreground">
        {label}
      </span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

function BadgeList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <span className="text-muted-foreground">Not added</span>;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Badge key={item} variant="secondary">
          {item}
        </Badge>
      ))}
    </div>
  );
}

function ReviewSummary({ profile }: { profile: UserProfile }) {
  const { basicInfo, professionalInfo, otherInfo, education, jobPreferences } =
    profile;

  return (
    <div className="divide-y divide-border">
      <ReviewRow label="Name">{basicInfo.username || "—"}</ReviewRow>
      <ReviewRow label="Email">{basicInfo.email || "—"}</ReviewRow>
      <ReviewRow label="Location">{basicInfo.location || "—"}</ReviewRow>
      <ReviewRow label="Current role">
        {professionalInfo.currentTitle || "—"}
        {professionalInfo.currentCompany
          ? ` at ${professionalInfo.currentCompany}`
          : ""}
      </ReviewRow>
      <ReviewRow label="Experience">
        {professionalInfo.experienceYears}y {professionalInfo.experienceMonths}m
      </ReviewRow>
      <ReviewRow label="Skills">
        <BadgeList items={otherInfo.skills} />
      </ReviewRow>
      <ReviewRow label="Education">
        {education.degree
          ? `${education.degree}${
              education.university ? `, ${education.university}` : ""
            }`
          : "—"}
      </ReviewRow>
      <ReviewRow label="Job types">
        <BadgeList items={jobPreferences.jobTypes} />
      </ReviewRow>
      <ReviewRow label="Work modes">
        <BadgeList items={jobPreferences.workModes} />
      </ReviewRow>
      <ReviewRow label="Roles you want">
        <BadgeList items={jobPreferences.desiredRoles} />
      </ReviewRow>
      <ReviewRow label="Resume">
        {profile.documents.resume?.fileName ?? "—"}
      </ReviewRow>
    </div>
  );
}
