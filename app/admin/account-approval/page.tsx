"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, FolderKanban, Clock, Trash2 } from "lucide-react";
import { API_BASE } from "@/lib/api";

type AccountApproval = {
    id: number;
    name: string;
    account: string;
    amount: string;
    status: string;
    created_at?: string;
};

export default function AccountApprovalPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [accounts, setAccounts] = useState<AccountApproval[]>([]);
    const [message, setMessage] = useState("");

    const fetchAccounts = async () => {
        try {
            const res = await fetch(`${API_BASE}/admin/account-approval`);
            const data = await res.json();
            setAccounts(Array.isArray(data) ? data : []);
        } catch {
            setAccounts([]);
        }
    };

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetchAccounts();
        setLoading(false);
    }, [router]);

    const updateStatus = async (id: number, status: string) => {
        const res = await fetch(`${API_BASE}/admin/account-approval/${id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });

        const data = await res.json();

        if (!data.success) {
            setMessage(data.message || "Failed to update account.");
            return;
        }

        setMessage("Account status updated.");
        fetchAccounts();
    };

    const deleteAccount = async (id: number) => {
        if (!confirm("Delete this account request?")) return;

        const res = await fetch(`${API_BASE}/admin/account-approval/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (!data.success) {
            setMessage(data.message || "Failed to delete account request.");
            return;
        }

        setMessage("Account request deleted.");
        fetchAccounts();
    };

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
                            Review, approve, reject and delete new challenge account requests.
                        </p>
                    </section>

                    {message && (
                        <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-400">
                            {message}
                        </div>
                    )}

                    <Card className="border-white/10 bg-white/5">
                        <CardContent className="p-6">
                            <h2 className="mb-5 text-lg font-semibold text-white">
                                Account Requests ({accounts.length})
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
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Account ID: #{account.id}
                                                    </p>
                                                </td>
                                                <td className="py-4 text-gray-300">{account.account}</td>
                                                <td className="py-4 font-semibold text-green-400">{account.amount}</td>
                                                <td className="py-4">
                                                    <StatusBadge status={account.status} />
                                                </td>
                                                <td className="py-4 text-gray-400">
                                                    {account.created_at ? account.created_at.slice(0, 10) : "-"}
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex gap-2">
                                                        <Button onClick={() => updateStatus(account.id, "approved")} variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:bg-green-500/10">
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>

                                                        <Button onClick={() => updateStatus(account.id, "rejected")} variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-500/10">
                                                            <XCircle className="h-4 w-4" />
                                                        </Button>

                                                        <Button onClick={() => updateStatus(account.id, "pending")} variant="ghost" size="icon" className="h-8 w-8 text-yellow-400 hover:bg-yellow-500/10">
                                                            <Clock className="h-4 w-4" />
                                                        </Button>

                                                        <Button onClick={() => deleteAccount(account.id)} variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-500/10">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {accounts.length === 0 && (
                                    <p className="py-6 text-center text-gray-400">
                                        No account requests found.
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === "approved") {
        return <Badge className="border-green-500/30 bg-green-500/20 text-green-400">Approved</Badge>;
    }

    if (status === "rejected") {
        return <Badge className="border-red-500/30 bg-red-500/20 text-red-400">Rejected</Badge>;
    }

    return <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">Pending</Badge>;
}