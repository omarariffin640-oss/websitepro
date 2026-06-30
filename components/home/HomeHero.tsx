import Link from "next/link";
import {
    ArrowRight,
    ShieldCheck,
    TrendingUp,
    Wallet,
    Award,
    Activity,
    ShoppingBag,
    Trophy,
    Settings,
    LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomeHero() {
    return (
        <section className="relative overflow-hidden px-4 pb-20 pt-24 md:pb-24 md:pt-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.24),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_28%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
                <div>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                        <Activity className="h-4 w-4" />
                        Premium Prop Firm Funding
                    </div>

                    <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
                        Get funded up to{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                            $200,000
                        </span>{" "}
                        and trade with confidence.
                    </h1>

                    <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-400">
                        Noor Funding helps disciplined traders prove skill, manage risk, and
                        earn payouts through a clean funded trading experience.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/register">
                            <Button className="h-12 rounded-xl bg-violet-600 px-6 text-white hover:bg-violet-700">
                                Start Challenge <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>

                        <Link href="/login">
                            <Button
                                variant="outline"
                                className="h-12 rounded-xl border-white/10 bg-zinc-950/70 px-6 text-white hover:bg-white/5"
                            >
                                Login
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                        {[
                            ["90%", "Profit Split"],
                            ["24h", "Payout Review"],
                            ["No", "Time Limits"],
                            ["$200K", "Max Capital"],
                        ].map(([value, label]) => (
                            <div
                                key={label}
                                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                            >
                                <p className="text-xl font-bold text-white">{value}</p>
                                <p className="text-xs text-zinc-500">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4 shadow-2xl shadow-violet-950/30">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-white">
                                Dashboard Preview
                            </p>
                            <p className="text-xs text-zinc-500">Live user dashboard demo</p>
                        </div>

                        <div className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-400">
                            Demo
                        </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[145px_1fr]">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                            {[
                                ["Dashboard", Activity],
                                ["Challenges", Trophy],
                                ["Instant", ShieldCheck],
                                ["Marketplace", ShoppingBag],
                                ["Payouts", Wallet],
                                ["Certificates", Award],
                                ["Leaderboard", TrendingUp],
                                ["Settings", Settings],
                            ].map(([label, Icon]: any) => (
                                <div
                                    key={label}
                                    className="mb-2 flex items-center gap-2 rounded-xl px-2 py-2 text-xs text-zinc-400 first:bg-violet-500/15 first:text-white"
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    {label}
                                </div>
                            ))}

                            <div className="mt-4 flex items-center gap-2 rounded-xl px-2 py-2 text-xs text-red-400">
                                <LogOut className="h-3.5 w-3.5" />
                                Logout
                            </div>
                        </div>

                        <div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    ["Current Balance", "$50,000"],
                                    ["Weekly Profit", "+$2,684"],
                                    ["Win Rate", "72%"],
                                    ["Total Trades", "148"],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                                    >
                                        <p className="text-xs text-zinc-500">{label}</p>
                                        <p className="mt-1 text-sm font-semibold text-white">
                                            {value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 h-40 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/5 p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <p className="text-xs text-zinc-400">
                                        Performance Analytics
                                    </p>
                                    <p className="text-xs text-emerald-400">+5.36%</p>
                                </div>

                                <svg viewBox="0 0 500 130" className="h-full w-full">
                                    <path
                                        d="M0 100 C55 78 92 92 135 70 C182 45 210 80 255 50 C300 22 340 46 382 28 C430 8 460 22 500 12"
                                        fill="none"
                                        stroke="#8b5cf6"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M0 100 C55 78 92 92 135 70 C182 45 210 80 255 50 C300 22 340 46 382 28 C430 8 460 22 500 12"
                                        fill="none"
                                        stroke="#22d3ee"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        opacity="0.35"
                                    />
                                </svg>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                {[
                                    ["Challenge", "Step 1"],
                                    ["Platform", "MT5"],
                                    ["Drawdown", "2.1%"],
                                    ["Payout Status", "Locked"],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                                    >
                                        <p className="text-xs text-zinc-500">{label}</p>
                                        <p className="mt-1 text-sm text-white">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}