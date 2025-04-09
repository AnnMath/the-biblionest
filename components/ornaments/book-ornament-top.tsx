import Image from 'next/image'

const BookOrnamentTop = () => {
  return (
    <div className="flex justify-between px-4">
      <Image src="/ornament-tl.svg" alt="" height={36} width={70} />
      <Image src="/deco-top.svg" alt="" height={36} width={133} />
      <Image src="/ornament-tr.svg" alt="" height={36} width={70} />
    </div>
  )
}

export default BookOrnamentTop
