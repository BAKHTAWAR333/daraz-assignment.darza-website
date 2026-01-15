import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Eye, Truck, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const featuredProducts = [
    {
      id: 1,
      name: 'Samsung Galaxy S24 Ultra',
      category: 'Smartphone',
      price: 299999,
      originalPrice: 349999,
      discount: '14%',
      rating: 4.8,
      reviews: 1250,
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
      delivery: 'Free Delivery',
      warranty: '1 Year',
      stock: 45,
      sold: 320
    },
    {
      id: 2,
      name: 'Apple MacBook Pro 16"',
      category: 'Laptop',
      price: 449999,
      originalPrice: 499999,
      discount: '10%',
      rating: 4.9,
      reviews: 890,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w-400',
      delivery: 'Free Delivery',
      warranty: '2 Years',
      stock: 28,
      sold: 210
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5',
      category: 'Headphones',
      price: 59999,
      originalPrice: 74999,
      discount: '20%',
      rating: 4.7,
      reviews: 1560,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      delivery: 'Rs. 150',
      warranty: '1 Year',
      stock: 75,
      sold: 540
    },
    {
      id: 4,
      name: 'Nike Air Max 270',
      category: 'Shoes',
      price: 12999,
      originalPrice: 15999,
      discount: '19%',
      rating: 4.5,
      reviews: 2340,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      delivery: 'Free Delivery',
      warranty: '6 Months',
      stock: 120,
      sold: 890
    },
    {
      id: 5,
      name: 'Dyson V15 Detect',
      category: 'Home Appliance',
      price: 89999,
      originalPrice: 99999,
      discount: '10%',
      rating: 4.6,
      reviews: 670,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      delivery: 'Free Delivery',
      warranty: '2 Years',
      stock: 35,
      sold: 210
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const formatCurrency = (amount) => {
    return `Rs. ${amount.toLocaleString('en-PK')}`;
  };

  return (
    <section className="py-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Products</h2>
          <p className="text-gray-600 mt-1">Handpicked items just for you</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            onClick={prevSlide}
            className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {featuredProducts.map((product) => (
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
              <div className="absolute top-3 left-3">
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                  -{product.discount}
                </span>
              </div>
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button className="p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart size={16} className="text-gray-600" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
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
                <span className="text-sm text-gray-500">({product.reviews.toLocaleString()})</span>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#FF6600]">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                </div>
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
              
              <button className="w-full mt-4 bg-[#FF6600] text-white py-2.5 rounded-lg font-semibold hover:bg-[#e55a00] transition-colors flex items-center justify-center gap-2">
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

export default FeaturedProducts;