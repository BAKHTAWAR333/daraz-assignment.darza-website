import React from 'react';
import { Heart, ShoppingCart, Eye, Truck, Shield } from 'lucide-react';

const ProductCard = ({ 
  product, 
  onCardClick, 
  onFavoriteToggle, 
  onAddToCart, 
  onQuickView,
  isFavorite,
  isInCart 
}) => {
  const formatCurrency = (amount) => {
    return `Rs. ${amount.toLocaleString('en-PK')}`;
  };

  return (
    <div
      onClick={() => onCardClick(product)}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden">
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: `${product.imageColor}20` }}
        >
          <div 
            className="w-28 h-28 rounded-full flex items-center justify-center text-white font-bold text-2xl"
            style={{ backgroundColor: product.imageColor }}
          >
            {product.brand.charAt(0)}
          </div>
        </div>
        
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold">
            -{product.discount}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => onFavoriteToggle(product.id, e)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <Heart 
              size={18} 
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
            />
          </button>
          <button
            onClick={(e) => onQuickView(product, e)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <Eye size={18} className="text-gray-600" />
          </button>
        </div>
        
        {/* Stock Progress */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>{product.sold} sold</span>
            <span>{product.stock} left</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-green-500 h-1.5 rounded-full"
              style={{ width: `${(product.sold / (product.sold + product.stock)) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-800 line-clamp-2 h-12 mb-3">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#FF6600]">
              {formatCurrency(product.discountedPrice)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          </div>
        </div>
        
        {/* Delivery Info */}
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
        
        {/* Add to Cart Button */}
        <button
          onClick={(e) => onAddToCart(product.id, e)}
          className="w-full mt-4 bg-[#FF6600] text-white py-2.5 rounded-lg font-semibold hover:bg-[#e55a00] transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;