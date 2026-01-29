import { PublicNav } from "@/components/landing/public-nav"
import { Footer } from "@/components/landing/footer"
import { PricingSection } from "@/components/pricing/pricing-section"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-24">
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
