"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Settings,
    Bell,
    Mail,
    Shield,
    Lock,
    User,
    CheckCircle,
    Save,
} from "lucide-react";

export default function SettingsPage() {
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    const [settings, setSettings] = useState({
        notifications: true,
        emailAlerts: true,
        twoFactor: false,
        loginAlerts: true,
    });

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        setLoading(false);
    }, [router]);

    const saveSettings = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="pt-6 lg:ml-64">
                <div className="mx-auto max-w-7xl px-4 pb-12">
                    <section className="relative mb-8 overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
                        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                                    <Settings className="h-4 w-4" />
                                    Account Settings
                                </div>

                                <h1 className="text-3xl font-bold md:text-4xl">
                                    Preferences & Security
                                </h1>

                                <p className="mt-3 max-w-2xl text-gray-400">
                                    Manage your notifications, email alerts, and account security preferences.
                                </p>
                            </div>

                            <Button
                                onClick={saveSettings}
                                className="rounded-xl bg-purple-500 px-6 py-6 text-white hover:bg-purple-600"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Save Settings
                            </Button>
                        </div>
                    </section>

                    {saved && (
                        <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-300">
                            Settings saved successfully.
                        </div>
                    )}

                    <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                        <SummaryCard
                            icon={Bell}
                            title="Notifications"
                            value={settings.notifications ? "Enabled" : "Disabled"}
                            color="text-purple-400"
                        />
                        <SummaryCard
                            icon={Mail}
                            title="Email Alerts"
                            value={settings.emailAlerts ? "Enabled" : "Disabled"}
                            color="text-blue-400"
                        />
                        <SummaryCard
                            icon={Shield}
                            title="Security"
                            value={settings.twoFactor ? "2FA On" : "Basic"}
                            color={settings.twoFactor ? "text-green-400" : "text-yellow-400"}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <Card className="xl:col-span-2 border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-gray-950">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <User className="h-5 w-5 text-purple-400" />
                                    Preferences
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <SettingToggle
                                    icon={Bell}
                                    title="Notifications"
                                    description="Receive notifications about your account, challenges, payouts, and trading activity."
                                    checked={settings.notifications}
                                    onChange={(checked) =>
                                        setSettings({ ...settings, notifications: checked })
                                    }
                                />

                                <SettingToggle
                                    icon={Mail}
                                    title="Email Alerts"
                                    description="Get email alerts for important updates and account actions."
                                    checked={settings.emailAlerts}
                                    onChange={(checked) =>
                                        setSettings({ ...settings, emailAlerts: checked })
                                    }
                                />

                                <SettingToggle
                                    icon={Lock}
                                    title="Login Alerts"
                                    description="Notify me when a new login is detected on my account."
                                    checked={settings.loginAlerts}
                                    onChange={(checked) =>
                                        setSettings({ ...settings, loginAlerts: checked })
                                    }
                                />

                                <SettingToggle
                                    icon={Shield}
                                    title="Two-Factor Authentication"
                                    description="Add an extra security layer to protect your Noor Funding account."
                                    checked={settings.twoFactor}
                                    onChange={(checked) =>
                                        setSettings({ ...settings, twoFactor: checked })
                                    }
                                />
                            </CardContent>
                        </Card>

                        <Card className="border-white/10 bg-white/5">
                            <CardHeader>
                                <CardTitle className="text-white">Security Status</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3 text-sm">
                                <SecurityItem active text="Email verified" />
                                <SecurityItem active={settings.loginAlerts} text="Login alerts" />
                                <SecurityItem active={settings.twoFactor} text="Two-factor authentication" />
                                <SecurityItem active text="Password protected" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}

function SummaryCard({
    icon: Icon,
    title,
    value,
    color,
}: {
    icon: any;
    title: string;
    value: string;
    color: string;
}) {
    return (
        <Card className="border-white/10 bg-white/5 transition hover:border-purple-500/40 hover:bg-purple-500/10">
            <CardContent className="p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                    <Icon className={`h-6 w-6 ${color}`} />
                </div>

                <p className="text-sm text-gray-400">{title}</p>
                <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
            </CardContent>
        </Card>
    );
}

function SettingToggle({
    icon: Icon,
    title,
    description,
    checked,
    onChange,
}: {
    icon: any;
    title: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/20">
                    <Icon className="h-5 w-5 text-purple-400" />
                </div>

                <div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm text-gray-400">{description}</p>
                </div>
            </div>

            <button
                onClick={() => onChange(!checked)}
                className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-purple-500" : "bg-gray-700"
                    }`}
            >
                <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? "left-6" : "left-1"
                        }`}
                />
            </button>
        </div>
    );
}

function SecurityItem({
    active,
    text,
}: {
    active: boolean;
    text: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-3">
            <CheckCircle className={`h-4 w-4 ${active ? "text-green-400" : "text-gray-500"}`} />
            <span className={active ? "text-gray-300" : "text-gray-500"}>{text}</span>
        </div>
    );
}