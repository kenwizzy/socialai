"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, X, ChevronRight } from "lucide-react"

const suggestions = [
  {
    id: 1,
    title: "Best Time to Post",
    message: "Your posts perform 40% better on Fridays at 2 PM. Want me to reschedule your upcoming posts?",
    action: "Reschedule Posts",
  },
  {
    id: 2,
    title: "Content Idea",
    message: "Based on trending topics in your industry, consider posting about sustainable practices this week.",
    action: "Generate Content",
  },
  {
    id: 3,
    title: "Engagement Opportunity",
    message: "You have 12 unanswered comments. Responding within 2 hours can boost engagement by 25%.",
    action: "View Comments",
  },
]

export function AISuggestionCard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dismissed, setDismissed] = useState<number[]>([])

  const visibleSuggestions = suggestions.filter((s) => !dismissed.includes(s.id))
  const currentSuggestion = visibleSuggestions[currentIndex % visibleSuggestions.length]

  if (!currentSuggestion) return null

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/20 p-3">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-primary">AI Insight</p>
                <h3 className="mt-1 font-semibold text-foreground">
                  {currentSuggestion.title}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0"
                onClick={() => setDismissed([...dismissed, currentSuggestion.id])}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Dismiss</span>
              </Button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {currentSuggestion.message}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Button size="sm">{currentSuggestion.action}</Button>
              {visibleSuggestions.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                >
                  Next suggestion
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
