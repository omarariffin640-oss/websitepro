"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type User = {
    id: number;
    email: string;
    name?: string;
};

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

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

    const handleUpdate = async () => {
        try {
            const res = await fetch("https://websitepro-d5cu.onrender.com/profile/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name }),
            });
            const data = await res.json();
            setMessage(data.success ? "Profile updated successfully!" : "Update failed");
            if (data.success) {
                setTimeout(() => setMessage(""), 3000);
            }
        } catch {
            setMessage("Update failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        router.push("/login");
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Avatar className="w-20 h-20">
                            <AvatarFallback className="text-2xl">
                                {email.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <CardTitle className="text-2xl">My Profile</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            disabled
                            className="bg-gray-100"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>

                    {message && (
                        <p className={`text-center text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                            {message}
                        </p>
                    )}

                    <Button onClick={handleUpdate} className="w-full">
                        Update Profile
                    </Button>

                    <Button onClick={handleLogout} variant="destructive" className="w-full">
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}