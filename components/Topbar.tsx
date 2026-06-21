"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, ChevronDown, Search, Disc, Send, Bell } from "lucide-react";
import { useState } from "react";

export default function Topbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Topbar */}
            <div className="fixed top-[48px] left-0 right-0 z-50 bg-black border-b border-gray-800 h-16 flex items-center px-4">
                <div className="container mx-auto flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">NF</span>
                        </div>
                        <span className="font-bold text-white hidden sm:block">NOOR <span className="text-purple-400">FUNDING</span></span>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden lg:flex items-center flex-1 max-w-xs">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 h-9 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="hidden lg:flex items-center gap-5">
                        <Link href="/" className="text-gray-300 hover:text-white text-sm">Home</Link>
                        <Link href="/challenges" className="text-gray-300 hover:text-white text-sm flex items-center gap-1">
                            Challenges <ChevronDown className="h-3 w-3" />
                        </Link>
                        <Link href="/instant-account" className="text-gray-300 hover:text-white text-sm">Instant</Link>
                        <Link href="/payouts" className="text-gray-300 hover:text-white text-sm">Payouts</Link>
                        <Link href="/faq" className="text-gray-300 hover:text-white text-sm">FAQ</Link>
                        <Link href="/news" className="text-gray-300 hover:text-white text-sm flex items-center gap-1">
                            Announcements
                            <span className="text-[10px] font-bold bg-purple-500 text-white px-1.5 py-0.5 rounded-full animate-pulse">New</span>
                        </Link>
                    </div>

                    {/* Right: Social, Notif, Auth */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Notification Bell */}
                        <button className="relative text-gray-400 hover:text-white transition-colors">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">3</span>
                        </button>

                        {/* Social Icons */}
                        <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                            <Disc className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                            <Send className="h-5 w-5" />
                        </a>

                        <div className="w-px h-6 bg-gray-700"></div>

                        {/* Auth */}
                        <Link href="/login">
                            <Button variant="ghost" className="text-gray-300 hover:text-white text-sm">Login</Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-5">Register</Button>
                        </Link>
                    </div>

                    {/* Mobile button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="fixed top-[112px] left-0 right-0 z-50 bg-black border-b border-gray-800 lg:hidden p-4">
                    <div className="flex flex-col gap-3">
                        <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
                        <Link href="/challenges" className="text-gray-300 hover:text-white">Challenges</Link>
                        <Link href="/instant-account" className="text-gray-300 hover:text-white">Instant</Link>
                        <Link href="/payouts" className="text-gray-300 hover:text-white">Payouts</Link>
                        <Link href="/faq" className="text-gray-300 hover:text-white">FAQ</Link>
                        <Link href="/news" className="text-gray-300 hover:text-white flex items-center gap-1">
                            Announcements
                            <span className="text-[10px] font-bold bg-purple-500 text-white px-1.5 py-0.5 rounded-full">New</span>
                        </Link>
                        <div className="flex items-center gap-4 pt-2 border-t border-gray-800">
                            <a href="#" className="text-gray-400 hover:text-purple-400"><Disc className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-purple-400"><Send className="h-5 w-5" /></a>
                            <button className="relative text-gray-400 hover:text-white">
                                <Bell className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">3</span>
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 pt-2">
                            <Link href="/login" className="text-gray-300">Login</Link>
                            <Link href="/register" className="text-purple-400">Register</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}