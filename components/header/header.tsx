'use client'

import Link from 'next/link'
import Image from 'next/image'
import Hamburger from './hamburger'
import { Button } from '../ui/button'
import AuthModal from '../auth/auth-modal'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Profile } from '@/interfaces'
import { CircleUserRound, LogOut } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const Header = () => {
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
      }
    } catch (err) {
      console.error('Unexpected error during sign out:', err)
    }
  }

  const openAuthModal = () => {
    setAuthModalOpen(true)
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
          {/* TODO: Link to profile */}
          <Button
            size="sm"
            variant="link"
            className="hidden sm:inline-flex cursor-pointer"
            onClick={signOut}
          >
            <LogOut /> Log out
          </Button>
          <span className="text-primary-600 text-sm">
            Hi, {profile.display_name || 'Reader'}!
          </span>
        </div>
      ) : (
        <Button
          size="sm"
          variant="link"
          className="hidden sm:inline-flex self-start cursor-pointer"
          onClick={openAuthModal}
        >
          <CircleUserRound /> Log in
        </Button>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={(open) => {
          setAuthModalOpen(open)
          if (!open) {
            // Refresh profile after modal closes (in case of successful login)
            fetchProfile()
          }
        }}
      />
    </nav>
  )
}

export default Header
