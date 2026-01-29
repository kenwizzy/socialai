"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Lightbulb,
  PenTool,
  TrendingUp,
  Clock,
  ImageIcon,
  Hash,
  User,
  Bot,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const quickActions = [
  {
    icon: PenTool,
    label: "Generate Post",
    description: "Create engaging social media content",
    prompt: "Help me write a social media post about",
  },
  {
    icon: Lightbulb,
    label: "Content Ideas",
    description: "Get creative content suggestions",
    prompt: "Give me 5 content ideas for",
  },
  {
    icon: TrendingUp,
    label: "Analyze Performance",
    description: "Get insights on your content",
    prompt: "Analyze my recent post performance and suggest improvements",
  },
  {
    icon: Clock,
    label: "Best Times to Post",
    description: "Optimize your posting schedule",
    prompt: "What are the best times to post on Instagram for my audience?",
  },
  {
    icon: Hash,
    label: "Hashtag Strategy",
    description: "Find relevant hashtags",
    prompt: "Suggest hashtags for a post about",
  },
  {
    icon: ImageIcon,
    label: "Image Suggestions",
    description: "Get visual content ideas",
    prompt: "What kind of images should I use for a post about",
  },
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hi! I'm your AI Social Media Assistant. I can help you create content, analyze performance, suggest posting times, and much more. What would you like to work on today?",
    timestamp: new Date(),
  },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        {
          content: `Great question! Here's my suggestion for "${messageText.slice(0, 50)}...":\n\nBased on your brand voice and current trends, I recommend focusing on authenticity and engagement. Here are some key points:\n\n1. **Start with a hook** - Use a question or bold statement to grab attention\n2. **Keep it concise** - Optimal length is 125-150 characters for Instagram\n3. **Include a CTA** - Ask your audience to engage\n4. **Use relevant hashtags** - Mix popular and niche tags\n\nWould you like me to generate a specific post draft?`,
          suggestions: [
            "Generate a draft post",
            "Give me hashtag suggestions",
            "What about carousel ideas?",
          ],
        },
        {
          content: `I've analyzed your request and here's what I found:\n\n**Content Strategy Insight:**\n\nYour audience is most active between 9-11 AM and 7-9 PM EST. Posts with questions receive 42% more engagement.\n\n**Recommendations:**\n- Use more video content (trending up 23%)\n- Post stories daily for visibility\n- Engage with comments within first hour\n\nWant me to create a weekly content plan based on these insights?`,
          suggestions: [
            "Create content plan",
            "Show me competitor analysis",
            "Optimize my bio",
          ],
        },
      ];

      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt + " ");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">AI Assistant</h1>
            <p className="text-sm text-muted-foreground">Your intelligent social media companion</p>
          </div>
        </div>
        <Badge variant="outline" className="border-primary/50 text-primary">
          <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500" />
          Online
        </Badge>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat Area */}
        <div className="flex flex-1 flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-3xl space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-4",
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback
                      className={cn(
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-gradient-to-br from-primary to-accent text-white"
                      )}
                    >
                      {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "max-w-[80%] space-y-3",
                      message.role === "user" ? "items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border"
                      )}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                    </div>
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <ThumbsUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <ThumbsDown className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <RefreshCw className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs bg-transparent"
                            onClick={() => handleSend(suggestion)}
                          >
                            {suggestion}
                            <ChevronRight className="ml-1 h-3 w-3" />
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl border border-border bg-card px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="mx-auto max-w-3xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-3"
              >
                <Input
                  placeholder="Ask me anything about social media marketing..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={!input.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                AI can make mistakes. Always review suggestions before publishing.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="hidden w-80 border-l border-border bg-card/50 p-4 lg:block">
          <h3 className="mb-4 font-medium text-foreground">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => handleQuickAction(action.prompt)}
                className="flex w-full items-start gap-3 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-secondary"
              >
                <div className="rounded-lg bg-primary/10 p-2">
                  <action.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  Pro Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Be specific in your requests for better results. Include details like your
                  industry, target audience, and desired tone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
