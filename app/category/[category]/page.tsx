'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const CategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    // Get category from URL path
    const path = window.location.pathname;
    const category = path.split('/category/')[1];
    if (category) {
      const decodedCategory = decodeURIComponent(category).replace(/-/g, ' ');
      setCategoryName(decodedCategory);
    }
  }, []);

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative w-full bg-[#ecf2ff] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            {/* Back Button */}
            <button
              onClick={handleBackClick}
              className="inline-flex items-center text-[#7d42fb] font-semibold mb-8 hover:underline"
            >
              ← Back to Home
            </button>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Best AI tools for{' '}
              <span className="text-[#7d42fb] capitalize">
                {categoryName}
              </span>
            </h1>

            {/* Description */}
            <p className="text-[#272729] text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              In the {categoryName} category, you'll find the best and most up-to-date AI tools 
              that will help you optimize and develop your ideas. Easily search and 
              use the tool that fits your needs.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Image src="/hero1.png" alt="decoration" width={80} height={70} />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <Image src="/hero5.png" alt="decoration" width={100} height={60} />
        </div>
      </section>

      {/* Tools Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for AI tools - you can replace this with actual data */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-[#7d42fb] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AI</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    Tool Name {item}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {categoryName} Tool
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                This is a sample AI tool description for {categoryName}. 
                It helps you accomplish various tasks efficiently.
              </p>
              
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#ecf2ff] text-[#7d42fb]">
                  Free
                </span>
                <button className="text-[#7d42fb] font-semibold text-sm hover:underline">
                  Try Now →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-[#7d42fb] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#6a35d9] transition-colors">
            Load More Tools
          </button>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;