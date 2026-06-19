"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotificationBell from "./NotificationBell";
import { Menu, Search, ChevronDown, Camera, Trash2 } from "lucide-react";
// @ts-ignore
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://mxaanohwaafzshwksqrt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14YWFub2h3YWFmenNod2tzcXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NjA2NDksImV4cCI6MjA5NjMzNjY0OX0.gdZ1OIjsPXVQfBoT9Nipabzj6CU273ERxefvKSdbteI"
);

interface TopbarProps {
    onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
    const pathname = usePathname();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [uploading, setUploading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("User");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchUserData = async () => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            console.log("No user email found in localStorage");
            return;
        }

        const userName = email.split('@')[0];
        setDisplayName(userName.charAt(0).toUpperCase() + userName.slice(1));

        try {
            const res = await fetch("https://websitepro-d5cu.onrender.com/users");
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            const user = data.find((u: any) => u.email === email);
            if (user?.avatar_url) {
                setAvatarUrl(user.avatar_url);
            } else {
                setAvatarUrl("");
            }
        } catch (err) {
            console.log("Error fetching avatar:", err);
        }
    };

    // 1. Fetch avatar bila mount & retry
    useEffect(() => {
        fetchUserData();
        const timeout = setTimeout(() => {
            fetchUserData();
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    // 2. Refresh bila page focus
    useEffect(() => {
        const handleFocus = () => {
            fetchUserData();
        };
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    // 3. Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 4. Refresh avatar bila page berubah
    useEffect(() => {
        fetchUserData();
    }, [pathname]);

    const handleUpload = async (file: File) => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            alert("Please login first");
            return;
        }

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
            body: JSON.stringify({ email, avatarUrl: publicUrl })
        });
        const data = await res.json();

        if (data.success) {
            setAvatarUrl(publicUrl);
            setIsOpen(false);
            setTimeout(() => window.location.reload(), 500);
        } else {
            alert("Failed to save avatar URL");
        }
        setUploading(false);
    };

    const handleRemove = async () => {
        const email = localStorage.getItem("userEmail");
        if (!email) return;

        if (!confirm("Remove profile picture?")) return;

        const res = await fetch("https://websitepro-d5cu.onrender.com/profile/update-avatar", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, avatarUrl: null })
        });
        const data = await res.json();

        if (data.success) {
            setAvatarUrl("");
            setIsOpen(false);
            window.location.reload();
        } else {
            alert("Failed to remove avatar");
        }
    };

    return (
        <header className="sticky top-0 z-40 bg-darknavy border-b border-gray-800">
            <div className="flex items-center justify-between px-4 h-16 gap-2">
                {/* Left */}
                <div className="flex items-center gap-3 shrink-0">
                    <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden text-white hover:bg-gray-800">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
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
                    <Button variant="ghost" size="icon" className="md:hidden text-gray-400 hover:text-white" onClick={() => setSearchOpen(!searchOpen)}>
                        <Search className="h-5 w-5" />
                    </Button>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3 shrink-0">
                    <NotificationBell />
                    <ThemeToggle />

                    <div className="relative" ref={dropdownRef}>
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
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl + '?t=' + Date.now()}
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

                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-darkcard border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50">
                                <div className="p-3 border-b border-gray-700">
                                    <p className="text-white text-sm font-medium">{displayName}</p>
                                    <p className="text-xs text-gray-400">{localStorage.getItem("userEmail")}</p>
                                </div>
                                <div className="p-2 space-y-1">
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            fileInputRef.current?.click();
                                        }}
                                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors"
                                        disabled={uploading}
                                    >
                                        <Camera className="h-4 w-4" />
                                        <span className="text-sm">{uploading ? "Uploading..." : "Upload Photo"}</span>
                                    </button>
                                    <button
                                        onClick={handleRemove}
                                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="text-sm">Remove Photo</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}