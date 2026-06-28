"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import DashboardShell from "@/components/DashboardShell";
import DashboardTopbar from "@/components/layout/DashboardTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
    Wallet,
    Server,
    Shield,
    KeyRound,
    Activity,
    TrendingUp,
    Trophy,
    Calendar,
    ArrowLeft,
} from "lucide-react";

type Account = {
    id: number;
    account_name: string;
    balance: number;
    status: string;
    platform?: string;
    login?: string;
    server?: string;
    created_at?: string;
};

const API_URL = "https://websitepro-d5cu.onrender.com";

export default function AccountDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const accountId = params.id as string;

    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetchAccount(email);
    }, [router, accountId]);

    const fetchAccount = async (email: string) => {
        try {
            const res = await fetch(`${API_URL}/accounts?email=${email}`);
            const data = await res.json();

            const found = Array.isArray(data)
                ? data.find((item) => String(item.id) === String(accountId))
                : null;

            setAccount(found || null);
        } catch {
            setAccount(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardShell>
                <div className="flex min-h-[300px] items-center justify-center">
                    <p className="text-gray-400">Loading account...</p>
                </div>
            </DashboardShell>
        );
    }

    if (!account) {
        return (
            <DashboardShell>
                <div className="flex min-h-[300px] items-center justify-center text-white">
                    <div className="text-center">
                        <p className="mb-4 text-red-400">Account not found.</p>
                        <Link href="/accounts" className="text-purple-400">
                            Back to Accounts
                        </Link>
                    </div>
                </div>
            </DashboardShell>
        );
    }

    const balance = Number(account.balance || 0);

    return (
        <DashboardShell>
            <Link
                href="/accounts"
                className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Accounts
            </Link>

            <DashboardTopbar
                title={account.account_name}
                description="View account login, balance, status and trading performance."
            />

            <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-4">
                <StatCard icon={Wallet} title="Balance" value={`$${balance.toLocaleString()}`} color="text-purple-400" />
                <StatCard icon={Activity} title="Status" value={account.status || "active"} color="text-green-400" />
                <StatCard icon={TrendingUp} title="Profit" value="$0.00" color="text-green-400" />
                <StatCard icon={Trophy} title="Win Rate" value="0%" color="text-yellow-400" />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <Card className="border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-gray-950 xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-white">Trading Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-xl border border-white/10 bg-black/40 p-8 text-center text-gray-400">
                            No trades yet. Start trading to see performance here.
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-white/10 bg-zinc-950/70">
                    <CardHeader>
                        <CardTitle className="text-white">MT5 Access</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <InfoRow icon={KeyRound} label="Login" value={account.login || `NF-${account.id}`} />
                        <InfoRow icon={Server} label="Server" value={account.server || "NoorFunding-Demo"} />
                        <InfoRow icon={Shield} label="Platform" value={account.platform || "MT5"} />
                        <InfoRow
                            icon={Calendar}
                            label="Created"
                            value={account.created_at ? new Date(account.created_at).toLocaleDateString() : "-"}
                        />
                    </CardContent>
                </Card>
            </div>
        </DashboardShell>
    );
}

function StatCard({ icon: Icon, title, value, color }: any) {
    return (
        <Card className="border-white/10 bg-zinc-950/70">
            <CardContent className="p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                    <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className={`mt-1 text-2xl font-bold capitalize ${color}`}>{value}</p>
            </CardContent>
        </Card>
    );
}

function InfoRow({ icon: Icon, label, value }: any) {
    return (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/40 p-3">
            <div className="flex items-center gap-2 text-gray-400">
                <Icon className="h-4 w-4 text-purple-400" />
                <span>{label}</span>
            </div>
            <span className="font-medium text-white">{value}</span>
        </div>
    );
}