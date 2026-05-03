import { Suspense } from "react";
import { getResumeRecommendation } from "./actions";
import ResumeRecommendationLoading from "./loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  FolderOpen,
  GraduationCap,
  Wrench,
  FileText,
  AlertCircle,
} from "lucide-react";

async function ResumeData() {
  const { resume, username } = await getResumeRecommendation();

  if (!resume) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <AlertCircle className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">
            No Resume Recommendation Yet
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your ideal resume hasn&apos;t been generated yet. Please re-update
            your profile to generate a personalized resume recommendation.
          </p>
        </CardContent>
      </Card>
    );
  }

  const hasSummary = resume.professionalSummary?.trim();
  const hasSkills =
    resume.skills &&
    (resume.skills.technical?.length > 0 ||
      resume.skills.soft?.length > 0 ||
      resume.skills.tools?.length > 0);
  const hasExperience = resume.experience?.length > 0;
  const hasEducation = resume.education?.length > 0;
  const hasProjects = resume.projects?.length > 0;
  const hasCertifications =
    resume.certifications && resume.certifications.length > 0;

  return (
    <div className="space-y-6">
      {/* Professional Summary */}
      {hasSummary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5" />
              Professional Summary
            </CardTitle>
            {username && (
              <CardDescription>
                Recommended summary for {username}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">
              {resume.professionalSummary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      {hasSkills && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wrench className="h-5 w-5" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resume.skills.technical?.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Technical
                </p>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.technical.map((skill, i) => (
                    <Badge key={i} variant="default">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {resume.skills.tools?.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Tools & Platforms
                </p>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.tools.map((tool, i) => (
                    <Badge key={i} variant="secondary">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {resume.skills.soft?.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Soft Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.soft.map((skill, i) => (
                    <Badge key={i} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Experience */}
      {hasExperience && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="h-5 w-5" />
              Experience
            </CardTitle>
            <CardDescription>
              {resume.experience.length} recommended{" "}
              {resume.experience.length === 1 ? "entry" : "entries"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {resume.experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-2 border-border"
                >
                  <h4 className="font-semibold text-foreground">{exp.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {exp.company}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    {exp.startDate} – {exp.endDate}
                  </p>
                  {exp.bullets?.length > 0 && (
                    <ul className="space-y-1 list-disc list-inside">
                      {exp.bullets.map((bullet, bi) => (
                        <li
                          key={bi}
                          className="text-sm text-foreground/80 leading-relaxed"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {hasEducation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <GraduationCap className="h-5 w-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resume.education.map((edu, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-2 border-border"
                >
                  <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                  <p className="text-sm text-muted-foreground">
                    {edu.institution}
                    {edu.location ? ` · ${edu.location}` : ""}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Graduated {edu.graduationYear}
                  </p>
                  {edu.details && (
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects */}
      {hasProjects && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FolderOpen className="h-5 w-5" />
              Projects
            </CardTitle>
            <CardDescription>
              {resume.projects.length} recommended{" "}
              {resume.projects.length === 1 ? "project" : "projects"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {resume.projects.map((project, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    {project.title}
                  </h4>
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, ti) => (
                        <Badge key={ti} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {project.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  )}
                  {project.bullets?.length > 0 && (
                    <ul className="space-y-1 list-disc list-inside">
                      {project.bullets.map((bullet, bi) => (
                        <li
                          key={bi}
                          className="text-sm text-foreground/80 leading-relaxed"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certifications */}
      {hasCertifications && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {resume.certifications.map((cert, index) => (
                <Badge key={index} variant="secondary">
                  {typeof cert === "string" ? cert : JSON.stringify(cert)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function ResumeRecommendationPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ideal Resume</h1>
        <p className="text-muted-foreground">
          Your personalized resume recommendations based on your experience and
          skills
        </p>
      </div>

      <Suspense fallback={<ResumeRecommendationLoading />}>
        <ResumeData />
      </Suspense>
    </div>
  );
}
