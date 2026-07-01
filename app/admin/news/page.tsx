"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Megaphone, Send, Newspaper, Trash2 } from "lucide-react";
import { API_BASE } from "@/lib/api";

export default function AdminNewsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [newsList, setNewsList] = useState<any[]>([]);

    const fetchNews = async () => {
        try {
            const res = await fetch(`${API_BASE}/admin/news`);
            const data = await res.json();
            setNewsList(Array.isArray(data) ? data : []);
        } catch {
            setNewsList([]);
        }
    };

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetchNews();
        setLoading(false);
    }, [router]);

    const deleteNews = async (id: number) => {
        if (!confirm("Delete this news?")) return;

        const res = await fetch(`${API_BASE}/admin/news/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (!data.success) {
            setMessage(data.message || "Failed to delete news.");
            return;
        }

        setMessage("News deleted successfully.");
        fetchNews();
    };

    const submitNews = async () => {
        if (!title || !content || !category) {
            setMessage("Please fill all fields.");
            return;
        }

        const res = await fetch(`${API_BASE}/admin/news`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content, category }),
        });

        const data = await res.json();

        if (!data.success) {
            setMessage(data.message || "Failed to publish news.");
            return;
        }

        setMessage("News published successfully.");
        setTitle("");
        setContent("");
        setCategory("");
        fetchNews();
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading news management...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpen={() => setSidebarOpen(true)}
            />

            <main className="pt-6 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                    <section className="mb-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                            <Megaphone className="h-4 w-4" />
                            News Management
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">
                            Create News Post
                        </h1>

                        <p className="mt-3 text-gray-400">
                            Publish announcements, platform updates, trading tips and maintenance notices.
                        </p>
                    </section>

                    {message && (
                        <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-400">
                            {message}
                        </div>
                    )}

                    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
                        <Card className="border-white/10 bg-white/5">
                            <CardContent className="space-y-5 p-6">
                                <div className="space-y-2">
                                    <Label className="text-gray-300">Title</Label>
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter news title"
                                        className="border-white/10 bg-black/40 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-300">Category</Label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger className="border-white/10 bg-black/40 text-white">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>

                                        <SelectContent className="border-white/10 bg-[#111] text-white">
                                            <SelectItem value="announcement">Announcement</SelectItem>
                                            <SelectItem value="tips">Trading Tips</SelectItem>
                                            <SelectItem value="update">Platform Update</SelectItem>
                                            <SelectItem value="maintenance">Maintenance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-300">Content</Label>
                                    <Textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Write your news content..."
                                        rows={8}
                                        className="border-white/10 bg-black/40 text-white"
                                    />
                                </div>

                                <Button onClick={submitNews} className="bg-purple-600 hover:bg-purple-700">
                                    <Send className="mr-2 h-4 w-4" />
                                    Publish News
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-white/10 bg-white/5">
                            <CardContent className="p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                                    <Newspaper className="h-6 w-6 text-purple-400" />
                                </div>

                                <h2 className="text-lg font-semibold text-white">News Preview</h2>

                                <p className="mt-3 text-sm text-gray-400">
                                    Published news will appear below and can later be shown to users.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-6 border-white/10 bg-white/5">
                        <CardContent className="p-6">
                            <h2 className="mb-4 text-lg font-semibold text-white">
                                Published News ({newsList.length})
                            </h2>

                            <div className="space-y-3">
                                {newsList.map((news) => (
                                    <div
                                        key={news.id}
                                        className="rounded-xl border border-white/10 bg-black/40 p-4"
                                    >
                                        <p className="text-sm text-purple-300">{news.category}</p>
                                        <h3 className="mt-1 font-bold text-white">
                                            {news.title}
                                        </h3>

                                        <p className="mt-1 text-xs text-gray-500">
                                            News ID: #{news.id}
                                        </p>
                                        <p className="mt-2 text-sm text-gray-400">{news.content}</p>

                                        <Button
                                            onClick={() => deleteNews(news.id)}
                                            variant="ghost"
                                            size="icon"
                                            className="mt-3 h-8 w-8 text-red-400 hover:bg-red-500/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}

                                {newsList.length === 0 && (
                                    <p className="text-gray-400">No news published yet.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}