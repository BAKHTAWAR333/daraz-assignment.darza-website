import React, { useState } from 'react';
import { Star, Quote, ThumbsUp, User } from 'lucide-react';

const CustomerReviews = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const reviews = [
    {
      id: 1,
      name: 'Ali Khan',
      role: 'Verified Buyer',
      rating: 5,
      date: '2 days ago',
      comment: 'Excellent product quality and fast delivery. The smartphone exceeded my expectations!',
      product: 'Samsung Galaxy S24',
      helpful: 24,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ali'
    },
    {
      id: 2,
      name: 'Sara Ahmed',
      role: 'Premium Member',
      rating: 4,
      date: '1 week ago',
      comment: 'Good value for money. The laptop works perfectly for my work needs.',
      product: 'MacBook Air M2',
      helpful: 18,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara'
    },
    {
      id: 3,
      name: 'Usman Raza',
      role: 'Verified Buyer',
      rating: 5,
      date: '3 days ago',
      comment: 'Amazing headphones! Noise cancellation is superb and battery life is impressive.',
      product: 'Sony WH-1000XM5',
      helpful: 32,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Usman'
    },
    {
      id: 4,
      name: 'Fatima Noor',
      role: 'Gold Member',
      rating: 4,
      date: '2 weeks ago',
      comment: 'Beautiful design and comfortable to wear. Delivery was quicker than expected.',
      product: 'Apple Watch Series 9',
      helpful: 15,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima'
    },
  ];

  const stats = {
    averageRating: 4.7,
    totalReviews: 12500,
    fiveStar: 65,
    fourStar: 25,
    threeStar: 7,
    twoStar: 2,
    oneStar: 1
  };

  return (
    <section className="py-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Quote size={24} className="text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Customer Reviews</h2>
            <p className="text-gray-600 mt-1">What our customers are saying</p>
          </div>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-gray-800 mb-2">{stats.averageRating}</div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < Math.floor(stats.averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{stats.totalReviews.toLocaleString()} reviews</p>
            </div>
            
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const percentage = stats[`${rating}Star`];
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-10">{percentage}%</span>
                  </div>
                );
              })}
            </div>
            
            <button className="w-full mt-6 bg-[#FF6600] text-white py-3 rounded-lg font-semibold hover:bg-[#e55a00] transition-colors">
              Write a Review
            </button>
          </div>
        </div>
        
        {/* Reviews List */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', '5-star', '4-star', '3-star', 'with-photos', 'verified'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#FF6600] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
          
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.role}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                
                <p className="text-gray-700 mb-4">{review.comment}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Product: </span>
                    <span className="text-sm font-medium text-gray-800">{review.product}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                      <ThumbsUp size={16} />
                      <span className="text-sm">Helpful ({review.helpful})</span>
                    </button>
                    <button className="text-sm text-[#FF6600] hover:text-[#e55a00]">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Load More Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;