"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";

type User = {
    id: number;
    email: string;
    name?: string;
};

export default function DashboardPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            router.push("/login");
            return;
        }

        fetch("https://websitepro-d5cu.onrender.com/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        router.push("/login");
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <>
            <ThemeToggle />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
                        <Button onClick={handleLogout} variant="destructive">
                            Logout
                        </Button>
                    </div>

                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="dark:text-white">Total Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold dark:text-white">{users.length}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="dark:text-white">User List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {users.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400">No users registered yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {users.map((user) => (
                                        <div key={user.id} className="flex items-center gap-3 p-3 border rounded-lg dark:border-gray-700">
                                            <Avatar>
                                                <AvatarFallback>
                                                    {user.email.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium dark:text-white">{user.name || user.email}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}