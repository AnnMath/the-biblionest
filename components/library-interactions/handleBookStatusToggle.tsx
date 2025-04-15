import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'
import CustomToast from '@/components/custom-toast/custom-toast'
import { BookStatusColumn } from '@/types'

interface ToggleProps {
  isLoggedIn: boolean
  userId?: string
  bookId: string | null
  column: BookStatusColumn
  currentValue: boolean
  setValue: (val: boolean) => void
  toastMessages: {
    on: string
    off: string
  }
}

export const handleBookStatusToggle = async ({
  isLoggedIn,
  userId,
  bookId,
  column,
  currentValue,
  setValue,
  toastMessages,
}: ToggleProps) => {
  const supabase = createClient()

  if (!isLoggedIn) {
    toast(
      <CustomToast
        message="Please log in to use this feature!"
        color="bg-info-500"
      />,
      { unstyled: true }
    )
    return
  }

  if (!userId || !bookId) {
    console.warn('Missing user or book ID — cannot toggle status.')
    return
  }

  const { error } = await supabase.from('user_books').upsert(
    {
      user_id: userId,
      book_id: bookId,
      [column]: !currentValue,
    },
    { onConflict: 'user_id,book_id' }
  )

  if (error) {
    console.error(`Error toggling ${column}:`, error.message)
    return
  }

  setValue(!currentValue)

  toast(
    <CustomToast
      message={currentValue ? toastMessages.off : toastMessages.on}
      color="bg-info-500/70"
    />,
    { unstyled: true }
  )
}
