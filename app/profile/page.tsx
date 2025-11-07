import { ProfileForm } from "@/components/profile/ProfileForm";
import { getUserProfile } from "./actions";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  // Fetch user profile from server
  const profile = await getUserProfile();

  // If no profile found (user not authenticated), redirect to login
  if (!profile) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal and professional information
        </p>
      </div>

      {/* Profile Form - Client Component */}
      <ProfileForm initialProfile={profile} />
    </div>
  );
}
