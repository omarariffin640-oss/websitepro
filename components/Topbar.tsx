"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationBell from "@/components/NotificationBell";

export default function Topbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState("EN");
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();

    const isAuthPage = ["/login", "/register", "/forgot-password", "/reset-password"].includes(pathname);

    useEffect(() => {
        setUserEmail(localStorage.getItem("userEmail"));
        setIsOpen(false);
    }, [pathname]);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Challenges", href: "/challenges" },
        { label: "Instant", href: "/instant-account" },
        { label: "Payouts", href: "/payouts" },
        { label: "Marketplace", href: "/marketplace" },
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/faq" },
    ];

    const accountLinks = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Accounts", href: "/accounts" },
        { label: "Orders", href: "/orders" },
        { label: "Payouts", href: "/payouts" },
        { label: "Profile", href: "/profile" },
    ];

    const links = userEmail ? accountLinks : navLinks;

    return (
        <>
            <header className="fixed left-0 right-0 top-[48px] z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                    <Link href={userEmail ? "/dashboard" : "/"} className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/25">
                            <span className="text-sm font-bold text-white">NF</span>
                        </div>
                        <span className="text-sm font-bold tracking-wide text-white">
                            NOOR <span className="text-violet-400">FUNDING</span>
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-1 lg:flex">
                        {links.map((link) => {
                            const active = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`rounded-xl px-3 py-2 text-sm font-medium transition ${active
                                            ? "bg-violet-500/15 text-white"
                                            : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden items-center gap-2 lg:flex">
                        <button
                            onClick={() => setLang(lang === "EN" ? "MS" : "EN")}
                            className="flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs text-zinc-300 hover:border-violet-500/40 hover:text-white"
                        >
                            <Globe className="h-4 w-4" />
                            {lang}
                        </button>

                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 hover:border-violet-500/40 hover:text-white"
                        >
                            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>

                        {userEmail ? (
                            <>
                                <NotificationBell />
                                <Link href="/profile">
                                    <Button variant="outline" className="rounded-xl border-white/10 text-sm text-white hover:bg-white/5">
                                        {userEmail.split("@")[0]}
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            !isAuthPage && (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost" className="text-sm text-zinc-300 hover:text-white">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button className="rounded-xl bg-violet-600 px-5 text-sm text-white hover:bg-violet-700">
                                            Register
                                        </Button>
                                    </Link>
                                </>
                            )
                        )}
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </header>

            {isOpen && (
                <div className="fixed left-0 right-0 top-[112px] z-50 border-b border-white/10 bg-black/95 p-4 backdrop-blur-xl lg:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-2">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="rounded-xl px-4 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                            <button
                                onClick={() => setLang(lang === "EN" ? "MS" : "EN")}
                                className="rounded-xl border border-white/10 bg-white/[0.03] py-3 text-sm text-zinc-300"
                            >
                                {lang}
                            </button>

                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="rounded-xl border border-white/10 bg-white/[0.03] py-3 text-sm text-zinc-300"
                            >
                                Theme
                            </button>
                        </div>

                        {!userEmail && !isAuthPage && (
                            <div className="grid grid-cols-2 gap-2 pt-2">
                                <Link href="/login">
                                    <Button variant="outline" className="w-full border-white/10 text-white">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="w-full bg-violet-600 text-white hover:bg-violet-700">
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