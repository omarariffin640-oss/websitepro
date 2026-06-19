"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotificationBell from "./NotificationBell";
import { Menu, Search, ChevronDown } from "lucide-react";

interface TopbarProps {
    onMenuClick: () => void;
    userEmail: string;
    avatarUrl?: string;
}

export default function Topbar({ onMenuClick, userEmail, avatarUrl }: TopbarProps) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const userName = userEmail?.split('@')[0] || "User";
    const displayName = userName.charAt(0).toUpperCase() + userName.slice(1);

    return (
        <header className="sticky top-0 z-40 bg-darknavy border-b border-gray-800">
            <div className="flex items-center justify-between px-4 h-16 gap-2">
                {/* Kiri */}
                <div className="flex items-center gap-3 shrink-0">
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

                {/* Search */}
                <div className="flex-1 max-w-md mx-2">
                    <div className={`${searchOpen ? 'block' : 'hidden md:block'} relative`}>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                            type="text"
                            placeholder="Search users, trades..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 bg-darkcard border-gray-700 text-white placeholder:text-gray-500"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-gray-400 hover:text-white"
                        onClick={() => setSearchOpen(!searchOpen)}
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>

                {/* Kanan */}
                <div className="flex items-center gap-3 shrink-0">
                    <NotificationBell />
                    <ThemeToggle />
                    {/* Profile - guna img tag (sama macam profile page) */}
                    <div
                        className="flex items-center gap-2 ml-1 cursor-pointer hover:bg-gray-800/50 px-2 py-1 rounded-lg transition-colors"
                        onClick={() => window.location.href = '/profile'}
                    >
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt="Profile"
                                className="h-8 w-8 rounded-full object-cover border-2 border-blue-500"
                            />
                        ) : (
                            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                                {displayName.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="hidden lg:block">
                            <p className="text-sm font-medium text-white leading-tight">{displayName}</p>
                            <p className="text-xs text-gray-400 leading-tight">Trader</p>
                        </div>
                        <ChevronDown className="hidden lg:block h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>
        </header>
    );
}