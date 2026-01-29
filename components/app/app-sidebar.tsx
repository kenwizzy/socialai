"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sparkles,
  LayoutDashboard,
  Megaphone,
  PenTool,
  Calendar,
  Inbox,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/dashboard/content-studio", label: "Content Studio", icon: PenTool },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/inbox", label: "Inbox", icon: Inbox },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
]

const bottomNavItems = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "#", label: "Help & Support", icon: HelpCircle },
]

interface AppSidebarProps {
  className?: string
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold text-sidebar-foreground">SocialAI</span>
      </div>

      {/* Business Selector */}
      <div className="border-b border-sidebar-border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-lg bg-sidebar-accent px-3 py-2 text-left transition-colors hover:bg-sidebar-accent/80">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  AB
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  Acme Business
                </p>
                <p className="truncate text-xs text-muted-foreground">Business Plan</p>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>
              <Avatar className="mr-2 h-6 w-6">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  AB
                </AvatarFallback>
              </Avatar>
              Acme Business
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Avatar className="mr-2 h-6 w-6">
                <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                  SC
                </AvatarFallback>
              </Avatar>
              Side Project Co
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-sidebar-border p-4">
        <ul className="space-y-1">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
