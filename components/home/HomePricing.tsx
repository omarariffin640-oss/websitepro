import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const accounts = ["$5K", "$10K", "$25K", "$50K", "$100K"];
const programs = ["Free Trial", "Step 1", "Step 2", "Instant", "Noor Funding"];

export default function HomePricing() {
    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <p className="text-sm font-medium text-violet-400">Funding Programs</p>
                    <h2 className="mt-2 text-3xl font-bold md:text-5xl">
                        Choose your Noor challenge
                    </h2>
                    <p className="mt-4 text-zinc-400">
                        Select account capital and challenge type with clear rules and clean pricing.
                    </p>
                </div>

                <div className="mb-8 flex flex-wrap justify-center gap-2">
                    {programs.map((item) => (
                        <button
                            key={item}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 hover:border-violet-500/50 hover:text-white"
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    {accounts.map((account) => (
                        <div
                            key={account}
                            className="rounded-3xl border border-white/10 bg-zinc-950/70 p-5 shadow-lg shadow-black/20"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-300">
                                    20% OFF
                                </span>
                                <span className="text-xs text-zinc-500">USD</span>
                            </div>

                            <h3 className="text-3xl font-bold">{account}</h3>
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
                                    <div key={label} className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-zinc-500">{label}</span>
                                        <span className="text-white">{value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 rounded-2xl bg-white/[0.03] p-4">
                                <p className="text-xs text-zinc-500">One-time fee from</p>
                                <p className="text-2xl font-bold">$49</p>
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