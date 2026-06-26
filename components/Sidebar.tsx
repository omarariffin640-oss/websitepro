"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    ChevronDown,
    ChevronRight,
    LogOut,
    Menu,
    X,
    User,
} from "lucide-react";
import { getMenuItems, MenuItem } from "@/lib/menuItems";
import { API_BASE } from "@/lib/api";

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
}

export default function Sidebar({ isOpen = false, onClose, onOpen }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();

    const [userRole, setUserRole] = useState<string>("trader");
    const [userEmail, setUserEmail] = useState<string>("");
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        setUserEmail(email);

        fetch(`${API_BASE}/users`)
            .then((res) => res.json())
            .then((users) => {
                const currentUser = users.find((u: { email: string; role?: string }) => u.email === email);

                if (currentUser) {
                    setUserRole(currentUser.role || "trader");
                }

                setLoading(false);
            })
            .catch(() => {
                setUserRole("trader");
                setLoading(false);
            });
    }, [router]);

    const menuItems = useMemo(() => getMenuItems(userRole), [userRole]);

    const groupedMenus = useMemo(() => {
        const groups: Record<string, MenuItem[]> = {};

        menuItems.forEach((item) => {
            const section = item.section || "Menu";

            if (!groups[section]) {
                groups[section] = [];
            }

            groups[section].push(item);
        });

        return groups;
    }, [menuItems]);

    const toggleMenu = (menuName: string) => {
        setOpenMenus((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        router.push("/login");
    };

    const handleClose = () => {
        onClose?.();
    };

    const handleOpen = () => {
        onOpen?.();
    };

    const isActive = (href?: string) => {
        if (!href) return false;
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const renderMenuItem = (item: MenuItem, depth = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const itemIsOpen = openMenus[item.name];
        const itemIsActive = isActive(item.href);

        if (item.name === "Logout") {
            return null;
        }

        if (hasChildren) {
            return (
                <div key={item.name} className="w-full">
                    <button
                        onClick={() => toggleMenu(item.name)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-gray-400 transition hover:bg-purple-500/10 hover:text-white"
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className={`h-5 w-5 ${item.color}`} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </div>

                        {itemIsOpen ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>

                    {itemIsOpen && (
                        <div className="mt-1 space-y-1 border-l border-gray-800 pl-4">
                            {item.children?.map((child) => renderMenuItem(child, depth + 1))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                key={item.name}
                href={item.href || "#"}
                onClick={handleClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${itemIsActive
                        ? "border border-purple-500/30 bg-purple-500/20 text-white"
                        : "text-gray-400 hover:bg-purple-500/10 hover:text-white"
                    }`}
            >
                <item.icon
                    className={`h-5 w-5 ${itemIsActive ? "text-purple-400" : item.color
                        }`}
                />
                <span className="text-sm font-medium">{item.name}</span>
            </Link>
        );
    };

    if (loading) {
        return (
            <aside className="fixed left-0 top-0 z-40 h-full w-64 border-r border-gray-800 bg-black/95 pt-[112px] backdrop-blur-xl">
                <div className="p-4">
                    <p className="text-sm text-gray-400">Loading...</p>
                </div>
            </aside>
        );
    }

    return (
        <>
            {!isOpen && onOpen && (
                <button
                    onClick={handleOpen}
                    className="fixed bottom-6 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-600 text-white shadow-lg shadow-purple-500/20 transition hover:bg-purple-500 lg:hidden"
                    aria-label="Open navigation menu"
                >
                    <Menu className="h-5 w-5" />
                </button>
            )}

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
                    onClick={handleClose}
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 h-full w-64 border-r border-gray-800 bg-black/95 pt-[112px] backdrop-blur-xl transition-transform duration-300 lg:z-40 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between border-b border-gray-800 px-4 py-4">
                    <Link href="/dashboard" className="flex items-center gap-2" onClick={handleClose}>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500 shadow-lg shadow-purple-500/20">
                            <span className="text-sm font-bold text-white">NF</span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">NOOR FUNDING</p>
                            <p className="text-[11px] text-gray-500">
                                {userRole === "admin" ? "Admin Area" : "Trader Area"}
                            </p>
                        </div>
                    </Link>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClose}
                        className="text-gray-400 hover:text-white lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="h-[calc(100%-190px)] overflow-y-auto px-3 py-4">
                    <div className="space-y-5">
                        {Object.entries(groupedMenus).map(([section, items]) => (
                            <div key={section}>
                                <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-gray-600">
                                    {section}
                                </p>

                                <div className="space-y-1">
                                    {items.map((item) => renderMenuItem(item))}
                                </div>
                            </div>
                        ))}
                    </div>
                </nav>

                <div className="absolute bottom-16 left-0 right-0 border-t border-gray-800 bg-black/95 p-3">
                    <Link
                        href="/profile"
                        onClick={handleClose}
                        className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-purple-500/10"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white">
                            {userEmail?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-white">
                                {userRole === "admin" ? "Admin" : "Trader"}
                            </p>
                            <p className="truncate text-xs text-gray-500">{userEmail}</p>
                        </div>

                        <User className="h-4 w-4 text-gray-500" />
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 bg-black/95 p-3">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
