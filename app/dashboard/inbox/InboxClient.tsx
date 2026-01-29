// app/dashboard/inbox/InboxClient.tsx
'use client'

import { useState } from "react"
import {
  MessageSquare,
  Heart,
  AtSign,
  Share2,
  Search,
  CheckCheck,
  Reply,
  Star,
  Archive,
  Trash2,
  MoreHorizontal,
  Sparkles,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"

// ────────────────────────────────────────────────
// Types & mock data (same as yours)

type MessageType = "comment" | "mention" | "like" | "share" | "dm"

interface Message {
  id: string
  type: MessageType
  platform: "instagram" | "twitter" | "facebook" | "linkedin"
  user: {
    name: string
    handle: string
    avatar: string
  }
  content: string
  postPreview?: string
  timestamp: string
  isRead: boolean
  isStarred: boolean
  sentiment?: "positive" | "neutral" | "negative"
}

const messages: Message[] = [ /* your messages array — copy from original */ ]

const aiReplySuggestions = [ /* your suggestions — copy from original */ ]

// ────────────────────────────────────────────────
// Helper components (copy from your code)

function MessageIcon({ type }: { type: MessageType }) {
  const icons = {
    comment: MessageSquare,
    mention: AtSign,
    like: Heart,
    share: Share2,
    dm: MessageSquare,
  }
  const Icon = icons[type]
  return <Icon className="h-4 w-4" />
}

function PlatformBadge({ platform }: { platform: Message["platform"] }) {
  const colors = {
    instagram: "bg-pink-500/20 text-pink-400",
    twitter: "bg-sky-500/20 text-sky-400",
    facebook: "bg-blue-500/20 text-blue-400",
    linkedin: "bg-blue-600/20 text-blue-300",
  }

  return (
    <Badge variant="outline" className={cn("text-xs capitalize", colors[platform])}>
      {platform}
    </Badge>
  )
}

function SentimentIndicator({ sentiment }: { sentiment?: Message["sentiment"] }) {
  if (!sentiment) return null

  const colors = {
    positive: "bg-green-500",
    neutral: "bg-yellow-500",
    negative: "bg-red-500",
  }

  return <div className={cn("h-2 w-2 rounded-full", colors[sentiment])} title={`${sentiment} sentiment`} />
}

// ────────────────────────────────────────────────
// Main client component

export default function InboxClient() {
  const searchParams = useSearchParams()

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(messages[0] ?? null)
  const [activeTab, setActiveTab] = useState("all")
  const [replyText, setReplyText] = useState("")
  const [showAiSuggestions, setShowAiSuggestions] = useState(false)

  const filteredMessages = messages.filter((msg) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !msg.isRead
    if (activeTab === "starred") return msg.isStarred
    return msg.type === activeTab
  })

  const unreadCount = messages.filter((m) => !m.isRead).length

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Unified Inbox</h1>
          <p className="text-sm text-muted-foreground">
            {unreadCount} unread messages across all platforms
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Message List */}
        <div className="w-full border-r border-border md:w-96">
          <div className="border-b border-border p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-border px-4">
              <TabsList className="h-auto w-full justify-start gap-1 bg-transparent p-0">
                <TabsTrigger value="all" className="data-[state=active]:bg-secondary">
                  All
                </TabsTrigger>
                <TabsTrigger value="unread" className="data-[state=active]:bg-secondary">
                  Unread
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="starred" className="data-[state=active]:bg-secondary">
                  Starred
                </TabsTrigger>
                <TabsTrigger value="dm" className="data-[state=active]:bg-secondary">
                  DMs
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="h-[calc(100vh-16rem)] overflow-y-auto">
                {filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    type="button"
                    onClick={() => setSelectedMessage(message)}
                    className={cn(
                      "w-full border-b border-border p-4 text-left transition-colors hover:bg-secondary/50",
                      selectedMessage?.id === message.id && "bg-secondary",
                      !message.isRead && "bg-primary/5"
                    )}
                  >
                    {/* Message row content — same as your original */}
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {message.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "truncate text-sm",
                              !message.isRead ? "font-semibold text-foreground" : "text-foreground"
                            )}
                          >
                            {message.user.name}
                          </span>
                          <SentimentIndicator sentiment={message.sentiment} />
                          {message.isStarred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MessageIcon type={message.type} />
                          <span className="capitalize">{message.type}</span>
                          <span>·</span>
                          <PlatformBadge platform={message.platform} />
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{message.content}</p>
                        <span className="mt-1 text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Message Detail — same as your original */}
        {selectedMessage ? (
          <div className="hidden flex-1 flex-col md:flex">
            {/* Header, content, reply section — copy your original code here */}
            {/* ... paste the entire selectedMessage block ... */}
          </div>
        ) : (
          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 font-medium text-foreground">Select a message</h3>
              <p className="text-sm text-muted-foreground">Choose a message to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}