import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ShoppingCart, 
  Search, 
  User, 
  UserPlus, 
  Globe,
  Smartphone,
  Store,
  HelpCircle,
  Home,
  Zap,
  Grid,
  Package,
  Heart,
  Gift,
  Headphones,
  Settings,
  LogOut,
  Download,
  Bell,
  Star,
  TrendingUp,
  Shield,
  CreditCard,
  Truck,
  FileText,
  Users,
  Tag,
  ChevronRight
} from 'lucide-react';

// Mock user data - In a real app, this would come from your AuthContext
const mockUser = {
  name: 'John Doe',
  profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  email: 'john@example.com'
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Auth state - In a real app, this would come from useAuth()
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock auth functions - Replace with your actual auth context functions
  const login = () => {
    setUser(mockUser);
    setIsMobileMenuOpen(false);
  };

  const logout = () => {
    setUser(null);
    setIsMobileMenuOpen(false);
    alert('Logged out successfully!');
  };

  // Simulate auth check on component mount
  useEffect(() => {
    // In a real app, this would be from your auth context
    const checkAuth = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        // Mock: Check if user is logged in
        const loggedIn = false; // Change to true to simulate logged in state
        if (loggedIn) {
          setUser(mockUser);
        }
        setIsLoading(false);
      }, 500);
    };
    checkAuth();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Top links for desktop
  const topLinks = [
    { icon: <Smartphone size={14} />, text: 'Save More on App' },
    { icon: <Store size={14} />, text: 'Sell On Daraz' },
    { icon: <HelpCircle size={14} />, text: 'Help & Support' }
  ];

  // Auth links for desktop - Updated to conditionally show based on auth state
  const getAuthLinks = () => {
    if (user) {
      return [
        { 
          icon: <img src={user.profilePicture} alt={user.name} className="w-5 h-5 rounded-full" />, 
          text: user.name.split(' ')[0],
          action: () => alert('Going to profile')
        },
        { 
          icon: <LogOut size={14} />, 
          text: 'Logout',
          action: logout
        }
      ];
    }
    return [
      { 
        icon: <User size={14} />, 
        text: 'Login',
        action: () => window.location.href = '/login'
      },
      { 
        icon: <UserPlus size={14} />, 
        text: 'Sign Up',
        action: () => window.location.href = '/signup'
      },
      { 
        icon: <Globe size={14} />, 
        text: 'زبان تبدیل کریں',
        action: () => alert('Change language')
      }
    ];
  };

  // Main navigation items
  const navItems = [
    'Home',
    'Flash Sale',
    'Categories',
    'Fashion',
    'Electronics',
    'Home & Lifestyle',
    'Beauty',
    'Mobiles',
    'Supermarket'
  ];

  // Mobile menu categories
  const mobileCategories = [
    { icon: <Home size={20} />, text: 'Home', color: 'text-blue-600' },
    { icon: <Zap size={20} />, text: 'Flash Sale', color: 'text-red-600' },
    { icon: <Grid size={20} />, text: 'Categories', color: 'text-green-600' },
    { icon: <TrendingUp size={20} />, text: 'Top Products', color: 'text-purple-600' },
    { icon: <Star size={20} />, text: 'Just For You', color: 'text-yellow-600' },
    { icon: <Bell size={20} />, text: 'Notifications', color: 'text-orange-600' },
  ];

  // Mobile menu user section - Updated for auth state
  const getUserLinks = () => {
    if (user) {
      return [
        { icon: <User size={20} />, text: 'My Account', badge: null },
        { icon: <Package size={20} />, text: 'My Orders', badge: '5' },
        { icon: <Heart size={20} />, text: 'Wishlist', badge: '12' },
        { icon: <ShoppingCart size={20} />, text: 'My Cart', badge: cartItems.toString() },
        { icon: <Gift size={20} />, text: 'Vouchers', badge: '2' },
        { icon: <Tag size={20} />, text: 'Coupons', badge: '3' },
      ];
    }
    return [
      { icon: <User size={20} />, text: 'Login', badge: null },
      { icon: <UserPlus size={20} />, text: 'Sign Up', badge: null },
    ];
  };

  // Mobile menu services
  const serviceLinks = [
    { icon: <Store size={20} />, text: 'Sell on Daraz' },
    { icon: <Shield size={20} />, text: 'Purchase Protection' },
    { icon: <Headphones size={20} />, text: 'Customer Care' },
    { icon: <CreditCard size={20} />, text: 'Digital Payments' },
    { icon: <Truck size={20} />, text: 'Delivery Info' },
    { icon: <FileText size={20} />, text: 'Terms & Conditions' },
    { icon: <Users size={20} />, text: 'About Daraz' },
  ];

  // Mobile menu footer links - Updated for auth state
  const getMobileFooterLinks = () => {
    const baseLinks = [
      { icon: <Settings size={18} />, text: 'Settings' },
      { icon: <HelpCircle size={18} />, text: 'Help Center' },
    ];
    
    if (user) {
      return [...baseLinks, { icon: <LogOut size={18} />, text: 'Logout', color: 'text-red-600', action: logout }];
    }
    return baseLinks;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setSearchQuery('');
      setIsSearchExpanded(false);
    }
  };

  const handleLinkClick = (text) => {
    setIsMobileMenuOpen(false);
    setIsSearchExpanded(false);
    alert(`Navigation to: ${text}`);
  };

  // Function to handle mobile search toggle
  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    setIsMobileMenuOpen(false);
  };

  // Handle auth button clicks
  const handleAuthAction = (link) => {
    if (link.action) {
      link.action();
    } else {
      handleLinkClick(link.text);
    }
  };

  return (
    <>
      {/* Top Header - Hidden on mobile */}
      <div className="bg-[#FF6600] text-white text-sm py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              {topLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(link.text)}
                  className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  {link.icon}
                  <span className="text-sm">{link.text}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-6">
              {getAuthLinks().map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleAuthAction(link)}
                  className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  {link.icon}
                  <span className="text-sm">{link.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`bg-[#FF6600] transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="container mx-auto px-4">
          {/* Mobile Top Bar */}
          <div className="flex items-center justify-between py-3 md:py-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-white text-[#FF6600] w-8 h-8 md:w-9 md:h-9 rounded flex items-center justify-center font-bold text-lg md:text-xl">
                D
              </div>
              <span className="text-white font-bold text-xl md:text-2xl">Daraz</span>
            </div>

            {/* Desktop Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="flex bg-white rounded overflow-hidden">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products, brands and categories"
                    className="flex-1 px-4 py-2.5 text-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#FF6600] text-white px-6 hover:bg-[#e55a00] transition-colors"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Section: Auth buttons on desktop, search/cart on mobile */}
            <div className="flex items-center gap-4">
              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-white font-medium">{user.name.split(' ')[0]}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="text-white hover:opacity-90"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => window.location.href = '/login'}
                      className="text-white hover:opacity-90"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => window.location.href = '/signup'}
                      className="text-white hover:opacity-90"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Search Button - Hidden on desktop */}
              <button
                onClick={toggleSearch}
                className="md:hidden text-white"
                aria-label="Search"
              >
                <Search size={22} />
              </button>

              {/* Cart Button */}
              <button
                onClick={() => handleLinkClick('Cart')}
                className="relative text-white"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={24} />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-[#FF6600] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold border border-[#FF6600]">
                    {cartItems}
                  </span>
                )}
              </button>

              {/* Mobile User Button - Hidden on desktop */}
              <button
                onClick={() => user ? handleLinkClick('My Account') : window.location.href = '/login'}
                className="md:hidden text-white"
                aria-label="Account"
              >
                <User size={22} />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - Expanded State */}
          {isSearchExpanded && (
            <div className="md:hidden pb-3 px-1">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search on Daraz..."
                    className="flex-1 px-4 py-3 text-base focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-[#FF6600] text-white px-6 hover:bg-[#e55a00] transition-colors"
                  >
                    <Search size={20} />
                  </button>
                </div>
                <button
                  onClick={() => setIsSearchExpanded(false)}
                  className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400"
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Main Navigation - Desktop Only */}
        <div className="hidden md:block bg-white">
          <div className="container mx-auto">
            <nav className="flex">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(item)}
                  className="flex-1 text-center px-2 py-3 text-sm font-medium text-gray-700 hover:text-[#FF6600] transition-colors border-b-2 border-transparent hover:border-[#FF6600] whitespace-nowrap"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="bg-[#FF6600] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white text-[#FF6600] w-9 h-9 rounded flex items-center justify-center font-bold">
              D
            </div>
            <div>
              <span className="text-white font-bold text-lg">Daraz</span>
              <p className="text-white/90 text-xs">Welcome to Daraz!</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white p-1"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="overflow-y-auto h-[calc(100vh-70px)] pb-20">
          {/* User Info */}
          <div className="px-4 py-6 border-b">
            {user ? (
              <button 
                onClick={() => handleLinkClick('My Account')}
                className="flex items-center gap-3 w-full"
              >
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            ) : (
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = '/login';
                }}
                className="flex items-center gap-3 w-full"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User size={24} className="text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-800">Login / Sign Up</p>
                  <p className="text-sm text-gray-600">Access orders, wishlist & more</p>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            )}
          </div>

          {/* Categories Grid */}
          <div className="px-4 py-4 border-b">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Shop Categories</h3>
            <div className="grid grid-cols-3 gap-3">
              {mobileCategories.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(item.text)}
                  className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-full bg-gray-100 ${item.color} mb-2`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{item.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Links */}
          <div className="px-2 py-2 border-b">
            {getUserLinks().map((link, index) => (
              <button
                key={index}
                onClick={() => {
                  if (link.text === 'Login' || link.text === 'Sign Up') {
                    setIsMobileMenuOpen(false);
                    window.location.href = `/${link.text.toLowerCase().replace(' ', '')}`;
                  } else {
                    handleLinkClick(link.text);
                  }
                }}
                className="flex items-center justify-between w-full px-3 py-3.5 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-gray-200">
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{link.text}</span>
                </div>
                {link.badge && (
                  <span className="bg-[#FF6600] text-white text-xs px-2 py-1 rounded-full min-w-[24px] text-center">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Services */}
          <div className="px-2 py-2 border-b">
            <h3 className="text-sm font-semibold text-gray-500 uppercase px-3 py-2">Services</h3>
            {serviceLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(link.text)}
                className="flex items-center w-full px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-1.5 bg-gray-100 rounded-lg mr-3">
                  {link.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{link.text}</span>
              </button>
            ))}
          </div>

          {/* App Download */}
          <div className="m-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
            <div className="flex items-center gap-3 mb-3">
              <Download size={20} className="text-[#FF6600]" />
              <div>
                <p className="font-semibold text-gray-800">Get the Daraz App</p>
                <p className="text-xs text-gray-600">Better shopping experience</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Google Play
              </button>
              <button className="flex-1 bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                App Store
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="px-4 py-3">
            {getMobileFooterLinks().map((link, index) => (
              <button
                key={index}
                onClick={() => link.action ? link.action() : handleLinkClick(link.text)}
                className={`flex items-center gap-3 w-full py-3 text-sm ${link.color || 'text-gray-600'} hover:text-gray-800 transition-colors`}
              >
                {link.icon}
                <span>{link.text}</span>
              </button>
            ))}
          </div>

          {/* Language Selector */}
          <div className="px-4 py-4 border-t">
            <button
              onClick={() => handleLinkClick('Change Language')}
              className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Change Language</span>
              </div>
              <span className="text-sm text-gray-500">English</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Quick Actions Bar (Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 md:hidden">
        <div className="flex justify-around items-center py-2 px-2">
          {[
            { icon: <Home size={22} />, text: 'Home', active: true },
            { icon: <Grid size={22} />, text: 'Categories' },
            { icon: <Search size={22} />, text: 'Search' },
            { icon: <Heart size={22} />, text: 'Wishlist' },
            { icon: <User size={22} />, text: 'Account' },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.text === 'Search') {
                  toggleSearch();
                } else if (item.text === 'Account') {
                  if (user) {
                    handleLinkClick('My Account');
                  } else {
                    window.location.href = '/login';
                  }
                } else {
                  handleLinkClick(item.text);
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] ${
                item.active ? 'text-[#FF6600]' : 'text-gray-600'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.text}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;