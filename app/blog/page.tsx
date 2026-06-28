"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardTopbar from "@/components/layout/DashboardTopbar";
import PageSkeleton from "@/components/layout/PageSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, User, ArrowUpRight } from "lucide-react";

export default function BlogPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const posts = [
        {
            id: 1,
            title: "🎉 New Challenge Available",
            excerpt: "Step 1 & Step 2 challenges are now live. Start your journey to funding today!",
            date: "June 14, 2026",
            author: "Admin",
            category: "Announcement",
            readTime: "3 min read",
        },
        {
            id: 2,
            title: "📈 Trading Tips: Risk Management",
            excerpt: "Learn how to manage risk effectively and protect your capital.",
            date: "June 13, 2026",
            author: "Admin",
            category: "Tips",
            readTime: "5 min read",
        },
        {
            id: 3,
            title: "⚡ Payout Update",
            excerpt: "Payouts are now processed within 24 hours. Request your payout today!",
            date: "June 12, 2026",
            author: "Admin",
            category: "Update",
            readTime: "2 min read",
        },
        {
            id: 4,
            title: "📊 Weekly Market Recap",
            excerpt: "Summary of the week's key market movements and trading opportunities.",
            date: "June 11, 2026",
            author: "Admin",
            category: "Market",
            readTime: "4 min read",
        },
    ];

    if (loading) {
        return <PageSkeleton />;
    }

    return (
        <div className="min-h-screen bg-[#050509] text-white">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpen={() => setSidebarOpen(true)}
            />

            <main className="pt-[150px] lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                    <DashboardTopbar
                        title="Blog"
                        description="Latest trading updates, platform news and market education."
                    />

                    <div className="mb-6">
                        <Badge className="border-purple-500/30 bg-purple-500/20 text-purple-400">
                            Latest Updates
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {posts.map((post) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="cursor-pointer border-gray-800 bg-[#1A1A1A] transition-colors hover:border-purple-500/30">
                                    <CardHeader>
                                        <div className="mb-1 flex items-center gap-2">
                                            <Badge className="border-purple-500/30 bg-purple-500/20 text-purple-400">
                                                {post.category}
                                            </Badge>
                                            <span className="text-xs text-gray-500">{post.readTime}</span>
                                        </div>

                                        <CardTitle className="text-xl text-white">
                                            {post.title}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="mb-3 text-sm text-gray-400">{post.excerpt}</p>

                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1">
                                                    <User className="h-3 w-3" /> {post.author}
                                                </span>

                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" /> {post.date}
                                                </span>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                className="h-auto p-0 text-sm text-purple-400 hover:text-purple-300"
                                            >
                                                Read More <ArrowUpRight className="ml-1 h-4 w-4" />
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