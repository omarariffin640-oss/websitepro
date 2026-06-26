"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Sidebar";

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
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />
            <main className="lg:ml-64 pt-2">
                <div className="p-3">
                    <h1 className="text-2xl font-bold text-white mb-3">Admin Logs</h1>

                    <Card className="bg-[#1A1A1A] border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white">Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 rounded-lg bg-black/50 border border-gray-800">
                                    <div>
                                        <p className="text-white">User <span className="text-purple-400">test@gmail.com</span> logged in</p>
                                        <p className="text-xs text-gray-500">2026-06-16 10:30 AM</p>
                                    </div>
                                    <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Success</Badge>
                                </div>

                                <div className="flex justify-between items-center p-3 rounded-lg bg-black/50 border border-gray-800">
                                    <div>
                                        <p className="text-white">KYC approved for <span className="text-purple-400">user2@mail.com</span></p>
                                        <p className="text-xs text-gray-500">2026-06-16 09:15 AM</p>
                                    </div>
                                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Info</Badge>
                                </div>

                                <div className="flex justify-between items-center p-3 rounded-lg bg-black/50 border border-gray-800">
                                    <div>
                                        <p className="text-white">Payout of <span className="text-green-400">$2,500</span> approved</p>
                                        <p className="text-xs text-gray-500">2026-06-16 08:45 AM</p>
                                    </div>
                                    <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}