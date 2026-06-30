"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, Mail, Shield, Calendar, Download, Search } from "lucide-react";
import Papa from "papaparse";
import { API_BASE } from "@/lib/api";

type User = {
    id: number;
    name?: string;
    email: string;
    role?: string;
    avatar_url?: string;
    created_at?: string;
};

export default function AdminUsersPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }

        fetch(`${API_BASE}/admin/users`)
            .then((res) => res.json())
            .then((data) => {
                setUsers(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [router]);

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return users;

        return users.filter(
            (user) =>
                user.email.toLowerCase().includes(query) ||
                (user.name?.toLowerCase().includes(query) ?? false)
        );
    }, [users, search]);

    const exportCsv = () => {
        const csv = Papa.unparse(
            filteredUsers.map((user) => ({
                id: user.id,
                name: user.name || "",
                email: user.email,
                role: user.role || "trader",
                joined: user.created_at || "",
            }))
        );

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "noor-funding-users.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading users...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />

            <main className="pt-6 lg:ml-74">
                <div className="mx-auto max-w-7xl px-4 pb-12 animate-fade-in">
                    <section className="mb-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                            <Users className="h-4 w-4" />
                            Admin Users
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">User Management</h1>
                        <p className="mt-3 text-gray-400">
                            Search, review, and export registered traders and admins.
                        </p>
                    </section>

                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative max-w-md flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or email..."
                                className="border-gray-800 bg-gray-950/80 pl-10"
                            />
                        </div>
                        <Button
                            onClick={exportCsv}
                            variant="outline"
                            className="border-gray-700 text-gray-200 hover:bg-gray-900"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export CSV
                        </Button>
                    </div>

                    <Card className="border-white/10 bg-white/5">
                        <CardHeader>
                            <CardTitle className="text-white">
                                All Users ({filteredUsers.length})
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            {filteredUsers.length === 0 ? (
                                <div className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-gray-400">
                                    No users found.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-4 md:flex-row md:items-center md:justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-purple-500/20">
                                                    {user.avatar_url ? (
                                                        <img src={user.avatar_url} alt="avatar" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <Users className="h-5 w-5 text-purple-400" />
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-white">
                                                        {user.name || "No Name"}
                                                    </p>
                                                    <p className="flex items-center gap-1 text-sm text-gray-400">
                                                        <Mail className="h-3.5 w-3.5" />
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 md:min-w-[360px]">
                                                <Info icon={Shield} label="Role" value={user.role || "trader"} />
                                                <Info
                                                    icon={Calendar}
                                                    label="Joined"
                                                    value={
                                                        user.created_at
                                                            ? new Date(user.created_at).toLocaleDateString()
                                                            : "-"
                                                    }
                                                />
                                            </div>

                                            <Badge className={user.role === "admin" ? "border-purple-500/30 bg-purple-500/20 text-purple-300" : "border-green-500/30 bg-green-500/20 text-green-400"}>
                                                {user.role || "trader"}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

function Info({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
            <div className="mb-1 flex items-center gap-2 text-gray-400">
                <Icon className="h-4 w-4 text-purple-400" />
                <span>{label}</span>
            </div>
            <p className="font-medium text-white">{value}</p>
        </div>
    );
}
