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
  MessageCircle, Award, Zap
} from "lucide-react";

type Payout = {
  id: number;
  trader: string;
  amount: number;
  rating: number;
  date: string;
  avatar?: string;
};

type Review = {
  id: number;
  name: string;
  text: string;
  rating: number;
  date: string;
};

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
};

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

  // Sample data (nanti connect ke database)
  const stats = [
    { title: "Total Users", value: "2,451", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Active Users", value: "1,807", icon: UserCheck, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Total Payouts", value: "$1,247,850", icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Pending Payouts", value: "$234,850", icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { title: "Total Accounts", value: "3,718", icon: FolderKanban, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const payouts: Payout[] = [
    { id: 1, trader: "Ali Noor", amount: 1830, rating: 5, date: "2026-06-11" },
    { id: 2, trader: "Sarah Tan", amount: 2450, rating: 5, date: "2026-06-10" },
    { id: 3, trader: "John Lim", amount: 1200, rating: 4, date: "2026-06-09" },
  ];

  const reviews: Review[] = [
    { id: 1, name: "Ahmad Faiz", text: "Best prop firm! Fast payout and great support.", rating: 5, date: "2026-06-10" },
    { id: 2, name: "Siti Nur", text: "Challenges are fair and achievable. Highly recommend!", rating: 4, date: "2026-06-08" },
    { id: 3, name: "Ravi Kumar", text: "Passed step 1 and step 2 easily. Now funded!", rating: 5, date: "2026-06-05" },
  ];

  const blogs: Blog[] = [
    { id: 1, title: "🎉 New Challenge Available", excerpt: "Step 1 & Step 2 challenges are now live!", date: "2026-06-14", category: "Announcement" },
    { id: 2, title: "📈 Trading Tips: Risk Management", excerpt: "Always use stop-loss and never risk more than 2% per trade.", date: "2026-06-13", category: "Tips" },
    { id: 3, title: "⚡ Payout Update", excerpt: "Payouts are now processed within 24 hours.", date: "2026-06-12", category: "Update" },
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

      <main className="lg:ml-64 pt-16">
        <div className="p-6 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="bg-darkcard border-gray-800 hover:border-gray-700 transition-colors">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${stat.bg}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">{stat.title}</p>
                        <p className="text-lg font-bold text-white">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Payouts Received */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">💰 Payouts Received</h2>
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-sm">
                View All <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {payouts.map((payout, index) => (
                <motion.div
                  key={payout.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="bg-darkcard border-gray-800 hover:border-green-500/30 transition-colors">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-500 text-white">
                            {payout.trader.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{payout.trader}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < payout.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-green-500 font-bold text-xl">${payout.amount.toLocaleString()}</p>
                        <p className="text-gray-500 text-sm">{payout.date}</p>
                      </div>
                      <Badge className="mt-2 bg-green-500/20 text-green-500 border-green-500/30">Payout Received</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reviews & Blog Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Reviews */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">⭐ Top Reviews</h2>
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-sm">
                  View All <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-3">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="bg-darkcard border-gray-800">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-purple-500 text-white">
                              {review.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-white">{review.name}</p>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-3 w-3 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}`} />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{review.text}</p>
                            <p className="text-gray-500 text-xs mt-1">{review.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Latest Blog */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">📢 Latest Blog</h2>
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-sm">
                  View All <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-3">
                {blogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="bg-darkcard border-gray-800 hover:border-blue-500/30 transition-colors cursor-pointer">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-blue-500/20">
                            <Calendar className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-white">{blog.title}</p>
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                {blog.category}
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{blog.excerpt}</p>
                            <p className="text-gray-500 text-xs mt-1">{blog.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Special Offer Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-orange-500/30">
                      <Gift className="h-8 w-8 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">🎉 Special Offer!</h3>
                      <p className="text-gray-300">Get 20% off on all challenge accounts this month. Use code <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">PROP20</Badge> at checkout</p>
                    </div>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600 shrink-0">
                    Claim Offer Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}