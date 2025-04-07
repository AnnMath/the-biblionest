import Image from 'next/image'

const LoadingDecoration = () => {
  return (
    <div className="text-center mt-8 flex flex-col mx-auto justify-center items-center">
      <Image src="/decoration-2-top.svg" alt="" width={200} height={100} />
      <p>Loading...</p>
      <Image src="/decoration-2-bottom.svg" alt="" width={200} height={100} />
    </div>
  )
}

export default LoadingDecoration
