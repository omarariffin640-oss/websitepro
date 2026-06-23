"use client";

import { Clock, Eye, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function AnnouncementBar() {
    const [status, setStatus] = useState("All Systems Operational");
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 14,
        minutes: 36,
        seconds: 16,
    });

    const [isRunning, setIsRunning] = useState(false); // true = timer jalan, false = stop

    useEffect(() => {
        if (!isRunning) return;

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
    }, [isRunning]);

    return (
        <div className="fixed left-0 right-0 top-0 z-50 border-b border-purple-500/20 bg-black/95 backdrop-blur-xl">
            <div className="container mx-auto px-4">
                <div className="flex min-h-[48px] flex-wrap items-center justify-center gap-3 text-sm sm:justify-between sm:text-base">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <span className="flex items-center gap-1 rounded-full bg-purple-500/20 px-3 py-1 text-sm font-bold text-purple-300 md:text-base">
                            <Zap className="h-4 w-4" />
                            WEEKEND SALE
                        </span>

                        <span className="font-extrabold text-white md:text-lg">
                            20% OFF ALL CHALLENGES
                        </span>

                        <span className="hidden text-gray-400 sm:inline">Code</span>

                        <span className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1 font-mono text-sm font-bold text-purple-300 md:text-base">
                            NOOR20
                        </span>
                    </div>

                    <div className="flex items-center justify-center gap-1 font-mono text-xs text-white sm:text-sm">
                        <Clock className="mr-1 h-4 w-4 text-purple-400" />

                        <span className="rounded-md bg-purple-500/20 px-2 py-1">
                            {String(timeLeft.days).padStart(2, "0")}d
                        </span>
                        <span className="text-purple-400">:</span>
                        <span className="rounded-md bg-purple-500/20 px-2 py-1">
                            {String(timeLeft.hours).padStart(2, "0")}h
                        </span>
                        <span className="text-purple-400">:</span>
                        <span className="rounded-md bg-purple-500/20 px-2 py-1">
                            {String(timeLeft.minutes).padStart(2, "0")}m
                        </span>
                        <span className="hidden text-purple-400 sm:inline">:</span>
                        <span className="hidden rounded-md bg-purple-500/20 px-2 py-1 sm:inline">
                            {String(timeLeft.seconds).padStart(2, "0")}s
                        </span>
                    </div>

                    <div className="hidden items-center gap-3 lg:flex">
                        <div className="flex items-center gap-2 text-green-400">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                            </span>
                            <span className="text-sm font-semibold">Live Payouts</span>
                        </div>

                        <div className="h-4 w-px bg-gray-700" />

                        <button
                            onClick={() =>
                                setStatus(
                                    status === "All Systems Operational"
                                        ? "Maintenance Mode"
                                        : "All Systems Operational"
                                )
                            }
                            className="flex items-center gap-1 text-sm text-gray-400 transition hover:text-white"
                        >
                            <Eye className="h-4 w-4" />
                            {status}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}