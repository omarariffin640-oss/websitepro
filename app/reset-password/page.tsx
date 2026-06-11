"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setToken(searchParams.get("token") || "");
        setEmail(searchParams.get("email") || "");
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            const res = await fetch("https://websitepro-d5cu.onrender.com/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, token, newPassword: password })
            });
            const data = await res.json();

            if (data.success) {
                setMessage("Password reset successful!");
                setTimeout(() => router.push("/login"), 2000);
            } else {
                setError(data.message || "Invalid or expired link");
            }
        } catch {
            setError("Server error. Please try again.");
        }
    };

    if (!token || !email) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-red-600">Invalid reset link. Please request a new one.</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow">
                <h1 className="text-2xl font-bold text-center">Reset Password</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md"
                            placeholder="Confirm new password"
                        />
                    </div>

                    {message && <p className="text-green-600 text-center">{message}</p>}
                    {error && <p className="text-red-600 text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Reset Password
                    </button>
                </form>

                <p className="text-center text-sm">
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}