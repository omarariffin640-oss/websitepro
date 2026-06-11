"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
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
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Forgot Password</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and we'll send you a reset link.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {message && <p className="text-green-600 text-center text-sm">{message}</p>}
                        {error && <p className="text-red-600 text-center text-sm">{error}</p>}

                        <Button type="submit" className="w-full">
                            Send Reset Link
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