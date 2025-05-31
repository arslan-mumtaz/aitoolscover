'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { categories } from "@/constants";

const Category = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category: string) => {
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

    
}
export default Category;