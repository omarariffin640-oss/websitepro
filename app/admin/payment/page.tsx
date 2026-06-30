"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ShieldCheck, Webhook, CheckCircle } from "lucide-react";

export default function PaymentGatewayPage() {
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
                <p className="text-gray-400">Loading payment settings...</p>
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
                            <CreditCard className="h-4 w-4" />
                            Payment Gateway
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">
                            Payment Settings
                        </h1>

                        <p className="mt-3 text-gray-400">
                            Manage checkout provider, webhook status, payment mode and order
                            payment configuration.
                        </p>
                    </section>

                    <div className="grid gap-5 md:grid-cols-3">
                        <StatusCard title="Gateway" value="Stripe" icon={CreditCard} />
                        <StatusCard title="Mode" value="Test Mode" icon={ShieldCheck} />
                        <StatusCard title="Webhook" value="Configured" icon={Webhook} />
                    </div>

                    <Card className="mt-8 border-white/10 bg-white/5">
                        <CardContent className="p-6">
                            <h2 className="mb-5 text-lg font-semibold text-white">
                                Gateway Configuration
                            </h2>

                            <div className="grid gap-4 md:grid-cols-2">
                                <InfoRow label="Provider" value="Stripe" />
                                <InfoRow label="Currency" value="USD" />
                                <InfoRow label="Checkout Status" value="Enabled" />
                                <InfoRow label="Webhook Status" value="Active" />
                                <InfoRow label="Payment Mode" value="Test Mode" />
                                <InfoRow label="Auto Order Confirmation" value="Enabled" />
                            </div>

                            <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-300">
                                API keys and webhook secrets should be stored in backend
                                environment variables, not exposed inside frontend code.
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Button className="bg-purple-600 hover:bg-purple-700">
                                    Save Settings
                                </Button>

                                <Button
                                    variant="outline"
                                    className="border-white/10 bg-black/40 text-white hover:bg-white/10"
                                >
                                    Test Webhook
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

function StatusCard({
    title,
    value,
    icon: Icon,
}: {
    title: string;
    value: string;
    icon: any;
}) {
    return (
        <Card className="border-white/10 bg-white/5">
            <CardContent className="p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                    <Icon className="h-6 w-6 text-purple-400" />
                </div>

                <p className="text-sm text-gray-400">{title}</p>
                <p className="mt-1 text-xl font-bold text-white">{value}</p>
            </CardContent>
        </Card>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 p-4">
            <span className="text-gray-400">{label}</span>

            <span className="flex items-center gap-2 font-medium text-white">
                <CheckCircle className="h-4 w-4 text-green-400" />
                {value}
            </span>
        </div>
    );
}