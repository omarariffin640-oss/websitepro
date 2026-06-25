"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Shield, Calendar } from "lucide-react";

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }

        fetch("https://websitepro-d5cu.onrender.com/admin/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading users...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="pt-6 lg:ml-64">
                <div className="mx-auto max-w-7xl px-4 pb-12">
                    <section className="mb-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                            <Users className="h-4 w-4" />
                            Admin Users
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">User Management</h1>
                        <p className="mt-3 text-gray-400">
                            View all registered traders and admins.
                        </p>
                    </section>

                    <Card className="border-white/10 bg-white/5">
                        <CardHeader>
                            <CardTitle className="text-white">All Users ({users.length})</CardTitle>
                        </CardHeader>

                        <CardContent>
                            {users.length === 0 ? (
                                <div className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-gray-400">
                                    No users found.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {users.map((user) => (
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
    icon: any;
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