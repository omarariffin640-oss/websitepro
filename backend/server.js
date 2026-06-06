const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

// 🔑 Ganti dengan URL dan anon key awak
const supabaseUrl = "https://mxaanohwaafzshwksqrt.supabase.co";
const supabaseAnonKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14YWFub2h3YWFmenNod2tzcXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMjU5MDAsImV4cCI6MjA2NDkwMTkwMH0.ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890
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

// START SERVER
const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
    console.log(`RUN http://localhost:${port}`);
});