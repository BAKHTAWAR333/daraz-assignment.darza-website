import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Tag, 
  Star, 
  ShoppingCart, 
  Heart, 
  Eye, 
  Truck, 
  Shield, 
  CheckCircle,
  X,
  Timer,
  TrendingUp,
  Zap,
  AlertCircle
} from 'lucide-react';

const FlashSaleSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 34, seconds: 26 });
  const [favorites, setFavorites] = useState(new Set());
  const [itemsPerView, setItemsPerView] = useState(5);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bannerCurrentIndex, setBannerCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const bannerRef = useRef(null);

  // Banner Images
  const bannerImages = [
    {
      id: 1,
      title: "Mega Sale!",
      subtitle: "Up to 70% OFF",
      description: "Limited time offer on all electronics",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
      textColor: "text-white",
      icon: <Zap className="text-yellow-300" size={32} />,
      buttonText: "Shop Now",
      buttonColor: "bg-white text-orange-600"
    },
    {
      id: 2,
      title: "Free Delivery",
      subtitle: "On Orders Over Rs. 5000",
      description: "Across all categories",
      bgColor: "bg-gradient-to-r from-blue-500 to-purple-600",
      textColor: "text-white",
      icon: <Truck className="text-blue-200" size={32} />,
      buttonText: "Browse Items",
      buttonColor: "bg-white text-blue-600"
    },
    {
      id: 3,
      title: "New Arrivals",
      subtitle: "Latest Tech Gadgets",
      description: "Just arrived from global brands",
      bgColor: "bg-gradient-to-r from-green-500 to-teal-600",
      textColor: "text-white",
      icon: <TrendingUp className="text-green-200" size={32} />,
      buttonText: "Explore",
      buttonColor: "bg-white text-green-600"
    },
    {
      id: 4,
      title: "Limited Stock",
      subtitle: "Hurry Before It's Gone!",
      description: "Popular items selling fast",
      bgColor: "bg-gradient-to-r from-pink-500 to-rose-600",
      textColor: "text-white",
      icon: <AlertCircle className="text-pink-200" size={32} />,
      buttonText: "Grab Deal",
      buttonColor: "bg-white text-pink-600"
    }
  ];

  // Banner Auto Slide
  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setBannerCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(bannerTimer);
  }, []);

  // Next/Prev Banner
  const nextBanner = () => {
    setBannerCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  };

  const prevBanner = () => {
    setBannerCurrentIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  // Fetch Products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products from API...');
        
        const response = await fetch('https://dummyjson.com/products?limit=50');
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        if (!data.products || !Array.isArray(data.products)) {
          throw new Error('Invalid API response format');
        }
        
        const formattedProducts = data.products.map((product) => {
          const originalPriceUSD = product.price;
          const originalPricePKR = Math.round(originalPriceUSD * 280);
          const discountPercentage = product.discountPercentage || 0;
          const discountedPricePKR = Math.round(originalPricePKR * (1 - discountPercentage / 100));
          
          return {
            id: product.id,
            name: product.title,
            description: product.description,
            category: product.category.charAt(0).toUpperCase() + product.category.slice(1),
            brand: product.brand || 'Generic Brand',
            originalPrice: originalPricePKR,
            discountedPrice: discountedPricePKR,
            discount: `${Math.round(discountPercentage)}%`,
            rating: product.rating,
            reviews: Math.floor(product.stock * 10),
            stock: product.stock,
            sold: Math.floor(Math.random() * 500) + 50,
            delivery: originalPriceUSD > 50 ? 'Free Delivery' : 'Delivery: Rs. 150',
            warranty: '1 Year Warranty',
            colorOptions: ['Black', 'White', 'Blue', 'Red'].slice(0, Math.floor(Math.random() * 3) + 1),
            imageColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            thumbnail: product.thumbnail,
            images: product.images || [],
            features: [
              'Premium Quality',
              'Easy to Use',
              '1 Year Warranty',
              'Free Returns',
              'Cash on Delivery'
            ].slice(0, Math.floor(Math.random() * 3) + 2),
            specifications: {
              'Brand': product.brand || 'Generic',
              'Category': product.category,
              'Rating': `${product.rating}/5`,
              'Stock': `${product.stock} units`,
              'Weight': '0.5kg'
            }
          };
        });
        
        console.log('Formatted Products:', formattedProducts);
        setProducts(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Fetch Error:', error);
        setError(error.message);
        setLoading(false);
        setProducts(generateFallbackProducts());
      }
    };
    
    fetchProducts();
  }, []);

  const generateFallbackProducts = () => {
    const fallbackProducts = [];
    for (let i = 1; i <= 10; i++) {
      fallbackProducts.push({
        id: i,
        name: `Sample Product ${i}`,
        description: 'This is sample product data',
        category: 'Electronics',
        brand: 'Sample Brand',
        originalPrice: 10000,
        discountedPrice: 8000,
        discount: '20%',
        rating: 4.5,
        reviews: 100,
        stock: 50,
        sold: 200,
        delivery: 'Free Delivery',
        warranty: '1 Year',
        colorOptions: ['Black', 'White'],
        imageColor: '#3b82f6',
        thumbnail: '',
        images: [],
        features: ['Premium', 'Warranty'],
        specifications: { 'Brand': 'Sample', 'Category': 'Electronics' }
      });
    }
    return fallbackProducts;
  };

  // Update items per view on resize
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerView(1);
      else if (width < 768) setItemsPerView(2);
      else if (width < 1024) setItemsPerView(3);
      else if (width < 1280) setItemsPerView(4);
      else setItemsPerView(5);
    };
    
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Timer countdown
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

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    alert('Product added to cart!');
  };

  const handleQuickView = (product, e) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const formatCurrency = (amount) => {
    return `Rs. ${amount.toLocaleString('en-PK')}`;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />;
          } else if (i === fullStars && hasHalfStar) {
            return (
              <div key={i} className="relative">
                <Star size={14} className="text-gray-300" />
                <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            );
          } else {
            return <Star key={i} size={14} className="text-gray-300" />;
          }
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF6600] mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-700">Loading Products...</h2>
            <p className="text-gray-600 mt-2">Fetching real products from API</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-20 bg-red-50 rounded-xl">
            <h2 className="text-2xl font-bold text-red-600 mb-4">API Error</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#FF6600] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e55a00]"
            >
              Retry Loading
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Banner Slider */}
        <div className="mb-8 relative overflow-hidden rounded-2xl shadow-lg">
          <div 
            ref={bannerRef}
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${bannerCurrentIndex * 100}%)` }}
          >
            {bannerImages.map((banner) => (
              <div 
                key={banner.id} 
                className={`w-full flex-shrink-0 ${banner.bgColor} ${banner.textColor} p-6 md:p-10`}
              >
                <div className="flex flex-col md:flex-row items-center justify-between h-full">
                  <div className="md:w-2/3 mb-6 md:mb-0">
                    <div className="flex items-center gap-3 mb-3">
                      {banner.icon}
                      <span className="text-xl md:text-2xl font-bold">{banner.title}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-3">{banner.subtitle}</h3>
                    <p className="text-lg opacity-90 mb-6">{banner.description}</p>
                    <button className={`${banner.buttonColor} font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity`}>
                      {banner.buttonText}
                    </button>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative">
                      <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-white bg-opacity-40 flex items-center justify-center">
                            <Zap size={64} className="text-white opacity-80" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Banner Navigation */}
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
          
          {/* Banner Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setBannerCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === bannerCurrentIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Flash Sale Section Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <Tag className="text-red-600" size={28} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Flash Sale</h2>
                <p className="text-gray-600 mt-1">
                  Real Products from API • {products.length} items
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-red-600 font-medium mb-1">
                  <Clock size={18} />
                  <span>Ends in</span>
                </div>
                <div className="flex gap-2">
                  {[
                    { value: timeLeft.hours, label: 'Hrs' },
                    { value: timeLeft.minutes, label: 'Min' },
                    { value: timeLeft.seconds, label: 'Sec' }
                  ].map((time, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="bg-red-600 text-white px-3 py-1 rounded-lg font-bold text-lg min-w-[50px] text-center">
                        {time.value.toString().padStart(2, '0')}
                      </div>
                      <span className="text-xs text-gray-600 mt-1">{time.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="hidden md:flex items-center gap-2 bg-[#FF6600] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e55a00] transition-colors">
                <ShoppingCart size={20} />
                View All {products.length} Products
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-red-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Timer className="text-red-600" size={20} />
              <span className="font-semibold text-red-600">Real API Data • Hurry Up!</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-red-600">{products.length} real products</span> from dummyjson.com
            </div>
          </div>
        </div>

        {/* Product Carousel */}
        <div className="relative">
          <div 
            ref={carouselRef}
            className="overflow-hidden"
          >
            <div 
              className="flex gap-4 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleCardClick(product)}
                  className="flex-shrink-0 w-full bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  style={{ width: `calc(${100 / itemsPerView}% - 16px)` }}
                >
                  <div className="relative h-48 md:h-56 overflow-hidden rounded-t-xl">
                    {product.thumbnail ? (
                      <img 
                        src={product.thumbnail} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallbackDiv = document.createElement('div');
                          fallbackDiv.className = 'w-full h-full flex items-center justify-center';
                          fallbackDiv.style.backgroundColor = `${product.imageColor}20`;
                          fallbackDiv.innerHTML = `
                            <div class="w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-2xl" style="background-color: ${product.imageColor}">
                              ${product.brand.charAt(0)}
                            </div>
                          `;
                          e.target.parentNode.appendChild(fallbackDiv);
                        }}
                      />
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: `${product.imageColor}20` }}
                      >
                        <div 
                          className="w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-2xl"
                          style={{ backgroundColor: product.imageColor }}
                        >
                          {product.brand.charAt(0)}
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                        -{product.discount}
                      </span>
                      {product.stock < 30 && (
                        <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                          Low Stock
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => toggleFavorite(product.id, e)}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                      >
                        <Heart 
                          size={18} 
                          className={favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
                        />
                      </button>
                      <button
                        onClick={(e) => handleQuickView(product, e)}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                      >
                        <Eye size={18} className="text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{product.sold} sold</span>
                        <span>{product.stock} left</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full"
                          style={{ width: `${(product.sold / (product.sold + product.stock)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {product.category}
                          </span>
                          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                            {product.brand}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-800 line-clamp-2 h-12">
                          {product.name}
                        </h3>
                        
                        <div className="mt-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-[#FF6600]">
                              {formatCurrency(product.discountedPrice)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1">
                              {renderStars(product.rating)}
                              <span className="text-xs text-gray-600 ml-1">
                                ({product.reviews.toLocaleString()})
                              </span>
                            </div>
                            
                            <button
                              onClick={handleAddToCart}
                              className="p-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#e55a00] transition-colors"
                            >
                              <ShoppingCart size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Truck size={12} />
                          <span>{product.delivery}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield size={12} />
                          <span>{product.warranty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-10"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
          )}
          
          {currentIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-10"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>
          )}
        </div>
        
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(products.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-[#FF6600] w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <button className="bg-[#FF6600] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e55a00] transition-colors inline-flex items-center gap-2">
            <ShoppingCart size={20} />
            View All {products.length} Products
          </button>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {selectedProduct.category}
                      </span>
                      <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {selectedProduct.brand}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="grid md:grid-cols-2 gap-8 p-6">
                  <div>
                    <div className="h-96 rounded-xl overflow-hidden mb-6">
                      {selectedProduct.thumbnail ? (
                        <img 
                          src={selectedProduct.thumbnail} 
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          style={{ backgroundColor: `${selectedProduct.imageColor}20` }}
                        >
                          <div 
                            className="w-64 h-64 rounded-full flex items-center justify-center text-white font-bold text-5xl"
                            style={{ backgroundColor: selectedProduct.imageColor }}
                          >
                            {selectedProduct.brand.charAt(0)}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-5 gap-3 mb-6">
                      {selectedProduct.images && selectedProduct.images.length > 0 ? (
                        selectedProduct.images.slice(0, 5).map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`${selectedProduct.name} - ${index + 1}`}
                            className="h-20 w-full object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-[#FF6600] transition-colors"
                            onClick={() => {
                              const mainImg = document.querySelector('.modal-main-img');
                              if (mainImg) mainImg.src = img;
                            }}
                          />
                        ))
                      ) : (
                        [1, 2, 3, 4, 5].map((index) => (
                          <div
                            key={index}
                            className="h-20 rounded-lg cursor-pointer border-2 border-transparent hover:border-[#FF6600] transition-colors"
                            style={{ backgroundColor: `${selectedProduct.imageColor}${10 + index * 5}` }}
                          />
                        ))
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-700 mb-3">Color Options</h4>
                      <div className="flex gap-3">
                        {selectedProduct.colorOptions.map((color, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center cursor-pointer"
                          >
                            <div 
                              className="w-12 h-12 rounded-full border-2 border-gray-300 mb-2"
                              style={{ 
                                backgroundColor: color === 'Black' ? '#000' : 
                                              color === 'White' ? '#fff' : 
                                              color === 'Blue' ? '#3b82f6' : 
                                              color === 'Red' ? '#ef4444' : '#6b7280' 
                              }}
                            ></div>
                            <span className="text-sm text-gray-600">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-[#FF6600]">
                              {formatCurrency(selectedProduct.discountedPrice)}
                            </span>
                            <span className="text-lg text-gray-500 line-through">
                              {formatCurrency(selectedProduct.originalPrice)}
                            </span>
                            <span className="bg-red-600 text-white px-3 py-1 rounded-full font-bold">
                              -{selectedProduct.discount}
                            </span>
                          </div>
                          <p className="text-green-600 font-medium mt-2">
                            You save {formatCurrency(selectedProduct.originalPrice - selectedProduct.discountedPrice)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {renderStars(selectedProduct.rating)}
                          <span className="font-medium text-gray-700">
                            {selectedProduct.rating}
                          </span>
                        </div>
                        <span className="text-gray-500">
                          ({selectedProduct.reviews.toLocaleString()} reviews)
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <CheckCircle size={20} className="text-green-500" />
                        <span className="font-medium text-green-600">
                          {selectedProduct.stock} items in stock
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-700 mb-3">Description</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-700 mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedProduct.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-700 mb-3">Specifications</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                            <span className="text-gray-600">{key}</span>
                            <span className="font-medium text-gray-800">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                      <h4 className="font-semibold text-gray-700 mb-3">Delivery Information</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Truck size={20} className="text-blue-600" />
                          <span className="text-gray-700">{selectedProduct.delivery}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield size={20} className="text-green-600" />
                          <span className="text-gray-700">{selectedProduct.warranty}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <button className="flex-1 bg-[#FF6600] text-white py-3 rounded-xl font-semibold hover:bg-[#e55a00] transition-colors flex items-center justify-center gap-3">
                        <ShoppingCart size={20} />
                        Add to Cart
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-3">
                        <Heart 
                          size={20} 
                          className={favorites.has(selectedProduct.id) ? 'fill-red-500 text-red-500' : ''} 
                        />
                        {favorites.has(selectedProduct.id) ? 'Saved' : 'Wishlist'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FlashSaleSection;