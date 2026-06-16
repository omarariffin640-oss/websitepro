"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import Papa from "papaparse";
import { Download, Eye, Edit, Shield, CheckCircle, XCircle } from "lucide-react";

type User = {
    id: number;
    email: string;
    name?: string;
    role: string;
    kyc_status: string;
    created_at: string;
};

export default function AdminUsersPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
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
                if (currentUser?.role !== "admin") {
                    router.push("/dashboard");
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
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

    const exportToCSV = () => {
        const csvData = filteredUsers.map(user => ({
            Email: user.email,
            Name: user.name || "-",
            Role: user.role,
            "KYC Status": user.kyc_status || "pending",
            "Joined Date": new Date(user.created_at).toLocaleDateString()
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

    const getKYCStatusBadge = (status: string) => {
        switch (status) {
            case "verified":
                return <Badge className="bg-green-500">Verified</Badge>;
            case "pending":
                return <Badge className="bg-yellow-500">Pending</Badge>;
            case "rejected":
                return <Badge className="bg-red-500">Rejected</Badge>;
            default:
                return <Badge className="bg-gray-500">Not Submitted</Badge>;
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-darknavy">
                <p className="text-gray-400">Loading...</p>
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
                        <h1 className="text-2xl font-bold text-white">User Management</h1>
                        <div className="flex gap-3">
                            <Button onClick={exportToCSV} className="bg-green-500 hover:bg-green-600">
                                <Download className="w-4 h-4 mr-2" />
                                Export CSV
                            </Button>
                            <div className="w-64">
                                <Input
                                    type="text"
                                    placeholder="Search users..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-darkcard border-gray-700 text-white"
                                />
                            </div>
                        </div>
                    </div>

                    <Card className="bg-darkcard">
                        <CardHeader>
                            <CardTitle className="text-white">All Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-gray-700">
                                        <tr>
                                            <th className="pb-3 text-gray-400 font-medium">User</th>
                                            <th className="pb-3 text-gray-400 font-medium">Role</th>
                                            <th className="pb-3 text-gray-400 font-medium">KYC Status</th>
                                            <th className="pb-3 text-gray-400 font-medium">Joined</th>
                                            <th className="pb-3 text-gray-400 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="border-b border-gray-800">
                                                <td className="py-3">
                                                    <div>
                                                        <p className="text-white font-medium">{user.name || user.email}</p>
                                                        <p className="text-sm text-gray-400">{user.email}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3">
                                                    <Badge className={user.role === "admin" ? "bg-purple-500" : "bg-blue-500"}>
                                                        {user.role || "trader"}
                                                    </Badge>
                                                </td>
                                                <td className="py-3">{getKYCStatusBadge(user.kyc_status || "pending")}</td>
                                                <td className="py-3 text-gray-300">{new Date(user.created_at).toLocaleDateString()}</td>
                                                <td className="py-3">
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-400">
                                                            <Shield className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
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