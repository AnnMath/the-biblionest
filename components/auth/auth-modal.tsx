import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/client'

const AuthModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: (open: boolean) => void
}) => {
  const supabase = createClient()

  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // Reset form fields
  const resetForm = () => {
    setEmail('')
    setPassword('')
    setDisplayName('')
    setError(null)
    setLoading(false)
  }

  // Handle modal close with form reset
  const handleClose = (open: boolean) => {
    if (!open) {
      resetForm()
      setIsSignUp(false)
    }
    onClose(open)
  }

  const handleAuth = async () => {
    setError(null)
    setLoading(true)

    try {
      if (isSignUp) {
        // Pass display name as metadata during signup
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: displayName || email.split('@')[0], // Use part of email as fallback
            },
          },
        })

        if (error) {
          setError(error.message)
        } else {
          // No need to manually insert into profiles table
          // The trigger will handle it automatically
          handleClose(false)
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) {
          setError(error.message)
        } else {
          handleClose(false)
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp)
    setError(null) // Clear any previous errors when switching modes
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        aria-describedby="dialog-title"
        className="max-w-sm bg-background-500"
      >
        <DialogDescription className="sr-only">
          {isSignUp ? 'Sign up' : 'Sign in'}
        </DialogDescription>
        <DialogHeader>
          <DialogTitle className="font-heading font-bold italic">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {isSignUp && (
            <Input
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-background-200"
            />
          )}
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="bg-background-200"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-background-200"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={handleAuth} disabled={loading} className="w-full">
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button
            variant="outline"
            onClick={toggleSignUp}
            className="w-full text-text-500"
            disabled={loading}
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
