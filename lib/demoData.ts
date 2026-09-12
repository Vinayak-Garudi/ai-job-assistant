import type {
  IdealLinkedInProfile,
  IdealResume,
  JobMatch,
  JobMatchStats,
  JobMatchesResult,
  Pagination,
  SalaryEstimate,
} from "@/types";

/**
 * Static sample data shown to guests so they can explore every page before
 * creating an account. Nothing here ever reaches the API.
 */

export const DEMO_USERNAME = "Alex Sharma";

const ANALYZED_AT = "2025-01-18T09:30:00.000Z";
const CREATED_AT = "2025-01-18T09:28:00.000Z";

export const DEMO_JOB_MATCHES: JobMatch[] = [
  {
    id: "demo-1",
    _id: "demo-1",
    userId: "demo-user",
    jobTitle: "Senior Frontend Engineer",
    company: "Nimbus Labs",
    location: "Bengaluru, Karnataka, India",
    jobUrl: "https://example.com/jobs/senior-frontend-engineer",
    shortDescription:
      "Build and scale the customer-facing web platform used by 2M+ users, working closely with design and product.",
    jobDescription:
      "We are looking for a Senior Frontend Engineer with strong React and TypeScript experience to own key surfaces of our web platform. You will lead the migration to the App Router, drive performance work, and mentor mid-level engineers.",
    status: "analyzed",
    createdAt: CREATED_AT,
    updatedAt: ANALYZED_AT,
    analysis: {
      matchingPercentage: 91,
      strengths: [
        "5+ years of React and TypeScript match the core requirement exactly",
        "Hands-on Next.js App Router experience, which the team is migrating to",
        "Demonstrated performance work — a 40% reduction in bundle size maps to their stated goals",
        "Mentoring experience lines up with the leadership expectations in the posting",
      ],
      areasToImprove: [
        "The role mentions GraphQL federation; your profile only lists REST experience",
        "No design-system ownership listed — worth highlighting if you have it",
      ],
      resumeFeedback: [
        "Move the performance optimisation bullet to the top of your most recent role",
        "Quantify the size of the user base you have shipped to",
        "Add a short line on cross-functional collaboration with design and product",
      ],
      detailedAnalysis:
        "This is an excellent match. Your React, TypeScript, and Next.js depth covers the primary requirements, and your performance and mentoring work addresses the two secondary themes in the posting. The only meaningful gap is GraphQL, which the job lists as 'nice to have' rather than required — a short mention of any schema or API design work would close it. Applying with a resume that leads on measurable performance impact should put you in a strong position.",
      analyzedAt: ANALYZED_AT,
      jobSpecificMessage:
        "Hi Priya — I saw Nimbus Labs is hiring a Senior Frontend Engineer to lead the App Router migration. I did exactly that at my current company: moved a 200k-LOC React app to Next.js App Router and cut initial bundle size by 40% along the way. Would love to swap notes on how you are approaching the migration.",
      jobSpecificEmail:
        "Subject: Senior Frontend Engineer — App Router migration experience\n\nHi Priya,\n\nI came across the Senior Frontend Engineer opening at Nimbus Labs and wanted to reach out directly.\n\nOver the last two years I led a React-to-Next.js App Router migration on a platform serving roughly 2M monthly users, reducing initial bundle size by 40% and cutting p75 LCP from 3.1s to 1.6s. I also mentored three mid-level engineers through that transition, which looks close to the leadership component of your role.\n\nI would welcome a short conversation about what the first six months on your team look like.\n\nBest regards,\nAlex Sharma",
      jobSpecificInterviewQuestions: [
        "How would you approach migrating a large React codebase to the Next.js App Router without freezing feature work?",
        "Walk us through a performance regression you diagnosed in production — what tooling did you reach for first?",
        "How do you decide what belongs in a Server Component versus a Client Component?",
        "Tell us about a time you disagreed with a design decision and how you resolved it.",
        "How do you keep a shared component library healthy as the team grows?",
      ],
      jobSpecificTips: [
        "Lead with the App Router migration story — it is the single closest match to their roadmap",
        "Bring concrete before/after performance numbers; this team measures Core Web Vitals",
        "Prepare one example of mentoring that produced a measurable outcome",
        "Read their public engineering blog post on rendering strategy before the call",
      ],
    },
  },
  {
    id: "demo-2",
    _id: "demo-2",
    userId: "demo-user",
    jobTitle: "Full Stack Developer",
    company: "Everline Health",
    location: "Pune, Maharashtra, India",
    jobUrl: "https://example.com/jobs/full-stack-developer",
    shortDescription:
      "Own features end to end across a Node.js and React stack for a clinical scheduling product.",
    jobDescription:
      "Everline Health is hiring a Full Stack Developer to build clinician-facing scheduling tools. Stack is React, Node.js, PostgreSQL, and AWS. Healthcare domain experience is a plus but not required.",
    status: "analyzed",
    createdAt: CREATED_AT,
    updatedAt: ANALYZED_AT,
    analysis: {
      matchingPercentage: 78,
      strengths: [
        "Strong React and Node.js experience covers both halves of the stack",
        "Prior work on scheduling and calendar logic is directly transferable",
        "Comfortable with PostgreSQL and relational data modelling",
      ],
      areasToImprove: [
        "No healthcare or compliance (HIPAA) exposure on your profile",
        "AWS experience is listed as familiarity rather than ownership",
        "No mention of on-call or production support, which this team shares",
      ],
      resumeFeedback: [
        "Add a bullet describing any regulated or audited system you have worked on",
        "Name the specific AWS services you have used in production",
        "Surface your database work — it is currently buried under a generic 'backend' bullet",
      ],
      detailedAnalysis:
        "A solid match with a clear path to a stronger one. The technical stack overlaps almost completely, and your scheduling work is unusually relevant to their core product. The gap is domain rather than skill: healthcare teams weigh compliance awareness heavily, so any exposure to audited systems, access control, or data-retention requirements is worth making explicit. Deepening the AWS detail on your resume would also move this from a good match to a strong one.",
      analyzedAt: ANALYZED_AT,
      jobSpecificMessage:
        "Hi Rahul — the Full Stack Developer role at Everline Health caught my eye. I spent the last 18 months building scheduling and availability logic for a marketplace product, which looks like the hard part of your clinician scheduling tool. Would be glad to hear more about the team.",
      jobSpecificEmail:
        "Subject: Full Stack Developer — scheduling systems experience\n\nHi Rahul,\n\nI am reaching out about the Full Stack Developer role at Everline Health.\n\nMost recently I built the availability and booking engine for a two-sided marketplace — recurring slots, timezone handling, and conflict resolution across thousands of concurrent bookings, on React, Node.js, and PostgreSQL. That is the same shape of problem as clinician scheduling, and it is the work I most enjoy.\n\nI would love to learn more about how your team balances product velocity against the compliance requirements of the healthcare space.\n\nBest regards,\nAlex Sharma",
      jobSpecificInterviewQuestions: [
        "How would you model recurring availability with exceptions in PostgreSQL?",
        "What changes in your engineering process when the product handles patient data?",
        "Describe a production incident you owned end to end.",
        "How do you handle timezone correctness in a scheduling product?",
      ],
      jobSpecificTips: [
        "Frame your marketplace scheduling work as the direct analogue of clinician scheduling",
        "Read up on HIPAA basics so compliance questions do not catch you flat",
        "Be specific about which AWS services you have run in production",
      ],
    },
  },
  {
    id: "demo-3",
    _id: "demo-3",
    userId: "demo-user",
    jobTitle: "React Native Engineer",
    company: "Tandem Mobility",
    location: "Remote, India",
    jobUrl: "https://example.com/jobs/react-native-engineer",
    shortDescription:
      "Build the rider and driver mobile apps for an urban mobility platform operating in 12 cities.",
    jobDescription:
      "Tandem Mobility is looking for a React Native Engineer to own the rider app. You will work on offline-first flows, maps, and real-time location updates.",
    status: "analyzed",
    createdAt: CREATED_AT,
    updatedAt: ANALYZED_AT,
    analysis: {
      matchingPercentage: 64,
      strengths: [
        "Deep React knowledge transfers cleanly to React Native",
        "Experience with real-time data via WebSockets matches their live-tracking work",
        "Comfortable working in a remote-first team",
      ],
      areasToImprove: [
        "No shipped React Native app on your profile — this is their primary requirement",
        "No native module or platform-specific (iOS/Android) experience listed",
        "Offline-first architecture is not something your profile currently evidences",
      ],
      resumeFeedback: [
        "If you have any React Native side project, give it its own line",
        "Highlight the WebSocket/real-time work — it is the strongest bridge to this role",
        "Consider a short 'mobile' section rather than folding it into web experience",
      ],
      detailedAnalysis:
        "A stretch, but not out of reach. Your React fundamentals and real-time experience are genuinely transferable, and teams hiring for React Native often accept strong React engineers who can demonstrate mobile intent. The honest gap is shipped mobile work: without a store-published app or meaningful native experience, you will be compared unfavourably against candidates who have both. Building even one small React Native app with offline support would materially change this score.",
      analyzedAt: ANALYZED_AT,
    },
  },
  {
    id: "demo-4",
    _id: "demo-4",
    userId: "demo-user",
    jobTitle: "Platform Engineer, Developer Experience",
    company: "Orbital Systems",
    location: "Hyderabad, Telangana, India",
    jobUrl: "https://example.com/jobs/platform-engineer-dx",
    shortDescription:
      "Improve build times, CI reliability, and local developer setup for an engineering org of 120.",
    jobDescription:
      "Orbital Systems is hiring a Platform Engineer focused on developer experience. You will own the monorepo tooling, CI pipelines, and internal CLI used by every engineer in the company.",
    status: "analyzed",
    createdAt: CREATED_AT,
    updatedAt: ANALYZED_AT,
    analysis: {
      matchingPercentage: 82,
      strengths: [
        "Monorepo tooling experience is the central requirement and you have it",
        "You have measurably reduced CI times before — the exact outcome they want",
        "Internal tooling work shows you optimise for other engineers, not just yourself",
      ],
      areasToImprove: [
        "Limited Kubernetes exposure; their CI runners are self-hosted",
        "No formal SRE or on-call rotation experience listed",
      ],
      resumeFeedback: [
        "Lead with the CI time reduction — put the percentage in the bullet itself",
        "Name the monorepo tooling explicitly (Turborepo, Nx, Bazel) rather than 'build tools'",
        "Add any internal documentation or adoption metrics for tools you built",
      ],
      detailedAnalysis:
        "A strong match for a role that is harder to hire for than it looks. Developer-experience teams want evidence that you can improve other engineers' daily lives and measure the result, and your CI and monorepo work does exactly that. Kubernetes is the one real gap; because their runners are self-hosted, some comfort with cluster-level debugging will come up. Everything else about this posting maps to work you have already done.",
      analyzedAt: ANALYZED_AT,
      jobSpecificMessage:
        "Hi Meera — I noticed Orbital Systems is hiring a Platform Engineer for developer experience. I cut CI times from 22 to 7 minutes across a 40-engineer monorepo last year and would love to hear how you are approaching the same problem at 120 engineers.",
      jobSpecificEmail:
        "Subject: Platform Engineer (DX) — monorepo and CI experience\n\nHi Meera,\n\nI am writing about the Platform Engineer, Developer Experience role at Orbital Systems.\n\nFor the past two years I have owned the build and CI tooling for a Turborepo monorepo used by roughly 40 engineers: I brought median CI time from 22 minutes to 7, replaced a fragile setup script with an internal CLI that new hires now run on day one, and drove adoption to 100% within a quarter.\n\nScaling that work to 120 engineers is the problem I would most like to be working on next. I would be glad to talk through what is currently slowest for your team.\n\nBest regards,\nAlex Sharma",
      jobSpecificInterviewQuestions: [
        "How do you decide what to fix first when every team complains about a different part of the toolchain?",
        "Walk us through how you would cut CI time on a monorepo you have never seen before.",
        "How do you measure whether a developer-experience investment actually worked?",
        "What is your approach to rolling out a breaking change to internal tooling?",
      ],
      jobSpecificTips: [
        "Bring the CI numbers — this team will ask for specifics",
        "Have an opinion on remote caching and why you would or would not use it",
        "Brush up on Kubernetes basics before the systems round",
      ],
    },
  },
];

