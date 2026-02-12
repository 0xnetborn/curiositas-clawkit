'use client';

import { useState, useEffect, useCallback } from 'react';
import * as anime from 'animejs';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

let toasts: Toast[] = [];
let listeners: ((t: Toast[]) => void)[] = [];

const notify = (toastsList: Toast[]) => {
  listeners.forEach(listener => listener(toastsList));
};

export function showToast({ type, message, duration = 4000 }: Omit<Toast, 'id'>) {
  const id = Date.now().toString();
  const newToast: Toast = { id, type, message, duration };
  toasts = [...toasts, newToast];
  notify(toasts);

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }
}

export function removeToast(id: string) {
  toasts = toasts.filter(t => t.id !== id);
  notify(toasts);
}

export default function ToastContainer() {
  const [toastsList, setToastsList] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (newToasts: Toast[]) => setToastsList([...newToasts]);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  useEffect(() => {
    if (toastsList.length > 0) {
      anime.animate('.toast-enter', {
        opacity: [0, 1],
        translateX: [50, 0],
        duration: 300,
        easing: 'easeOutQuad',
      });
    }
  }, [toastsList.length]);

  const getToastStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'from-teal-500 to-green-500';
      case 'error':
        return 'from-red-500 to-rose-500';
      case 'warning':
        return 'from-amber-500 to-orange-500';
      case 'info':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '•';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toastsList.map((toast) => (
        <div
          key={toast.id}
          className="toast-enter pointer-events-auto flex items-center gap-3 px-4 py-3 bg-slate-800/95 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-2xl min-w-[300px]"
        >
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getToastStyles(toast.type)} flex items-center justify-center text-white text-sm font-bold`}>
            {getToastIcon(toast.type)}
          </div>
          <p className="flex-1 text-sm text-white">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="w-6 h-6 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

// Make showToast available globally
if (typeof window !== 'undefined') {
  (window as any).showToast = showToast;
}
