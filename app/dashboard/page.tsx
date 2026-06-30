"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardShell from "@/components/DashboardShell";
import DashboardTopbar from "@/components/layout/DashboardTopbar";
import OfferPopup from "@/components/OfferPopup";
import EvaluationPreview from "@/components/home/EvaluationPreview";
import PageSkeleton from "@/components/layout/PageSkeleton";
import EmptyState from "@/components/layout/EmptyState";
import { API_BASE } from "@/lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

import {
    Wallet,
    TrendingUp,
    TrendingDown,
    Trophy,
    Clock,
    Activity,
    Target,
    Shield,
    Calendar,
    CheckCircle,
} from "lucide-react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend,
    Filler
);

type Trade = {
    id: number;
    symbol: string;
    profit: number;
    created_at: string;
};

type Challenge = {
    id: number;
    step: number;
    target_profit: number;
    current_profit: number;
    current_balance: number;
    status: string;
    started_at: string;
};

export default function DashboardPage() {
    const router = useRouter();

    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
    const [totalProfit, setTotalProfit] = useState(0);
    const [winRate, setWinRate] = useState(0);
    const [accounts, setAccounts] = useState<any[]>([]);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        setUserEmail(email);
        fetchData(email);
    }, [router]);

    const fetchData = async (email: string) => {
        try {
            const tradesRes = await fetch(`${API_BASE}/trades?email=${email}`);
            const tradesData = await tradesRes.json();
            const safeTrades = Array.isArray(tradesData) ? tradesData : [];

            setTrades(safeTrades);

            const accountsRes = await fetch(`${API_BASE}/accounts?email=${email}`);
            const accountsData = await accountsRes.json();
            const safeAccounts = Array.isArray(accountsData) ? accountsData : [];

            setAccounts(safeAccounts);

            const profit = safeTrades.reduce(
                (sum: number, trade: Trade) => sum + Number(trade.profit || 0),
                0
            );
            setTotalProfit(profit);

            const wins = safeTrades.filter(
                (trade: Trade) => Number(trade.profit) > 0
            ).length;

            setWinRate(safeTrades.length > 0 ? (wins / safeTrades.length) * 100 : 0);

            const challengeRes = await fetch(
                `${API_BASE}/active-challenge?email=${email}`
            );
            const challengeData = await challengeRes.json();

            if (challengeData && challengeData.id) {
                setActiveChallenge(challengeData);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const currentBalance = Number(
        accounts[0]?.balance || activeChallenge?.current_balance || 10000
    );
    const currentProfit = activeChallenge?.current_profit || 0;
    const targetProfit = activeChallenge?.target_profit || 10;
    const remainingTarget = Math.max(targetProfit - currentProfit, 0);
    const progressPercent = Math.min((currentProfit / targetProfit) * 100, 100);

    const performanceData = {
        labels:
            trades.length > 0
                ? trades.slice(-10).map((_, i) => `Trade ${i + 1}`)
                : ["T1", "T2", "T3", "T4", "T5", "T6"],
        datasets: [
            {
                label: "Profit / Loss",
                data:
                    trades.length > 0
                        ? trades.slice(-10).map((trade) => trade.profit)
                        : [250, -120, 380, 640, -90, 820],
                borderColor: "#A855F7",
                backgroundColor: "rgba(168, 85, 247, 0.12)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "#A855F7",
                pointBorderColor: "#ffffff",
                pointRadius: 4,
            },
        ],
    };

    const weeklyProfitData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Weekly Profit",
                data: [500, 750, 600, 900, 1200, 800, 450],
                backgroundColor: "#A855F7",
                borderRadius: 8,
                barPercentage: 0.7,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: "#9CA3AF" },
            },
            tooltip: { mode: "index" as const },
        },
        scales: {
            x: {
                ticks: { color: "#9CA3AF" },
                grid: { color: "rgba(55, 65, 81, 0.35)" },
            },
            y: {
                ticks: { color: "#9CA3AF" },
                grid: { color: "rgba(55, 65, 81, 0.35)" },
            },
        },
    };

    const overviewStats = [
        {
            title: "Current Balance",
            value: `$${currentBalance.toLocaleString()}`,
            icon: Wallet,
            color: "text-purple-400",
        },
        {
            title: "Total Profit",
            value: `$${totalProfit.toFixed(2)}`,
            icon: totalProfit >= 0 ? TrendingUp : TrendingDown,
            color: totalProfit >= 0 ? "text-green-400" : "text-red-400",
        },
        {
            title: "Win Rate",
            value: `${winRate.toFixed(1)}%`,
            icon: Trophy,
            color: "text-yellow-400",
        },
        {
            title: "Total Trades",
            value: trades.length,
            icon: Activity,
            color: "text-blue-400",
        },
    ];

    if (loading) {
        return (
            <DashboardShell>
                <PageSkeleton />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <DashboardTopbar
                title="Dashboard"
                description="Track your active challenge, account performance and trading history."
                userName={userEmail ? userEmail.split("@")[0] : "Trader"}
            />

            <OfferPopup />

            <EvaluationPreview />

            {(activeChallenge || accounts.length > 0) && (
                <Card className="mb-8 border-purple-500/30 bg-purple-500/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <Trophy className="h-5 w-5 text-purple-400" />
                            Active Challenge Progress
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <InfoBox label="Step" value={`Step ${activeChallenge?.step || 2}`} />
                            <InfoBox label="Target Profit" value={`${targetProfit}%`} green />
                            <InfoBox
                                label="Current Profit"
                                value={`${currentProfit.toFixed(2)}%`}
                                green={currentProfit >= 0}
                                red={currentProfit < 0}
                            />
                            <InfoBox label="Remaining" value={`${remainingTarget.toFixed(2)}%`} />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between text-sm">
                                <span className="text-gray-400">Progress To Target</span>
                                <span className="font-semibold text-purple-300">
                                    {progressPercent.toFixed(1)}%
                                </span>
                            </div>

                            <div className="h-3 overflow-hidden rounded-full bg-black/50">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                {overviewStats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                    >
                        <Card className="h-full border-white/10 bg-white/5 transition hover:border-purple-500/40 hover:bg-purple-500/10">
                            <CardContent className="p-5">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <p className="text-sm text-gray-400">{stat.title}</p>
                                <p className={`mt-1 text-2xl font-bold ${stat.color}`}>
                                    {stat.value}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Card className="border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-gray-950">
                    <CardHeader>
                        <CardTitle className="text-white">Performance Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <Line data={performanceData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-white/10 bg-zinc-950/70">
                    <CardHeader>
                        <CardTitle className="text-white">Weekly Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <Bar data={weeklyProfitData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
                <Card className="border-white/10 bg-white/5 xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Trades</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {trades.length === 0 ? (
                            <EmptyState
                                title="No trades yet"
                                description="Start trading to see your recent trades and performance here."
                            />
                        ) : (
                            <div className="space-y-3">
                                {trades.slice(0, 6).map((trade) => (
                                    <div
                                        key={trade.id}
                                        className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 p-3"
                                    >
                                        <div>
                                            <p className="font-medium text-white">{trade.symbol}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(trade.created_at).toLocaleString()}
                                            </p>
                                        </div>

                                        <div
                                            className={`font-bold ${trade.profit >= 0 ? "text-green-400" : "text-red-400"
                                                }`}
                                        >
                                            {trade.profit >= 0 ? "+" : ""}$
                                            {Number(trade.profit).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/5">
                    <CardHeader>
                        <CardTitle className="text-white">Account Overview</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-sm">
                        <OverviewRow
                            icon={Shield}
                            label="Account Status"
                            value={activeChallenge ? "Active" : "No Active Challenge"}
                        />
                        <OverviewRow icon={Target} label="Target Profit" value={`${targetProfit}%`} />
                        <OverviewRow
                            icon={Calendar}
                            label="Started"
                            value={
                                activeChallenge
                                    ? new Date(activeChallenge.started_at).toLocaleDateString()
                                    : "-"
                            }
                        />
                        <OverviewRow icon={Clock} label="Trading Period" value="Unlimited" />
                        <OverviewRow icon={CheckCircle} label="Payout Review" value="24h" />
                    </CardContent>
                </Card>
            </div>
        </DashboardShell>
    );
}

function InfoBox({
    label,
    value,
    green,
    red,
}: {
    label: string;
    value: string;
    green?: boolean;
    red?: boolean;
}) {
    return (
        <div className="rounded-xl bg-black/40 p-4">
            <p className="text-sm text-gray-400">{label}</p>
            <p
                className={`mt-1 text-xl font-bold ${green ? "text-green-400" : red ? "text-red-400" : "text-white"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}

function OverviewRow({
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
                <span>{label}</span>
            </div>
            <span className="font-medium text-white">{value}</span>
        </div>
    );
}