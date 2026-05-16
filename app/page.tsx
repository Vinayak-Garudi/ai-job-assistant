// Home page has no dynamic data — pre-render at build time
export const dynamic = "force-static";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Target, Sparkles, ArrowRight, Linkedin, FileText, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950">
        {/* Decorative blobs */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 container mx-auto max-w-5xl px-4 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-violet-300 font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Job Search · Totally Free
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Land your dream job
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              with AI superpowers
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Paste any job link and get instant AI analysis — match scores, resume feedback, outreach emails, interview prep, and more.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-violet-600 hover:bg-violet-500 text-white border-0 px-8 h-12 text-base shadow-lg shadow-violet-900/40 transition-all"
              asChild
            >
              <Link href="/auth/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/15 text-white hover:bg-white/8 bg-transparent px-8 h-12 text-base backdrop-blur-sm"
              asChild
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>

          {/* Floating stat pills */}
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            {[
              { icon: Brain, label: "AI Match Analysis" },
              { icon: FileText, label: "Resume Feedback" },
              { icon: Linkedin, label: "LinkedIn Profile" },
              { icon: TrendingUp, label: "Salary Estimate" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-sm text-slate-300"
              >
                <Icon className="h-3.5 w-3.5 text-violet-400" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              From job link to offer-ready
              <br />
              <span className="text-muted-foreground font-normal">in under a minute</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Paste a job URL",
                desc: "Drop any job link from LinkedIn, Indeed, Glassdoor, or any job board.",
                icon: Zap,
                color: "from-violet-500 to-purple-600",
              },
              {
                step: "02",
                title: "AI does the analysis",
                desc: "Get your match %, strengths, gaps, resume tips, and a tailored cover letter.",
                icon: Brain,
                color: "from-fuchsia-500 to-pink-600",
              },
              {
                step: "03",
                title: "Apply with confidence",
                desc: "Use AI-drafted outreach emails, interview questions, and salary insights.",
                icon: Target,
                color: "from-indigo-500 to-blue-600",
              },
            ].map(({ step, title, desc, icon: Icon, color }) => (
              <div
                key={step}
                className="relative group rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${color} mb-5`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs font-bold text-muted-foreground mb-1">{step}</p>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features bento */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need to land the role</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: Brain,
                title: "AI Job Analysis",
                desc: "Instant match scores with detailed breakdowns of your strengths, skill gaps, and actionable resume feedback — all specific to the role.",
                color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
              },
              {
                icon: Target,
                title: "Smart Match Scoring",
                desc: "See exactly how well you fit any job posting. Track your best opportunities and focus your energy where it counts most.",
                color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
              },
              {
                icon: FileText,
                title: "Resume & LinkedIn",
                desc: "Get a personalized resume structure and LinkedIn profile recommendations tailored to your experience and target roles.",
                color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
              },
              {
                icon: TrendingUp,
                title: "Salary Intelligence",
                desc: "Know your market worth before you negotiate. Get salary ranges and market insights personalized to your profile and location.",
                color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-7 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${color} bg-current/10 mb-5`}>
                  <Icon className={`h-5 w-5 ${color.split(" ").slice(1).join(" ")}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-12 text-center text-white">
            <div className="absolute inset-0 bg-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to supercharge your job search?
              </h2>
              <p className="text-violet-100 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of job seekers using AI to land their dream roles faster.
              </p>
              <Button
                size="lg"
                className="bg-white text-violet-700 hover:bg-violet-50 font-semibold px-8 h-12 shadow-lg"
                asChild
              >
                <Link href="/auth/signup">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
