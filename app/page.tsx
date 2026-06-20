"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp, TrendingDown, Wallet, Users, Gift, ArrowUpRight,
  Calendar, CheckCircle, Clock, Award, Zap, Eye, PlusCircle,
  Shield, Share2, Megaphone, Activity, Trophy, UserCheck,
  BarChart3, Star, DollarSign, Globe,
  LayoutDashboard, FolderKanban, Settings, LogOut,
  LineChart, CandlestickChart
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      // User logged in, but we show landing page anyway
    }
    setLoading(false);
  }, []);

  const stats = [
    { value: "50,000+", label: "Traders Worldwide", icon: Users },
    { value: "$10M+", label: "Total Payouts", icon: DollarSign },
    { value: "180+", label: "Countries", icon: Globe },
    { value: "99.9%", label: "Payout Success", icon: CheckCircle },
    { value: "24h", label: "Payouts Processed", icon: Clock },
  ];

  const challenges = [
    { size: "$5,000", price: 49, originalPrice: 50, target: "8%", dailyLoss: "5%", totalLoss: "10%" },
    { size: "$10,000", price: 89, originalPrice: 100, target: "8%", dailyLoss: "5%", totalLoss: "10%" },
    { size: "$25,000", price: 179, originalPrice: 219, target: "8%", dailyLoss: "5%", totalLoss: "10%" },
    { size: "$50,000", price: 299, originalPrice: 369, target: "8%", dailyLoss: "5%", totalLoss: "10%" },
  ];

  const features = [
    { icon: Shield, title: "Fair Rules", desc: "Transparent and trader friendly rules." },
    { icon: Zap, title: "Fast Payouts", desc: "Payouts processed within 24 hours." },
    { icon: Headset, title: "24/7 Support", desc: "Our support team is always here to help." },
    { icon: BarChart3, title: "Advanced Platform", desc: "Trade on MT5 with low spreads." },
    { icon: Users, title: "Global Community", desc: "Join our global trading community." },
  ];

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-black"><p className="text-gray-400">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/10" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
                🚀 Trusted by Traders Worldwide
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4">
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
                    Start Challenge
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
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
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
              <div className="glass rounded-2xl p-4 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-400 text-sm ml-2">Dashboard Preview</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-purple-500/20 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-white">$50K</p>
                    <p className="text-xs text-gray-400">Balance</p>
                  </div>
                  <div className="bg-green-500/20 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-500">+$2,684</p>
                    <p className="text-xs text-gray-400">Profit</p>
                  </div>
                  <div className="bg-blue-500/20 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-blue-400">12</p>
                    <p className="text-xs text-gray-400">Trades</p>
                  </div>
                </div>
                <div className="h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-full h-10 flex items-end gap-1 px-2">
                    {[30, 45, 35, 60, 50, 75, 65, 85, 70, 55, 40, 65].map((h, i) => (
                      <div key={i} className="flex-1 bg-purple-500/40 rounded-t" style={{ height: `${h}%` }} />
                    ))}
                  </div>
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
      <section className="py-20 bg-darknavy/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-3 bg-purple-500/20 text-purple-400 border-purple-500/30">Challenges</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Choose Your Challenge</h2>
            <p className="text-gray-400 mt-2">Select the account size that fits your trading style.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, i) => (
              <motion.div
                key={challenge.size}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white">{challenge.size}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">${challenge.price}</span>
                      <span className="text-gray-400 line-through">${challenge.originalPrice}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Profit Target</span>
                        <span className="text-white">{challenge.target}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Daily Drawdown</span>
                        <span className="text-white">{challenge.dailyLoss}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Overall Drawdown</span>
                        <span className="text-white">{challenge.totalLoss}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Leverage</span>
                        <span className="text-white">1:100</span>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
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
            <Card className="glass-card border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <Badge className="mb-2 bg-purple-500/20 text-purple-400 border-purple-500/30">Instant Funding</Badge>
                  <h3 className="text-xl font-bold text-white">Skip the Challenge</h3>
                  <p className="text-gray-400">Get funded instantly. No challenge required.</p>
                </div>
                <Link href="/instant-account">
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8">
                    Get Instant Account <ArrowUpRight className="ml-2 h-4 w-4" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="glass-card text-center hover:border-purple-500/30 transition-all duration-300">
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

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-purple-500/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Trading?
            </h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Join thousands of traders who have already gotten funded.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-lg rounded-xl">
                  Start Your Challenge
                </Button>
              </Link>
              <Link href="/instant-account">
                <Button variant="outline" className="border-purple-500/50 text-white hover:bg-purple-500/20 px-8 py-6 text-lg rounded-xl">
                  Get Instant Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}