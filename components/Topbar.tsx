"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Disc, Send } from "lucide-react";

export default function Topbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Challenges", href: "/challenges", hasDropdown: true },
        { name: "Instant Funding", href: "/instant-account" },
        { name: "Payouts", href: "/payouts" },
        { name: "FAQ", href: "/faq" },
        { name: "Announcements", href: "/news", isNew: true },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-xl border-b border-gray-800/50" : "bg-transparent"
            }`}>
            <div className="container mx-auto px-4 pt-[38px]">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <span className="text-white font-bold text-sm">NF</span>
                        </div>
                        <div>
                            <span className="font-bold text-xl text-white block leading-tight">NOOR</span>
                            <span className="text-sm text-purple-400 font-medium block leading-tight">FUNDING</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                <Link
                                    href={link.href}
                                    className={`text-sm transition-colors flex items-center gap-1 ${pathname === link.href
                                            ? "text-purple-400 font-medium"
                                            : "text-gray-300 hover:text-white"
                                        }`}
                                >
                                    {link.name}
                                    {link.hasDropdown && <ChevronDown className="h-3.5 w-3.5" />}
                                    {link.isNew && (
                                        <span className="ml-1 text-[10px] font-bold bg-purple-500 text-white px-1.5 py-0.5 rounded-full animate-pulse">
                                            New
                                        </span>
                                    )}
                                </Link>
                            </div>
                        ))}
                    </nav>

                    {/* Right Side: Social, Auth */}
                    <div className="hidden lg:flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                <Disc className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                <Send className="h-5 w-5" />
                            </a>
                        </div>

                        <div className="w-px h-6 bg-gray-700"></div>

                        <div className="flex items-center gap-3">
                            <Link href="/login">
                                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800/50">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button className="bg-purple-500 hover:bg-purple-600 text-white px-6">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden text-white p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800">
                    <div className="container mx-auto px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block text-base transition-colors ${pathname === link.href
                                        ? "text-purple-400 font-medium"
                                        : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                {link.name}
                                {link.isNew && (
                                    <span className="ml-2 text-[10px] font-bold bg-purple-500 text-white px-2 py-0.5 rounded-full">
                                        New
                                    </span>
                                )}
                            </Link>
                        ))}
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                            <a href="#" className="text-gray-400 hover:text-purple-400">
                                <Disc className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400">
                                <Send className="h-5 w-5" />
                            </a>
                        </div>
                        <div className="flex flex-col gap-3 pt-2">
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