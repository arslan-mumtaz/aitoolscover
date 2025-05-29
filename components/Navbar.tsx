"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

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

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="w-[95%] mx-auto flex justify-between px-4 py-5 bg-white dark:bg-[#121212] transition-all duration-300">
      <Link href="/" className="flex items-center justify-center gap-2">
        <Image src="/ai_logo.png" alt="ai" width={50} height={50} />
        <p className="font-bold text-xl text-black dark:text-white">
          Tools Radar
        </p>
      </Link>

      <div className="flex items-center gap-3">
        <ul className="flex gap-8 items-center font-semibold mt-2">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className="text-black dark:text-white cursor-pointer pb-1.5 transition-all hover:font-bold"
            >
              {link.label}
            </Link>
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
    </nav>
  );
};

export default Navbar;
