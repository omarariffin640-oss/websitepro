"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    HelpCircle,
    FileQuestion,
    Megaphone,
    TrendingUp
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
    { name: "Payouts", icon: Wallet, href: "/payouts", color: "text-emerald-500" },
    { name: "Settings", icon: Settings, href: "/settings", color: "text-gray-400" },
    { name: "Instant Account", icon: Wallet, href: "/instant-account", color: "text-purple-500" },
    { name: "Support", icon: HelpCircle, href: "/support", color: "text-blue-400" },
    { name: "FAQ", icon: FileQuestion, href: "/faq", color: "text-cyan-500" },  // ← TUKAR
    { name: "Trade Dashboard", icon: Wallet, href: "/trade-dashboard", color: "text-orange-500" },
    { name: "Live Price", icon: TrendingUp, href: "/live-price", color: "text-blue-500" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        router.push("/login");
    };

    const isActive = (href: string) => pathname === href;

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed top-0 left-0 z-50 h-full w-56 bg-darknavy/95 backdrop-blur-sm border-r border-gray-800
                transform transition-transform duration-300 ease-in-out
                lg:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <span className="font-bold text-lg text-white">PropFirm</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="p-3 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onClose}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                                ${isActive(item.href)
                                    ? "bg-blue-500/20 text-white border-r-2 border-blue-500"
                                    : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                                }
                            `}
                        >
                            <item.icon className={`h-5 w-5 ${isActive(item.href) ? "text-blue-500" : item.color}`} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    ))}

                    <div className="mt-4 pt-4 border-t border-gray-800">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                            <div className="flex items-start gap-2">
                                <Megaphone className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-blue-400 font-semibold">🎉 Special Offer!</p>
                                    <p className="text-xs text-gray-300 mt-1">10K Account <span className="line-through text-gray-500">$99</span> → <span className="text-green-400">$89</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
                        >
                            <LogOut className="h-5 w-5" />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>
        </>
    );
}