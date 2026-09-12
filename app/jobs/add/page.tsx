import AddJobForm from "@/components/AddJobForm";
import DemoDataBanner from "@/components/guest/DemoDataBanner";
import { getIsGuest } from "@/lib/authState";

export default async function AddJobPage() {
  const isGuest = await getIsGuest();

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analyse New Job</h1>
        <p className="text-muted-foreground">
          Add a job posting and let AI analyze how well it matches your profile
        </p>
      </div>
      {isGuest && (
        <DemoDataBanner
          feature="the analysis flow"
          className="mb-6"
        />
      )}
      <AddJobForm isGuest={isGuest} />
    </div>
  );
}
