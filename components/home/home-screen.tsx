import Link from 'next/link'
import BookOrnamentTop from '../ornaments/book-ornament-top'
import BookOrnamentBottom from '../ornaments/book-ornament-bottom'

const HomeScreen = () => {
  return (
    <article className="max-w-[1280px] bg-background-50 sm:mx-8 p-2 rounded-xl shadow-md">
      <BookOrnamentTop />
      <section className="flex flex-col gap-8 py-8 md:p-8">
        <h1 className="font-heading font-bold italic text-5xl text-primary-500 text-center">
          Welcome to The BiblioNest!
        </h1>
        <p className="">
          Curl up and get lost in your very own library. Here, you can search
          for books, build your nest of favourites, and keep track of what
          you’re reading—or dreaming of reading—because your bookshelf shouldn’t
          be beholden to a retail giant or a data empire.
        </p>
        <p className="">
          All book data comes from the wonderful folks at{' '}
          <Link
            href="https://openlibrary.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 hover:text-accent-500 hover:underline"
          >
            Open Library
          </Link>
          , a project of the Internet Archive working to create{' '}
          <em>one web page for every book ever published</em>.
        </p>
      </section>
      <BookOrnamentBottom />
    </article>
  )
}

export default HomeScreen
