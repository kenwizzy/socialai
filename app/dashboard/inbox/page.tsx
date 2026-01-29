// app/dashboard/inbox/page.tsx
// SERVER COMPONENT — no 'use client'

import { Suspense } from 'react'
import InboxClient from './InboxClient'

export default function InboxPage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <Suspense fallback={
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading inbox...</p>
          </div>
        </div>
      }>
        <InboxClient />
      </Suspense>
    </div>
  )
}