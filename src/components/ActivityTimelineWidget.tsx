"use client";

import { useState, useEffect, useRef } from "react";
import { animate } from "animejs";

interface Activity {
  id: string;
  type: "deploy" | "create" | "update" | "delete" | "alert" | "success";
  title: string;
  description: string;
  timestamp: Date;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "deploy",
    title: "Squad Deployed",
    description: "Marketing Co-Founder squad deployed to production",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    type: "create",
    title: "New Pipeline Created",
    description: "Lead generation pipeline initialized",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: "3",
    type: "success",
    title: "Task Completed",
    description: "Content generation for Twitter completed",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "4",
    type: "update",
    title: "Squad Updated",
    description: "Athena agent prompts refined",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: "5",
    type: "alert",
    title: "Rate Limit Warning",
    description: "API usage at 80% of quota",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
];

const typeStyles = {
  deploy: { icon: "🚀", color: "text-teal-400", bg: "bg-teal-400/10" },
  create: { icon: "✨", color: "text-purple-400", bg: "bg-purple-400/10" },
  update: { icon: "🔄", color: "text-blue-400", bg: "bg-blue-400/10" },
  delete: { icon: "🗑️", color: "text-red-400", bg: "bg-red-400/10" },
  alert: { icon: "⚠️", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  success: { icon: "✅", color: "text-green-400", bg: "bg-green-400/10" },
};

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  
  return date.toLocaleDateString();
}

export default function ActivityTimelineWidget() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [isExpanded, setIsExpanded] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && isExpanded) {
      const items = containerRef.current.querySelectorAll(".activity-item");
      items.forEach((item, i) => {
        animate(item as HTMLElement, {
          translateX: [20, 0],
          opacity: [0, 1],
          delay: i * 100,
          easing: "easeOutCubic",
          duration: 400,
        });
      });
    }
  }, [isExpanded]);

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="text-teal-400">📊</span>
          Activity Timeline
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white transition-colors text-sm"
          aria-label={isExpanded ? "Collapse timeline" : "Expand timeline"}
        >
          {isExpanded ? "▲" : "▼"}
        </button>
      </div>

      {isExpanded && (
        <div ref={containerRef} className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {activities.map((activity) => {
            const style = typeStyles[activity.type];
            return (
              <div
                key={activity.id}
                className="activity-item flex gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${style.bg}`}>
                  <span>{style.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${style.color}`}>
                      {activity.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!isExpanded && (
        <p className="text-sm text-gray-500 text-center py-2">
          {activities.length} activities • Click to expand
        </p>
      )}
    </div>
  );
}
