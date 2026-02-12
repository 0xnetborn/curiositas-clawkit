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

export function WidgetSkeleton({ height = 'h-32', type = 'default' }: { height?: string; type?: 'default' | 'stats' | 'chart' | 'feed' }) {
  if (type === 'stats') {
    return (
      <div className={`${height} bg-white/5 border border-white/10 rounded-lg overflow-hidden animate-pulse`}>
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-lg" />
            <div className="space-y-2">
              <div className="h-3 bg-white/10 rounded w-20" />
              <div className="h-5 bg-white/5 rounded w-32" />
            </div>
          </div>
          {/* Stats bars */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs">
              <div className="h-3 bg-white/5 rounded w-16" />
              <div className="h-3 bg-white/10 rounded w-12" />
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white/10 rounded-full w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className={`${height} bg-white/5 border border-white/10 rounded-lg overflow-hidden animate-pulse`}>
        <div className="p-4 border-b border-white/5">
          <div className="h-4 bg-white/10 rounded w-1/4" />
        </div>
        <div className="p-4 space-y-4">
          {/* Chart bars */}
          <div className="flex items-end justify-between h-32 gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="flex-1 bg-white/5 rounded-t" style={{ height: `${20 + Math.random() * 60}%` }} />
            ))}
          </div>
          {/* Labels */}
          <div className="flex justify-between gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-2 bg-white/5 rounded flex-1" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'feed') {
    return (
      <div className={`${height} bg-white/5 border border-white/10 rounded-lg overflow-hidden animate-pulse`}>
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-white/10 rounded w-1/4" />
            <div className="h-6 bg-white/5 rounded w-16" />
          </div>
        </div>
        <div className="p-4 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 mt-1.5 bg-white/10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-white/10 rounded w-3/4" />
                <div className="h-2 bg-white/5 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${height} bg-white/5 border border-white/10 rounded-lg animate-pulse`}>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-white/10 rounded w-1/3" />
            <div className="h-3 bg-white/5 rounded w-1/2" />
          </div>
        </div>
        <div className="h-px bg-white/5" />
        <div className="grid grid-cols-3 gap-4">
          <div className="h-8 bg-white/5 rounded" />
          <div className="h-8 bg-white/5 rounded" />
          <div className="h-8 bg-white/5 rounded" />
        </div>
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
