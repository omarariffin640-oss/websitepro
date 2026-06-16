"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Wallet, TrendingUp, TrendingDown, Trophy, Calendar, Clock, Users } from "lucide-react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

type User = {
    id: number;
    email: string;
    name?: string;
    avatar_url?: string;
};

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
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
    const [totalProfit, setTotalProfit] = useState(0);
    const [winRate, setWinRate] = useState(0);

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
            // Fetch users
            const usersRes = await fetch("https://websitepro-d5cu.onrender.com/users");
            const usersData = await usersRes.json();
            setUsers(usersData);
            const currentUser = usersData.find((u: User) => u.email === email);
            if (currentUser) {
                setAvatarUrl(currentUser.avatar_url || "");
            }

            // Fetch trades
            const tradesRes = await fetch(`https://websitepro-d5cu.onrender.com/trades?email=${email}`);
            const tradesData = await tradesRes.json();
            setTrades(tradesData || []);

            // Calculate total profit
            const profit = tradesData.reduce((sum: number, t: Trade) => sum + t.profit, 0);
            setTotalProfit(profit);

            // Calculate win rate
            const wins = tradesData.filter((t: Trade) => t.profit > 0).length;
            setWinRate(tradesData.length > 0 ? (wins / tradesData.length) * 100 : 0);

            // Fetch active challenge
            const challengeRes = await fetch(`https://websitepro-d5cu.onrender.com/active-challenge?email=${email}`);
            const challengeData = await challengeRes.json();
            setActiveChallenge(challengeData);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-darknavy">
                <p className="text-gray-400">Loading dashboard...</p>
            </div>
        );
    }

    // Stats for cards
    const stats = [
        { title: "Total Users", value: users.length, icon: Users, color: "border-blue-500", textColor: "text-blue-500" },
        { title: "Total Accounts", value: 0, icon: Wallet, color: "border-orange-500", textColor: "text-orange-500" },
        { title: "Active Challenges", value: activeChallenge ? 1 : 0, icon: Trophy, color: "border-yellow-500", textColor: "text-yellow-500" },
        { title: "Pending Payouts", value: 0, icon: Wallet, color: "border-green-500", textColor: "text-green-500" },
    ];

    // Personal Stats
    const personalStats = [
        { title: "Total Profit", value: `$${totalProfit.toFixed(2)}`, icon: totalProfit >= 0 ? TrendingUp : TrendingDown, color: totalProfit >= 0 ? "text-green-500" : "text-red-500" },
        { title: "Win Rate", value: `${winRate.toFixed(1)}%`, icon: Trophy, color: "text-yellow-500" },
        { title: "Trades", value: trades.length, icon: Clock, color: "text-blue-500" },
    ];

    // Chart Data - User Growth
    const userGrowthData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Total Users',
                data: [10, 25, 45, 70, 100, users.length],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#3B82F6',
                pointBorderColor: '#fff',
                pointRadius: 4,
            }
        ]
    };

    // Chart Data - Weekly Profit
    const weeklyProfitData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Profit ($)',
                data: [500, 750, 600, 900, 1200, 800, 450],
                backgroundColor: '#10B981',
                borderRadius: 8,
                barPercentage: 0.7,
            }
        ]
    };

    // Chart Data - Your Performance
    const performanceData = {
        labels: trades.slice(-10).map((_, i) => `Trade ${i + 1}`),
        datasets: [
            {
                label: 'Profit/Loss',
                data: trades.slice(-10).map(t => t.profit),
                borderColor: '#8B5CF6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#8B5CF6',
                pointBorderColor: '#fff',
                pointRadius: 4,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: '#9CA3AF' }
            },
            tooltip: { mode: 'index' as const }
        },
        scales: {
            x: { ticks: { color: '#9CA3AF' }, grid: { color: '#374151' } },
            y: { ticks: { color: '#9CA3AF' }, grid: { color: '#374151' } }
        }
    };

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-16">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

                    {/* Active Challenge Status */}
                    {activeChallenge && (
                        <Card className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div>
                                        <p className="text-sm text-gray-400">Active Challenge</p>
                                        <p className="text-2xl font-bold text-white">Step {activeChallenge.step}</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div>
                                            <p className="text-sm text-gray-400">Target Profit</p>
                                            <p className="text-xl font-bold text-green-500">{activeChallenge.target_profit}%</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400">Current Profit</p>
                                            <p className={`text-xl font-bold ${(activeChallenge.current_profit || 0) >= 0 ? "text-green-500" : "text-red-500"}`}>
                                                {(activeChallenge.current_profit || 0).toFixed(2)}%
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400">Balance</p>
                                            <p className="text-xl font-bold text-white">${(activeChallenge.current_balance || 10000).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Platform Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Card className={`bg-darkcard border-l-4 ${stat.color}`}>
                                    <CardHeader className="pb-2">
                                        <CardTitle className={`text-sm font-medium ${stat.textColor}`}>
                                            {stat.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Personal Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        {personalStats.map((stat, index) => (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            >
                                <Card className="bg-darkcard border-gray-800">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-full bg-gray-800/50`}>
                                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm">{stat.title}</p>
                                                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        {/* User Growth Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Card className="bg-darkcard">
                                <CardHeader>
                                    <CardTitle className="text-white">User Growth</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div style={{ height: '300px' }}>
                                        <Line data={userGrowthData} options={chartOptions} />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Weekly Profit Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <Card className="bg-darkcard">
                                <CardHeader>
                                    <CardTitle className="text-white">Weekly Profit ($)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div style={{ height: '300px' }}>
                                        <Bar data={weeklyProfitData} options={chartOptions} />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Your Performance Chart */}
                    {trades.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Card className="mt-6 bg-darkcard">
                                <CardHeader>
                                    <CardTitle className="text-white">Your Performance (Last 10 Trades)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div style={{ height: '250px' }}>
                                        <Line data={performanceData} options={chartOptions} />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Recent Trades */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <Card className="mt-6 bg-darkcard">
                            <CardHeader>
                                <CardTitle className="text-white">Your Recent Trades</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {trades.length === 0 ? (
                                    <p className="text-gray-400 text-center">No trades yet. Start trading to see your performance.</p>
                                ) : (
                                    <div className="space-y-3">
                                        {trades.slice(0, 5).map((trade) => (
                                            <div key={trade.id} className="flex items-center justify-between p-3 rounded-lg bg-darknavy/50">
                                                <div>
                                                    <p className="font-medium text-white">{trade.symbol}</p>
                                                    <p className="text-xs text-gray-500">{new Date(trade.created_at).toLocaleString()}</p>
                                                </div>
                                                <div className={`font-bold ${trade.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                                                    {trade.profit >= 0 ? "+" : ""}{trade.profit}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}