"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Topbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Topbar - z-index lebih tinggi dan logo sentiasa kelihatan */}
            <div className="fixed top-[48px] left-0 right-0 z-50 bg-black border-b border-gray-800 h-16 flex items-center px-4">
                <div className="container mx-auto flex items-center justify-between">
                    {/* Logo - sentiasa nampak dan tidak akan disembunyikan */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">NF</span>
                        </div>
                        <span className="font-bold text-white">NOOR <span className="text-purple-400">FUNDING</span></span>
                    </Link>

                    {/* ... (menu lain kekal sama) ... */}
                    <div className="hidden lg:flex items-center gap-6">
                        <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
                        <Link href="/challenges" className="text-gray-300 hover:text-white">Challenges</Link>
                        <Link href="/instant-account" className="text-gray-300 hover:text-white">Instant</Link>
                        <Link href="/payouts" className="text-gray-300 hover:text-white">Payouts</Link>
                        <Link href="/faq" className="text-gray-300 hover:text-white">FAQ</Link>
                        <Link href="/news" className="text-gray-300 hover:text-white">News</Link>
                    </div>

                    <div className="hidden lg:flex items-center gap-3">
                        <Link href="/login">
                            <Button variant="ghost" className="text-gray-300">Login</Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-purple-500 hover:bg-purple-600 text-white">Register</Button>
                        </Link>
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile menu (kekal sama) */}
            {isOpen && (
                <div className="fixed top-[112px] left-0 right-0 z-50 bg-black border-b border-gray-800 lg:hidden p-4">
                    {/* ... (kod mobile menu kekal sama) ... */}
                </div>
            )}
        </>
    );
}