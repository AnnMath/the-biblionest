import Image from 'next/image'

const CustomToast = ({
  message,
  color,
}: {
  message: string
  color: string
}) => {
  return (
    <div
      className={`w-80 h-24 bg-background-50 rounded-sm shadow-md flex flex-col border border-accent-600 items-center justify-center gap-2 ${color}`}
    >
      <Image src="/decoration-2-top.svg" alt="" height={20} width={140} />
      <p className=" font-bold font-body">{message}</p>
      <Image src="/decoration-2-bottom.svg" alt="" height={20} width={140} />
    </div>
  )
}

export default CustomToast
