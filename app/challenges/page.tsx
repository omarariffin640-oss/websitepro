"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import DashboardTopbar from "@/components/layout/DashboardTopbar";
import PageSkeleton from "@/components/layout/PageSkeleton";

import ChallengeHero from "@/components/challenges/ChallengeHero";
import ActiveChallengeCard from "@/components/challenges/ActiveChallengeCard";
import ChallengeCard, { ChallengeData } from "@/components/challenges/ChallengeCard";

type ActiveChallenge = ChallengeData & {
    status: string;
    started_at: string;
};

export default function ChallengesPage() {
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [challenges, setChallenges] = useState<ChallengeData[]>([]);
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
            .catch(() => setMessage("Failed to load challenge data."))
            .finally(() => setLoading(false));
    }, [router]);

    const startChallenge = async (step: number) => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
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

                if (refreshData && refreshData.id) setActiveChallenge(refreshData);

                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage(data.error || "Failed to start challenge.");
            }
        } catch {
            setMessage("Server error. Please try again.");
        }
    };

    if (loading) {
        return <PageSkeleton />;
    }

    return (
        <div className="min-h-screen bg-[#050509] text-white">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpen={() => setSidebarOpen(true)}
            />

            <main className="pt-[150px] lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                    <DashboardTopbar
                        title="Challenges"
                        description="Choose your evaluation account and track your active challenge."
                    />

                    <ChallengeHero hasActiveChallenge={activeChallenge !== null} />

                    {message && (
                        <div
                            className={`mb-6 rounded-xl border p-4 ${message.toLowerCase().includes("success")
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                                : "border-violet-500/30 bg-violet-500/10 text-violet-200"
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <ActiveChallengeCard challenge={activeChallenge} />

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white">Available Challenges</h2>
                        <p className="mt-2 text-zinc-400">
                            Select a challenge step below to begin your evaluation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {challenges.map((challenge) => (
                            <ChallengeCard
                                key={challenge.step}
                                challenge={challenge}
                                disabled={activeChallenge !== null}
                                onStart={startChallenge}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}