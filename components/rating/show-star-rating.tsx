const ShowStarRating = ({ rating }: { rating: number | null | undefined }) => {
  if (!rating) return
  const percentage = (rating / 5) * 100

  return (
    <div className="relative w-[120px] h-6">
      <div
        className="absolute top-0 left-0 w-full h-full bg-zinc-300"
        style={{
          WebkitMaskImage: 'url(/five-stars.svg)',
          maskImage: 'url(/five-stars.svg)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: '120px 24px',
          maskSize: '120px 24px',
        }}
      />

      <div
        className="absolute top-0 left-0 h-full bg-amber-400"
        style={{
          width: `calc(${percentage}% + 2px)`,
          WebkitMaskImage: 'url(/five-stars.svg)',
          maskImage: 'url(/five-stars.svg)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: '120px 24px',
          maskSize: '120px 24px',
        }}
      />
    </div>
  )
}

export default ShowStarRating
