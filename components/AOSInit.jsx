"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return null;
}
