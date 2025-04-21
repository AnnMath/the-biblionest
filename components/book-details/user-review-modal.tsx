'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

interface UserReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (rating: number, review: string) => void
  initialRating?: number
  initialReview?: string
}

const UserReviewModal = ({
  isOpen,
  onClose,
  onSave,
  initialRating = 0,
  initialReview = '',
}: UserReviewModalProps) => {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState(initialReview)

  useEffect(() => {
    setRating(initialRating)
    setReview(initialReview || '')
  }, [initialRating, initialReview, isOpen])

  const handleSave = () => {
    onSave(rating, review)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogDescription className="sr-only">
          Leave a review
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>Leave a review</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              className={`cursor-pointer ${
                (hoverRating || rating) >= star
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-zinc-300 text-zinc-300'
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <Textarea
          placeholder="Write your thoughts..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="min-h-[120px]"
        />

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UserReviewModal
