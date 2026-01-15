import React from 'react';
import { 
  Smartphone, 
  Laptop, 
  Shirt, 
  Home, 
  Heart, 
  Baby, 
  Gamepad2, 
  Watch,
  Camera,
  Car,
  Dumbbell,
  Utensils,
  BookOpen
} from 'lucide-react';

const CategoriesSection = () => {
  const categories = [
    { icon: <Smartphone size={24} />, name: 'Mobiles', items: '10K+ Products', color: 'bg-blue-100 text-blue-600' },
    { icon: <Laptop size={24} />, name: 'Electronics', items: '15K+ Products', color: 'bg-purple-100 text-purple-600' },
    { icon: <Shirt size={24} />, name: 'Fashion', items: '25K+ Products', color: 'bg-pink-100 text-pink-600' },
    { icon: <Home size={24} />, name: 'Home & Living', items: '8K+ Products', color: 'bg-green-100 text-green-600' },
    { icon: <Heart size={24} />, name: 'Beauty & Health', items: '12K+ Products', color: 'bg-red-100 text-red-600' },
    { icon: <Baby size={24} />, name: 'Baby & Kids', items: '5K+ Products', color: 'bg-yellow-100 text-yellow-600' },
    { icon: <Gamepad2 size={24} />, name: 'Gaming', items: '3K+ Products', color: 'bg-indigo-100 text-indigo-600' },
    { icon: <Watch size={24} />, name: 'Watches', items: '2K+ Products', color: 'bg-gray-100 text-gray-600' },
    { icon: <Camera size={24} />, name: 'Cameras', items: '4K+ Products', color: 'bg-teal-100 text-teal-600' },
    { icon: <Car size={24} />, name: 'Automotive', items: '6K+ Products', color: 'bg-orange-100 text-orange-600' },
    { icon: <Dumbbell size={24} />, name: 'Sports', items: '7K+ Products', color: 'bg-cyan-100 text-cyan-600' },
    { icon: <Utensils size={24} />, name: 'Groceries', items: '9K+ Products', color: 'bg-lime-100 text-lime-600' },
    { icon: <BookOpen size={24} />, name: 'Books', items: '1K+ Products', color: 'bg-violet-100 text-violet-600' },
  ];

  return (
    <section className="py-8">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Shop by Categories</h2>
        <p className="text-gray-600">Browse products by category</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#FF6600]"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform ${category.color}`}>
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-[#FF6600]">{category.name}</h3>
              <p className="text-xs text-gray-500">{category.items}</p>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button className="text-[#FF6600] font-semibold hover:text-[#e55a00] inline-flex items-center gap-2">
          View All Categories
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default CategoriesSection;