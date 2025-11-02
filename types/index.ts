// Job Types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: "Full Time" | "Part Time" | "Internship" | "Contract";
  workMode: "Remote" | "On-site" | "Hybrid";
  description: string;
  requirements: string[];
  url?: string;
  postedDate: Date;
  applicationStatus: ApplicationStatus;
  aiAnalysis?: JobAnalysis;
  notes?: string;
  appliedDate?: Date;
}

export type ApplicationStatus =
  | "Saved"
  | "Applied"
  | "Interview Scheduled"
  | "Rejected"
  | "Offer Received";

export interface JobAnalysis {
  skillMatchPercentage: number;
  strengths: string[];
  weaknesses: string[];
  coverLetter?: string;
  emailDraft?: string;
  analyzedAt: Date;
}

// User Profile Types
export interface UserProfile {
  id: string;
  basicInfo: BasicInfo;
  professionalInfo: ProfessionalInfo;
  otherInfo: OtherInfo;
  education: Education;
  documents: Documents;
  jobPreferences: JobPreferences;
}

export interface BasicInfo {
  username: string;
  age: number;
  location: string;
  email: string;
  profilePic?: string;
}

export interface ProfessionalInfo {
  currentTitle: string;
  currentCompany: string;
  experienceYears: number;
  industry: string;
}

export interface OtherInfo {
  skills: string[];
  hobbiesAndInterests: string[];
  softSkills: string[];
}

export interface Education {
  degree: string;
  graduationYear: number;
  certifications: string[];
  university: string;
}

export interface Documents {
  resume?: {
    url: string;
    fileName: string;
    uploadedAt: Date;
  };
}

export interface JobPreferences {
  jobTypes: Array<"Full Time" | "Part Time" | "Internship" | "Contract">;
  workModes: Array<"Remote" | "On-site" | "Hybrid">;
  preferredLocations: string[];
  desiredRoles: string[];
}

// Form Types
export interface JobFormData {
  url?: string;
  description?: string;
  title?: string;
  company?: string;
  location?: string;
  jobType?: string;
  workMode?: string;
}

export interface SearchFilters {
  query: string;
  jobType?: string;
  workMode?: string;
  status?: ApplicationStatus;
  location?: string;
}
