'use client';

import { useState } from 'react';
import { animate } from 'animejs';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  shortcut?: string;
  color: 'teal' | 'amber' | 'purple' | 'pink';
}

const actions: QuickAction[] = [
  { id: 'new-squad', label: 'New Squad', icon: '🚀', shortcut: 'N', color: 'teal' },
  { id: 'create-task', label: 'Create Task', icon: '✓', shortcut: 'T', color: 'amber' },
  { id: 'schedule', label: 'Schedule', icon: '📅', shortcut: 'S', color: 'purple' },
  { id: 'export', label: 'Export', icon: '↓', shortcut: 'E', color: 'pink' },
];

export default function QuickActionsWidget() {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const handleAction = (action: QuickAction) => {
    // Trigger button press animation
    const btn = document.getElementById(`quick-action-${action.id}`);
    if (btn) {
      animate(btn, {
        scale: [1, 0.9, 1],
        duration: 150,
        ease: 'easeOutQuad',
      });
    }

    // Log action (could be extended to actual functionality)
    console.log(`Quick action triggered: ${action.label}`);
  };

  return (
    <div className="p-5 bg-white/5 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-mono text-white/60 uppercase tracking-wider">
          Quick Actions
        </h3>
        <span className="text-[10px] text-white/30 font-mono">Press key</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            id={`quick-action-${action.id}`}
            onClick={() => handleAction(action)}
            onMouseEnter={() => setHoveredAction(action.id)}
            onMouseLeave={() => setHoveredAction(null)}
            className={`
              relative p-4 text-left transition-all duration-200
              bg-white/5 border border-white/10
              hover:bg-white/10 hover:border-white/20
              hover:-translate-y-0.5 active:translate-y-0
              group overflow-hidden
            `}
          >
            {/* Hover glow effect */}
            <div
              className={`
                absolute inset-0 opacity-0 group-hover:opacity-100
                transition-opacity duration-200
                bg-gradient-to-br from-${action.color}-500/10 to-transparent
              `}
            />

            {/* Icon with animation */}
            <div className="relative mb-2 text-xl transform transition-transform duration-200 group-hover:scale-110">
              {action.icon}
            </div>

            {/* Label */}
            <div className="relative">
              <div className="text-xs font-medium text-white/80 group-hover:text-white">
                {action.label}
              </div>
            </div>

            {/* Shortcut badge */}
            {action.shortcut && (
              <div
                className={`
                  absolute top-2 right-2
                  w-5 h-5 flex items-center justify-center
                  text-[9px] font-mono text-white/30
                  bg-white/5 border border-white/10 rounded
                  group-hover:border-${action.color}-500/30
                  group-hover:text-${action.color}-400
                  transition-colors
                `}
              >
                {action.shortcut}
              </div>
            )}

            {/* Active indicator */}
            {hoveredAction === action.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
