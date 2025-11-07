import AddJobForm from "@/components/AddJobForm";

export default function AddJobPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New Job</h1>
        <p className="text-muted-foreground">
          Add a job posting and let AI analyze how well it matches your profile
        </p>
      </div>
      <AddJobForm />
    </div>
  );
}
