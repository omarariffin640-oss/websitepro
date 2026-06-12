"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

type Payout = {
    id: number;
    amount: number;
    date: string;
    status: "pending" | "approved" | "paid";
};

export default function PayoutsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [payouts, setPayouts] = useState<Payout[]>([]);
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
        setPayouts([
            { id: 1, amount: 500, date: "2024-06-01", status: "pending" },
            { id: 2, amount: 1200, date: "2024-05-15", status: "approved" },
            { id: 3, amount: 800, date: "2024-05-01", status: "paid" },
        ]);
        setLoading(false);
    }, [router]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending": return "text-yellow-500 bg-yellow-500/10";
            case "approved": return "text-blue-500 bg-blue-500/10";
            case "paid": return "text-green-500 bg-green-500/10";
            default: return "text-gray-500 bg-gray-500/10";
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-darknavy">
                <p className="text-gray-400">Loading payouts...</p>
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
                        <h1 className="text-2xl font-bold text-white">Payouts</h1>
                        <Button className="bg-green-500 hover:bg-green-600">
                            Request Payout
                        </Button>
                    </div>

                    <Card className="bg-darkcard">
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {payouts.map((payout) => (
                                    <div key={payout.id} className="flex justify-between items-center p-4 rounded-lg bg-darknavy/50">
                                        <div>
                                            <p className="text-white font-medium">${payout.amount}</p>
                                            <p className="text-gray-400 text-sm">{payout.date}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(payout.status)}`}>
                                            {payout.status.toUpperCase()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}