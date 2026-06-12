"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

type Account = {
    id: number;
    account_name: string;
    balance: number;
    status: string;
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

        // Fetch REAL data dari backend
        fetch(`https://websitepro-d5cu.onrender.com/accounts?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setAccounts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
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

                    {accounts.length === 0 ? (
                        <Card className="bg-darkcard">
                            <CardContent className="p-6">
                                <p className="text-gray-400 text-center">No accounts found. Create an account to get started.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {accounts.map((account) => (
                                <Card key={account.id} className="bg-darkcard">
                                    <CardHeader>
                                        <CardTitle className="text-white">{account.account_name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-bold text-white">${account.balance?.toLocaleString() || 0}</p>
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${getStatusColor(account.status)}`}>
                                            {account.status?.toUpperCase() || "ACTIVE"}
                                        </span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}