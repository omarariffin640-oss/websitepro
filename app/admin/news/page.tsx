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
import { Megaphone, Send, Newspaper } from "lucide-react";

export default function AdminNewsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        setLoading(false);
    }, [router]);

    const submitNews = () => {
        if (!title || !content || !category) {
            setMessage("Please fill all fields.");
            return;
        }

        setMessage("News post created successfully.");
        setTitle("");
        setContent("");
        setCategory("");

        setTimeout(() => setMessage(""), 3000);
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

                        <h1 className="text-3xl font-bold md:text-4xl">Create News Post</h1>

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
                                    Your published news will appear in the user dashboard, blog/news area or announcement section once connected to backend.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}