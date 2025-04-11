'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import CustomToast from '../custom-toast/custom-toast'
import { Heart } from 'lucide-react'
import { Button } from '../ui/button'
import { BookButtonProps } from '@/interfaces'

const WishListButton = ({
  title,
  authors,
  coverUrl,
  workId,
}: BookButtonProps) => {
  return <Button variant="outline">Add to wishlist</Button>
}

export default WishListButton
