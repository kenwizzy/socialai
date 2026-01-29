// app/dashboard/campaigns/CampaignsClient.tsx
'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Search, Instagram, Facebook, Twitter, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// ────────────────────────────────────────────────
//  Your mock data (later replace with real fetch)
const campaigns = [
  {
    id: 1,
    name: "Summer Sale 2024",
    goal: "Sales",
    status: "active",
    dateRange: "Jan 15 - Jan 31",
    platforms: ["instagram", "facebook"],
    postsScheduled: 12,
    postsPublished: 5,
    reach: "45.2K",
    engagement: "2.8K",
  },
  // ... rest of your campaigns
]

const platformIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
}

const statusColors: Record<string, string> = {
  active: "bg-accent text-accent-foreground",
  scheduled: "bg-primary text-primary-foreground",
  draft: "bg-secondary text-secondary-foreground",
  completed: "bg-muted text-muted-foreground",
}

export default function CampaignsClient() {
  const searchParams = useSearchParams()

  // Optional: read initial tab from URL if you want deep linking
  const initialTab = searchParams.get('tab') || 'all'

  const [activeTab, setActiveTab] = useState(initialTab)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch = campaign.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesTab = activeTab === 'all' || campaign.status === activeTab
      return matchesSearch && matchesTab
    })
  }, [searchQuery, activeTab])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">Campaigns</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and track all your social media campaigns
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="transition-all hover:border-primary/40">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">
                    <Link
                      href={`/dashboard/campaigns/${campaign.id}`}
                      className="hover:text-primary"
                    >
                      {campaign.name}
                    </Link>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{campaign.goal}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={statusColors[campaign.status]}>
                    {campaign.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* ... rest remains exactly the same */}
              <p className="text-sm text-muted-foreground">{campaign.dateRange}</p>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex -space-x-1">
                  {campaign.platforms.map((platform) => {
                    const Icon = platformIcons[platform]
                    return (
                      <div
                        key={platform}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary"
                      >
                        <Icon className="h-3.5 w-3.5 text-foreground" />
                      </div>
                    )
                  })}
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="text-sm">
                  <span className="font-medium text-foreground">{campaign.postsPublished}</span>
                  <span className="text-muted-foreground">/{campaign.postsScheduled} posts</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Reach</p>
                  <p className="text-lg font-semibold">{campaign.reach}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Engagement</p>
                  <p className="text-lg font-semibold">{campaign.engagement}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 mt-8">
          <p className="text-lg font-medium">No campaigns found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
          <Button className="mt-4" asChild>
            <Link href="/dashboard/campaigns/new">Create Campaign</Link>
          </Button>
        </div>
      )}
    </div>
  )
}