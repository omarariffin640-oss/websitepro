"use client";

import { Bell, CheckCircle, Trophy, Wallet } from "lucide-react";

export default function NotificationDropdown() {
    const notifications = [
        {
            icon: Trophy,
            title: "Challenge Update",
            text: "Your challenge progress has been updated.",
            time: "2m ago",
        },
        {
            icon: Wallet,
            title: "Payout Review",
            text: "Your payout request is under review.",
            time: "1h ago",
        },
        {
            icon: CheckCircle,
            title: "Account Verified",
            text: "Your account security status is active.",
            time: "Today",
        },
    ];

    return (
        <div className="absolute right-0 top-14 z-50 w-80 rounded-2xl border border-white/10 bg-zinc-950 p-4 shadow-2xl shadow-black/40">
            <div className="mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-violet-400" />
                <h3 className="font-semibold text-white">Notifications</h3>
            </div>

            <div className="space-y-3">
                {notifications.map((item) => (
                    <div
                        key={item.title}
                        className="rounded-xl border border-white/10 bg-black/40 p-3"
                    >
                        <div className="flex gap-3">
                            <item.icon className="mt-1 h-4 w-4 text-violet-400" />

                            <div>
                                <p className="text-sm font-medium text-white">
                                    {item.title}
                                </p>
                                <p className="mt-1 text-xs text-zinc-400">
                                    {item.text}
                                </p>
                                <p className="mt-2 text-xs text-zinc-600">
                                    {item.time}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}