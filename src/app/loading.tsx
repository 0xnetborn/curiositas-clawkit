'use client';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-2 border-white/10 border-t-teal-500 rounded-full animate-spin" />
      <p className="mt-4 font-mono text-xs text-white/40 tracking-widest animate-pulse">LOADING MODULES...</p>
    </div>
  );
}