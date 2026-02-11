'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CookieConsentBanner from '@/components/CookieConsentBanner';

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
  ];

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
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <span>WORKSPACE</span>
            <span>/</span>
            <span className="text-white uppercase">{pathname.split('/').pop() || 'DASHBOARD'}</span>
          </div>
          <div className="flex items-center gap-4">
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
        </main>
      </div>
    </div>
  );
}
