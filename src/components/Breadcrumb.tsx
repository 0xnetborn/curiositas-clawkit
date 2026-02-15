'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { animate, stagger } from 'animejs';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.breadcrumb-item');
    
    animate(items, {
      opacity: [0, 1],
      translateY: [-10, 0],
      delay: stagger(100),
      duration: 400,
      easing: 'easeOutCubic',
    });
  }, []);

  return (
    <nav 
      ref={containerRef}
      aria-label="Breadcrumb" 
      className={`flex items-center gap-2 text-sm ${className}`}
    >
      <Link 
        href="/"
        className="breadcrumb-item text-gray-400 hover:text-teal-400 transition-colors"
      >
        Home
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-gray-500">/</span>
          {item.href ? (
            <Link 
              href={item.href}
              className="breadcrumb-item text-gray-400 hover:text-teal-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumb-item text-gray-200">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
