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
  Award, Zap, Eye, PlusCircle, Shield,
  Share2, Megaphone, Activity, Trophy, UserCheck, BarChart3, Star
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

  const stats = [
    { title: "Total Balance", value: "$104,230", icon: Wallet, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Total Profit", value: "+$8,450", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Total Accounts", value: "3,718", icon: FolderKanban, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Active Users", value: "1,807", icon: UserCheck, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  ];

  const myAccounts = [
    { id: "#100001", name: "10K Challenge", balance: 10540, status: "Active", progress: 72 },
    { id: "#100002", name: "5K Instant", balance: 5200, status: "Active", progress: 100 },
    { id: "#100003", name: "10K Standard", balance: 9800, status: "Pause", progress: 45 },
    { id: "#100004", name: "25K Pro", balance: 25000, status: "Failed", progress: 0 },
  ];

  const activities = [
    { user: "Ali Noor", action: "Completed Challenge Step 1", time: "2 hours ago" },
    { user: "Sarah Tan", action: "Requested Payout $2,500", time: "5 hours ago" },
    { user: "John Lim", action: "Started New Challenge", time: "1 day ago" },
    { user: "Ahmad Faiz", action: "Deposited $5,000", time: "2 days ago" },
  ];

  const overview = [
    { label: "Active", value: 3, percent: 60, color: "text-emerald-500", bg: "bg-emerald-500/20" },
    { label: "Pause", value: 1, percent: 20, color: "text-amber-500", bg: "bg-amber-500/20" },
    { label: "Failed", value: 1, percent: 20, color: "text-rose-500", bg: "bg-rose-500/20" },
  ];

  const reviews = [
    { name: "Ali Noor", text: "Best prop firm! Fast payout and excellent support.", rating: 5, time: "2 days ago" },
    { name: "Sarah Tan", text: "Challenges are fair and achievable. Highly recommended!", rating: 5, time: "5 days ago" },
  ];

  const news = [
    { title: "New Trading Rules Update", date: "May 15, 2025", icon: Megaphone },
    { title: "Memorial Day Payout Schedule", date: "May 29, 2024", icon: Calendar },
    { title: "Affiliate Program Launched", date: "May 10, 2024", icon: Share2 },
  ];

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-darknavy"><p className="text-gray-400">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-darknavy">
      <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lg:ml-64 pt-2">
        <div className="p-4 max-w-7xl mx-auto">

          {/* Special Offer Banner */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
            <Card className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 border border-blue-500/30">
              <CardContent className="py-4 px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Gift className="h-8 w-8 text-blue-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white">🎉 Special Offer</h3>
                      <p className="text-gray-300 text-sm">20% OFF all Instant Accounts • Code: <Badge className="bg-blue-500/20 text-blue-400">INSTANT20</Badge></p>
                    </div>
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-600">Claim Now</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
              <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                <Card className="bg-darkcard border-gray-800">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">{stat.title}</p>
                        <p className="text-xl font-bold text-white">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* My Accounts + Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Card className="bg-darkcard border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white text-lg">📁 My Accounts</CardTitle>
                    <Button variant="ghost" className="text-blue-400 text-sm p-0">View All <ArrowUpRight className="h-4 w-4 ml-1" /></Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {myAccounts.map((acc) => (
                      <div key={acc.id} className="flex items-center justify-between p-2 rounded-lg bg-darknavy/50 border border-gray-700 hover:border-blue-500/30 transition-colors">
                        <div>
                          <p className="text-xs text-gray-400">{acc.id}</p>
                          <p className="text-sm font-medium text-white">{acc.name}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-white text-sm font-medium">${acc.balance.toLocaleString()}</p>
                          <Badge className={acc.status === "Active" ? "bg-emerald-500/20 text-emerald-500" : acc.status === "Pause" ? "bg-amber-500/20 text-amber-500" : "bg-rose-500/20 text-rose-500"}>
                            {acc.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
              <Card className="bg-darkcard border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white text-lg">🔄 Recent Activity</CardTitle>
                    <Button variant="ghost" className="text-blue-400 text-sm p-0">View All <ArrowUpRight className="h-4 w-4 ml-1" /></Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {activities.map((activity, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-darknavy/50">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                          {activity.user.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white">{activity.action}</p>
                          <p className="text-xs text-gray-400">{activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Account Overview + Reviews + News */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="bg-darkcard border-gray-800">
                <CardHeader className="pb-2"><CardTitle className="text-white text-lg">📊 Account Overview</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {overview.map((item) => (
                      <div key={item.label} className={`p-3 rounded-lg ${item.bg} flex justify-between items-center`}>
                        <span className="text-white text-sm">{item.label}</span>
                        <span className={`text-lg font-bold ${item.color}`}>{item.value} ({item.percent}%)</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
              <Card className="bg-darkcard border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white text-lg">⭐ Reviews</CardTitle>
                    <Button variant="ghost" className="text-blue-400 text-sm p-0">View All <ArrowUpRight className="h-4 w-4 ml-1" /></Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {reviews.map((review, i) => (
                      <div key={i} className="p-3 rounded-lg bg-darknavy/50 border border-gray-700">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">
                            {review.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{review.name}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">"{review.text}"</p>
                        <p className="text-xs text-gray-500 mt-1">{review.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Card className="bg-darkcard border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white text-lg">📢 News</CardTitle>
                    <Button variant="ghost" className="text-blue-400 text-sm p-0">View <ArrowUpRight className="h-4 w-4 ml-1" /></Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {news.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-darknavy/50">
                        <div className="p-2 rounded-lg bg-blue-500/20"><item.icon className="h-4 w-4 text-blue-400" /></div>
                        <div className="flex-1">
                          <p className="text-sm text-white">{item.title}</p>
                          <p className="text-xs text-gray-400">{item.date}</p>
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