"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Instagram,
  Facebook,
  Twitter,
  MoreHorizontal,
  TrendingUp,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Sparkles,
  Calendar,
  Check,
  Clock,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const campaign = {
  id: 1,
  name: "Summer Sale 2024",
  goal: "Sales",
  status: "active",
  dateRange: "Jan 15 - Jan 31, 2024",
  platforms: ["instagram", "facebook"],
  description: "30% off all summer items",
  postsScheduled: 12,
  postsPublished: 5,
}

const posts = [
  {
    id: 1,
    platform: "instagram",
    caption: "Exciting news! Our summer sale is here. Don't miss out on 30% off...",
    status: "published",
    scheduledAt: "Jan 15, 2024 2:00 PM",
    engagement: { likes: 245, comments: 32, shares: 18 },
  },
  {
    id: 2,
    platform: "facebook",
    caption: "Transform your summer style with our exclusive collection...",
    status: "published",
    scheduledAt: "Jan 16, 2024 10:00 AM",
    engagement: { likes: 189, comments: 24, shares: 42 },
  },
  {
    id: 3,
    platform: "instagram",
    caption: "Last chance! Our summer sale ends soon. Shop now...",
    status: "scheduled",
    scheduledAt: "Jan 20, 2024 3:00 PM",
    engagement: null,
  },
  {
    id: 4,
    platform: "facebook",
    caption: "Beat the heat with our summer essentials...",
    status: "scheduled",
    scheduledAt: "Jan 22, 2024 11:00 AM",
    engagement: null,
  },
]

const performanceData = [
  { date: "Jan 15", reach: 2400, engagement: 180 },
  { date: "Jan 16", reach: 3200, engagement: 245 },
  { date: "Jan 17", reach: 4100, engagement: 320 },
  { date: "Jan 18", reach: 3800, engagement: 290 },
  { date: "Jan 19", reach: 5200, engagement: 410 },
  { date: "Jan 20", reach: 6100, engagement: 520 },
]

const insights = [
  {
    id: 1,
    title: "Best Performing Time",
    message: "Posts at 2 PM get 40% more engagement",
    type: "success",
  },
  {
    id: 2,
    title: "Audience Growth",
    message: "You gained 234 new followers this week",
    type: "success",
  },
  {
    id: 3,
    title: "Content Suggestion",
    message: "Try adding more video content - it gets 2x more shares",
    type: "info",
  },
]

const platformIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
}

export default function CampaignDetailPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("posts")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{campaign.name}</h1>
              <Badge className="bg-accent text-accent-foreground">{campaign.status}</Badge>
            </div>
            <p className="mt-1 text-muted-foreground">
              {campaign.goal} · {campaign.dateRange}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Edit Campaign</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Export Report</DropdownMenuItem>
              <DropdownMenuItem>Pause Campaign</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Reach</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">45.2K</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Engagement</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">2.8K</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Engagement Rate</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">6.2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Posts</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {campaign.postsPublished}/{campaign.postsScheduled}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* Posts Tab */}
        <TabsContent value="posts" className="mt-6">
          <div className="space-y-4">
            {posts.map((post) => {
              const PlatformIcon = platformIcons[post.platform]
              return (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-secondary p-2">
                        <PlatformIcon className="h-5 w-5 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium capitalize text-foreground">
                            {post.platform}
                          </span>
                          {post.status === "published" ? (
                            <Badge variant="secondary" className="gap-1">
                              <Check className="h-3 w-3" />
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="gap-1">
                              <Clock className="h-3 w-3" />
                              Scheduled
                            </Badge>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {post.caption}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">{post.scheduledAt}</p>
                        
                        {post.engagement && (
                          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {post.engagement.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {post.engagement.comments}
                            </span>
                            <span className="flex items-center gap-1">
                              <Share2 className="h-4 w-4" />
                              {post.engagement.shares}
                            </span>
                          </div>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Reschedule</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="reach"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">Reach</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-accent" />
                  <span className="text-sm text-muted-foreground">Engagement</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="mt-6">
          <div className="space-y-4">
            {insights.map((insight) => (
              <Card key={insight.id} className="border-primary/30 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/20 p-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{insight.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{insight.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
