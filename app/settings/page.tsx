"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function SettingsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        notifications: true,
        emailAlerts: true,
        twoFactor: false,
    });

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
                <p className="text-gray-400">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-2">
                <div className="p-3">
                    <h1 className="text-2xl font-bold text-white mb-3">Settings</h1>

                    <Card className="bg-darkcard max-w-2xl">
                        <CardHeader>
                            <CardTitle className="text-white">Preferences</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-darknavy/50">
                                <div>
                                    <p className="text-white font-medium">Notifications</p>
                                    <p className="text-gray-400 text-sm">Receive notifications about your account</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.notifications}
                                    onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                                    className="w-5 h-5 text-blue-500"
                                />
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-darknavy/50">
                                <div>
                                    <p className="text-white font-medium">Email Alerts</p>
                                    <p className="text-gray-400 text-sm">Get email alerts for important updates</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.emailAlerts}
                                    onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                                    className="w-5 h-5 text-blue-500"
                                />
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-darknavy/50">
                                <div>
                                    <p className="text-white font-medium">Two-Factor Authentication</p>
                                    <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.twoFactor}
                                    onChange={(e) => setSettings({ ...settings, twoFactor: e.target.checked })}
                                    className="w-5 h-5 text-blue-500"
                                />
                            </div>

                            <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
                                Save Settings
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}