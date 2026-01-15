import React, { useState } from 'react';
import { TrendingUp, Star, ShoppingCart, Heart, Eye, Truck, Shield } from 'lucide-react';

const BestSellingProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = ['all', 'electronics', 'fashion', 'home', 'beauty', 'sports'];
  
  const bestSellingProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      category: 'electronics',
      price: 399999,
      soldCount: 12500,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
      delivery: 'Free Delivery',
      warranty: '1 Year'
    },
    {
      id: 2,
      name: 'Samsung 4K Smart TV',
      category: 'electronics',
      price: 149999,
      soldCount: 8900,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
      delivery: 'Free Delivery',
      warranty: '2 Years'
    },
    {
      id: 3,
      name: 'Men\'s Casual Shirt',
      category: 'fashion',
      price: 2999,
      soldCount: 23400,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
      delivery: 'Rs. 100',
      warranty: 'None'
    },
    {
      id: 4,
      name: 'Kitchen Mixer Grinder',
      category: 'home',
      price: 8999,
      soldCount: 15600,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      delivery: 'Free Delivery',
      warranty: '1 Year'
    },
    {
      id: 5,
      name: 'Premium Makeup Kit',
      category: 'beauty',
      price: 5999,
      soldCount: 18900,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
      delivery: 'Free Delivery',
      warranty: 'None'
    },
    {
      id: 6,
      name: 'Yoga Mat Premium',
      category: 'sports',
      price: 1999,
      soldCount: 26700,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400',
      delivery: 'Rs. 150',
      warranty: '6 Months'
    },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? bestSellingProducts 
    : bestSellingProducts.filter(p => p.category === activeCategory);

  const formatCurrency = (amount) => {
    return `Rs. ${amount.toLocaleString('en-PK')}`;
  };

  return (
    <section className="py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp size={24} className="text-[#FF6600]" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Best Selling Products</h2>
              <p className="text-gray-600 mt-1">Top products loved by customers</p>
            </div>
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-[#FF6600] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">
                    {product.category.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp size={16} className="text-green-500" />
                    <span className="text-sm text-gray-600">{product.soldCount.toLocaleString()} sold</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                  <div className="mt-2">
                    <span className="text-xl font-bold text-[#FF6600]">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-1">
                  <Truck size={14} />
                  <span>{product.delivery}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield size={14} />
                  <span>{product.warranty}</span>
                </div>
              </div>
              
              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-[#FF6600] text-white py-2.5 rounded-lg font-semibold hover:bg-[#e55a00] transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart size={16} />
                  Buy Now
                </button>
                <button className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Heart size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellingProducts;