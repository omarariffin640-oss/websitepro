"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
        <div style={{ padding: "2rem" }}>
            <h1>Login</h1>
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: "block", margin: "10px 0", padding: "8px", width: "200px" }}
            />
            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: "block", margin: "10px 0", padding: "8px", width: "200px" }}
            />
            <button onClick={handleLogin} style={{ padding: "8px 16px", cursor: "pointer" }}>
                Login
            </button>
            <p>{message}</p>
        </div>
    );
}