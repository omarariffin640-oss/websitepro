"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        setMessage("Logging in...");

        try {
            const res = await fetch("https://websitepro-d5cu.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password
                }),
            });

            const data = await res.json();

            if (res.ok && data.message === "Login success") {
                localStorage.setItem("userEmail", email.trim());
                setMessage("✅ Login success!");
                router.push("/dashboard");
            } else {
                setMessage(`❌ ${data.message || "Login failed"}`);
            }

        } catch (err) {
            setMessage("❌ Server error");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Login</CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {message && (
                        <p className={`text-center text-sm ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
                            {message}
                        </p>
                    )}

                    <Button onClick={handleLogin} className="w-full">
                        Login
                    </Button>

                    <p className="text-center text-sm">
                        <Link href="/forgot-password" className="text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}