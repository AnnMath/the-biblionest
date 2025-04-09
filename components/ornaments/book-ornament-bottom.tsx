import Image from 'next/image'

const BookOrnamentBottom = () => {
  return (
    <div className="flex justify-center gap-x-2 sm:gap-0 sm:justify-between px-4">
      <Image src="/ornament-bl.svg" alt="" height={36} width={70} />
      <Image src="/deco-bottom.svg" alt="" height={36} width={133} />
      <Image src="/ornament-br.svg" alt="" height={36} width={70} />
    </div>
  )
}

export default BookOrnamentBottom
