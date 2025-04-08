import Image from 'next/image'

const LoadingDecoration = () => {
  return (
    <div className="text-center mt-8 flex flex-col mx-auto justify-center items-center w-56">
      <Image src="/decoration-2-top.svg" alt="" width={487} height={68} />
      <p>Loading...</p>
      <Image src="/decoration-2-bottom.svg" alt="" width={487} height={68} />
    </div>
  )
}

export default LoadingDecoration