export const DEMO_STATS: JobMatchStats = {
  totalJobs: DEMO_JOB_MATCHES.length,
  avgMatch:
    DEMO_JOB_MATCHES.reduce(
      (sum, job) => sum + job.analysis.matchingPercentage,
      0,
    ) / DEMO_JOB_MATCHES.length,
  highMatches: DEMO_JOB_MATCHES.filter(
    (job) => job.analysis.matchingPercentage >= 80,
  ).length,
  totalAnalyzed: DEMO_JOB_MATCHES.length,
};

export const DEMO_PAGINATION: Pagination = {
  page: 1,
  limit: 10,
  total: DEMO_JOB_MATCHES.length,
  pages: 1,
};

export const DEMO_JOB_MATCHES_RESULT: JobMatchesResult = {
  jobs: DEMO_JOB_MATCHES,
  stats: DEMO_STATS,
  pagination: DEMO_PAGINATION,
};

export function getDemoJobMatch(id: string): JobMatch | null {
  return DEMO_JOB_MATCHES.find((job) => (job._id ?? job.id) === id) ?? null;
}

export function getDemoJobsWithDetails(): JobMatch[] {
  return DEMO_JOB_MATCHES.filter(({ analysis }) =>
    Boolean(
      analysis.jobSpecificMessage ||
        analysis.jobSpecificEmail ||
        analysis.jobSpecificInterviewQuestions?.length ||
        analysis.jobSpecificTips?.length,
    ),
  );
}

