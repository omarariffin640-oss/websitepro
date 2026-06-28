"use client";

import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";

export default function UserProfileDropdown() {
    const logout = () => {
        localStorage.removeItem("userEmail");
        window.location.href = "/login";
    };

    return (
        <div className="absolute right-0 top-14 z-50 w-56 rounded-2xl border border-white/10 bg-zinc-950 p-3 shadow-2xl shadow-black/40">
            <Link href="/profile" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
                <User className="h-4 w-4 text-violet-400" />
                Profile
            </Link>

            <Link href="/settings" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
                <Settings className="h-4 w-4 text-violet-400" />
                Settings
            </Link>

            <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-red-300 hover:bg-red-500/10"
            >
                <LogOut className="h-4 w-4" />
                Logout
            </button>
        </div>
    );
}