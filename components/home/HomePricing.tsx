"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Sparkles, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const currencies = ["USD", "EUR", "GBP", "INR"] as const;
const programs = ["Free Trial", "Step 1", "Step 2", "Instant", "Noor Funding"] as const;

const rates = { USD: 1, EUR: 0.92, GBP: 0.79, INR: 83 };
const symbols = { USD: "$", EUR: "€", GBP: "£", INR: "₹" };

const plans = [
    { capital: "$5K", step1: [59, 39], step2: [79, 49], instant: [99, 69], noor: [129, 89], reward: "Up to 80%" },
    { capital: "$10K", step1: [99, 69], step2: [129, 89], instant: [169, 119], noor: [199, 139], reward: "Up to 80%" },
    { capital: "$25K", step1: [199, 139], step2: [249, 179], instant: [329, 229], noor: [399, 279], reward: "Up to 85%" },
    { capital: "$50K", step1: [329, 229], step2: [399, 279], instant: [499, 349], noor: [599, 419], reward: "Up to 90%", popular: true },
    { capital: "$100K", step1: [599, 399], step2: [699, 499], instant: [899, 649], noor: [999, 749], reward: "Up to 90%" },
];

export default function HomePricing() {
    const [currency, setCurrency] = useState<(typeof currencies)[number]>("USD");
    const [program, setProgram] = useState<(typeof programs)[number]>("Step 1");
    const [showAmount, setShowAmount] = useState(true);

    const formatPrice = (amount: number) =>
        `${symbols[currency]}${Math.round(amount * rates[currency]).toLocaleString()}`;

    const getPrices = (plan: any) => {
        if (program === "Free Trial") return null;
        if (program === "Step 1") return plan.step1;
        if (program === "Step 2") return plan.step2;
        if (program === "Instant") return plan.instant;
        return plan.noor;
    };

    const getCapitalAmount = (capital: string) => {
        return Number(capital.replace("$", "").replace("K", "")) * 1000;
    };

    const formatCapitalPercent = (capital: string, percent: number) => {
        const amount = (getCapitalAmount(capital) * percent) / 100;

        if (!showAmount) {
            return `${percent}% / ••••`;
        }

        return `${percent}% / ${formatPrice(amount)}`;
    };

    const accountName =
        program === "Free Trial"
            ? "Free Trial Account"
            : program === "Instant"
                ? "Instant Account"
                : program === "Noor Funding"
                    ? "Noor Funding Account"
                    : `${program} Challenge Account`;

    const rules = (reward: string, capital: string) => {
        if (program === "Free Trial") {
            return [
                ["Profit Target", formatCapitalPercent(capital, 5)],
                ["Daily Loss", formatCapitalPercent(capital, 5)],
                ["Overall Loss", formatCapitalPercent(capital, 10)],
                ["Trading Period", "14 Days"],
                ["Refund", "No"],
                ["Reward Split", "Not Eligible"],
            ];
        }

        if (program === "Step 1") {
            return [
                ["Profit Target", formatCapitalPercent(capital, 10)],
                ["Daily Loss", formatCapitalPercent(capital, 5)],
                ["Overall Loss", formatCapitalPercent(capital, 5)],
                ["Trading Period", "Unlimited"],
                ["Refund", "Yes"],
                ["Reward Split", reward],
            ];
        }

        if (program === "Step 2") {
            return [
                ["Profit Target", formatCapitalPercent(capital, 5)],
                ["Daily Loss", formatCapitalPercent(capital, 5)],
                ["Overall Loss", formatCapitalPercent(capital, 10)],
                ["Trading Period", "Unlimited"],
                ["Refund", "Yes"],
                ["Reward Split", reward],
            ];
        }

        if (program === "Instant") {
            return [
                ["Profit Target", "None"],
                ["Daily Loss", "5%"],
                ["Overall Loss", "10%"],
                ["Trading Period", "Unlimited"],
                ["Refund", "No"],
                ["Reward Split", "Up to 80%"],
            ];
        }

        return [
            ["Profit Target", "None"],
            ["Daily Loss", "Account Based"],
            ["Overall Loss", "Account Based"],
            ["Trading Period", "Unlimited"],
            ["Status", "Funded Account"],
            ["Reward Split", reward],
        ];
    };

    const hiddenValue = (value: string) => {
        if (!showAmount && (value.includes("%") || value.includes("$") || value.includes("Up to"))) {
            return "••••";
        }
        return value;
    };

    return (
        <section className="px-4 py-16">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <p className="text-sm font-medium text-violet-400">Funding Programs</p>
                    <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl">
                        Choose your funded account
                    </h2>
                    <p className="mt-4 text-zinc-400">
                        Select your program, capital size and preferred currency.
                    </p>
                </div>

                <div className="mb-6 flex flex-wrap justify-center gap-2">
                    {programs.map((item) => (
                        <button
                            key={item}
                            onClick={() => setProgram(item)}
                            className={`rounded-full border px-4 py-2 text-sm transition ${program === item
                                ? "border-violet-500 bg-violet-600 text-white shadow-lg shadow-violet-950/40"
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
                                className={`rounded-full px-3 py-1.5 text-xs transition ${currency === item ? "bg-violet-600 text-white" : "text-zinc-400 hover:text-white"
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
                    {plans.map((plan) => {
                        const prices = getPrices(plan);

                        return (
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
                                        {program === "Free Trial" ? "FREE" : "20% OFF"}
                                    </span>
                                    <span className="text-xs text-zinc-500">{currency}</span>
                                </div>

                                <h3 className="text-3xl font-bold text-white">{plan.capital}</h3>
                                <p className="mt-1 text-sm text-zinc-500">{accountName}</p>

                                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                    <p className="text-xs text-zinc-500">
                                        {program === "Free Trial" ? "Trial fee" : "One-time fee"}
                                    </p>

                                    {program === "Free Trial" ? (
                                        <p className="mt-1 text-3xl font-bold text-white">Free</p>
                                    ) : showAmount ? (
                                        <div className="mt-1 flex items-end gap-2">
                                            <p className="text-3xl font-bold text-white">{formatPrice(prices![1])}</p>
                                            <p className="pb-1 text-sm text-zinc-500 line-through">
                                                {formatPrice(prices![0])}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="mt-1 text-3xl font-bold text-white">••••</p>
                                    )}
                                </div>

                                <div className="mt-6 space-y-3 text-sm">
                                    {rules(plan.reward, plan.capital).map(([label, value]) => (
                                        <div key={label} className="flex items-center justify-between gap-3 border-b border-white/5 pb-2">
                                            <span className="text-zinc-500">{label}</span>
                                            <span className="flex items-center gap-1 text-right text-white">
                                                <Check className="h-3.5 w-3.5 text-violet-400" />
                                                {hiddenValue(value)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/register">
                                    <Button
                                        className={`mt-5 w-full rounded-xl ${program === "Free Trial"
                                            ? "bg-emerald-600 hover:bg-emerald-700"
                                            : "bg-violet-600 hover:bg-violet-700"
                                            }`}
                                    >
                                        {program === "Free Trial" ? "Start Free Trial" : "Start Challenge"}
                                    </Button>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}