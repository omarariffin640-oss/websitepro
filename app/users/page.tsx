"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import Papa from "papaparse";
import { Download, Eye, Edit, UserCog } from "lucide-react";

type User = {
    id: number;
    email: string;
    name?: string;
    avatar_url?: string;
    created_at?: string;
    role?: string;
};

type Account = {
    id: number;
    user_id: number;
    account_name: string;
    balance: number;
    status: string;
    created_at: string;
};

export default function UsersPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }

        fetch("https://websitepro-d5cu.onrender.com/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setFilteredUsers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));

        fetch("https://websitepro-d5cu.onrender.com/accounts")
            .then(res => res.json())
            .then(data => setAccounts(data))
            .catch(() => console.log("No accounts data"));
    }, [router]);

    useEffect(() => {
        if (search === "") {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(
                users.filter(user =>
                    user.email.toLowerCase().includes(search.toLowerCase()) ||
                    (user.name && user.name.toLowerCase().includes(search.toLowerCase()))
                )
            );
        }
    }, [search, users]);

    const getUserAccount = (userId: number) => {
        return accounts.find(acc => acc.user_id === userId);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Active</Badge>;
            case "banned":
                return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Banned</Badge>;
            case "pending":
                return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>;
            default:
                return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Inactive</Badge>;
        }
    };

    const exportToCSV = () => {
        const csvData = filteredUsers.map(user => ({
            Email: user.email,
            Name: user.name || "-",
            Role: user.role || "trader",
            "Joined Date": user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"
        }));
        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `users_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading users...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Topbar />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-2">
                <div className="p-3">
                    {/* Header - Search & Export */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3">
                        <h1 className="text-2xl font-bold text-white">Users</h1>
                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                            <div className="relative w-full sm:w-64">
                                <Input
                                    type="text"
                                    placeholder="Search users..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-[#1A1A1A] border-gray-700 text-white w-full pl-3"
                                />
                            </div>
                            <Button onClick={exportToCSV} className="bg-purple-500 hover:bg-purple-600 shrink-0">
                                <Download className="w-4 h-4 mr-2" />
                                Export CSV
                            </Button>
                        </div>
                    </div>

                    <Card className="bg-[#1A1A1A] border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white">User List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-gray-700">
                                        <tr>
                                            <th className="pb-3 text-gray-400 font-medium">User</th>
                                            <th className="pb-3 text-gray-400 font-medium">Account Type</th>
                                            <th className="pb-3 text-gray-400 font-medium">Balance</th>
                                            <th className="pb-3 text-gray-400 font-medium">Profit</th>
                                            <th className="pb-3 text-gray-400 font-medium">Status</th>
                                            <th className="pb-3 text-gray-400 font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="py-4 text-center text-gray-400">No users found</td>
                                            </tr>
                                        ) : (
                                            filteredUsers.map((user) => {
                                                const account = getUserAccount(user.id);
                                                const balance = account?.balance || 0;
                                                const profit = 0;

                                                return (
                                                    <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                                                        <td className="py-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                                                    {user.email.charAt(0).toUpperCase()}
                                                                </div>
                                                                <div>
                                                                    <p className="text-white font-medium">{user.name || user.email}</p>
                                                                    <p className="text-xs text-gray-400">{user.email}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-3">
                                                            <Badge variant="outline" className="text-purple-400 border-purple-400">
                                                                {account?.account_name || "Standard"}
                                                            </Badge>
                                                        </td>
                                                        <td className="py-3 text-white">${balance.toLocaleString()}</td>
                                                        <td className={`py-3 ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                                                            {profit >= 0 ? "+" : ""}{profit}
                                                        </td>
                                                        <td className="py-3">{getStatusBadge(account?.status || "active")}</td>
                                                        <td className="py-3">
                                                            <div className="flex gap-1">
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:text-blue-300">
                                                                    <Eye className="h-4 w-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:text-green-300">
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-400 hover:text-purple-300">
                                                                    <UserCog className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}