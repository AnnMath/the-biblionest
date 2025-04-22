import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <article className="bg-secondary-500 p-4 sm:px-8  min-h-64 flex flex-col justify-between">
      <section className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center gap-4 md:gap-0">
        <Link href="/">
          <Image
            src="/biblionest-logo-light.svg"
            alt="the BiblioNest logo"
            height={200}
            width={200}
            className="w-24 h-24 sm:w-36 sm:h-36"
          />
        </Link>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold italic">
          The BiblioNest. Your personal library.
        </h2>
        <section className="flex flex-col gap-4 justify-between text-left">
          <Link href="/search">Explore</Link>
          <Link href="/library">Library</Link>
          <Link href="/about">About</Link>
        </section>
      </section>
      <p className="text-sm text-center mt-8 md:mt-0">
        &copy; 2025 Ann Mathenge
      </p>
    </article>
  )
}

export default Footer
