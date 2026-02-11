"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useTheme } from './ThemeContext';
import TrustedBySection from './TrustedBySection';

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  // Intentionally setting mounted state in effect for hydration mismatch prevention
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setMounted(true);
  }, []);

  const links = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Documentation", href: "#" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  };

  const socials = [
    { name: "GitHub", icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z", href: "https://github.com/0xnetborn/curiositas-clawkit", aria: "GitHub" },
    { name: "Twitter", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z", href: "https://x.com/curiositas", aria: "Twitter/X" },
    { name: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", href: "https://linkedin.com/company/curiositas", aria: "LinkedIn" },
  ];

  return (
    <footer 
      className={`border-t backdrop-blur-sm transition-colors ${mounted && theme === 'light' ? 'border-slate-200 bg-white/50' : 'border-white/10 bg-black/50'}`}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Built With / Trusted By Strip */}
      <div className="border-b border-white/5">
        <TrustedBySection />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4" aria-label="CurioKit home">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">CK</span>
              </div>
              <span className="font-bold text-lg">CurioKit</span>
            </Link>
            <p className={`text-sm mb-4 transition-colors ${mounted && theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>
              Deploy AI agent squads for marketing & operations.
            </p>
            <div className="flex space-x-4" role="list" aria-label="Social media links">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.aria}
                  role="listitem"
                  className={`transition-colors ${mounted && theme === 'light' ? 'text-slate-500 hover:text-teal-600' : 'text-gray-400 hover:text-teal-400'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className={`font-semibold text-sm mb-4 transition-colors ${mounted && theme === 'light' ? 'text-slate-900' : ''}`}>Product</h3>
            <ul className="space-y-2" role="list" aria-label="Product links">
              {links.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-black rounded ${mounted && theme === 'light' ? 'text-slate-500 hover:text-slate-900' : 'text-gray-400 hover:text-teal-400'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className={`font-semibold text-sm mb-4 transition-colors ${mounted && theme === 'light' ? 'text-slate-900' : ''}`}>Company</h3>
            <ul className="space-y-2" role="list" aria-label="Company links">
              {links.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-black rounded ${mounted && theme === 'light' ? 'text-slate-500 hover:text-slate-900' : 'text-gray-400 hover:text-teal-400'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className={`font-semibold text-sm mb-4 transition-colors ${mounted && theme === 'light' ? 'text-slate-900' : ''}`}>Legal</h3>
            <ul className="space-y-2" role="list" aria-label="Legal links">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-black rounded ${mounted && theme === 'light' ? 'text-slate-500 hover:text-slate-900' : 'text-gray-400 hover:text-teal-400'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center ${mounted && theme === 'light' ? 'border-slate-200' : 'border-white/5'}`}>
          <p className={`text-sm transition-colors ${mounted && theme === 'light' ? 'text-slate-500' : 'text-gray-500'}`}>
            © {currentYear} Curiositas Studio. All rights reserved.
          </p>
          <p className={`text-sm mt-2 md:mt-0 transition-colors ${mounted && theme === 'light' ? 'text-slate-500' : 'text-gray-600'}`}>
            Made with ⚡ by Fabbrizzio
          </p>
        </div>
      </div>
    </footer>
  );
}
