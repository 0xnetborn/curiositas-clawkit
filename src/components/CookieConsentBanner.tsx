'use client';

import { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing banner for 1 second for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
        if (bannerRef.current) {
          animate(bannerRef.current, {
            translateY: [100, 0],
            opacity: [0, 1],
            easing: 'outExpo',
            duration: 800,
          });
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(fullConsent));
    animateExit();
  };

  const handleDeclineAll = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(minimalConsent));
    animateExit();
  };

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    animateExit();
  };

  const animateExit = () => {
    if (bannerRef.current) {
      animate(bannerRef.current, {
        translateY: [0, 100],
        opacity: [1, 0],
        easing: 'inExpo',
        duration: 600,
        complete: () => {
          setIsVisible(false);
        },
      });
    } else {
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-gradient-to-t from-black/95 to-gray-900/95 backdrop-blur-xl border-t border-teal-500/30"
      style={{ opacity: 0, transform: 'translateY(100px)' }}
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Banner Content */}
        <div className={showSettings ? 'hidden' : 'block'}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 
                id="cookie-title" 
                className="text-lg font-semibold text-white mb-2 flex items-center gap-2"
              >
                <span className="text-2xl">🍪</span>
                We value your privacy
              </h3>
              <p 
                id="cookie-description" 
                className="text-gray-300 text-sm leading-relaxed"
              >
                We use cookies to enhance your browsing experience, serve personalized content, 
                and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 hover:bg-gray-800/50 rounded-lg"
                aria-label="Open cookie settings"
              >
                Customize
              </button>
              <button
                onClick={handleDeclineAll}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 border border-gray-600 hover:border-gray-500 rounded-lg"
                aria-label="Decline all optional cookies"
              >
                Decline
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 text-sm font-medium text-black bg-teal-400 hover:bg-teal-300 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)]"
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="animate-fadeIn">
            <h4 className="text-white font-medium mb-4 flex items-center gap-2">
              <span className="text-teal-400">⚙️</span>
              Cookie Preferences
            </h4>
            
            <div className="space-y-3 mb-6">
              {/* Necessary Cookies */}
              <label className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg cursor-not-allowed opacity-75">
                <div>
                  <span className="text-white font-medium text-sm">Necessary Cookies</span>
                  <p className="text-gray-400 text-xs mt-0.5">Required for the website to function properly</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-teal-500"
                />
              </label>

              {/* Analytics Cookies */}
              <label className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-800/70 transition-colors">
                <div>
                  <span className="text-white font-medium text-sm">Analytics Cookies</span>
                  <p className="text-gray-400 text-xs mt-0.5">Help us understand how visitors interact with our website</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences(p => ({ ...p, analytics: e.target.checked }))}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-teal-500 cursor-pointer"
                />
              </label>

              {/* Marketing Cookies */}
              <label className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-800/70 transition-colors">
                <div>
                  <span className="text-white font-medium text-sm">Marketing Cookies</span>
                  <p className="text-gray-400 text-xs mt-0.5">Used to deliver personalized advertisements</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences(p => ({ ...p, marketing: e.target.checked }))}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-teal-500 cursor-pointer"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                aria-label="Back to main banner"
              >
                ← Back
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 text-sm font-medium text-black bg-teal-400 hover:bg-teal-300 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)]"
                aria-label="Save cookie preferences"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
