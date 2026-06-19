"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, LogOut, X } from "lucide-react";
import { getMenuItems, MenuItem } from "@/lib/menuItems";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [userRole, setUserRole] = useState<string>("trader");
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }

        fetch("https://websitepro-d5cu.onrender.com/users")
            .then(res => res.json())
            .then(users => {
                const currentUser = users.find((u: any) => u.email === email);
                if (currentUser) {
                    setUserRole(currentUser.role || "trader");
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [router]);

    const toggleMenu = (menuName: string) => {
        setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        router.push("/login");
    };

    const isActive = (href: string) => pathname === href;

    const menuItems = getMenuItems(userRole);

    const renderMenuItem = (item: MenuItem, depth = 0) => {
        if (item.name === 'separator') {
            return <div key="separator" className="my-2 border-t border-gray-700" />;
        }

        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openMenus[item.name];
        const isItemActive = item.href ? isActive(item.href) : false;

        return (
            <div key={item.name} className="w-full">
                {hasChildren ? (
                    <>
                        <button
                            onClick={() => toggleMenu(item.name)}
                            className={`
                                flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all duration-200
                                text-gray-400 hover:bg-gray-800/50 hover:text-white
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={`h-5 w-5 ${item.color}`} />
                                <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                        {isOpen && (
                            <div className="ml-6 mt-1 space-y-1">
                                {item.children?.map(child => renderMenuItem(child, depth + 1))}
                            </div>
                        )}
                    </>
                ) : (
                    <Link
                        href={item.href || "#"}
                        onClick={onClose}
                        className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                            ${isItemActive
                                ? "bg-purple-500/20 text-white border-r-2 border-purple-500"
                                : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                            }
                        `}
                    >
                        <item.icon className={`h-5 w-5 ${isItemActive ? "text-purple-500" : item.color}`} />
                        <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <aside className="fixed top-0 left-0 z-50 h-full w-56 bg-darknavy/95 backdrop-blur-sm border-r border-gray-800">
                <div className="p-4"><p className="text-gray-400">Loading...</p></div>
            </aside>
        );
    }

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

                <nav className="p-3 space-y-1 overflow-y-auto" style={{ height: "calc(100% - 100px)" }}>
                    {menuItems.map(item => renderMenuItem(item))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-800 bg-darknavy/95">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}