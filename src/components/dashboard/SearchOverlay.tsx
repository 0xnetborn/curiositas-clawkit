"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { animate } from "animejs";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "page" | "action" | "setting";
  action: () => void;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results: SearchResult[] = [
    {
      id: "home",
      title: "Home",
      description: "Go to landing page",
      icon: "🏠",
      category: "page",
      action: () => router.push("/"),
    },
    {
      id: "dashboard",
      title: "Dashboard",
      description: "Main dashboard view",
      icon: "📊",
      category: "page",
      action: () => router.push("/dashboard"),
    },
    {
      id: "squad",
      title: "Squad",
      description: "Manage your AI agents",
      icon: "👥",
      category: "page",
      action: () => router.push("/dashboard/squad"),
    },
    {
      id: "pipeline",
      title: "Pipeline",
      description: "View deployment pipeline",
      icon: "🚀",
      category: "page",
      action: () => router.push("/dashboard/pipeline"),
    },
    {
      id: "archive",
      title: "Archive",
      description: "Archived projects",
      icon: "📦",
      category: "page",
      action: () => router.push("/dashboard/archive"),
    },
    {
      id: "settings",
      title: "Settings",
      description: "Configure preferences",
      icon: "⚙️",
      category: "page",
      action: () => router.push("/dashboard/settings"),
    },
    {
      id: "new-squad",
      title: "New Squad",
      description: "Create a new AI squad",
      icon: "✨",
      category: "action",
      action: () => router.push("/dashboard/squad?new=true"),
    },
    {
      id: "deploy",
      title: "Deploy",
      description: "Deploy current project",
      icon: "📤",
      category: "action",
      action: () => router.push("/dashboard/pipeline?action=deploy"),
    },
    {
      id: "export",
      title: "Export Data",
      description: "Export analytics data",
      icon: "📥",
      category: "action",
      action: () => router.push("/dashboard/settings?export=true"),
    },
  ];

  const filteredResults = query
    ? results.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase())
      )
    : results.slice(0, 6);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      result.action();
      onClose();
      setQuery("");
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filteredResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [filteredResults, selectedIndex, handleSelect, onClose]
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      const backdrop = document.querySelector(".search-overlay-backdrop");
      const content = document.querySelector(".search-overlay-content");
      if (backdrop) {
        animate(backdrop as Element, {
          opacity: [0, 1],
          duration: 200,
          easing: "easeOutQuad",
        });
      }
      if (content) {
        animate(content as Element, {
          opacity: [0, 1],
          translateY: [-20, 0],
          scale: [0.95, 1],
          duration: 250,
          easing: "easeOutBack",
        });
      }
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    const selectedEl = resultsRef.current?.children[selectedIndex] as HTMLElement;
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "page":
        return "text-teal-400";
      case "action":
        return "text-purple-400";
      case "setting":
        return "text-amber-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div
      className="search-overlay-backdrop fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm pt-[15vh]"
      onClick={onClose}
    >
      <div
        className="search-overlay-content w-full max-w-xl rounded-xl border border-teal-500/30 bg-gray-900/95 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b border-teal-500/20 p-4">
          <span className="text-xl">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, actions, settings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-lg text-white placeholder-gray-500 outline-none"
          />
          <kbd className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-400">ESC</kbd>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="max-h-80 overflow-y-auto p-2">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No results found for &quot;{query}&quot;</p>
            </div>
          ) : (
            filteredResults.map((result, index) => (
              <button
                key={result.id}
                onClick={() => handleSelect(result)}
                className={`search-result w-full flex items-center gap-3 rounded-lg p-3 text-left transition-all duration-150 ${
                  index === selectedIndex
                    ? "bg-teal-500/20 border border-teal-500/40"
                    : "hover:bg-gray-800/50 border border-transparent"
                }`}
              >
                <span className="text-2xl">{result.icon}</span>
                <div className="flex-1">
                  <div className="text-white font-medium">{result.title}</div>
                  <div className="text-sm text-gray-500">{result.description}</div>
                </div>
                <span className={`text-xs uppercase ${getCategoryColor(result.category)}`}>
                  {result.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-teal-500/20 bg-gray-800/30 px-4 py-2 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>
              <kbd className="rounded bg-gray-700 px-1.5 py-0.5">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="rounded bg-gray-700 px-1.5 py-0.5">↵</kbd> Select
            </span>
          </div>
          <span>{filteredResults.length} results</span>
        </div>
      </div>
    </div>
  );
}
