import BookOrnamentBottom from '@/components/ornaments/book-ornament-bottom'
import BookOrnamentTop from '@/components/ornaments/book-ornament-top'
import Image from 'next/image'

const About = () => {
  return (
    <div className="bg-background-300 min-h-screen w-screen py-8 flex flex-col gap-12 items-center">
      <article className="max-w-[1280px] bg-background-50 mx-8 p-4 rounded-xl shadow-md min-w-[320px] ">
        <BookOrnamentTop />
        <section className="flex flex-col gap-8 py-8 md:p-8 items-center">
          <h1 className="font-heading font-bold italic text-4xl text-primary-500 text-center">
            About the BiblioNest
          </h1>
          <p className="">
            The BiblioNest is a cozy digital sanctuary for readers to discover,
            save, and reflect on the books they love. Built with care and
            curiosity, The BiblioNest was born out of a desire for something
            gentler — a space where book-lovers could explore and curate their
            collections without being beholden to corporate giants. Just a warm,
            independent, open-source little haven for thoughtful readers.
            Whether you're a casual browser or a literary connoisseur, The
            BiblioNest welcomes you. It's a place where your shelves reflect
            your journey, your tastes, and your to-be-read hopes. Long-term, it
            hopes to grow into a home for all kinds of readers — with a
            conscience.
          </p>
          <h2 className="font-heading font-bold italic text-3xl text-primary-500 text-center">
            The Nest builder
          </h2>
          <Image
            src="/avatar-ann.png"
            alt="a picture of Cate the cat"
            height={126}
            width={110}
          />
          <p className="">
            Hi! I'm Ann, a frontend developer, book-lover, and passionate
            advocate for open, human-centered digital spaces. I built The
            BiblioNest as a final project for a course I took after being laid
            off, but it's become something much more: a labour of love, and the
            start of something I know will continue to grow beyond the
            classroom. I'm not building it alone, either...
          </p>
          <h2 className="font-heading font-bold italic text-3xl text-primary-500 text-center">
            My co-founder, Cate
          </h2>
          <Image
            src="/cate.png"
            alt="a picture of Cate the cat"
            height={110}
            width={110}
          />
          <p className="">
            Catherine (or Cate to her friends) is a very fluffy British Longhair
            who oversees quality control — usually from the windowsill,
            sometimes from my keyboard. She insists that all cosy places must
            pass the “curl-up-and-purr” test. The BiblioNest does.
          </p>
        </section>
        <BookOrnamentBottom />
      </article>
    </div>
  )
}
export default About
