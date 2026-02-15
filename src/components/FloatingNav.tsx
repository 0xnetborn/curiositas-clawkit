"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FloatingNavProps {
  navItems?: { label: string; href: string }[];
}

export default function FloatingNav({ 
  navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Docs", href: "/#docs" },
  ]
}: FloatingNavProps) {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Don't show on dashboard pages
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <div
      className="floating-nav fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500"
      style={{ 
        opacity: isVisible ? 1 : 0, 
        pointerEvents: isVisible ? "auto" : "none",
        transform: `translateX(-50%) translateY(${isVisible ? 0 : -20}px)`
      }}
    >
      <nav className="flex items-center gap-1 px-2 py-2 rounded-full bg-gray-900/80 backdrop-blur-md border border-teal-500/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="px-4 py-2 text-sm text-gray-300 hover:text-teal-300 hover:bg-teal-500/10 rounded-full transition-all duration-200 font-medium"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/dashboard"
          className="ml-2 px-5 py-2 text-sm bg-teal-500 text-gray-900 hover:bg-teal-400 rounded-full font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(45,212,191,0.5)]"
        >
          Dashboard →
        </Link>
      </nav>
    </div>
  );
}
