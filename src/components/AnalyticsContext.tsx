"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface AnalyticsEvent {
  id: string;
  name: string;
  properties?: Record<string, string | number | boolean>;
  timestamp: number;
}

interface PageView {
  path: string;
  title: string;
  timestamp: number;
  referrer?: string;
  duration?: number;
}

interface AnalyticsContextType {
  trackPageView: (path: string, title: string) => void;
  trackEvent: (name: string, properties?: Record<string, string | number | boolean>) => void;
  getPageViews: () => PageView[];
  getEvents: () => AnalyticsEvent[];
  getTotalViews: () => number;
  getTotalEvents: () => number;
  clearAnalytics: () => void;
  isTrackingEnabled: boolean;
  toggleTracking: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(true);
  const [currentPath, setCurrentPath] = useState('');
  const [startTime, setStartTime] = useState<number>(0);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedViews = localStorage.getItem('curiokit_pageviews');
    const savedEvents = localStorage.getItem('curiokit_events');
    const savedTracking = localStorage.getItem('curiokit_tracking_enabled');
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedViews) setPageViews(JSON.parse(savedViews));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedTracking !== null) setIsTrackingEnabled(JSON.parse(savedTracking));
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (!isTrackingEnabled) return;
    localStorage.setItem('curiokit_pageviews', JSON.stringify(pageViews.slice(-100))); // Keep last 100
    localStorage.setItem('curiokit_events', JSON.stringify(events.slice(-100))); // Keep last 100
  }, [pageViews, events, isTrackingEnabled]);

  const trackPageView = useCallback((path: string, title: string) => {
    if (!isTrackingEnabled) return;
    
    // Calculate duration of previous page
    let duration: number | undefined;
    if (currentPath && startTime) {
      duration = Date.now() - startTime;
    }

    const newPageView: PageView = {
      path,
      title,
      timestamp: Date.now(),
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
      duration,
    };

    setPageViews(prev => [...prev.slice(-99), newPageView]);
    setCurrentPath(path);
    setStartTime(Date.now());

    // Console log for debugging (dev mode)
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Page View: ${path} - ${title}`);
    }
  }, [isTrackingEnabled, currentPath, startTime]);

  const trackEvent = useCallback((name: string, properties?: Record<string, string | number | boolean>) => {
    if (!isTrackingEnabled) return;

    const newEvent: AnalyticsEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      properties,
      timestamp: Date.now(),
    };

    setEvents(prev => [...prev.slice(-99), newEvent]);

    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Event: ${name}`, properties);
    }
  }, [isTrackingEnabled]);

  const getPageViews = useCallback(() => pageViews, [pageViews]);
  const getEvents = useCallback(() => events, [events]);
  const getTotalViews = useCallback(() => pageViews.length, [pageViews]);
  const getTotalEvents = useCallback(() => events.length, [events]);
  
  const clearAnalytics = useCallback(() => {
    setPageViews([]);
    setEvents([]);
    localStorage.removeItem('curiokit_pageviews');
    localStorage.removeItem('curiokit_events');
  }, []);

  const toggleTracking = useCallback(() => {
    setIsTrackingEnabled(prev => {
      const next = !prev;
      localStorage.setItem('curiokit_tracking_enabled', JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AnalyticsContext.Provider
      value={{
        trackPageView,
        trackEvent,
        getPageViews,
        getEvents,
        getTotalViews,
        getTotalEvents,
        clearAnalytics,
        isTrackingEnabled,
        toggleTracking,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

// Auto-track page views on route changes
export function usePageTracking(path: string, title: string) {
  const { trackPageView, isTrackingEnabled } = useAnalytics();

  useEffect(() => {
    if (!isTrackingEnabled) return;
    trackPageView(path, title);
  }, [path, title, trackPageView, isTrackingEnabled]);
}
