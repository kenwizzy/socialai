"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Instagram,
  Facebook,
  Twitter,
  Loader2,
  Calendar,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import confetti from "canvas-confetti"

const steps = [
  { id: 1, title: "Basics" },
  { id: 2, title: "Platforms & Schedule" },
  { id: 3, title: "AI Generation" },
  { id: 4, title: "Review & Publish" },
]

const goals = [
  { id: "sales", label: "Drive Sales", description: "Promote products and increase conversions" },
  { id: "awareness", label: "Brand Awareness", description: "Reach new audiences and grow following" },
  { id: "engagement", label: "Boost Engagement", description: "Increase likes, comments, and shares" },
]

const ctaOptions = [
  "Shop Now",
  "Learn More",
  "Sign Up",
  "Book Now",
  "Contact Us",
  "Get Started",
]

const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "facebook", name: "Facebook", icon: Facebook },
  { id: "twitter", name: "Twitter / X", icon: Twitter },
]

export default function NewCampaignPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [postsGenerated, setPostsGenerated] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    goal: "",
    offer: "",
    cta: "",
    platforms: [] as string[],
    startDate: "",
    endDate: "",
    postsPerWeek: 3,
    manualApproval: true,
  })

  const [generatedPosts, setGeneratedPosts] = useState<
    { id: number; platform: string; caption: string; hashtags: string }[]
  >([])

  const togglePlatform = (platformId: string) => {
    if (formData.platforms.includes(platformId)) {
      setFormData({
        ...formData,
        platforms: formData.platforms.filter((p) => p !== platformId),
      })
    } else {
      setFormData({
        ...formData,
        platforms: [...formData.platforms, platformId],
      })
    }
  }

  const generatePosts = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const mockPosts = [
      {
        id: 1,
        platform: "instagram",
        caption: `Exciting news! Our ${formData.offer || "latest collection"} is here. Don't miss out on this amazing opportunity to upgrade your style.`,
        hashtags: "#newcollection #style #fashion #trending",
      },
      {
        id: 2,
        platform: "instagram",
        caption: `Transform your look with our exclusive ${formData.offer || "products"}. Limited time offer - act fast!`,
        hashtags: "#limitedoffer #exclusive #musthave",
      },
      {
        id: 3,
        platform: "facebook",
        caption: `We're thrilled to announce ${formData.offer || "something special"}! Head over to our store and discover what's waiting for you.`,
        hashtags: "#announcement #newlaunch #excited",
      },
    ]

    setGeneratedPosts(mockPosts)
    setPostsGenerated(true)
    setIsGenerating(false)
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    setTimeout(() => {
      router.push("/dashboard/campaigns")
    }, 2000)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Campaign</h1>
          <p className="text-muted-foreground">Let AI help you create the perfect campaign</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all",
                  currentStep > step.id
                    ? "border-accent bg-accent text-accent-foreground"
                    : currentStep === step.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary text-muted-foreground"
                )}
              >
                {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
              </div>
              <span
                className={cn(
                  "mt-2 hidden text-xs font-medium sm:block",
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 w-12 sm:w-24",
                  currentStep > step.id ? "bg-accent" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <Card>
        <CardContent className="p-6">
          {/* Step 1: Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <CardHeader className="p-0">
                <CardTitle>Campaign Basics</CardTitle>
              </CardHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Summer Sale 2024"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Campaign Goal</Label>
                  <div className="grid gap-3">
                    {goals.map((goal) => (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, goal: goal.id })}
                        className={cn(
                          "flex items-center gap-4 rounded-xl border p-4 text-left transition-all",
                          formData.goal === goal.id
                            ? "border-primary bg-primary/5"
                            : "border-border/60 hover:border-primary/40"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full border-2",
                            formData.goal === goal.id
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          )}
                        >
                          {formData.goal === goal.id && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{goal.label}</span>
                          <p className="text-sm text-muted-foreground">{goal.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="offer">What are you promoting?</Label>
                  <Textarea
                    id="offer"
                    placeholder="e.g., 30% off all summer items, new product launch..."
                    value={formData.offer}
                    onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cta">Call to Action</Label>
                  <Select
                    value={formData.cta}
                    onValueChange={(value) => setFormData({ ...formData, cta: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select CTA" />
                    </SelectTrigger>
                    <SelectContent>
                      {ctaOptions.map((cta) => (
                        <SelectItem key={cta} value={cta}>
                          {cta}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Platforms & Schedule */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <CardHeader className="p-0">
                <CardTitle>Platforms & Schedule</CardTitle>
              </CardHeader>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Select Platforms</Label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {platforms.map((platform) => (
                      <button
                        key={platform.id}
                        type="button"
                        onClick={() => togglePlatform(platform.id)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl border p-4 transition-all",
                          formData.platforms.includes(platform.id)
                            ? "border-primary bg-primary/5"
                            : "border-border/60 hover:border-primary/40"
                        )}
                      >
                        <Checkbox checked={formData.platforms.includes(platform.id)} />
                        <platform.icon className="h-5 w-5" />
                        <span className="font-medium">{platform.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Posts per Week: {formData.postsPerWeek}</Label>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={formData.postsPerWeek}
                    onChange={(e) =>
                      setFormData({ ...formData, postsPerWeek: parseInt(e.target.value) })
                    }
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 post/week</span>
                    <span>7 posts/week</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: AI Generation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <CardHeader className="p-0">
                <CardTitle>AI Content Generation</CardTitle>
              </CardHeader>

              {!postsGenerated ? (
                <div className="flex flex-col items-center justify-center py-12">
                  {isGenerating ? (
                    <>
                      <div className="relative">
                        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                        <div className="relative rounded-full bg-primary/10 p-6">
                          <Sparkles className="h-8 w-8 animate-pulse text-primary" />
                        </div>
                      </div>
                      <p className="mt-6 text-lg font-medium text-foreground">
                        AI is crafting your campaign...
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {"Generating on-brand content tailored to your goals"}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="rounded-full bg-primary/10 p-6">
                        <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                      <p className="mt-6 text-lg font-medium text-foreground">
                        Ready to generate content
                      </p>
                      <p className="mt-2 text-center text-sm text-muted-foreground">
                        {"Our AI will create posts based on your campaign details"}
                      </p>
                      <Button className="mt-6" onClick={generatePosts}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Content
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {generatedPosts.length} posts generated
                    </p>
                    <Button variant="outline" size="sm" onClick={generatePosts}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>

                  {generatedPosts.map((post) => {
                    const PlatformIcon =
                      platforms.find((p) => p.id === post.platform)?.icon || Instagram
                    return (
                      <Card key={post.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <PlatformIcon className="h-4 w-4" />
                            <span className="text-sm font-medium capitalize">{post.platform}</span>
                          </div>
                          <Textarea
                            value={post.caption}
                            onChange={(e) => {
                              setGeneratedPosts(
                                generatedPosts.map((p) =>
                                  p.id === post.id ? { ...p, caption: e.target.value } : p
                                )
                              )
                            }}
                            className="mb-2"
                          />
                          <div className="flex flex-wrap gap-1">
                            {post.hashtags.split(" ").map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Review & Publish */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {isPublishing ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-accent/20" />
                    <div className="relative rounded-full bg-accent/10 p-6">
                      <Check className="h-8 w-8 text-accent" />
                    </div>
                  </div>
                  <p className="mt-6 text-lg font-medium text-foreground">
                    Campaign scheduled successfully!
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {"Redirecting to your campaigns..."}
                  </p>
                </div>
              ) : (
                <>
                  <CardHeader className="p-0">
                    <CardTitle>Review & Publish</CardTitle>
                  </CardHeader>

                  <div className="space-y-4">
                    <div className="rounded-xl border border-border/60 p-4">
                      <h3 className="font-medium text-foreground">Campaign Summary</h3>
                      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div>
                          <dt className="text-sm text-muted-foreground">Name</dt>
                          <dd className="font-medium text-foreground">{formData.name || "-"}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">Goal</dt>
                          <dd className="font-medium text-foreground capitalize">
                            {formData.goal || "-"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">Duration</dt>
                          <dd className="font-medium text-foreground">
                            {formData.startDate && formData.endDate
                              ? `${formData.startDate} - ${formData.endDate}`
                              : "-"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">Platforms</dt>
                          <dd className="flex gap-2">
                            {formData.platforms.map((p) => {
                              const Icon = platforms.find((pl) => pl.id === p)?.icon || Instagram
                              return <Icon key={p} className="h-5 w-5" />
                            })}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">Posts</dt>
                          <dd className="font-medium text-foreground">
                            {generatedPosts.length} posts scheduled
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">Frequency</dt>
                          <dd className="font-medium text-foreground">
                            {formData.postsPerWeek}x per week
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-border/60 p-4">
                      <Checkbox
                        id="approval"
                        checked={formData.manualApproval}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, manualApproval: checked as boolean })
                        }
                      />
                      <div>
                        <label htmlFor="approval" className="font-medium text-foreground">
                          Require manual approval
                        </label>
                        <p className="text-sm text-muted-foreground">
                          {"Review each post before it's published"}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Navigation */}
          {!isPublishing && (
            <div className="mt-8 flex items-center justify-between">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={currentStep === 3 && !postsGenerated}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handlePublish} disabled={isPublishing}>
                  {isPublishing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Campaign
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
