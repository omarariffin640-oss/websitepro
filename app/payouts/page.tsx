"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import DashboardTopbar from "@/components/layout/DashboardTopbar";
import PageSkeleton from "@/components/layout/PageSkeleton";
import EmptyState from "@/components/layout/EmptyState";

import PayoutHero from "@/components/payouts/PayoutHero";
import PayoutGrid from "@/components/payouts/PayoutGrid";
import { Payout } from "@/components/payouts/PayoutCard";

export default function PayoutsPage() {
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [payouts, setPayouts] = useState<Payout[]>([]);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetch(`https://websitepro-d5cu.onrender.com/payouts?email=${email}`)
            .then((res) => res.json())
            .then((data) => setPayouts(Array.isArray(data) ? data : []))
            .finally(() => setLoading(false));
    }, [router]);

    const totalPaid = payouts
        .filter((p) => p.status === "paid")
        .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    const pendingAmount = payouts
        .filter((p) => p.status === "pending")
        .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    const approvedAmount = payouts
        .filter((p) => p.status === "approved")
        .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    const requestPayout = async () => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        const amount = prompt("Enter payout amount:");
        if (!amount) return;

        const res = await fetch("https://websitepro-d5cu.onrender.com/request-payout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                amount: Number(amount),
                method: "bank",
                note: "User payout request",
            }),
        });

        const data = await res.json();

        if (data.success) {
            alert("Payout request submitted.");
            location.reload();
        } else {
            alert(data.message || "Failed to request payout.");
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

            <main className="pt-8 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                    <DashboardTopbar
                        title="Payouts"
                        description="Track payout requests, approvals and payment history."
                    />

                    <PayoutHero
                        totalPaid={totalPaid}
                        pendingAmount={pendingAmount}
                        approvedAmount={approvedAmount}
                        onRequestPayout={requestPayout}
                    />

                    {payouts.length === 0 ? (
                        <EmptyState
                            title="No payouts yet"
                            description="Your payout requests and payment history will appear here once available."
                        />
                    ) : (
                        <PayoutGrid payouts={payouts} />
                    )}
                </div>
            </main>
        </div>
    );
}