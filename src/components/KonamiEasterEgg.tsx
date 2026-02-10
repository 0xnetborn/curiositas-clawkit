'use client';

import { useEffect, useState, useCallback } from 'react';

export default function KonamiEasterEgg() {
  const [activated, setActivated] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleKeySequence = useCallback((e: KeyboardEvent) => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    
    // We'll use a simple approach - track recent keys in sessionStorage
    const key = e.code;
    const history = JSON.parse(sessionStorage.getItem('konami_history') || '[]');
    history.push(key);
    sessionStorage.setItem('konami_history', JSON.stringify(history.slice(-10)));
    
    const stored = JSON.parse(sessionStorage.getItem('konami_history') || '[]');
    const match = stored.join(',') === konamiCode.join(',');
    
    if (match && !activated) {
      setActivated(true);
      setShowToast(true);
      // Trigger a fun visual effect - document body glow
      document.body.classList.add('konami-active');
      setTimeout(() => {
        document.body.classList.remove('konami-active');
      }, 3000);
    }
  }, [activated]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeySequence);
    return () => window.removeEventListener('keydown', handleKeySequence);
  }, [handleKeySequence]);

  // Clean up history on mount
  useEffect(() => {
    sessionStorage.removeItem('konami_history');
  }, []);

  if (!showToast) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 fade-in">
      <div className="bg-teal-500 text-black px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
        <span className="text-2xl">🦝</span>
        <div>
          <p className="font-bold text-sm">Fabbrizzio Mode Activated!</p>
          <p className="text-xs opacity-75">You found the easter egg 🎉</p>
        </div>
      </div>
    </div>
  );
}
