"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function PaymentGatewayPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
        setLoading(false);
    }, [router]);

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
            <main className="lg:ml-64 pt-2">
                <div className="p-3">
                    <h1 className="text-2xl font-bold text-white mb-3">Payment Gateway Settings</h1>
                    <Card className="bg-darkcard">
                        <CardHeader>
                            <CardTitle className="text-white">Gateway Configuration</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-gray-300">Gateway Provider</Label>
                                    <Input value="Stripe" disabled className="bg-darknavy border-gray-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-300">API Key</Label>
                                    <Input type="password" value="sk_test_xxxxx" disabled className="bg-darknavy border-gray-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-300">Webhook Secret</Label>
                                    <Input type="password" value="whsec_xxxxx" disabled className="bg-darknavy border-gray-700 text-white" />
                                </div>
                                <Button className="bg-blue-500 hover:bg-blue-600">Save Settings</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}