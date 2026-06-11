"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await fetch("https://websitepro-d5cu.onrender.com/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (data.success) {
                setMessage("Reset link sent to your email!");
            } else {
                setError(data.message || "Something went wrong");
            }
        } catch {
            setError("Server error. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow">
                <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
                <p className="text-center text-gray-600">
                    Enter your email and we'll send you a reset link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md"
                            placeholder="you@example.com"
                        />
                    </div>

                    {message && <p className="text-green-600 text-center">{message}</p>}
                    {error && <p className="text-red-600 text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Send Reset Link
                    </button>
                </form>

                <p className="text-center text-sm">
                    Remember your password?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}