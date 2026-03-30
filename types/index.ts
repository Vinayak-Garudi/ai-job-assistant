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
  _id: string;
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
}

export interface ProfessionalInfo {
  currentTitle: string;
  currentCompany: string;
  experienceYears: number;
  experienceMonths: number;
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

// Job Match Types (from API)
export interface JobMatchAnalysis {
  matchingPercentage: number;
  strengths: string[];
  areasToImprove: string[];
  resumeFeedback: string[];
  detailedAnalysis: string;
  analyzedAt: string;
}

export interface JobMatch {
  id: string;
  _id?: string;
  userId: string;
  jobTitle: string;
  company: string;
  location: string;
  jobDescription: string;
  jobUrl: string;
  shortDescription: string;
  status: "analyzed" | "pending" | "failed";
  analysis: JobMatchAnalysis;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Stats Types
export interface JobMatchStats {
  totalJobs: number;
  avgMatch: number;
  highMatches: number;
  totalAnalyzed: number;
}

export interface JobMatchesResult {
  jobs: JobMatch[];
  stats: JobMatchStats;
}
