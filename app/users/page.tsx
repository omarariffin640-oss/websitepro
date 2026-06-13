"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import Papa from "papaparse";
import { Download } from "lucide-react";

type User = {
    id: number;
    email: string;
    name?: string;
    avatar_url?: string;
    created_at?: string;
};

export default function UsersPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        setUserEmail(email);

        fetch("https://websitepro-d5cu.onrender.com/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setFilteredUsers(data);
                const currentUser = data.find((u: User) => u.email === email);
                if (currentUser) {
                    setAvatarUrl(currentUser.avatar_url || "");
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [router]);

    useEffect(() => {
        if (search === "") {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(
                users.filter(user =>
                    user.email.toLowerCase().includes(search.toLowerCase()) ||
                    (user.name && user.name.toLowerCase().includes(search.toLowerCase()))
                )
            );
        }
    }, [search, users]);

    const exportToCSV = () => {
        const csvData = filteredUsers.map(user => ({
            Email: user.email,
            Name: user.name || "-",
            "Joined Date": user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"
        }));

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `users_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-darknavy">
                <p className="text-gray-400">Loading users...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-16">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-white">Users</h1>
                        <div className="flex gap-3">
                            <Button onClick={exportToCSV} className="bg-green-500 hover:bg-green-600">
                                <Download className="w-4 h-4 mr-2" />
                                Export CSV
                            </Button>
                            <div className="w-64">
                                <Input
                                    type="text"
                                    placeholder="Search users..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-darkcard border-gray-700 text-white"
                                />
                            </div>
                        </div>
                    </div>

                    <Card className="bg-darkcard">
                        <CardContent className="p-6">
                            <div className="space-y-3">
                                {filteredUsers.length === 0 ? (
                                    <p className="text-gray-400 text-center">No users found</p>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg bg-darknavy/50 hover:bg-darknavy transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                                {user.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-white">{user.name || user.email}</p>
                                                <p className="text-sm text-gray-400">{user.email}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">
                                                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : "New"}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}