"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeContext";
import { useAnalytics } from "@/components/AnalyticsContext";

interface SettingsSection {
  id: string;
  title: string;
  description: string;
}

const settingsSections: SettingsSection[] = [
  {
    id: "appearance",
    title: "Appearance",
    description: "Customize how CurioKit looks",
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Configure alert and notification preferences",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Manage tracking and data collection",
  },
  {
    id: "shortcuts",
    title: "Keyboard Shortcuts",
    description: "View all available keyboard shortcuts",
  },
];

const shortcuts = [
  { key: "⌘ K", action: "Open command palette" },
  { key: "⌘ /", action: "Show keyboard shortcuts" },
  { key: "G then H", action: "Go to Home" },
  { key: "G then D", action: "Go to Dashboard" },
  { key: "G then S", action: "Go to Squad" },
  { key: "G then P", action: "Go to Pipeline" },
  { key: "⌘ N", action: "Create new squad" },
  { key: "⌘ D", action: "Toggle dark mode" },
  { key: "Esc", action: "Close modal/menu" },
];

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { isTrackingEnabled, toggleTracking } = useAnalytics();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState("appearance");

  useEffect(() => {
    // Load preferences from localStorage
    const savedNotifications = localStorage.getItem("notificationsEnabled");
    const savedSound = localStorage.getItem("soundEnabled");
    
    if (savedNotifications !== null) {
      setNotificationsEnabled(savedNotifications === "true");
    }
    if (savedSound !== null) {
      setSoundEnabled(savedSound === "true");
    }
  }, []);

  const handleNotificationsChange = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    localStorage.setItem("notificationsEnabled", String(enabled));
  };

  const handleSoundChange = (enabled: boolean) => {
    setSoundEnabled(enabled);
    localStorage.setItem("soundEnabled", String(enabled));
  };

  const renderSection = () => {
    switch (activeSection) {
      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Theme</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => theme === "dark" && toggleTheme()}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === "light"
                      ? "border-[var(--accent)] bg-[var(--accent)]/10"
                      : "border-[var(--border)] hover:border-[var(--accent)]/50"
                  }`}
                >
                  <div className="text-2xl mb-2">☀️</div>
                  <div className="text-sm font-medium">Light</div>
                </button>
                <button
                  onClick={() => theme === "light" && toggleTheme()}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === "dark"
                      ? "border-[var(--accent)] bg-[var(--accent)]/10"
                      : "border-[var(--border)] hover:border-[var(--accent)]/50"
                  }`}
                >
                  <div className="text-2xl mb-2">🌙</div>
                  <div className="text-sm font-medium">Dark</div>
                </button>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--card)] border border-[var(--border)]">
              <div>
                <h4 className="font-medium text-[var(--foreground)]">Push Notifications</h4>
                <p className="text-sm text-[var(--muted)]">Receive alerts for important updates</p>
              </div>
              <button
                onClick={() => handleNotificationsChange(!notificationsEnabled)}
                className={`w-12 h-6 rounded-full transition-all ${
                  notificationsEnabled ? "bg-[var(--accent)]" : "bg-[var(--border)]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    notificationsEnabled ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--card)] border border-[var(--border)]">
              <div>
                <h4 className="font-medium text-[var(--foreground)]">Sound Effects</h4>
                <p className="text-sm text-[var(--muted)]">Play sounds for actions and alerts</p>
              </div>
              <button
                onClick={() => handleSoundChange(!soundEnabled)}
                className={`w-12 h-6 rounded-full transition-all ${
                  soundEnabled ? "bg-[var(--accent)]" : "bg-[var(--border)]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    soundEnabled ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--card)] border border-[var(--border)]">
              <div>
                <h4 className="font-medium text-[var(--foreground)]">Analytics Tracking</h4>
                <p className="text-sm text-[var(--muted)]">Help us improve by sharing usage data</p>
              </div>
              <button
                onClick={() => toggleTracking()}
                className={`w-12 h-6 rounded-full transition-all ${
                  isTrackingEnabled ? "bg-[var(--accent)]" : "bg-[var(--border)]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    isTrackingEnabled ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            
            <div className="p-4 rounded-lg bg-[var(--card)] border border-[var(--border)]">
              <h4 className="font-medium text-[var(--foreground)] mb-2">Data Privacy</h4>
              <p className="text-sm text-[var(--muted)]">
                CurioKit respects your privacy. All analytics data is anonymized and stored locally. 
                You can export or delete your data at any time.
              </p>
              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 text-sm rounded-lg bg-[var(--accent)] text-white hover:opacity-90 transition-opacity">
                  Export Data
                </button>
                <button className="px-4 py-2 text-sm rounded-lg border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--hover)] transition-colors">
                  Delete Data
                </button>
              </div>
            </div>
          </div>
        );

      case "shortcuts":
        return (
          <div className="space-y-4">
            <div className="grid gap-3">
              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-[var(--card)] border border-[var(--border)]"
                >
                  <span className="text-[var(--foreground)]">{shortcut.action}</span>
                  <kbd className="px-3 py-1 text-sm rounded bg-[var(--accent)]/10 text-[var(--accent)] font-mono">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Settings</h1>
          <p className="text-[var(--muted)]">Manage your CurioKit preferences</p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                      : "text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <div className="font-medium">{section.title}</div>
                  <div className="text-xs opacity-70">{section.description}</div>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}
