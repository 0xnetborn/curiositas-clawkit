"use client";

import { useEffect, useRef } from 'react';
import { useAnalytics } from '@/components/AnalyticsContext';

// Re-export analytics functions for convenience
export { useAnalytics };

interface ClickTrackingOptions {
  selector?: string;
}

export function useClickTracking(options: ClickTrackingOptions = {}) {
  const { trackEvent } = useAnalytics();
  const selector = options.selector || 'a, button, [data-trackable], [data-analytics-click]';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find closest trackable element
      const trackableElement = target.closest(selector);
      if (!trackableElement) return;

      const element = trackableElement as HTMLElement;
      
      // Extract properties
      const properties: Record<string, string | number | boolean> = {
        element: element.tagName.toLowerCase(),
      };

      if (element.getAttribute('id')) properties.id = element.getAttribute('id')!;
      if (element.getAttribute('class')) properties.class = element.getAttribute('class')!.split(' ')[0];
      if (element.getAttribute('href')) properties.href = element.getAttribute('href')!;
      if (element.getAttribute('aria-label')) properties.ariaLabel = element.getAttribute('aria-label')!;
      if (element.getAttribute('data-analytics-event')) properties.customEvent = element.getAttribute('data-analytics-event')!;
      
      // Get text content (trimmed, limited)
      const text = element.textContent?.trim().slice(0, 50);
      if (text) properties.text = text;

      // Determine event name
      const name = element.getAttribute('data-analytics-event') || `${element.tagName.toLowerCase()}_click`;

      trackEvent(name, properties);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [selector, trackEvent]);
}

interface ScrollTrackingOptions {
  threshold?: number; // Percentage scrolled (0-100)
  onlyOnce?: boolean;
}

export function useScrollTracking(options: ScrollTrackingOptions = {}) {
  const { trackEvent } = useAnalytics();
  const { threshold = 75, onlyOnce = true } = options;
  const trackedRef = useRef<Set<number> | null>(typeof window !== 'undefined' ? new Set<number>() : null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent >= threshold) {
        if (trackedRef.current && !trackedRef.current.has(threshold)) {
          if (onlyOnce) trackedRef.current.add(threshold);
          trackEvent('scroll_depth', { depth: threshold, percent: true });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, onlyOnce, trackEvent]);
}

interface VisibilityTrackingOptions {
  selector?: string;
  threshold?: number; // 0-1 visibility ratio
}

export function useVisibilityTracking(options: VisibilityTrackingOptions = {}) {
  const { trackEvent } = useAnalytics();
  const { selector = '[data-analytics-visibility]', threshold = 0.5 } = options;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const name = element.getAttribute('data-analytics-visibility') || 'element_visible';
            const properties: Record<string, string | number | boolean> = {
              element: element.tagName.toLowerCase(),
              id: element.getAttribute('id') || '',
              class: element.getAttribute('class')?.split(' ')[0] || '',
            };

            trackEvent(name, properties);
            observer.unobserve(element); // Only track once
          }
        });
      },
      { threshold }
    );

    document.querySelectorAll(selector).forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, threshold, trackEvent]);
}
