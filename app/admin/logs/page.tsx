"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function AdminLogsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        setUserEmail(email);
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-darknavy">
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="lg:ml-64 pt-2">
                <div className="p-3">
                    <h1 className="text-2xl font-bold text-white mb-3">Admin Logs</h1>
                    <Card className="bg-darkcard">
                        <CardHeader>
                            <CardTitle className="text-white">Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 rounded-lg bg-darknavy/50">
                                    <div>
                                        <p className="text-white">User <span className="text-blue-400">test@gmail.com</span> logged in</p>
                                        <p className="text-xs text-gray-500">2026-06-16 10:30 AM</p>
                                    </div>
                                    <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs">Success</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-darknavy/50">
                                    <div>
                                        <p className="text-white">KYC approved for <span className="text-blue-400">user2@mail.com</span></p>
                                        <p className="text-xs text-gray-500">2026-06-16 09:15 AM</p>
                                    </div>
                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-500 rounded text-xs">Info</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-darknavy/50">
                                    <div>
                                        <p className="text-white">Payout of <span className="text-green-400">$2,500</span> approved</p>
                                        <p className="text-xs text-gray-500">2026-06-16 08:45 AM</p>
                                    </div>
                                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded text-xs">Pending</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}