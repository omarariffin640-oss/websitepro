"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotificationBell from "./NotificationBell";
import { Menu, Search, ChevronDown } from "lucide-react";
// @ts-ignore
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://mxaanohwaafzshwksqrt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14YWFub2h3YWFmenNod2tzcXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NjA2NDksImV4cCI6MjA5NjMzNjY0OX0.gdZ1OIjsPXVQfBoT9Nipabzj6CU273ERxefvKSdbteI"
);

interface TopbarProps {
    onMenuClick: () => void;
    userEmail: string;
    avatarUrl?: string;
    onAvatarUpdate?: (url: string) => void;
}

export default function Topbar({ onMenuClick, userEmail, avatarUrl, onAvatarUpdate }: TopbarProps) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const userName = userEmail?.split('@')[0] || "User";
    const displayName = userName.charAt(0).toUpperCase() + userName.slice(1);

    const handleUpload = async (file: File) => {
        setUploading(true);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, file, {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14YWFub2h3YWFmenNod2tzcXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NjA2NDksImV4cCI6MjA5NjMzNjY0OX0.gdZ1OIjsPXVQfBoT9Nipabzj6CU273ERxefvKSdbteI`
                }
            });

        if (uploadError) {
            alert("Upload failed: " + uploadError.message);
            setUploading(false);
            return;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);

        const res = await fetch("https://websitepro-d5cu.onrender.com/profile/update-avatar", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, avatarUrl: publicUrl })
        });
        const data = await res.json();

        if (data.success) {
            if (onAvatarUpdate) onAvatarUpdate(publicUrl);
            alert("Avatar updated successfully!");
            window.location.reload();
        } else {
            alert("Failed to save avatar URL");
        }
        setUploading(false);
    };

    return (
        <header className="sticky top-0 z-40 bg-darknavy border-b border-gray-800">
            <div className="flex items-center justify-between px-4 h-16 gap-2">
                {/* Left - Menu & Logo */}
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

                {/* Center - Search */}
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

                {/* Right - Notif, Dark, Profile Upload */}
                <div className="flex items-center gap-3 shrink-0">
                    <NotificationBell />
                    <ThemeToggle />

                    <div className="relative group">
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files?.[0]) handleUpload(e.target.files[0]);
                            }}
                        />
                        <div
                            className="flex items-center gap-2 ml-1 cursor-pointer hover:bg-gray-800/50 px-2 py-1 rounded-lg transition-colors"
                            onClick={() => fileInputRef.current?.click()}
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
                                <p className="text-xs text-gray-400 leading-tight">Click to change</p>
                            </div>
                            <ChevronDown className="hidden lg:block h-4 w-4 text-gray-400" />
                            {uploading && <span className="text-xs text-gray-400">Uploading...</span>}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}