"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sparkles,
  Instagram,
  Facebook,
  Twitter,
  Hash,
  Smile,
  RefreshCw,
  Calendar,
  Copy,
  ImageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const tones = [
  { id: "friendly", label: "Friendly" },
  { id: "professional", label: "Professional" },
  { id: "playful", label: "Playful" },
  { id: "urgent", label: "Urgent" },
]

const suggestedHashtags = [
  "#marketing",
  "#smallbusiness",
  "#entrepreneur",
  "#businesstips",
  "#socialmedia",
  "#branding",
]

const emojis = ["🎉", "✨", "🚀", "💪", "🔥", "💡", "❤️", "👏", "🎯", "💫", "⭐", "🌟"]

export default function ContentStudioPage() {
  const [caption, setCaption] = useState("")
  const [selectedTone, setSelectedTone] = useState("friendly")
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [activePlatform, setActivePlatform] = useState("instagram")
  const [isGenerating, setIsGenerating] = useState(false)

  const addHashtag = (tag: string) => {
    if (!selectedHashtags.includes(tag)) {
      setSelectedHashtags([...selectedHashtags, tag])
    }
  }

  const removeHashtag = (tag: string) => {
    setSelectedHashtags(selectedHashtags.filter((t) => t !== tag))
  }

  const addEmoji = (emoji: string) => {
    setCaption(caption + emoji)
  }

  const generateCaption = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setCaption(
      "Ready to take your business to the next level? Our latest tips and strategies will help you stand out from the competition. Tap the link in bio to learn more!"
    )
    setIsGenerating(false)
  }

  const characterCount = caption.length
  const maxCharacters = activePlatform === "twitter" ? 280 : 2200

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Content Studio</h1>
        <p className="mt-1 text-muted-foreground">
          Create and edit content with AI assistance
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* AI Controls - Left Panel */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">AI Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tone</Label>
                <Select value={selectedTone} onValueChange={setSelectedTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((tone) => (
                      <SelectItem key={tone.id} value={tone.id}>
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full"
                onClick={generateCaption}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Caption
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Hashtag Helper */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Hash className="h-4 w-4" />
                Hashtags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {suggestedHashtags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      selectedHashtags.includes(tag)
                        ? removeHashtag(tag)
                        : addHashtag(tag)
                    }
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                      selectedHashtags.includes(tag)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emoji Picker */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Smile className="h-4 w-4" />
                Emojis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => addEmoji(emoji)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-lg transition-colors hover:bg-secondary"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Caption Editor - Center */}
        <div className="lg:col-span-5">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">Caption Editor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Write your caption here or use AI to generate one..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="min-h-[300px] resize-none"
              />

              {/* Selected Hashtags */}
              {selectedHashtags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedHashtags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeHashtag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span
                  className={cn(
                    "text-muted-foreground",
                    characterCount > maxCharacters && "text-destructive"
                  )}
                >
                  {characterCount} / {maxCharacters} characters
                </span>
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(caption)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Post
                </Button>
                <Button variant="outline">Add to Campaign</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Preview - Right */}
        <div className="lg:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">Preview</CardTitle>
              <Tabs value={activePlatform} onValueChange={setActivePlatform}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="instagram" className="gap-2">
                    <Instagram className="h-4 w-4" />
                    <span className="hidden sm:inline">Instagram</span>
                  </TabsTrigger>
                  <TabsTrigger value="facebook" className="gap-2">
                    <Facebook className="h-4 w-4" />
                    <span className="hidden sm:inline">Facebook</span>
                  </TabsTrigger>
                  <TabsTrigger value="twitter" className="gap-2">
                    <Twitter className="h-4 w-4" />
                    <span className="hidden sm:inline">Twitter</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {/* Mock Post Preview */}
              <div className="rounded-xl border border-border/60 bg-card">
                {/* Post Header */}
                <div className="flex items-center gap-3 border-b border-border/60 p-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Your Business</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>

                {/* Post Image Placeholder */}
                <div className="flex aspect-square items-center justify-center bg-secondary">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <ImageIcon className="h-12 w-12" />
                    <p className="mt-2 text-sm">Add an image</p>
                  </div>
                </div>

                {/* Post Caption */}
                <div className="p-4">
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {caption || "Your caption will appear here..."}
                  </p>
                  {selectedHashtags.length > 0 && (
                    <p className="mt-2 text-sm text-primary">
                      {selectedHashtags.join(" ")}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
