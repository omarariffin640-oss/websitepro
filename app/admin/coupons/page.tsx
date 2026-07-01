"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Trash2, Tag, Plus } from "lucide-react";
import { API_BASE } from "@/lib/api";

type Coupon = {
    id?: number;
    code: string;
    discount: string;
    expiry?: string;
    status?: string;
};

export default function CouponsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [expiry, setExpiry] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }

        fetchCoupons();
    }, [router]);

    const fetchCoupons = async () => {
        try {
            const res = await fetch(`${API_BASE}/admin/coupons`);
            const data = await res.json();
            setCoupons(Array.isArray(data) ? data : []);
        } catch {
            setCoupons([]);
        } finally {
            setLoading(false);
        }
    };

    const createCoupon = async () => {
        if (!code || !discount) {
            alert("Please enter coupon code and discount.");
            return;
        }

        const res = await fetch(`${API_BASE}/admin/coupons`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code,
                discount,
                expiry,
                status: "active",
            }),
        });

        const data = await res.json();

        if (!data.success) {
            alert(data.message || "Failed to create coupon.");
            return;
        }

        setCode("");
        setDiscount("");
        setExpiry("");
        fetchCoupons();
    };

    const deleteCoupon = async (id?: number) => {
        if (!id) return;
        if (!confirm("Delete this coupon?")) return;

        const res = await fetch(`${API_BASE}/admin/coupons/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (!data.success) {
            alert(data.message || "Failed to delete coupon.");
            return;
        }

        fetchCoupons();
    };

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

                        <h1 className="text-3xl font-bold md:text-4xl">Coupon Codes</h1>
                        <p className="mt-3 text-gray-400">
                            Create, manage and delete discount coupons.
                        </p>
                    </section>

                    <Card className="mb-6 border-white/10 bg-white/5">
                        <CardContent className="grid gap-3 p-6 md:grid-cols-4">
                            <Input
                                value={code}
                                onChange={(e) => setCode(e.target.value.toUpperCase())}
                                placeholder="Code e.g. PROP10"
                                className="border-gray-800 bg-black"
                            />
                            <Input
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                placeholder="Discount e.g. 10%"
                                className="border-gray-800 bg-black"
                            />
                            <Input
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                placeholder="Expiry e.g. 2026-12-31"
                                className="border-gray-800 bg-black"
                            />
                            <Button onClick={createCoupon} className="bg-purple-600 hover:bg-purple-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Coupon
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-white/10 bg-white/5">
                        <CardContent className="p-6">
                            <h2 className="mb-5 text-lg font-semibold text-white">
                                All Coupons ({coupons.length})
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-white/10">
                                        <tr>
                                            <th className="pb-3 text-sm text-gray-400">Code</th>
                                            <th className="pb-3 text-sm text-gray-400">Discount</th>
                                            <th className="pb-3 text-sm text-gray-400">Expiry</th>
                                            <th className="pb-3 text-sm text-gray-400">Status</th>
                                            <th className="pb-3 text-sm text-gray-400">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-white/10">
                                        {coupons.map((coupon) => (
                                            <tr key={coupon.id || coupon.code}>
                                                <td className="py-4 font-semibold">
                                                    {coupon.code}
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Coupon ID: #{coupon.id}
                                                    </p>
                                                </td>
                                                <td className="py-4 text-green-400">{coupon.discount}</td>
                                                <td className="py-4 text-gray-400">{coupon.expiry || "-"}</td>
                                                <td className="py-4">
                                                    <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
                                                        {coupon.status || "active"}
                                                    </Badge>
                                                </td>
                                                <td className="py-4">
                                                    <Button
                                                        onClick={() => deleteCoupon(coupon.id)}
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-400 hover:bg-red-500/10"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {coupons.length === 0 && (
                                    <p className="py-6 text-center text-gray-400">
                                        No coupons found.
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}