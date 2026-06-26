"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";

export default function EmailTemplatesPage() {
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
                    <h1 className="text-2xl font-bold text-white mb-3">Email Templates</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-[#1A1A1A] border-gray-800 hover:border-purple-500/30 transition-colors">
                            <CardHeader>
                                <CardTitle className="text-white">Welcome Email</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400 text-sm mb-4">Sent to new users upon registration.</p>
                                <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                                    Edit Template
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#1A1A1A] border-gray-800 hover:border-purple-500/30 transition-colors">
                            <CardHeader>
                                <CardTitle className="text-white">KYC Approved</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400 text-sm mb-4">Sent when KYC is approved.</p>
                                <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                                    Edit Template
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#1A1A1A] border-gray-800 hover:border-purple-500/30 transition-colors">
                            <CardHeader>
                                <CardTitle className="text-white">Payout Confirmation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400 text-sm mb-4">Sent after payout is processed.</p>
                                <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                                    Edit Template
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#1A1A1A] border-gray-800 hover:border-purple-500/30 transition-colors">
                            <CardHeader>
                                <CardTitle className="text-white">Challenge Started</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400 text-sm mb-4">Sent when user starts a challenge.</p>
                                <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                                    Edit Template
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}