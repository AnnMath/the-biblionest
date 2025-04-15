import { Bird } from 'lucide-react'

const LoggedOut = ({ page }: { page: string }) => {
  return (
    <article className="bg-background-300 h-2xl h-dvh flex flex-col items-center gap-4 px-4">
      <h1 className="text-3xl font-bold font-heading italic text-primary-500 mt-8">
        Please log in to make the most of The Nest
      </h1>
      <p className="flex flex-col items-center sm:flex-row gap-2 sm:items-end">
        <Bird size={30} /> Looks like you're not nestled in yet! Log in to see
        your {page}
      </p>
    </article>
  )
}

export default LoggedOut
