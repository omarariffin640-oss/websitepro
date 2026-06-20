"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { CheckCircle, XCircle } from "lucide-react";

export default function PayoutApprovalPage() {
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

    const payouts = [
        { id: 1, name: "Ali Noor", amount: 2500, method: "Bank Transfer", status: "pending", date: "2026-06-16" },
        { id: 2, name: "Sarah Tan", amount: 5000, method: "Crypto", status: "approved", date: "2026-06-15" },
    ];

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Topbar />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-2">
                <div className="p-3">
                    <h1 className="text-2xl font-bold text-white mb-3">Payout Approval</h1>

                    <Card className="bg-[#1A1A1A] border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white">Pending Payouts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-gray-700">
                                        <tr>
                                            <th className="pb-3 text-gray-400 font-medium">Name</th>
                                            <th className="pb-3 text-gray-400 font-medium">Amount</th>
                                            <th className="pb-3 text-gray-400 font-medium">Method</th>
                                            <th className="pb-3 text-gray-400 font-medium">Status</th>
                                            <th className="pb-3 text-gray-400 font-medium">Date</th>
                                            <th className="pb-3 text-gray-400 font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {payouts.map((payout) => (
                                            <tr key={payout.id} className="hover:bg-gray-800/30 transition-colors">
                                                <td className="py-3 text-white">{payout.name}</td>
                                                <td className="py-3 text-green-500 font-bold">${payout.amount.toLocaleString()}</td>
                                                <td className="py-3 text-gray-400">{payout.method}</td>
                                                <td className="py-3">
                                                    {payout.status === "approved" && (
                                                        <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Approved</Badge>
                                                    )}
                                                    {payout.status === "pending" && (
                                                        <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>
                                                    )}
                                                </td>
                                                <td className="py-3 text-gray-400">{payout.date}</td>
                                                <td className="py-3">
                                                    <div className="flex gap-1">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:text-green-300 hover:bg-green-500/10">
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                                            <XCircle className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
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