"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    Trophy,
    Wallet,
    Settings,
    LogOut,
    X,
    HelpCircle
} from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-blue-500" },
    { name: "Accounts", icon: FolderKanban, href: "/accounts", color: "text-orange-500" },
    { name: "Users", icon: Users, href: "/users", color: "text-green-500" },
    { name: "Challenges", icon: Trophy, href: "/challenges", color: "text-yellow-500" },
    { name: "Payouts", icon: Wallet, href: "/payouts", color: "text-green-500" },
    { name: "Settings", icon: Settings, href: "/settings", color: "text-gray-400" },
    { name: "Instant Account", icon: Wallet, href: "/instant-account", color: "text-purple-500" },
    { name: "Support", icon: HelpCircle, href: "/support", color: "text-purple-500" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        router.push("/login");
    };

    return (
        <>
            {/* Overlay untuk phone */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full w-64 bg-darknavy border-r border-gray-800
                transform transition-transform duration-300 ease-in-out
                lg:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">P</span>
                        </div>
                        <span className="font-bold text-white">PropFirm</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden text-gray-400">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <item.icon className={`h-5 w-5 ${item.color}`} />
                            <span>{item.name}</span>
                        </Link>
                    ))}

                    <div className="pt-4 mt-4 border-t border-gray-800">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>
        </>
    );
}