"use client";

import { useState } from "react";
import { Bell, ChevronRight } from "lucide-react";

import PromotionBanner from "@/components/layout/PromotionBanner";
import NotificationDropdown from "@/components/layout/NotificationDropdown";

type Props = {
    title: string;
    description?: string;
    userName?: string;
};

export default function DashboardTopbar({
    title,
    description,
    userName = "Trader",
}: Props) {
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <>
            <header className="mb-6">
                <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-zinc-950/70 p-6 backdrop-blur md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
                            <span>Dashboard</span>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-violet-400">{title}</span>
                        </div>

                        <h1 className="text-3xl font-bold text-white md:text-4xl">
                            {title}
                        </h1>

                        {description && (
                            <p className="mt-2 max-w-2xl text-zinc-400">{description}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:border-violet-500/40 hover:bg-violet-500/10"
                            >
                                <Bell className="h-5 w-5 text-zinc-300" />
                            </button>

                            {showNotifications && <NotificationDropdown />}
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-semibold text-white">
                                {userName.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <p className="text-xs text-zinc-500">Welcome Back</p>
                                <p className="font-medium text-white">{userName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <PromotionBanner />
        </>
    );
}