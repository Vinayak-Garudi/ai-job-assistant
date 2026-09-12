/**
 * Pickable values for the profile's free-text-prone fields. "Other" is appended
 * by SelectWithOther, so it must not appear in these lists.
 */

export const JOB_TITLE_OPTIONS = [
  "Software Engineer",
  "Senior Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "DevOps / Platform Engineer",
  "QA / Test Engineer",
  "Data Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "UI/UX Designer",
  "Product Manager",
  "Project Manager",
  "Business Analyst",
  "Engineering Manager",
  "Technical Writer",
  "Sales / Business Development",
  "Marketing Specialist",
  "Student / Fresher",
] as const;

export const INDUSTRY_OPTIONS = [
  "Information Technology & Services",
  "Software Products (SaaS)",
  "Banking & Financial Services",
  "Insurance",
  "Healthcare & Life Sciences",
  "E-commerce & Retail",
  "Education & EdTech",
  "Manufacturing",
  "Automotive",
  "Consulting & Professional Services",
  "Telecommunications",
  "Media & Entertainment",
  "Travel & Hospitality",
  "Logistics & Supply Chain",
  "Real Estate & Construction",
  "Energy & Utilities",
  "Government & Public Sector",
  "Non-profit",
] as const;

/**
 * Industries worth surfacing first for a given job title. Keys must match
 * JOB_TITLE_OPTIONS and values must match INDUSTRY_OPTIONS exactly — a custom
 * ("Other") title simply gets no suggestions.
 */
const IT = "Information Technology & Services";
const SAAS = "Software Products (SaaS)";
const BFS = "Banking & Financial Services";
const ECOM = "E-commerce & Retail";
const HEALTH = "Healthcare & Life Sciences";
const EDU = "Education & EdTech";
const CONSULT = "Consulting & Professional Services";
const MEDIA = "Media & Entertainment";
const MFG = "Manufacturing";
const REALESTATE = "Real Estate & Construction";
const INSURANCE = "Insurance";
const TELECOM = "Telecommunications";

const ENGINEERING_INDUSTRIES = [SAAS, IT, ECOM, BFS, TELECOM] as const;
const DATA_INDUSTRIES = [SAAS, IT, BFS, HEALTH, ECOM] as const;

export const TITLE_INDUSTRY_SUGGESTIONS: Record<string, readonly string[]> = {
  "Software Engineer": ENGINEERING_INDUSTRIES,
  "Senior Software Engineer": ENGINEERING_INDUSTRIES,
  "Frontend Developer": ENGINEERING_INDUSTRIES,
  "Backend Developer": ENGINEERING_INDUSTRIES,
  "Full Stack Developer": ENGINEERING_INDUSTRIES,
  "Mobile Developer": [SAAS, IT, ECOM, MEDIA],
  "DevOps / Platform Engineer": ENGINEERING_INDUSTRIES,
  "QA / Test Engineer": [SAAS, IT, BFS, ECOM],
  "Data Analyst": DATA_INDUSTRIES,
  "Data Scientist": DATA_INDUSTRIES,
  "Machine Learning Engineer": DATA_INDUSTRIES,
  "UI/UX Designer": [SAAS, IT, MEDIA, ECOM],
  "Product Manager": [SAAS, IT, ECOM, BFS],
  "Project Manager": [IT, CONSULT, MFG, REALESTATE],
  "Business Analyst": [CONSULT, BFS, IT, INSURANCE],
  "Engineering Manager": [SAAS, IT, ECOM, BFS],
  "Technical Writer": [SAAS, IT, EDU],
  "Sales / Business Development": [SAAS, IT, ECOM, INSURANCE, REALESTATE],
  "Marketing Specialist": [MEDIA, ECOM, SAAS, EDU],
  "Student / Fresher": [EDU, IT, SAAS],
};

/** Suggested industries for a title, or none for a custom/unknown title. */
export function getSuggestedIndustries(title: string): readonly string[] {
  return TITLE_INDUSTRY_SUGGESTIONS[title] ?? [];
}

/** Selecting this clears every other technical skill, and vice versa. */
export const NOT_APPLICABLE = "Not Applicable";

export const TECHNICAL_SKILL_OPTIONS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Angular",
  "Vue.js",
  "HTML & CSS",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "Python",
  "Django",
  "Java",
  "Spring Boot",
  "C#",
  ".NET",
  "C++",
  "Go",
  "Rust",
  "PHP",
  "Ruby on Rails",
  "Swift",
  "Kotlin",
  "React Native",
  "Flutter",
  "REST APIs",
  "GraphQL",
  "SQL",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud",
  "Git",
  "CI/CD",
  "Linux",
  "Automated Testing",
  "Data Analysis",
  "Machine Learning",
  "Excel",
  "Power BI",
  "Tableau",
  "Figma",
] as const;

export const SOFT_SKILL_OPTIONS = [
  "Communication",
  "Teamwork",
  "Problem Solving",
  "Critical Thinking",
  "Leadership",
  "Mentoring",
  "Time Management",
  "Adaptability",
  "Collaboration",
  "Attention to Detail",
  "Creativity",
  "Ownership",
  "Conflict Resolution",
  "Stakeholder Management",
  "Presentation Skills",
  "Active Listening",
  "Decision Making",
  "Negotiation",
  "Empathy",
  "Work Ethic",
] as const;

/**
 * Role ladders ordered junior → senior. Suggestions pick a window based on how
 * much experience the user entered, so a fresher and a lead see different
 * targets for the same current title.
 */
const ENGINEERING_LADDER = [
  "Junior Software Engineer",
  "Software Engineer",
  "Senior Software Engineer",
  "Staff Software Engineer",
  "Principal Engineer",
  "Engineering Manager",
] as const;

