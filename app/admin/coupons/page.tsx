"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function CouponsPage() {
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
            <main className="lg:ml-64 pt-16">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white mb-6">Coupons Management</h1>
                    <Card className="bg-darkcard">
                        <CardHeader>
                            <CardTitle className="text-white">Active Coupons</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-gray-700">
                                        <tr>
                                            <th className="pb-3 text-gray-400">Code</th>
                                            <th className="pb-3 text-gray-400">Discount</th>
                                            <th className="pb-3 text-gray-400">Expiry</th>
                                            <th className="pb-3 text-gray-400">Status</th>
                                            <th className="pb-3 text-gray-400">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-800">
                                            <td className="py-3 text-white">PROP10</td>
                                            <td className="py-3 text-green-500">10%</td>
                                            <td className="py-3 text-gray-400">2026-12-31</td>
                                            <td className="py-3"><span className="px-2 py-1 bg-green-500/20 text-green-500 rounded">Active</span></td>
                                            <td className="py-3">
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400">👁️</Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400">🗑️</Button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-800">
                                            <td className="py-3 text-white">PROP20</td>
                                            <td className="py-3 text-green-500">20%</td>
                                            <td className="py-3 text-gray-400">2026-06-30</td>
                                            <td className="py-3"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded">Expired</span></td>
                                            <td className="py-3">
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400">👁️</Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400">🗑️</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}