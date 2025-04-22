import BookOrnamentBottom from '../ornaments/book-ornament-bottom'
import BookOrnamentTop from '../ornaments/book-ornament-top'

const ProfileCard = ({
  displayName,
  email,
}: {
  displayName: string
  email: string | undefined
}) => {
  return (
    <div className="max-w-[1024px] w-9/10 md:w-full bg-background-50 mx-auto py-4 rounded-xl shadow-md">
      <BookOrnamentTop />
      <section className="grid grid-cols-1 md:grid-cols-3 p-8 justify-items-center">
        <aside className="col-span-1 flex flex-col gap-3">
          <h2 className="font-bold text-xl">Your profile</h2>
          <p className="">Display Name: {displayName}</p>
          <p className="">Email: {email}</p>
        </aside>
        <div className="col-span-1 md:col-span-2 gap-2 flex flex-col">
          <h1 className="font-heading font-bold italic text-2xl">
            Hi, {displayName}!
          </h1>
          <p className="">
            Here's your BiblioNest profile. As the app grows, so will this page.
            But for now, here's a hearty BiblioNest hello!
          </p>
        </div>
      </section>
      <BookOrnamentBottom />
    </div>
  )
}

export default ProfileCard
