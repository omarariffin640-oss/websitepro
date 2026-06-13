"use client";

import { useState, useEffect } from "react";
import { X, Megaphone } from "lucide-react";

type Announcement = {
    id: number;
    text: string;
    bgColor: string;
};

const announcements: Announcement[] = [
    { id: 1, text: "🎉 New Challenge Available: Step 1 & Step 2 are now live!", bgColor: "bg-orange-500" },
    { id: 2, text: "💰 Price Update: 10K Account $99 → $89", bgColor: "bg-green-500" },
    { id: 3, text: "⚡ Instant Account Added - Get funded instantly!", bgColor: "bg-blue-500" },
    { id: 4, text: "🚀 Payout Update: Now processed within 24 hours", bgColor: "bg-purple-500" },
];

export default function AnnouncementBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % announcements.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!isVisible) return null;

    const announcement = announcements[currentIndex];

    return (
        <div className={`${announcement.bgColor} text-white py-2 px-4 relative z-10`}>
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Megaphone className="h-4 w-4 shrink-0" />
                    <p className="text-sm font-medium truncate">{announcement.text}</p>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="shrink-0 hover:text-gray-200 transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}