'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import CustomToast from '@/components/custom-toast/custom-toast'
import Link from 'next/link'

const ForgotPasswordPage = () => {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleResetRequest = async () => {
    if (!email) return

    setIsSubmitting(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://the-biblionest.vercel.app/auth/reset-password',
    })

    if (error) {
      console.error(error.message)
      toast(
        <CustomToast
          message="Something went wrong. Try again later."
          color="bg-danger-500"
        />,
        { unstyled: true }
      )
    } else {
      toast(
        <CustomToast
          message="Check your inbox for a reset link!"
          color="bg-success-500"
        />,
        { unstyled: true }
      )
    }

    setIsSubmitting(false)
  }

  return (
    <article className="py-40 bg-background-400 flex items-center justify-center">
      <div className="p-8 max-w-md mx-auto bg-background-50 rounded-md shadow-md">
        <h1 className="font-heading font-bold italic text-2xl text-primary-500 text-center mb-4">
          Forgot your password?
        </h1>
        <p className="text-center text-sm mb-6">
          Enter your email and we’ll send you a link to reset it.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleResetRequest()
          }}
          className="flex flex-col gap-4"
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <Input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background-200"
          />
          <Button type="submit" disabled={isSubmitting || !email}>
            {isSubmitting ? 'Sending...' : 'Send reset link'}
          </Button>
          <Link
            href="/"
            className="text-sm text-center text-primary-500 hover:underline"
          >
            Back to home
          </Link>
        </form>
      </div>
    </article>
  )
}

export default ForgotPasswordPage
