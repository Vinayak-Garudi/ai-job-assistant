import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getLinkedInProfile } from "./actions";
import LinkedInRecommendationLoading from "./loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, FolderOpen, User, FileText } from "lucide-react";

async function LinkedInProfileData() {
  const { profile, username } = await getLinkedInProfile();

  if (!profile) {
    redirect("/profile");
  }

  const hasIntro = profile.intro?.trim();
  const hasAbout = profile.about?.trim();
  const hasExperience = profile.experience?.length > 0;
  const hasProjects = profile.projects?.length > 0;
  const isEmpty = !hasIntro && !hasAbout && !hasExperience && !hasProjects;

  if (isEmpty) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <h3 className="text-lg font-semibold mb-2">
            No LinkedIn Profile Data Yet
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your ideal LinkedIn profile hasn&apos;t been generated yet. Complete
            your profile and job analysis to get personalized LinkedIn
            recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Intro Section */}
      {hasIntro && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5" />
              Headline / Intro
            </CardTitle>
            {username && (
              <CardDescription>
                Recommended intro for {username}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{profile.intro}</p>
          </CardContent>
        </Card>
      )}

      {/* About Section */}
      {hasAbout && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5" />
              About
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {profile.about}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Experience Section */}
      {hasExperience && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="h-5 w-5" />
              Experience
            </CardTitle>
            <CardDescription>
              {profile.experience.length} recommended{" "}
              {profile.experience.length === 1 ? "entry" : "entries"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {profile.experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-2 border-border"
                >
                  <h4 className="font-semibold text-foreground">{exp.title}</h4>
                  {exp.companyOrOrganization && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {exp.companyOrOrganization}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects Section */}
      {hasProjects && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FolderOpen className="h-5 w-5" />
              Projects
            </CardTitle>
            <CardDescription>
              {profile.projects.length} recommended{" "}
              {profile.projects.length === 1 ? "project" : "projects"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {profile.projects.map((project, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{project.title}</CardTitle>
                  </CardHeader>
                  {project.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {project.description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Sections */}
      {profile.additionalSections && profile.additionalSections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.additionalSections.map((section, index) => (
                <Badge key={index} variant="secondary">
                  {typeof section === "string"
                    ? section
                    : JSON.stringify(section)}
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
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          Ideal LinkedIn Profile
        </h1>
        <p className="text-muted-foreground">
          Your personalized LinkedIn profile recommendations based on your
          experience and skills
        </p>
      </div>

      <Suspense fallback={<LinkedInRecommendationLoading />}>
        <LinkedInProfileData />
      </Suspense>
    </div>
  );
}
