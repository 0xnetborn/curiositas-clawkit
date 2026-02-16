"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface EmptyStateWidgetProps {
  icon?: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyStateWidget({
  icon = "📭",
  title = "No Data Yet",
  description = "There are no items to display here.",
  action,
}: EmptyStateWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    animate(containerRef.current, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 600,
      easing: "easeOutCubic",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <div className="text-5xl mb-4 filter grayscale opacity-50" role="img" aria-label={icon}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 opacity-80">
        {title}
      </h3>
      <p className="text-sm text-[var(--foreground)] opacity-60 max-w-xs mb-6">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium
                     hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2
                     focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
