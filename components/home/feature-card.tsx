import { cn } from "@/lib/utils";
import type React from "react";

type FeatureType = {
  title: string;
  icon: React.ReactNode;
  description: string;
};

export default function FeatureCard({
  feature,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  feature: FeatureType;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between bg-background p-6 transition-all",
        "hover:bg-muted/40",
        className,
      )}
      {...props}
    >
      {/* Icon */}
      <div className="mb-6 text-primary [&_svg]:h-5 [&_svg]:w-5">
        {feature.icon}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-foreground">{feature.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Subtle hover line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
    </div>
  );
}
