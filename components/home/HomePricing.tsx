"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Sparkles, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const currencies = ["USD", "EUR", "GBP", "INR"];

const programs = ["Free Trial", "Step 1", "Step 2", "Instant", "Noor Funding"];

const plans = [
    { capital: "$5K", oldPrice: 59, price: 39, reward: "Up to 80%" },
    { capital: "$10K", oldPrice: 99, price: 69, reward: "Up to 80%" },
    { capital: "$25K", oldPrice: 199, price: 139, reward: "Up to 85%" },
    { capital: "$50K", oldPrice: 329, price: 229, reward: "Up to 90%", popular: true },
    { capital: "$100K", oldPrice: 599, price: 399, reward: "Up to 90%" },
];

const rates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83,
};

const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
};

export default function HomePricing() {
    const [currency, setCurrency] = useState("USD");
    const [showAmount, setShowAmount] = useState(true);

    const formatPrice = (amount: number) => {
        return `${symbols[currency]}${Math.round(amount * rates[currency]).toLocaleString()}`;
    };

    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <p className="text-sm font-medium text-violet-400">Funding Programs</p>

                    <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl">
                        Choose your funded account
                    </h2>

                    <p className="mt-4 text-zinc-400">
                        Clear capital options, discounted challenge fees, and simple rules for serious traders.
                    </p>
                </div>

                <div className="mb-6 flex flex-wrap justify-center gap-2">
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

                <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
                    <div className="flex rounded-full border border-white/10 bg-white/[0.03] p-1">
                        {currencies.map((item) => (
                            <button
                                key={item}
                                onClick={() => setCurrency(item)}
                                className={`rounded-full px-3 py-1.5 text-xs transition ${currency === item
                                        ? "bg-violet-600 text-white"
                                        : "text-zinc-400 hover:text-white"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowAmount(!showAmount)}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300 hover:border-violet-500/40 hover:text-white"
                    >
                        {showAmount ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        {showAmount ? "Hide Amount" : "Show Amount"}
                    </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    {plans.map((plan) => (
                        <div
                            key={plan.capital}
                            className={`relative rounded-3xl border p-5 transition hover:-translate-y-1 hover:border-violet-500/40 ${plan.popular
                                    ? "border-violet-500/40 bg-violet-500/10 shadow-2xl shadow-violet-950/30"
                                    : "border-white/10 bg-zinc-950/70"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-violet-600 px-3 py-1 text-xs text-white">
                                    <Sparkles className="h-3 w-3" />
                                    Recommended
                                </div>
                            )}

                            <div className="mb-4 flex items-center justify-between">
                                <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-300">
                                    20% OFF
                                </span>
                                <span className="text-xs text-zinc-500">{currency}</span>
                            </div>

                            <h3 className="text-3xl font-bold text-white">{plan.capital}</h3>
                            <p className="mt-1 text-sm text-zinc-500">Noor Challenge Account</p>

                            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <p className="text-xs text-zinc-500">One-time challenge fee</p>

                                {showAmount ? (
                                    <div className="mt-1 flex items-end gap-2">
                                        <p className="text-3xl font-bold text-white">{formatPrice(plan.price)}</p>
                                        <p className="pb-1 text-sm text-zinc-500 line-through">
                                            {formatPrice(plan.oldPrice)}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="mt-1 text-3xl font-bold text-white">••••</p>
                                )}
                            </div>

                            <div className="mt-6 space-y-3 text-sm">
                                {[
                                    ["Profit Target", "10% / 5%"],
                                    ["Daily Loss", "5%"],
                                    ["Overall Loss", "10%"],
                                    ["Min Trading Days", "4 Days"],
                                    ["Trading Period", "Unlimited"],
                                    ["Refund", "Yes"],
                                    ["Reward Split", plan.reward],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="flex items-center justify-between gap-3 border-b border-white/5 pb-2"
                                    >
                                        <span className="text-zinc-500">{label}</span>
                                        <span className="flex items-center gap-1 text-right text-white">
                                            <Check className="h-3.5 w-3.5 text-violet-400" />
                                            {value}
                                        </span>
                                    </div>
                                ))}
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