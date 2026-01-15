import React, { useState, useEffect } from 'react';
import { Clock, Tag, ShoppingCart, Heart, Eye, Truck, Shield } from 'lucide-react';

const DealsOfTheDay = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const { hours, minutes, seconds } = prev;
        if (seconds > 0) return { hours, minutes, seconds: seconds - 1 };
        else if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        else if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        else return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const deals = [
    {
      id: 1,
      name: 'Air Conditioner 1.5 Ton',
      originalPrice: 89999,
      discountedPrice: 69999,
      discount: '22%',
      image: 'https://images.unsplash.com/photo-1561835491-ed2567d969f6?w=400',
      delivery: 'Free Installation',
      warranty: '5 Years',
      soldPercentage: 65
    },
    {
      id: 2,
      name: 'Washing Machine 8kg',
      originalPrice: 54999,
      discountedPrice: 42999,
      discount: '22%',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      delivery: 'Free Delivery',
      warranty: '3 Years',
      soldPercentage: 45
    },
    {
      id: 3,
      name: 'Refrigerator Double Door',
      originalPrice: 79999,
      discountedPrice: 64999,
      discount: '19%',
      image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400',
      delivery: 'Free Delivery',
      warranty: '5 Years',
      soldPercentage: 78
    },
  ];

  const formatCurrency = (amount) => {
    return `Rs. ${amount.toLocaleString('en-PK')}`;
  };

  return (
    <section className="py-8">
      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-6 md:p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Tag size={32} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Deals of the Day</h2>
              <p className="text-white/90">Limited time offers ending soon</p>
            </div>
          </div>
          
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={20} />
              <span className="font-semibold">Ends in</span>
            </div>
            <div className="flex gap-3">
              {[
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Seconds' }
              ].map((time, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-white text-red-600 px-3 py-1 rounded-lg font-bold text-lg min-w-[50px] text-center">
                    {time.value.toString().padStart(2, '0')}
                  </div>
                  <span className="text-xs text-white/90 mt-1">{time.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-red-100"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-red-100 text-red-600">
                    HOT DEAL
                  </span>
                </div>
                <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full font-bold">
                  -{deal.discount}
                </span>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-xl text-gray-800">{deal.name}</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <span className="text-2xl font-bold text-[#FF6600]">
                      {formatCurrency(deal.discountedPrice)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {formatCurrency(deal.originalPrice)}
                    </span>
                  </div>
                  <p className="text-center text-green-600 font-medium">
                    Save {formatCurrency(deal.originalPrice - deal.discountedPrice)}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sold: {deal.soldPercentage}%</span>
                    <span className="text-gray-600">Available: {100 - deal.soldPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${deal.soldPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Truck size={14} />
                    <span>{deal.delivery}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield size={14} />
                    <span>{deal.warranty}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart size={18} />
                    Buy Now
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Heart size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DealsOfTheDay;