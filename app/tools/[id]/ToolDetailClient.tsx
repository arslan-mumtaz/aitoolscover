"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { FaArrowLeft, FaArrowUp, FaArrowRight } from "react-icons/fa";
import { featuredTools, featuredProducts } from "@/constants";

// Helper function to create URL-friendly slugs
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Interface for API similar tools
interface SimilarTool {
  id: number;
  name: string;
  link: string;
  image_url: string;
  description: string;
  tags: string | null;
  created_at: string;
  is_approved: boolean;
  click_count: number;
  views: number;
  developer: string | null;
  category: string;
  submitted_by: string | null;
}

interface SimilarToolsResponse {
  category: string;
  total_results: number;
  results: SimilarTool[];
}

interface ToolDetailClientProps {
  slug: string;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ToolDetailClient({ slug, searchParams }: ToolDetailClientProps) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [similarTools, setSimilarTools] = useState<SimilarTool[]>([]);
  const [similarToolsLoading, setSimilarToolsLoading] = useState(false);
  const [similarToolsError, setSimilarToolsError] = useState<string | null>(null);

  // Function to fetch similar tools from API
  const fetchSimilarTools = async (tag: string) => {
    if (!tag) return;
    
    setSimilarToolsLoading(true);
    setSimilarToolsError(null);
    
    try {
      const response = await fetch(`https://ailast-production.up.railway.app/api/tools/similar/?tag=${encodeURIComponent(tag)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: SimilarToolsResponse = await response.json();
      setSimilarTools(data.results || []);
    } catch (error) {
      console.error('Error fetching similar tools:', error);
      setSimilarToolsError('Failed to load similar tools');
      setSimilarTools([]);
    } finally {
      setSimilarToolsLoading(false);
    }
  };

  useEffect(() => {
    const loadProduct = () => {
      // First, check if it's a featured product (numeric ID)
      const isNumericId = /^\d+$/.test(slug);
      
      if (isNumericId) {
        const featuredProduct = featuredProducts.find((item) => item.id.toString() === slug);
        if (featuredProduct) {
          setProduct(featuredProduct);
          setLoading(false);
          return;
        }
      }

      // Check if we have query params (fallback for direct navigation)
      if (searchParams.name && searchParams.description) {
        const productFromParams = {
          id: slug,
          name: searchParams.name as string,
          image: searchParams.image as string || '/api/placeholder/400/300',
          logo: searchParams.logo as string || searchParams.image as string || '/api/placeholder/50/50',
          description: searchParams.description as string,
          tag: searchParams.category as string || searchParams.tag as string || 'AI Tool',
          tagIcon: searchParams.tagIcon as string || '',
          link: searchParams.link as string || '#'
        };
        setProduct(productFromParams);
        setLoading(false);
        return;
      }

      // Try to get data from sessionStorage for slug-based URLs
      try {
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key && key.startsWith('product_')) {
            const data = JSON.parse(sessionStorage.getItem(key) || '{}');
            const productSlug = createSlug(data.name);
            
            if (productSlug === slug) {
              setProduct(data);
              setLoading(false);
              return;
            }
          }
        }
      } catch (error) {
        console.error('Error retrieving stored product data:', error);
      }

      // If no product found, set not found
      setNotFound(true);
      setLoading(false);
    };

    loadProduct();
  }, [slug, searchParams]);

  // Fetch similar tools when product is loaded
  useEffect(() => {
    if (product && product.tag) {
      fetchSimilarTools(product.tag);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="p-8 ml-10">
        <div className="flex justify-center items-center h-64">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-[#7d42fb] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-semibold text-gray-700">Loading product...</span>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="p-8 ml-10">
        <Link href="/" className="flex gap-2 items-center text-[#000418] font-bold hover:underline mb-8">
          <FaArrowLeft size={15} /> <span>Browse all tools</span>
        </Link>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-4">The product you're looking for doesn't exist or has been removed.</p>
            <Link href="/" className="text-[#7d42fb] hover:underline">
              Return to home page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isApiProduct = !featuredProducts.find((item) => item.id.toString() === slug);

  return (
    <div className="p-8 ml-10">
      {/* Back Link */}
      <Link href="/" className="flex gap-2 items-center text-[#000418] font-bold hover:underline">
        <FaArrowLeft size={15} /> <span>Browse all tools</span>
      </Link>

      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        <div className="flex flex-col gap-6 mt-10">
          <h1 className="text-[#000000] text-5xl font-bold">{product.name}</h1>
          <Link 
            href={product.link || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white bg-[#7d42fb] border-2 border-black px-3 py-3 w-40 rounded-xl font-semibold hover:bg-black transition hover:-translate-y-1 text-center"
          >
            Visit Website
          </Link>
          <div>
            <h3 className="text-[#000000] font-bold text-2xl">Overview</h3>
            <p className="text-[#000000] text-md font-semibold leading-8 w-130">
              {product.description}
            </p>
          </div>
          <p className="text-xl text-[#000000] font-bold">
            Category:
            <span className="bg-[#ecf2ff] ml-4 px-5 py-1 text-sm font-semibold rounded-full">
              {product.tag}
            </span>
          </p>
        </div>

        <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={isApiProduct ? 200 : 0}
            height={isApiProduct ? 200 : 0}
            sizes={isApiProduct ? "200px" : "100vw"}
            className={isApiProduct ? "object-contain" : "w-full h-auto rounded-2xl"}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/api/placeholder/400/300';
            }}
          />
        </div>
      </div>

      {/* Similar Tools and Sidebar */}
      <div className="flex flex-col md:flex-row px-4 md:px-6 py-10 gap-8 mt-10">
        {/* Similar Tools */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6 text-black">Similar Tools</h1>
          
          {similarToolsLoading && (
            <div className="flex justify-center items-center h-32">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-4 border-[#7d42fb] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg font-semibold text-gray-700">Loading similar tools...</span>
              </div>
            </div>
          )}

          {similarToolsError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-600 font-medium">{similarToolsError}</p>
            </div>
          )}

          {!similarToolsLoading && !similarToolsError && similarTools.length === 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
              <p className="text-gray-600 font-medium">No similar tools found for this category.</p>
            </div>
          )}

          {!similarToolsLoading && similarTools.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {similarTools.map((tool) => (
                <article
                  key={tool.id}
                  className="w-full max-w-sm h-[500px] border rounded-3xl mx-auto transition-all cursor-pointer"
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
                  onClick={() => {
                    if (tool.link) {
                      window.open(tool.link, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <div className="h-[240px] bg-gray-100 rounded-t-3xl flex items-center justify-center overflow-hidden">
                    <Image
                      src={tool.image_url}
                      alt={tool.name}
                      width={410}
                      height={240}
                      className="object-cover w-full h-full rounded-t-3xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/api/placeholder/400/300';
                      }}
                    />
                  </div>
                  <div className="flex justify-between px-4 mt-5">
                    <div className="flex items-center gap-2">
                      <div className="w-[50px] h-[50px] bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        <Image
                          src={tool.image_url}
                          alt={tool.name}
                          width={50}
                          height={50}
                          className="object-cover w-full h-full rounded-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/api/placeholder/50/50';
                          }}
                        />
                      </div>
                      <h3 className="font-bold text-black truncate">{tool.name}</h3>
                    </div>
                    <FiExternalLink size={28} className="text-[#7d42fb] mt-3 flex-shrink-0" />
                  </div>
                  <p className="px-4 mt-5 text-[#46526a] font-semibold line-clamp-3">
                    {tool.description}
                  </p>
                  <div className="flex gap-3 mt-5 px-4 items-center">
                    <span className="bg-[#ecf2ff] px-3 py-1 rounded-full text-sm" style={{color: 'black'}}>
                      {tool.category}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: Featured Tools */}
        <aside className="w-full md:w-[300px] mt-2 sticky top-8 self-start">
          <h2 className="text-4xl font-bold mb-4 text-black">Featured Tools</h2>
          <ul className="space-y-6">
            {featuredTools.map((tool, index) => (
              <Link href={tool.link} target='_blank' key={index}>
              <li
                key={index}
                className="flex items-center justify-between p-3 py-5 border border-[#cecece] rounded-xl transition"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="font-medium text-black">{tool.name}</span>
                </div>
                <FiExternalLink size={24} className="text-[#7d42fb]" />
              </li>
              </Link>
            ))}
          </ul>

          {/* CTA: Submit Your Tool */}
          <div className="w-full mt-10 h-[400px] bg-[#ecf2ff] flex flex-col gap-8 px-6 py-8 rounded-xl">
            <div className="w-10 h-10 flex items-center justify-center bg-[#7d42fb] rounded-full text-white">
              <FaArrowUp size={20} />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-[#030303] text-xl font-bold">Submit your Tool!</h3>
              <p className="text-[#030303] text-md font-bold">
                We continuously seek the newest and most innovative AI tools to
                enhance our directory.
              </p>
            </div>
            <Link href="/login">
              <button className="w-[60%] flex gap-2 items-center px-5 py-2 rounded-full bg-black text-white transition hover:-translate-y-1">
                Submit now <FaArrowRight />
              </button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}