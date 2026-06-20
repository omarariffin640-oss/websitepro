"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

type InstantAccount = {
    id: number;
    account_id: string;
    balance: number;
    status: string;
    created_at: string;
};

export default function InstantAccountPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
            .then(res => res.json())
            .then(data => {
                if (data && data.id) {
                    setAccount(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [router]);

    const createAccount = async () => {
        setCreating(true);
        setMessage("");

        const email = localStorage.getItem("userEmail");
        const res = await fetch("https://websitepro-d5cu.onrender.com/create-instant-account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_email: email })
        });
        const data = await res.json();

        if (data.success) {
            setAccount({
                id: Date.now(),
                account_id: data.account_id,
                balance: data.balance,
                status: "active",
                created_at: new Date().toISOString()
            });
            setMessage("✅ Instant account created successfully!");
        } else {
            setMessage("❌ Failed to create account");
        }
        setCreating(false);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Topbar />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-2">
                <div className="p-3">
                    <h1 className="text-2xl font-bold text-white mb-3">Instant Account</h1>

                    {message && (
                        <div className={`mb-4 p-3 rounded-lg ${message.includes("✅") ? "bg-green-500/20 border border-green-500" : "bg-red-500/20 border border-red-500"}`}>
                            <p className={message.includes("✅") ? "text-green-500" : "text-red-500"}>{message}</p>
                        </div>
                    )}

                    {account ? (
                        <Card className="bg-[#1A1A1A] border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-white">Your Instant Account</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between p-3 rounded-lg bg-black/50 border border-gray-800">
                                    <span className="text-gray-400">Account ID:</span>
                                    <span className="text-white font-mono">{account.account_id}</span>
                                </div>
                                <div className="flex justify-between p-3 rounded-lg bg-black/50 border border-gray-800">
                                    <span className="text-gray-400">Balance:</span>
                                    <span className="text-green-500 font-bold text-xl">${account.balance.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between p-3 rounded-lg bg-black/50 border border-gray-800">
                                    <span className="text-gray-400">Status:</span>
                                    <span className="text-green-500 capitalize">{account.status}</span>
                                </div>
                                <div className="flex justify-between p-3 rounded-lg bg-black/50 border border-gray-800">
                                    <span className="text-gray-400">Created:</span>
                                    <span className="text-gray-300">{new Date(account.created_at).toLocaleDateString()}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="bg-[#1A1A1A] border-gray-800 text-center">
                            <CardContent className="p-8">
                                <p className="text-gray-400 mb-4">You don't have an instant account yet.</p>
                                <Button
                                    onClick={createAccount}
                                    disabled={creating}
                                    className="bg-purple-500 hover:bg-purple-600"
                                >
                                    {creating ? "Creating..." : "Get Instant Account"}
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}