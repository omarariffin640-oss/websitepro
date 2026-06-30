"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, Tag, Plus } from "lucide-react";

const coupons = [
    { code: "PROP10", discount: "10%", expiry: "2026-12-31", status: "Active" },
    { code: "PROP20", discount: "20%", expiry: "2026-06-30", status: "Expired" },
];

export default function CouponsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading coupons...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpen={() => setSidebarOpen(true)}
            />

            <main className="pt-6 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                    <section className="mb-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                            <Tag className="h-4 w-4" />
                            Coupons Management
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold md:text-4xl">
                                    Coupon Codes
                                </h1>
                                <p className="mt-3 text-gray-400">
                                    Manage promo codes, discount rates, expiry dates and coupon status.
                                </p>
                            </div>

                            <Button className="bg-purple-600 hover:bg-purple-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Coupon
                            </Button>
                        </div>
                    </section>

                    <Card className="border-white/10 bg-white/5">
                        <CardContent className="p-6">
                            <h2 className="mb-5 text-lg font-semibold text-white">
                                Active Coupons
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-white/10">
                                        <tr>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Code</th>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Discount</th>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Expiry</th>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Status</th>
                                            <th className="pb-3 text-sm font-medium text-gray-400">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-white/10">
                                        {coupons.map((coupon) => (
                                            <tr key={coupon.code} className="hover:bg-white/[0.03]">
                                                <td className="py-4 font-semibold text-white">{coupon.code}</td>
                                                <td className="py-4 text-green-400">{coupon.discount}</td>
                                                <td className="py-4 text-gray-400">{coupon.expiry}</td>
                                                <td className="py-4">
                                                    <Badge
                                                        className={
                                                            coupon.status === "Active"
                                                                ? "border-green-500/30 bg-green-500/20 text-green-400"
                                                                : "border-yellow-500/30 bg-yellow-500/20 text-yellow-400"
                                                        }
                                                    >
                                                        {coupon.status}
                                                    </Badge>
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-400 hover:bg-purple-500/10">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>

                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-500/10">
                                                            <Trash2 className="h-4 w-4" />
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