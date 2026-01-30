"use client"
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);
return (
<html lang="en">
<body className="bg-gray-50">
<Header />
{children}
<Footer />
</body>
</html>
)
}