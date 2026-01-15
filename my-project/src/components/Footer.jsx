import React from 'react';
import { 
  Facebook, Twitter, Instagram, Youtube, Heart, 
  Shield, Truck, CreditCard, Headphones, Globe,
  Smartphone, Mail, MapPin, Phone, ChevronRight
} from 'lucide-react';

const Footer = () => {
  const categories = [
    'Consumer Electronics',
    'Clothing & Apparel',
    'Home & Garden',
    'Health & Beauty',
    'Sports & Entertainment',
    'Automotive & Motorcycle',
    'Toys, Kids & Babies',
    'Groceries'
  ];

  const customerService = [
    'Help Center',
    'Contact Us',
    'How to Buy',
    'How to Sell',
    'Payment Methods',
    'Daraz Wallet',
    'Shipping Guide',
    'Return & Refunds',
    'Daraz Pickup Points',
    'FAQ'
  ];

  const aboutDaraz = [
    'About Us',
    'Careers',
    'Daraz Blog',
    'Privacy Policy',
    'Terms & Conditions',
    'Digital Payments',
    'Daraz Cares',
    'Seller Center',
    'Daraz Affiliate Program',
    'Accessibility'
  ];

  const paymentMethods = [
    'Visa', 'MasterCard', 'American Express', 'PayPal', 
    'Cash on Delivery', 'EasyPaisa', 'JazzCash', 'Bank Transfer'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Top Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ChevronRight size={14} />
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {customerService.map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ChevronRight size={14} />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - About Daraz */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Daraz</h3>
            <ul className="space-y-2">
              {aboutDaraz.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ChevronRight size={14} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact & Download */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Download App</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <a href="#" className="flex-1 bg-black p-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <Smartphone size={20} />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </a>
                <a href="#" className="flex-1 bg-black p-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <Smartphone size={20} />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </a>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Contact Us</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone size={16} />
                    <span>+92 300 1234567</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail size={16} />
                    <span>support@daraz.pk</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    <span>Karachi, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3">
            <Shield size={24} className="text-green-400" />
            <div>
              <div className="font-semibold">100% Secure Payments</div>
              <div className="text-sm text-gray-400">Safe & Secure</div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3">
            <Truck size={24} className="text-blue-400" />
            <div>
              <div className="font-semibold">Free Shipping</div>
              <div className="text-sm text-gray-400">On orders over Rs. 5000</div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3">
            <CreditCard size={24} className="text-purple-400" />
            <div>
              <div className="font-semibold">Easy Returns</div>
              <div className="text-sm text-gray-400">14-Day Return Policy</div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3">
            <Headphones size={24} className="text-orange-400" />
            <div>
              <div className="font-semibold">24/7 Support</div>
              <div className="text-sm text-gray-400">Customer Care</div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Payment Methods */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <h4 className="text-center mb-4 font-semibold">Payment Methods</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-gray-800 px-4 py-2 rounded-lg text-sm">
                {method}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-white text-[#FF6600] w-10 h-10 rounded flex items-center justify-center font-bold text-xl">
                D
              </div>
              <div>
                <div className="font-bold text-xl">Daraz</div>
                <div className="text-sm text-gray-400">Online Shopping in Pakistan</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-[#FF6600] transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="hover:text-[#FF6600] transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="hover:text-[#FF6600] transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="hover:text-[#FF6600] transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
              <div className="hidden md:flex items-center gap-2 text-gray-400">
                <Globe size={16} />
                <span>English</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="text-center text-gray-400 text-sm">
              <p>© 2024 Daraz. All rights reserved.</p>
              <p className="mt-2 flex items-center justify-center gap-1">
                Made with <Heart size={14} className="text-red-500" /> in Pakistan
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;