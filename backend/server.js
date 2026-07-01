const multer = require("multer");
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

const upload = multer({
    storage: multer.memoryStorage()
});

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
        .select("id, email, created_at, name, avatar_url, role");

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
    const { email, name } = req.body;

    const { error } = await supabase
        .from("users")
        .update({
            name
        })
        .eq("email", email);

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.json({
        success: true,
        message: "Profile updated"
    });
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

// UPLOAD AVATAR FILE
app.post("/profile/upload-avatar", upload.single("avatar"), async (req, res) => {
    const { email } = req.body;

    if (!email || !req.file) {
        return res.status(400).json({
            success: false,
            message: "Missing email or avatar file"
        });
    }

    const fileExt = req.file.originalname.split(".").pop();
    const fileName = `${email}-${Date.now()}.${fileExt}`;
    const filePath = `profiles/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, req.file.buffer, {
            contentType: req.file.mimetype,
            upsert: true
        });

    if (uploadError) {
        return res.status(500).json({
            success: false,
            message: uploadError.message
        });
    }

    const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

    const avatarUrl = data.publicUrl;

    const { error: updateError } = await supabase
        .from("users")
        .update({ avatar_url: avatarUrl })
        .eq("email", email);

    if (updateError) {
        return res.status(500).json({
            success: false,
            message: updateError.message
        });
    }

    res.json({
        success: true,
        avatarUrl
    });
});

// DELETE AVATAR
app.delete("/profile/avatar", async (req, res) => {
    const { email } = req.body;

    const { error } = await supabase
        .from("users")
        .update({
            avatar_url: null
        })
        .eq("email", email);

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.json({
        success: true,
        message: "Avatar deleted"
    });
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

// GET active challenge for a user
app.get("/active-challenge", async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .eq("user_email", email)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (!data) {
        return res.json(null);
    }

    res.json(data);
});

// GET user certificates
app.get("/certificates", async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("user_email", email)
        .order("created_at", { ascending: false });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data || []);
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

    let currentProfitPercent = 0;
    if (challenge) {
        const startingBalance = challenge.starting_balance || 10000;
        currentProfitPercent = (newBalance - startingBalance) / startingBalance * 100;

        await supabase
            .from("challenges")
            .update({
                current_balance: newBalance,
                current_profit: currentProfitPercent
            })
            .eq("id", challenge.id);
    }

    // Send email notification
    try {
        const { Resend } = require('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: `Trade ${profit >= 0 ? 'Profit' : 'Loss'} - ${symbol}`,
            html: `
                <h2>Trade Update</h2>
                <p>Symbol: ${symbol}</p>
                <p>Profit/Loss: ${profit >= 0 ? '+' : ''}${profit} USD</p>
                <p>New Balance: ${newBalance} USD</p>
                <p>Current Profit: ${currentProfitPercent.toFixed(2)}%</p>
                <p>Time: ${new Date().toLocaleString()}</p>
            `
        });
    } catch (emailError) {
        console.log("Email not sent:", emailError.message);
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

    let currentProfitPercent = 0;
    if (challenge) {
        const startingBalance = challenge.starting_balance || 10000;
        const newBalance = balance || (challenge.current_balance + profit);
        currentProfitPercent = (newBalance - startingBalance) / startingBalance * 100;

        await supabase
            .from("challenges")
            .update({
                current_balance: newBalance,
                current_profit: currentProfitPercent
            })
            .eq("id", challenge.id);
    }

    // Send email notification
    try {
        const { Resend } = require('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: `Trade ${profit >= 0 ? 'Profit' : 'Loss'} - ${symbol}`,
            html: `
                <h2>Trade Update (MT5)</h2>
                <p>Symbol: ${symbol}</p>
                <p>Profit/Loss: ${profit >= 0 ? '+' : ''}${profit} USD</p>
                <p>Current Profit: ${currentProfitPercent.toFixed(2)}%</p>
                <p>Time: ${new Date().toLocaleString()}</p>
            `
        });
    } catch (emailError) {
        console.log("Email not sent:", emailError.message);
    }

    res.json({ success: true, message: "Trade synced from MT5" });
});

// GET withdrawals
app.get("/withdrawals", async (req, res) => {
    const { email } = req.query;
    const { data, error } = await supabase
        .from("withdrawals")
        .select("*")
        .eq("user_email", email)
        .order("created_at", { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// REQUEST withdrawal
app.post("/request-withdrawal", async (req, res) => {
    const { email, amount, payment_method, account_details } = req.body;

    // Check balance
    const { data: challenge } = await supabase
        .from("challenges")
        .select("current_balance")
        .eq("user_email", email)
        .eq("status", "active")
        .single();

    const balance = challenge?.current_balance || 0;
    if (amount > balance) {
        return res.status(400).json({ success: false, message: "Insufficient balance" });
    }

    const { error } = await supabase
        .from("withdrawals")
        .insert([{ user_email: email, amount, payment_method, account_details }]);

    if (error) return res.status(500).json({ success: false, message: error.message });
    res.json({ success: true, message: "Withdrawal request submitted" });
});

app.get("/profile", async (req, res) => {
    const { email } = req.query;

    const { data, error } = await supabase
        .from("users")
        .select("id, name, email, avatar_url, role")
        .eq("email", email)
        .single();

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.json(data);
});

// PURCHASE ACCOUNT
app.post("/purchase-account", async (req, res) => {
    const { email, account_name, balance, step } = req.body;

    // 1. Check input
    if (!email || !account_name || !balance || !step) {
        return res.status(400).json({
            success: false,
            message: "Missing purchase data"
        });
    }

    // 2. Check duplicate active account
    const { data: existingAccount } = await supabase
        .from("accounts")
        .select("id, account_name, status")
        .eq("user_email", email)
        .eq("status", "active")
        .maybeSingle();

    if (existingAccount) {
        return res.status(400).json({
            success: false,
            message: "You already have an active account"
        });
    }

    // 3. Generate login
    const login = "NF" + Math.floor(10000000 + Math.random() * 90000000);

    const { error: accountError } = await supabase
        .from("accounts")
        .insert([{
            user_email: email,
            account_name,
            balance,
            status: "active",
            platform: "MT5",
            login,
            server: "NoorFunding-Demo"
        }]);

    if (accountError) {
        return res.status(500).json({
            success: false,
            message: accountError.message
        });
    }

    // CREATE ORDER RECORD
    await supabase
        .from("orders")
        .insert([{
            user_email: email,
            account_name,
            amount: balance,
            status: "active",
            payment_status: "paid"
        }]);

    const { data: rules } = await supabase
        .from("challenge_rules")
        .select("*")
        .eq("step", step)
        .single();

    const { error: challengeError } = await supabase
        .from("challenges")
        .insert([{
            user_email: email,
            step,
            starting_balance: balance,
            current_balance: balance,
            current_profit: 0,
            target_profit: rules?.target_profit || 10,
            max_daily_loss: rules?.max_daily_loss || 5,
            max_total_loss: rules?.max_total_loss || 10,
            min_trading_days: rules?.min_trading_days || 5,
            status: "active"
        }]);

    if (challengeError) {
        return res.status(500).json({
            success: false,
            message: challengeError.message
        });
    }

    await supabase
        .from("users")
        .update({
            challenge_status: "Active",
            account_type: "Challenge Trader"
        })
        .eq("email", email);

    res.json({
        success: true,
        message: "Account purchased successfully",
        login
    });
});

// GET ORDERS
app.get("/orders", async (req, res) => {
    const { email } = req.query;

    let query = supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    if (email) {
        query = query.eq("user_email", email);
    }

    const { data, error } = await query;

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
});

// REQUEST PAYOUT
app.post("/request-payout", async (req, res) => {
    const { email, amount, method, note } = req.body;

    if (!email || !amount) {
        return res.status(400).json({
            success: false,
            message: "Missing payout data"
        });
    }

    const { error } = await supabase
        .from("payouts")
        .insert([{
            user_email: email,
            amount,
            method: method || "bank",
            note: note || "",
            status: "pending"
        }]);

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.json({
        success: true,
        message: "Payout request submitted."
    });
});

// GET PAYOUTS
app.get("/payouts", async (req, res) => {
    const { email } = req.query;

    let query = supabase
        .from("payouts")
        .select("*")
        .order("created_at", { ascending: false });

    if (email) {
        query = query.eq("user_email", email);
    }

    const { data, error } = await query;

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.json(data);
});

// ADMIN STATS
app.get("/admin/stats", async (req, res) => {
    const { count: usersCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

    const { count: accountsCount } = await supabase
        .from("accounts")
        .select("*", { count: "exact", head: true });

    const { count: ordersCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });

    const { count: pendingPayoutsCount } = await supabase
        .from("payouts")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

    res.json({
        users: usersCount || 0,
        accounts: accountsCount || 0,
        orders: ordersCount || 0,
        pendingPayouts: pendingPayoutsCount || 0
    });
});

// GET ALL USERS
app.get("/admin/users", async (req, res) => {
    const { data, error } = await supabase
        .from("users")
        .select("id,email,name,avatar_url,role,challenge_status,account_type,created_at")
        .order("created_at", { ascending: false });

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.json(data);
});

// ADMIN GET ALL ACCOUNTS
app.get("/admin/accounts", async (req, res) => {
    const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.json(data);
});

// ADMIN GET ALL ORDERS
app.get("/admin/orders", async (req, res) => {
    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.json(data);
});

// ADMIN GET ALL PAYOUTS
app.get("/admin/payouts", async (req, res) => {
    const { data, error } = await supabase
        .from("payouts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.json(data);
});

// ADMIN UPDATE PAYOUT STATUS
app.put("/admin/payouts/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "rejected", "paid"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid payout status"
        });
    }

    const { error } = await supabase
        .from("payouts")
        .update({ status })
        .eq("id", id);

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.json({
        success: true,
        message: "Payout status updated"
    });
});

// ADMIN GET ALL CERTIFICATES
app.get("/admin/certificates", async (req, res) => {
    const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.json(data);
});

// ADMIN ISSUE CERTIFICATE
app.post("/admin/certificates/issue", async (req, res) => {
    const { email, name, type, description } = req.body;

    if (!email || !name) {
        return res.status(400).json({
            success: false,
            message: "Missing certificate data"
        });
    }

    const { error } = await supabase
        .from("certificates")
        .insert([{
            user_email: email,
            name,
            type: type || "funded",
            description: description || "Certificate issued by Noor Funding",
            status: "active"
        }]);

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.json({
        success: true,
        message: "Certificate issued"
    });
});

// START SERVER
const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
    console.log(`RUN http://localhost:${port}`);
});