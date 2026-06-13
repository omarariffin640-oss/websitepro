"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotificationBell from "./NotificationBell";
import { Menu } from "lucide-react";

interface TopbarProps {
    onMenuClick: () => void;
    userEmail: string;
    avatarUrl?: string;
}

export default function Topbar({ onMenuClick, userEmail, avatarUrl }: TopbarProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-darknavy border-b border-gray-800">
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

                {/* Kanan - Notif, Dark Mode, Profile */}
                <div className="flex items-center gap-2">
                    <NotificationBell />
                    <ThemeToggle />
                    <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-blue-500">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback className="bg-blue-500 text-white">
                            {userEmail?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}