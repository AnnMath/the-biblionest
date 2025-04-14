'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Profile } from '@/interfaces'
import { CircleUserRound, LogOut } from 'lucide-react'

interface HamburgerProps {
  profile: Profile | null
  loading: boolean
  onSignInClick: () => void
  onSignOutClick: () => void
}

const Hamburger = ({
  profile,
  loading,
  onSignInClick,
  onSignOutClick,
}: HamburgerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleAuthClick = () => {
    if (profile) {
      onSignOutClick()
    } else {
      onSignInClick()
    }
    // Close the menu after clicking
    setIsOpen(false)
  }

  const links = [
    { title: 'Explore', href: '/search' },
    { title: 'My library', href: '/library' },
  ]

  return (
    <>
      <button
        className="flex flex-col gap-2 justify-center sm:hidden"
        onClick={handleClick}
        aria-label={isOpen ? 'close menu' : 'open menu'}
      >
        <span
          className={`w-12 h-1 rounded-2xl bg-primary-500 transition-all duration-300 ease-out ${
            isOpen ? 'rotate-45 translate-y-3' : '-translate-y-0.5'
          }`}
        ></span>
        <span
          className={`w-12 h-1 rounded-2xl bg-primary-500 transition-all duration-300 ease-out ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        ></span>
        <span
          className={`w-12 h-1 rounded-2xl bg-primary-500 transition-all duration-300 ease-out ${
            isOpen ? '-rotate-45 -translate-y-3' : 'translate-y-0.5'
          }`}
        ></span>
      </button>
      {isOpen && (
        <article className="w-screen h-screen gap-16 absolute z-10 top-32 left-0 pt-8 bg-secondary-500 text-text-500 text-4xl font-heading font-bold italic flex flex-col items-center p-4">
          {!loading && (
            <div>
              {profile && (
                <Link href="/profile">
                  <Button
                    variant="link"
                    className="text-base"
                    onClick={handleClick}
                  >
                    <CircleUserRound /> {profile?.display_name || 'Reader'}'s
                    profile
                  </Button>
                </Link>
              )}
              <Button
                variant="link"
                className="text-base flex items-center gap-2"
                onClick={handleAuthClick}
              >
                {profile ? (
                  <>
                    <LogOut />
                    Log out
                  </>
                ) : (
                  <>
                    <CircleUserRound />
                    Log in
                  </>
                )}
              </Button>
            </div>
          )}
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </Link>
          ))}
        </article>
      )}
    </>
  )
}

export default Hamburger
