import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SocialAI - AI-Powered Social Media Campaign Manager',
  description: 'Run smarter social media campaigns with AI. Create, publish, and track campaigns in minutes.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}

         {/* Global toast container – place it here so it's available everywhere */}
        <ToastContainer
          position="top-right"          // ← top-right corner
          autoClose={5000}              // disappear after 5 seconds (5000 ms)
          hideProgressBar={false}       // shows progress bar (can set true to hide)
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"                 // or "dark" / "colored"
          // Optional: limit number of visible toasts
          // limit={3}
        />

        <Analytics />
      </body>
    </html>
  )
}
