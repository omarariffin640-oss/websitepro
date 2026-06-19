"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowUpRight } from "lucide-react";

export default function BlogPage() {
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

    const posts = [
        {
            id: 1,
            title: "🎉 New Challenge Available",
            excerpt: "Step 1 & Step 2 challenges are now live. Start your journey to funding today!",
            date: "June 14, 2026",
            author: "Admin",
            category: "Announcement",
            readTime: "3 min read"
        },
        {
            id: 2,
            title: "📈 Trading Tips: Risk Management",
            excerpt: "Learn how to manage risk effectively and protect your capital.",
            date: "June 13, 2026",
            author: "Admin",
            category: "Tips",
            readTime: "5 min read"
        },
        {
            id: 3,
            title: "⚡ Payout Update",
            excerpt: "Payouts are now processed within 24 hours. Request your payout today!",
            date: "June 12, 2026",
            author: "Admin",
            category: "Update",
            readTime: "2 min read"
        },
        {
            id: 4,
            title: "📊 Weekly Market Recap",
            excerpt: "Summary of the week's key market movements and trading opportunities.",
            date: "June 11, 2026",
            author: "Admin",
            category: "Market",
            readTime: "4 min read"
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
        <div className="min-h-screen bg-black">
            <Topbar onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-2">
                <div className="p-4 max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-white">📰 Blog</h1>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Latest Updates</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {posts.map((post) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="bg-[#1A1A1A] border-gray-800 hover:border-purple-500/30 transition-colors cursor-pointer">
                                    <CardHeader>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">{post.category}</Badge>
                                            <span className="text-xs text-gray-500">{post.readTime}</span>
                                        </div>
                                        <CardTitle className="text-white text-xl">{post.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-400 text-sm mb-3">{post.excerpt}</p>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1">
                                                    <User className="h-3 w-3" /> {post.author}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" /> {post.date}
                                                </span>
                                            </div>
                                            <Button variant="ghost" className="text-purple-400 hover:text-purple-300 p-0 h-auto text-sm">
                                                Read More <ArrowUpRight className="h-4 w-4 ml-1" />
                                            </Button>
                                        </div>
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