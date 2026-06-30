"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

export default function AdminLogsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        setLoading(false);
    }, [router]);

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

            <main className="pt-6 lg:ml-64">
                <div className="mx-auto max-w-7xl px-4 pb-12">
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

                    <Card className="border-white/10 bg-white/5">
                        <CardHeader>
                            <CardTitle className="text-white">Recent Activity</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-3">
                                <LogItem
                                    title="Admin signed in successfully"
                                    time="Today • 10:30 AM"
                                    status="Success"
                                    color="green"
                                />

                                <LogItem
                                    title="KYC verification approved"
                                    time="Today • 09:15 AM"
                                    status="Approved"
                                    color="blue"
                                />

                                <LogItem
                                    title="Payout request submitted"
                                    time="Today • 08:45 AM"
                                    status="Pending"
                                    color="yellow"
                                />

                                <LogItem
                                    title="New trading account created"
                                    time="Today • 08:10 AM"
                                    status="Info"
                                    color="purple"
                                />
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
}: {
    title: string;
    time: string;
    status: string;
    color: "green" | "blue" | "yellow" | "purple";
}) {
    const colors = {
        green: "bg-green-500/20 text-green-500 border-green-500/30",
        blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        yellow: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
        purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };

    return (
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 p-4">
            <div>
                <p className="text-white">{title}</p>
                <p className="mt-1 text-xs text-gray-500">{time}</p>
            </div>

            <Badge className={colors[color]}>{status}</Badge>
        </div>
    );
}