"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardShell from "@/components/DashboardShell";
import DashboardTopbar from "@/components/layout/DashboardTopbar";

import SettingsHero from "@/components/settings/SettingsHero";
import PreferenceSettings from "@/components/settings/PreferenceSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";

export default function SettingsPage() {
    const router = useRouter();

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
            <DashboardShell>
                <div className="flex min-h-[300px] items-center justify-center">
                    <p className="text-zinc-400">Loading settings...</p>
                </div>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <DashboardTopbar
                title="Settings"
                description="Manage your preferences, notifications and account security."
            />

            <SettingsHero
                notifications={settings.notifications}
                emailAlerts={settings.emailAlerts}
                twoFactor={settings.twoFactor}
                onSave={saveSettings}
            />

            {saved && (
                <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300">
                    Settings saved successfully.
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <PreferenceSettings settings={settings} setSettings={setSettings} />
                </div>

                <SecuritySettings
                    twoFactor={settings.twoFactor}
                    loginAlerts={settings.loginAlerts}
                />
            </div>
        </DashboardShell>
    );
}