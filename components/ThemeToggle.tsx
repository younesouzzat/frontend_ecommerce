"use client";

import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mode, setMode] = useState(resolvedTheme || "system");

  useEffect(() => {
    setMode(resolvedTheme || "system");
  }, [resolvedTheme]);

  const cycleTheme = () => {
    const themes = ["light", "dark", "system"];
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
  };

  const getIcon = () => {
    switch (mode) {
      case "dark":
        return <Sun className="size-4 text-gray-900 dark:text-gray-100" />;
        case "light":
        return <Moon className="size-4 text-gray-900 dark:text-gray-100" />;
      default:
        return <Monitor className="size-4 text-gray-900 dark:text-gray-100" />;
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center space-x-2 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {getIcon()}
    </button>
  );
}