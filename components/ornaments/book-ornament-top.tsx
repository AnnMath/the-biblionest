import Image from 'next/image'

const BookOrnamentTop = () => {
  return (
    <div className="flex justify-between px-4">
      <Image src="/corner-bl.svg" alt="" height={38} width={55} />
      <Image src="/corner-br.svg" alt="" height={38} width={55} />
    </div>
  )
}

export default BookOrnamentTop
