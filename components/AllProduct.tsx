"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { featuredProducts } from "@/constants";

const shimmerStyles = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite linear;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
  }
  .animate-reverse {
    animation-direction: reverse;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = shimmerStyles;
  document.head.appendChild(styleSheet);
}

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

// Helper function to create URL-friendly slugs
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Helper function to store product data in sessionStorage
const storeProductData = (product: ProductTool): void => {
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

const AllProduct: React.FC = () => {
  const [displayedProducts, setDisplayedProducts] = useState<ProductTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const PRODUCTS_PER_LOAD = 18;
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProducts = sessionStorage.getItem('displayedProducts');
      const savedOffset = sessionStorage.getItem('currentOffset');
      const savedTimestamp = sessionStorage.getItem('productsTimestamp');
      const savedHasMore = sessionStorage.getItem('hasMoreProducts');
      
      const isDataFresh = savedTimestamp && 
        (Date.now() - parseInt(savedTimestamp)) < 5 * 60 * 1000; // 5 minutes
      
      if (savedProducts && savedOffset && isDataFresh) {
        try {
          const parsedProducts = JSON.parse(savedProducts);
          setDisplayedProducts(parsedProducts);
          setCurrentOffset(parseInt(savedOffset));
          setHasMoreProducts(savedHasMore === 'true');
          setLoading(false);
          return;
        } catch (error) {
          console.error('Error parsing saved data:', error);
          clearCachedData();
        }
      }
    }
    fetchInitialProducts();
  }, []);
  
  // Save to cache whenever displayedProducts or currentOffset changes
  useEffect(() => {
    if (typeof window !== 'undefined' && displayedProducts.length > 0) {
      try {
        sessionStorage.setItem('displayedProducts', JSON.stringify(displayedProducts));
        sessionStorage.setItem('currentOffset', currentOffset.toString());
        sessionStorage.setItem('productsTimestamp', Date.now().toString());
        sessionStorage.setItem('hasMoreProducts', hasMoreProducts.toString());
      } catch (error) {
        console.error('SessionStorage quota exceeded, clearing old data:', error);
        clearCachedData();
      }
    }
  }, [displayedProducts, currentOffset, hasMoreProducts]);

  const clearCachedData = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('displayedProducts');
      sessionStorage.removeItem('currentOffset');
      sessionStorage.removeItem('productsTimestamp');
      sessionStorage.removeItem('hasMoreProducts');
    }
  };

  const fetchInitialProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://ailast-production.up.railway.app/api/tools/pagination?limit=${PRODUCTS_PER_LOAD}&offset=0`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ProductTool[] = await response.json();
      setDisplayedProducts(data);
      setCurrentOffset(PRODUCTS_PER_LOAD);
      
      // If we got less than requested, we've reached the end
      setHasMoreProducts(data.length === PRODUCTS_PER_LOAD);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore || !hasMoreProducts) return;
    
    setLoadingMore(true);
    
    try {
      const response = await fetch(`https://ailast-production.up.railway.app/api/tools/pagination?limit=${PRODUCTS_PER_LOAD}&offset=${currentOffset}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const newProducts: ProductTool[] = await response.json();
      
      // Add new products to existing ones
      setDisplayedProducts(prev => [...prev, ...newProducts]);
      setCurrentOffset(prev => prev + PRODUCTS_PER_LOAD);
      
      // If we got less than requested, we've reached the end
      if (newProducts.length < PRODUCTS_PER_LOAD) {
        setHasMoreProducts(false);
      }
      
      console.log(`Loaded ${newProducts.length} more products. Total: ${displayedProducts.length + newProducts.length}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while loading more products');
      console.error('Error loading more products:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <main className="px-4 md:px-16">
        <h1 className="font-bold text-4xl mb-10 px-4 text-black">
          Featured Products
        </h1>
        
        {/* Modern Loading Animation */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 border-4 border-[#ff9e2c] border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-b-[#7d42fb] rounded-full animate-spin animate-reverse"></div>
            </div>
            <span className="text-lg font-semibold text-gray-700">Loading amazing tools...</span>
          </div>
        </div>

        {/* Skeleton Loading Cards */}
        <section className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-full max-w-sm h-[500px] border border-gray-200 rounded-3xl mx-auto animate-pulse">
              {/* Skeleton Image */}
              <div className="h-[240px] rounded-t-3xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
              
              {/* Skeleton Content */}
              <div className="px-4 mt-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-[50px] h-[50px] rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
                </div>
                
                {/* Skeleton Description */}
                <div className="space-y-2 mb-5">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/5 animate-pulse"></div>
                </div>
                
                {/* Skeleton Tags */}
                <div className="flex gap-3 items-center">
                  <div className="w-[30px] h-[30px] rounded bg-gray-200 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="px-4 md:px-16">
        <h1 className="font-bold text-4xl mt-14 mb-10 px-4 text-black">
          Featured Tools
        </h1>
        <div className="flex flex-col justify-center items-center h-64 gap-4">
          <div className="text-lg text-red-600">Error: {error}</div>
          <button 
            onClick={() => {
              setError(null);
              clearCachedData();
              fetchInitialProducts();
            }}
            className="bg-[#7d42fb] hover:bg-[#572eaf] text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 md:px-16">
        <h1 className="font-bold text-4xl mt-14 mb-10 px-4 text-black">
            Featured Tools
            </h1>
            <section className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
            {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
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
                <Image
                  src={product.image}
                  alt="Featured product: OpusClip"
                  width={410}
                  height={240}
                  className="rounded-t-3xl"
                />
                <div className="flex justify-between px-4 mt-5">
                  <div className="flex items-center gap-2">
                    <Image
                      src={product.logo}
                      alt="Opus logo"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <h3 className="font-bold" style={{color: 'black'}}>{product.name}</h3>
                  </div>
                  <span className="text-[#7d42fb] mt-3">
                    <FiExternalLink size={28} />
                  </span>
                </div>
                <p className="px-4 mt-5 text-[#46526a] font-semibold">
                  {product.description}
                </p>
                <div className="flex gap-3 mt-5 px-4 items-center">
                  <Image
                    src={product.tagIcon}
                    alt="Star rating icon"
                    width={30}
                    height={30}
                  />
                  <span className="bg-[#ecf2ff] px-5 py-1 rounded-full" style={{color: 'black'}}>
                    {product.tag}
                  </span>
                </div>
              </article>
            </Link>
          ))}
            </section>
      <h1 className="font-bold text-4xl mb-10 px-4 text-black mt-20">
        Latest AI Tools
      </h1>
      <section className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {displayedProducts.map((product) => (
          <Link 
            key={product.id} 
            href={`/tools/${createSlug(product.name)}`}
            onClick={() => storeProductData(product)}
          >
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
                    // Fallback for broken images
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
                  <h3 className="font-bold" style={{color: 'black'}}>{product.name}</h3>
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
                <span className="bg-[#ecf2ff] px-3 py-1 rounded-full text-sm" style={{color: 'black'}}>
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

      {/* Load More Button */}
      {hasMoreProducts && (
        <div className="flex justify-center mt-12 mb-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="bg-[#7d42fb] hover:bg-[#572eaf] disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {loadingMore ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading more tools...
              </div>
            ) : (
              `Load More Tools`
            )}
          </button>
        </div>
      )}

      {!hasMoreProducts && displayedProducts.length > 0 && (
        <div className="flex justify-center mt-12 mb-8">
          <p className="text-gray-500 font-semibold">
            🎉 You've reached the end! All tools have been loaded.
          </p>
        </div>
      )}
    </main>
  );
};

export default AllProduct;
