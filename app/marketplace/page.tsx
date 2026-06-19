"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Tag, ArrowUpRight, Clock } from "lucide-react";

export default function MarketplacePage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        setUserEmail(email);
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
            badgeColor: "bg-yellow-500/20 text-yellow-500"
        },
        {
            id: 2,
            name: "25K Pro Account",
            price: 199,
            originalPrice: 399,
            rating: 4.9,
            reviews: 86,
            badge: "Best Seller",
            badgeColor: "bg-green-500/20 text-green-500"
        },
        {
            id: 3,
            name: "50K Elite Account",
            price: 399,
            originalPrice: 799,
            rating: 4.7,
            reviews: 45,
            badge: "Premium",
            badgeColor: "bg-purple-500/20 text-purple-500"
        },
        {
            id: 4,
            name: "Instant Funding $5K",
            price: 49,
            originalPrice: 99,
            rating: 4.6,
            reviews: 210,
            badge: "Hot Deal",
            badgeColor: "bg-red-500/20 text-red-500"
        }
    ];

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center bg-darknavy"><p className="text-gray-400">Loading...</p></div>;
    }

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-2">
                <div className="p-4 max-w-7xl mx-auto">

                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-white">🛒 Marketplace</h1>
                        <Badge className="bg-emerald-500/20 text-emerald-400">New</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="bg-darkcard border-gray-800 hover:border-blue-500/30 transition-colors">
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
                                        <Button className="w-full bg-blue-500 hover:bg-blue-600">
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