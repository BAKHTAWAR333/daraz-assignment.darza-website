import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BrandsSection = () => {
  const brands = [
    { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg', color: 'bg-blue-50' },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', color: 'bg-gray-50' },
    { name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg', color: 'bg-black text-white' },
    { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', color: 'bg-white' },
    { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', color: 'bg-black text-white' },
    { name: 'LG', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg', color: 'bg-red-50' },
    { name: 'HP', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/HP_New_Logo_2D.svg', color: 'bg-blue-50' },
    { name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg', color: 'bg-blue-50' },
    { name: 'Xiaomi', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg', color: 'bg-orange-50' },
    { name: 'OnePlus', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/22/OnePlus_logo.svg', color: 'bg-red-50' },
    { name: 'Puma', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Puma_logo.svg', color: 'bg-black text-white' },
    { name: 'Reebok', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Reebok_2019_logo.svg', color: 'bg-white' },
  ];

  return (
    <section className="py-8">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Shop by Brands</h2>
        <p className="text-gray-600">Your favorite brands all in one place</p>
      </div>
      
      <div className="relative">
        <div className="overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brands.map((brand, index) => (
              <div
                key={index}
                className={`${brand.color} p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#FF6600] cursor-pointer`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="h-12 mb-3 flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-8 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `<div class="text-xl font-bold">${brand.name.charAt(0)}</div>`;
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-center">{brand.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
          View All Brands
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default BrandsSection;