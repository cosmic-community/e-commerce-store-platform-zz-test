import StarRating from '@/components/StarRating'
import type { Review } from '@/types'

interface ReviewSectionProps {
  reviews: Review[]
  productName: string
}

export default function ReviewSection({ reviews, productName }: ReviewSectionProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <p className="text-gray-600">No reviews yet for {productName}. Be the first to share your experience!</p>
      </div>
    )
  }

  // Calculate average rating
  const totalRating = reviews.reduce((sum, review) => {
    const rating = parseInt(review.metadata?.rating?.key || '0')
    return sum + rating
  }, 0)
  const averageRating = totalRating / reviews.length

  // Count ratings by star level
  const ratingCounts = [1, 2, 3, 4, 5].map(star => 
    reviews.filter(review => parseInt(review.metadata?.rating?.key || '0') === star).length
  )

  return (
    <div className="bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
          <StarRating rating={Math.round(averageRating)} size="lg" />
          <p className="text-gray-600 mt-2">
            Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>
        
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-sm w-6">{stars}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${reviews.length > 0 ? (ratingCounts[stars - 1] / reviews.length) * 100 : 0}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{ratingCounts[stars - 1]}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => {
          const rating = parseInt(review.metadata?.rating?.key || '0')
          const title = review.metadata?.title
          const comment = review.metadata?.comment
          const reviewerName = review.metadata?.reviewer_name
          const verifiedPurchase = review.metadata?.verified_purchase
          
          return (
            <div key={review.id} className="bg-white p-6 rounded-lg border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <StarRating rating={rating} />
                  {title && <h4 className="font-semibold mt-1">{title}</h4>}
                </div>
                {verifiedPurchase && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md">
                    Verified Purchase
                  </span>
                )}
              </div>
              
              {comment && (
                <p className="text-gray-700 mb-3">{comment}</p>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{reviewerName}</span>
                <span>{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}