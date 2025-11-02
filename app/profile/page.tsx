import { ProfileForm } from "@/components/profile/ProfileForm";
import { getUserProfile } from "./actions";

export default async function ProfilePage() {
  // Fetch user profile from server
  const profile = await getUserProfile();

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