export const DEMO_LINKEDIN_PROFILE: IdealLinkedInProfile = {
  intro:
    "Senior Frontend Engineer · React, TypeScript & Next.js · I make web apps measurably faster",
  about:
    "I build web products that stay fast as they grow.\n\nOver the last six years I have worked on customer-facing platforms at consumer scale, most recently leading a React-to-Next.js App Router migration that cut initial bundle size by 40% and brought p75 LCP under 1.6 seconds.\n\nWhat I care about: rendering strategy that matches the product rather than the trend, design systems that engineers actually want to use, and mentoring that leaves the team stronger than the codebase.\n\nCurrently open to senior frontend and full-stack roles in Bengaluru or remote.",
  experience: [
    {
      title: "Senior Frontend Engineer",
      companyOrOrganization: "Arclight Technologies",
      description:
        "Led the migration of a 200k-LOC React application to the Next.js App Router without pausing feature delivery. Reduced initial bundle size by 40% and p75 LCP from 3.1s to 1.6s. Mentored three mid-level engineers through the transition and established the team's rendering-strategy guidelines.",
    },
    {
      title: "Frontend Engineer",
      companyOrOrganization: "Meridian Commerce",
      description:
        "Built and owned the checkout experience for a marketplace serving 400k monthly buyers. Introduced the shared component library still used across four product teams, and cut checkout abandonment by 12% through incremental performance and accessibility work.",
    },
  ],
  projects: [
    {
      title: "Lighthouse Budget Bot",
      description:
        "An open-source GitHub Action that fails a pull request when a Core Web Vitals budget regresses. Used by 900+ repositories.",
    },
    {
      title: "Component Library Starter",
      description:
        "A opinionated design-system template built on Radix and Tailwind, with token generation and automated visual regression testing wired in.",
    },
  ],
  additionalSections: [
    "Speaker — React India 2024, 'Rendering Strategy as a Product Decision'",
    "Mentor — ADPList, 40+ sessions with early-career frontend engineers",
  ],
};

