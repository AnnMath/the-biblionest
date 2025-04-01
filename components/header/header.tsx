import Link from 'next/link'
import Image from 'next/image'
import Hamburger from './hamburger'

const Header = () => {
  return (
    <nav className="bg-background-500 flex justify-between p-4 shadow-slate-900">
      <Link href="/">
        <Image
          src="/biblionest-logo.svg"
          alt="The BiblioNest logo"
          width={200}
          height={200}
          className="w-24 h-24"
        />
      </Link>
      <Hamburger />
    </nav>
  )
}

export default Header
