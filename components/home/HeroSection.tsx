"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-black px-4 pb-20 text-white">
            <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[620px] lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                    <div className="mb-5 inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
                        Trade. Prove. Get Funded.
                    </div>

                    <h1 className="text-5xl font-bold leading-tight md:text-7xl">
                        Trade up to{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                            $200,000
                        </span>{" "}
                        funded capital
                    </h1>

                    <p className="mt-6 max-w-xl text-lg text-gray-400">
                        A modern prop firm platform built for serious traders with clear rules,
                        fast payouts, and real performance tracking.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/register">
                            <Button className="rounded-xl bg-purple-500 px-8 py-6 text-white hover:bg-purple-600">
                                Start Challenge
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>

                        <Link href="/login">
                            <Button
                                variant="outline"
                                className="rounded-xl border-white/15 px-8 py-6 text-white hover:bg-white/10"
                            >
                                Login
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl">
                        <MiniStat icon={ShieldCheck} label="Fair Rules" />
                        <MiniStat icon={Wallet} label="Fast Payouts" />
                        <MiniStat icon={TrendingUp} label="MT5 Ready" />
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-purple-500/10">
                    <div className="rounded-2xl border border-white/10 bg-black p-5">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Account Balance</p>
                                <h2 className="text-4xl font-bold">$50,000</h2>
                            </div>
                            <div className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                                Active
                            </div>
                        </div>

                        <div className="h-48 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/20 to-cyan-500/10 p-4">
                            <div className="flex h-full items-end gap-2">
                                {[40, 55, 46, 70, 62, 88, 76, 95].map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 rounded-t-lg bg-gradient-to-t from-purple-500 to-cyan-300"
                                        style={{ height: `${h}%` }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                            <Box label="Profit" value="+$2,684" />
                            <Box label="Win Rate" value="72%" />
                            <Box label="Days" value="8" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MiniStat({ icon: Icon, label }: { icon: any; label: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <Icon className="mb-2 h-5 w-5 text-purple-400" />
            <p className="text-sm text-gray-300">{label}</p>
        </div>
    );
}

function Box({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-bold text-white">{value}</p>
        </div>
    );
}