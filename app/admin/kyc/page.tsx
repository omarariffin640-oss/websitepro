"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, ShieldCheck } from "lucide-react";

const kycs = [
    { id: 1, name: "Ali Noor", email: "ali@test.com", status: "pending", date: "2026-06-16" },
    { id: 2, name: "Sarah Tan", email: "sarah@test.com", status: "verified", date: "2026-06-15" },
    { id: 3, name: "John Lim", email: "john@test.com", status: "rejected", date: "2026-06-14" },
];

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

                    <Card className="border-white/10 bg-white/5">
                        <CardContent className="p-6">
                            <h2 className="mb-5 text-lg font-semibold text-white">
                                Verification List
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
                                                <td className="py-4 font-medium text-white">{kyc.name}</td>
                                                <td className="py-4 text-gray-400">{kyc.email}</td>
                                                <td className="py-4">
                                                    <StatusBadge status={kyc.status} />
                                                </td>
                                                <td className="py-4 text-gray-400">{kyc.date}</td>
                                                <td className="py-4">
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:bg-green-500/10">
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-500/10">
                                                            <XCircle className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-yellow-400 hover:bg-yellow-500/10">
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

function StatusBadge({ status }: { status: string }) {
    if (status === "verified") {
        return <Badge className="border-green-500/30 bg-green-500/20 text-green-400">Verified</Badge>;
    }

    if (status === "rejected") {
        return <Badge className="border-red-500/30 bg-red-500/20 text-red-400">Rejected</Badge>;
    }

    return <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">Pending</Badge>;
}