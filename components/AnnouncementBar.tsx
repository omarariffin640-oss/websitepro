"use client";

import { useState } from "react";
import { X, Globe, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(true);
    const { theme, setTheme } = useTheme();

    if (!isVisible) return null;

    return (
        <div className="relative z-50 w-full bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 border-b border-purple-500/20">
            <div className="container mx-auto px-4 py-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-white font-medium">Live Payouts</span>
                        </span>
                        <span className="text-purple-400 font-bold">🔥 Weekend Sale 20% Off</span>
                        <span className="hidden sm:inline text-gray-400">|</span>
                        <span className="hidden sm:inline text-gray-300">Use code: <span className="text-purple-400 font-mono">WEEKEND20</span></span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                            <Globe className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">EN</span>
                        </button>
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-gray-500 hover:text-white transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}