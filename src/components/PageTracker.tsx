"use client";

import { useEffect } from 'react';
import { usePageTracking } from '@/components/AnalyticsContext';

interface PageTrackerProps {
  path: string;
  title: string;
}

export default function PageTracker({ path, title }: PageTrackerProps) {
  usePageTracking(path, title);
  return null;
}
