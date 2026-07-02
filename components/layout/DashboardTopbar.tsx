"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronRight } from "lucide-react";

import DashboardSearch from "@/components/layout/DashboardSearch";
import NotificationDropdown from "@/components/layout/NotificationDropdown";
import UserProfileDropdown from "@/components/layout/UserProfileDropdown";

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
    const [showProfile, setShowProfile] = useState(false);

    const notificationRef = useRef<HTMLDivElement | null>(null);
    const profileRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;

            if (
                notificationRef.current &&
                !notificationRef.current.contains(target)
            ) {
                setShowNotifications(false);
            }

            if (profileRef.current && !profileRef.current.contains(target)) {
                setShowProfile(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="mb-5">
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-950/70 p-4 backdrop-blur xl:flex-row xl:items-center xl:justify-between">
                <div>
                    <div className="mb-1 flex items-center gap-2 text-xs text-zinc-500">
                        <span>Dashboard</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="text-violet-400">{title}</span>
                    </div>

                    <h1 className="text-2xl font-bold text-white md:text-3xl">
                        {title}
                    </h1>

                    {description && (
                        <p className="mt-1 max-w-2xl text-sm text-zinc-400">
                            {description}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <DashboardSearch placeholder="Search dashboard..." />

                    <div className="flex items-center gap-3">
                        <div ref={notificationRef} className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowNotifications(!showNotifications);
                                    setShowProfile(false);
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-violet-500/40 hover:bg-violet-500/10"
                            >
                                <Bell className="h-4.5 w-4.5 text-zinc-300" />
                            </button>

                            {showNotifications && <NotificationDropdown />}
                        </div>

                        <div ref={profileRef} className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowProfile(!showProfile);
                                    setShowNotifications(false);
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-semibold text-white transition hover:bg-violet-700"
                            >
                                {userName.charAt(0).toUpperCase()}
                            </button>

                            {showProfile && <UserProfileDropdown />}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}