"use client";

import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const accounts = [
    { size: "$10,000", fee: "$89", target: "10% / 5%" },
    { size: "$25,000", fee: "$179", target: "10% / 5%" },
    { size: "$50,000", fee: "$299", target: "10% / 5%", popular: true },
    { size: "$100,000", fee: "$549", target: "10% / 5%" },
];

export default function PricingGrid() {
    return (
        <section className="bg-black px-4 py-20 text-white">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 text-center">
                    <p className="mb-3 text-sm font-medium text-purple-400">
                        Choose Your Challenge
                    </p>
                    <h2 className="text-4xl font-bold md:text-5xl">
                        Start small or scale fast
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                        Pick a funded account size and prove your consistency with clear,
                        trader-friendly rules.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {accounts.map((item) => (
                        <div
                            key={item.size}
                            className={`relative rounded-3xl border p-6 transition hover:-translate-y-1 ${item.popular
                                    ? "border-purple-500/60 bg-purple-500/10 shadow-xl shadow-purple-500/10"
                                    : "border-white/10 bg-white/[0.04]"
                                }`}
                        >
                            {item.popular && (
                                <div className="absolute -top-3 left-6 rounded-full bg-purple-500 px-3 py-1 text-xs font-semibold">
                                    Popular
                                </div>
                            )}

                            <p className="text-sm text-gray-400">Account Size</p>
                            <h3 className="mt-2 text-4xl font-bold">{item.size}</h3>

                            <div className="mt-6 space-y-3">
                                <Rule label="Profit Target" value={item.target} />
                                <Rule label="Max Daily Loss" value="5%" />
                                <Rule label="Max Loss" value="10%" />
                                <Rule label="Trading Period" value="Unlimited" />
                                <Rule label="Reward Split" value="Up to 90%" />
                            </div>

                            <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
                                <p className="text-sm text-gray-400">One-time fee</p>
                                <p className="text-3xl font-bold text-white">{item.fee}</p>
                            </div>

                            <Button className="mt-5 w-full rounded-xl bg-purple-500 text-white hover:bg-purple-600">
                                Start Challenge
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Rule({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle className="h-4 w-4 text-purple-400" />
                {label}
            </div>
            <span className="font-medium text-white">{value}</span>
        </div>
    );
}