"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        console.log("CLICK REGISTER");

        try {
            const res = await fetch("https://websitepro-d5cu.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            console.log("RESPONSE STATUS:", res.status);

            const data = await res.json();

            console.log("DATA:", data);

            if (!res.ok) {
                setMessage(data.message);
                return;
            }

            setMessage("Register success");

            setTimeout(() => {
                router.push("/login");
            }, 1000);

        } catch (err) {
            console.log(err);
            setMessage("Server error");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black">
            <Card className="w-full max-w-md bg-[#1A1A1A] border-gray-800">
                <CardHeader>
                    <CardTitle className="text-2xl text-center text-white">Register</CardTitle>
                    <CardDescription className="text-center text-gray-400">
                        Create your account to get started
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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-black border-gray-700 text-white"
                        />
                    </div>

                    {message && (
                        <p className={`text-center text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
                            {message}
                        </p>
                    )}

                    <Button onClick={handleRegister} className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                        Register
                    </Button>

                    <p className="text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-purple-400 hover:text-purple-300">
                            Login
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}