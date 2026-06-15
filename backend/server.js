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

// GET challenge rules
app.get("/challenge-rules", async (req, res) => {
    const { data, error } = await supabase.from("challenge_rules").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Start challenge
app.post("/start-challenge", async (req, res) => {
    const { user_email, step } = req.body;

    const { data: rules } = await supabase
        .from("challenge_rules")
        .select("*")
        .eq("step", step)
        .single();

    if (!rules) {
        return res.status(400).json({ success: false, message: "Invalid step" });
    }

    // Create challenge account
    const { data, error } = await supabase
        .from("challenges")
        .insert([{
            user_email,
            step,
            target_profit: rules.target_profit,
            max_daily_loss: rules.max_daily_loss,
            max_total_loss: rules.max_total_loss,
            status: "active"
        }]);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true, message: "Challenge started!" });
});

// Create Instant Account
app.post("/create-instant-account", async (req, res) => {
    const { user_email } = req.body;

    // Generate random account ID
    const account_id = "ACC" + Math.random().toString(36).substring(2, 10).toUpperCase();

    const { data, error } = await supabase
        .from("instant_accounts")
        .insert([{ user_email, account_id, balance: 10000 }]);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true, account_id, balance: 10000 });
});

// Get Instant Account
app.get("/instant-account", async (req, res) => {
    const { email } = req.query;
    const { data, error } = await supabase
        .from("instant_accounts")
        .select("*")
        .eq("user_email", email)
        .single();

    if (error && error.code !== 'PGRST116') return res.status(500).json({ error: error.message });
    res.json(data || null);
});

// Check Trading Rules
app.post("/check-rules", async (req, res) => {
    const { email, newBalance } = req.body;

    // Get active challenge
    const { data: challenge } = await supabase
        .from("challenges")
        .select("*")
        .eq("user_email", email)
        .eq("status", "active")
        .single();

    if (!challenge) {
        return res.json({ success: false, message: "No active challenge" });
    }

    const startingBalance = challenge.starting_balance || 10000;
    const currentBalance = newBalance;
    const profitPercent = (currentBalance - startingBalance) / startingBalance * 100;
    const dailyLoss = (challenge.current_balance - currentBalance) / startingBalance * 100;
    const totalLoss = (startingBalance - currentBalance) / startingBalance * 100;

    let status = "active";
    let message = "";

    // Check Daily Loss Rule (max 5%)
    if (dailyLoss > challenge.max_daily_loss) {
        status = "failed";
        message = "Daily loss limit exceeded (max 5%)";
    }

    // Check Total Loss Rule (max 10%)
    else if (totalLoss > challenge.max_total_loss) {
        status = "failed";
        message = "Total loss limit exceeded (max 10%)";
    }

    // Check Target Profit
    else if (profitPercent >= challenge.target_profit) {
        if (challenge.step === 1) {
            status = "completed_step1";
            message = "Step 1 completed! Proceed to Step 2";
        } else if (challenge.step === 2) {
            status = "completed";
            message = "Challenge completed! You are now funded!";
        }
    }

    // Update challenge
    await supabase
        .from("challenges")
        .update({
            current_balance: currentBalance,
            current_profit: profitPercent,
            status: status,
            trading_days: challenge.trading_days + 1
        })
        .eq("id", challenge.id);

    res.json({ success: true, status, message, profitPercent });
});

// Get trades
app.get("/trades", async (req, res) => {
    const { email } = req.query;
    const { data, error } = await supabase
        .from("trades")
        .select("*")
        .eq("user_email", email)
        .order("created_at", { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Add trade
app.post("/add-trade", async (req, res) => {
    const { email, symbol, profit, newBalance } = req.body;

    // Save trade
    const { error: tradeError } = await supabase
        .from("trades")
        .insert([{ user_email: email, symbol, profit, balance_after: newBalance }]);

    if (tradeError) return res.status(500).json({ success: false, message: tradeError.message });

    // Update challenge
    const { data: challenge } = await supabase
        .from("challenges")
        .select("*")
        .eq("user_email", email)
        .eq("status", "active")
        .single();

    if (challenge) {
        const startingBalance = challenge.starting_balance || 10000;
        const currentProfitPercent = (newBalance - startingBalance) / startingBalance * 100;

        await supabase
            .from("challenges")
            .update({
                current_balance: newBalance,
                current_profit: currentProfitPercent
            })
            .eq("id", challenge.id);
    }

    res.json({ success: true, message: "Trade added" });
});

// Webhook untuk MT5 (auto update)
app.post("/webhook/mt5", async (req, res) => {
    const { email, symbol, profit, balance } = req.body;

    if (!email || profit === undefined) {
        return res.status(400).json({ success: false, message: "Missing data" });
    }

    // Save trade
    await supabase
        .from("trades")
        .insert([{ user_email: email, symbol, profit, balance_after: balance }]);

    // Update challenge
    const { data: challenge } = await supabase
        .from("challenges")
        .select("*")
        .eq("user_email", email)
        .eq("status", "active")
        .single();

    if (challenge) {
        const startingBalance = challenge.starting_balance || 10000;
        const newBalance = balance || (challenge.current_balance + profit);
        const currentProfitPercent = (newBalance - startingBalance) / startingBalance * 100;

        await supabase
            .from("challenges")
            .update({
                current_balance: newBalance,
                current_profit: currentProfitPercent
            })
            .eq("id", challenge.id);
    }

    res.json({ success: true, message: "Trade synced from MT5" });
});

// START SERVER
const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
    console.log(`RUN http://localhost:${port}`);
});