"use client";

import { Globe, Sun, Moon, Eye, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function AnnouncementBar() {
    const { theme, setTheme } = useTheme();
    const [lang, setLang] = useState("EN");
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 14,
        minutes: 36,
        seconds: 16
    });
    const [isRunning, setIsRunning] = useState(true); // ← tukar true/false untuk stop/start

    useEffect(() => {
        if (!isRunning) return;
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
    }, [isRunning]);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-purple-600/10 via-black to-blue-600/10 border-b border-purple-500/20 backdrop-blur-sm py-2.5">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                    {/* Left: Sale & Timer */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-orange-400 font-bold text-base">🔥</span>
                        <span className="text-white font-semibold">WEEKEND SALE</span>
                        <span className="text-purple-400 font-bold">|</span>
                        <span className="text-purple-400 font-bold">20% Off</span>
                        <span className="text-gray-300">All Challenges - Limited time only!</span>
                        <div className="flex items-center gap-1 font-mono text-white">
                            <span className="bg-purple-500/20 px-2 py-0.5 rounded">{String(timeLeft.days).padStart(2, '0')}d</span>
                            <span className="text-purple-400">:</span>
                            <span className="bg-purple-500/20 px-2 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}h</span>
                            <span className="text-purple-400">:</span>
                            <span className="bg-purple-500/20 px-2 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                            <span className="text-purple-400">:</span>
                            <span className="bg-purple-500/20 px-2 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                        </div>
                    </div>

                    {/* Right: Status, Eye, Language, Dark */}
                    <div className="flex items-center gap-3">
                        {/* Live Status */}
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-green-400 text-xs font-medium">Live Payouts</span>
                        </div>

                        <div className="h-4 w-px bg-gray-700"></div>

                        {/* Status Button */}
                        <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                            <Eye className="h-3.5 w-3.5" />
                            <span className="text-xs">Status</span>
                        </button>

                        <div className="h-4 w-px bg-gray-700"></div>

                        {/* Language Selector */}
                        <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                            <Globe className="h-3.5 w-3.5" />
                            <span className="text-xs">{lang}</span>
                            <ChevronDown className="h-3 w-3" />
                        </button>

                        <div className="h-4 w-px bg-gray-700"></div>

                        {/* Dark Mode */}
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}