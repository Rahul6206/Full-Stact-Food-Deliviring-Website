import { Star } from 'lucide-react'
import React from 'react'

const Reviews = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>
      <div className="space-y-4">
        {[
          { name: 'John Doe', rating: 5, comment: 'Amazing food! Fast delivery and great quality.', date: '2 hours ago' },
          { name: 'Jane Smith', rating: 4, comment: 'Good food but delivery was slightly delayed.', date: '5 hours ago' },
          { name: 'Mike Johnson', rating: 5, comment: 'Best pizza in town! Will order again.', date: '1 day ago' },
        ].map((review, index) => (
          <div key={index} className="border-b pb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold">{review.name}</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <button className="text-blue-600 text-sm mt-2 hover:underline">Reply</button>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Reviews