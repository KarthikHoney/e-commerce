"use client";
import {
  ChevronDown,
  Flame,
  Globe,
  Heart,
  LogOut,
  Menu,
  Package,
  Search,
  ShoppingBag,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { products } from "@/lib/data";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [currency, setCurrency] = useState("₹");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([
    products[0],
    products[2],
  ]);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  const [cartItems, setCartItems] = useState([
    { id: 1, product: products[0], quantity: 1 },
    { id: 2, product: products[1], quantity: 2 },
  ]);
  const [wishlistCount, setWishlistCount] = useState(5);

  const [user, setUser] = useState({
    name: "karthik",
    email: "karthik@gmail.com",
  });

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const calculateCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  return (
    <>
      <header
        className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-lg py-2" : "shadow-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Header */}
          <div className="flex items-center justify-between mb-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TechHub</h1>
                <p className="text-xs text-gray-500">Premium Electronics</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 mx-8 max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for laptops, phones, accessories..."
                  className="w-full border border-gray-300 rounded-full pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <button className="absolute right-3 top-2.5 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  Search
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Language/Currency */}
              <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
                <button className="flex items-center hover:text-blue-600">
                  <Globe className="h-4 w-4 mr-1" />
                  English
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                <button className="flex items-center hover:text-blue-600">
                  {currency} INR
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </div>

              {/* Account */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:inline font-medium">Account</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b">
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-3 hover:bg-gray-50"
                        >
                          <User className="h-5 w-5 mr-3" />
                          My Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center px-4 py-3 hover:bg-gray-50"
                        >
                          <Package className="h-5 w-5 mr-3" />
                          My Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          className="flex items-center px-4 py-3 hover:bg-gray-50"
                        >
                          <Heart className="h-5 w-5 mr-3" />
                          Wishlist ({wishlistCount})
                        </Link>
                        <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50 text-red-600 border-t">
                          <LogOut className="h-5 w-5 mr-3" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="block px-4 py-3 hover:bg-gray-50"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          className="block px-4 py-3 hover:bg-gray-50"
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative">
                <Heart className="h-6 w-6 hover:text-red-600" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <div className="relative">
                <button
                  onClick={() => setShowCartPreview(!showCartPreview)}
                  className="relative"
                >
                  <ShoppingCart className="h-6 w-6 hover:text-blue-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                {showCartPreview && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                    <h4 className="font-bold text-gray-900 mb-3">
                      Shopping Cart
                    </h4>
                    {cartItems.length === 0 ? (
                      <p className="text-gray-600 text-center py-4">
                        Your cart is empty
                      </p>
                    ) : (
                      <>
                        <div className="max-h-64 overflow-y-auto">
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 py-3 border-b"
                            >
                              <Image
                                src={item.product.image}
                                alt={item.product.title}
                                className="w-16 h-16 object-contain"
                                width={16}
                                height={16}
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sm line-clamp-1">
                                  {item.product.title}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {currency}
                                  {item.product.price} x {item.quantity}
                                </p>
                              </div>
                              <button className="text-red-600 hover:text-red-700">
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between font-bold text-lg mb-4">
                            <span>Total:</span>
                            <span>
                              {currency}
                              {calculateCartTotal().toLocaleString()}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Link
                              href="/cart"
                              className="flex-1 text-center py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                            >
                              View Cart
                            </Link>
                            <Link
                              href="/checkout"
                              className="flex-1 text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Checkout
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
                <Menu className="h-5 w-5" />
                All Categories
              </button>
              <div className="flex items-center gap-6">
                <Link href="/" className="font-medium hover:text-blue-600">
                  Home
                </Link>
                <Link href="/products" className="font-medium hover:text-blue-600">
                  Shop All
                </Link>
                <Link
                  href="/deals"
                  className="font-medium hover:text-blue-600 flex items-center"
                >
                  <Flame className="h-4 w-4 mr-1" />
                  Deals
                </Link>
                <Link
                  href="/new-arrivals"
                  className="font-medium hover:text-blue-600"
                >
                  New Arrivals
                </Link>
                <Link
                  href="/brands"
                  className="font-medium hover:text-blue-600"
                >
                  Brands
                </Link>
                <Link href="/help" className="font-medium hover:text-blue-600">
                  Help
                </Link>
              </div>
            </div>
            {/* <div className="flex items-center gap-4 text-sm">
              <Link href="/track-order" className="hover:text-blue-600">
                Track Order
              </Link>
              <Link href="/support" className="hover:text-blue-600">
                24/7 Support
              </Link>
            </div> */}
          </nav>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="lg:hidden border-t py-4 px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border rounded-lg pl-10 pr-4 py-3"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
      </header>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-6 space-y-4">
            <Link href="/products" className="block py-2 font-medium">
              Shop All
            </Link>
            <Link href="/deals" className="block py-2 font-medium">
              Deals
            </Link>
            <Link href="/new-arrivals" className="block py-2 font-medium">
              New Arrivals
            </Link>
            <Link href="/brands" className="block py-2 font-medium">
              Brands
            </Link>
            <Link href="/help" className="block py-2 font-medium">
              Help
            </Link>
            <div className="pt-4 border-t">
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium">
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
