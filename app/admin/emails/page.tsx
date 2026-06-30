"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Edit, CheckCircle } from "lucide-react";

const templates = [
    ["Welcome Email", "Sent to new users after registration.", "Active"],
    ["KYC Approved", "Sent when user KYC is approved.", "Active"],
    ["Payout Confirmation", "Sent after payout is processed.", "Active"],
    ["Challenge Started", "Sent when user starts a challenge.", "Active"],
];

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
                <p className="text-gray-400">Loading email templates...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />

            <main className="pt-6 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                    <section className="mb-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                            <Mail className="h-4 w-4" />
                            Email Templates
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">Email Management</h1>
                        <p className="mt-3 text-gray-400">
                            Manage automated emails for users, KYC, payouts and challenge updates.
                        </p>
                    </section>

                    <div className="grid gap-5 md:grid-cols-2">
                        {templates.map(([title, desc, status]) => (
                            <Card key={title} className="border-white/10 bg-white/5 hover:border-purple-500/40">
                                <CardContent className="p-6">
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">{title}</h2>
                                            <p className="mt-2 text-sm text-gray-400">{desc}</p>
                                        </div>

                                        <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                                            <CheckCircle className="h-3.5 w-3.5" />
                                            {status}
                                        </span>
                                    </div>

                                    <Button className="bg-purple-600 hover:bg-purple-700">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Template
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}