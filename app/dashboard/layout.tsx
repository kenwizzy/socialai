"use client"

import React from "react"

import { useState } from "react"
import { AppSidebar } from "@/components/app/app-sidebar"
import { TopNav } from "@/components/app/top-nav"
import { MobileNav } from "@/components/app/mobile-nav"
import { AIAssistantPanel } from "@/components/app/ai-assistant-panel"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <AppSidebar className="hidden lg:flex" />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <AppSidebar className="fixed left-0 top-0 z-50 lg:hidden" />
        </>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <TopNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className={cn("flex-1 overflow-y-auto p-4 pb-20 lg:p-6 lg:pb-6")}>
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* AI Assistant Panel */}
      <AIAssistantPanel />
    </div>
  )
}
