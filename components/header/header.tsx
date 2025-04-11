'use client'

import Link from 'next/link'
import Image from 'next/image'
import Hamburger from './hamburger'
import { Button } from '../ui/button'
import AuthModal from '../auth/auth-modal'
import { useEffect, useState } from 'react'
import { Profile } from '@/interfaces'
import { CircleUserRound, LogOut } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

  const supabase = createClient()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Function to fetch the user profile
  const fetchProfile = async () => {
    try {
      setLoading(true)

      // Get current session
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // If no session, clear profile and return
      if (!session?.user) {
        setProfile(null)
        return
      }

      // Fetch profile data
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', session.user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error.message)
        return
      }

      if (data) {
        console.log('Profile data fetched:', data)
        setProfile(data)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    fetchProfile()

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(
        'Auth state changed:',
        _event,
        session ? 'User logged in' : 'User logged out'
      )
      fetchProfile()
    })

    // Cleanup function
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // TODO: some decent error handling here
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out:', error.message)
      } else {
        setTimeout(() => {
          router.push('/')
          router.refresh()
        }, 100) // Small delay for better UX
      }
    } catch (err) {
      console.error('Unexpected error during sign out:', err)
    }
  }

  const openAuthModal = () => {
    setAuthModalOpen(true)
  }

  const handleAuthModalClose = (open: boolean) => {
    setAuthModalOpen(open)
    if (!open) {
      // Modal closed, fetch profile to check if user is now logged in
      fetchProfile().then(() => {
        // Check if user is now logged in
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            // User just logged in, redirect to profile with a small delay
            setTimeout(() => {
              router.push('/profile')
            }, 300) // Small delay for better UX
          }
        })
      })
    }
  }

  return (
    <nav className="bg-background-500 flex justify-between p-4 sm:px-8 items-center">
      <Link href="/">
        <Image
          src="/biblionest-logo.svg"
          alt="The BiblioNest logo"
          width={200}
          height={200}
          className="w-24 h-24 sm:w-36 sm:h-36"
        />
      </Link>
      <Hamburger
        profile={profile}
        loading={loading}
        onSignInClick={openAuthModal}
        onSignOutClick={signOut}
      />
      <ul className="text-2xl font-heading italic font-bold justify-around text-primary-500 items-center hidden sm:flex w-md">
        <li>
          <Link href="/search" className="hover:underline">
            Explore
          </Link>
        </li>
        <li>
          <Link href="/library" className="hover:underline">
            Library
          </Link>
        </li>
      </ul>

      {loading ? (
        <div className="h-10 w-20"></div> // Placeholder to prevent layout shift
      ) : profile ? (
        <div className="hidden sm:flex flex-col self-start items-center gap-1">
          <Button
            size="sm"
            variant="link"
            className="hidden sm:inline-flex cursor-pointer text-primary-600"
            onClick={signOut}
          >
            <LogOut /> Log out
          </Button>
          <span className="text-primary-600">
            <Link href="/profile">
              <Button
                variant="link"
                className="cursor-pointer text-primary-600"
              >
                <CircleUserRound />
                {profile.display_name || 'Reader'}
              </Button>
            </Link>
          </span>
        </div>
      ) : (
        <Button
          size="sm"
          variant="link"
          className="hidden sm:inline-flex self-start cursor-pointer text-primary-600"
          onClick={openAuthModal}
        >
          <CircleUserRound /> Log in
        </Button>
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} />
    </nav>
  )
}

export default Header
