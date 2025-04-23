'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import CustomToast from '@/components/custom-toast/custom-toast'
import Link from 'next/link'

const ResetPasswordPage = () => {
  const router = useRouter()
  const supabase = createClient()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session?.user) {
        setError('You must be signed in to reset your password.')
      } else {
        setUserEmail(session.user.email ?? null)
      }
    }

    fetchUser()
  }, [supabase])

  const handlePasswordReset = async () => {
    setError(null)

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      console.error(error.message)
      setError('Failed to reset password.')
      toast(
        <CustomToast
          message="Failed to reset password."
          color="bg-danger-500"
        />,
        { unstyled: true }
      )
    } else {
      toast(
        <CustomToast
          message="Password reset successfully!"
          color="bg-success-500"
        />,
        { unstyled: true }
      )
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }

    setIsSubmitting(false)
  }

  if (error) {
    return (
      <div className="py-64 bg-background-300 flex flex-col items-center justify-center">
        <p className="text-danger-500 font-bold">{error}</p>
        <Link href="/" className="hover:underline">
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <article className="py-40 bg-background-400 flex items-center justify-center">
      <div className="p-8 max-w-md mx-auto bg-background-50 rounded-md shadow-md">
        <h1 className="font-heading font-bold italic text-2xl text-primary-500 text-center mb-4">
          Reset your password
        </h1>
        <div className="text-center mb-6 text-sm text-secondary-500">
          <p>
            {userEmail
              ? `You're securely signed in as ${userEmail}.`
              : `You're securely signed in.`}
          </p>
          <p>You can now choose a new password below.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handlePasswordReset()
          }}
          className="flex flex-col gap-4"
        >
          <label htmlFor="password" className="sr-only">
            Enter new password
          </label>
          <Input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-background-200"
            id="password"
            aria-label="Enter new password"
          />
          <label htmlFor="repeat-password" className="sr-only">
            Repeat new password
          </label>
          <Input
            type="password"
            placeholder="Repeat new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-background-200"
            id="repeat-password"
            aria-label="Repeat new password"
          />
          {error && <p className="text-sm text-danger-600">{error}</p>}
          <Button
            type="submit"
            disabled={isSubmitting || !newPassword || !confirmPassword}
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </article>
  )
}

export default ResetPasswordPage
