'use client'

import Link from 'next/link'
import Image from 'next/image'
import Hamburger from './hamburger'
import { Button } from '../ui/button'
import AuthModal from '../auth/auth-modal'
import { useEffect, useState } from 'react'
import { CircleUserRound, LogOut } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useSessionStatus } from '@/lib/hooks/useSessionStatus'
import { toast } from 'sonner'
import CustomToast from '../custom-toast/custom-toast'

const Header = () => {
  const supabase = createClient()

  const [isAuthModalOpen, setAuthModalOpen] = useState(false)

  const { displayName, isLoggedIn, isSessionLoading } = useSessionStatus()

  // TODO: some decent error handling here
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      sessionStorage.removeItem('hasWelcomed')
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

  const handleAuthModalClose = (open: boolean) => {
    setAuthModalOpen(open)
  }

  useEffect(() => {
    const alreadyWelcomed = sessionStorage.getItem('hasWelcomed')

    if (isLoggedIn && displayName && !alreadyWelcomed) {
      toast(
        <CustomToast
          message={`Welcome${displayName ? `, ${displayName}` : ''}!`}
          color="bg-success-500"
        />,
        { unstyled: true }
      )
      sessionStorage.setItem('hasWelcomed', 'true')
    }
  }, [isLoggedIn, displayName])

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
      <Hamburger onSignInClick={openAuthModal} onSignOutClick={signOut} />
      <ul className="text-2xl font-heading italic font-bold justify-between text-primary-500 items-center hidden sm:flex md:w-lg w-md">
        <li>
          <Link href="/search" className="hover:underline">
            Explore
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link href="/library" className="hover:underline">
              My library
            </Link>
          </li>
        )}
        <li>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </li>
      </ul>

      {isSessionLoading ? (
        <div className="h-10 w-20" /> // prevent layout shift
      ) : isLoggedIn ? (
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
                {displayName || 'Reader'}
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
