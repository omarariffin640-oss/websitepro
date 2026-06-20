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
        <div className="flex min-h-screen items-center justify-center bg-black">
            <Card className="w-full max-w-md bg-[#1A1A1A] border-gray-800">
                <CardHeader>
                    <CardTitle className="text-2xl text-center text-white">Login</CardTitle>
                    <CardDescription className="text-center text-gray-400">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-black border-gray-700 text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-300">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-black border-gray-700 text-white"
                        />
                    </div>

                    {message && (
                        <p className={`text-center text-sm ${message.includes("✅") ? "text-green-500" : "text-red-500"}`}>
                            {message}
                        </p>
                    )}

                    <Button onClick={handleLogin} className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                        Login
                    </Button>

                    <p className="text-center text-sm">
                        <Link href="/forgot-password" className="text-purple-400 hover:text-purple-300">
                            Forgot Password?
                        </Link>
                    </p>

                    <p className="text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-purple-400 hover:text-purple-300">
                            Register
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}