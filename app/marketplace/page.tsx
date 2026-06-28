"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import ProductGrid from "@/components/marketplace/ProductGrid";
import { MarketplaceProduct } from "@/components/marketplace/ProductCard";

export default function MarketplacePage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        setLoading(false);
    }, [router]);

    const products: MarketplaceProduct[] = [
        {
            id: 1,
            name: "10K Challenge Account",
            description: "Start your evaluation with a $10,000 trading challenge account.",
            price: 99,
            category: "Challenge",
        },
        {
            id: 2,
            name: "25K Pro Account",
            description: "Upgrade to a larger funded evaluation account with more room to trade.",
            price: 199,
            category: "Pro",
        },
        {
            id: 3,
            name: "50K Elite Account",
            description: "Premium account size for serious traders who want higher capital.",
            price: 399,
            category: "Elite",
        },
        {
            id: 4,
            name: "Instant Funding $5K",
            description: "Skip evaluation and access instant funded trading faster.",
            price: 49,
            category: "Instant",
        },
    ];

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-zinc-400">Loading marketplace...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050509] text-white">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpen={() => setSidebarOpen(true)}
            />

            <main className="pt-8 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                    <MarketplaceHero />
                    <ProductGrid products={products} />
                </div>
            </main>
        </div>
    );
}