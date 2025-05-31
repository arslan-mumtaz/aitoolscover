"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const [, forceUpdate] = useState(0);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    forceUpdate(n => n + 1);
  };

  const handleNavigation = async (link: any) => {
    if (link.key === 'submit') {
      const token = localStorage.getItem('token') || "";
      console.log("Token:", token);
      if (!token) {
        console.log("No token provided");
        window.location.href = '/login';
        console.log("hi");
        
        return;
      }
      
      try {
        console.log("trying to hit api");
        const res = await fetch('https://ailast-production.up.railway.app/api/check-login/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (res.status === 200) {
          console.log("response 200");
          window.location.href = '/submit';
        } else {
          console.log("response", res.status);
          window.location.href = '/login';
        }
      } catch (error) {
        console.log("catch error");
        window.location.href = '/login';
      }
    } else {
      console.log("else case");
      window.location.href = link.href;
    }
  };

  return (
    <nav className="w-[100%] mx-auto flex justify-between px-4 py-5 bg-white transition-all duration-300 relative">
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center gap-2">
        <Image src="/logo.png" alt="ai" width={50} height={50} />
        <p className="font-bold text-2xl text-[#121212]">Tools Cover</p>
      </Link>

      {/* Hamburger for Mobile */}
      <button
        className="md:hidden block"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={30} color="black" /> : <Menu size={30} color="black"/>}
      </button>

      {/* Desktop Menu */}
      <div className="md:flex items-center gap-3 hidden">
        <ul className="flex gap-8 items-center font-semibold mt-2">
          {NAV_LINKS.map((link) => (
            <button
              key={link.key}
              onClick={() => handleNavigation(link)}
              className="text-black cursor-pointer pb-1.5 transition-all hover:font-bold"
            >
              {link.label}
            </button>
          ))}
        </ul>

        <button className="rounded-full bg-[#7d42fb] text-white font-bold text-sm px-4 py-2 mt-1">
          Join Newsletter
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="w-16 h-8 bg-[#7d42fb] border border-black dark:border-white rounded-full px-1 flex items-center transition-all mt-2"
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 transform ${
              theme === "dark"
                ? "translate-x-8 bg-black"
                : "translate-x-0 bg-white"
            }`}
          >
            <img
              src={theme === "light" ? "/eye.png" : "/moon.png"}
              alt="icon"
              className="w-4 h-4"
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white flex flex-col items-start gap-4 px-4 py-4 md:hidden z-50">
          {NAV_LINKS.map((link) => (
            <button
              key={link.key}
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavigation(link);
              }}
              className="text-black text-left w-full"
            >
              {link.label}
            </button>
          ))}
          <button className="rounded-full bg-[#7d42fb] text-white font-bold text-sm px-4 py-2">
            Join Newsletter
          </button>
          <button
            onClick={toggleTheme}
            className="w-16 h-8 bg-[#7d42fb] border border-black dark:border-white rounded-full px-1 flex items-center transition-all"
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                theme === "dark"
                  ? "translate-x-8 bg-black"
                  : "translate-x-0 bg-white"
              }`}
            >
              <img
                src={theme === "light" ? "/eye.png" : "/moon.png"}
                alt="icon"
                className="w-4 h-4"
              />
            </div>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
