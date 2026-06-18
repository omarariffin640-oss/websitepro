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
  Users, UserCheck, Wallet, Clock, FolderKanban,
  Star, TrendingUp, Gift, ArrowUpRight, Calendar,
  MessageCircle, Award, Zap, Activity, BarChart3
} from "lucide-react";

// Sample data
const stats = [
  { title: "Total Users", value: "2,451", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Active Users", value: "1,807", icon: UserCheck, color: "text-green-500", bg: "bg-green-500/10" },
  { title: "Total Payouts", value: "$1,247,850", icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { title: "Pending Payouts", value: "$234,850", icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { title: "Total Accounts", value: "3,718", icon: FolderKanban, color: "text-purple-500", bg: "bg-purple-500/10" },
];

const accounts = [
  { id: 1, name: "Standard Account", balance: 5000, status: "Active" },
  { id: 2, name: "Premium Account", balance: 15000, status: "Active" },
  { id: 3, name: "Challenge Account", balance: 10000, status: "Pending" },
];

const activities = [
  { id: 1, user: "Ali Noor", action: "Completed Challenge Step 1", time: "2 hours ago" },
  { id: 2, user: "Sarah Tan", action: "Requested Payout $2,500", time: "5 hours ago" },
  { id: 3, user: "John Lim", action: "Started New Challenge", time: "1 day ago" },
];

const affiliates = [
  { id: 1, name: "Ali Noor", referrals: 12, commission: 450 },
  { id: 2, name: "Sarah Tan", referrals: 8, commission: 300 },
];

const latestNews = [
  { id: 1, title: "🎉 New Challenge Available", excerpt: "Step 1 & Step 2 are now live!", date: "2026-06-14" },
  { id: 2, title: "📈 Trading Tips: Risk Management", excerpt: "Never risk more than 2% per trade.", date: "2026-06-13" },
  { id: 3, title: "⚡ Payout Update", excerpt: "Payouts processed within 24 hours.", date: "2026-06-12" },
];

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
          <h1 className="text-2xl font-bold text-white mb-4">Dashboard</h1>

          {/* 1. Special Offer Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
              <CardContent className="py-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-orange-500/30">
                      <Gift className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">🎉 Special Offer!</h3>
                      <p className="text-gray-300 text-sm">Get 20% off on all challenge accounts. Use code <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">PROP20</Badge></p>
                    </div>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600 shrink-0">
                    Claim Offer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 2. Statistics Cards (5 cards) */}
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

          {/* 3. My Accounts + 4. Recent Activity (2 columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* My Accounts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-darkcard border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white text-lg">💰 My Accounts</CardTitle>
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-sm p-0">
                      View All <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {accounts.map((account) => (
                      <div key={account.id} className="flex justify-between items-center p-2 rounded-lg bg-darknavy/50">
                        <div>
                          <p className="text-white text-sm font-medium">{account.name}</p>
                          <p className="text-xs text-gray-400">Balance: ${account.balance.toLocaleString()}</p>
                        </div>
                        <Badge className={account.status === "Active" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"}>
                          {account.status}
                        </Badge>
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
              transition={{ duration: 0.5, delay: 0.3 }}
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
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg bg-darknavy/50">
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

          {/* 5. Affiliate Summary + 6. Latest News (2 columns) */}
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
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-sm p-0">
                      View All <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {affiliates.map((affiliate) => (
                      <div key={affiliate.id} className="flex justify-between items-center p-2 rounded-lg bg-darknavy/50">
                        <div>
                          <p className="text-white text-sm font-medium">{affiliate.name}</p>
                          <p className="text-xs text-gray-400">{affiliate.referrals} referrals</p>
                        </div>
                        <p className="text-green-500 text-sm font-bold">${affiliate.commission}</p>
                      </div>
                    ))}
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <p className="text-gray-400 text-sm">Total Commission: <span className="text-green-500 font-bold">$750</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Latest News */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
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
                    {latestNews.map((news) => (
                      <div key={news.id} className="flex items-start gap-3 p-2 rounded-lg bg-darknavy/50">
                        <div className="p-1 rounded-lg bg-blue-500/20">
                          <Calendar className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{news.title}</p>
                          <p className="text-xs text-gray-400">{news.excerpt}</p>
                          <p className="text-xs text-gray-500 mt-1">{news.date}</p>
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