"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }

        setPayouts([
            { id: 1, amount: 500, date: "2024-06-01", status: "pending" },
            { id: 2, amount: 1200, date: "2024-05-15", status: "approved" },
            { id: 3, amount: 800, date: "2024-05-01", status: "paid" },
        ]);
        setLoading(false);
    }, [router]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>;
            case "approved":
                return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Approved</Badge>;
            case "paid":
                return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Paid</Badge>;
            default:
                return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Unknown</Badge>;
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading payouts...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Topbar onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-3">
                <div className="p-3">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-white">Payouts</h1>
                        <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                            Request Payout
                        </Button>
                    </div>

                    <Card className="bg-[#1A1A1A] border-gray-800">
                        <CardContent className="p-4">
                            <div className="space-y-3">
                                {payouts.map((payout) => (
                                    <div key={payout.id} className="flex justify-between items-center p-3 rounded-lg bg-black/50 border border-gray-800">
                                        <div>
                                            <p className="text-white font-medium">${payout.amount}</p>
                                            <p className="text-gray-400 text-sm">{payout.date}</p>
                                        </div>
                                        {getStatusBadge(payout.status)}
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