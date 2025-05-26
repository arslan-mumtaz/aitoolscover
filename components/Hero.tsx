'use client';
import React, { useState } from "react";
import Image from "next/image";
import { categories } from "@/constants";
import Router from "next/router";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
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
  return (
    <>
      <section className="relative flex justify-between w-[1200px] h-[370px] mx-auto bg-[#ecf2ff] rounded-3xl mt-10">
        <div className="absolute flex flex-col space-y-10 justify-center top-[20%] left-[5%]">
          <Image src="/hero1.png" alt="hero" width={125} height={109} />
          <Image src="/hero2.png" alt="hero" width={43} height={41} />
        </div>
        <div className="absolute flex flex-col space-y-10 justify-center top-[25%] left-[23%]">
          <Image src="/hero4.png" alt="hero" width={61} height={19} />
          <Image src="/hero3.png" alt="hero" width={130} height={65} />
        </div>

        <div className="absolute flex flex-col space-y-4 top-[20%] left-[37%]">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-12">
            Discover the Top AI tools
            <div className="text-center pr-12">with AI Tools Cover!</div>
          </h1>

          <p className="text-[#272729] font-semibold max-w-xl text-base md:text-md mb-6">
            Your gateway to the finest AI tools, meticulously organized
            <span className="block text-center">
              and categorized for easy access.
            </span>
          </p>

          <div className="relative flex items-center w-[70%] rounded-full border-2 border-[#7d42fb] bg-white shadow-md px-4 py-4 pl-2 ml-12 text-[black]">
            <input
              type="text"
              placeholder="Search for..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 outline-none bg-transparent text-sm px-2"
            />
            <button 
              onClick={handleSearch}
              className="absolute bg-[#7d42fb] right-[2%] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#6a35d9] transition-colors"
            >
              Search
            </button>
          </div>
        </div>
        <div className="absolute flex flex-col space-y-10 justify-center top-[25%] left-[83%]">
          <Image src="/hero4.png" alt="hero" width={61} height={19} />
          <Image src="/hero5.png" alt="hero" width={175} height={108} />
        </div>
        <div></div>
      </section>

      <section className="w-[1200px] h-[320px] mx-auto mt-14">
        <div className="grid grid-cols-6 gap-6">
          {categories.map((item, index) => (
            <button
              key={index}
              className="bg-transparent text-[#000] border border-[#7d42fb] text-xl font-bold py-2 rounded-full w-full"
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
