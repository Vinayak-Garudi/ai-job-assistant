import { ProfileForm } from "@/components/profile/ProfileForm";
import { getUserProfile } from "./actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingUp, Link2, UserCircle } from "lucide-react";

async function ProfileData() {
  const profile = await getUserProfile();
  if (!profile) redirect("/auth/login");
  return <ProfileForm initialProfile={profile} />;
}

function ProfileFormSkeleton() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            <UserCircle className="h-3.5 w-3.5" />
            Profile
          </div>
          <h1 className="text-2xl font-bold mb-1">Your Profile</h1>
          <p className="text-sm text-muted-foreground">
            Keep this up to date for better AI analysis and salary estimates.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button asChild variant="outline" size="sm" className="rounded-lg gap-1.5">
            <Link href="/salary-estimate">
              <TrendingUp className="h-3.5 w-3.5" />
              Salary Estimate
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="rounded-lg gap-1.5">
            <Link href="/linkedin-recommendation">
              <Link2 className="h-3.5 w-3.5" />
              LinkedIn Profile
            </Link>
          </Button>
        </div>
      </div>

      <Suspense fallback={<ProfileFormSkeleton />}>
        <ProfileData />
      </Suspense>
    </div>
  );
}
