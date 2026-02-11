"use client";

import React, { useEffect, useState } from 'react';
import { animate } from 'animejs';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface ToastContextType {
  toasts: Toast[];
  toast: (t: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (t: Omit<Toast, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setToasts(prev => [...prev, { ...t, id }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

function ToastViewport() {
  const { toasts, removeToast } = React.useContext(ToastContext)!;

  useEffect(() => {
    toasts.forEach(t => {
      const el = document.getElementById(`toast-${t.id}`);
      if (el) {
        animate(el, {
          opacity: [0, 1],
          translateX: ['100%', '0%'],
          duration: 400,
          easing: 'outExpo'
        });
      }
    });
  }, [toasts]);

  const handleDismiss = (id: string) => {
    const el = document.getElementById(`toast-${id}`);
    if (el) {
      animate(el, {
        opacity: 0,
        translateX: '100%',
        duration: 300,
        easing: 'inExpo',
        complete: () => removeToast(id)
      });
    } else {
      removeToast(id);
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          id={`toast-${t.id}`}
          className={`
            pointer-events-auto p-4 rounded-lg border shadow-2xl min-w-[300px] max-w-md
            backdrop-blur-xl bg-black/80
            ${t.type === 'success' ? 'border-teal-500/50 text-teal-400' : ''}
            ${t.type === 'error' ? 'border-red-500/50 text-red-400' : ''}
            ${t.type === 'info' ? 'border-blue-500/50 text-blue-400' : ''}
            ${t.type === 'warning' ? 'border-amber-500/50 text-amber-400' : ''}
          `}
        >
          <div className="flex justify-between items-start gap-4">
            <div>
              <h4 className="font-medium">{t.title}</h4>
              {t.description && <p className="text-sm opacity-80 mt-1">{t.description}</p>}
            </div>
            <button
              onClick={() => handleDismiss(t.id)}
              className="text-white/40 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
