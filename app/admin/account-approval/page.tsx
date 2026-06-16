"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { CheckCircle, XCircle } from "lucide-react";

export default function AccountApprovalPage() {
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

    const accounts = [
        { id: 1, name: "Ali Noor", account: "Standard", amount: 10000, status: "pending", date: "2026-06-16" },
        { id: 2, name: "Sarah Tan", account: "Premium", amount: 25000, status: "approved", date: "2026-06-15" },
    ];

    if (loading) return <div className="flex min-h-screen items-center justify-center bg-darknavy"><p className="text-gray-400">Loading...</p></div>;

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="lg:ml-64 pt-16">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white mb-6">Account Approval</h1>
                    <Card className="bg-darkcard">
                        <CardHeader><CardTitle className="text-white">Pending Accounts</CardTitle></CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-gray-700">
                                        <tr>
                                            <th className="pb-3 text-gray-400">Name</th>
                                            <th className="pb-3 text-gray-400">Account</th>
                                            <th className="pb-3 text-gray-400">Amount</th>
                                            <th className="pb-3 text-gray-400">Status</th>
                                            <th className="pb-3 text-gray-400">Date</th>
                                            <th className="pb-3 text-gray-400">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accounts.map((acc) => (
                                            <tr key={acc.id} className="border-b border-gray-800">
                                                <td className="py-3 text-white">{acc.name}</td>
                                                <td className="py-3 text-gray-400">{acc.account}</td>
                                                <td className="py-3 text-white">${acc.amount.toLocaleString()}</td>
                                                <td className="py-3">
                                                    {acc.status === "approved" && <Badge className="bg-green-500">Approved</Badge>}
                                                    {acc.status === "pending" && <Badge className="bg-yellow-500">Pending</Badge>}
                                                </td>
                                                <td className="py-3 text-gray-400">{acc.date}</td>
                                                <td className="py-3">
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400"><CheckCircle className="h-4 w-4" /></Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400"><XCircle className="h-4 w-4" /></Button>
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