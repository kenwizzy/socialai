import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, TrendingUp, Calendar, MessageSquare } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Campaign Management</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-7xl text-balance">
            Run smarter social media campaigns with{" "}
            <span className="text-primary">AI</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground lg:text-xl leading-relaxed">
            Create, publish, and track campaigns in minutes. Let AI handle the heavy lifting while you focus on growing your business.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="h-12 px-8 text-base">
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base bg-transparent">
              <Link href="#how-it-works">
                <Play className="mr-2 h-5 w-5" />
                See How It Works
              </Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required. 14-day free trial.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 lg:mt-24">
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl" />
            <div className="relative rounded-2xl border border-border/60 bg-card p-2 shadow-2xl">
              <div className="rounded-xl bg-background p-6">
                {/* Mock Dashboard Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Campaign Dashboard</h3>
                    <p className="text-sm text-muted-foreground">{"Welcome back! Here's your overview"}</p>
                  </div>
                  <Button size="sm">New Campaign</Button>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    icon={TrendingUp}
                    label="Total Reach"
                    value="124.5K"
                    change="+12.5%"
                  />
                  <StatCard
                    icon={MessageSquare}
                    label="Engagement"
                    value="8.2K"
                    change="+8.1%"
                  />
                  <StatCard
                    icon={Calendar}
                    label="Scheduled"
                    value="24"
                    change="+3"
                  />
                  <StatCard
                    icon={Sparkles}
                    label="AI Suggestions"
                    value="12"
                    change="New"
                  />
                </div>

                {/* AI Suggestion */}
                <div className="mt-6 rounded-lg border border-primary/30 bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">AI Insight</p>
                      <p className="text-sm text-muted-foreground">
                        {"Your posts perform better on Fridays. Want me to schedule more?"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
}: {
  icon: React.ElementType
  label: string
  value: string
  change: string
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-secondary/30 p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className="text-xs font-medium text-accent">{change}</span>
      </div>
    </div>
  )
}
