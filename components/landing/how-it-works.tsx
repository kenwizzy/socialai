import { Building2, Sparkles, Send, BarChart3 } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Set Up Your Business",
    description: "Connect your social accounts and tell us about your brand voice and goals.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Creates Content",
    description: "Our AI generates on-brand content, captions, and hashtags tailored to your audience.",
  },
  {
    number: "03",
    icon: Send,
    title: "Schedule & Publish",
    description: "Review, edit, and schedule posts across all your platforms with one click.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Track Performance",
    description: "Monitor engagement, reach, and get AI insights to improve your strategy.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Get started in minutes with our simple four-step process
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-full hidden h-px w-full bg-gradient-to-r from-border to-transparent lg:block" />
              )}

              <div className="group rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/40 hover:bg-card/80">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-4xl font-bold text-border">{step.number}</span>
                  <div className="rounded-xl bg-secondary p-3 transition-colors group-hover:bg-primary/20">
                    <step.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
