"use client";

import { useState, useEffect } from "react";
import { X, Globe, Sun, Moon, Circle } from "lucide-react";
import { useTheme } from "next-themes";

export default function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(true);
    const { theme, setTheme } = useTheme();
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 14,
        minutes: 26,
        seconds: 16
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev;
                seconds--;
                if (seconds < 0) { seconds = 59; minutes--; }
                if (minutes < 0) { minutes = 59; hours--; }
                if (hours < 0) { hours = 23; days--; }
                if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0; clearInterval(timer); }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="relative z-50 w-full bg-gradient-to-r from-purple-600/10 via-black to-blue-600/10 border-b border-purple-500/20 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-5 text-xs sm:text-sm">
                    {/* Left: Sale & Timer */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <span className="flex items-center gap-2">
                            <span className="text-orange-400 font-bold text-base">🔥</span>
                            <span className="text-white font-semibold">Weekend Sale</span>
                            <span className="text-purple-400 font-bold">20% Off</span>
                            <span className="hidden sm:inline text-gray-400">|</span>
                            <span className="hidden sm:inline text-gray-300">All Challenges - Limited time only!</span>
                        </span>
                        <div className="flex items-center gap-1.5 font-mono text-white">
                            <span className="bg-purple-500/20 px-2 py-0.5 rounded">{String(timeLeft.days).padStart(2, '0')}d</span>
                            <span className="text-purple-400">:</span>
                            <span className="bg-purple-500/20 px-2 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}h</span>
                            <span className="text-purple-400">:</span>
                            <span className="bg-purple-500/20 px-2 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                            <span className="text-purple-400">:</span>
                            <span className="bg-purple-500/20 px-2 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                        </div>
                    </div>

                    {/* Right: Status, EN, Dark Mode, Close */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="text-gray-300 text-xs font-medium">Live Payouts</span>
                        </div>
                        <div className="h-4 w-px bg-gray-700"></div>
                        <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-xs">
                            <Globe className="h-3.5 w-3.5" />
                            <span>EN</span>
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