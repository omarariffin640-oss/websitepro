"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, FolderKanban } from "lucide-react";

const accounts = [
    {
        id: 1,
        name: "Ali Noor",
        account: "Standard Challenge",
        amount: "$10,000",
        status: "Pending",
        date: "2026-06-16",
    },
    {
        id: 2,
        name: "Sarah Tan",
        account: "Premium Challenge",
        amount: "$25,000",
        status: "Approved",
        date: "2026-06-15",
    },
];

export default function AccountApprovalPage() {
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
                <p className="text-gray-400">Loading account approvals...</p>
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

            <main className="pt-6 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                    <section className="mb-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                            <FolderKanban className="h-4 w-4" />
                            Account Approval
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">
                            Trading Account Approval
                        </h1>

                        <p className="mt-3 text-gray-400">
                            Review and approve new challenge accounts before activation.
                        </p>
                    </section>

                    <Card className="border-white/10 bg-white/5">
                        <CardContent className="p-6">
                            <h2 className="mb-5 text-lg font-semibold text-white">
                                Pending Requests
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-white/10">
                                        <tr>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Trader</th>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Account</th>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Balance</th>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Status</th>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Date</th>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-white/10">
                                        {accounts.map((account) => (
                                            <tr key={account.id} className="hover:bg-white/[0.03]">
                                                <td className="py-4 font-medium text-white">
                                                    {account.name}
                                                </td>

                                                <td className="py-4 text-gray-300">
                                                    {account.account}
                                                </td>

                                                <td className="py-4 font-semibold text-green-400">
                                                    {account.amount}
                                                </td>

                                                <td className="py-4">
                                                    <Badge
                                                        className={
                                                            account.status === "Approved"
                                                                ? "border-green-500/30 bg-green-500/20 text-green-400"
                                                                : "border-yellow-500/30 bg-yellow-500/20 text-yellow-400"
                                                        }
                                                    >
                                                        {account.status}
                                                    </Badge>
                                                </td>

                                                <td className="py-4 text-gray-400">
                                                    {account.date}
                                                </td>

                                                <td className="py-4">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-green-400 hover:bg-green-500/10"
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>

                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-400 hover:bg-red-500/10"
                                                        >
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