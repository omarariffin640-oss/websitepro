"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Wallet,
    Activity,
    Shield,
    TrendingUp,
    Server,
    KeyRound,
    Copy,
    ArrowUpRight,
    CheckCircle,
} from "lucide-react";

type Account = {
    id: number;
    account_name: string;
    balance: number;
    status: string;
};

export default function AccountsPage() {
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetch(`https://websitepro-d5cu.onrender.com/accounts?email=${email}`)
            .then((res) => res.json())
            .then((data) => {
                setAccounts(Array.isArray(data) ? data : []);
            })
            .catch(() => setAccounts([]))
            .finally(() => setLoading(false));
    }, [router]);

    const totalBalance = accounts.reduce(
        (sum, account) => sum + Number(account.balance || 0),
        0
    );

    const activeAccounts = accounts.filter(
        (account) => (account.status || "active").toLowerCase() === "active"
    ).length;

    const getStatusBadge = (status?: string) => {
        const value = (status || "active").toLowerCase();

        if (value === "active") {
            return (
                <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
                    Active
                </Badge>
            );
        }

        if (value === "pending") {
            return (
                <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">
                    Pending
                </Badge>
            );
        }

        if (value === "closed") {
            return (
                <Badge className="border-red-500/30 bg-red-500/20 text-red-400">
                    Closed
                </Badge>
            );
        }

        return (
            <Badge className="border-gray-500/30 bg-gray-500/20 text-gray-400">
                Unknown
            </Badge>
        );
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading accounts...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="pt-6 lg:ml-64">
                <div className="mx-auto max-w-7xl px-4 pb-12">
                    <section className="relative mb-8 overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
                        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                                    <Wallet className="h-4 w-4" />
                                    Account Center
                                </div>

                                <h1 className="text-3xl font-bold md:text-4xl">
                                    Trading Accounts
                                </h1>

                                <p className="mt-3 max-w-2xl text-gray-400">
                                    View your funded accounts, balances, status, and trading platform access.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm">
                                <p className="text-gray-400">Total Balance</p>
                                <p className="mt-1 text-2xl font-bold text-white">
                                    ${totalBalance.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                        <SummaryCard
                            icon={Wallet}
                            title="Total Accounts"
                            value={accounts.length.toString()}
                            color="text-purple-400"
                        />
                        <SummaryCard
                            icon={CheckCircle}
                            title="Active Accounts"
                            value={activeAccounts.toString()}
                            color="text-green-400"
                        />
                        <SummaryCard
                            icon={TrendingUp}
                            title="Total Balance"
                            value={`$${totalBalance.toLocaleString()}`}
                            color="text-blue-400"
                        />
                    </div>

                    {accounts.length === 0 ? (
                        <Card className="border-white/10 bg-white/5">
                            <CardContent className="p-8 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/20">
                                    <Wallet className="h-8 w-8 text-purple-400" />
                                </div>

                                <h2 className="text-2xl font-bold text-white">
                                    No Accounts Found
                                </h2>

                                <p className="mx-auto mt-2 max-w-xl text-gray-400">
                                    You do not have any trading accounts yet. Start a challenge or create an instant account to begin.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {accounts.map((account) => (
                                <Card
                                    key={account.id}
                                    className="border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-gray-950 transition hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10"
                                >
                                    <CardHeader>
                                        <div className="mb-4 flex items-start justify-between gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                                                <Wallet className="h-6 w-6 text-purple-400" />
                                            </div>

                                            {getStatusBadge(account.status)}
                                        </div>

                                        <CardTitle className="text-white">
                                            {account.account_name || `Account #${account.id}`}
                                        </CardTitle>

                                        <p className="text-sm text-gray-400">
                                            Noor Funding Trading Account
                                        </p>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                                            <p className="text-sm text-gray-400">Balance</p>
                                            <p className="mt-1 text-3xl font-bold text-white">
                                                ${Number(account.balance || 0).toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <InfoBox icon={Server} label="Platform" value="MT5" />
                                            <InfoBox icon={Shield} label="Leverage" value="1:100" />
                                        </div>

                                        <div className="space-y-3">
                                            <AccessRow
                                                icon={KeyRound}
                                                label="Login"
                                                value={`NF-${account.id}`}
                                            />
                                            <AccessRow
                                                icon={Activity}
                                                label="Server"
                                                value="NoorFunding-Live"
                                            />
                                        </div>

                                        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/30 px-4 py-3 text-sm font-medium text-white transition hover:bg-purple-500/20">
                                            View Details
                                            <ArrowUpRight className="h-4 w-4" />
                                        </button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

function SummaryCard({
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
        <Card className="border-white/10 bg-white/5 transition hover:border-purple-500/40 hover:bg-purple-500/10">
            <CardContent className="p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                    <Icon className={`h-6 w-6 ${color}`} />
                </div>

                <p className="text-sm text-gray-400">{title}</p>
                <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
            </CardContent>
        </Card>
    );
}

function InfoBox({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
            <div className="mb-1 flex items-center gap-2 text-gray-400">
                <Icon className="h-4 w-4 text-purple-400" />
                <span className="text-xs">{label}</span>
            </div>
            <p className="font-semibold text-white">{value}</p>
        </div>
    );
}

function AccessRow({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/40 p-3">
            <div className="flex items-center gap-2 text-gray-400">
                <Icon className="h-4 w-4 text-purple-400" />
                <span className="text-sm">{label}</span>
            </div>

            <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-white">{value}</span>
                <Copy className="h-3.5 w-3.5 text-gray-500" />
            </div>
        </div>
    );
}