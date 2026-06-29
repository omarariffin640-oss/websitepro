"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardShell from "@/components/DashboardShell";
import DashboardTopbar from "@/components/layout/DashboardTopbar";
import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import ProductGrid from "@/components/marketplace/ProductGrid";
import { MarketplaceProduct } from "@/components/marketplace/ProductCard";

export default function MarketplacePage() {
    const router = useRouter();
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
            name: "Noor Scalper Indicator",
            description: "Premium TradingView indicator for entry confirmation and market structure.",
            price: 29,
            category: "Indicator",
        },
        {
            id: 2,
            name: "Smart Money EA Robot",
            description: "Automated MT5 trading robot with built-in risk management.",
            price: 99,
            category: "Robot / EA",
        },
        {
            id: 3,
            name: "Risk Management Calculator",
            description: "Calculate lot size, stop loss and account risk instantly.",
            price: 19,
            category: "Trading Tool",
        },
        {
            id: 4,
            name: "Noor Funding T-Shirt",
            description: "Premium Noor Funding merchandise for traders.",
            price: 25,
            category: "Merch",
        },
        {
            id: 5,
            name: "Trading Journal Template",
            description: "Professional trading journal for performance tracking.",
            price: 15,
            category: "Template",
        },
        {
            id: 6,
            name: "1-to-1 Mentorship Session",
            description: "Private trading mentorship and strategy review session.",
            price: 149,
            category: "Mentorship",
        },
    ];

    if (loading) {
        return (
            <DashboardShell>
                <div className="flex min-h-[300px] items-center justify-center">
                    <p className="text-zinc-400">Loading marketplace...</p>
                </div>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <DashboardTopbar
                title="Marketplace"
                description="Browse indicators, robots, trading tools, merch and premium trader resources."
            />

            <MarketplaceHero />

            <ProductGrid products={products} />
        </DashboardShell>
    );
}