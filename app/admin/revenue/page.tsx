"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, DollarSign, Wallet, TrendingUp } from "lucide-react";

export default function RevenueReportsPage() {
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
                <p className="text-gray-400">Loading revenue reports...</p>
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
                            <BarChart3 className="h-4 w-4" />
                            Revenue Reports
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">
                            Revenue Overview
                        </h1>

                        <p className="mt-3 text-gray-400">
                            Monitor sales, monthly revenue, pending payouts and platform income.
                        </p>
                    </section>

                    <div className="grid gap-5 md:grid-cols-3">
                        <RevenueCard
                            icon={DollarSign}
                            title="Total Revenue"
                            value="$125,000"
                            color="text-green-400"
                        />

                        <RevenueCard
                            icon={TrendingUp}
                            title="This Month"
                            value="$32,500"
                            color="text-purple-400"
                        />

                        <RevenueCard
                            icon={Wallet}
                            title="Pending Payouts"
                            value="$8,200"
                            color="text-yellow-400"
                        />
                    </div>

                    <Card className="mt-8 border-white/10 bg-white/5">
                        <CardContent className="p-6">
                            <h2 className="mb-5 text-lg font-semibold text-white">
                                Revenue Breakdown
                            </h2>

                            <div className="space-y-4">
                                <RevenueRow label="Challenge Sales" value="$78,400" />
                                <RevenueRow label="Instant Funding Sales" value="$32,100" />
                                <RevenueRow label="Marketplace Revenue" value="$9,500" />
                                <RevenueRow label="Other Fees" value="$5,000" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

function RevenueCard({
    icon: Icon,
    title,
    value,
    color,
}: {
    icon: any;
    title: string;
    value: string;
    color: string;
}) {
    return (
        <Card className="border-white/10 bg-white/5">
            <CardContent className="p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                    <Icon className="h-6 w-6 text-purple-400" />
                </div>

                <p className="text-sm text-gray-400">{title}</p>
                <p className={`mt-1 text-3xl font-bold ${color}`}>{value}</p>
            </CardContent>
        </Card>
    );
}

function RevenueRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 p-4">
            <span className="text-gray-400">{label}</span>
            <span className="font-semibold text-white">{value}</span>
        </div>
    );
}