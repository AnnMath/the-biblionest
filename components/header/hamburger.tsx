'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui/button'

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const links = [
    { title: 'Explore', href: '/search' },
    { title: 'My Books', href: '/my-books' },
  ]

  // TODO: Sign in button should close menu, as should clicking on the links

  return (
    <>
      <button
        className="flex flex-col gap-2 justify-center"
        onClick={handleClick}
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
        <article className="w-screen h-screen gap-16 absolute z-1 top-32 left-0 pt-8 bg-secondary-500 text-text-500 text-4xl font-heading font-bold italic flex flex-col items-center p-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.title}
            </Link>
          ))}
          <Button className="bg-accent-500 rounded-sm font-heading font-bold italic text-base">
            Sign in
          </Button>
        </article>
      )}
    </>
  )
}

export default Hamburger
