"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        // Fetch users from backend
        fetch("https://websitepro-api.onrender.com/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setTotalUsers(data.length);
            })
            .catch(err => console.log(err));
    }, []);

    const handleLogout = () => {
        router.push("/login");
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Welcome Dashboard 🚀</h1>

            <div className="bg-blue-100 p-4 rounded-lg mb-6">
                <h2 className="text-xl">Total Users: {totalUsers}</h2>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl mb-3">User List:</h2>
                <ul className="space-y-2">
                    {users.map((user, index) => (
                        <li key={index} className="bg-white p-2 rounded">
                            {user.email}
                        </li>
                    ))}
                </ul>
            </div>

            <button
                onClick={handleLogout}
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
            >
                Logout
            </button>
        </div>
    );
}