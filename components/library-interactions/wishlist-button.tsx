'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import CustomToast from '../custom-toast/custom-toast'
import { Heart } from 'lucide-react'
import { Button } from '../ui/button'
import { BookButtonProps } from '@/interfaces'
import { useSessionStatus } from '@/lib/hooks/useSessionStatus'
import { useBookStatus } from '@/lib/hooks/useBookStatus'

const WishListButton = ({
  title,
  authors,
  coverUrl,
  workId,
}: BookButtonProps) => {
  const supabase = createClient()

  const { userId, isLoggedIn, isSessionLoading } = useSessionStatus()

  const {
    bookId,
    statusValue: isInWishList,
    setStatusValue: setIsInWishList,
    isBookStatusLoading,
  } = useBookStatus({
    workId,
    title,
    authors,
    coverUrl,
    userId,
    column: 'is_in_wishlist',
  })
  return <Button variant="outline">Add to wishlist</Button>
}

export default WishListButton
