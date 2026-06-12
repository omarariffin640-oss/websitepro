"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

type Challenge = {
    id: number;
    step: number;
    target_profit: number;
    max_daily_loss: number;
    max_total_loss: number;
    min_trading_days: number;
    status?: string;
};

type ActiveChallenge = {
    id: number;
    step: number;
    target_profit: number;
    max_daily_loss: number;
    max_total_loss: number;
    min_trading_days: number;
    status: string;
    started_at: string;
    current_profit?: number;
};

export default function ChallengesPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [activeChallenge, setActiveChallenge] = useState<ActiveChallenge | null>(null);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        setUserEmail(email);

        // Get challenge rules
        fetch("https://websitepro-d5cu.onrender.com/challenge-rules")
            .then(res => res.json())
            .then(data => {
                setChallenges(data);
            })
            .catch(() => setLoading(false));

        // Get active challenge
        fetch(`https://websitepro-d5cu.onrender.com/active-challenge?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.id) {
                    setActiveChallenge(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [router]);

    const startChallenge = async (step: number) => {
        setMessage("Starting challenge...");
        const res = await fetch("https://websitepro-d5cu.onrender.com/start-challenge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_email: userEmail, step })
        });
        const data = await res.json();
        if (data.success) {
            setMessage(`Challenge Step ${step} started successfully!`);
            // Refresh active challenge
            const refreshRes = await fetch(`https://websitepro-d5cu.onrender.com/active-challenge?email=${userEmail}`);
            const refreshData = await refreshRes.json();
            if (refreshData && refreshData.id) {
                setActiveChallenge(refreshData);
            }
            setTimeout(() => setMessage(""), 3000);
        } else {
            setMessage(data.error || "Failed to start challenge");
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-darknavy">
                <p className="text-gray-400">Loading challenges...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-16">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white mb-6">Challenges</h1>

                    {message && (
                        <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
                            <p className="text-green-500">{message}</p>
                        </div>
                    )}

                    {/* Active Challenge Section */}
                    {activeChallenge && (
                        <Card className="mb-6 bg-blue-500/10 border border-blue-500">
                            <CardHeader>
                                <CardTitle className="text-white">🔥 Active Challenge</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    <div>
                                        <p className="text-gray-400 text-sm">Step</p>
                                        <p className="text-white font-bold text-xl">{activeChallenge.step}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Target Profit</p>
                                        <p className="text-green-500 font-bold text-xl">{activeChallenge.target_profit}%</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Current Profit</p>
                                        <p className={`font-bold text-xl ${(activeChallenge.current_profit || 0) >= 0 ? "text-green-500" : "text-red-500"}`}>
                                            {(activeChallenge.current_profit || 0).toFixed(2)}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Status</p>
                                        <p className="text-yellow-500 font-bold text-xl capitalize">{activeChallenge.status}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Started</p>
                                        <p className="text-white text-sm">{new Date(activeChallenge.started_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {challenges.map((challenge) => (
                            <Card key={challenge.step} className="bg-darkcard">
                                <CardHeader>
                                    <CardTitle className="text-white">Step {challenge.step}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Target Profit:</span>
                                        <span className="text-green-500 font-bold">{challenge.target_profit}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Max Daily Loss:</span>
                                        <span className="text-red-500">{challenge.max_daily_loss}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Max Total Loss:</span>
                                        <span className="text-red-500">{challenge.max_total_loss}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Min Trading Days:</span>
                                        <span className="text-white">{challenge.min_trading_days}</span>
                                    </div>
                                    <Button
                                        onClick={() => startChallenge(challenge.step)}
                                        className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
                                        disabled={activeChallenge !== null}
                                    >
                                        {activeChallenge ? "Challenge in Progress" : `Start Step ${challenge.step}`}
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