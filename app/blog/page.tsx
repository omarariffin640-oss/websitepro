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
            title: "New Challenge Available",
            excerpt: "Step 1 and Step 2 challenges are now live. Start your journey to funding today.",
            date: "June 14, 2026",
            author: "Admin",
            category: "Announcement",
            readTime: "3 min read",
        },
        {
            id: 2,
            title: "Trading Tips: Risk Management",
            excerpt: "Learn how to manage risk effectively and protect your trading capital.",
            date: "June 13, 2026",
            author: "Admin",
            category: "Education",
            readTime: "5 min read",
        },
        {
            id: 3,
            title: "Payout Update",
            excerpt: "Payouts are now processed within 24 hours after approval.",
            date: "June 12, 2026",
            author: "Admin",
            category: "Update",
            readTime: "2 min read",
        },
        {
            id: 4,
            title: "Weekly Market Recap",
            excerpt: "A quick summary of key market movements and trading opportunities.",
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
                        description="Read the latest platform updates, trading education and market insights."
                    />

                    <div className="mb-6">
                        <Badge className="border-violet-500/30 bg-violet-500/20 text-violet-300">
                            Latest Updates
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                            >
                                <Card className="h-full border-white/10 bg-white/5 transition hover:border-violet-500/40 hover:bg-violet-500/10">
                                    <CardHeader>
                                        <div className="mb-3 flex items-center gap-2">
                                            <Badge className="border-violet-500/30 bg-violet-500/20 text-violet-300">
                                                {post.category}
                                            </Badge>
                                            <span className="text-xs text-zinc-500">
                                                {post.readTime}
                                            </span>
                                        </div>

                                        <CardTitle className="text-xl text-white">
                                            {post.title}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="mb-5 text-sm leading-relaxed text-zinc-400">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between gap-4 text-xs text-zinc-500">
                                            <div className="flex flex-wrap items-center gap-4">
                                                <span className="flex items-center gap-1">
                                                    <User className="h-3.5 w-3.5" />
                                                    {post.author}
                                                </span>

                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {post.date}
                                                </span>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                className="h-auto p-0 text-sm text-violet-400 hover:text-violet-300"
                                            >
                                                Read More
                                                <ArrowUpRight className="ml-1 h-4 w-4" />
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