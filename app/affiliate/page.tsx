"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardShell from "@/components/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, CheckCircle } from "lucide-react";

export default function AffiliatePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        setLoading(false);
    }, [router]);

    const referralLink = "https://websitepro-mu.vercel.app/ref/your-code";

    const copyLink = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <DashboardShell>
                <div className="flex min-h-[300px] items-center justify-center">
                    <p className="text-gray-400">Loading...</p>
                </div>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <h1 className="mb-6 text-2xl font-bold text-white">🤝 Affiliate Program</h1>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <StatCard title="Total Referrals" value="12" color="text-white" />
                <StatCard title="Commission Earned" value="$1,250.75" color="text-green-500" />
                <StatCard title="Pending Commission" value="$320.50" color="text-yellow-500" />
            </div>

            <Card className="mb-6 border-gray-800 bg-darkcard">
                <CardHeader>
                    <CardTitle className="text-white">Your Referral Link</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col gap-3 md:flex-row">
                        <div className="flex-1 rounded-lg border border-gray-700 bg-darknavy/50 p-3">
                            <p className="break-all text-sm text-gray-300">{referralLink}</p>
                        </div>

                        <Button onClick={copyLink} className="shrink-0 bg-purple-500 hover:bg-purple-600">
                            {copied ? <CheckCircle className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                            {copied ? "Copied!" : "Copy Link"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-gray-800 bg-darkcard">
                <CardHeader>
                    <CardTitle className="text-white">Commission Structure</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-gray-700">
                                <tr>
                                    <th className="pb-2 text-xs font-medium text-gray-400">Referrals</th>
                                    <th className="pb-2 text-xs font-medium text-gray-400">Commission Rate</th>
                                    <th className="pb-2 text-xs font-medium text-gray-400">Status</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-800">
                                <Tier referrals="1 - 5" rate="5%" status="Active" color="green" />
                                <Tier referrals="6 - 15" rate="10%" status="Active" color="green" />
                                <Tier referrals="16+" rate="15%" status="Next Tier" color="yellow" />
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </DashboardShell>
    );
}

function StatCard({ title, value, color }: any) {
    return (
        <Card className="border-gray-800 bg-darkcard">
            <CardContent className="pt-4">
                <p className="text-sm text-gray-400">{title}</p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </CardContent>
        </Card>
    );
}

function Tier({ referrals, rate, status, color }: any) {
    return (
        <tr>
            <td className="py-2 text-white">{referrals}</td>
            <td className="py-2 text-gray-300">{rate}</td>
            <td className="py-2">
                <Badge className={color === "green" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"}>
                    {status}
                </Badge>
            </td>
        </tr>
    );
}