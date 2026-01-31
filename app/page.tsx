"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, categories, testimonials,brands } from "@/lib/data";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Star,
  Clock,
  Truck,
  ShieldCheck,
  Flame,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ShoppingBag,
  Package,
  RefreshCw,
  CreditCard,
  Globe,
  Award,
  Users,
  TrendingUp,
  Zap,
  Battery,
  Cpu,
  Headphones,
  Smartphone,
  Monitor,
  GamepadIcon,
  Camera,
  Watch,
  Speaker,
  Keyboard,
  Mouse,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CheckCircle,
  Plus,
  Minus,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  ExternalLink,
  Tag,
  Gift,
  Shield,
  RotateCw,
  DollarSign,
  TrendingDown,
  Eye,
  Share2,
  MessageCircle,
  ThumbsUp,
  AlertCircle,
  Lock,
  LogOut,
  Settings,
  FileText,
  TruckIcon,
  ArrowUpRight,
  BadgeCheck,
  Sparkles,
  Infinity,
  Crown,
  Rocket,
  Target,
  BarChart,
  Wallet,
  Smartphone as PhoneIcon,
  Laptop,
  Tablet,
  Headphones as HeadphonesIcon,
  Gamepad,
  Smartwatch,
  Speaker as SpeakerIcon,
  Camera as CameraIcon,
  Cpu as CpuIcon,
  HardDrive,
  MemoryStick,
  Thermometer,
  Wifi,
  Bluetooth,
  BatteryCharging,
} from "lucide-react";
import { Product,Category, UICategory } from "@/lib/types";



 const FilterSidebar = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24">
        <h3 className="font-bold text-gray-900 mb-6">Filters</h3>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-2">
            {[
              "Under ₹1000",
              "₹1000 - ₹5000",
              "₹5000 - ₹10000",
              "Over ₹10000",
            ].map((range) => (
              <label key={range} className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="ml-2 text-gray-700">{range}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand.id} className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="ml-2 text-gray-700">{brand.name}</span>
                <span className="ml-auto text-sm text-gray-500">
                  ({brand.products})
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
          <div className="space-y-2">
            {[5, 4, 3].map((stars) => (
              <label key={stars} className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600" />
                <div className="flex ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-700">& above</span>
              </label>
            ))}
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
          Apply Filters
        </button>
      </div>
    );
  };

  interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  currency: string;
  toggleWishlist: (p: Product) => void;
  addToCart: (p: Product) => void;
  wishlistItems: Product[];
}

interface CategoryCardProps {
  category: UICategory;
}

