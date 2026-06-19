"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function KYCVerificationPage() {
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

    const kycs = [
        { id: 1, name: "Ali Noor", email: "ali@test.com", status: "pending", date: "2026-06-16" },
        { id: 2, name: "Sarah Tan", email: "sarah@test.com", status: "verified", date: "2026-06-15" },
        { id: 3, name: "John Lim", email: "john@test.com", status: "rejected", date: "2026-06-14" },
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
            <Topbar onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-2">
                <div className="p-3">
                    <h1 className="text-2xl font-bold text-white mb-3">KYC Verification</h1>

                    <Card className="bg-[#1A1A1A] border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white">Pending Verifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-gray-700">
                                        <tr>
                                            <th className="pb-3 text-gray-400 font-medium">Name</th>
                                            <th className="pb-3 text-gray-400 font-medium">Email</th>
                                            <th className="pb-3 text-gray-400 font-medium">Status</th>
                                            <th className="pb-3 text-gray-400 font-medium">Date</th>
                                            <th className="pb-3 text-gray-400 font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {kycs.map((kyc) => (
                                            <tr key={kyc.id} className="hover:bg-gray-800/30 transition-colors">
                                                <td className="py-3 text-white">{kyc.name}</td>
                                                <td className="py-3 text-gray-400">{kyc.email}</td>
                                                <td className="py-3">
                                                    {kyc.status === "verified" && (
                                                        <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Verified</Badge>
                                                    )}
                                                    {kyc.status === "pending" && (
                                                        <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>
                                                    )}
                                                    {kyc.status === "rejected" && (
                                                        <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Rejected</Badge>
                                                    )}
                                                </td>
                                                <td className="py-3 text-gray-400">{kyc.date}</td>
                                                <td className="py-3">
                                                    <div className="flex gap-1">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:text-green-300 hover:bg-green-500/10">
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                                            <XCircle className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10">
                                                            <Clock className="h-4 w-4" />
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