import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, MessageSquare, TrendingUp, Sparkles } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "post_published",
    icon: Send,
    title: "Post published",
    description: "Summer sale announcement went live on Instagram",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "comment_received",
    icon: MessageSquare,
    title: "New comment",
    description: "Sarah commented on your product post",
    time: "15 minutes ago",
  },
  {
    id: 3,
    type: "milestone",
    icon: TrendingUp,
    title: "Milestone reached",
    description: "You reached 10K followers on Instagram!",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "ai_suggestion",
    icon: Sparkles,
    title: "AI content ready",
    description: "5 new posts generated for your review",
    time: "2 hours ago",
  },
]

const iconColors: Record<string, string> = {
  post_published: "bg-accent/10 text-accent",
  comment_received: "bg-primary/10 text-primary",
  milestone: "bg-chart-3/10 text-chart-3",
  ai_suggestion: "bg-primary/10 text-primary",
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className={`rounded-full p-2 ${iconColors[activity.type]}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {activity.description}
                </p>
              </div>
              <p className="shrink-0 text-xs text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
