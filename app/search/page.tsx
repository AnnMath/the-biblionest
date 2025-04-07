import Search from '@/components/search'
import Image from 'next/image'

const SearchPage = () => {
  return (
    <>
      <article className="p-6 bg-background-300 w-full min-h-screen">
        <h1 className="text-5xl font-bold font-heading italic text-center">
          Explore the stacks
        </h1>
        <p className="my-6 max-w-lg mx-auto">
          Search for books, discover new favourites, and add them to your
          personal library. Whether you're building a to-be-read list or
          revisiting old classics, start your next literary adventure here.
        </p>
        <div className="flex mx-auto justify-center mb-6">
          <Image
            src="/decoration-1.svg"
            alt=""
            width={200}
            height={100}
            className=""
          />
        </div>
        <Search />
      </article>
    </>
  )
}

export default SearchPage
