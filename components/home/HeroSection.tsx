"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck, Wallet, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#030308] px-4 py-20 text-white">
            <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[140px]" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[640px] lg:grid-cols-[1fr_1fr]">
                <div>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
                        <ShieldCheck className="h-4 w-4" />
                        The Modern Prop Firm
                    </div>

                    <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                        Trade. Prove.
                        <br />
                        <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                            Get Funded.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
                        Access simulated capital, track your performance, request payouts, and grow with a premium trader dashboard.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/register">
                            <Button className="rounded-xl bg-purple-500 px-8 py-6 text-white hover:bg-purple-600">
                                Start Challenge
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>

                        <Link href="/instant-account">
                            <Button variant="outline" className="rounded-xl border-white/15 px-8 py-6 text-white hover:bg-white/10">
                                Instant Account
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-300">
                        <MiniTrust text="Up to $200,000" />
                        <MiniTrust text="24h payout review" />
                        <MiniTrust text="MT5 ready" />
                    </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-purple-500/10">
                    <div className="rounded-[24px] border border-white/10 bg-[#07070d] p-5">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Welcome back, Omar Ariffin</p>
                                <h2 className="mt-1 text-2xl font-bold">Account Overview</h2>
                            </div>
                            <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs text-green-400">Active</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Stat label="Balance" value="$50,000" />
                            <Stat label="Equity" value="$52,752" />
                            <Stat label="Profit" value="+$2,752" />
                            <Stat label="Drawdown" value="2.1%" />
                        </div>

                        <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <p className="text-sm text-gray-400">Challenge Progress</p>
                                <p className="text-sm text-purple-300">55%</p>
                            </div>
                            <div className="h-3 rounded-full bg-white/10">
                                <div className="h-3 w-[55%] rounded-full bg-gradient-to-r from-purple-500 to-cyan-300" />
                            </div>
                        </div>

                        <div className="mt-4 space-y-3">
                            <Row icon={Wallet} label="Recent Payout" value="$1,250 Pending" />
                            <Row icon={BarChart3} label="Trading Account" value="NOOR-123456" />
                            <Row icon={CheckCircle} label="Rules Status" value="No Violations" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MiniTrust({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            {text}
        </div>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="mt-1 text-xl font-bold">{value}</p>
        </div>
    );
}

function Row({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center gap-2 text-gray-400">
                <Icon className="h-4 w-4 text-purple-400" />
                <span className="text-sm">{label}</span>
            </div>
            <span className="text-sm font-semibold text-white">{value}</span>
        </div>
    );
}