import { StatsCards } from "@/components/dashboard/stats-cards"
import { ActiveCampaignCarousel } from "@/components/dashboard/active-campaign-carousel"
import { AISuggestionCard } from "@/components/dashboard/ai-suggestion-card"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          {"Welcome back! Here's an overview of your social media performance."}
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* AI Suggestions */}
      <AISuggestionCard />

      {/* Active Campaigns */}
      <ActiveCampaignCarousel />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  )
}
