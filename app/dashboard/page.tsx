"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    const handleLogout = () => {
        // Optional: Clear any user data/session
        router.push("/login");
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold">
                Welcome Dashboard 🚀
            </h1>

            <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
}