'use client';

import { ReactNode, lazy, Suspense } from 'react';

interface LazyWidgetProps {
  children: ReactNode;
  fallback?: ReactNode;
  height?: string;
}

export default function LazyWidget({ 
  children, 
  fallback = <WidgetSkeleton height="h-64" />,
  height = 'h-auto'
}: LazyWidgetProps) {
  return (
    <div className={`${height} opacity-0 animate-fade-in`}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  );
}

export function WidgetSkeleton({ height = 'h-32' }: { height?: string }) {
  return (
    <div className={`${height} bg-white/5 border border-white/10 rounded animate-pulse`}>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/10 rounded w-1/3" />
        <div className="h-8 bg-white/5 rounded w-2/3" />
        <div className="h-3 bg-white/5 rounded w-1/2" />
      </div>
    </div>
  );
}

// Lazy loaded widget types
export const LazyChartsWidget = lazy(() => import('@/components/ChartsWidget').then(m => ({ default: m.default })));
export const LazySystemStatsWidget = lazy(() => import('@/components/SystemStatsWidget').then(m => ({ default: m.default })));
export const LazyLiveFeedWidget = lazy(() => import('@/components/LiveFeedWidget').then(m => ({ default: m.default })));
export const LazyAnalyticsDashboard = lazy(() => import('@/components/AnalyticsDashboard').then(m => ({ default: m.default })));
export const LazyQuickActionsWidget = lazy(() => import('@/components/QuickActionsWidget').then(m => ({ default: m.default })));
