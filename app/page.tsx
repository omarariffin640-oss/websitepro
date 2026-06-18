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
  PauseCircle, Award, Zap,
  Eye, PlusCircle, Shield,
  Share2, Megaphone, Activity,
  Palette, Trophy
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
    { title: "Total Balance", subtitle: "All accounts combined", value: "$104,230", icon: Wallet, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Total Profit", subtitle: "All time profit", value: "+$8,450", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Total Accounts", subtitle: "All user accounts", value: "3,718", icon: FolderKanban, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Active Accounts", subtitle: "Currently active traders", value: "1,807", icon: Users, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  const myAccounts = [
    { id: "#100001", name: "$10K Challenge", balance: 10540, equity: 10637, status: "Active", progress: 72 },
    { id: "#100002", name: "$5K Instant", balance: 5000, equity: 5200, status: "Active", progress: 100 },
    { id: "#100003", name: "$10K Standard", balance: 10000, equity: 9800, status: "Pause", progress: 45 },
    { id: "#100004", name: "$25K Pro", balance: 25000, equity: 25000, status: "Failed", progress: 0 },
  ];

  const activities = [
    { user: "Ali Noor", action: "Completed Challenge Step 1", time: "2 hours ago" },
    { user: "Sarah Tan", action: "Requested Payout $2,500", time: "5 hours ago" },
    { user: "John Lim", action: "Started New Challenge", time: "1 day ago" },
    { user: "Ahmad Faiz", action: "Deposited $5,000", time: "2 days ago" },
    { user: "Ravi Kumar", action: "Passed KYC Verification", time: "3 days ago" },
  ];

  const overview = [
    { label: "Active", value: 3, percent: 60, color: "text-blue-500", bg: "bg-blue-500/20", dot: "bg-blue-500" },
    { label: "Pause", value: 1, percent: 20, color: "text-orange-500", bg: "bg-orange-500/20", dot: "bg-orange-500" },
    { label: "Failed", value: 1, percent: 20, color: "text-red-500", bg: "bg-red-500/20", dot: "bg-red-500" },
  ];

  const news = [
    { title: "New Trading Rules Update", date: "May 15, 2025", icon: Megaphone, color: "text-blue-400" },
    { title: "Memorial Day Payout Schedule", date: "May 29, 2024", icon: Calendar, color: "text-yellow-400" },
    { title: "New Affiliate Program Launched", date: "May 10, 2024", icon: Share2, color: "text-purple-400" },
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
            <Card className="bg-gradient-to-r from-orange-500/40 to-red-500/40 border-2 border-orange-500/50">
              <CardContent className="py-10 px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-8">
                    <div className="p-6 rounded-full bg-orange-500/50">
                      <Gift className="h-16 w-16 text-orange-300" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">🎉 Special Offer!</h3>
                      <p className="text-gray-200 text-lg">Get 20% OFF on all Instant Accounts</p>
                      <p className="text-gray-300 text-base mt-1">Use code <Badge className="bg-orange-500/30 text-orange-300 border-orange-500/40 text-base px-4 py-1.5">INSTANT20</Badge></p>
                    </div>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600 shrink-0 text-base px-10 py-6">
                    Claim Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 2. Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="bg-darkcard border-gray-700">
                  <CardContent className="pt-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">{stat.title}</p>
                        <p className="text-base font-bold text-white">{stat.value}</p>
                        {stat.subtitle && <p className="text-xs text-gray-500">{stat.subtitle}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 3. My Accounts + Recent Activity */}
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
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="border-b border-gray-700">
                        <tr>
                          <th className="pb-2 text-xs text-gray-400 font-medium">Account</th>
                          <th className="pb-2 text-xs text-gray-400 font-medium">Type</th>
                          <th className="pb-2 text-xs text-gray-400 font-medium">Balance</th>
                          <th className="pb-2 text-xs text-gray-400 font-medium">Equity</th>
                          <th className="pb-2 text-xs text-gray-400 font-medium">Status</th>
                          <th className="pb-2 text-xs text-gray-400 font-medium">Progress</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {myAccounts.map((acc) => (
                          <tr key={acc.id} className="hover:bg-gray-800/30 transition-colors">
                            <td className="py-2 text-white text-sm font-mono">{acc.id}</td>
                            <td className="py-2 text-gray-300 text-sm">{acc.name}</td>
                            <td className="py-2 text-white text-sm">${acc.balance.toLocaleString()}</td>
                            <td className={`py-2 text-sm ${acc.equity >= acc.balance ? "text-green-500" : "text-red-500"}`}>
                              ${acc.equity.toLocaleString()}
                            </td>
                            <td className="py-2">{getStatusBadge(acc.status)}</td>
                            <td className="py-2">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                  <div className={`h-full rounded-full ${acc.progress >= 70 ? "bg-green-500" : acc.progress >= 40 ? "bg-yellow-500" : "bg-red-500"}`}
                                    style={{ width: `${acc.progress}%` }} />
                                </div>
                                <span className="text-xs text-gray-400">{acc.progress}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

          {/* 4. Account Overview + Affiliate + News */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Account Overview */}
            <Card className="bg-darkcard border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">📊 Account Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {overview.map((item) => (
                    <div key={item.label} className={`p-3 rounded-lg ${item.bg} border text-center`}>
                      <div className="flex items-center justify-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.dot}`}></div>
                        <span className="text-white text-xs font-medium">{item.label}</span>
                      </div>
                      <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                      <p className="text-xs text-gray-400">{item.percent}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Affiliate Summary */}
            <Card className="bg-darkcard border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white text-lg">🤝 Affiliate Summary</CardTitle>
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-xs p-0">
                    View <ArrowUpRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-darknavy/50">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center">
                        <Users className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Referrals</p>
                        <p className="text-white font-bold">128</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs">Earnings</p>
                      <p className="text-green-500 font-bold">$1,250.75</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-darknavy/50">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center">
                        <Clock className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Pending</p>
                        <p className="text-white font-bold">$320.50</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs">Total</p>
                      <p className="text-blue-500 font-bold">$1,571.25</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Latest News */}
            <Card className="bg-darkcard border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white text-lg">📢 Latest News</CardTitle>
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-xs p-0">
                    View <ArrowUpRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {news.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-darknavy/50">
                      <div className="p-1.5 rounded-lg bg-blue-500/20 shrink-0">
                        <item.icon className={`h-3 w-3 ${item.color}`} />
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium">{item.title}</p>
                        <p className="text-xs text-gray-400">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 5. Color Palette */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {/* Color Palette */}
            <Card className="bg-darkcard border-gray-800">
              <CardContent className="pt-4">
                <h4 className="text-white font-semibold text-sm mb-3">🎨 Color Palette</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#0F172A] border border-gray-700"></div>
                    <span className="text-gray-300 text-xs">#0F172A - Background</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#F59E0B] border border-gray-700"></div>
                    <span className="text-gray-300 text-xs">#F59E0B - Accent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#3B82F6] border border-gray-700"></div>
                    <span className="text-gray-300 text-xs">#3B82F6 - Primary Blue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#22C55E] border border-gray-700"></div>
                    <span className="text-gray-300 text-xs">#22C55E - Success Green</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#EF4444] border border-gray-700"></div>
                    <span className="text-gray-300 text-xs">#EF4444 - Danger Red</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why This Color? */}
            <Card className="bg-darkcard border-gray-800">
              <CardContent className="pt-4">
                <h4 className="text-white font-semibold text-sm mb-3">💡 Why This Color?</h4>
                <div className="space-y-2">
                  {["Easy on the eyes for long trading hours", "Professional & modern look", "Clean and minimal layout", "Trustworthy and reliable", "High contrast for readability"].map((text, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-xs">{text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Features */}
            <Card className="bg-darkcard border-gray-800">
              <CardContent className="pt-4">
                <h4 className="text-white font-semibold text-sm mb-3">⚡ Key Features</h4>
                <div className="grid grid-cols-2 gap-1">
                  {["Real-time monitor", "Certificates", "Secure payouts", "Market prices", "KYC Verification", "Multiple Challenges", "Affiliate Program", "Instant Funding", "News & Updates", "And more..."].map((feature, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Activity className="h-3 w-3 text-blue-400" />
                      <span className="text-gray-300 text-xs">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Affiliate Program */}
            <Card className="bg-darkcard border-gray-800">
              <CardContent className="pt-4">
                <h4 className="text-white font-semibold text-sm mb-3">🤝 Affiliate Program</h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-center">
                    <p className="text-purple-400 font-bold text-lg">15%</p>
                    <p className="text-gray-300 text-xs">Commission for every referral</p>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-darknavy/50">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300 text-xs">Total Referrals</span>
                    </div>
                    <span className="text-white font-bold text-sm">128</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-darknavy/50">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-xs">Commission Earned</span>
                    </div>
                    <span className="text-green-500 font-bold text-sm">$1,250.75</span>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-sm py-2">
                    Go to Affiliate Dashboard <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}