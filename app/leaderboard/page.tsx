"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Sidebar";
import { Trophy, Medal, Star } from "lucide-react";

type LeaderboardUser = {
    id: number;
    email: string;
    name?: string;
    total_profit: number;
    trades_count: number;
    win_rate: number;
    avatar_url?: string;
};

export default function LeaderboardPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [leaders, setLeaders] = useState<LeaderboardUser[]>([]);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        fetchLeaderboard();
    }, [router]);

    const fetchLeaderboard = async () => {
        try {
            const usersRes = await fetch("https://websitepro-d5cu.onrender.com/users");
            const usersData = await usersRes.json();

            const challengeRes = await fetch("https://websitepro-d5cu.onrender.com/challenge-rules");
            const challengeData = await challengeRes.json();

            const mockLeaders: LeaderboardUser[] = [
                { id: 1, email: "ali@test.com", name: "Ali Noor", total_profit: 8500, trades_count: 45, win_rate: 72, avatar_url: "" },
                { id: 2, email: "sarah@test.com", name: "Sarah Tan", total_profit: 6200, trades_count: 38, win_rate: 68, avatar_url: "" },
                { id: 3, email: "john@test.com", name: "John Lim", total_profit: 4800, trades_count: 52, win_rate: 65, avatar_url: "" },
                { id: 4, email: "test@gmail.com", name: "Test User", total_profit: 2500, trades_count: 20, win_rate: 60, avatar_url: "" },
                { id: 5, email: "user@test.com", name: "Demo Trader", total_profit: 1200, trades_count: 15, win_rate: 55, avatar_url: "" },
            ];

            mockLeaders.sort((a, b) => b.total_profit - a.total_profit);
            setLeaders(mockLeaders);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const getRankIcon = (index: number) => {
        switch (index) {
            case 0: return <Trophy className="h-6 w-6 text-yellow-500" />;
            case 1: return <Medal className="h-6 w-6 text-gray-400" />;
            case 2: return <Medal className="h-6 w-6 text-amber-700" />;
            default: return <span className="text-gray-500 font-bold w-6 text-center">{index + 1}</span>;
        }
    };

    const getRankBadge = (index: number) => {
        if (index === 0) return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">🏆 Top 1</Badge>;
        if (index === 1) return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">🥈 Top 2</Badge>;
        if (index === 2) return <Badge className="bg-amber-700/20 text-amber-500 border-amber-700/30">🥉 Top 3</Badge>;
        return null;
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading leaderboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />
            <main className="lg:ml-64 pt-2">
                <div className="p-4 max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <Trophy className="h-8 w-8 text-yellow-500" />
                        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 ml-2">Top Traders</Badge>
                    </div>

                    <Card className="bg-[#1A1A1A] border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white">🏅 Top Traders by Profit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {leaders.length === 0 ? (
                                <p className="text-gray-400 text-center">No traders yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {leaders.map((user, index) => (
                                        <div
                                            key={user.id}
                                            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200
                                                ${index < 3 ? "bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20" : "bg-black/50"}
                                                hover:bg-gray-800/50
                                            `}
                                        >
                                            <div className="w-10 text-center">
                                                {getRankIcon(index)}
                                            </div>

                                            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold shrink-0">
                                                {user.name?.charAt(0) || user.email.charAt(0)}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-white">{user.name || user.email}</p>
                                                    {getRankBadge(index)}
                                                </div>
                                                <p className="text-sm text-gray-400">{user.email}</p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-green-500 font-bold text-lg">${user.total_profit.toLocaleString()}</p>
                                                <div className="flex items-center gap-3 justify-end">
                                                    <span className="text-xs text-gray-400">{user.trades_count} trades</span>
                                                    <span className={`text-xs ${user.win_rate >= 60 ? "text-green-500" : "text-yellow-500"}`}>
                                                        {user.win_rate}% win
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-[#1A1A1A] border-gray-800">
                            <CardContent className="pt-4 text-center">
                                <p className="text-2xl font-bold text-white">{leaders.length}</p>
                                <p className="text-gray-400 text-sm">Total Traders</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#1A1A1A] border-gray-800">
                            <CardContent className="pt-4 text-center">
                                <p className="text-2xl font-bold text-green-500">
                                    ${leaders.reduce((sum, u) => sum + u.total_profit, 0).toLocaleString()}
                                </p>
                                <p className="text-gray-400 text-sm">Total Profit</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#1A1A1A] border-gray-800">
                            <CardContent className="pt-4 text-center">
                                <p className="text-2xl font-bold text-yellow-500">
                                    {leaders.length > 0 ? Math.round(leaders.reduce((sum, u) => sum + u.win_rate, 0) / leaders.length) : 0}%
                                </p>
                                <p className="text-gray-400 text-sm">Avg Win Rate</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}