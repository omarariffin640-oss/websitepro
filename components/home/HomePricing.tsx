import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const accounts = ["$5K", "$10K", "$25K", "$50K", "$100K"];
const programs = ["Free Trial", "Step 1", "Step 2", "Instant", "Noor Funding"];

export default function HomePricing() {
    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <p className="text-sm font-medium text-violet-400">Funding Programs</p>
                    <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl">
                        Choose your funded account
                    </h2>
                    <p className="mt-4 text-zinc-400">
                        Transparent rules, flexible account sizes, and a clean path to funding.
                    </p>
                </div>

                <div className="mb-8 flex flex-wrap justify-center gap-2">
                    {programs.map((item, index) => (
                        <button
                            key={item}
                            className={`rounded-full border px-4 py-2 text-sm transition ${index === 1
                                    ? "border-violet-500/40 bg-violet-500/15 text-white"
                                    : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-violet-500/40 hover:text-white"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    {accounts.map((account, index) => (
                        <div
                            key={account}
                            className={`relative rounded-3xl border p-5 transition hover:-translate-y-1 hover:border-violet-500/40 ${index === 3
                                    ? "border-violet-500/40 bg-violet-500/10 shadow-2xl shadow-violet-950/30"
                                    : "border-white/10 bg-zinc-950/70"
                                }`}
                        >
                            {index === 3 && (
                                <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-violet-600 px-3 py-1 text-xs text-white">
                                    <Sparkles className="h-3 w-3" />
                                    Popular
                                </div>
                            )}

                            <div className="mb-4 flex items-center justify-between">
                                <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-300">
                                    20% OFF
                                </span>
                                <span className="text-xs text-zinc-500">USD</span>
                            </div>

                            <h3 className="text-3xl font-bold text-white">{account}</h3>
                            <p className="mt-1 text-sm text-zinc-500">Noor Funding Account</p>

                            <div className="mt-6 space-y-3 text-sm">
                                {[
                                    ["Profit Target", "10% / 5%"],
                                    ["Max Daily Loss", "5%"],
                                    ["Max Loss", "10%"],
                                    ["Min Trading Days", "4 Days"],
                                    ["Trading Period", "Unlimited"],
                                    ["Refund", "Yes"],
                                    ["Rewards", "Up to 90%"],
                                ].map(([label, value]) => (
                                    <div key={label} className="flex items-center justify-between gap-3 border-b border-white/5 pb-2">
                                        <span className="text-zinc-500">{label}</span>
                                        <span className="flex items-center gap-1 text-white">
                                            <Check className="h-3.5 w-3.5 text-violet-400" />
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <p className="text-xs text-zinc-500">One-time fee from</p>
                                <p className="text-2xl font-bold text-white">$49</p>
                            </div>

                            <Link href="/register">
                                <Button className="mt-5 w-full rounded-xl bg-violet-600 hover:bg-violet-700">
                                    Start Challenge
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}