"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Trash2 } from "lucide-react";
import { API_BASE } from "@/lib/api";

type AdminLog = {
    id: number;
    title: string;
    status: string;
    color: "green" | "blue" | "yellow" | "purple";
    created_at?: string;
};

export default function AdminLogsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState<AdminLog[]>([]);
    const [message, setMessage] = useState("");

    const fetchLogs = async () => {
        try {
            const res = await fetch(`${API_BASE}/admin/logs`);
            const data = await res.json();
            setLogs(Array.isArray(data) ? data : []);
        } catch {
            setLogs([]);
        }
    };

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetchLogs();
        setLoading(false);
    }, [router]);

    const deleteLog = async (id: number) => {
        if (!confirm("Delete this log?")) return;

        const res = await fetch(`${API_BASE}/admin/logs/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (!data.success) {
            setMessage(data.message || "Failed to delete log.");
            return;
        }

        setMessage("Log deleted.");
        fetchLogs();
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading admin logs...</p>
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
                            <Activity className="h-4 w-4" />
                            Admin Logs
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">Activity Logs</h1>
                        <p className="mt-3 text-gray-400">
                            Track admin actions, user activity, KYC updates, payouts and system events.
                        </p>
                    </section>

                    {message && (
                        <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-400">
                            {message}
                        </div>
                    )}

                    <Card className="border-white/10 bg-white/5">
                        <CardHeader>
                            <CardTitle className="text-white">
                                Recent Activity ({logs.length})
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-3">
                                {logs.map((log) => (
                                    <LogItem
                                        key={log.id}
                                        title={log.title}
                                        time={log.created_at ? log.created_at.slice(0, 19).replace("T", " ") : "-"}
                                        status={log.status || "Info"}
                                        color={log.color || "purple"}
                                        onDelete={() => deleteLog(log.id)}
                                    />
                                ))}

                                {logs.length === 0 && (
                                    <p className="text-gray-400">No admin logs found.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

function LogItem({
    title,
    time,
    status,
    color,
    onDelete,
}: {
    title: string;
    time: string;
    status: string;
    color: "green" | "blue" | "yellow" | "purple";
    onDelete: () => void;
}) {
    const colors = {
        green: "bg-green-500/20 text-green-500 border-green-500/30",
        blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        yellow: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
        purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };

    return (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/40 p-4">
            <div>
                <p className="text-white">{title}</p>
                <p className="mt-1 text-xs text-gray-500">{time}</p>
            </div>

            <div className="flex items-center gap-2">
                <Badge className={colors[color]}>{status}</Badge>

                <Button
                    onClick={onDelete}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-400 hover:bg-red-500/10"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}