"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import SettingsHero from "@/components/settings/SettingsHero";
import PreferenceSettings from "@/components/settings/PreferenceSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";

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
                <p className="text-zinc-400">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050509] text-white">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpen={() => setSidebarOpen(true)}
            />

            <main className="pt-8 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
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
                            <PreferenceSettings
                                settings={settings}
                                setSettings={setSettings}
                            />
                        </div>

                        <SecuritySettings
                            twoFactor={settings.twoFactor}
                            loginAlerts={settings.loginAlerts}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}