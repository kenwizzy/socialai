"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthCard } from "@/components/auth/auth-card"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate password reset - in production, this would call an auth API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <AuthCard
        title="Check your email"
        description={`We've sent a password reset link to ${email}`}
      >
        <div className="flex flex-col items-center py-6">
          <div className="mb-4 rounded-full bg-accent/10 p-4">
            <CheckCircle className="h-8 w-8 text-accent" />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {"Didn't receive the email? Check your spam folder or"}
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="mt-2 text-sm font-medium text-primary hover:underline"
          >
            try another email address
          </button>
        </div>

        <Link
          href="/login"
          className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Reset your password"
      description="Enter your email and we'll send you a reset link"
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </AuthCard>
  )
}
