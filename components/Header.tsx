"use client";
import { Heart, Search, ShoppingBag, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
      const [scrolled, setScrolled] = useState(false);
       useEffect(() => {
          const handleScroll = () => {
            setScrolled(window.scrollY > 100);
          };
          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
        }, []);
    
  return (
      <header className={`sticky top-0 z-50 transition-all duration-300 ₹{
        scrolled ? "bg-white shadow-lg py-2" : "bg-white py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              
                <Link href="/" className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">TechHub</span>
                <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Pro</span>
                </Link>
              
              
              <nav className="hidden md:flex space-x-6">
  {[
    { navlink: "Home", link: "/" },
    { navlink: "Shop", link: "/products" },
    { navlink: "Categories", link: "/categories" },
    { navlink: "Deals", link: "/deals" },
    { navlink: "New Arrivals", link: "/new-arrivals" },
    { navlink: "Brands", link: "/brands" },
    { navlink: "Support", link: "/support" }
  ].map((item) => (
    <Link
      key={item.navlink}
      href={item.link}
      className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors"
    >
      {item.navlink}
    </Link>
  ))}
</nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <button className="relative p-2 text-gray-700 hover:text-blue-600">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="relative p-2 text-gray-700 hover:text-blue-600">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="hidden md:flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>
  )
}
