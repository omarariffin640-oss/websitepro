"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
    Menu,
    X,
    ChevronDown,
    Globe,
    Sun,
    Moon,
    LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationBell from "@/components/NotificationBell";

export default function Topbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState("EN");
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();

    const isAuthPage = ["/login", "/register", "/forgot-password", "/reset-password"].includes(pathname);

    useEffect(() => {
        setUserEmail(localStorage.getItem("userEmail"));
    }, [pathname]);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Challenges", href: "/challenges", hasDropdown: true },
        { label: "Instant", href: "/instant-account" },
        { label: "Payouts", href: "/payouts" },
        { label: "Marketplace", href: "/marketplace" },
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/faq" },
    ];

    return (
        <>
            <header className="fixed left-0 right-0 top-[48px] z-50 border-b border-gray-800/80 bg-black/90 backdrop-blur-xl">
                <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
                    <Link href={userEmail ? "/dashboard" : "/"} className="flex shrink-0 items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg shadow-purple-500/25">
                            <span className="text-sm font-bold text-white">NF</span>
                        </div>
                        <span className="hidden text-sm font-bold tracking-wide text-white sm:block">
                            NOOR <span className="text-purple-400">FUNDING</span>
                        </span>
                    </Link>

                    {!userEmail && (
                        <nav className="hidden items-center gap-6 lg:flex">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`flex items-center gap-1 text-sm font-medium transition hover:text-white ${pathname === link.href ? "text-white" : "text-gray-300"
                                        }`}
                                >
                                    {link.label}
                                    {link.hasDropdown && <ChevronDown className="h-3.5 w-3.5" />}
                                </Link>
                            ))}
                        </nav>
                    )}

                    {userEmail && (
                        <nav className="hidden items-center gap-5 lg:flex">
                            <Link
                                href="/dashboard"
                                className={`flex items-center gap-1.5 text-sm font-medium transition hover:text-white ${pathname === "/dashboard" ? "text-purple-400" : "text-gray-300"
                                    }`}
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="/accounts"
                                className={`text-sm font-medium transition hover:text-white ${pathname.startsWith("/accounts") ? "text-purple-400" : "text-gray-300"
                                    }`}
                            >
                                Accounts
                            </Link>
                            <Link
                                href="/challenges"
                                className={`text-sm font-medium transition hover:text-white ${pathname === "/challenges" ? "text-purple-400" : "text-gray-300"
                                    }`}
                            >
                                Challenges
                            </Link>
                            <Link
                                href="/payouts"
                                className={`text-sm font-medium transition hover:text-white ${pathname.startsWith("/payouts") || pathname.startsWith("/withdrawal") ? "text-purple-400" : "text-gray-300"
                                    }`}
                            >
                                Payouts
                            </Link>
                        </nav>
                    )}

                    <div className="hidden items-center gap-3 lg:flex">
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-1 rounded-lg border border-gray-800 bg-gray-900/70 px-3 py-2 text-xs text-gray-300 transition hover:border-purple-500/40 hover:text-white"
                            >
                                <Globe className="h-3.5 w-3.5" />
                                {lang}
                                <ChevronDown className="h-3 w-3" />
                            </button>

                            {isLangOpen && (
                                <div className="absolute right-0 top-full mt-2 w-28 overflow-hidden rounded-xl border border-gray-800 bg-black shadow-xl">
                                    {["EN", "MS"].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => {
                                                setLang(item);
                                                setIsLangOpen(false);
                                            }}
                                            className="block w-full px-4 py-2 text-left text-xs text-gray-300 transition hover:bg-gray-900 hover:text-white"
                                        >
                                            {item === "EN" ? "English" : "Malay"}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/70 text-gray-300 transition hover:border-purple-500/40 hover:text-white"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <Sun className="h-4 w-4" />
                            ) : (
                                <Moon className="h-4 w-4" />
                            )}
                        </button>

                        {userEmail ? (
                            <>
                                <NotificationBell />
                                <Link href="/profile">
                                    <Button
                                        variant="outline"
                                        className="rounded-xl border-gray-700 text-sm text-gray-200 hover:bg-gray-900"
                                    >
                                        {userEmail.split("@")[0]}
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            !isAuthPage && (
                                <>
                                    <Link href="/login">
                                        <Button
                                            variant="ghost"
                                            className="text-sm text-gray-300 hover:text-white"
                                        >
                                            Login
                                        </Button>
                                    </Link>

                                    <Link href="/register">
                                        <Button className="rounded-xl bg-purple-500 px-5 text-sm text-white hover:bg-purple-600">
                                            Register
                                        </Button>
                                    </Link>
                                </>
                            )
                        )}
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 text-white lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </header>

            {isOpen && (
                <div className="fixed left-0 right-0 top-[112px] z-50 border-b border-gray-800 bg-black/95 p-4 backdrop-blur-xl lg:hidden">
                    <div className="flex flex-col gap-3">
                        {(userEmail
                            ? [
                                { label: "Dashboard", href: "/dashboard" },
                                { label: "Accounts", href: "/accounts" },
                                { label: "Challenges", href: "/challenges" },
                                { label: "Payouts", href: "/payouts" },
                                { label: "Profile", href: "/profile" },
                            ]
                            : navLinks
                        ).map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between rounded-lg px-3 py-2 text-gray-300 transition hover:bg-gray-900 hover:text-white"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="mt-2 flex items-center gap-2 border-t border-gray-800 pt-4">
                            <button
                                onClick={() => setLang(lang === "EN" ? "MS" : "EN")}
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-300"
                            >
                                <Globe className="h-4 w-4" />
                                {lang}
                            </button>

                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-300"
                            >
                                {theme === "dark" ? (
                                    <Sun className="h-4 w-4" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )}
                                Theme
                            </button>
                        </div>

                        {!userEmail && !isAuthPage && (
                            <div className="grid grid-cols-2 gap-2 pt-2">
                                <Link href="/login" onClick={() => setIsOpen(false)}>
                                    <Button
                                        variant="outline"
                                        className="w-full border-gray-700 text-white hover:bg-gray-900"
                                    >
                                        Login
                                    </Button>
                                </Link>

                                <Link href="/register" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full bg-purple-500 text-white hover:bg-purple-600">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
