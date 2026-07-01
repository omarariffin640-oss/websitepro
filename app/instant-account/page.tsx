"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardShell from "@/components/DashboardShell";
import DashboardTopbar from "@/components/layout/DashboardTopbar";

import InstantHero from "@/components/instant/InstantHero";
import InstantAccountCard from "@/components/instant/InstantAccountCard";
import InstantBenefits from "@/components/instant/InstantBenefits";
import HomePricing from "@/components/home/HomePricing";

type InstantAccount = {
    id: number;
    account_id: string;
    balance: number;
    status: string;
    created_at: string;
};

export default function InstantAccountPage() {
    const router = useRouter();

    const [account, setAccount] = useState<InstantAccount | null>(null);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetch(`https://websitepro-d5cu.onrender.com/instant-account?email=${email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data && data.id) {
                    setAccount(data);
                }
            })
            .catch(() => setMessage("Failed to load instant account."))
            .finally(() => setLoading(false));
    }, [router]);

    const createAccount = async () => {
        setCreating(true);
        setMessage("");

        const email = localStorage.getItem("userEmail");

        try {
            const res = await fetch(
                "https://websitepro-d5cu.onrender.com/create-instant-account",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_email: email,
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                setAccount({
                    id: Date.now(),
                    account_id: data.account_id,
                    balance: data.balance,
                    status: "active",
                    created_at: new Date().toISOString(),
                });

                setMessage("Instant account created successfully!");
            } else {
                setMessage(data.error || "Failed to create account.");
            }
        } catch {
            setMessage("Server error. Please try again.");
        } finally {
            setCreating(false);
        }
    };

    if (loading) {
        return (
            <DashboardShell>
                <div className="flex min-h-[300px] items-center justify-center">
                    <p className="text-zinc-400">Loading instant account...</p>
                </div>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <DashboardTopbar
                title="Instant Funding"
                description="Choose Instant or Noor Funding account."
            />

            <InstantHero hasAccount={account !== null} />

            <HomePricing
                programs={["Instant", "Noor Funding"]}
            />

            {message && (
                <div
                    className={`mb-6 rounded-xl border p-4 ${message.toLowerCase().includes("success")
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                            : "border-red-500/30 bg-red-500/10 text-red-300"
                        }`}
                >
                    {message}
                </div>
            )}

            <div className="space-y-8">
                <InstantAccountCard
                    account={account}
                    creating={creating}
                    onCreate={createAccount}
                />

                <InstantBenefits />
            </div>
        </DashboardShell>
    );
}