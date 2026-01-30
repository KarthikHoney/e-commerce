"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { products, categories, blogPosts, testimonials, brands } from "@/lib/data";
import AOSInit from "@/components/AOSInit";
import { 
  Truck, Shield, Clock, ChevronRight, Star, 
  CheckCircle, ArrowRight, Phone, Mail, MapPin,
  Facebook, Twitter, Instagram, Youtube, HelpCircle,
  TrendingUp, Users, Award, Battery, Cpu, ShoppingBag
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [flashSaleTime, setFlashSaleTime] = useState(7200); // 2 hours in seconds
  const [viewedProducts, setViewedProducts] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlashSaleTime(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

 const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const handleNewsletterSubmit = (
  e: React.FormEvent<HTMLFormElement>
): void => {
  e.preventDefault();
  console.log("Newsletter signup:", newsletterEmail);
  setNewsletterEmail("");
};


  return (
    <main className="min-h-screen bg-white">
      {/* Promo Banner */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm font-medium">
        🎉 Free shipping on orders over ₹99 | 30-day return policy | 
        <span className="ml-2 font-bold">Use code: WELCOME10 for 10% off</span>
      </div>

     

      <AOSInit />

      {/* Hero Section with Categories */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Menu className="h-5 w-5 mr-2" />
                All Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a 
                      href="#" 
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors group"
                    >
                      <div className="flex items-center">
                        <div className="p-1.5 bg-gray-100 rounded-md mr-3 group-hover:bg-blue-100">
                          <category.icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                        </div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900">Special Offers</h4>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Limited</span>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Up to 50% off</p>
                  <p className="text-xs text-gray-600">On selected items</p>
                  <button className="mt-3 text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center">
                    View offers <ArrowRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Hero Content */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
                <div className="grid md:grid-cols-2">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4 w-fit">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Black Friday Early Access
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      Premium Tech,
                      <span className="block">Smart Prices</span>
                    </h1>
                    <p className="text-blue-100 mb-6">
                      Discover the latest gadgets, laptops, and accessories with exclusive discounts for early shoppers.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Shop Now
                      </button>
                      <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                        View Deals
                      </button>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-6 mt-8">
                      <div className="text-white">
                        <p className="text-2xl font-bold">10K+</p>
                        <p className="text-sm opacity-90">Happy Customers</p>
                      </div>
                      <div className="h-8 w-px bg-white/30"></div>
                      <div className="text-white">
                        <p className="text-2xl font-bold">2K+</p>
                        <p className="text-sm opacity-90">Products</p>
                      </div>
                      <div className="h-8 w-px bg-white/30"></div>
                      <div className="text-white">
                        <p className="text-2xl font-bold">24/7</p>
                        <p className="text-sm opacity-90">Support</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-64 md:h-auto">
                    <Image 
                      src="/images/2151074249.jpg"
                      alt="Tech Products"
                      className="absolute inset-0 w-full h-full object-cover"
                      width={50}
                      height={100}
                    />
                    {/* Floating discount tag */}
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg transform rotate-12 shadow-lg">
                      <p className="text-sm font-bold">Save 30%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[
                  { icon: Truck, text: "Free Shipping", subtext: "Over ₹99" },
                  { icon: Shield, text: "2-Year Warranty", subtext: "On all products" },
                  { icon: Clock, text: "30-Day Returns", subtext: "Hassle-free" },
                  { icon: Award, text: "Award Winning", subtext: "2024 Tech Retailer" }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 rounded-lg mr-3">
                        <item.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.text}</p>
                        <p className="text-xs text-gray-500">{item.subtext}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Timer */}
      <section className="py-6 bg-gradient-to-r from-red-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white/20 p-2 rounded-lg mr-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Flash Sale Ending Soon!</h3>
                <p className="text-white/90 text-sm">Limited time offers on premium electronics</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="bg-black/30 text-white px-4 py-2 rounded-lg">
                  <span className="text-2xl font-mono font-bold">{formatTime(flashSaleTime)}</span>
                </div>
                <p className="text-white/80 text-xs mt-1">Time Left</p>
              </div>
              <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Shop Flash Sale
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products with Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Carefully curated selection of best-selling tech products based on customer ratings and performance
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["all", "laptops", "phones", "tablets", "accessories", "gaming"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-colors ₹{
                  activeTab === tab 
                    ? "bg-blue-600 text-white" 
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <ProductGrid products={products.slice(0, 8)} />

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
  href="/products"
  className="inline-flex items-center px-6 py-3 
             border-2 border-blue-600 text-blue-600 
             rounded-lg font-semibold 
             hover:bg-blue-50 transition-colors"
>
  View All Products
  <ArrowRight className="h-4 w-4 ml-2" />
</Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
                New Arrival
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Next-Gen Gaming Laptops
                <span className="block text-blue-300">Now Available</span>
              </h2>
              <p className="text-gray-300 mb-8">
                Experience unprecedented performance with our latest gaming laptops featuring RTX 40 series GPUs, 
                advanced cooling systems, and high-refresh-rate displays.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "NVIDIA GeForce RTX 40 Series",
                  "240Hz Refresh Rate Displays",
                  "Advanced Vapor Chamber Cooling",
                  "Customizable RGB Lighting"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-6">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Shop Now
                </button>
                <div>
                  <p className="text-2xl font-bold text-white">₹1,299<span className="text-lg text-gray-400">.99</span></p>
                  <p className="text-sm text-gray-400 line-through">₹1,599.99</p>
                </div>
              </div>
            </div>
            
            <div data-aos="fade-left" className="relative">
              <Image 
                src="/images/gaming-laptop.png"
                alt="Gaming Laptop"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                width={50}
                height={100}
              />
              {/* Floating specs */}
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <Cpu className="h-8 w-8 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">CPU</p>
                    <p className="text-sm font-bold">i9-13900HX</p>
                  </div>
                  <div className="h-8 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <div className="h-8 w-8 flex items-center justify-center mx-auto mb-1">
                      <div className="h-6 w-6 bg-green-500 rounded"></div>
                    </div>
                    <p className="text-xs text-gray-600">GPU</p>
                    <p className="text-sm font-bold">RTX 4070</p>
                  </div>
                  <div className="h-8 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <Battery className="h-8 w-8 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Battery</p>
                    <p className="text-sm font-bold">99Wh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Find exactly what you need in our organized categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((category, i) => (
              <a
                key={category.id}
                href="#"
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="group bg-gray-50 hover:bg-blue-50 rounded-xl p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="inline-flex p-3 bg-white group-hover:bg-blue-100 rounded-lg mb-4 transition-colors">
                  <category.icon className="h-8 w-8 text-gray-700 group-hover:text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} products</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              <Users className="h-3 w-3 mr-1" />
              Customer Stories
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their tech needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div 
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 200}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{testimonial.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{testimonial.rating}</p>
                    <p className="text-xs text-gray-500">out of 5</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">{testimonial.content}</p>
                
                <div className="flex items-center">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full mr-3"
                    width={50}
                    height={100}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rating Summary */}
          <div className="mt-12 bg-white rounded-xl p-8 border border-gray-200">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900 mb-2">4.8</p>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600">Overall Rating</p>
              </div>
              
              {[
                { label: "Product Quality", value: 4.9 },
                { label: "Customer Service", value: 4.7 },
                { label: "Delivery Speed", value: 4.8 },
                { label: "Value for Money", value: 4.6 }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `₹{(stat.value / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <div className="inline-flex p-3 bg-white/20 rounded-lg mb-6">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and tech tips.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-blue-100 text-sm mt-4">
              By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

   

      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors group relative">
          <HelpCircle className="h-6 w-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Need Help?
          </span>
        </button>
      </div>
    </main>
  );
}

// Additional Icons needed
const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Heart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ShoppingCart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const Menu = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);