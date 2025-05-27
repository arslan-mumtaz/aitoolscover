"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink, FiSearch } from 'react-icons/fi';

interface ProductTool {
  id: number;
  name: string;
  link: string;
  image_url: string;
  description: string;
  tags: string;
  created_at: string;
  is_approved: boolean;
  click_count: number;
  views: number;
  developer: string | null;
  category: string;
  submitted_by: string | null;
}

interface SearchResponse {
  query: string;
  category: string | null;
  total_results: number;
  results: ProductTool[];
}

const SearchContent  = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.trim()) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (searchQuery: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://ailast-production.up.railway.app/api/tools/search/?q=${encodeURIComponent(searchQuery)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: SearchResponse = await response.json();
      setSearchData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="w-full max-w-sm h-[500px] border border-gray-200 rounded-3xl mx-auto animate-pulse">
          <div className="h-[240px] rounded-t-3xl bg-gray-200"></div>
          <div className="px-4 mt-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-[50px] h-[50px] rounded-full bg-gray-200"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-32"></div>
            </div>
            <div className="space-y-2 mb-5">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-3/5"></div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-[30px] h-[30px] rounded bg-gray-200"></div>
              <div className="h-8 bg-gray-200 rounded-full w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <main className="px-4 md:px-16 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FiSearch className="text-2xl text-[#7d42fb]" />
          <h1 className="font-bold text-4xl text-black">Search Results</h1>
        </div>
        
        {query && (
          <div className="flex items-center gap-2 text-gray-600">
            <span>Search query:</span>
            <span className="font-semibold text-[#7d42fb] bg-[#ecf2ff] px-3 py-1 rounded-full">
              "{query}"
            </span>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div>
          <div className="flex justify-center items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-[#7d42fb] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg font-semibold text-gray-700">Searching...</span>
            </div>
          </div>
          <LoadingSkeleton />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-red-500 text-lg mb-4">⚠️ Search Error</div>
          <div className="text-red-600 mb-4">{error}</div>
          <button 
            onClick={() => fetchSearchResults(query)}
            className="bg-[#7d42fb] text-white px-6 py-2 rounded-full hover:bg-[#6a35d9] transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* No Query State */}
      {!query && !loading && (
        <div className="flex flex-col items-center justify-center h-64">
          <FiSearch className="text-6xl text-gray-300 mb-4" />
          <div className="text-xl text-gray-500 mb-2">No search query provided</div>
          <div className="text-gray-400">Please go back and enter a search term</div>
        </div>
      )}

      {/* Search Results */}
      {searchData && !loading && !error && (
        <div>
          {/* Results Summary */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">
                Found <span className="font-bold text-[#7d42fb]">{searchData.total_results}</span> 
                {searchData.total_results === 1 ? ' result' : ' results'}
              </span>
              {searchData.category && (
                <span className="bg-[#ecf2ff] px-3 py-1 rounded-full text-sm text-black">
                  Category: {searchData.category}
                </span>
              )}
            </div>
          </div>

          {/* Results Grid */}
          {searchData.results.length > 0 ? (
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {searchData.results.map((product) => (
                <Link key={product.id} href={product.link} target="_blank" rel="noopener noreferrer">
                  <article className="w-full max-w-sm h-[500px] border rounded-3xl mx-auto transition-all"
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
                    <div className="relative h-[240px] rounded-t-3xl overflow-hidden bg-gray-100 flex items-center justify-center">
                      <Image
                        src={product.image_url}
                        alt={`Featured product: ${product.name}`}
                        width={100}
                        height={100}
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/api/placeholder/100/100';
                        }}
                      />
                    </div>
                    <div className="flex justify-between px-4 mt-5">
                      <div className="flex items-center gap-2">
                        <div className="w-[50px] h-[50px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <Image
                            src={product.image_url}
                            alt={`${product.name} logo`}
                            width={40}
                            height={40}
                            className="object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/api/placeholder/40/40';
                            }}
                          />
                        </div>
                        <h3 className="font-bold text-black">{product.name}</h3>
                      </div>
                      <span className="text-[#7d42fb] mt-3">
                        <FiExternalLink size={28} />
                      </span>
                    </div>
                    <p className="px-4 mt-5 text-[#46526a] font-semibold line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex gap-3 mt-5 px-4 items-center flex-wrap">
                      <div className="w-[30px] h-[30px] flex items-center justify-center">
                        <span className="text-yellow-500 text-2xl">⭐</span>
                      </div>
                      <span className="bg-[#ecf2ff] px-3 py-1 rounded-full text-sm text-black">
                        {product.category}
                      </span>
                      {product.tags && (
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                          {product.tags.split(',')[0].trim()}
                        </span>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </section>
          ) : (
            /* No Results Found */
            <div className="flex flex-col items-center justify-center h-64">
              <FiSearch className="text-6xl text-gray-300 mb-4" />
              <div className="text-xl text-gray-500 mb-2">No results found</div>
              <div className="text-gray-400 text-center">
                Try searching with different keywords or check the spelling
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={
      <div className="px-4 md:px-16 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="w-6 h-6 border-2 border-[#7d42fb] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
};


export default SearchPage;