"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";

export default function RevenueReportsPage() {
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
                    <h1 className="text-2xl font-bold text-white mb-3">Revenue Reports</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-[#1A1A1A] border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-white">Total Revenue</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-green-500">$125,000</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#1A1A1A] border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-white">This Month</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-purple-400">$32,500</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#1A1A1A] border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-white">Pending Payouts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-yellow-500">$8,200</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}