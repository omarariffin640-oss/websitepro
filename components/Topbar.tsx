"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

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

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link href="/login">
                            <Button variant="ghost" className="text-gray-300 hover:text-white">
                                Login
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                                Register
                            </Button>
                        </Link>
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
                        <div className="flex flex-col gap-2 pt-3 border-t border-gray-800">
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