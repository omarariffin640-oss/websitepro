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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className={`${announcement.bgColor} text-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4 relative`}>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 text-white hover:text-gray-200"
                >
                    <X className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-3">
                    <Megaphone className="h-6 w-6 shrink-0" />
                    <p className="text-base font-medium">{announcement.text}</p>
                </div>
            </div>
        </div>
    );
}