export const DEMO_RESUME: IdealResume = {
  professionalSummary:
    "Senior Frontend Engineer with six years building consumer-scale React applications. Specialises in rendering architecture and web performance — most recently led a Next.js App Router migration that reduced initial bundle size by 40%. Mentors mid-level engineers and sets front-end technical direction for a team of eight.",
  skills: {
    technical: [
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "GraphQL",
      "PostgreSQL",
      "Testing Library",
      "Web Performance",
    ],
    soft: [
      "Mentoring",
      "Technical writing",
      "Cross-functional collaboration",
      "Incident communication",
    ],
    tools: ["Git", "Turborepo", "Playwright", "Figma", "Vercel", "Datadog"],
  },
  experience: [
    {
      title: "Senior Frontend Engineer",
      company: "Arclight Technologies",
      location: "Bengaluru, India",
      startDate: "Mar 2022",
      endDate: "Present",
      bullets: [
        "Led migration of a 200k-LOC React app to the Next.js App Router with zero feature freeze",
        "Cut initial JavaScript bundle by 40% and p75 LCP from 3.1s to 1.6s",
        "Mentored three mid-level engineers, two of whom were promoted within the year",
        "Authored the team's rendering-strategy guidelines, now used across four squads",
      ],
    },
    {
      title: "Frontend Engineer",
      company: "Meridian Commerce",
      location: "Pune, India",
      startDate: "Jul 2019",
      endDate: "Feb 2022",
      bullets: [
        "Owned the checkout experience for a marketplace with 400k monthly buyers",
        "Built the shared component library adopted by four product teams",
        "Reduced checkout abandonment by 12% through performance and accessibility work",
      ],
    },
  ],
  education: [
    {
      degree: "B.Tech, Computer Science",
      institution: "Pune Institute of Technology",
      location: "Pune, India",
      graduationYear: "2019",
      details:
        "Graduated with distinction. Final-year project on incremental static rendering for content-heavy sites.",
    },
  ],
  projects: [
    {
      title: "Lighthouse Budget Bot",
      technologies: ["TypeScript", "GitHub Actions", "Lighthouse CI"],
      description:
        "Open-source GitHub Action that blocks pull requests which regress a Core Web Vitals budget.",
      bullets: [
        "Adopted by 900+ public repositories",
        "Reduced median performance regressions on the author's own team to near zero",
      ],
    },
  ],
  freelanceProjects: [],
  certifications: [
    "Meta Front-End Developer Professional Certificate",
    "AWS Certified Cloud Practitioner",
  ],
  generatedAt: "2025-01-18T09:30:00.000Z",
};

export const DEMO_SALARY_ESTIMATE: SalaryEstimate = {
  minSalary: 2800000,
  maxSalary: 4200000,
  currency: "INR",
  rationale:
    "This range reflects six years of frontend experience with demonstrated ownership of a large-scale migration and measurable performance outcomes. Senior Frontend Engineers in Bengaluru with React and Next.js depth typically land between ₹28 and ₹42 LPA; the upper half of that band is reachable given the mentoring and architecture responsibilities already held, particularly at product companies rather than services firms.",
  marketInsights:
    "Demand for senior React engineers in Bengaluru remained strong through 2024, with Next.js and App Router experience commanding a visible premium as teams migrate off client-only architectures. Product companies continue to pay 20–30% above services firms for the same title. Candidates who can evidence performance work with concrete metrics consistently negotiate at the top of the band, while fully remote roles at India-based startups tend to sit 10% lower than equivalent on-site Bengaluru offers.",
  generatedAt: "2025-01-18T09:30:00.000Z",
};
