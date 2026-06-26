import Link from "next/link";
import { ArrowRight, ShieldCheck, TrendingUp, Wallet, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomeHero() {
    return (
        <section className="relative overflow-hidden px-4 py-20 md:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_30%)]" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                <div>
                    <div className="mb-5 inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                        Premium Prop Firm Funding
                    </div>

                    <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
                        Trade with up to{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                            $200,000
                        </span>{" "}
                        funded capital.
                    </h1>

                    <p className="mt-5 max-w-xl text-lg text-zinc-400">
                        Noor Funding gives traders a clean path to prove skill, manage risk,
                        and earn payouts with transparent rules.
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
                                className="h-12 rounded-xl border-zinc-700 bg-zinc-950/60 px-6 text-white hover:bg-zinc-900"
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
                            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <p className="text-xl font-bold text-white">{value}</p>
                                <p className="text-xs text-zinc-500">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4 shadow-2xl shadow-violet-950/30">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-white">NOOR Platform</p>
                            <p className="text-xs text-zinc-500">Live account overview</p>
                        </div>
                        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                            Active
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {[
                            ["Balance", "$50,000"],
                            ["Equity", "$52,684"],
                            ["Profit", "+$2,684"],
                            ["Drawdown", "2.1%"],
                        ].map(([label, value]) => (
                            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <p className="text-xs text-zinc-500">{label}</p>
                                <p className="mt-1 font-semibold text-white">{value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 h-40 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/5 p-4">
                        <svg viewBox="0 0 500 140" className="h-full w-full">
                            <path
                                d="M0 105 C60 90 80 75 130 82 C190 92 210 35 270 45 C330 55 345 25 390 30 C440 34 455 18 500 20"
                                fill="none"
                                stroke="#8b5cf6"
                                strokeWidth="5"
                            />
                        </svg>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        {[
                            [ShieldCheck, "Account Login", "NOOR-125623"],
                            [TrendingUp, "Server", "NOOR-Live"],
                            [Wallet, "Payout", "Pending Review"],
                            [Award, "Certificate", "Eligible"],
                        ].map(([Icon, title, value]: any) => (
                            <div key={title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <Icon className="h-5 w-5 text-violet-400" />
                                <div>
                                    <p className="text-xs text-zinc-500">{title}</p>
                                    <p className="text-sm text-white">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}