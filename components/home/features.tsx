import { cn } from "@/lib/utils";
// import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Brain, TrendingUp, Target, Sparkles } from "lucide-react";
import type React from "react";
import FeatureCard from "./feature-card";
// import { Separator } from "../ui/separator";

type FeatureType = {
  title: string;
  icon: React.ReactNode;
  description: string;
};

const features: FeatureType[] = [
  {
    icon: <TrendingUp />,
    title: "Profile Optimization",
    description: "Build a strong profile to attract better job matches.",
  },
  {
    icon: <Sparkles />,
    title: "Easy Job Import",
    description: "Paste job URLs from any platform and track them.",
  },
  {
    icon: <Brain />,
    title: "AI Job Analysis",
    description: "Get instant insights and match scores.",
  },
  {
    icon: <Target />,
    title: "Smart Matching",
    description: "See how well you fit each role instantly.",
  },
];

export default function Features() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Heading */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful tools to help you land your next role faster.
          </p>
        </div>

        {/* Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {/* <FullWidthDivider position="top" /> */}
          {/* <Separator /> */}

          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}

          {/* <FullWidthDivider position="bottom" /> */}
          {/* <Separator /> */}
        </div>
      </div>
    </section>
  );
}
