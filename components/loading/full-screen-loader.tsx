import { LoaderCircle } from 'lucide-react'

const FullScreenLoader = () => {
  return (
    <div className="h-screen bg-background-300 flex flex-col justify-center items-center gap-8 px-4">
      <h1 className="text-4xl font-bold font-heading italic text-primary-500 text-center animate-in">
        Loading the Nest...
      </h1>
      <LoaderCircle size={128} className="text-primary-500 animate-spin" />
    </div>
  )
}

export default FullScreenLoader
