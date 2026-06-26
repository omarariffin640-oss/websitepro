"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, LogOut, Menu, X, User } from "lucide-react";
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

    const [userRole, setUserRole] = useState("trader");
    const [userEmail, setUserEmail] = useState("");
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
                setUserRole(currentUser?.role || "trader");
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
            if (!groups[section]) groups[section] = [];
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

    const isActive = (href?: string) => {
        if (!href) return false;
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const renderMenuItem = (item: MenuItem) => {
        if (item.name === "Logout") return null;

        const hasChildren = item.children && item.children.length > 0;
        const itemIsOpen = openMenus[item.name];
        const itemIsActive = isActive(item.href);

        if (hasChildren) {
            return (
                <div key={item.name}>
                    <button
                        onClick={() => toggleMenu(item.name)}
                        className="flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className={`h-5 w-5 ${item.color}`} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </div>

                        {itemIsOpen ? (
                            <ChevronDown className="h-4 w-4 text-zinc-500" />
                        ) : (
                            <ChevronRight className="h-4 w-4 text-zinc-500" />
                        )}
                    </button>

                    {itemIsOpen && (
                        <div className="ml-5 mt-1 space-y-1 border-l border-white/10 pl-3">
                            {item.children?.map((child) => renderMenuItem(child))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                key={item.name}
                href={item.href || "#"}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition ${itemIsActive
                        ? "border border-violet-500/30 bg-violet-500/15 text-white shadow-sm shadow-violet-950/30"
                        : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                    }`}
            >
                <item.icon
                    className={`h-5 w-5 ${itemIsActive ? "text-violet-400" : item.color || "text-zinc-500"
                        }`}
                />
                <span className="text-sm font-medium">{item.name}</span>
            </Link>
        );
    };

    if (loading) {
        return (
            <aside className="fixed left-0 top-0 z-40 h-full w-72 border-r border-white/10 bg-[#050509]/95 pt-[112px] backdrop-blur-xl">
                <div className="p-5 text-sm text-zinc-500">Loading...</div>
            </aside>
        );
    }

    return (
        <>
            {!isOpen && onOpen && (
                <button
                    onClick={onOpen}
                    className="fixed bottom-6 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-600 text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-500 lg:hidden"
                    aria-label="Open navigation menu"
                >
                    <Menu className="h-5 w-5" />
                </button>
            )}

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 h-full w-72 border-r border-white/10 bg-[#050509]/95 pt-[112px] backdrop-blur-xl transition-transform duration-300 lg:z-40 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                    <Link href="/dashboard" onClick={onClose} className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 shadow-lg shadow-violet-600/20">
                            <span className="text-sm font-bold text-white">NF</span>
                        </div>

                        <div>
                            <p className="text-sm font-bold text-white">NOOR FUNDING</p>
                            <p className="text-[11px] text-zinc-500">
                                {userRole === "admin" ? "Admin Area" : "Trader Area"}
                            </p>
                        </div>
                    </Link>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-zinc-400 hover:text-white lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="h-[calc(100%-205px)] overflow-y-auto px-3 py-4">
                    <div className="space-y-6">
                        {Object.entries(groupedMenus).map(([section, items]) => (
                            <div key={section}>
                                <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-600">
                                    {section}
                                </p>

                                <div className="space-y-1">
                                    {items.map((item) => renderMenuItem(item))}
                                </div>
                            </div>
                        ))}
                    </div>
                </nav>

                <div className="absolute bottom-16 left-0 right-0 border-t border-white/10 bg-[#050509]/95 p-3">
                    <Link
                        href="/profile"
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-violet-500/30 hover:bg-violet-500/10"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                            {userEmail?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-white">
                                {userRole === "admin" ? "Admin" : "Trader"}
                            </p>
                            <p className="truncate text-xs text-zinc-500">{userEmail}</p>
                        </div>

                        <User className="h-4 w-4 text-zinc-500" />
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#050509]/95 p-3">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}