"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotificationBell from "./NotificationBell";
import AnnouncementBanner from "./AnnouncementBanner";
import { Menu } from "lucide-react";

interface TopbarProps {
    onMenuClick: () => void;
    userEmail: string;
    avatarUrl?: string;
}

export default function Topbar({ onMenuClick, userEmail, avatarUrl }: TopbarProps) {
    return (
        <>
            <AnnouncementBanner />
            <header className="sticky top-0 z-40 bg-darknavy border-b border-gray-800">
                <div className="flex items-center justify-between px-4 h-16">
                    {/* Kiri - Menu & Logo */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onMenuClick}
                            className="lg:hidden text-white hover:bg-gray-800"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">P</span>
                            </div>
                            <span className="font-bold text-xl text-white hidden sm:inline">PropFirm</span>
                        </div>
                    </div>

                    {/* Kanan - Profile, Notif, Dark Mode */}
                    <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-blue-500">
                            <AvatarImage src={avatarUrl} />
                            <AvatarFallback className="bg-blue-500 text-white text-base">
                                {userEmail?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <NotificationBell />
                        <ThemeToggle />
                    </div>
                </div>
            </header>
        </>
    );
}