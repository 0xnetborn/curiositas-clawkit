'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import SearchOverlay from '@/components/dashboard/SearchOverlay';
import Breadcrumb from '@/components/Breadcrumb';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'OVERVIEW', path: '/dashboard', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' },
    { name: 'SQUAD', path: '/dashboard/squad', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75' },
    { name: 'PIPELINE', path: '/dashboard/pipeline', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
    { name: 'ARCHIVE', path: '/dashboard/archive', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z polyline points="14 2 14 8 20 8"' },
    { name: 'SETTINGS', path: '/dashboard/settings', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' },
  ];

  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-sans selection:bg-teal-500/30">
      {/* Sidebar */}
      <aside className="w-16 md:w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl flex flex-col justify-between z-20">
        <div>
          {/* Logo Area */}
          <Link href="/" className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-white/5 hover:bg-white/5 transition-colors">
            <div className="w-8 h-8 relative flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-teal-500">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="hidden md:block ml-3 font-mono text-sm tracking-widest text-white/80">CURIOKIT</span>
          </Link>

          {/* Nav Links */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${
                    isActive 
                      ? 'bg-teal-500/10 text-teal-500 border border-teal-500/20' 
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                  <span className="hidden md:block text-[10px] font-mono tracking-wider">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* System Health Indicator */}
        <div className="p-4 border-t border-white/5">
          <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/5 border border-teal-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-[10px] font-mono text-teal-400 tracking-wider">SYSTEM HEALTH</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] text-white/40 font-mono">
                <span>API LATENCY</span>
                <span className="text-teal-500">24ms</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: '24%' }} />
              </div>
              <div className="flex justify-between text-[9px] text-white/40 font-mono">
                <span>MEMORY</span>
                <span className="text-emerald-400">1.2GB</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '48%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs font-mono">
              TR
            </div>
            <div className="hidden md:block">
              <div className="text-xs text-white">Tommaso R.</div>
              <div className="text-[10px] text-white/40 font-mono">ADMIN</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black pointer-events-none -z-10" />
        
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-sm">
          <Breadcrumb 
            items={pathname.split('/').filter(Boolean).slice(1).map((segment, idx, arr) => ({
              label: segment.toUpperCase(),
              href: idx < arr.length - 1 ? '/' + arr.slice(0, idx + 1).join('/') : undefined
            }))} 
          />
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60 hover:bg-white/10 hover:text-white transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span>Search</span>
              <kbd className="ml-1 px-1.5 py-0.5 bg-white/10 rounded text-[10px]">⌘K</kbd>
            </button>
            <div className="flex items-center gap-2 px-3 py-1 bg-teal-500/5 border border-teal-500/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-[10px] font-mono text-teal-500 tracking-wider">SYSTEM OPTIMAL</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          {children}
          <CookieConsentBanner />
          <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </main>
      </div>
    </div>
  );
}
