"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function RevenueReportsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) { router.push("/login"); return; }
        setUserEmail(email);
        setLoading(false);
    }, [router]);

    if (loading) return <div className="flex min-h-screen items-center justify-center bg-darknavy"><p className="text-gray-400">Loading...</p></div>;

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="lg:ml-64 pt-16">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white mb-6">Revenue Reports</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-darkcard">
                            <CardHeader><CardTitle className="text-white">Total Revenue</CardTitle></CardHeader>
                            <CardContent><p className="text-3xl font-bold text-green-500">$125,000</p></CardContent>
                        </Card>
                        <Card className="bg-darkcard">
                            <CardHeader><CardTitle className="text-white">This Month</Title></CardHeader>
                            <CardContent><p className="text-3xl font-bold text-blue-500">$32,500</p></CardContent>
                        </Card>
                        <Card className="bg-darkcard">
                            <CardHeader><CardTitle className="text-white">Pending Payouts</Title></CardHeader>
                            <CardContent><p className="text-3xl font-bold text-yellow-500">$8,200</p></CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}