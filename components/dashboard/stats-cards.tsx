import { TrendingUp, Users, MessageSquare, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    label: "Total Reach",
    value: "124.5K",
    change: "+12.5%",
    changeType: "positive",
    icon: Eye,
  },
  {
    label: "Followers",
    value: "8,234",
    change: "+3.2%",
    changeType: "positive",
    icon: Users,
  },
  {
    label: "Engagement Rate",
    value: "4.8%",
    change: "+0.8%",
    changeType: "positive",
    icon: TrendingUp,
  },
  {
    label: "Messages",
    value: "156",
    change: "+23",
    changeType: "positive",
    icon: MessageSquare,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">{stat.value}</span>
              <span
                className={
                  stat.changeType === "positive"
                    ? "text-sm font-medium text-accent"
                    : "text-sm font-medium text-destructive"
                }
              >
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
