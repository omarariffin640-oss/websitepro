"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function EmailTemplatesPage() {
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
            <main className="lg:ml-64 pt-16">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white mb-6">Email Templates</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-darkcard">
                            <CardHeader><CardTitle className="text-white">Welcome Email</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-gray-400 text-sm">Sent to new users upon registration.</p>
                                <Button variant="outline" className="mt-4 text-white border-gray-700">Edit Template</Button>
                            </CardContent>
                        </Card>
                        <Card className="bg-darkcard">
                            <CardHeader><CardTitle className="text-white">KYC Approved</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-gray-400 text-sm">Sent when KYC is approved.</p>
                                <Button variant="outline" className="mt-4 text-white border-gray-700">Edit Template</Button>
                            </CardContent>
                        </Card>
                        <Card className="bg-darkcard">
                            <CardHeader><CardTitle className="text-white">Payout Confirmation</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-gray-400 text-sm">Sent after payout is processed.</p>
                                <Button variant="outline" className="mt-4 text-white border-gray-700">Edit Template</Button>
                            </CardContent>
                        </Card>
                        <Card className="bg-darkcard">
                            <CardHeader><CardTitle className="text-white">Challenge Started</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-gray-400 text-sm">Sent when user starts a challenge.</p>
                                <Button variant="outline" className="mt-4 text-white border-gray-700">Edit Template</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}