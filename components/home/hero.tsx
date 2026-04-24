"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DecorIcon } from "@/components/ui/decor-icon";
import { Sparkles, ArrowRight } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll("[data-hero-animate]");
    gsap.fromTo(
      els,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
      },
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 px-4">
      <div
        className={cn(
          "relative mx-auto max-w-5xl border-y px-6 py-20 md:px-12",
          "dark:bg-[radial-gradient(35%_80%_at_25%_0%,var(--color-foreground)/.06,transparent)]",
        )}
      >
        {/* Vertical side borders */}
        <div className="pointer-events-none absolute -inset-y-6 -left-px w-px border-l" />
        <div className="pointer-events-none absolute -inset-y-6 -right-px w-px border-r" />

        {/* Dashed center line */}
        <div className="absolute top-0 left-1/2 -z-10 h-full border-l border-dashed" />

        {/* Corner decorations */}
        <DecorIcon position="top-left" />
        <DecorIcon position="top-right" />
        <DecorIcon position="bottom-left" />
        <DecorIcon position="bottom-right" />

        <div className="flex flex-col items-center text-center space-y-6">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 shadow-xs"
            data-hero-animate
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              AI-Powered Job Search
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            data-hero-animate
          >
            Find Your Dream Job
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              With AI Assistance
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-base md:text-lg text-muted-foreground max-w-xl"
            data-hero-animate
          >
            Smarter search. Better matches. Faster results. Let AI streamline
            your entire job hunt.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 pt-4"
            data-hero-animate
          >
            <Button size="lg" asChild>
              <Link href="/auth/login">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}