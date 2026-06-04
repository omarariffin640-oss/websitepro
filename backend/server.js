const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

// HOME
app.get("/", (req, res) => {
    res.send("Backend Running 🚀");
});

// REGISTER
app.post("/register", (req, res) => {
    console.log("REGISTER HIT:", req.body);

    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Missing data" });
    }

    const exist = users.find(u => u.email === email);
    if (exist) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }

    users.push({ email, password });

    console.log("USERS:", users);

    // 🔴 FIX: Tambah success: true
    res.json({ success: true, message: "Register success" });
});

// LOGIN
app.post("/login", (req, res) => {
    console.log("LOGIN HIT:", req.body);
    console.log("USERS:", users);

    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
        return res.status(400).json({ success: false, message: "Wrong password" });
    }

    // 🔴 FIX: Tambah success: true
    res.json({ success: true, message: "Login success" });
});

// START SERVER
app.listen(5000, "0.0.0.0", () => {
    console.log("RUN http://localhost:5000");
});