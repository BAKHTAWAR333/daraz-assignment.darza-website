import React from 'react';
import { Star, ShoppingCart, Clock, Truck, Shield } from 'lucide-react';

const NewArrivals = () => {
  const newProducts = [
    {
      id: 1,
      name: 'Wireless Earbuds Pro',
      category: 'Electronics',
      price: 12999,
      rating: 4.7,
      isNew: true,
      image: 'https://images.unsplash.com/photo-1590658165737-15a047b8b5e6?w=400',
      delivery: 'Free Delivery',
      warranty: '1 Year'
    },
    {
      id: 2,
      name: 'Smart Watch Series 8',
      category: 'Wearables',
      price: 24999,
      rating: 4.8,
      isNew: true,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      delivery: 'Free Delivery',
      warranty: '1 Year'
    },
    {
      id: 3,
      name: 'Designer Handbag',
      category: 'Fashion',
      price: 15999,
      rating: 4.6,
      isNew: true,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
      delivery: 'Rs. 200',
      warranty: 'None'
    },
    {
      id: 4,
      name: 'Robot Vacuum Cleaner',
      category: 'Home',
      price: 45999,
      rating: 4.5,
      isNew: true,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      delivery: 'Free Delivery',
      warranty: '2 Years'
    },
  ];

  const formatCurrency = (amount) => {
    return `Rs. ${amount.toLocaleString('en-PK')}`;
  };

  return (
    <section className="py-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Clock size={24} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">New Arrivals</h2>
            <p className="text-gray-600 mt-1">Fresh products just arrived</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span className="text-sm text-blue-600 font-medium">Just Launched</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {newProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.isNew && (
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-bold">
                    NEW
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="mb-2">
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-800 line-clamp-2 h-12 mb-3">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-lg font-bold text-[#FF6600]">
                  {formatCurrency(product.price)}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-600 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-1">
                  <Truck size={12} />
                  <span>{product.delivery}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield size={12} />
                  <span>{product.warranty}</span>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;