"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define type for user
type User = {
    email: string;
    password?: string;
};

export default function Dashboard() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch users from backend
        fetch("https://websitepro-d5cu.onrender.com/users")
            .then(res => res.json())
            .then((data: User[]) => {
                setUsers(data);
                setTotalUsers(data.length);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        router.push("/login");
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Welcome Dashboard 🚀</h1>

            <div className="bg-blue-100 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold">Total Users: {totalUsers}</h2>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">User List:</h2>
                {users.length === 0 ? (
                    <p>No users registered yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {users.map((user, index) => (
                            <li key={index} className="bg-white p-2 rounded shadow">
                                {user.email}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button
                onClick={handleLogout}
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
}