import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProfileSection from './components/ProfileSection';
import FlashSaleSection from './components/FlashSaleSection';
import CategoriesSection from './components/CategoriesSection';
import FeaturedProducts from './components/FeaturedProducts';
import BestSellingProducts from './components/BestSellingProducts';
import NewArrivals from './components/NewArrivals';
import DealsOfTheDay from './components/DealsOfTheDay';
import BrandsSection from './components/BrandsSection';
import CustomerReviews from './components/CustomerReviews';
import Footer from './components/Footer';

// Hero Banner Component
const HeroBanner = () => {
  const bannerImages = [
    {
      id: 1,
      title: "Mega Electronics Sale",
      subtitle: "Up to 70% OFF",
      description: "Smartphones, Laptops, TVs & More",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200",
      bgColor: "bg-gradient-to-r from-blue-600 to-purple-600",
      buttonText: "Shop Now",
      buttonColor: "bg-white text-blue-600"
    },
    {
      id: 2,
      title: "Summer Fashion Collection",
      subtitle: "New Arrivals",
      description: "Trendy clothes for the season",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200",
      bgColor: "bg-gradient-to-r from-pink-500 to-rose-600",
      buttonText: "Explore",
      buttonColor: "bg-white text-pink-600"
    },
    {
      id: 3,
      title: "Home & Living",
      subtitle: "Everything for Your Home",
      description: "Furniture, Decor & More",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200",
      bgColor: "bg-gradient-to-r from-green-500 to-teal-600",
      buttonText: "Browse",
      buttonColor: "bg-white text-green-600"
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-[#FF6600] text-white rounded-full text-sm font-semibold mb-4">
              Limited Time Offer
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Super Sale
              <span className="block text-[#FF6600]">Up to 70% OFF</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              Discover amazing products at unbeatable prices. Quality guaranteed with free shipping on orders over Rs. 5000.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#FF6600] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e55a00] transition-colors shadow-lg hover:shadow-xl">
                Shop Now
              </button>
              <button className="bg-white text-gray-800 border-2 border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Browse Categories
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#FF6600]">50K+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#FF6600]">200+</div>
                <div className="text-sm text-gray-600">Brands</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#FF6600]">1M+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={bannerImages[currentBanner].image} 
                alt="Banner" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{bannerImages[currentBanner].title}</h3>
                <p className="text-lg">{bannerImages[currentBanner].subtitle}</p>
              </div>
            </div>
            
            {/* Banner Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentBanner ? 'bg-[#FF6600] w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Content Component
const MainContent = () => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <Navbar />
      
      {!user ? (
        <div className="container mx-auto px-4 py-12">
          {/* Show Auth Forms or Profile based on login state */}
          {showSignup ? (
            <SignupForm onSwitchToLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }} />
          ) : showLogin ? (
            <LoginForm onSwitchToSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }} />
          ) : (
            <div className="max-w-4xl mx-auto">
              <HeroBanner />
              <div className="mt-8 p-8 bg-white rounded-2xl shadow-lg text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Daraz</h2>
                <p className="text-gray-600 mb-8 text-lg">Please login or create an account to continue shopping</p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="flex-1 bg-[#FF6600] text-white py-3 rounded-lg font-semibold hover:bg-[#e55a00] text-lg"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowSignup(true)}
                    className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 text-lg"
                  >
                    Sign Up
                  </button>
                </div>
                <p className="text-gray-500 mt-4 text-sm">
                  By continuing, you agree to Daraz's <a href="#" className="text-[#FF6600]">Terms of Service</a> and <a href="#" className="text-[#FF6600]">Privacy Policy</a>
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <HeroBanner />
          <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-4 gap-6 mb-8">
              {/* Quick Stats for Logged In User */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Orders</span>
                      <span className="font-bold text-[#FF6600]">{user.orders?.length || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Wishlist</span>
                      <span className="font-bold text-[#FF6600]">{user.wishlist?.length || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Reward Points</span>
                      <span className="font-bold text-[#FF6600]">1,250</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <ProfileSection />
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Product Sections (Visible to both logged in and non-logged in users) */}
      {!user && (
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Explore Our Marketplace</h2>
              <p className="text-gray-600 mt-2">Browse these sections without logging in</p>
            </div>
          </div>
        </div>
      )}
      
      {/* All Product Sections */}
      <div className="container mx-auto px-4 py-8">
        <CategoriesSection />
        <FlashSaleSection />
        <FeaturedProducts />
        <BestSellingProducts />
        <NewArrivals />
        <DealsOfTheDay />
        <BrandsSection />
        <CustomerReviews />
      </div>
      
      <Footer />
    </>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <MainContent />
      </div>
    </AuthProvider>
  );
}

export default App;