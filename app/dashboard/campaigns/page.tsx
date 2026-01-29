// app/dashboard/campaigns/page.tsx
// This file is a SERVER COMPONENT (no 'use client')

import { Suspense } from 'react'
import CampaignsClient from './campaignsClient'

export const dynamic = 'force-dynamic'     // optional – only if you really need always-fresh data
// or leave it out → Next.js will try to static render (recommended)

export default function CampaignsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Suspense fallback={<div className="py-12 text-center">Loading campaigns...</div>}>
        <CampaignsClient />
      </Suspense>
    </div>
  )
}