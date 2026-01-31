import { Facebook, Instagram, Mail, MapPin, Phone, ShoppingBag, Twitter, Youtube } from "lucide-react";
import Image from "next/image";


export default function Footer() {
  return(
    <>
     <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <ShoppingBag className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-2xl font-bold">ACT</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Your trusted partner for premium electronics and tech accessories since 2010. 
                We are committed to bringing you the latest technology at competitive prices.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["Home", "About Us", "Shop", "Categories", "Deals", "New Arrivals", "Brands"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-lg mb-6">Support</h3>
              <ul className="space-y-3">
                {["Help Center", "Contact Us", "Shipping Info", "Returns", "Warranty", "FAQ", "Privacy Policy"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-lg mb-6">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">Call us</p>
                    <p className="font-medium">1-800-TECH-HUB</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">Email us</p>
                    <p className="font-medium">support@ACT.com</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">Visit us</p>
                    <p className="font-medium">123 Tech Street, Silicon Valley</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-200 text-sm">
                © {new Date().getFullYear()} ACT. All rights reserved.
              </p>
              
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <Image src="/images/payment-visa.svg" alt="Visa" className="h-8" width={50} height={50} />
                <Image src="/images/payment-mastercard.svg" alt="Mastercard" className="h-8" width={50} height={50} />
                <Image src="/images/payment-paypal.svg" alt="PayPal" className="h-8" width={50} height={50} />
                <Image src="/images/payment-applepay.svg" alt="Apple Pay" className="h-8" width={50} height={50} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

     