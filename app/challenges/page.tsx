"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

type Challenge = {
    id: number;
    name: string;
    profit: number;
    status: "active" | "completed" | "failed";
};

export default function ChallengesPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [challenges, setChallenges] = useState<Challenge[]>([]);
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

        // Dummy data
        setChallenges([
            { id: 1, name: "Beginner Challenge", profit: 2500, status: "active" },
            { id: 2, name: "Advanced Challenge", profit: 5000, status: "active" },
            { id: 3, name: "Pro Challenge", profit: 10000, status: "completed" },
        ]);
        setLoading(false);
    }, [router]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active": return "text-green-500 bg-green-500/10";
            case "completed": return "text-blue-500 bg-blue-500/10";
            case "failed": return "text-red-500 bg-red-500/10";
            default: return "text-gray-500 bg-gray-500/10";
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
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-white">Challenges</h1>
                        <Button className="bg-orange-500 hover:bg-orange-600">
                            Start New Challenge
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {challenges.map((challenge) => (
                            <Card key={challenge.id} className="bg-darkcard">
                                <CardHeader>
                                    <CardTitle className="text-white">{challenge.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-green-500 text-2xl font-bold">+${challenge.profit}</p>
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${getStatusColor(challenge.status)}`}>
                                        {challenge.status.toUpperCase()}
                                    </span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}