"use client";

import { Clock, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function AnnouncementBar() {
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 14,
        minutes: 36,
        seconds: 16,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;

                seconds--;

                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }

                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                }

                if (hours < 0) {
                    hours = 23;
                    days--;
                }

                if (days < 0) {
                    clearInterval(timer);
                    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed left-0 right-0 top-0 z-50 border-b border-purple-500/20 bg-black/95 backdrop-blur-xl">
            <div className="container mx-auto px-4">
                <div className="flex min-h-[48px] flex-wrap items-center justify-center gap-3 text-center text-xs sm:justify-between sm:text-sm">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <span className="rounded-full bg-purple-500/20 px-2 py-1 text-purple-300">
                            <Zap className="inline h-3.5 w-3.5" /> WEEKEND SALE
                        </span>

                        <span className="font-semibold text-white">
                            20% OFF All Challenges
                        </span>

                        <span className="hidden text-gray-400 sm:inline">
                            Use code
                        </span>

                        <span className="rounded-md border border-purple-500/30 bg-purple-500/10 px-2 py-1 font-mono font-bold text-purple-300">
                            NOOR20
                        </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 font-mono text-xs text-white">
                        <Clock className="h-3.5 w-3.5 text-purple-400" />

                        <span className="rounded bg-purple-500/20 px-2 py-1">
                            {String(timeLeft.days).padStart(2, "0")}d
                        </span>
                        <span className="text-purple-400">:</span>
                        <span className="rounded bg-purple-500/20 px-2 py-1">
                            {String(timeLeft.hours).padStart(2, "0")}h
                        </span>
                        <span className="text-purple-400">:</span>
                        <span className="rounded bg-purple-500/20 px-2 py-1">
                            {String(timeLeft.minutes).padStart(2, "0")}m
                        </span>
                        <span className="hidden text-purple-400 sm:inline">:</span>
                        <span className="hidden rounded bg-purple-500/20 px-2 py-1 sm:inline">
                            {String(timeLeft.seconds).padStart(2, "0")}s
                        </span>
                    </div>

                    <div className="hidden items-center gap-2 text-green-400 lg:flex">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                        </span>
                        <span className="text-xs font-medium">Live Payouts</span>
                    </div>
                </div>
            </div>
        </div>
    );
}