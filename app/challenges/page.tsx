"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Trophy,
    Target,
    ShieldAlert,
    CalendarDays,
    Timer,
    CheckCircle,
    Zap,
} from "lucide-react";

type Challenge = {
    id: number;
    step: number;
    target_profit: number;
    max_daily_loss: number;
    max_total_loss: number;
    min_trading_days: number;
    status?: string;
};

type ActiveChallenge = Challenge & {
    status: string;
    started_at: string;
};

export default function ChallengesPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [activeChallenge, setActiveChallenge] = useState<ActiveChallenge | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        Promise.all([
            fetch("https://websitepro-d5cu.onrender.com/challenge-rules").then((res) => res.json()),
            fetch(`https://websitepro-d5cu.onrender.com/active-challenge?email=${email}`).then((res) => res.json()),
        ])
            .then(([rules, active]) => {
                setChallenges(Array.isArray(rules) ? rules : []);
                if (active && active.id) setActiveChallenge(active);
            })
            .catch(() => {
                setMessage("Failed to load challenge data.");
            })
            .finally(() => setLoading(false));
    }, [router]);

    const startChallenge = async (step: number) => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            setMessage("Please login first.");
            return;
        }

        setMessage("Starting challenge...");

        try {
            const res = await fetch("https://websitepro-d5cu.onrender.com/start-challenge", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_email: email, step }),
            });

            const data = await res.json();

            if (data.success) {
                setMessage(`Challenge Step ${step} started successfully!`);

                const refreshRes = await fetch(
                    `https://websitepro-d5cu.onrender.com/active-challenge?email=${email}`
                );
                const refreshData = await refreshRes.json();

                if (refreshData && refreshData.id) {
                    setActiveChallenge(refreshData);
                }

                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage(data.error || "Failed to start challenge.");
            }
        } catch {
            setMessage("Server error. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading challenges...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050509] text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />

            <main className="pt-8 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                    <section className="relative mb-8 overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
                        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                                    <Trophy className="h-4 w-4" />
                                    Noor Funding Challenges
                                </div>

                                <h1 className="text-3xl font-bold md:text-4xl">
                                    Choose Your Funding Challenge
                                </h1>

                                <p className="mt-3 max-w-2xl text-gray-400">
                                    Start your evaluation, track your active challenge, and review all trading rules in one place.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm">
                                <p className="text-gray-400">Account Status</p>
                                <p className="mt-1 flex items-center gap-2 font-semibold text-green-400">
                                    <CheckCircle className="h-4 w-4" />
                                    {activeChallenge ? "Challenge Active" : "Ready To Start"}
                                </p>
                            </div>
                        </div>
                    </section>

                    {message && (
                        <div className="mb-6 rounded-xl border border-purple-500/30 bg-purple-500/10 p-4 text-purple-200">
                            {message}
                        </div>
                    )}

                    {activeChallenge && (
                        <Card className="mb-8 border-purple-500/30 bg-purple-500/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Zap className="h-5 w-5 text-purple-400" />
                                    Active Challenge
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    <div className="rounded-xl bg-black/40 p-4">
                                        <p className="text-sm text-gray-400">Step</p>
                                        <p className="mt-1 text-2xl font-bold text-white">
                                            {activeChallenge.step}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-black/40 p-4">
                                        <p className="text-sm text-gray-400">Target Profit</p>
                                        <p className="mt-1 text-2xl font-bold text-green-400">
                                            {activeChallenge.target_profit}%
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-black/40 p-4">
                                        <p className="text-sm text-gray-400">Status</p>
                                        <p className="mt-1 text-2xl font-bold capitalize text-yellow-400">
                                            {activeChallenge.status}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-black/40 p-4">
                                        <p className="text-sm text-gray-400">Started</p>
                                        <p className="mt-1 text-sm font-medium text-white">
                                            {new Date(activeChallenge.started_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white">Available Challenges</h2>
                        <p className="mt-2 text-gray-400">
                            Select a step below to begin your evaluation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {challenges.map((challenge) => (
                            <Card
                                key={challenge.step}
                                className="border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-gray-950 transition hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10"
                            >
                                <CardHeader>
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-300">
                                            Step {challenge.step}
                                        </div>
                                        <Trophy className="h-5 w-5 text-purple-400" />
                                    </div>

                                    <CardTitle className="text-2xl text-white">
                                        Challenge Step {challenge.step}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="space-y-3 text-sm">
                                        <RuleRow
                                            icon={Target}
                                            label="Target Profit"
                                            value={`${challenge.target_profit}%`}
                                            valueClass="text-green-400"
                                        />
                                        <RuleRow
                                            icon={ShieldAlert}
                                            label="Max Daily Loss"
                                            value={`${challenge.max_daily_loss}%`}
                                            valueClass="text-red-400"
                                        />
                                        <RuleRow
                                            icon={ShieldAlert}
                                            label="Max Total Loss"
                                            value={`${challenge.max_total_loss}%`}
                                            valueClass="text-red-400"
                                        />
                                        <RuleRow
                                            icon={CalendarDays}
                                            label="Min Trading Days"
                                            value={`${challenge.min_trading_days} days`}
                                            valueClass="text-white"
                                        />
                                        <RuleRow
                                            icon={Timer}
                                            label="Trading Period"
                                            value="Unlimited"
                                            valueClass="text-white"
                                        />
                                    </div>

                                    <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-purple-300">
                                            Includes
                                        </p>
                                        <div className="space-y-1.5 text-xs text-gray-300">
                                            <div>✓ Clear Rules</div>
                                            <div>✓ Fast Review</div>
                                            <div>✓ Up To 90% Profit Split</div>
                                            <div>✓ Dashboard Tracking</div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => startChallenge(challenge.step)}
                                        disabled={activeChallenge !== null}
                                        className="w-full rounded-xl bg-purple-500 text-white hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
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

function RuleRow({
    icon: Icon,
    label,
    value,
    valueClass,
}: {
    icon: any;
    label: string;
    value: string;
    valueClass: string;
}) {
    return (
        <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
            <div className="flex items-center gap-2 text-gray-400">
                <Icon className="h-4 w-4 text-purple-400" />
                <span>{label}</span>
            </div>
            <span className={`font-semibold ${valueClass}`}>{value}</span>
        </div>
    );
}