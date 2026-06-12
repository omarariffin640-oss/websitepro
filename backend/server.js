const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// --- Gunakan Hardcode untuk Ujian ---
const supabaseUrl = "https://mxaanohwaafzshwksqrt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14YWFub2h3YWFmenNod2tzcXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NjA2NDksImV4cCI6MjA5NjMzNjY0OX0.gdZ1OIjsPXVQfBoT9Nipabzj6CU273ERxefvKSdbteI";

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Missing Supabase environment variables!");
    process.exit(1);
}

console.log("✅ Supabase URL:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// HOME ROUTE
app.get("/", (req, res) => {
    res.json({ message: "Backend Running 🚀 with Supabase" });
});

// GET ALL USERS (untuk dashboard)
app.get("/users", async (req, res) => {
    console.log("GET USERS HIT");

    const { data, error } = await supabase
        .from("users")
        .select("id, email, created_at");

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
});

// REGISTER
app.post("/register", async (req, res) => {
    console.log("REGISTER HIT:", req.body);

    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Missing data" });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
        .from("users")
        .select("email")
        .eq("email", email)
        .single();

    if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Insert new user
    const { data, error } = await supabase
        .from("users")
        .insert([{ email, password }])
        .select();

    if (error) {
        console.log("Supabase error:", error);
        return res.status(500).json({ success: false, message: "Database error" });
    }

    console.log("USER REGISTERED:", data);
    res.json({ success: true, message: "Register success" });
});

// LOGIN
app.post("/login", async (req, res) => {
    console.log("LOGIN HIT:", req.body);

    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    const { data: user, error } = await supabase
        .from("users")
        .select("id, email, password")
        .eq("email", email)
        .single();

    if (error || !user) {
        return res.status(400).json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
        return res.status(400).json({ success: false, message: "Wrong password" });
    }

    res.json({ success: true, message: "Login success" });
});

// UPDATE PROFILE
app.put("/profile/update", async (req, res) => {
    console.log("UPDATE PROFILE HIT:", req.body);

    const { email, name } = req.body;

    const { data, error } = await supabase
        .from("users")
        .update({ name: name || null })
        .eq("email", email);

    if (error) {
        return res.status(500).json({ success: false, message: error.message });
    }

    res.json({ success: true, message: "Profile updated" });
});

// FORGOT PASSWORD - Send reset email
app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    // Check if user exists
    const { data: user } = await supabase
        .from("users")
        .select("email")
        .eq("email", email)
        .single();

    if (!user) {
        return res.status(400).json({ success: false, message: "Email not found" });
    }

    // Generate reset token (simple for now)
    const resetToken = Math.random().toString(36).substring(2, 15);

    // Save token to database (add reset_token column)
    await supabase
        .from("users")
        .update({ reset_token: resetToken, reset_expires: new Date(Date.now() + 3600000) })
        .eq("email", email);

    // Send email via Resend
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset Your Password',
        html: `<p>Click <a href="https://websitepro-mu.vercel.app/reset-password?token=${resetToken}&email=${email}">here</a> to reset your password.</p>`
    });

    res.json({ success: true, message: "Reset email sent!" });
});

// RESET PASSWORD
app.post("/reset-password", async (req, res) => {
    const { email, token, newPassword } = req.body;

    const { data: user } = await supabase
        .from("users")
        .select("reset_token, reset_expires")
        .eq("email", email)
        .single();

    if (!user || user.reset_token !== token || new Date(user.reset_expires) < new Date()) {
        return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    await supabase
        .from("users")
        .update({ password: newPassword, reset_token: null, reset_expires: null })
        .eq("email", email);

    res.json({ success: true, message: "Password reset successful!" });
});

// UPDATE AVATAR
app.put("/profile/update-avatar", async (req, res) => {
    const { email, avatarUrl } = req.body;
    const { error } = await supabase.from("users").update({ avatar_url: avatarUrl }).eq("email", email);
    if (error) return res.status(500).json({ success: false, message: error.message });
    res.json({ success: true, message: "Avatar updated" });
});

// GET ACCOUNTS
app.get("/accounts", async (req, res) => {
    console.log("GET ACCOUNTS HIT");
    const userEmail = req.query.email;

    let query = supabase.from("accounts").select("*");
    if (userEmail) {
        query = query.eq("user_email", userEmail);
    }

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// START SERVER
const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
    console.log(`RUN http://localhost:${port}`);
});