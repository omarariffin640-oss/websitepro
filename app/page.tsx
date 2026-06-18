"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import {
  Wallet, TrendingUp, FolderKanban, DollarSign, Users,
  Gift, ArrowUpRight, Calendar, CheckCircle, Clock, AlertCircle,
  PauseCircle, Copy, ExternalLink, Award, Zap, BarChart3,
  Eye, PlusCircle, CreditCard, Send, Download, Shield,
  Star, Share2, Megaphone, PenSquare, Store
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/login");
      return;
    }
    setUserEmail(email);
    setLoading(false);
  }, [router]);

  // Stats Cards Data
  const stats = [
    { title: "Total Balance", value: "$104,230", icon: Wallet, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Total Profit", value: "+$8,450", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Total Accounts", value: "3,718", icon: FolderKanban, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Payouts Received", value: "$1,247,850", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Active Accounts", value: "1,807", icon: Users, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  // My Accounts (4 cards)
  const myAccounts = [
    { id: "#123456", name: "10K Challenge", balance: 105340, equity: 105340, status: "active", progress: 72, color: "blue" },
    { id: "#123457", name: "Instant $5K", balance: 5000, equity: 5200, status: "active", progress: 100, color: "blue" },
    { id: "#123458", name: "Standard $10K", balance: 10000, equity: 9800, status: "pause", progress: 45, color: "orange" },
    { id: "#123459", name: "Pro $25K", balance: 25000, equity: 25000, status: "failed", progress: 0, color: "red" },
  ];

  // Recent Activity (4 items)
  const activities = [
    { user: "Ali Noor", action: "Completed Challenge Step 1", time: "2 hours ago", icon: CheckCircle },
    { user: "Sarah Tan", action: "Requested Payout $2,500", time: "5 hours ago", icon: DollarSign },
    { user: "John Lim", action: "Started New Challenge", time: "1 day ago", icon: Trophy },
    { user: "Ahmad Faiz", action: "Deposited $5,000", time: "2 days ago", icon: PlusCircle },
  ];

  // Account Overview (3 cards)
  const overview = [
    { label: "Active", value: 3, total: 5, percent: 60, color: "text-blue-500", bg: "bg-blue-500/20", icon: CheckCircle },
    { label: "Pause", value: 1, total: 5, percent: 20, color: "text-orange-500", bg: "bg-orange-500/20", icon: PauseCircle },
    { label: "Failed", value: 1, total: 5, percent: 20, color: "text-red-500", bg: "bg-red-500/20", icon: AlertCircle },
  ];

  // Payouts Request (4 items)
  const payouts = [
    { user: "Ali Noor", amount: 2500, status: "approved", date: "2026-06-18", color: "green" },
    { user: "Sarah Tan", amount: 1200, status: "pending", date: "2026-06-18", color: "orange" },
    { user: "John Lim", amount: 500, status: "pending", date: "2026-06-17", color: "orange" },
    { user: "Ahmad Faiz", amount: 800, status: "rejected", date: "2026-06-17", color: "red" },
  ];

  // Color Palette (4 cards)
  const colorCards = [
    { title: "Color Palette", icon: Palette, description: "Blue, Orange, Red, Green", color: "text-blue-500" },
    { title: "Why This Color?", icon: Eye, description: "Professional, Trust, Modern", color: "text-purple-500" },
    { title: "Key Features", icon: Zap, description: "Fast, Secure, Reliable", color: "text-orange-500" },
    { title: "Affiliate Program", icon: Share2, description: "Earn 15% commission", color: "text-green-500" },
  ];

  // News (3 items)
  const news = [
    { title: "🎉 New Challenge Available", excerpt: "Step 1 & Step 2 are now live!", date: "2026-06-14" },
    { title: "📈 Trading Tips: Risk Management", excerpt: "Never risk more than 2% per trade.", date: "2026-06-13" },
    { title: "⚡ Payout Update", excerpt: "Payouts processed within 24 hours.", date: "2026-06-12" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Active</Badge>;
      case "pause": return <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">Pause</Badge>;
      case "failed": return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Failed</Badge>;
      default: return <Badge className="bg-gray-500/20 text-gray-400">Unknown</Badge>;
    }
  };

  const getPayoutStatus = (status: string) => {
    switch (status) {
      case "approved": return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Approved</Badge>;
      case "pending": return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>;
      case "rejected": return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Rejected</Badge>;
      default: return <Badge className="bg-gray-500/20 text-gray-400">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-darknavy">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darknavy">
      <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lg:ml-64 pt-2">
        <div className="p-3 max-w-7xl mx-auto">

          {/* 1. Special Offer Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
              <CardContent className="py-3">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-orange-500/30">
                      <Gift className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">🎉 Special Offer!</h3>
                      <p className="text-gray-300 text-sm">Get 20% OFF on all Instant Accounts. Use code <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">INSTANT20</Badge></p>
                    </div>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600 shrink-0 text-sm">
                    Claim Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 2. Stats Cards (5) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="bg-darkcard border-gray-800 hover:border-gray-700 transition-colors">
                  <CardContent className="pt-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${stat.bg}`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">{stat.title}</p>
                        <p className="text-base font-bold text-white">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 3. My Accounts (4 cards) + Recent Activity (1 card dengan 4 items) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* My Accounts - 4 cards dalam grid */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-white">📁 My Accounts</h2>
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-sm p-0">
                  View All <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {myAccounts.map((acc, index) => (
                  <motion.div
                    key={acc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  >
                    <Card className={`bg-darkcard border-l-4 ${acc.color === "blue" ? "border-blue-500" : acc.color === "orange" ? "border-orange-500" : "border-red-500"}`}>
                      <CardContent className="pt-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs text-gray-400">{acc.id}</p>
                            <p className="text-sm font-medium text-white">{acc.name}</p>
                          </div>
                          {getStatusBadge(acc.status)}
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-gray-400">Balance</p>
                            <p className="text-sm font-medium text-white">${acc.balance.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Equity</p>
                            <p className={`text-sm font-medium ${acc.equity >= acc.balance ? "text-green-500" : "text-red-500"}`}>
                              ${acc.equity.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{acc.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${acc.progress >= 70 ? "bg-green-500" : acc.progress >= 40 ? "bg-yellow-500" : "bg-red-500"}`}
                              style={{ width: `${acc.progress}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity - 1 card dengan 4 items */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-white">🔄 Recent Activity</h2>
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-sm p-0">
                  View All <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <Card className="bg-darkcard border-gray-800 h-full">
                <CardContent className="pt-3">
                  <div className="space-y-2">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-darknavy/50">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                          {activity.user.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm">{activity.action}</p>
                          <p className="text-xs text-gray-400">{activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 4. Account Overview (3 cards) + Payouts Request (4 items) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Account Overview - 3 cards */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">📊 Account Overview</h2>
              <div className="grid grid-cols-3 gap-3">
                {overview.map((item) => (
                  <Card key={item.label} className={`${item.bg} border-gray-800`}>
                    <CardContent className="pt-3 text-center">
                      <item.icon className={`h-6 w-6 ${item.color} mx-auto mb-1`} />
                      <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.percent}%</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Payouts Request - 4 items dalam 1 card */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-white">💰 Payouts Request</h2>
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-sm p-0">
                  View All <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <Card className="bg-darkcard border-gray-800">
                <CardContent className="pt-3">
                  <div className="space-y-2">
                    {payouts.map((payout, index) => (
                      <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-darknavy/50">
                        <div>
                          <p className="text-white text-sm font-medium">{payout.user}</p>
                          <p className="text-xs text-gray-400">{payout.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className={`font-bold ${payout.color === "green" ? "text-green-500" : payout.color === "orange" ? "text-orange-500" : "text-red-500"}`}>
                            ${payout.amount}
                          </p>
                          {getPayoutStatus(payout.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 5. News (3 items) */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-white">📢 Latest News</h2>
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-sm p-0">
                View All <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {news.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="bg-darkcard border-gray-800 hover:border-blue-500/30 transition-colors">
                    <CardContent className="pt-3">
                      <div className="flex items-start gap-3">
                        <div className="p-1 rounded-lg bg-blue-500/20">
                          <Calendar className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-gray-400">{item.excerpt}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 6. Color Palette (4 cards) + Affiliate Program */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Color Palette - 4 cards */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">🎨 Color Palette</h2>
              <div className="grid grid-cols-2 gap-3">
                {colorCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="bg-darkcard border-gray-800">
                      <CardContent className="pt-3 text-center">
                        <div className={`p-2 rounded-lg bg-blue-500/10 inline-block mb-2`}>
                          <card.icon className={`h-5 w-5 ${card.color}`} />
                        </div>
                        <p className="text-white text-sm font-medium">{card.title}</p>
                        <p className="text-xs text-gray-400">{card.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Affiliate Program */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">🤝 Affiliate Program</h2>
              <Card className="bg-darkcard border-gray-800 h-full">
                <CardContent className="pt-3">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 mb-3">
                    <p className="text-gray-300 text-sm">Earn up to <span className="text-purple-400 font-bold">15% commission</span> for every referral</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-400 text-xs">Total Referrals</p>
                      <p className="text-xl font-bold text-white">12</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Commission Earned</p>
                      <p className="text-xl font-bold text-green-500">$750</p>
                    </div>
                  </div>
                  <Button className="w-full mt-3 bg-purple-500 hover:bg-purple-600 text-sm">
                    Go to Affiliate Dashboard
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 7. Logout Button */}
          <div className="mt-6">
            <Button
              onClick={() => {
                localStorage.removeItem("userEmail");
                router.push("/login");
              }}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
            >
              Logout
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
}