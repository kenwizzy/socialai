"use client";

import { useState } from "react";
import {
  MessageSquare,
  Heart,
  AtSign,
  Share2,
  Search,
  Filter,
  CheckCheck,
  Reply,
  Star,
  Archive,
  Trash2,
  MoreHorizontal,
  Sparkles,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type MessageType = "comment" | "mention" | "like" | "share" | "dm";

interface Message {
  id: string;
  type: MessageType;
  platform: "instagram" | "twitter" | "facebook" | "linkedin";
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  postPreview?: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  sentiment?: "positive" | "neutral" | "negative";
}

const messages: Message[] = [
  {
    id: "1",
    type: "comment",
    platform: "instagram",
    user: {
      name: "Sarah Johnson",
      handle: "@sarahj",
      avatar: "",
    },
    content: "Love this product! Where can I get one? Been looking for something like this for months.",
    postPreview: "Introducing our new summer collection...",
    timestamp: "5 min ago",
    isRead: false,
    isStarred: false,
    sentiment: "positive",
  },
  {
    id: "2",
    type: "mention",
    platform: "twitter",
    user: {
      name: "Tech Review Hub",
      handle: "@techreviewhub",
      avatar: "",
    },
    content: "Great experience with @yourbrand customer service today! Highly recommend.",
    timestamp: "15 min ago",
    isRead: false,
    isStarred: true,
    sentiment: "positive",
  },
  {
    id: "3",
    type: "dm",
    platform: "instagram",
    user: {
      name: "Mike Chen",
      handle: "@mikechen",
      avatar: "",
    },
    content: "Hi! I have a question about the return policy for my recent order #12345.",
    timestamp: "32 min ago",
    isRead: false,
    isStarred: false,
    sentiment: "neutral",
  },
  {
    id: "4",
    type: "comment",
    platform: "facebook",
    user: {
      name: "Emily Roberts",
      handle: "Emily Roberts",
      avatar: "",
    },
    content: "Still waiting for my order. It's been 2 weeks. Not happy with the delay.",
    postPreview: "Our warehouse is working hard...",
    timestamp: "1 hour ago",
    isRead: true,
    isStarred: false,
    sentiment: "negative",
  },
  {
    id: "5",
    type: "like",
    platform: "linkedin",
    user: {
      name: "David Park",
      handle: "David Park",
      avatar: "",
    },
    content: "liked your post",
    postPreview: "Excited to announce our Q4 growth...",
    timestamp: "2 hours ago",
    isRead: true,
    isStarred: false,
    sentiment: "positive",
  },
  {
    id: "6",
    type: "share",
    platform: "twitter",
    user: {
      name: "Marketing Pro",
      handle: "@marketingpro",
      avatar: "",
    },
    content: "Retweeted your post with comment: 'This is exactly what small businesses need!'",
    timestamp: "3 hours ago",
    isRead: true,
    isStarred: true,
    sentiment: "positive",
  },
];

const aiReplySuggestions = [
  "Thank you so much for your kind words! You can find it on our website at [link]. Let me know if you have any questions!",
  "We appreciate your support! The product is available in our online store. Would you like me to share a direct link?",
  "Thanks for reaching out! I'd be happy to help you get one. Check out our website or I can DM you the details!",
];

function MessageIcon({ type }: { type: MessageType }) {
  const icons = {
    comment: MessageSquare,
    mention: AtSign,
    like: Heart,
    share: Share2,
    dm: MessageSquare,
  };
  const Icon = icons[type];
  return <Icon className="h-4 w-4" />;
}

function PlatformBadge({ platform }: { platform: Message["platform"] }) {
  const colors = {
    instagram: "bg-pink-500/20 text-pink-400",
    twitter: "bg-sky-500/20 text-sky-400",
    facebook: "bg-blue-500/20 text-blue-400",
    linkedin: "bg-blue-600/20 text-blue-300",
  };

  return (
    <Badge variant="outline" className={cn("text-xs capitalize", colors[platform])}>
      {platform}
    </Badge>
  );
}

function SentimentIndicator({ sentiment }: { sentiment?: Message["sentiment"] }) {
  if (!sentiment) return null;

  const colors = {
    positive: "bg-green-500",
    neutral: "bg-yellow-500",
    negative: "bg-red-500",
  };

  return <div className={cn("h-2 w-2 rounded-full", colors[sentiment])} title={`${sentiment} sentiment`} />;
}

function Loading() {
  return null;
}

export default function InboxPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(messages[0]);
  const [activeTab, setActiveTab] = useState("all");
  const [replyText, setReplyText] = useState("");
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const searchParams = useSearchParams();

  const filteredMessages = messages.filter((msg) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !msg.isRead;
    if (activeTab === "starred") return msg.isStarred;
    return msg.type === activeTab;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex h-[calc(100vh-4rem)] flex-col">
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

          {/* Message Detail */}
          {selectedMessage ? (
            <div className="hidden flex-1 flex-col md:flex">
              <div className="flex items-center justify-between border-b border-border p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedMessage.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {selectedMessage.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{selectedMessage.user.name}</h3>
                      <PlatformBadge platform={selectedMessage.platform} />
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedMessage.user.handle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(selectedMessage.isStarred && "text-yellow-400")}
                  >
                    <Star className={cn("h-4 w-4", selectedMessage.isStarred && "fill-yellow-400")} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Mark as Spam</DropdownMenuItem>
                      <DropdownMenuItem>Block User</DropdownMenuItem>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="mx-auto max-w-2xl space-y-6">
                  {selectedMessage.postPreview && (
                    <div className="rounded-lg border border-border bg-secondary/30 p-4">
                      <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                        Original Post
                      </p>
                      <p className="text-sm text-foreground">{selectedMessage.postPreview}</p>
                    </div>
                  )}

                  <div className="rounded-lg border border-border bg-card p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <MessageIcon type={selectedMessage.type} />
                      <span className="text-sm capitalize text-muted-foreground">
                        {selectedMessage.type === "dm" ? "Direct Message" : selectedMessage.type}
                      </span>
                      <span className="text-sm text-muted-foreground">·</span>
                      <span className="text-sm text-muted-foreground">{selectedMessage.timestamp}</span>
                      {selectedMessage.sentiment && (
                        <>
                          <span className="text-sm text-muted-foreground">·</span>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs capitalize",
                              selectedMessage.sentiment === "positive" && "border-green-500/50 text-green-400",
                              selectedMessage.sentiment === "neutral" && "border-yellow-500/50 text-yellow-400",
                              selectedMessage.sentiment === "negative" && "border-red-500/50 text-red-400"
                            )}
                          >
                            {selectedMessage.sentiment}
                          </Badge>
                        </>
                      )}
                    </div>
                    <p className="text-foreground">{selectedMessage.content}</p>
                  </div>
                </div>
              </div>

              {/* Reply Section */}
              <div className="border-t border-border p-4">
                <div className="mx-auto max-w-2xl">
                  {showAiSuggestions && (
                    <div className="mb-4 rounded-lg border border-primary/30 bg-primary/5 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">AI-Suggested Replies</span>
                      </div>
                      <div className="space-y-2">
                        {aiReplySuggestions.map((suggestion, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setReplyText(suggestion);
                              setShowAiSuggestions(false);
                            }}
                            className="w-full rounded-lg border border-border bg-card p-3 text-left text-sm text-foreground transition-colors hover:bg-secondary"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Input
                        placeholder="Type your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-primary"
                        onClick={() => setShowAiSuggestions(!showAiSuggestions)}
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button>
                      <Send className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
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
    </Suspense>
  );
}
