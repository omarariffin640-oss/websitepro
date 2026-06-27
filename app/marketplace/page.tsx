"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Tag, ArrowUpRight, Clock } from "lucide-react";

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

    const products = [
        {
            id: 1,
            name: "10K Challenge Account",
            price: 99,
            originalPrice: 199,
            rating: 4.8,
            reviews: 124,
            badge: "Popular",
            badgeColor: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
        },
        {
            id: 2,
            name: "25K Pro Account",
            price: 199,
            originalPrice: 399,
            rating: 4.9,
            reviews: 86,
            badge: "Best Seller",
            badgeColor: "bg-green-500/20 text-green-500 border-green-500/30"
        },
        {
            id: 3,
            name: "50K Elite Account",
            price: 399,
            originalPrice: 799,
            rating: 4.7,
            reviews: 45,
            badge: "Premium",
            badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30"
        },
        {
            id: 4,
            name: "Instant Funding $5K",
            price: 49,
            originalPrice: 99,
            rating: 4.6,
            reviews: 210,
            badge: "Hot Deal",
            badgeColor: "bg-red-500/20 text-red-500 border-red-500/30"
        }
    ];

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050509] text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />
            <main className="pt-8 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-white">🛒 Marketplace</h1>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">New</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="bg-[#1A1A1A] border-gray-800 hover:border-purple-500/30 transition-colors">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <Badge className={product.badgeColor}>{product.badge}</Badge>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                                <span className="text-white text-sm">{product.rating}</span>
                                                <span className="text-gray-400 text-xs">({product.reviews})</span>
                                            </div>
                                        </div>
                                        <CardTitle className="text-white text-lg">{product.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-3">
                                            <p className="text-2xl font-bold text-white">${product.price}</p>
                                            {product.originalPrice && (
                                                <p className="text-sm text-gray-400 line-through">${product.originalPrice}</p>
                                            )}
                                        </div>
                                        <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            Buy Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}