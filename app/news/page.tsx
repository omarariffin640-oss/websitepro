"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { Calendar, User, Tag } from "lucide-react";

type NewsItem = {
    id: number;
    title: string;
    content: string;
    category: string;
    author: string;
    created_at: string;
};

export default function NewsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        setUserEmail(email);
        fetchNews();
    }, [router]);

    const fetchNews = async () => {
        try {
            // For now, use mock data until backend endpoint is ready
            const mockNews: NewsItem[] = [
                {
                    id: 1,
                    title: "🎉 New Challenge Available!",
                    content: "Step 1 & Step 2 challenges are now live. Start your journey to funding today!",
                    category: "announcement",
                    author: "Admin",
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    title: "📈 Trading Tips: Risk Management",
                    content: "Always use stop-loss and never risk more than 2% per trade. Consistency is key to success.",
                    category: "tips",
                    author: "Admin",
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    title: "⚡ Payout Update",
                    content: "Payouts are now processed within 24 hours. Request your payout today!",
                    category: "update",
                    author: "Admin",
                    created_at: new Date().toISOString()
                },
                {
                    id: 4,
                    title: "🔧 Maintenance Notice",
                    content: "Scheduled maintenance on Sunday 2AM - 4AM. The platform may be temporarily unavailable.",
                    category: "maintenance",
                    author: "Admin",
                    created_at: new Date().toISOString()
                }
            ];
            setNews(mockNews);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const getCategoryBadge = (category: string) => {
        switch (category) {
            case "announcement": return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Announcement</Badge>;
            case "tips": return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Tips</Badge>;
            case "update": return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Update</Badge>;
            case "maintenance": return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Maintenance</Badge>;
            default: return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">General</Badge>;
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-darknavy">
                <p className="text-gray-400">Loading news...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="lg:ml-64 pt-2">
                <div className="p-6 max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <h1 className="text-2xl font-bold text-white">📢 News & Announcements</h1>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Latest Updates</Badge>
                    </div>

                    {news.length === 0 ? (
                        <Card className="bg-darkcard">
                            <CardContent className="pt-6">
                                <p className="text-gray-400 text-center">No news yet. Stay tuned!</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {news.map((item) => (
                                <Card key={item.id} className="bg-darkcard border-gray-800 hover:border-gray-700 transition-colors">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="text-white text-xl">{item.title}</CardTitle>
                                                <div className="flex items-center gap-3 mt-2">
                                                    {getCategoryBadge(item.category)}
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <User className="h-3 w-3" /> {item.author}
                                                    </span>
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" /> {new Date(item.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <Tag className="h-4 w-4 text-gray-500 shrink-0" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-300">{item.content}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}