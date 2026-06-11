"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function ResetPasswordForm() {
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
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <p className="text-red-600 text-center">Invalid reset link. Please request a new one.</p>
                        <p className="text-center mt-4">
                            <Link href="/forgot-password" className="text-blue-600 hover:underline">
                                Request New Link
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
                    <CardDescription className="text-center">
                        Enter your new password below.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {message && <p className="text-green-600 text-center text-sm">{message}</p>}
                        {error && <p className="text-red-600 text-center text-sm">{error}</p>}

                        <Button type="submit" className="w-full">
                            Reset Password
                        </Button>
                    </form>

                    <p className="text-center text-sm">
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Back to Login
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}