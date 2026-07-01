"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, ShieldCheck, Trash2 } from "lucide-react";
import { API_BASE } from "@/lib/api";

type KYC = {
    id: number;
    name: string;
    email: string;
    status: string;
    created_at?: string;
};

export default function KYCVerificationPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [kycs, setKycs] = useState<KYC[]>([]);
    const [message, setMessage] = useState("");

    const fetchKycs = async () => {
        try {
            const res = await fetch(`${API_BASE}/admin/kyc`);
            const data = await res.json();
            setKycs(Array.isArray(data) ? data : []);
        } catch {
            setKycs([]);
        }
    };

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetchKycs();
        setLoading(false);
    }, [router]);

    const updateStatus = async (id: number, status: string) => {
        const res = await fetch(`${API_BASE}/admin/kyc/${id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });

        const data = await res.json();

        if (!data.success) {
            setMessage(data.message || "Failed to update KYC.");
            return;
        }

        setMessage("KYC status updated.");
        fetchKycs();
    };

    const deleteKyc = async (id: number) => {
        if (!confirm("Delete this KYC request?")) return;

        const res = await fetch(`${API_BASE}/admin/kyc/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (!data.success) {
            setMessage(data.message || "Failed to delete KYC.");
            return;
        }

        setMessage("KYC deleted.");
        fetchKycs();
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading KYC verification...</p>
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
                            <ShieldCheck className="h-4 w-4" />
                            KYC Verification
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">KYC Requests</h1>
                        <p className="mt-3 text-gray-400">
                            Review, approve, reject and monitor user identity verification requests.
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
                                Verification List ({kycs.length})
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-white/10">
                                        <tr>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Name</th>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Email</th>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Status</th>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Date</th>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-white/10">
                                        {kycs.map((kyc) => (
                                            <tr key={kyc.id} className="hover:bg-white/[0.03]">
                                                <td className="py-4 font-medium text-white">
                                                    {kyc.name}
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        KYC ID: #{kyc.id}
                                                    </p>
                                                </td>
                                                <td className="py-4 text-gray-400">{kyc.email}</td>
                                                <td className="py-4">
                                                    <StatusBadge status={kyc.status} />
                                                </td>
                                                <td className="py-4 text-gray-400">
                                                    {kyc.created_at ? kyc.created_at.slice(0, 10) : "-"}
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            onClick={() => updateStatus(kyc.id, "verified")}
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-green-400 hover:bg-green-500/10"
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>

                                                        <Button
                                                            onClick={() => updateStatus(kyc.id, "rejected")}
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-400 hover:bg-red-500/10"
                                                        >
                                                            <XCircle className="h-4 w-4" />
                                                        </Button>

                                                        <Button
                                                            onClick={() => updateStatus(kyc.id, "pending")}
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-yellow-400 hover:bg-yellow-500/10"
                                                        >
                                                            <Clock className="h-4 w-4" />
                                                        </Button>

                                                        <Button
                                                            onClick={() => deleteKyc(kyc.id)}
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-500 hover:bg-red-500/10"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {kycs.length === 0 && (
                                    <p className="py-6 text-center text-gray-400">
                                        No KYC requests found.
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
    if (status === "verified") {
        return <Badge className="border-green-500/30 bg-green-500/20 text-green-400">Verified</Badge>;
    }

    if (status === "rejected") {
        return <Badge className="border-red-500/30 bg-red-500/20 text-red-400">Rejected</Badge>;
    }

    return <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">Pending</Badge>;
}