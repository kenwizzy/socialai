"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Instagram,
  Facebook,
  Twitter,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const platformIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
}

const platformColors: Record<string, string> = {
  instagram: "bg-chart-4",
  facebook: "bg-chart-5",
  twitter: "bg-chart-1",
}

// Mock scheduled posts
const scheduledPosts: Record<string, { id: number; platform: string; title: string; time: string }[]> = {
  "2026-01-19": [
    { id: 1, platform: "instagram", title: "Summer Sale Promo", time: "10:00 AM" },
  ],
  "2026-01-20": [
    { id: 2, platform: "facebook", title: "Product Launch", time: "2:00 PM" },
    { id: 3, platform: "instagram", title: "Behind the Scenes", time: "5:00 PM" },
  ],
  "2026-01-22": [
    { id: 4, platform: "twitter", title: "Industry Tips", time: "9:00 AM" },
  ],
  "2026-01-24": [
    { id: 5, platform: "instagram", title: "Customer Story", time: "11:00 AM" },
    { id: 6, platform: "facebook", title: "Weekend Special", time: "3:00 PM" },
  ],
  "2026-01-27": [
    { id: 7, platform: "instagram", title: "New Arrivals", time: "12:00 PM" },
  ],
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 18)) // Jan 18, 2026
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const startingDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const formatDateKey = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const today = new Date()
  const isToday = (day: number) => {
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    )
  }

  const calendarDays = []
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const selectedDatePosts = selectedDate ? scheduledPosts[selectedDate] || [] : []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Calendar</h1>
          <p className="mt-1 text-muted-foreground">
            Plan and schedule your content
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Calendar */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xl">
                {months[month]} {year}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-1">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="py-2 text-center text-sm font-medium text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />
                  }

                  const dateKey = formatDateKey(day)
                  const posts = scheduledPosts[dateKey] || []
                  const hasScheduledPosts = posts.length > 0

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDate(dateKey)}
                      className={cn(
                        "aspect-square rounded-lg p-1 text-left transition-colors hover:bg-secondary",
                        isToday(day) && "ring-2 ring-primary",
                        selectedDate === dateKey && "bg-secondary"
                      )}
                    >
                      <div className="flex h-full flex-col">
                        <span
                          className={cn(
                            "text-sm font-medium",
                            isToday(day) ? "text-primary" : "text-foreground"
                          )}
                        >
                          {day}
                        </span>
                        {hasScheduledPosts && (
                          <div className="mt-1 flex flex-wrap gap-0.5">
                            {posts.slice(0, 3).map((post) => {
                              const Icon = platformIcons[post.platform]
                              return (
                                <div
                                  key={post.id}
                                  className={cn(
                                    "h-1.5 w-1.5 rounded-full",
                                    platformColors[post.platform]
                                  )}
                                />
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 flex items-center gap-4">
                {Object.entries(platformColors).map(([platform, color]) => {
                  const Icon = platformIcons[platform]
                  return (
                    <div key={platform} className="flex items-center gap-2">
                      <div className={cn("h-3 w-3 rounded-full", color)} />
                      <span className="text-xs text-muted-foreground capitalize">
                        {platform}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Selected Date Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {selectedDate
                  ? new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "Select a date"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDatePosts.length > 0 ? (
                <div className="space-y-3">
                  {selectedDatePosts.map((post) => {
                    const Icon = platformIcons[post.platform]
                    return (
                      <div
                        key={post.id}
                        className="flex items-center gap-3 rounded-lg border border-border/60 p-3"
                      >
                        <div className="rounded-lg bg-secondary p-2">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {post.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{post.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : selectedDate ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No posts scheduled for this day
                  </p>
                  <Button size="sm" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Post
                  </Button>
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground py-8">
                  Click on a date to see scheduled posts
                </p>
              )}
            </CardContent>
          </Card>

          {/* AI Suggestion */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/20 p-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Fill empty slots
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {"You have 5 empty slots this week. Want AI to suggest content?"}
                  </p>
                  <Button size="sm" className="mt-3">
                    Generate Ideas
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(scheduledPosts)
                  .slice(0, 3)
                  .map(([date, posts]) =>
                    posts.map((post) => {
                      const Icon = platformIcons[post.platform]
                      return (
                        <div
                          key={post.id}
                          className="flex items-center gap-3"
                        >
                          <div className="rounded-lg bg-secondary p-2">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {post.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}{" "}
                              at {post.time}
                            </p>
                          </div>
                        </div>
                      )
                    })
                  )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
