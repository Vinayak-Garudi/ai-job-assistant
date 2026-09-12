import type { UserProfile } from "@/types";

/** A fully-populated, empty UserProfile — the starting point for onboarding. */
export function createEmptyProfile(): UserProfile {
  return {
    _id: "",
    basicInfo: { username: "", age: 0, location: "", email: "" },
    professionalInfo: {
      currentTitle: "",
      currentCompany: "",
      experienceYears: 0,
      experienceMonths: 0,
      industry: "",
      currentCTCPerAnum: null,
      salaryCurrency: "INR",
    },
    otherInfo: { skills: [], hobbiesAndInterests: [], softSkills: [] },
    education: {
      degree: "",
      // 0 matches no <SelectItem>, so the year picker shows its placeholder
      // instead of silently pre-answering a required field.
      graduationYear: 0,
      certifications: [],
      university: "",
    },
    documents: {},
    jobPreferences: {
      jobTypes: [],
      workModes: [],
      preferredLocations: [],
      desiredRoles: [],
    },
  };
}

/** Fills any gaps in a profile fetched from the API with empty defaults. */
export function withProfileDefaults(
  profile: Partial<UserProfile> | null,
): UserProfile {
  const empty = createEmptyProfile();
  if (!profile) return empty;

  return {
    ...empty,
    ...profile,
    basicInfo: { ...empty.basicInfo, ...profile.basicInfo },
    professionalInfo: {
      ...empty.professionalInfo,
      ...profile.professionalInfo,
    },
    otherInfo: { ...empty.otherInfo, ...profile.otherInfo },
    education: { ...empty.education, ...profile.education },
    documents: { ...empty.documents, ...profile.documents },
    jobPreferences: { ...empty.jobPreferences, ...profile.jobPreferences },
  };
}
