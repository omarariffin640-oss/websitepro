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
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ArrowRight,
  Zap,
  Headset,
  BarChart3
} from "lucide-react";

import {
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  Send
} from "lucide-react";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Statistics data
  const stats = [
    { value: "50,000+", label: "Traders Worldwide", icon: Users },
    { value: "$10M+", label: "Total Payouts", icon: DollarSign },
    { value: "180+", label: "Countries", icon: Globe },
    { value: "99.9%", label: "Payouts Secure", icon: Shield },
    { value: "24h", label: "Payouts Processed", icon: Clock },
  ];

  // Challenge cards data
  const challenges = [
    { size: "$5,000", price: 49, originalPrice: 59, color: "from-purple-500/20 to-purple-600/20", border: "border-purple-500/30", btnColor: "bg-purple-500 hover:bg-purple-600" },
    { size: "$10,000", price: 89, originalPrice: 99, color: "from-blue-500/20 to-blue-600/20", border: "border-blue-500/30", btnColor: "bg-blue-500 hover:bg-blue-600" },
    { size: "$25,000", price: 179, originalPrice: 199, color: "from-green-500/20 to-green-600/20", border: "border-green-500/30", btnColor: "bg-green-500 hover:bg-green-600" },
    { size: "$50,000", price: 299, originalPrice: 349, color: "from-orange-500/20 to-orange-600/20", border: "border-orange-500/30", btnColor: "bg-orange-500 hover:bg-orange-600" },
  ];

  // Dashboard menu items
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

  // Accounts data
  const accounts = [
    { id: "NOOR-125623", type: "$50,000 Challenge", balance: "50,000.00", equity: "52,684.21", status: "Active" },
    { id: "NOOR-956412", type: "$25,000 Challenge", balance: "25,000.00", equity: "25,842.31", status: "Active" },
    { id: "JOHAN-984512", type: "$10,000 Challenge", balance: "10,000.00", equity: "10,256.12", status: "Active" },
  ];

  // Features data
  const features = [
    { icon: Shield, title: "Fair Rules", desc: "Transparent and trader friendly rules." },
    { icon: Zap, title: "Fast Payouts", desc: "Payouts processed within 24 hours." },
    { icon: Headset, title: "24/7 Support", desc: "Our support team is always here to help." },
    { icon: BarChart3, title: "Advanced Platform", desc: "Trade on MT5 with low spreads and executes." },
    { icon: Users, title: "Global Community", desc: "Join our global trading community." },
  ];

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-black"><p className="text-gray-400">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/10" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

        {/* Candlestick Effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="flex items-end justify-around h-full w-full px-8">
            {[30, 45, 60, 35, 80, 50, 70, 40, 90, 55, 65, 75].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-1 bg-green-500 rounded-t" style={{ height: `${h * 0.8}%` }} />
                <div className="w-2 h-1 bg-green-500" />
                <div className="w-1 bg-red-500 rounded-b" style={{ height: `${h * 0.6}%` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
                TRUSTED TRADERS WORLDWIDE
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Trade Up To{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  $200,000
                </span>{" "}
                Funded Capital
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
                Take your trading to the next level with Noor Funding.
                Pass the challenge, prove your skills, and get funded.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/register">
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-lg rounded-xl">
                    Start Challenge <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/instant-account">
                  <Button variant="outline" className="border-purple-500/50 text-white hover:bg-purple-500/20 px-8 py-6 text-lg rounded-xl">
                    Instant Account
                  </Button>
                </Link>
              </div>

              {/* Trustpilot */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-green-500 text-green-500" />
                  ))}
                </div>
                <span className="text-white font-medium">4.8 out of 5</span>
                <span className="text-gray-400">• Trustpilot</span>
              </div>
            </motion.div>

            {/* Right Content - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-4">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">N</span>
                    </div>
                    <span className="text-white font-bold text-sm">NOOR</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-xs">All Accounts</span>
                    <ChevronDown className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-400 text-xs">This Month</span>
                    <ChevronDown className="h-3 w-3 text-gray-400" />
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {menuItems.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
                      <item.icon className="h-4 w-4 text-gray-400" />
                      <span className="text-[10px] text-gray-500">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Welcome & Stats */}
                <div className="bg-gray-800/30 rounded-lg p-3 mb-3">
                  <p className="text-white text-sm font-medium">Welcome back, Trader!</p>
                  <p className="text-gray-400 text-xs">Here's your trading overview</p>
                </div>

                {/* Equity & Profit */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-gray-800/30 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">Equity</p>
                    <p className="text-white font-bold text-lg">$17,684.21</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">Profit</p>
                    <p className="text-green-500 font-bold text-lg">$2,684.21</p>
                    <p className="text-green-400 text-xs">(17.92%)</p>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg mb-3 flex items-end px-2">
                  {[30, 45, 35, 60, 50, 75, 65, 85, 70, 55, 40, 65].map((h, i) => (
                    <div key={i} className="flex-1 bg-purple-500/40 rounded-t" style={{ height: `${h}%` }} />
                  ))}
                </div>

                {/* Accounts Table */}
                <div className="space-y-2">
                  {accounts.map((acc) => (
                    <div key={acc.id} className="flex items-center justify-between text-xs p-2 rounded bg-gray-800/20">
                      <span className="text-gray-300 font-mono">{acc.id}</span>
                      <span className="text-gray-400">{acc.type}</span>
                      <span className="text-white">${acc.balance}</span>
                      <span className="text-green-400">${acc.equity}</span>
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-[10px]">
                        {acc.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="text-right mt-2">
                  <button className="text-purple-400 text-xs hover:text-purple-300 transition-colors">
                    View All Accounts →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATISTICS SECTION ===== */}
      <section className="py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CHALLENGES SECTION ===== */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-3 bg-purple-500/20 text-purple-400 border-purple-500/30">Challenges</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Choose Your Challenge</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, i) => (
              <motion.div
                key={challenge.size}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className={`bg-gradient-to-b ${challenge.color} border ${challenge.border} hover:scale-105 transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white">{challenge.size}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">${challenge.price}</span>
                      <span className="text-gray-400">${challenge.originalPrice}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Profit Target</span>
                        <span className="text-white">8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Daily Drawdown</span>
                        <span className="text-white">5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Drawdown</span>
                        <span className="text-white">10%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Leverage</span>
                        <span className="text-white">1:100</span>
                      </div>
                    </div>
                    <Button className={`w-full ${challenge.btnColor} text-white`}>
                      Start Challenge
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Instant Funding Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <Badge className="mb-2 bg-purple-500/20 text-purple-400 border-purple-500/30">Instant Funding</Badge>
                  <h3 className="text-xl font-bold text-white">Skip the Challenge</h3>
                  <p className="text-gray-400">Get funded instantly. No challenge required.</p>
                </div>
                <Link href="/instant-account">
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8">
                    Get Instant Account <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-3 bg-purple-500/20 text-purple-400 border-purple-500/30">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Noor Funding</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border border-white/10 text-center hover:border-purple-500/30 transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Logo & Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="font-bold text-lg text-white">NOOR <span className="text-purple-400">FUNDING</span></span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Empowering traders worldwide. Trade. Prove. Get Funded.</p>
              <div className="flex items-center gap-3">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Affiliates</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Trading Rules</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status Page</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Refund Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Risk Disclosure</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-3">Stay Updated</h4>
              <p className="text-gray-400 text-sm mb-3">Subscribe to get the latest news and offers.</p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                />
                <Button className="bg-purple-500 hover:bg-purple-600 text-white w-full">
                  Subscribe <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2026 Noor Funding. All rights reserved.</p>
            <p>Built for traders, by traders.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}