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
  idealLinkedInProfile?: IdealLinkedInProfile;
  idealResume?: IdealResume;
  salaryEstimate?: SalaryEstimate;
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
  currentCTCPerAnum?: number | null;
  salaryCurrency: "INR" | "USD";
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

export interface LinkedInExperience {
  title: string;
  companyOrOrganization: string;
  description: string;
}

export interface LinkedInProject {
  title: string;
  description: string;
}

export interface IdealLinkedInProfile {
  intro: string;
  about: string;
  experience: LinkedInExperience[];
  projects: LinkedInProject[];
  additionalSections: unknown[];
}

export interface ResumeExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  details: string;
}

export interface ResumeProject {
  title: string;
  technologies: string[];
  description: string;
  bullets: string[];
}

export interface ResumeSkills {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface IdealResume {
  professionalSummary: string;
  skills: ResumeSkills;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  projects: ResumeProject[];
  freelanceProjects: unknown[];
  certifications: unknown[];
  generatedAt: string | Date;
}

export interface SalaryEstimate {
  minSalary: number;
  maxSalary: number;
  currency: string;
  rationale: string;
  marketInsights: string;
  generatedAt: string | Date;
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

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface JobMatchesResult {
  jobs: JobMatch[];
  stats: JobMatchStats;
  pagination: Pagination;
}
