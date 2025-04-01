import Link from 'next/link'
import Image from 'next/image'
import Hamburger from './hamburger'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <nav className="bg-background-500 flex justify-between p-4 sm:px-8 shadow-slate-900 items-center">
      <Link href="/">
        <Image
          src="/biblionest-logo.svg"
          alt="The BiblioNest logo"
          width={200}
          height={200}
          className="w-24 h-24 sm:w-36 sm:h-36"
        />
      </Link>
      <Hamburger />
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
      <Button className="hidden sm:block">Sign in</Button>
    </nav>
  )
}

export default Header
