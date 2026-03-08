import { ProfileForm } from "@/components/profile/ProfileForm";
import { getUserProfile } from "./actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

async function ProfileData() {
  const profile = await getUserProfile();
  if (!profile) {
    redirect("/auth/login");
  }
  return <ProfileForm initialProfile={profile} />;
}

function ProfileFormSkeleton() {
  return (
    <div className="space-y-6">
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
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header — renders immediately */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal and professional information
        </p>
      </div>

      {/* Profile form streams in via Suspense */}
      <Suspense fallback={<ProfileFormSkeleton />}>
        <ProfileData />
      </Suspense>
    </div>
  );
}
