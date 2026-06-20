"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Globe, Sun, Moon, Circle, Disc, Send } from "lucide-react";
import { useTheme } from "next-themes";

export default function Topbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Challenges", href: "/challenges" },
        { name: "Instant Funding", href: "/instant-account" },
        { name: "Payouts", href: "/payouts" },
        { name: "FAQ", href: "/faq" },
        { name: "Announcements", href: "/news" },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/50" : "bg-transparent"
            }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">NF</span>
                        </div>
                        <span className="font-bold text-lg text-white hidden sm:block">
                            NOOR <span className="text-purple-400">FUNDING</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm transition-colors ${pathname === link.href
                                        ? "text-purple-400 font-medium"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side: Status, Social, Dark, Auth */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Live Status */}
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="text-xs text-gray-400 font-medium">Live</span>
                        </div>

                        {/* Language */}
                        <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm">
                            <Globe className="h-4 w-4" />
                            <span>EN</span>
                            <ChevronDown className="h-3 w-3" />
                        </button>

                        {/* Dark Mode */}
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Disc className="h-4 w-4" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Send className="h-4 w-4" />
                            </a>
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-2 ml-2 border-l border-gray-800 pl-4">
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden text-white p-2"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-gray-800">
                    <div className="container mx-auto px-4 py-4 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block text-sm transition-colors ${pathname === link.href
                                        ? "text-purple-400 font-medium"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Mobile: Status, Dark, Social */}
                        <div className="flex items-center gap-4 pt-3 border-t border-gray-800">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-xs text-gray-400">Live</span>
                            </div>
                            <button className="text-gray-400 hover:text-white transition-colors">
                                <Globe className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </button>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Disc className="h-4 w-4" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Send className="h-4 w-4" />
                            </a>
                        </div>

                        <div className="flex flex-col gap-2 pt-2">
                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" className="w-full text-gray-300">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register" onClick={() => setIsOpen(false)}>
                                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}