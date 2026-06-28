"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";

import ProfileHero from "@/components/profile/ProfileHero";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileStats from "@/components/profile/ProfileStats";

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
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetchProfile(email);
    }, [router]);

    const fetchProfile = async (email: string) => {
        try {
            const res = await fetch(`${API_URL}/profile?email=${email}`);
            const data = await res.json();

            setProfile(data);
            setName(data.name || "");
        } catch {
            setMessage("Failed to load profile.");
        } finally {
            setLoading(false);
        }
    };

    const saveProfile = async () => {
        if (!profile) return;

        setSaving(true);

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

            setProfile({
                ...profile,
                name,
            });

            setMessage("Profile updated successfully.");
        } catch {
            setMessage("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    const uploadAvatar = async () => {
        if (!profile || !avatarFile) return;

        const formData = new FormData();
        formData.append("email", profile.email);
        formData.append("avatar", avatarFile);

        setSaving(true);

        try {
            const res = await fetch(`${API_URL}/profile/upload-avatar`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                await fetchProfile(profile.email);
                setMessage("Avatar uploaded successfully.");
            } else {
                setMessage(data.message);
            }
        } catch {
            setMessage("Upload failed.");
        } finally {
            setSaving(false);
        }
    };

    const deleteAvatar = async () => {
        if (!profile) return;

        setSaving(true);

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

            await fetchProfile(profile.email);

            setMessage("Avatar deleted.");
        } catch {
            setMessage("Delete failed.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-zinc-400">Loading profile...</p>
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
        <div className="min-h-screen bg-[#050509] text-white">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpen={() => setSidebarOpen(true)}
            />

            <main className="pt-8 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">

                    <ProfileHero
                        profile={profile}
                        saving={saving}
                        onSave={saveProfile}
                    />

                    {message && (
                        <div className="mb-6 rounded-xl border border-violet-500/30 bg-violet-500/10 p-4 text-violet-200">
                            {message}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <div className="xl:col-span-2">
                            <ProfileCard
                                profile={profile}
                                name={name}
                                setName={setName}
                                avatarFile={avatarFile}
                                setAvatarFile={setAvatarFile}
                                saving={saving}
                                onUpload={uploadAvatar}
                                onDelete={deleteAvatar}
                            />
                        </div>

                        <ProfileStats />
                    </div>

                </div>
            </main>
        </div>
    );
}