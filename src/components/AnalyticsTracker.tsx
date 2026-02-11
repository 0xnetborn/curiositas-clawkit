"use client";

import { useClickTracking, useScrollTracking, useVisibilityTracking } from '@/components/AnalyticsHooks';

export default function AnalyticsTracker() {
  useClickTracking();
  useScrollTracking({ threshold: 50 });
  useScrollTracking({ threshold: 100 });
  useVisibilityTracking({ selector: '[data-analytics-visibility]', threshold: 0.5 });
  return null;
}
