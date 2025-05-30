'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Tool = {
  id: string | number;
  name: string;
  category: string;
  description: string;
  image_url?: string;
  link?: string;
  views?: number;
  click_count?: number;
  created_at?: string;
};

const CategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [displayedTools, setDisplayedTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(18);
  const [totalResults, setTotalResults] = useState(0);

  const TOOLS_PER_LOAD = 18;

  useEffect(() => {
    // Get category from URL path
    const path = window.location.pathname;
    const category = path.split('/category/')[1];
    if (category) {
      const decodedCategory = decodeURIComponent(category).replace(/-/g, ' ');
      setCategoryName(decodedCategory);
      
      // Check for cached data first
      if (typeof window !== 'undefined') {
        const cacheKey = `tools_${decodedCategory}`;
        const savedTools = sessionStorage.getItem(cacheKey);
        const savedTimestamp = sessionStorage.getItem(`${cacheKey}_timestamp`);
        const isDataFresh = savedTimestamp && 
          (Date.now() - parseInt(savedTimestamp)) < 5 * 60 * 1000; // 5 minutes

        if (savedTools && isDataFresh) {
          try {
            const parsedTools = JSON.parse(savedTools);
            setAllTools(parsedTools);
            setDisplayedTools(parsedTools.slice(0, TOOLS_PER_LOAD));
            setTotalResults(parsedTools.length);
            setCurrentIndex(TOOLS_PER_LOAD);
            setLoading(false);
            // Fetch fresh data in background
            fetchToolsInBackground(decodedCategory);
            return;
          } catch (error) {
            console.error('Error parsing cached data:', error);
            sessionStorage.removeItem(cacheKey);
            sessionStorage.removeItem(`${cacheKey}_timestamp`);
          }
        }
      }
      
      // Fetch tools if no cache or cache is stale
      fetchTools(decodedCategory);
    }
  }, []);

  useEffect(() => {
    // Cache the tools data
    if (typeof window !== 'undefined' && allTools.length > 0 && categoryName) {
      try {
        const cacheKey = `tools_${categoryName}`;
        sessionStorage.setItem(cacheKey, JSON.stringify(allTools));
        sessionStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
      } catch (error) {
        console.error('SessionStorage quota exceeded, clearing cache:', error);
        const cacheKey = `tools_${categoryName}`;
        sessionStorage.removeItem(cacheKey);
        sessionStorage.removeItem(`${cacheKey}_timestamp`);
      }
    }
  }, [allTools, categoryName]);

  const fetchTools = async (category: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://ailast-production.up.railway.app/api/tools/category/?category=${encodeURIComponent(category)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const tools = data.results || [];
      
      setAllTools(tools);
      setDisplayedTools(tools.slice(0, TOOLS_PER_LOAD));
      setTotalResults(data.total_results || tools.length);
      setCurrentIndex(TOOLS_PER_LOAD);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tools. Please try again.');
      console.error('Error fetching tools:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchToolsInBackground = async (category: string) => {
    try {
      const response = await fetch(
        `https://ailast-production.up.railway.app/api/tools/category/?category=${encodeURIComponent(category)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const tools = data.results || [];
      
      // Update tools if different from cached version
      if (JSON.stringify(tools) !== JSON.stringify(allTools)) {
        setAllTools(tools);
        setTotalResults(data.total_results || tools.length);
      }
    } catch (err) {
      console.error('Background fetch error:', err);
      // Don't set error state for background fetches
    }
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    
    setTimeout(() => {
      const nextTools = allTools.slice(currentIndex, currentIndex + TOOLS_PER_LOAD);
      setDisplayedTools(prev => [...prev, ...nextTools]);
      setCurrentIndex(prev => prev + TOOLS_PER_LOAD);
      setLoadingMore(false);
    }, 500); // Small delay for better UX
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const createSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const storeProductData = (product: Tool): void => {
    if (typeof window !== 'undefined') {
      try {
        const productData = {
          id: product.id.toString(),
          name: product.name,
          image: product.image_url,
          logo: product.image_url,
          description: product.description,
          tag: product.category,
          tagIcon: '',
          link: product.link
        };
        sessionStorage.setItem(`product_${product.id}`, JSON.stringify(productData));
      } catch (error) {
        console.error('Error storing product data:', error);
      }
    }
  };

  // const handleToolClick = (toolLink?: string) => {
  //   if (toolLink) {
  //     window.open(toolLink, '_blank', 'noopener,noreferrer');
  //   }
  // };

  const canLoadMore = currentIndex < allTools.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative w-full bg-[#ecf2ff] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            {/* Back Button */}
            <button
              // onClick={handleBackClick}
              className="inline-flex items-center text-[#7d42fb] font-semibold mb-8 hover:underline"
            >
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
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7d42fb]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchTools(categoryName)}
              className="bg-[#7d42fb] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#6a35d9] transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Tools Grid */}
        {!loading && !error && displayedTools.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedTools.map((tool) => (
              <Link 
                key={tool.id} 
                href={`/tools/${createSlug(tool.name)}`}
                onClick={() => storeProductData(tool)}
              >
              <div
                key={tool.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100 cursor-pointer"
                style={{
                  borderColor: '#cbd7ea',
                  boxShadow: '0 0 2px 0 #24417a14, 0 2px 6px 0 #2900577d',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 2px 0 #24417a14, 2px 2px 9px 0 #290058';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 2px 0 #24417a14, 0 2px 6px 0 #2900577d';
                }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                    {tool.image_url ? (
                      <img
                        src={tool.image_url}
                        alt={tool.name}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = 'none';
                          if (img.nextSibling && img.nextSibling instanceof HTMLElement) {
                            (img.nextSibling as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div 
                      className="w-full h-full bg-[#7d42fb] rounded-xl flex items-center justify-center text-white font-bold text-xs"
                      style={{ display: tool.image_url ? 'none' : 'flex' }}
                    >
                      AI
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-900 truncate">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {tool.category}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {tool.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#ecf2ff] text-[#7d42fb]">
                    Free
                  </span>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    {(tool.views ?? 0) > 0 && (
                      <span>{tool.views} views</span>
                    )}
                    {(tool.click_count ?? 0) > 0 && (
                      <span>{tool.click_count} clicks</span>
                    )}
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && displayedTools.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-4">
              No tools found for "{categoryName}" category.
            </p>
            <button
              onClick={handleBackClick}
              className="text-[#7d42fb] font-semibold hover:underline"
            >
              ← Go back to explore other categories
            </button>
          </div>
        )}

        {/* Load More Button */}
        {!loading && !error && displayedTools.length > 0 && canLoadMore && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="bg-[#7d42fb] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#6a35d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                `Load More Tools (${displayedTools.length} of ${allTools.length})`
              )}
            </button>
          </div>
        )}

        {/* Show completion message when all tools are loaded */}
        {!loading && !error && displayedTools.length > 0 && !canLoadMore && allTools.length > TOOLS_PER_LOAD && (
          <div className="text-center mt-12">
            <p className="text-gray-600 font-semibold">
              All {allTools.length} tools loaded! 🎉
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;