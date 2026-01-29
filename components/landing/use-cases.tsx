import { Store, Utensils, Briefcase, Heart } from "lucide-react"

const useCases = [
  {
    icon: Store,
    title: "Retail & E-commerce",
    description: "Promote products, run flash sales, and engage customers with AI-crafted social campaigns.",
    stats: "40% increase in engagement",
  },
  {
    icon: Utensils,
    title: "Restaurants & Hospitality",
    description: "Share daily specials, events, and behind-the-scenes content automatically.",
    stats: "2x more reservations",
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description: "Build thought leadership and attract clients with consistent, professional content.",
    stats: "3x lead generation",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Share tips, success stories, and class schedules to keep your community engaged.",
    stats: "50% member retention boost",
  },
]

export function UseCases() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Built for businesses like yours
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            See how different industries use SocialAI to grow their presence
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 transition-all hover:border-primary/40"
            >
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
              
              <div className="relative">
                <div className="mb-4 inline-flex rounded-xl bg-secondary p-3">
                  <useCase.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{useCase.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
                <div className="mt-4 inline-flex items-center rounded-full bg-accent/10 px-3 py-1">
                  <span className="text-sm font-medium text-accent">{useCase.stats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
