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
  Wallet, TrendingUp, FolderKanban, Users,
  Gift, ArrowUpRight, Calendar, CheckCircle, Clock, AlertCircle,
  PauseCircle, Copy, ExternalLink, Award, Zap, BarChart3,
  Eye, PlusCircle, CreditCard, Send, Download, Shield,
  Star, Share2, Megaphone, PenSquare, Store, Activity, Palette
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

  // Stats Cards Data (4 cards)
  const stats = [
    { title: "Total Balance", value: "$104,230", icon: Wallet, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Total Profit", value: "+$8,450", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Total Accounts", value: "3,718", icon: FolderKanban, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Active Accounts", value: "1,807", icon: Users, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  // My Accounts (4 items dalam 1 card)
  const myAccounts = [
    { id: "#123456", name: "10K Challenge", balance: 105340, status: "Active", progress: 72 },
    { id: "#123457", name: "Instant $5K", balance: 5200, status: "Active", progress: 100 },
    { id: "#123458", name: "Standard $10K", balance: 9800, status: "Pause", progress: 45 },
    { id: "#123459", name: "Pro $25K", balance: 25000, status: "Failed", progress: 0 },
  ];

  // Recent Activity (5 items dalam 1 card)
  const activities = [
    { user: "Ali Noor", action: "Completed Challenge Step 1", time: "2 hours ago" },
    { user: "Sarah Tan", action: "Requested Payout $2,500", time: "5 hours ago" },
    { user: "John Lim", action: "Started New Challenge", time: "1 day ago" },
    { user: "Ahmad Faiz", action: "Deposited $5,000", time: "2 days ago" },
    { user: "Ravi Kumar", action: "Passed KYC Verification", time: "3 days ago" },
  ];

  // Account Overview (3 cards)
  const overview = [
    { label: "Active", value: 3, total: 5, percent: 60, color: "text-blue-500", bg: "bg-blue-500/20", icon: CheckCircle },
    { label: "Pause", value: 1, total: 5, percent: 20, color: "text-orange-500", bg: "bg-orange-500/20", icon: PauseCircle },
    { label: "Failed", value: 1, total: 5, percent: 20, color: "text-red-500", bg: "bg-red-500/20", icon: AlertCircle },
  ];

  // Affiliate Summary (1 card)
  const affiliateData = {
    referrals: 12,
    commission: 750,
    rate: 15
  };

  // Latest News (3 cards)
  const news = [
    { title: "🎉 New Challenge", excerpt: "Step 1 & Step 2 are now live!", date: "2026-06-14" },
    { title: "📈 Trading Tips", excerpt: "Never risk more than 2% per trade.", date: "2026-06-13" },
    { title: "⚡ Payout Update", excerpt: "Payouts processed within 24 hours.", date: "2026-06-12" },
  ];

  // Color Palette (4 cards)
  const colorCards = [
    { title: "Color Palette", icon: Palette, description: "Blue, Orange, Red, Green", color: "text-blue-500" },
    { title: "Why This Color?", icon: Eye, description: "Professional, Trust, Modern", color: "text-purple-500" },
    { title: "Key Features", icon: Zap, description: "Fast, Secure, Reliable", color: "text-orange-500" },
    { title: "Affiliate Program", icon: Share2, description: "Earn 15% commission", color: "text-green-500" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active": return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Active</Badge>;
      case "Pause": return <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">Pause</Badge>;
      case "Failed": return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Failed</Badge>;
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
            <Card className="bg-gradient-to-r from-orange-500/30 to-red-500/30 border border-orange-500/40">
              <CardContent className="py-5 px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <div className="p-3 rounded-full bg-orange-500/40">
                      <Gift className="h-7 w-7 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">🎉 Special Offer!</h3>
                      <p className="text-gray-300 text-sm">Get 20% OFF on all Instant Accounts. Use code <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">INSTANT20</Badge></p>
                    </div>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600 shrink-0 text-base px-6 py-3">
                    Claim Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 2. Stats Cards (4 cards) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
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

          {/* 3. My Accounts (1 card) + Recent Activity (1 card) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* My Accounts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-darkcard border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white text-lg">📁 My Accounts</CardTitle>
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-sm p-0">
                      View All <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {myAccounts.map((acc) => (
                      <div key={acc.id} className="flex justify-between items-center p-2 rounded-lg bg-darknavy/50">
                        <div>
                          <p className="text-xs text-gray-400">{acc.id}</p>
                          <p className="text-sm font-medium text-white">{acc.name}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-medium text-white">${acc.balance.toLocaleString()}</p>
                          {getStatusBadge(acc.status)}
                        </div>
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
              transition={{ duration: 0.5, delay: 0.15 }}
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
                  <div className="space-y-1">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-1.5 rounded-lg bg-darknavy/50">
                        <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
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

          {/* 4. Account Overview (3 cards) + Affiliate Summary (1 card) + Latest News (3 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Account Overview - 3 cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-darkcard border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">📊 Account Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {overview.map((item) => (
                      <div key={item.label} className={`p-3 rounded-lg ${item.bg} flex justify-between items-center`}>
                        <div className="flex items-center gap-3">
                          <item.icon className={`h-5 w-5 ${item.color}`} />
                          <div>
                            <p className="text-white font-medium">{item.label}</p>
                            <p className="text-xs text-gray-400">{item.value} of {item.total}</p>
                          </div>
                        </div>
                        <p className={`text-xl font-bold ${item.color}`}>{item.percent}%</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Affiliate Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Card className="bg-darkcard border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white text-lg">🤝 Affiliate Summary</CardTitle>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">15%</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30">
                      <p className="text-gray-300 text-sm">Earn up to <span className="text-purple-400 font-bold">15% commission</span> for every referral</p>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-400 text-xs">Referrals</p>
                        <p className="text-xl font-bold text-white">{affiliateData.referrals}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Commission</p>
                        <p className="text-xl font-bold text-green-500">${affiliateData.commission}</p>
                      </div>
                      <Button className="bg-purple-500 hover:bg-purple-600 text-sm">
                        Go
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Latest News - 3 items dalam 1 card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
                      <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-darknavy/50">
                        <div className="p-1 rounded-lg bg-blue-500/20 shrink-0">
                          <Calendar className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-gray-400">{item.excerpt}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* 6. Color Palette (4 cards) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {colorCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
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
      </main>
    </div>
  );
}