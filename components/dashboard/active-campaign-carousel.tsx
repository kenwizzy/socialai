"use client"

import React from "react"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Instagram, Facebook, Twitter } from "lucide-react"

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
  },
  {
    id: 2,
    name: "Product Launch",
    goal: "Awareness",
    status: "scheduled",
    dateRange: "Feb 1 - Feb 15",
    platforms: ["instagram", "twitter"],
    postsScheduled: 8,
    postsPublished: 0,
  },
  {
    id: 3,
    name: "Valentine's Day Promo",
    goal: "Engagement",
    status: "draft",
    dateRange: "Feb 10 - Feb 14",
    platforms: ["instagram", "facebook", "twitter"],
    postsScheduled: 6,
    postsPublished: 0,
  },
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
}

export function ActiveCampaignCarousel() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Active Campaigns</h2>
        <Button size="sm" asChild>
          <Link href="/dashboard/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <Link key={campaign.id} href={`/dashboard/campaigns/${campaign.id}`}>
            <Card className="h-full transition-all hover:border-primary/40 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{campaign.name}</CardTitle>
                  <Badge className={statusColors[campaign.status]}>
                    {campaign.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{campaign.goal}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{campaign.dateRange}</p>
                
                <div className="mt-4 flex items-center justify-between">
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
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {campaign.postsPublished}/{campaign.postsScheduled}
                    </p>
                    <p className="text-xs text-muted-foreground">posts published</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
