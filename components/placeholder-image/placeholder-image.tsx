import Image from 'next/image'

const PlaceholderImage = () => {
  return (
    <div className="h-auto w-auto">
      <Image src="/placeholder.jpg" alt="" height={200} width={200} />
    </div>
  )
}

export default PlaceholderImage
