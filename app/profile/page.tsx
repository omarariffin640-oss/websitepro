"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
// @ts-ignore
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://mxaanohwaafzshwksqrt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14YWFub2h3YWFmenNod2tzcXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NjA2NDksImV4cCI6MjA5NjMzNjY0OX0.gdZ1OIjsPXVQfBoT9Nipabzj6CU273ERxefvKSdbteI"
);

type User = {
    id: number;
    email: string;
    name?: string;
    avatar_url?: string;
};

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            router.push("/login");
            return;
        }

        fetch("https://websitepro-d5cu.onrender.com/users")
            .then(res => res.json())
            .then(users => {
                const currentUser = users.find((u: User) => u.email === userEmail);
                if (currentUser) {
                    setUser(currentUser);
                    setName(currentUser.name || "");
                    setEmail(currentUser.email);
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                router.push("/login");
            });
    }, [router]);

    const uploadAvatar = async (file: File) => {
        setUploading(true);
        const fileExt = file.name.split('.').pop();
        const fileName = `${user?.id}-${Date.now()}.${fileExt}`;

        const { error } = await supabase.storage
            .from('profile-pics')
            .upload(fileName, file);

        if (error) {
            setMessage("Upload failed");
            setUploading(false);
            return;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('profile-pics')
            .getPublicUrl(fileName);

        const res = await fetch("https://websitepro-d5cu.onrender.com/profile/update-avatar", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, avatarUrl: publicUrl })
        });
        const data = await res.json();

        if (data.success) {
            setUser({ ...user!, avatar_url: publicUrl });
            setMessage("Avatar updated successfully!");
        } else {
            setMessage("Failed to save avatar URL");
        }
        setUploading(false);
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch("https://websitepro-d5cu.onrender.com/profile/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name }),
            });
            const data = await res.json();
            setMessage(data.success ? "Profile updated successfully!" : "Update failed");
            if (data.success) setTimeout(() => setMessage(""), 3000);
        } catch {
            setMessage("Update failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        router.push("/login");
    };

    if (loading) return <div className="flex min-h-screen items-center justify-center">Loading profile...</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>
            <div className="container mx-auto p-8 max-w-md">
                <Card>
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src={user.avatar_url} />
                                <AvatarFallback className="text-3xl">
                                    {email.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle className="text-2xl">My Profile</CardTitle>
                        <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Profile Picture</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) uploadAvatar(e.target.files[0]);
                                }}
                                disabled={uploading}
                            />
                            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} disabled className="bg-gray-100" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                        </div>

                        {message && <p className="text-center text-sm text-green-600">{message}</p>}

                        <Button onClick={handleUpdate} className="w-full">Update Profile</Button>
                        <Button onClick={handleLogout} variant="destructive" className="w-full">Logout</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}