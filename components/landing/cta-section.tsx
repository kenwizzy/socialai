import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          </div>

          <div className="relative px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Start your free trial today</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
                Ready to transform your social media?
              </h2>

              <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
                Join thousands of businesses using AI to create better content, save time, and grow their audience.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="h-12 px-8 text-base">
                  <Link href="/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base bg-transparent">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                No credit card required. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
