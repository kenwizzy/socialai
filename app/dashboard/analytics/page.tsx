"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  ArrowUpRight,
  Download,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

const engagementData = [
  { date: "Jan 1", likes: 1200, comments: 340, shares: 180, reach: 15000 },
  { date: "Jan 8", likes: 1400, comments: 420, shares: 220, reach: 18000 },
  { date: "Jan 15", likes: 1100, comments: 280, shares: 150, reach: 14000 },
  { date: "Jan 22", likes: 1800, comments: 520, shares: 280, reach: 22000 },
  { date: "Jan 29", likes: 2100, comments: 640, shares: 340, reach: 28000 },
  { date: "Feb 5", likes: 1900, comments: 580, shares: 300, reach: 25000 },
  { date: "Feb 12", likes: 2400, comments: 720, shares: 420, reach: 32000 },
];

const platformData = [
  { name: "Instagram", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Twitter", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Facebook", value: 18, color: "hsl(var(--chart-3))" },
  { name: "LinkedIn", value: 12, color: "hsl(var(--chart-4))" },
];

const audienceGrowthData = [
  { month: "Sep", followers: 12400 },
  { month: "Oct", followers: 13800 },
  { month: "Nov", followers: 15200 },
  { month: "Dec", followers: 17100 },
  { month: "Jan", followers: 19800 },
  { month: "Feb", followers: 23400 },
];

const topPosts = [
  {
    id: "1",
    content: "Introducing our new summer collection! Fresh styles for the season ahead.",
    platform: "instagram",
    likes: 2847,
    comments: 342,
    shares: 128,
    reach: 45200,
    image: true,
  },
  {
    id: "2",
    content: "Big announcement coming tomorrow! Stay tuned for something exciting.",
    platform: "twitter",
    likes: 1923,
    comments: 189,
    shares: 456,
    reach: 38100,
    image: false,
  },
  {
    id: "3",
    content: "Behind the scenes at our new office! Tour video dropping this week.",
    platform: "linkedin",
    likes: 1654,
    comments: 267,
    shares: 89,
    reach: 29800,
    image: true,
  },
];

const kpiCards = [
  {
    title: "Total Reach",
    value: "284.5K",
    change: "+12.3%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Engagement Rate",
    value: "4.8%",
    change: "+0.6%",
    trend: "up",
    icon: Heart,
  },
  {
    title: "New Followers",
    value: "3,842",
    change: "+18.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Total Interactions",
    value: "42.1K",
    change: "-2.1%",
    trend: "down",
    icon: MessageSquare,
  },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Track your social media performance across all platforms
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title} className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-primary/10 p-2">
                  <kpi.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    kpi.trend === "up"
                      ? "border-green-500/50 text-green-400"
                      : "border-red-500/50 text-red-400"
                  )}
                >
                  {kpi.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3" />
                  )}
                  {kpi.change}
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Engagement Over Time */}
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground">
              Engagement Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="engagement" className="w-full">
              <TabsList className="mb-4 bg-secondary">
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                <TabsTrigger value="reach">Reach</TabsTrigger>
              </TabsList>
              <TabsContent value="engagement" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementData}>
                    <defs>
                      <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
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
                    <Area
                      type="monotone"
                      dataKey="likes"
                      stroke="hsl(var(--chart-1))"
                      fill="url(#colorLikes)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="comments"
                      stroke="hsl(var(--chart-2))"
                      fill="url(#colorComments)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="reach" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
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
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--chart-1))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground">
              Platform Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {platformData.map((platform) => (
                <div key={platform.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: platform.color }}
                    />
                    <span className="text-sm text-foreground">{platform.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{platform.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audience Growth & Top Posts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Audience Growth */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground">Audience Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={audienceGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="followers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Posts */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium text-foreground">
              Top Performing Posts
            </CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post, i) => (
                <div
                  key={post.id}
                  className="flex items-start gap-4 rounded-lg border border-border bg-secondary/30 p-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm text-foreground">{post.content}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="h-3 w-3" />
                        {post.shares}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.reach.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0 capitalize">
                    {post.platform}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
