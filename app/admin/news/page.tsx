"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function AdminNewsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) { router.push("/login"); return; }
        setUserEmail(email);
        setLoading(false);
    }, [router]);

    const submitNews = async () => {
        if (!title || !content || !category) {
            setMessage("Please fill all fields");
            return;
        }

        // Mock submit - nanti connect ke backend
        setMessage("News posted successfully!");
        setTitle("");
        setContent("");
        setCategory("");
        setTimeout(() => setMessage(""), 3000);
    };

    if (loading) return <div className="flex min-h-screen items-center justify-center bg-darknavy"><p className="text-gray-400">Loading...</p></div>;

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="lg:ml-64 pt-2">
                <div className="p-6 max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold text-white mb-6">📝 Post News</h1>

                    {message && (
                        <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
                            <p className="text-green-500">{message}</p>
                        </div>
                    )}

                    <Card className="bg-darkcard">
                        <CardHeader>
                            <CardTitle className="text-white">Create News Post</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-gray-300">Title</Label>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter news title"
                                    className="bg-darknavy border-gray-700 text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-300">Category</Label>
                                <Select onValueChange={setCategory} value={category}>
                                    <SelectTrigger className="bg-darknavy border-gray-700 text-white">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-darknavy border-gray-700 text-white">
                                        <SelectItem value="announcement">Announcement</SelectItem>
                                        <SelectItem value="tips">Tips</SelectItem>
                                        <SelectItem value="update">Update</SelectItem>
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
                                    rows={6}
                                    className="bg-darknavy border-gray-700 text-white"
                                />
                            </div>

                            <Button onClick={submitNews} className="w-full bg-blue-500 hover:bg-blue-600">
                                Publish News
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}