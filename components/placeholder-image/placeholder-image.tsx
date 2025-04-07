import Image from 'next/image'

const PlaceholderImage = () => {
  return (
    <Image
      src="/placeholder.jpg"
      alt=""
      height={200}
      width={200}
      className="sepia-30"
    />
  )
}

export default PlaceholderImage
