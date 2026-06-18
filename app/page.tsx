"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import {
  Wallet, TrendingUp, FolderKanban, DollarSign, Users,
  Star, Gift, ArrowUpRight, Calendar, BarChart3,
  Award, Zap, Clock, CheckCircle, AlertCircle, PauseCircle,
  Copy, ExternalLink
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

  // My Accounts Data
  const myAccounts = [
    { id: "#123456", name: "10K Challenge", balance: 105340, equity: 105340, status: "active", progress: 72 },
    { id: "#123457", name: "Instant $5K", balance: 5000, equity: 5200, status: "active", progress: 100 },
    { id: "#123458", name: "Standard $10K", balance: 10000, equity: 9800, status: "pause", progress: 45 },
    { id: "#123459", name: "Pro $25K", balance: 25000, equity: 25000, status: "failed", progress: 0 },
  ];

  // Account Overview
  const overview = [
    { label: "Active", value: 3, total: 5, percent: 60, color: "text-blue-500", bg: "bg-blue-500/20" },
    { label: "Pause", value: 1, total: 5, percent: 20, color: "text-orange-500", bg: "bg-orange-500/20" },
    { label: "Failed", value: 1, total: 5, percent: 20, color: "text-red-500", bg: "bg-red-500/20" },
  ];

  // Recent Activity
  const activities = [
    { user: "Ali Noor", action: "Completed Challenge Step 1", time: "2 hours ago" },
    { user: "Sarah Tan", action: "Requested Payout $2,500", time: "5 hours ago" },
    { user: "John Lim", action: "Started New Challenge", time: "1 day ago" },
    { user: "Ahmad Faiz", action: "Deposited $5,000", time: "2 days ago" },
  ];

  // Latest News
  const news = [
    { title: "🎉 New Challenge Available", excerpt: "Step 1 & Step 2 are now live!", date: "2026-06-14" },
    { title: "📈 Trading Tips: Risk Management", excerpt: "Never risk more than 2% per trade.", date: "2026-06-13" },
    { title: "⚡ Payout Update", excerpt: "Payouts processed within 24 hours.", date: "2026-06-12" },
  ];

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

          {/* 2. Stats Cards (5 cards) */}
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

          {/* 3. My Accounts (4 cards) */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-white">📁 My Accounts</h2>
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-sm p-0">
                View All <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {myAccounts.map((acc, index) => (
                <motion.div
                  key={acc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <Card className="bg-darkcard border-gray-800 hover:border-gray-700 transition-colors">
                    <CardContent className="pt-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-gray-400">{acc.id}</p>
                          <p className="text-sm font-medium text-white">{acc.name}</p>
                        </div>
                        <Badge className={`
                                                    ${acc.status === "active" ? "bg-green-500/20 text-green-500" : ""}
                                                    ${acc.status === "pause" ? "bg-orange-500/20 text-orange-500" : ""}
                                                    ${acc.status === "failed" ? "bg-red-500/20 text-red-500" : ""}
                                                `}>
                          {acc.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Balance</span>
                          <span className="text-white font-medium">${acc.balance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Equity</span>
                          <span className={`font-medium ${acc.equity >= acc.balance ? "text-green-500" : "text-red-500"}`}>
                            ${acc.equity.toLocaleString()}
                          </span>
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

          {/* 4. Account Overview + Recent Activity + Affiliate + News (2 columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Account Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-darkcard border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">📊 Accounts Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {overview.map((item) => (
                      <div key={item.label} className={`p-3 rounded-lg ${item.bg} text-center`}>
                        <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.percent}%</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <Card className="bg-darkcard border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white text-lg">🔄 Recent Activity</CardTitle>
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-sm p-0">
                      View All <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
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
            </motion.div>
          </div>

          {/* 5. Affiliate Summary + Latest News */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Affiliate Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-darkcard border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white text-lg">🤝 Affiliate Summary</CardTitle>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Earn 15%</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 mb-3">
                    <p className="text-gray-300 text-sm">Earn up to <span className="text-purple-400 font-bold">15% commission</span> for every referral</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Total Referrals</p>
                      <p className="text-xl font-bold text-white">12</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Commission Earned</p>
                      <p className="text-xl font-bold text-green-500">$750</p>
                    </div>
                    <Button className="bg-purple-500 hover:bg-purple-600 text-sm">
                      Go to Affiliate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Latest News */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Card className="bg-darkcard border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white text-lg">📢 Latest News</CardTitle>
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-sm p-0">
                      View All <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {news.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-2 rounded-lg bg-darknavy/50">
                        <div className="p-1 rounded-lg bg-blue-500/20">
                          <Calendar className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-gray-400">{item.excerpt}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}