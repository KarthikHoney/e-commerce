"use client";

import { useState, useEffect } from "react";
import { products } from "@/lib/data";
import ImageGallery from "@/components/ImageGallery";
import RelatedProducts from "@/components/RelatedProducts";
import { Product } from "@/lib/types";
import { 
  Star, ShoppingCart, Heart, Shield, Truck, 
  RotateCcw, Check, ChevronRight, CreditCard,
  Battery, Cpu, MemoryStick, HardDrive, Monitor,
  Wifi, Bluetooth, Package, Award, Users,
  Clock, DollarSign, Tag, Facebook, Twitter,
  Instagram, MessageCircle, Share2, Eye,
  TrendingUp, Zap, Thermometer, Headphones,
  Keyboard, Mouse, GamepadIcon, Smartphone,
  Camera, Watch, Speaker, HelpCircle,
  ChevronLeft, ChevronDown, Plus, Minus,
  ShoppingBag, ArrowRight, CheckCircle,
  ShieldCheck, RefreshCw, Globe, User,
  MapPin, Phone, Mail, ExternalLink
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductDetailProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showMoreSpecs, setShowMoreSpecs] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resolvedParams = await params;
        const foundProduct =
  products.find(p => p.slug === resolvedParams.slug) || null;

setProduct(foundProduct);
        
        if (foundProduct) {
          setSelectedColor(foundProduct.colors?.[0] || "");
          setSelectedStorage(foundProduct.storageOptions?.[0] || "");
          
          // Add to recently viewed
          const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
          const updated = [foundProduct, ...viewed.filter((p: Product) => p.id !== foundProduct.id)].slice(0, 5);
          localStorage.setItem('recentlyViewed', JSON.stringify(updated));
          setRecentlyViewed(updated);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [params]);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Add your wishlist logic here
  };

  const handleAddToCart = () => {
    // Add your cart logic here
    console.log("Added to cart:", {
      product: product?.title,
      quantity,
      color: selectedColor,
      storage: selectedStorage
    });
  };

  const handleBuyNow = () => {
    // Add your checkout logic here
    handleAddToCart();
    // Navigate to checkout
  };

  const shareProduct = (platform: string) => {
    const url = window.location.href;
    const title = product?.title;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=₹{encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=₹{encodeURIComponent(url)}&text=₹{encodeURIComponent(title || '')}`, '_blank');
        break;
     case "whatsapp":
  window.open(
    `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${title} ${url}`
    )}`,
    "_blank"
  );
  break;

    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you are looking for does not exist or has been removed.</p>
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Extended product data
  const productSpecs = [
    { icon: Cpu, label: "Processor", value: "Intel Core i9-13900HX", detail: "24 cores, up to 5.4GHz" },
    { icon: MemoryStick, label: "Memory", value: "32GB DDR5", detail: "4800MHz, upgradable to 64GB" },
    { icon: HardDrive, label: "Storage", value: "1TB NVMe PCIe 4.0 SSD", detail: "Read: 7000MB/s, Write: 5000MB/s" },
    { icon: Monitor, label: "Display", value: '16" QHD+ (2560 x 1600)', detail: "240Hz, 100% DCI-P3, 500 nits" },
    { icon: Zap, label: "Graphics", value: "NVIDIA GeForce RTX 4070", detail: "8GB GDDR6, 140W TGP" },
    { icon: Battery, label: "Battery", value: "99Wh", detail: "Up to 8 hours, 280W fast charging" },
    { icon: Wifi, label: "Wireless", value: "Wi-Fi 6E", detail: "Bluetooth 5.3, Killer AX1675" },
    { icon: Thermometer, label: "Cooling", value: "Vapor Chamber", detail: "Dual fans, 6 heat pipes" },
    { icon: Keyboard, label: "Keyboard", value: "Per-key RGB", detail: "Mechanical switches, 1.7mm travel" },
    { icon: Shield, label: "Security", value: "Windows Hello", detail: "Fingerprint sensor, TPM 2.0" },
  ];

  const features = [
    { icon: Zap, text: "Ray Tracing Enabled", detail: "Real-time ray tracing for immersive gaming" },
    { icon: Monitor, text: "NVIDIA G-SYNC", detail: "Eliminates screen tearing" },
    { icon: Headphones, text: "Hi-Res Audio", detail: "Dolby Atmos, 7.1 virtual surround" },
    { icon: ShieldCheck, text: "Military Grade", detail: "MIL-STD-810H durability certified" },
    { icon: RefreshCw, text: "Advanced Cooling", detail: "Vapor chamber with liquid metal" },
    { icon: Globe, text: "Global Warranty", detail: "2-year international warranty" },
  ];

  const warrantyInfo = [
    { period: "1 Year", coverage: "Manufacturer defects", type: "Standard Warranty" },
    { period: "2 Years", coverage: "Battery and adapter", type: "Extended Coverage" },
    { period: "3 Years", coverage: "Accidental damage", type: "Premium Protection" },
    { period: "Lifetime", coverage: "Technical support", type: "Phone & Online Support" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <a href="/shop" className="hover:text-blue-600 transition-colors">Shop</a>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <a href={`/category/₹{product.category}`} className="hover:text-blue-600 transition-colors capitalize">
              {product.category}
            </a>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Main Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden group">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                width={50}
                height={100}
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.discount && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save {product.discount}%
                    </span>
                  )}
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Best Seller
                  </span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    In Stock
                  </span>
                </div>
                
                {/* Wishlist Button */}
                <button
                  onClick={toggleWishlist}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart className={`h-6 w-6 ₹{isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-5 gap-3">
                {product.images.slice(0, 5).map((image, index) => (
                  <button
                    key={index}
                    className="bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
                  >
                    <Image
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-20 object-cover"
                      width={50}
                      height={50}
                    />
                  </button>
                ))}
              </div>

              {/* Quick Features */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <feature.icon className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              {/* Category & Brand */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">Category:</span>
                  <span className="ml-2 text-sm font-medium text-blue-600 capitalize">{product.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Brand:</span>
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-lg">
                    <Image width={50} height={100} src={`/images/brands/${product.brand?.toLowerCase()}.svg`} alt={product.brand} className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{product.brand}</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ₹{i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-lg font-bold text-gray-900">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-gray-500">•</span>
                <a href="#reviews" className="text-blue-600 hover:text-blue-700 font-medium">
                  {product.reviewCount} reviews
                </a>
                <span className="text-gray-500">•</span>
                <div className="flex items-center text-gray-600">
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="text-sm">1.2K views today</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <div className="text-3xl font-bold text-gray-900">₹{product.price}</div>
                {product.originalPrice && (
                  <>
                    <div className="text-xl text-gray-400 line-through">₹{product.originalPrice}</div>
                    <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-bold">
                      Save ₹{(product.originalPrice - product.price).toFixed(2)}
                    </div>
                  </>
                )}
                <div className="text-sm text-gray-500">Including VAT</div>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-gray-900">Color:</label>
                  <span className="text-sm text-gray-600">{selectedColor}</span>
                </div>
                <div className="flex space-x-3">
                  {["Space Gray", "Silver", "Midnight Blue", "Starlight"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`flex-1 py-3 rounded-lg border-2 text-center transition-all ₹{
                        selectedColor === color
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <div 
                          className="h-4 w-4 rounded-full mr-2"
                          style={{
                            backgroundColor: color.includes('Gray') ? '#6b7280' :
                                            color.includes('Silver') ? '#d1d5db' :
                                            color.includes('Blue') ? '#3b82f6' : '#f3f4f6'
                          }}
                        />
                        <span className="font-medium">{color}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-gray-900">Storage:</label>
                  <span className="text-sm text-gray-600">{selectedStorage}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["512GB SSD", "1TB SSD", "2TB SSD"].map((storage) => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={`py-3 rounded-lg border-2 text-center transition-all ₹{
                        selectedStorage === storage
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">{storage}</div>
                      <div className="text-xs mt-1">
                        {storage === "2TB SSD" ? "+₹200" : storage === "1TB SSD" ? "+₹100" : "Base"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="font-medium text-gray-900">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decreaseQuantity}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-0 focus:outline-none focus:ring-0"
                      min="1"
                    />
                    <button
                      onClick={increaseQuantity}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    Only <span className="font-bold text-red-500">12</span> left in stock
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-black transition-colors flex items-center justify-center"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Truck className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-gray-500">Delivery in 2-3 days</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <RotateCcw className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium">30-Day Returns</p>
                    <p className="text-xs text-gray-500">Hassle-free returns</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium">2-Year Warranty</p>
                    <p className="text-xs text-gray-500">Extended coverage</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Authentic</p>
                    <p className="text-xs text-gray-500">Genuine product</p>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <Share2 className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">Share:</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => shareProduct('facebook')}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => shareProduct('twitter')}
                    className="p-2 bg-blue-100 text-blue-400 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => shareProduct('whatsapp')}
                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {["overview", "specifications", "reviews", "support", "faq"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ₹{
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Overview</h3>
                  <p className="text-gray-600 leading-relaxed">
                    The {product.title} redefines premium computing with cutting-edge technology and uncompromising performance. 
                    Engineered for professionals, creators, and gamers who demand the best, this powerhouse combines 
                    industry-leading components with innovative design.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900">{feature.text}</span>
                            <p className="text-sm text-gray-600 mt-1">{feature.detail}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Whats in the Box</h4>
                    <ul className="space-y-3 bg-gray-50 p-6 rounded-xl">
                      <li className="flex items-center">
                        <Package className="h-5 w-5 text-blue-600 mr-3" />
                        <span>{product.title} Unit</span>
                      </li>
                      <li className="flex items-center">
                        <Zap className="h-5 w-5 text-blue-600 mr-3" />
                        <span>280W Power Adapter</span>
                      </li>
                      <li className="flex items-center">
                        <Keyboard className="h-5 w-5 text-blue-600 mr-3" />
                        <span>Custom Keyboard Skin</span>
                      </li>
                      <li className="flex items-center">
                        <Headphones className="h-5 w-5 text-blue-600 mr-3" />
                        <span>Cleaning Cloth & Stickers</span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-600 mr-3" />
                        <span>User Manual & Warranty Card</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productSpecs.slice(0, showMoreSpecs ? productSpecs.length : 9).map((spec, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex items-center mb-2">
                        <div className="p-2 bg-white rounded-lg mr-3">
                          <spec.icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{spec.label}</p>
                          <p className="font-medium text-gray-900">{spec.value}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{spec.detail}</p>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => setShowMoreSpecs(!showMoreSpecs)}
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showMoreSpecs ? 'Show Less' : 'Show All Specifications'}
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform ₹{showMoreSpecs ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* Review Summary */}
                <div className="bg-gray-50 rounded-2xl p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{product.rating.toFixed(1)}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600">Based on {product.reviewCount} reviews</p>
                    </div>
                    
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center">
                          <div className="flex items-center w-16">
                            <span className="text-sm text-gray-600 mr-2">{stars}</span>
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          </div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `₹{(stars / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12">75%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Form */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} className="text-gray-300 hover:text-yellow-400">
                            <Star className="h-8 w-8" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea 
                      placeholder="Share your experience with this product..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                    />
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "support" && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {warrantyInfo.map((item, index) => (
                    <div key={index} className="bg-blue-50 p-6 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{item.period}</div>
                      <p className="font-medium text-gray-900 mb-1">{item.coverage}</p>
                      <p className="text-sm text-gray-600">{item.type}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Call Support</p>
                          <p className="text-sm text-gray-600">1-800-TECH-SUPPORT</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Email Support</p>
                          <p className="text-sm text-gray-600">support@techhub.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Support Hours</p>
                          <p className="text-sm text-gray-600">24/7 Phone & Chat Support</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Service Centers</p>
                          <p className="text-sm text-gray-600">500+ locations worldwide</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-4">
                {[
                  { q: "What is the battery life like?", a: "Up to 8 hours of normal usage, or up to 4 hours of intensive gaming." },
                  { q: "Can I upgrade the RAM and storage?", a: "Yes, both RAM and storage are user-upgradeable." },
                  { q: "Does it support external monitors?", a: "Supports up to 3 external 4K monitors at 60Hz." },
                  { q: "What type of warranty is included?", a: "2-year manufacturer warranty covering parts and labor." },
                  { q: "Is the keyboard spill-resistant?", a: "Yes, the keyboard features IP52 water resistance." },
                ].map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                      className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{faq.q}</span>
                      <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${activeFAQ === index ? 'rotate-180' : ''}`} />
                    </button>
                    {activeFAQ === index && (
                      <div className="p-4 pt-0 border-t border-gray-200">
                        <p className="text-gray-600">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
              <a href="/products" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {recentlyViewed.slice(0, 5).map((item) => (
                <a
                  key={item.id}
                  href={`/products/₹{item.slug}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-40 object-contain mb-4"
                      width={50}
                      height={100}
                    />
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">{item.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">₹{item.price}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <RelatedProducts />
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          <ShoppingCart className="h-6 w-6" />
        </button>
        <button className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-black transition-colors">
          <HelpCircle className="h-6 w-6" />
        </button>
      </div>
    </main>
  );
}

// Add missing icon
const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);