"use client";

import {
    LayoutDashboard,
    Wallet,
    Award,
    BarChart3,
    CheckCircle,
} from "lucide-react";

export default function PlatformPreview() {
    return (
        <section className="bg-black px-4 py-20 text-white">
            <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
                <div>
                    <p className="mb-3 text-sm font-medium text-purple-400">
                        Platform Preview
                    </p>

                    <h2 className="text-4xl font-bold md:text-5xl">
                        Everything a funded trader needs
                    </h2>

                    <p className="mt-4 max-w-xl text-gray-400">
                        Track your accounts, payouts, certificates, and trading performance from one clean dashboard.
                    </p>

                    <div className="mt-8 space-y-4">
                        <Feature icon={LayoutDashboard} text="Real dashboard for balance, profit and progress" />
                        <Feature icon={Wallet} text="Payout request and approval tracking" />
                        <Feature icon={Award} text="Certificate center for achievements" />
                        <Feature icon={BarChart3} text="MT5-ready structure for future sync" />
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-purple-500/10">
                    <div className="rounded-2xl border border-white/10 bg-black p-5">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Noor Dashboard</p>
                                <h3 className="text-2xl font-bold">Performance Overview</h3>
                            </div>
                            <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                                Live
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Box label="Balance" value="$50,000" />
                            <Box label="Profit" value="+$2,684" />
                            <Box label="Payouts" value="$1,200" />
                            <Box label="Win Rate" value="72%" />
                        </div>

                        <div className="mt-5 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <p className="text-sm text-gray-300">Challenge Progress</p>
                                <p className="text-sm text-purple-300">42%</p>
                            </div>
                            <div className="h-3 rounded-full bg-white/10">
                                <div className="h-3 w-[42%] rounded-full bg-gradient-to-r from-purple-500 to-cyan-300" />
                            </div>
                        </div>

                        <div className="mt-5 space-y-3">
                            {["Account created", "Order paid", "Payout pending"].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                                >
                                    <CheckCircle className="h-4 w-4 text-green-400" />
                                    <span className="text-sm text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Feature({ icon: Icon, text }: { icon: any; text: string }) {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <Icon className="h-5 w-5 text-purple-400" />
            <p className="text-gray-300">{text}</p>
        </div>
    );
}

function Box({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-1 text-xl font-bold">{value}</p>
        </div>
    );
}