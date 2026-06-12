"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

type Account = {
    id: number;
    name: string;
    balance: number;
    status: "active" | "pending" | "closed";
};

export default function AccountsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
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

        // Dummy data untuk testing
        setAccounts([
            { id: 1, name: "Standard Account", balance: 5000, status: "active" },
            { id: 2, name: "Premium Account", balance: 15000, status: "active" },
            { id: 3, name: "Challenge Account", balance: 10000, status: "pending" },
        ]);
        setLoading(false);
    }, [router]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active": return "text-green-500 bg-green-500/10";
            case "pending": return "text-yellow-500 bg-yellow-500/10";
            case "closed": return "text-red-500 bg-red-500/10";
            default: return "text-gray-500 bg-gray-500/10";
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-darknavy">
                <p className="text-gray-400">Loading accounts...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-16">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white mb-6">Accounts</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {accounts.map((account) => (
                            <Card key={account.id} className="bg-darkcard">
                                <CardHeader>
                                    <CardTitle className="text-white">{account.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold text-white">${account.balance.toLocaleString()}</p>
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${getStatusColor(account.status)}`}>
                                        {account.status.toUpperCase()}
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