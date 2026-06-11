"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// TAMBAH TYPE NI
type User = {
    id: number;
    email: string;
    name?: string;
    password?: string;
    created_at?: string;
};

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            router.push("/login");
            return;
        }

        fetch("https://websitepro-d5cu.onrender.com/users")
            .then(res => res.json())
            .then(users => {
                const currentUser = users.find((u: User) => u.email === userEmail);
                if (currentUser) {
                    setUser(currentUser);
                    setName(currentUser.name || "");
                    setEmail(currentUser.email);
                }
            })
            .catch(() => router.push("/login"));
    }, [router]);

    const handleUpdate = async () => {
        try {
            const res = await fetch("https://websitepro-d5cu.onrender.com/profile/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name }),
            });
            const data = await res.json();
            setMessage(data.success ? "Profile updated successfully!" : "Update failed");
        } catch {
            setMessage("Update failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        router.push("/login");
    };

    if (!user) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>
            <div className="space-y-4">
                <div>
                    <label className="block mb-1">Email</label>
                    <input type="email" value={email} disabled className="w-full p-2 border rounded bg-gray-100" />
                </div>
                <div>
                    <label className="block mb-1">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter your name" />
                </div>
                <button onClick={handleUpdate} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Update Profile</button>
                {message && <p className="text-center text-green-600">{message}</p>}
                <button onClick={handleLogout} className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-4">Logout</button>
            </div>
        </div>
    );
}