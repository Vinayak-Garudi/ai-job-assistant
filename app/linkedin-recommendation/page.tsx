import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getLinkedInProfile } from "./actions";
import LinkedInRecommendationLoading from "./loading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, FolderOpen, User, FileText, Link2 } from "lucide-react";

async function LinkedInProfileData() {
  const { profile, username } = await getLinkedInProfile();

  if (!profile) redirect("/profile");

  const hasIntro = profile.intro?.trim();
  const hasAbout = profile.about?.trim();
  const hasExperience = profile.experience?.length > 0;
  const hasProjects = profile.projects?.length > 0;
  const isEmpty = !hasIntro && !hasAbout && !hasExperience && !hasProjects;

  if (isEmpty) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-14 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto">
            <Link2 className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold">No recommendations yet</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Complete your profile and add job analyses to get personalised LinkedIn profile recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      {hasIntro && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-primary" />
              Headline / Intro
            </CardTitle>
            {username && (
              <CardDescription>Recommended intro for {username}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{profile.intro}</p>
          </CardContent>
        </Card>
      )}

      {hasAbout && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-primary" />
              About
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed whitespace-pre-line">{profile.about}</p>
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
              {profile.experience.length} recommended {profile.experience.length === 1 ? "entry" : "entries"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {profile.experience.map((exp, index) => (
                <div key={index} className="relative pl-5 border-l-2 border-primary/30">
                  <h4 className="font-semibold text-sm">{exp.title}</h4>
                  {exp.companyOrOrganization && (
                    <p className="text-xs text-muted-foreground mb-2">{exp.companyOrOrganization}</p>
                  )}
                  {exp.description && (
                    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{exp.description}</p>
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
              {profile.projects.length} recommended {profile.projects.length === 1 ? "project" : "projects"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {profile.projects.map((project, index) => (
                <div key={index} className="rounded-xl bg-muted/50 p-4 border border-border">
                  <h4 className="font-semibold text-sm mb-2">{project.title}</h4>
                  {project.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {profile.additionalSections && profile.additionalSections.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Additional Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.additionalSections.map((section, index) => (
                <Badge key={index} variant="secondary">
                  {typeof section === "string" ? section : JSON.stringify(section)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function LinkedInRecommendationPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
          <Link2 className="h-3.5 w-3.5" />
          LinkedIn
        </div>
        <h1 className="text-2xl font-bold mb-1.5">Ideal LinkedIn Profile</h1>
        <p className="text-sm text-muted-foreground">
          Your personalised LinkedIn profile recommendations based on your experience and skills.
        </p>
      </div>

      <Suspense fallback={<LinkedInRecommendationLoading />}>
        <LinkedInProfileData />
      </Suspense>
    </div>
  );
}
