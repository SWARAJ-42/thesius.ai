"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CompanyLogo from "@/assets/Navbar/logo.png";
import ProfileLogo from "@/assets/Navbar/user.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Regular Navbar for larger screens */}
      <nav
        className={`hidden lg:flex w-[50%] m-auto my-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out rounded-xl backdrop-blur-md ${
          isScrolled ? "bg-white/30 shadow-xl" : "bg-white/10 shadow-md"
        }`}
      >
        <Link href="/" className="w-[10%] flex items-center justify-center">
          <Image
            src={CompanyLogo}
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
        <div className="w-[80%] mx-auto px-4">
          <ul className="flex justify-center items-center h-16 space-x-8">
            {["about", "tools", "contact"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className={`text-lg font-medium transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-800 hover:text-blue-600"
                      : "text-black hover:text-black"
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[10%] flex items-center justify-center">
          <Image
            src={ProfileLogo}
            alt="User Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </nav>

      {/* Burger menu for smaller screens */}
      <div
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 m-2 rounded-2xl flex backdrop-blur-md justify-between items-center w-full p-4 ${
          isScrolled ? "bg-white/30 shadow-xl" : "bg-white/10 shadow-md"
        }`}
      >
        <Image
          src={CompanyLogo}
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Modal for smaller screens */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center">
          <div className="bg-purple-100/80 backdrop-blur-md w-11/12 h-5/6 rounded-lg p-8 flex flex-col items-center space-y-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 text-2xl font-semibold focus:outline-none"
            >
              &times;
            </button>
            <Link href="/">
              <Image
                src={CompanyLogo}
                alt="Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
            </Link>
            <ul className="flex flex-col items-center space-y-4">
              {["about", "tools", "contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    onClick={() => setIsModalOpen(false)}
                    className="text-2xl font-medium text-gray-800 hover:text-blue-600"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <Image
              src={ProfileLogo}
              alt="User Profile"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
