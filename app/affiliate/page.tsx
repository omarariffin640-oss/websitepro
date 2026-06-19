"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { Users, Wallet, TrendingUp, Share2, Gift, ArrowUpRight, Copy, CheckCircle } from "lucide-react";

export default function AffiliatePage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        setUserEmail(email);
        setLoading(false);
    }, [router]);

    const referralLink = "https://websitepro-mu.vercel.app/ref/your-code";

    const copyLink = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center bg-darknavy"><p className="text-gray-400">Loading...</p></div>;
    }

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-2">
                <div className="p-4 max-w-7xl mx-auto">

                    <h1 className="text-2xl font-bold text-white mb-6">🤝 Affiliate Program</h1>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card className="bg-darkcard border-gray-800">
                            <CardContent className="pt-4">
                                <p className="text-gray-400 text-sm">Total Referrals</p>
                                <p className="text-2xl font-bold text-white">12</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-darkcard border-gray-800">
                            <CardContent className="pt-4">
                                <p className="text-gray-400 text-sm">Commission Earned</p>
                                <p className="text-2xl font-bold text-green-500">$1,250.75</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-darkcard border-gray-800">
                            <CardContent className="pt-4">
                                <p className="text-gray-400 text-sm">Pending Commission</p>
                                <p className="text-2xl font-bold text-yellow-500">$320.50</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Referral Link */}
                    <Card className="bg-darkcard border-gray-800 mb-6">
                        <CardHeader>
                            <CardTitle className="text-white">Your Referral Link</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex-1 p-3 rounded-lg bg-darknavy/50 border border-gray-700">
                                    <p className="text-gray-300 text-sm break-all">{referralLink}</p>
                                </div>
                                <Button onClick={copyLink} className="bg-blue-500 hover:bg-blue-600 shrink-0">
                                    {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                    {copied ? "Copied!" : "Copy Link"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Commission Table */}
                    <Card className="bg-darkcard border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white">Commission Structure</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-gray-700">
                                        <tr>
                                            <th className="pb-2 text-xs text-gray-400 font-medium">Referrals</th>
                                            <th className="pb-2 text-xs text-gray-400 font-medium">Commission Rate</th>
                                            <th className="pb-2 text-xs text-gray-400 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        <tr>
                                            <td className="py-2 text-white">1 - 5</td>
                                            <td className="py-2 text-gray-300">5%</td>
                                            <td className="py-2"><Badge className="bg-green-500/20 text-green-500">Active</Badge></td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 text-white">6 - 15</td>
                                            <td className="py-2 text-gray-300">10%</td>
                                            <td className="py-2"><Badge className="bg-green-500/20 text-green-500">Active</Badge></td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 text-white">16+</td>
                                            <td className="py-2 text-gray-300">15%</td>
                                            <td className="py-2"><Badge className="bg-yellow-500/20 text-yellow-500">Next Tier</Badge></td>
                                        </tr>
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