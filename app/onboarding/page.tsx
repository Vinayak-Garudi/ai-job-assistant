// Reads the session cookie to prefill the wizard — never prerender it.
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { getUserProfile } from "@/app/profile/actions";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import OnboardingLoading from "./loading";
import { withProfileDefaults } from "@/lib/profileDefaults";

async function OnboardingData() {
  const profile = await getUserProfile();
  return <OnboardingWizard initialProfile={withProfileDefaults(profile)} />;
}

export default function OnboardingPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 pt-10 pb-12 md:pt-14 md:pb-16">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Let&apos;s set up your profile</h1>
        <p className="text-muted-foreground">
          A few quick questions — everything you add here makes your job
          matches, resume, and salary estimate more accurate.
        </p>
      </div>

      <Suspense fallback={<OnboardingLoading />}>
        <OnboardingData />
      </Suspense>
    </div>
  );
}
