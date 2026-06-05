"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const router = useRouter();

    const handleRegister = async () => {
        console.log("CLICK REGISTER");

        try {
            const res = await fetch("https://websitepro-api.onrender.com/register", {
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
        <div>
            <h1>Register</h1>

            <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleRegister}>
                Register
            </button>

            <p>{message}</p>
        </div>
    );
}