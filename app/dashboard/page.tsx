"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// Register ChartJS components
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

export default function DashboardPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        setUserEmail(email);

        fetch("https://websitepro-d5cu.onrender.com/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                const currentUser = data.find((u: User) => u.email === email);
                if (currentUser) {
                    setAvatarUrl(currentUser.avatar_url || "");
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-darknavy">
                <p className="text-gray-400">Loading dashboard...</p>
            </div>
        );
    }

    const stats = [
        { title: "Total Users", value: users.length, color: "border-blue-500", textColor: "text-blue-500" },
        { title: "Total Accounts", value: 0, color: "border-orange-500", textColor: "text-orange-500" },
        { title: "Active Challenges", value: 0, color: "border-yellow-500", textColor: "text-yellow-500" },
        { title: "Pending Payouts", value: 0, color: "border-green-500", textColor: "text-green-500" },
    ];

    // Chart Data
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
            <Topbar
                onMenuClick={() => setSidebarOpen(true)}
                userEmail={userEmail}
                avatarUrl={avatarUrl}
            />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-16">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

                    {/* Stats Cards */}
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

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        {/* User Growth Line Chart */}
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

                        {/* Weekly Profit Bar Chart */}
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

                    {/* Recent Users */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Card className="mt-6 bg-darkcard">
                            <CardHeader>
                                <CardTitle className="text-white">Recent Users</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {users.slice(0, 5).map((user) => (
                                        <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg bg-darknavy/50">
                                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                                {user.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{user.name || user.email}</p>
                                                <p className="text-sm text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}