"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Users,
  DollarSign,
  Globe,
  Shield,
  Clock,
  LayoutDashboard,
  FolderKanban,
  Award,
  Wallet,
  FileText,
  Settings,
  LogOut,
  User,
  ChevronDown,
  ArrowRight,
  Zap,
  Headset,
  BarChart3,
  Eye,
  TrendingUp,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  Send,
} from "lucide-react";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [selectedProgram, setSelectedProgram] = useState("Step 2");
  const [showPhases, setShowPhases] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const stats = [
    { value: "50,000+", label: "Traders Worldwide", icon: Users },
    { value: "$10M+", label: "Total Payouts", icon: DollarSign },
    { value: "180+", label: "Countries", icon: Globe },
    { value: "99.9%", label: "Secure Payouts", icon: Shield },
    { value: "24h", label: "Payout Review", icon: Clock },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: FolderKanban, label: "Accounts" },
    { icon: Award, label: "Certificate" },
    { icon: Wallet, label: "Payouts" },
    { icon: FileText, label: "Orders" },
    { icon: User, label: "Profile" },
    { icon: Settings, label: "Settings" },
    { icon: LogOut, label: "Logout" },
  ];

  const accounts = [
    { id: "NOOR-125623", type: "$50,000 Challenge", balance: "50,000.00", equity: "52,684.21", status: "Active" },
    { id: "NOOR-956412", type: "$25,000 Challenge", balance: "25,000.00", equity: "25,842.31", status: "Active" },
    { id: "NOOR-984512", type: "$10,000 Challenge", balance: "10,000.00", equity: "10,256.12", status: "Active" },
  ];

  const features = [
    { icon: Shield, title: "Fair Rules", desc: "Transparent rules built for serious traders." },
    { icon: Zap, title: "Fast Payouts", desc: "Payout review within 24 hours." },
    { icon: Headset, title: "24/7 Support", desc: "Support team ready whenever you need help." },
    { icon: BarChart3, title: "MT5 Ready", desc: "Trade with modern tools and clean tracking." },
    { icon: Users, title: "Global Traders", desc: "Join traders from over 180 countries." },
  ];

  const programs = ["Free Trial", "Step 1", "Step 2", "Instant", "Noor Funding"];

  const capitals = [
    { size: "$5,000", baseFee: 49, avgReward: "$680" },
    { size: "$10,000", baseFee: 89, avgReward: "$1,200" },
    { size: "$25,000", baseFee: 179, avgReward: "$2,850" },
    { size: "$50,000", baseFee: 299, avgReward: "$5,600" },
    { size: "$100,000", baseFee: 549, avgReward: "$11,000" },
  ];

  const programRules: Record<string, any> = {
    "Free Trial": {
      phase1: "Demo",
      phase2: "-",
      target: "8%",
      dailyLoss: "5%",
      maxLoss: "10%",
      minDays: "0 Days",
      period: "14 Days",
      refund: "No",
      rewards: "Demo Only",
      feeMultiplier: 0,
    },
    "Step 1": {
      phase1: "10%",
      phase2: "-",
      target: "10%",
      dailyLoss: "5%",
      maxLoss: "10%",
      minDays: "4 Days",
      period: "Unlimited",
      refund: "Yes",
      rewards: "Up To 90%",
      feeMultiplier: 1.15,
    },
    "Step 2": {
      phase1: "10%",
      phase2: "5%",
      target: "10% / 5%",
      dailyLoss: "5%",
      maxLoss: "10%",
      minDays: "4 Days",
      period: "Unlimited",
      refund: "Yes",
      rewards: "Up To 90%",
      feeMultiplier: 1,
    },
    "Instant": {
      phase1: "Instant",
      phase2: "-",
      target: "-",
      dailyLoss: "4%",
      maxLoss: "8%",
      minDays: "0 Days",
      period: "Unlimited",
      refund: "No",
      rewards: "Up To 80%",
      feeMultiplier: 2.1,
    },
    "Noor Funding": {
      phase1: "Elite",
      phase2: "Live",
      target: "8%",
      dailyLoss: "5%",
      maxLoss: "10%",
      minDays: "4 Days",
      period: "Unlimited",
      refund: "Yes",
      rewards: "Up To 90%",
      feeMultiplier: 1.35,
    },
  };

  const currencyData: Record<string, { symbol: string; rate: number }> = {
    USD: { symbol: "$", rate: 1 },
    GBP: { symbol: "£", rate: 0.79 },
    EUR: { symbol: "€", rate: 0.92 },
  };

  const formatFee = (baseFee: number) => {
    const rule = programRules[selectedProgram];
    const data = currencyData[currency];
    const fee = Math.round(baseFee * rule.feeMultiplier * data.rate);
    return fee === 0 ? "Free" : `${data.symbol}${fee}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden py-12 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-black to-blue-950/20" />
        <div className="absolute -top-32 right-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <Badge className="mb-4 border-purple-500/30 bg-purple-500/20 text-purple-300">
                PROP FIRM FUNDING PROGRAM
              </Badge>

              <h1 className="mb-5 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Trade Up To{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  $200,000
                </span>{" "}
                Funded Capital
              </h1>

              <p className="mb-8 max-w-xl text-lg text-gray-300 md:text-xl">
                Choose Free Trial, Step 1, Step 2, Instant, or Noor Funding accounts with clear rules, fast payouts, and up to 90% profit split.
              </p>

              <div className="mb-8 flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <Button className="rounded-xl bg-purple-500 px-8 py-6 text-lg text-white hover:bg-purple-600">
                    Start Challenge <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link href="/instant-account">
                  <Button
                    variant="outline"
                    className="rounded-xl border-purple-500/50 px-8 py-6 text-lg text-white hover:bg-purple-500/20"
                  >
                    Instant Funding
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-green-500 text-green-500" />
                  ))}
                </div>
                <span className="font-medium text-white">4.8 out of 5</span>
                <span className="text-gray-400">• Trader Rated</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="rounded-3xl border border-purple-500/20 bg-white/5 p-4 shadow-2xl shadow-purple-500/10 backdrop-blur">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500">
                      <span className="text-xs font-bold text-white">N</span>
                    </div>
                    <span className="text-sm font-bold text-white">NOOR FUNDING</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <button className="flex items-center gap-1 rounded-lg bg-gray-900/80 px-3 py-2">
                      All Accounts <ChevronDown className="h-3 w-3" />
                    </button>
                    <button className="flex items-center gap-1 rounded-lg bg-gray-900/80 px-3 py-2">
                      This Month <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {menuItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-xl border border-white/5 bg-gray-900/50 p-2.5 transition hover:border-purple-500/30 hover:bg-purple-500/10"
                    >
                      <item.icon className="h-4 w-4 text-purple-400" />
                      <span className="text-xs text-gray-300">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-4 rounded-2xl border border-white/5 bg-gray-900/60 p-4">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white">Welcome back, Trader!</p>
                      <p className="text-xs text-gray-400">Here is your account performance.</p>
                    </div>
                    <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
                      Live
                    </Badge>
                  </div>

                  <div className="mb-4 grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-black/40 p-3">
                      <p className="text-xs text-gray-400">Balance</p>
                      <p className="text-sm font-bold text-white">$50,000</p>
                    </div>
                    <div className="rounded-xl bg-black/40 p-3">
                      <p className="text-xs text-gray-400">Equity</p>
                      <p className="text-sm font-bold text-white">$52,684</p>
                    </div>
                    <div className="rounded-xl bg-black/40 p-3">
                      <p className="text-xs text-gray-400">Profit</p>
                      <p className="text-sm font-bold text-green-400">+17.92%</p>
                    </div>
                  </div>

                  <div className="relative h-28 overflow-hidden rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                    <svg viewBox="0 0 500 120" className="h-full w-full">
                      <path
                        d="M0 95 C50 80, 80 90, 120 65 C165 35, 195 50, 240 40 C300 25, 340 70, 390 38 C435 15, 465 30, 500 18"
                        fill="none"
                        stroke="rgb(168 85 247)"
                        strokeWidth="4"
                      />
                      <path
                        d="M0 95 C50 80, 80 90, 120 65 C165 35, 195 50, 240 40 C300 25, 340 70, 390 38 C435 15, 465 30, 500 18 L500 120 L0 120 Z"
                        fill="rgba(168,85,247,0.12)"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  {accounts.map((acc) => (
                    <div key={acc.id} className="grid grid-cols-5 items-center gap-2 rounded-xl bg-gray-900/50 p-2 text-[11px]">
                      <span className="font-mono text-gray-300">{acc.id}</span>
                      <span className="text-gray-400">{acc.type}</span>
                      <span className="text-white">${acc.balance}</span>
                      <span className="text-green-400">${acc.equity}</span>
                      <Badge className="justify-center border-green-500/30 bg-green-500/20 text-[10px] text-green-400">
                        {acc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-800 py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="text-center">
                <stat.icon className="mx-auto mb-2 h-8 w-8 text-purple-400" />
                <p className="text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-950/80 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <div>
              <Badge className="mb-3 border-purple-500/30 bg-purple-500/20 text-purple-300">
                Funding Programs
              </Badge>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Choose Your Noor Challenge
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-center mt-3 mb-8">
                Select capital size and program type. Every capital account includes Free Trial, Step 1, Step 2, Instant, and Noor Funding options.
              </p>
            </div>

            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {["USD", "GBP", "EUR"].map((cur) => (
                <Button
                  key={cur}
                  variant="outline"
                  onClick={() => setCurrency(cur)}
                  className={`${currency === cur ? "border-purple-500 bg-purple-500/20 text-white" : "border-gray-700 text-gray-300"} hover:bg-purple-500/20`}
                >
                  {cur}
                </Button>
              ))}

              <Button
                variant="outline"
                onClick={() => setShowPhases(!showPhases)}
                className="border-gray-700 text-gray-300 hover:bg-purple-500/20"
              >
                <Eye className="mr-2 h-4 w-4" />
                {showPhases ? "Hide Phases" : "Show Phases"}
              </Button>
            </div>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {programs.map((program) => (
              <button
                key={program}
                onClick={() => setSelectedProgram(program)}
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${selectedProgram === program
                  ? "border-purple-500 bg-purple-500 text-white"
                  : "border-gray-800 bg-black/40 text-gray-400 hover:border-purple-500/50 hover:text-white"
                  }`}
              >
                {program}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {capitals.map((capital, i) => {
              const rule = programRules[selectedProgram];

              return (
                <motion.div
                  key={capital.size}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card
                    className={`h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 ${capital.size === "$100,000"
                      ? "border-purple-500/60 bg-gradient-to-b from-purple-500/25 via-purple-950/30 to-black"
                      : "border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-black hover:border-purple-500/50"
                      }`}
                  >
                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge
                          className={`text-white ${capital.size === "$100,000"
                            ? "bg-gradient-to-r from-purple-500 to-blue-500"
                            : "bg-purple-500"
                            }`}
                        >
                          {capital.size === "$100,000" ? "MOST POPULAR" : "20% OFF"}
                        </Badge>

                        <span className="text-xs text-gray-400">{currency}</span>
                      </div>

                      <div>
                        <CardTitle className="text-3xl font-bold text-white">
                          {capital.size}
                        </CardTitle>

                        <p className="mt-1 text-sm text-purple-300">
                          {selectedProgram}
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="rounded-xl border border-purple-500/20 bg-black/40 p-3">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-purple-300">
                          Account Includes
                        </p>

                        <div className="space-y-1.5 text-xs text-gray-300">
                          <div>✓ No Consistency Rule</div>
                          <div>✓ Up To 90% Profit Split</div>
                          <div>✓ Fast Payout Review</div>
                          <div>✓ EAs Allowed</div>
                          <div>✓ Platform 5 Trading</div>
                        </div>
                      </div>
                      {showPhases && (
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-xl bg-black/40 p-3">
                            <p className="text-xs text-gray-400">Phase 1</p>
                            <p className="font-semibold text-white">{rule.phase1}</p>
                          </div>
                          <div className="rounded-xl bg-black/40 p-3">
                            <p className="text-xs text-gray-400">Phase 2</p>
                            <p className="font-semibold text-white">{rule.phase2}</p>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2 text-sm">
                        {[
                          ["Profit Target", rule.target],
                          ["Max Daily Loss", rule.dailyLoss],
                          ["Max Loss", rule.maxLoss],
                          ["Min Trading Days", rule.minDays],
                          ["Trading Period", rule.period],
                          ["Refund", rule.refund],
                          ["Rewards", rule.rewards],
                        ].map(([label, value]) => (
                          <div key={label} className="flex justify-between gap-3 border-b border-white/5 pb-2">
                            <span className="text-gray-400">{label}</span>
                            <span className="text-right font-medium text-white">{value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-xl bg-black/40 p-3">
                        <p className="text-xs text-gray-400">One-time refundable fee from</p>
                        <div className="mt-1 flex items-end justify-between">
                          <p className="text-3xl font-bold text-white">{formatFee(capital.baseFee)}</p>
                          <p className="text-xs text-green-400">{capital.avgReward} Avg. Reward</p>
                        </div>
                      </div>

                      <Link href="/register" className="block">
                        <Button className="w-full rounded-xl bg-purple-500 text-white hover:bg-purple-600">
                          Start Challenge
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-3 border-purple-500/30 bg-purple-500/20 text-purple-300">
              Features
            </Badge>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Why Choose Noor Funding
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <Card className="h-full border-white/10 bg-white/5 text-center backdrop-blur transition hover:border-purple-500/40">
                  <CardContent className="pt-6">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
                      <feature.icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="mb-1 font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500">
                  <span className="text-sm font-bold text-white">N</span>
                </div>
                <span className="text-lg font-bold text-white">
                  NOOR <span className="text-purple-400">FUNDING</span>
                </span>
              </div>
              <p className="mb-4 text-sm text-gray-400">
                Empowering traders worldwide. Trade. Prove. Get Funded.
              </p>
              <div className="flex items-center gap-3">
                {[Twitter, Facebook, Youtube, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="text-gray-400 transition hover:text-purple-400">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              ["Company", ["About Us", "Careers", "Affiliates", "Contact Us"]],
              ["Resources", ["Blog", "Trading Rules", "Help Center", "Status Page"]],
              ["Legal", ["Terms of Service", "Privacy Policy", "Refund Policy", "Risk Disclosure"]],
            ].map(([title, links]) => (
              <div key={title as string}>
                <h4 className="mb-3 font-semibold text-white">{title}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {(links as string[]).map((item) => (
                    <li key={item}>
                      <Link href="#" className="transition hover:text-white">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="mb-3 font-semibold text-white">Stay Updated</h4>
              <p className="mb-3 text-sm text-gray-400">
                Subscribe to get the latest news and offers.
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none"
                />
                <Button className="w-full bg-purple-500 text-white hover:bg-purple-600">
                  Subscribe <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-gray-800 pt-8 text-sm text-gray-400 md:flex-row">
            <p>© 2026 Noor Funding. All rights reserved.</p>
            <p>Built for traders, by traders.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}