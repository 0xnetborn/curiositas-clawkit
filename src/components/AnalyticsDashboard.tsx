"use client";

import React, { useEffect, useState } from 'react';
import { useAnalytics } from '@/components/AnalyticsContext';

interface AnalyticsDashboardProps {
  compact?: boolean;
}

export default function AnalyticsDashboard({ compact = false }: AnalyticsDashboardProps) {
  const { 
    getPageViews, 
    getEvents, 
    getTotalViews, 
    getTotalEvents, 
    clearAnalytics,
    isTrackingEnabled,
    toggleTracking
  } = useAnalytics();

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'pageviews' | 'events'>('overview');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const pageViews = getPageViews();
  const events = getEvents();
  const totalViews = getTotalViews();
  const totalEvents = getTotalEvents();

  // Get unique pages
  const uniquePages = new Set(pageViews.map(pv => pv.path)).size;
  
  // Get top pages
  const pageCounts: Record<string, number> = {};
  pageViews.forEach(pv => {
    pageCounts[pv.path] = (pageCounts[pv.path] || 0) + 1;
  });
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Get top events
  const eventCounts: Record<string, number> = {};
  events.forEach(e => {
    eventCounts[e.name] = (eventCounts[e.name] || 0) + 1;
  });
  const topEvents = Object.entries(eventCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Get recent activity
  const recentActivity = [...pageViews, ...events]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (compact) {
    return (
      <div className="bg-slate-900/50 border border-teal-500/20 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-teal-400">📊 Analytics</h3>
          <button
            onClick={toggleTracking}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              isTrackingEnabled 
                ? 'bg-teal-500/20 text-teal-400' 
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {isTrackingEnabled ? '● Tracking' : '○ Paused'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{totalViews}</div>
            <div className="text-xs text-slate-400">Page Views</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{totalEvents}</div>
            <div className="text-xs text-slate-400">Events</div>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          {uniquePages} unique pages • Last activity: {recentActivity[0] ? formatTime(recentActivity[0].timestamp) : 'None'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 border border-teal-500/20 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-800/50 px-4 py-3 border-b border-teal-500/10">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-white">📊 Analytics Dashboard</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTracking}
              className={`text-xs px-3 py-1 rounded transition-colors ${
                isTrackingEnabled 
                  ? 'bg-teal-500/20 text-teal-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {isTrackingEnabled ? '● Tracking Active' : '○ Tracking Paused'}
            </button>
            <button
              onClick={clearAnalytics}
              className="text-xs px-3 py-1 bg-slate-700/50 text-slate-400 rounded hover:bg-slate-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-teal-500/10">
        {(['overview', 'pageviews', 'events'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'text-teal-400 bg-teal-500/10 border-b-2 border-teal-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-white">{totalViews}</div>
                <div className="text-xs text-slate-400 mt-1">Total Page Views</div>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-white">{totalEvents}</div>
                <div className="text-xs text-slate-400 mt-1">Total Events</div>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-white">{uniquePages}</div>
                <div className="text-xs text-slate-400 mt-1">Unique Pages</div>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-white">{events.length > 0 ? (events.filter(e => e.name.includes('click')).length) : 0}</div>
                <div className="text-xs text-slate-400 mt-1">Interactions</div>
              </div>
            </div>

            {/* Top Pages & Events */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">Top Pages</h4>
                <div className="space-y-2">
                  {topPages.length > 0 ? topPages.map(([path, count]) => (
                    <div key={path} className="flex items-center justify-between bg-slate-800/30 rounded-lg px-3 py-2">
                      <span className="text-sm text-slate-300 truncate max-w-[200px]">{path}</span>
                      <span className="text-sm font-medium text-teal-400">{count}</span>
                    </div>
                  )) : (
                    <p className="text-sm text-slate-500">No page views yet</p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">Top Events</h4>
                <div className="space-y-2">
                  {topEvents.length > 0 ? topEvents.map(([name, count]) => (
                    <div key={name} className="flex items-center justify-between bg-slate-800/30 rounded-lg px-3 py-2">
                      <span className="text-sm text-slate-300 truncate max-w-[200px]">{name}</span>
                      <span className="text-sm font-medium text-teal-400">{count}</span>
                    </div>
                  )) : (
                    <p className="text-sm text-slate-500">No events yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pageviews' && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {pageViews.length > 0 ? pageViews.slice().reverse().map((pv, i) => (
              <div key={i} className="flex items-center justify-between bg-slate-800/30 rounded-lg px-3 py-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">{formatDate(pv.timestamp)}</span>
                  <span className="text-sm text-white">{pv.path}</span>
                </div>
                <div className="flex items-center gap-3">
                  {pv.duration && (
                    <span className="text-xs text-teal-400">{Math.round(pv.duration / 1000)}s</span>
                  )}
                  <span className="text-xs text-slate-500">{formatTime(pv.timestamp)}</span>
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-500 text-center py-8">No page views recorded</p>
            )}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {events.length > 0 ? events.slice().reverse().map((e, i) => (
              <div key={i} className="flex items-center justify-between bg-slate-800/30 rounded-lg px-3 py-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">{formatDate(e.timestamp)}</span>
                  <span className="text-sm text-white">{e.name}</span>
                  {e.properties && (
                    <span className="text-xs text-slate-400">
                      {Object.entries(e.properties).slice(0, 2).map(([k, v]) => `${k}:${v}`).join(', ')}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500">{formatTime(e.timestamp)}</span>
              </div>
            )) : (
              <p className="text-sm text-slate-500 text-center py-8">No events recorded</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
