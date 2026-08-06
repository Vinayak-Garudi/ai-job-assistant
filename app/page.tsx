export const dynamic = "force-static";

import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import CTA from "@/components/home/cta";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
