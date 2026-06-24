"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    User,
    Mail,
    Shield,
    Calendar,
    Trophy,
    Wallet,
    CheckCircle,
    Settings,
    ImagePlus,
    Trash2,
    Save,
} from "lucide-react";

type Profile = {
    id: number;
    name: string | null;
    email: string;
    avatar_url: string | null;
    role: string;
};

const API_URL = "https://websitepro-d5cu.onrender.com";

export default function ProfilePage() {
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [profile, setProfile] = useState<Profile | null>(null);
    const [name, setName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
            router.push("/login");
            return;
        }

        fetchProfile(userEmail);
    }, [router]);

    const fetchProfile = async (email: string) => {
        try {
            const res = await fetch(`${API_URL}/profile?email=${email}`);
            const data = await res.json();

            setProfile(data);
            setName(data.name || "");
            setAvatarUrl(data.avatar_url || "");
        } catch {
            setMessage("Failed to load profile.");
        } finally {
            setLoading(false);
        }
    };

    const saveProfile = async () => {
        if (!profile?.email) return;

        setSaving(true);
        setMessage("");

        try {
            await fetch(`${API_URL}/profile/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: profile.email,
                    name,
                }),
            });

            await fetch(`${API_URL}/profile/update-avatar`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: profile.email,
                    avatarUrl,
                }),
            });

            setProfile({
                ...profile,
                name,
                avatar_url: avatarUrl,
            });

            setMessage("Profile updated successfully.");
        } catch {
            setMessage("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    const deleteAvatar = async () => {
        if (!profile?.email) return;

        setSaving(true);
        setMessage("");

        try {
            await fetch(`${API_URL}/profile/avatar`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: profile.email,
                }),
            });

            setAvatarUrl("");
            setProfile({
                ...profile,
                avatar_url: null,
            });

            setMessage("Avatar deleted successfully.");
        } catch {
            setMessage("Failed to delete avatar.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading profile...</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-red-400">Profile not found.</p>
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

                        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-5">
                                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-purple-500/30 bg-purple-500/20">
                                    {profile.avatar_url ? (
                                        <img
                                            src={profile.avatar_url}
                                            alt="Profile avatar"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <User className="h-10 w-10 text-purple-400" />
                                    )}
                                </div>

                                <div>
                                    <h1 className="text-3xl font-bold">
                                        {profile.name || "Noor Funding Trader"}
                                    </h1>
                                    <p className="mt-2 text-gray-400">
                                        Manage your Noor Funding account information.
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={saveProfile}
                                disabled={saving}
                                className="bg-purple-500 hover:bg-purple-600"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {saving ? "Saving..." : "Save Profile"}
                            </Button>
                        </div>
                    </section>

                    {message && (
                        <div className="mb-6 rounded-xl border border-purple-500/30 bg-purple-500/10 p-4 text-purple-200">
                            {message}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <Card className="xl:col-span-2 border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-gray-950">
                            <CardHeader>
                                <CardTitle className="text-white">Edit Profile</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                                    <label className="mb-2 block text-sm text-gray-400">
                                        Full Name
                                    </label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full rounded-xl border border-gray-800 bg-black/50 px-4 py-3 text-white outline-none focus:border-purple-500"
                                    />
                                </div>

                                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                                    <label className="mb-2 block text-sm text-gray-400">
                                        Avatar URL
                                    </label>

                                    <div className="flex flex-col gap-3 md:flex-row">
                                        <input
                                            value={avatarUrl}
                                            onChange={(e) => setAvatarUrl(e.target.value)}
                                            placeholder="Paste avatar image URL"
                                            className="w-full rounded-xl border border-gray-800 bg-black/50 px-4 py-3 text-white outline-none focus:border-purple-500"
                                        />

                                        <Button
                                            onClick={saveProfile}
                                            disabled={saving}
                                            className="rounded-xl bg-purple-500 text-white hover:bg-purple-600"
                                        >
                                            <ImagePlus className="mr-2 h-4 w-4" />
                                            Update
                                        </Button>
                                    </div>

                                    <Button
                                        onClick={deleteAvatar}
                                        disabled={saving || !profile.avatar_url}
                                        variant="outline"
                                        className="mt-3 rounded-xl border-red-500/30 text-red-400 hover:bg-red-500/10"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete Avatar
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <InfoBox icon={Mail} label="Email Address" value={profile.email} />
                                    <InfoBox icon={Shield} label="Role" value={profile.role || "trader"} green />
                                    <InfoBox icon={Trophy} label="Challenge Status" value="Active" />
                                    <InfoBox icon={Wallet} label="Account Type" value="Funded Trader" />
                                    <InfoBox icon={Calendar} label="Member Since" value="2026" />
                                    <InfoBox icon={Settings} label="Profile ID" value={`#${profile.id}`} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-white/10 bg-white/5">
                            <CardHeader>
                                <CardTitle>Account Statistics</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <StatBox title="Challenges Completed" value="3" />
                                <StatBox title="Funded Accounts" value="1" />
                                <StatBox title="Total Payouts" value="$2,500" />
                                <StatBox title="Win Rate" value="67%" />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
                        <Card className="border-white/10 bg-white/5">
                            <CardHeader>
                                <CardTitle>Security</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <SecurityItem text="Email Verified" />
                                <SecurityItem text="Secure Login Enabled" />
                                <SecurityItem text="Password Protected" />
                            </CardContent>
                        </Card>

                        <Card className="border-white/10 bg-white/5">
                            <CardHeader>
                                <CardTitle>Account Benefits</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <Benefit text="Up To 90% Profit Split" />
                                <Benefit text="Fast Payout Review" />
                                <Benefit text="No Consistency Rule" />
                                <Benefit text="Dedicated Support" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}

function InfoBox({
    icon: Icon,
    label,
    value,
    green,
}: {
    icon: any;
    label: string;
    value: string;
    green?: boolean;
}) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <div className="mb-2 flex items-center gap-2">
                <Icon className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-gray-400">{label}</span>
            </div>

            <p className={`font-semibold ${green ? "text-green-400" : "text-white"}`}>
                {value}
            </p>
        </div>
    );
}

function StatBox({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <p className="text-sm text-gray-400">{title}</p>
            <p className="mt-1 text-2xl font-bold text-purple-400">{value}</p>
        </div>
    );
}

function SecurityItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-3">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span>{text}</span>
        </div>
    );
}

function Benefit({ text }: { text: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
            ✓ {text}
        </div>
    );
}