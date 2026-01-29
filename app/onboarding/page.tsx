"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Building2, Palette, Share2, Target, ArrowRight, ArrowLeft, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "Business Info", icon: Building2 },
  { id: 2, title: "Brand Voice", icon: Palette },
  { id: 3, title: "Social Accounts", icon: Share2 },
  { id: 4, title: "Goals", icon: Target },
]

const businessTypes = [
  "Retail / E-commerce",
  "Restaurant / Hospitality",
  "Professional Services",
  "Health & Wellness",
  "Creative Agency",
  "Technology",
  "Non-profit",
  "Other",
]

const tones = [
  { id: "friendly", label: "Friendly", description: "Warm, approachable, conversational" },
  { id: "professional", label: "Professional", description: "Formal, trustworthy, authoritative" },
  { id: "playful", label: "Playful", description: "Fun, energetic, casual" },
]

const platforms = [
  { id: "instagram", name: "Instagram", connected: false },
  { id: "facebook", name: "Facebook", connected: false },
  { id: "twitter", name: "Twitter / X", connected: false },
  { id: "linkedin", name: "LinkedIn", connected: false },
]

const goals = [
  { id: "sales", label: "Drive Sales", description: "Increase conversions and revenue" },
  { id: "awareness", label: "Brand Awareness", description: "Reach new audiences" },
  { id: "engagement", label: "Boost Engagement", description: "Build community and loyalty" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    city: "",
    country: "",
    tone: "",
    brandKeywords: [] as string[],
    primaryColor: "#8b5cf6",
    connectedPlatforms: [] as string[],
    goal: "",
    postingFrequency: 3,
  })

  const [keywordInput, setKeywordInput] = useState("")

  const addKeyword = () => {
    if (keywordInput.trim() && formData.brandKeywords.length < 5) {
      setFormData({
        ...formData,
        brandKeywords: [...formData.brandKeywords, keywordInput.trim()],
      })
      setKeywordInput("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      brandKeywords: formData.brandKeywords.filter((k) => k !== keyword),
    })
  }

  const togglePlatform = (platformId: string) => {
    if (formData.connectedPlatforms.includes(platformId)) {
      setFormData({
        ...formData,
        connectedPlatforms: formData.connectedPlatforms.filter((p) => p !== platformId),
      })
    } else {
      setFormData({
        ...formData,
        connectedPlatforms: [...formData.connectedPlatforms, platformId],
      })
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    // Simulate saving - in production, this would save to a database
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold text-foreground">SocialAI</span>
          </Link>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                      currentStep > step.id
                        ? "border-accent bg-accent text-accent-foreground"
                        : currentStep === step.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-secondary text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-xs font-medium",
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "mx-2 h-0.5 w-16 sm:w-24",
                      currentStep > step.id ? "bg-accent" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-xl">
          {/* Step 1: Business Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Tell us about your business</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {"This helps us personalize your experience"}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Acme Inc."
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="United States"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Brand Voice */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Define your brand voice</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {"Help AI understand how your brand communicates"}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Tone</Label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {tones.map((tone) => (
                      <button
                        key={tone.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, tone: tone.id })}
                        className={cn(
                          "rounded-xl border p-4 text-left transition-all",
                          formData.tone === tone.id
                            ? "border-primary bg-primary/5"
                            : "border-border/60 hover:border-primary/40"
                        )}
                      >
                        <span className="font-medium text-foreground">{tone.label}</span>
                        <p className="mt-1 text-xs text-muted-foreground">{tone.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Brand Keywords (up to 5)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="keywords"
                      placeholder="Add a keyword..."
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addKeyword()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addKeyword}>
                      Add
                    </Button>
                  </div>
                  {formData.brandKeywords.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.brandKeywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="gap-1">
                          {keyword}
                          <button
                            type="button"
                            onClick={() => removeKeyword(keyword)}
                            className="ml-1 hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Brand Color (Optional)</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      id="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="h-10 w-10 cursor-pointer rounded border-0 bg-transparent"
                    />
                    <Input
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-28"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Social Connections */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Connect your accounts</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {"You can skip this and connect accounts later"}
                </p>
              </div>

              <div className="space-y-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => togglePlatform(platform.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border p-4 transition-all",
                      formData.connectedPlatforms.includes(platform.id)
                        ? "border-accent bg-accent/5"
                        : "border-border/60 hover:border-primary/40"
                    )}
                  >
                    <span className="font-medium text-foreground">{platform.name}</span>
                    {formData.connectedPlatforms.includes(platform.id) ? (
                      <Badge className="bg-accent text-accent-foreground">Connected</Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">Click to connect</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Goals */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Set your goals</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {"What do you want to achieve with social media?"}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Primary Goal</Label>
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
                            "flex h-10 w-10 items-center justify-center rounded-full",
                            formData.goal === goal.id ? "bg-primary" : "bg-secondary"
                          )}
                        >
                          <Target
                            className={cn(
                              "h-5 w-5",
                              formData.goal === goal.id ? "text-primary-foreground" : "text-muted-foreground"
                            )}
                          />
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{goal.label}</span>
                          <p className="text-sm text-muted-foreground">{goal.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>How often do you want to post? ({formData.postingFrequency}x per week)</Label>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={formData.postingFrequency}
                    onChange={(e) => setFormData({ ...formData, postingFrequency: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1x/week</span>
                    <span>7x/week</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <Button onClick={() => setCurrentStep(currentStep + 1)}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleComplete} disabled={isLoading}>
                {isLoading ? "Setting up..." : "Launch First Campaign"}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Skip link for step 3 */}
        {currentStep === 3 && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Skip for now
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
