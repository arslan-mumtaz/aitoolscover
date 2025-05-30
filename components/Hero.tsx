'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { categories } from "@/constants";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryClick = (category: string) => {
    // Convert category to URL-friendly format
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    window.location.href = `/category/${encodeURIComponent(categorySlug)}`;
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes staggerFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .hero-section {
          animation: slideInFromTop 0.8s ease-out;
        }

        .search-block {
          animation: fadeInScale 1s ease-out 0.3s both;
        }

        .categories-section {
          animation: slideInFromBottom 0.8s ease-out 0.5s both;
        }

        .category-button {
          animation: staggerFadeIn 0.6s ease-out both;
        }

        .category-button:nth-child(1) { animation-delay: 0.7s; }
        .category-button:nth-child(2) { animation-delay: 0.8s; }
        .category-button:nth-child(3) { animation-delay: 0.9s; }
        .category-button:nth-child(4) { animation-delay: 1.0s; }
        .category-button:nth-child(5) { animation-delay: 1.1s; }
        .category-button:nth-child(6) { animation-delay: 1.2s; }
        .category-button:nth-child(7) { animation-delay: 1.3s; }
        .category-button:nth-child(8) { animation-delay: 1.4s; }
        .category-button:nth-child(9) { animation-delay: 1.5s; }
        .category-button:nth-child(10) { animation-delay: 1.6s; }
        .category-button:nth-child(11) { animation-delay: 1.7s; }
        .category-button:nth-child(12) { animation-delay: 1.8s; }

        .decorative-image {
          animation: fadeInScale 1.2s ease-out 0.6s both;
        }

        .main-heading {
          animation: slideInFromTop 0.8s ease-out 0.2s both;
        }

        .description {
          animation: slideInFromTop 0.8s ease-out 0.4s both;
        }

        /* Mobile-specific adjustments */
        @media (max-width: 768px) {
          .decorative-image {
            display: none;
          }
        }
      `}</style>

      <section className={`relative flex justify-between w-full max-w-[1200px] min-h-[370px] h-auto mx-auto bg-[#ecf2ff] rounded-3xl mt-10 px-4 sm:px-6 lg:px-0 hero-section ${isLoaded ? 'loaded' : ''}`}>
        {/* Decorative Images - Desktop Only */}
        <div className="hidden lg:flex absolute flex-col space-y-10 justify-center top-[20%] left-[5%]">
          <div className="decorative-image">
            <Image src="/hero1.png" alt="hero" width={125} height={109} />
          </div>
          <div className="decorative-image" style={{ animationDelay: '0.8s' }}>
            <Image src="/hero2.png" alt="hero" width={43} height={41} />
          </div>
        </div>
        
        <div className="hidden lg:flex absolute flex-col space-y-10 justify-center top-[25%] left-[23%]">
          <div className="decorative-image" style={{ animationDelay: '0.7s' }}>
            <Image src="/hero4.png" alt="hero" width={61} height={19} />
          </div>
          <div className="decorative-image" style={{ animationDelay: '0.9s' }}>
            <Image src="/hero3.png" alt="hero" width={130} height={65} />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full flex flex-col items-center justify-center space-y-4 py-8 lg:py-0 lg:absolute lg:top-[20%] lg:left-[37%] lg:w-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 leading-tight text-center main-heading">
            <span className="block">Discover the Top AI tools</span>
            <span className="block">with AI Tools Cover!</span>
          </h1>

          <p className="text-[#272729] font-semibold max-w-xl text-sm sm:text-base lg:text-md mb-6 text-center description px-4 lg:px-0">
            Your gateway to the finest AI tools, meticulously organized
            <span className="block">
              and categorized for easy access.
            </span>
          </p>

          <div className="relative flex items-center w-full max-w-md lg:w-[70%] rounded-full border-2 border-[#7d42fb] bg-white shadow-md px-4 py-3 lg:py-4 search-block transform hover:shadow-lg hover:scale-105 transition-all duration-300">
            <input
              type="text"
              placeholder="Search for..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 outline-none bg-transparent text-sm px-2 placeholder-gray-400 text-black"
            />
            <button 
              onClick={handleSearch}
              className="absolute bg-[#7d42fb] right-[2%] text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 rounded-full hover:bg-[#6a35d9] transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Search
            </button>
          </div>
        </div>
        
        {/* Right Decorative Images - Desktop Only */}
        <div className="hidden lg:flex absolute flex-col space-y-10 justify-center top-[25%] left-[83%]">
          <div className="decorative-image" style={{ animationDelay: '0.8s' }}>
            <Image src="/hero4.png" alt="hero" width={61} height={19} />
          </div>
          <div className="decorative-image" style={{ animationDelay: '1.0s' }}>
            <Image src="/hero5.png" alt="hero" width={175} height={108} />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full max-w-[1200px] mx-auto mt-14 px-4 sm:px-6 lg:px-0 categories-section">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(item)}
              className="category-button bg-transparent text-[#000] border border-[#7d42fb] text-sm sm:text-lg lg:text-xl font-bold py-2 sm:py-3 rounded-full w-full hover:bg-[#7d42fb] hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg active:scale-95"
              style={{ 
                animationDelay: `${0.7 + (index * 0.1)}s`,
                opacity: 0
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;