import Image from 'next/image'

const BookOrnamentBottom = () => {
  return (
    <div className="flex justify-between px-4">
      <Image src="/corner-tl.svg" alt="" height={38} width={55} />
      <Image src="/corner-tr.svg" alt="" height={38} width={55} />
    </div>
  )
}

export default BookOrnamentBottom