const FRONTEND_LADDER = [
  "Junior Frontend Developer",
  "Frontend Developer",
  "Senior Frontend Developer",
  "Lead Frontend Engineer",
  "Frontend Architect",
] as const;

const BACKEND_LADDER = [
  "Junior Backend Developer",
  "Backend Developer",
  "Senior Backend Developer",
  "Lead Backend Engineer",
  "Backend Architect",
] as const;

const FULLSTACK_LADDER = [
  "Junior Full Stack Developer",
  "Full Stack Developer",
  "Senior Full Stack Developer",
  "Lead Full Stack Engineer",
  "Software Architect",
] as const;

const MOBILE_LADDER = [
  "Junior Mobile Developer",
  "Mobile Developer",
  "Senior Mobile Developer",
  "Lead Mobile Engineer",
  "Mobile Architect",
] as const;

const DEVOPS_LADDER = [
  "Junior DevOps Engineer",
  "DevOps Engineer",
  "Senior DevOps Engineer",
  "Site Reliability Engineer",
  "Platform Engineering Lead",
] as const;

const QA_LADDER = [
  "Junior QA Engineer",
  "QA Engineer",
  "Senior QA Engineer",
  "QA Automation Lead",
  "QA Manager",
] as const;

const DATA_ANALYST_LADDER = [
  "Junior Data Analyst",
  "Data Analyst",
  "Senior Data Analyst",
  "Analytics Lead",
  "Head of Analytics",
] as const;

const DATA_SCIENTIST_LADDER = [
  "Junior Data Scientist",
  "Data Scientist",
  "Senior Data Scientist",
  "Lead Data Scientist",
  "Head of Data Science",
] as const;

const ML_LADDER = [
  "Junior Machine Learning Engineer",
  "Machine Learning Engineer",
  "Senior Machine Learning Engineer",
  "Lead Machine Learning Engineer",
  "AI Architect",
] as const;

const DESIGN_LADDER = [
  "Junior UI/UX Designer",
  "UI/UX Designer",
  "Senior UI/UX Designer",
  "Lead Product Designer",
  "Design Manager",
] as const;

const PRODUCT_LADDER = [
  "Associate Product Manager",
  "Product Manager",
  "Senior Product Manager",
  "Group Product Manager",
  "Director of Product",
] as const;

const PROJECT_LADDER = [
  "Project Coordinator",
  "Project Manager",
  "Senior Project Manager",
  "Program Manager",
  "Delivery Head",
] as const;

const BA_LADDER = [
  "Junior Business Analyst",
  "Business Analyst",
  "Senior Business Analyst",
  "Lead Business Analyst",
  "Product Owner",
] as const;

const EM_LADDER = [
  "Team Lead",
  "Engineering Manager",
  "Senior Engineering Manager",
  "Director of Engineering",
  "VP of Engineering",
] as const;

const WRITER_LADDER = [
  "Junior Technical Writer",
  "Technical Writer",
  "Senior Technical Writer",
  "Lead Technical Writer",
  "Documentation Manager",
] as const;

const SALES_LADDER = [
  "Sales Development Representative",
  "Account Executive",
  "Senior Account Executive",
  "Sales Manager",
  "Head of Sales",
] as const;

const MARKETING_LADDER = [
  "Marketing Associate",
  "Marketing Specialist",
  "Senior Marketing Specialist",
  "Marketing Manager",
  "Head of Marketing",
] as const;

const ROLE_LADDERS: Record<string, readonly string[]> = {
  "Software Engineer": ENGINEERING_LADDER,
  "Senior Software Engineer": ENGINEERING_LADDER,
  "Frontend Developer": FRONTEND_LADDER,
  "Backend Developer": BACKEND_LADDER,
  "Full Stack Developer": FULLSTACK_LADDER,
  "Mobile Developer": MOBILE_LADDER,
  "DevOps / Platform Engineer": DEVOPS_LADDER,
  "QA / Test Engineer": QA_LADDER,
  "Data Analyst": DATA_ANALYST_LADDER,
  "Data Scientist": DATA_SCIENTIST_LADDER,
  "Machine Learning Engineer": ML_LADDER,
  "UI/UX Designer": DESIGN_LADDER,
  "Product Manager": PRODUCT_LADDER,
  "Project Manager": PROJECT_LADDER,
  "Business Analyst": BA_LADDER,
  "Engineering Manager": EM_LADDER,
  "Technical Writer": WRITER_LADDER,
  "Sales / Business Development": SALES_LADDER,
  "Marketing Specialist": MARKETING_LADDER,
  "Student / Fresher": ENGINEERING_LADDER,
};

/** Every role across all ladders, de-duplicated and alphabetical. */
export const ROLE_OPTIONS: readonly string[] = Array.from(
  new Set(Object.values(ROLE_LADDERS).flat()),
).sort((a, b) => a.localeCompare(b));

/**
 * Roles to surface first, from the user's current title plus how senior their
 * experience makes them. An unrecognised (custom) title gets no suggestions.
 */
export function getSuggestedRoles(
  currentTitle: string,
  experienceYears: number,
  experienceMonths: number,
): readonly string[] {
  const ladder = ROLE_LADDERS[currentTitle];
  if (!ladder) return [];

  const totalYears = experienceYears + (experienceMonths || 0) / 12;
  const level =
    totalYears < 1.5 ? 0 : totalYears < 3 ? 1 : totalYears < 6 ? 2 : totalYears < 9 ? 3 : 4;

  const start = Math.min(level, ladder.length - 1);
  return ladder.slice(start, start + 3);
}
