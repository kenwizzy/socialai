import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { FeaturesGrid } from "@/components/landing/features-grid"
import { UseCases } from "@/components/landing/use-cases"
import { Testimonials } from "@/components/landing/testimonials"
import { CTASection } from "@/components/landing/cta-section"
import { PublicNav } from "@/components/landing/public-nav"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturesGrid />
        <UseCases />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