// FIXED: Consistently use 'category' prop
const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => (
  <Link
    href={`/category/${category.slug}`}
    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 text-center"
  >
    <div
      className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${category.color} group-hover:scale-110 transition-transform`}
    >
      <category.icon className="h-8 w-8 text-white" />
    </div>
    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
    <p className="text-sm text-gray-500">{category.count} products</p>
    <div className="mt-2 h-1 w-0 group-hover:w-full bg-blue-600 transition-all duration-300 rounded-full mx-auto" />
  </Link>
);

export default function Home() {
  const [flashTime, setFlashTime] = useState(7200);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(5);
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(2);
  const [selectedFilters, setSelectedFilters] = useState({
    price: null,
    brand: [],
    rating: null,
    availability: "all",
  });
  const [cartItems, setCartItems] = useState([
    { id: 1, product: products[0], quantity: 1 },
    { id: 2, product: products[1], quantity: 2 },
  ]);
  const [wishlistItems, setWishlistItems] = useState([
    products[0],
    products[2],
  ]);
  const [recentlyViewed, setRecentlyViewed] = useState([
    products[3],
    products[4],
  ]);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currency, setCurrency] = useState("₹");
  const [language, setLanguage] = useState("en");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  const uiCategories: UICategory[] = [
    {
      id: 1,
      name: "Laptops",
      icon: Laptop,
      count: 120,
      color: "bg-blue-500",
      textColor: "text-white",
      slug: "laptops",
      image: "/images/laptop.jpg",
      products: []
    },
    {
      id: 2,
      name: "Laptops",
      icon: Laptop,
      count: 120,
      color: "bg-green-500",
      textColor: "text-white",
      slug: "laptops",
      image: "/images/laptop.jpg",
      products: []
    },
    {
      id: 3,
      name: "Laptops",
      icon: Laptop,
      count: 120,
      color: "bg-yellow-500",
      textColor: "text-white",
      slug: "laptops",
      image: "/images/laptop.jpg",
      products: []
    },
    {
      id: 4,
      name: "Laptops",
      icon: Laptop,
      count: 120,
      color: "bg-blue-500",
      textColor: "text-white",
      slug: "laptops",
      image: "/images/laptop.jpg",
      products: []
    },
    {
      id: 5,
      name: "Laptops",
      icon: Laptop,
      count: 120,
      color: "bg-blue-500",
      textColor: "text-white",
      slug: "laptops",
      image: "/images/laptop.jpg",
      products: []
    },
    {
      id: 6,
      name: "Laptops",
      icon: Laptop,
      count: 120,
      color: "bg-blue-500",
      textColor: "text-white",
      slug: "laptops",
      image: "/images/laptop.jpg",
      products: []
    }
  ];

  interface Banner {
    id: number;
    title: string;
    subtitle: string;
    bg: string;
    image: string;
  }

  const banners: Banner[] = [
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 50% off",
      bg: "from-blue-600 to-purple-600",
      image: "/images/banners/summer.png",
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Latest Tech",
      bg: "from-green-600 to-teal-600",
      image: "/images/banners/new-arrivals.png",
    },
    {
      id: 3,
      title: "Gaming Festival",
      subtitle: "RTX 40 Series",
      bg: "from-red-600 to-orange-600",
      image: "/images/banners/festival.png",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFlashTime((p) => (p > 0 ? p - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(bannerTimer);
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { id: Date.now(), product, quantity: 1 }];
    });
    setCartCount((prev) => prev + 1);
    setShowCartPreview(true);
    setTimeout(() => setShowCartPreview(false), 3000);
  };

  const toggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        setWishlistCount((prev) => prev - 1);
        return prev.filter((p) => p.id !== product.id);
      }
      setWishlistCount((prev) => prev + 1);
      return [...prev, product];
    });
  };

  interface ProductCardProps {
  product: Product;
  showActions?: boolean;
}


  const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showActions = true
}) => (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden">
      <div className="relative">
        <Link href={`/products/${product.slug}`}>
          <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
            <Image
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              width={100}
              height={100}
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount > 0 && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              -{product.discount}%
            </span>
          )}
          {product.rating >= 4.5 && (
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Top Rated
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => toggleWishlist(product)}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            <Heart
              className={`h-5 w-5 ${
                wishlistItems.find((p) => p.id === product.id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }`}
            />
          </button>
          <button
            onClick={() => addToCart(product)}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            <ShoppingCart className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Add to Cart Button */}
        {showActions && (
          <button
            onClick={() => addToCart(product)}
            className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white py-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-semibold hover:bg-blue-700"
          >
            Add to Cart
          </button>
        )}
      </div>

      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 h-12 mb-2 group-hover:text-blue-600">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">
              {currency}
              {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {currency}
                {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {product.reviewCount && (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              In Stock
            </span>
          )}
        </div>

        {/* Quick Specs */}
        <div className="mt-3 flex flex-wrap gap-2">
          {product.specs.slice(0, 2).map((spec: string, i: number) => (
            <span
              key={i}
              className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );



  return (
    <main className="min-h-screen bg-gray-50">
      {/* ================= PROMO BAR ================= */}
      {showNotification && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">
                Black Friday Live • Up to 60% OFF • Free Shipping
              </span>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="hover:bg-white/10 p-1 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= MAIN HERO ================= */}
      <section className="relative">
        {/* Banner Slider */}
        <div className="relative h-[420px] md:h-[480px] lg:h-[520px] overflow-hidden">

  {banners.map((banner: Banner, index: number) => (
    <div
      key={banner.id}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        index === bannerIndex ? "opacity-100" : "opacity-0"
      }`}
    >

      <div
        className={`md:hidden absolute inset-0 bg-gradient-to-r ${banner.bg}`}
      />

      <div className="absolute inset-0">
        <Image
          src={banner.image}
          alt={banner.title}
          fill
          className="object-cover"
          priority
        />
      </div>

    </div>
  ))}

  {/* Controls */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
    {banners.map((_: Banner, index: number) => (
      <button
        key={index}
        onClick={() => setBannerIndex(index)}
        className={`h-3 rounded-full transition-all ${
          index === bannerIndex ? "bg-white w-8" : "bg-white/50 w-3"
        }`}
      />
    ))}
  </div>

</div>


        {/* Features Bar */}
        {/* <div className="bg-white shadow-lg -mt-12 relative z-20 mx-4 rounded-2xl">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{feature.title}</p>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </section>

      {/* ================= FLASH SALE ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Flame className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Flash Sale</h2>
                  <p className="opacity-90">Limited time offers ending soon!</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="bg-black/30 px-6 py-3 rounded-xl font-mono text-2xl font-bold">
                    {formatTime(flashTime)}
                  </div>
                  <p className="text-sm mt-2">Time Left</p>
                </div>
                <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Flash Sale Products */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    className="w-full h-32 object-contain mb-3"
                    width={100}
                    height={32}
                  />
                  <h3 className="font-semibold line-clamp-2 text-sm">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-lg font-bold">
                        {currency}
                        {product.price}
                      </span>
                      <span className="text-sm line-through opacity-75 ml-2">
                        {currency}
                        {product.originalPrice}
                      </span>
                    </div>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm">
                      -{product.discount}%
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* ================= CATEGORIES ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Shop by Category
              </h2>
              <p className="text-gray-600 mt-2">
                Browse our wide range of categories
              </p>
            </div>
            <Link
              href="/categories"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {uiCategories.map((cat) => (
              // FIXED: Corrected prop passing
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Products
              </h2>
              <p className="text-gray-600 mt-2">
                Curated selection of our best products
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-white rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-4 py-2 bg-white"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FilterSidebar />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div
                className={`grid ${viewMode === "grid" ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
              >
                {products.slice(0, 9).map((pro) => (
                  <ProductCard key={pro.id} product={pro} />
                ))}
              </div>

              {/* Load More */}
              <div className="mt-12 text-center">
                <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50">
                  Load More Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BRANDS ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Shop by Brand
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brand/${brand.name.toLowerCase()}`}
                className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 flex items-center justify-center group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-white rounded-lg flex items-center justify-center">
                    <span className="font-bold text-gray-900">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {brand.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {brand.products} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-medium mb-4">
              <Users className="h-4 w-4 mr-2" />
              Customer Stories
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their tech
              needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 relative"
              >
                <div className="absolute -top-4 left-8 bg-blue-600 text-white p-3 rounded-full">
                  <Quote className="h-6 w-6" />
                </div>
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-bold text-gray-900">
                    {testimonial.rating}/5
                  </span>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  {testimonial.content}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex p-4 bg-white/10 rounded-full mb-6">
            <Mail className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated with Tech Trends
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and be the first to know about new
            arrivals, exclusive deals, and tech tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-blue-200 mt-4">
            By subscribing, you agree to our Privacy Policy. Unsubscribe at any
            time.
          </p>
        </div>
      </section>
      {/* Floating Actions */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
          <HelpCircle className="h-6 w-6" />
        </button>
        <button className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-black">
          <ShoppingCart className="h-6 w-6" />
        </button>
      </div>
    </main>
  );
}

// Missing Icon Component
const Quote = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);