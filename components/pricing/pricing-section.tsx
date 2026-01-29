"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    description: "Perfect for getting started",
    monthlyPrice: 19,
    yearlyPrice: 190,
    features: [
      "3 social accounts",
      "50 scheduled posts/month",
      "Basic AI content generation",
      "7-day analytics",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Business",
    description: "Best for growing businesses",
    monthlyPrice: 39,
    yearlyPrice: 390,
    features: [
      "10 social accounts",
      "Unlimited scheduled posts",
      "Advanced AI content generation",
      "30-day analytics",
      "Content studio access",
      "Unified inbox",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Agency",
    description: "For teams and agencies",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Unlimited social accounts",
      "Unlimited scheduled posts",
      "Premium AI features",
      "90-day analytics",
      "White-label reports",
      "Team collaboration",
      "API access",
      "Dedicated support",
    ],
    highlighted: false,
  },
]

const comparisonFeatures = [
  { name: "Social Accounts", starter: "3", business: "10", agency: "Unlimited" },
  { name: "Scheduled Posts", starter: "50/month", business: "Unlimited", agency: "Unlimited" },
  { name: "AI Content Generation", starter: "Basic", business: "Advanced", agency: "Premium" },
  { name: "Analytics History", starter: "7 days", business: "30 days", agency: "90 days" },
  { name: "Content Studio", starter: false, business: true, agency: true },
  { name: "Unified Inbox", starter: false, business: true, agency: true },
  { name: "Team Members", starter: "1", business: "3", agency: "Unlimited" },
  { name: "White-label Reports", starter: false, business: false, agency: true },
  { name: "API Access", starter: false, business: false, agency: true },
]

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Choose the plan that fits your business. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setBillingPeriod("monthly")}
            className={cn(
              "text-sm font-medium transition-colors",
              billingPeriod === "monthly" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
            className="relative h-6 w-11 rounded-full bg-secondary transition-colors"
            aria-label="Toggle billing period"
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-primary transition-transform",
                billingPeriod === "yearly" && "translate-x-5"
              )}
            />
          </button>
          <button
            type="button"
            onClick={() => setBillingPeriod("yearly")}
            className={cn(
              "text-sm font-medium transition-colors",
              billingPeriod === "yearly" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Yearly
            <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
              Save 20%
            </span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl border p-8 transition-all",
                plan.highlighted
                  ? "border-primary bg-card shadow-lg shadow-primary/10"
                  : "border-border/60 bg-card"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    ${billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-muted-foreground">
                    /{billingPeriod === "monthly" ? "month" : "year"}
                  </span>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-24">
          <h2 className="text-center text-2xl font-bold text-foreground">Compare Plans</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="py-4 text-left text-sm font-medium text-muted-foreground">Feature</th>
                  <th className="py-4 text-center text-sm font-medium text-foreground">Starter</th>
                  <th className="py-4 text-center text-sm font-medium text-primary">Business</th>
                  <th className="py-4 text-center text-sm font-medium text-foreground">Agency</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr key={feature.name} className="border-b border-border/40">
                    <td className="py-4 text-sm text-foreground">{feature.name}</td>
                    <td className="py-4 text-center text-sm text-muted-foreground">
                      {typeof feature.starter === "boolean" ? (
                        feature.starter ? (
                          <Check className="mx-auto h-5 w-5 text-accent" />
                        ) : (
                          <span className="text-muted-foreground/50">—</span>
                        )
                      ) : (
                        feature.starter
                      )}
                    </td>
                    <td className="py-4 text-center text-sm text-muted-foreground">
                      {typeof feature.business === "boolean" ? (
                        feature.business ? (
                          <Check className="mx-auto h-5 w-5 text-accent" />
                        ) : (
                          <span className="text-muted-foreground/50">—</span>
                        )
                      ) : (
                        feature.business
                      )}
                    </td>
                    <td className="py-4 text-center text-sm text-muted-foreground">
                      {typeof feature.agency === "boolean" ? (
                        feature.agency ? (
                          <Check className="mx-auto h-5 w-5 text-accent" />
                        ) : (
                          <span className="text-muted-foreground/50">—</span>
                        )
                      ) : (
                        feature.agency
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
