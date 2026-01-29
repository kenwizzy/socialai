import {
  Sparkles,
  Calendar,
  BarChart3,
  MessageSquare,
  Palette,
  Zap,
  Globe,
  Shield,
} from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Content Generation",
    description: "Generate engaging posts, captions, and hashtags with AI that understands your brand voice.",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI recommends the best times to post based on your audience engagement patterns.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track performance across all platforms with unified dashboards and actionable insights.",
  },
  {
    icon: MessageSquare,
    title: "Unified Inbox",
    description: "Manage comments and messages from all platforms in one place with AI-suggested replies.",
  },
  {
    icon: Palette,
    title: "Content Studio",
    description: "Create visually stunning posts with our built-in editor and template library.",
  },
  {
    icon: Zap,
    title: "Automated Workflows",
    description: "Set up automated posting rules and let AI handle repetitive tasks.",
  },
  {
    icon: Globe,
    title: "Multi-Platform Support",
    description: "Connect Instagram, Facebook, Twitter, LinkedIn, and more from one dashboard.",
  },
  {
    icon: Shield,
    title: "Brand Safety",
    description: "AI reviews content for brand consistency and flags potential issues before posting.",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Everything you need to dominate social media
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Powerful features designed for small businesses that want big results
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 inline-flex rounded-xl bg-secondary p-3 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
