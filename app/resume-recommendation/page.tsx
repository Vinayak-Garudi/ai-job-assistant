import { Suspense } from "react";
import { getResumeRecommendation } from "./actions";
import ResumeRecommendationLoading from "./loading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card className="border-dashed">
        <CardContent className="py-14 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto">
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold">No resume yet</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Update your profile to generate a personalised resume recommendation.
          </p>
        </CardContent>
      </Card>
    );
  }

  const hasSummary = resume.professionalSummary?.trim();
  const hasSkills = resume.skills && (
    resume.skills.technical?.length > 0 ||
    resume.skills.soft?.length > 0 ||
    resume.skills.tools?.length > 0
  );
  const hasExperience = resume.experience?.length > 0;
  const hasEducation = resume.education?.length > 0;
  const hasProjects = resume.projects?.length > 0;
  const hasCertifications = resume.certifications && resume.certifications.length > 0;

  return (
    <div className="space-y-5">
      {hasSummary && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-primary" />
              Professional Summary
            </CardTitle>
            {username && (
              <CardDescription>Recommended summary for {username}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{resume.professionalSummary}</p>
          </CardContent>
        </Card>
      )}

      {hasSkills && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Wrench className="h-4 w-4 text-primary" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resume.skills.technical?.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Technical</p>
                <div className="flex flex-wrap gap-1.5">
                  {resume.skills.technical.map((skill, i) => (
                    <Badge key={i} variant="default" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
            {resume.skills.tools?.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Tools & Platforms</p>
                <div className="flex flex-wrap gap-1.5">
                  {resume.skills.tools.map((tool, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{tool}</Badge>
                  ))}
                </div>
              </div>
            )}
            {resume.skills.soft?.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Soft Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {resume.skills.soft.map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {hasExperience && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Briefcase className="h-4 w-4 text-primary" />
              Experience
            </CardTitle>
            <CardDescription>
              {resume.experience.length} recommended {resume.experience.length === 1 ? "entry" : "entries"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {resume.experience.map((exp, index) => (
                <div key={index} className="relative pl-5 border-l-2 border-primary/30">
                  <h4 className="font-semibold text-sm">{exp.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {exp.company}{exp.location ? ` · ${exp.location}` : ""}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {exp.startDate} – {exp.endDate}
                  </p>
                  {exp.bullets?.length > 0 && (
                    <ul className="space-y-1">
                      {exp.bullets.map((bullet, bi) => (
                        <li key={bi} className="text-sm flex gap-2">
                          <span className="text-primary/60 shrink-0 mt-0.5">•</span>
                          <span className="text-foreground/80 leading-relaxed">{bullet}</span>
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

      {hasEducation && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="h-4 w-4 text-primary" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resume.education.map((edu, index) => (
                <div key={index} className="relative pl-5 border-l-2 border-primary/30">
                  <h4 className="font-semibold text-sm">{edu.degree}</h4>
                  <p className="text-xs text-muted-foreground">
                    {edu.institution}{edu.location ? ` · ${edu.location}` : ""}
                  </p>
                  <p className="text-xs text-muted-foreground mb-1">Graduated {edu.graduationYear}</p>
                  {edu.details && (
                    <p className="text-sm text-foreground/80 leading-relaxed">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {hasProjects && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <FolderOpen className="h-4 w-4 text-primary" />
              Projects
            </CardTitle>
            <CardDescription>
              {resume.projects.length} recommended {resume.projects.length === 1 ? "project" : "projects"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {resume.projects.map((project, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-semibold text-sm">{project.title}</h4>
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, ti) => (
                        <Badge key={ti} variant="secondary" className="text-xs">{tech}</Badge>
                      ))}
                    </div>
                  )}
                  {project.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  )}
                  {project.bullets?.length > 0 && (
                    <ul className="space-y-1">
                      {project.bullets.map((bullet, bi) => (
                        <li key={bi} className="text-sm flex gap-2">
                          <span className="text-primary/60 shrink-0 mt-0.5">•</span>
                          <span className="text-foreground/80 leading-relaxed">{bullet}</span>
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

      {hasCertifications && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Certifications</CardTitle>
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
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
          <FileText className="h-3.5 w-3.5" />
          Resume
        </div>
        <h1 className="text-2xl font-bold mb-1.5">Ideal Resume</h1>
        <p className="text-sm text-muted-foreground">
          Your personalised resume recommendations based on your experience and skills.
        </p>
      </div>

      <Suspense fallback={<ResumeRecommendationLoading />}>
        <ResumeData />
      </Suspense>
    </div>
  );
}
