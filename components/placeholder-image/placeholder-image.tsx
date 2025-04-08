import Image from 'next/image'

const PlaceholderImage = () => {
  return (
    <Image
      src="/placeholder.jpg"
      alt=""
      height={270}
      width={180}
      className="sepia-30 rounded-r-xl"
      priority
    />
  )
}

export default PlaceholderImage
