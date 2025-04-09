import Link from 'next/link'

const HomeScreen = () => {
  return (
    <article className="max-w-[1280px] bg-background-50 mx-4 md:mx-8 flex flex-col gap-8 p-4 rounded-xl shadow-md">
      <h1 className="font-heading font-bold italic text-5xl text-primary-500 text-center">
        Welcome to The BiblioNest!
      </h1>
      <p className="">
        Curl up and get lost in your very own library. Here, you can search for
        books, build your nest of favourites, and keep track of what you’re
        reading—or dreaming of reading—because your bookshelf shouldn’t be
        beholden to a retail giant or a data empire.
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
    </article>
  )
}

export default HomeScreen
