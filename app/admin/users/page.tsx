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
import { Download, Eye, Edit, UserCog, Search } from "lucide-react";

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
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        setUserEmail(email);

        fetch("https://websitepro-d5cu.onrender.com/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setFilteredUsers(data);
                const currentUser = data.find((u: User) => u.email === email);
                if (currentUser) {
                    setAvatarUrl(currentUser.avatar_url || "");
                }
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
            ID: user.id,
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
            <div className="flex min-h-screen items-center justify-center bg-darknavy">
                <p className="text-gray-400">Loading users...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-16">
                <div className="p-4 md:p-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Users</h1>
                            <p className="text-sm text-gray-400">Manage all registered users</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    type="text"
                                    placeholder="Search users..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9 bg-darkcard border-gray-700 text-white w-full"
                                />
                            </div>
                            <Button onClick={exportToCSV} className="bg-green-500 hover:bg-green-600 shrink-0">
                                <Download className="w-4 h-4 mr-2" />
                                Export CSV
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <Card className="bg-darkcard border-gray-800">
                        <CardContent className="p-0 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-gray-800 bg-darknavy/50">
                                    <tr>
                                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Account Type</th>
                                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Balance</th>
                                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-gray-400">No users found</td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user) => {
                                            const account = getUserAccount(user.id);
                                            const balance = account?.balance || 0;

                                            return (
                                                <tr key={user.id} className="hover:bg-gray-800/30 transition-colors">
                                                    <td className="px-4 py-3 text-sm text-gray-400 font-mono">#{String(user.id).padStart(4, '0')}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                                {user.email.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-medium text-sm">{user.name || user.email}</p>
                                                                <p className="text-xs text-gray-400">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Badge variant="outline" className="text-blue-400 border-blue-400/50 text-xs">
                                                            {account?.account_name || "Standard"}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3 text-white text-sm">${balance.toLocaleString()}</td>
                                                    <td className="px-4 py-3">{getStatusBadge(account?.status || "active")}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:text-green-300 hover:bg-green-500/10">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
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
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                        <p>Showing {filteredUsers.length} of {users.length} users</p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:text-white">Previous</Button>
                            <Button variant="outline" size="sm" className="border-gray-700 bg-blue-500/20 text-blue-400">1</Button>
                            <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:text-white">2</Button>
                            <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:text-white">3</Button>
                            <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:text-white">Next</Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}