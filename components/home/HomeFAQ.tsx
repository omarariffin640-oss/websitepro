"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HomeFAQ() {
    const faqs = [
        {
            q: "How do I get funded?",
            a: "Purchase a challenge, complete the objectives, pass the evaluation, and receive a funded account.",
        },
        {
            q: "How long does payout approval take?",
            a: "Most payout requests are reviewed within 24 hours after submission.",
        },
        {
            q: "Can I trade during news?",
            a: "Trading conditions depend on your selected program. Please review the challenge rules.",
        },
        {
            q: "What platforms are supported?",
            a: "Platform support will be shown in your trading dashboard after account activation.",
        },
        {
            q: "Can I have multiple accounts?",
            a: "Yes, provided the combined allocation follows Noor Funding's account limits.",
        },
    ];

    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-4xl">
                <div className="mb-12 text-center">
                    <p className="text-sm font-medium text-violet-400">
                        Frequently Asked Questions
                    </p>

                    <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">
                        Questions Traders Ask
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.q}
                            className="rounded-2xl border border-white/10 bg-zinc-950/70"
                        >
                            <button
                                onClick={() =>
                                    setOpen(open === index ? null : index)
                                }
                                className="flex w-full items-center justify-between p-6 text-left"
                            >
                                <span className="font-medium text-white">
                                    {faq.q}
                                </span>

                                <ChevronDown
                                    className={`h-5 w-5 text-zinc-400 transition-transform ${open === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {open === index && (
                                <div className="border-t border-white/10 px-6 py-5 text-zinc-400">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}