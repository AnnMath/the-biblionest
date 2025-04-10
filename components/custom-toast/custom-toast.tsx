import Image from 'next/image'

const CustomToast = ({ message }: { message: string }) => {
  return (
    <div className="w-80 h-24 bg-background-500 rounded-sm shadow-md flex flex-col border border-background-600 items-center justify-center gap-2 self-center">
      <Image src="/decoration-2-top.svg" alt="" height={20} width={140} />
      <p className="text-sm font-bold font-body">{message}</p>
      <Image src="/decoration-2-bottom.svg" alt="" height={20} width={140} />
    </div>
  )
}

export default CustomToast
