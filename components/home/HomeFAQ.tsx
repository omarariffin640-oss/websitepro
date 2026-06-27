"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function HomeFAQ() {
    const faqs = [
        {
            q: "How do I get funded?",
            a: "Choose a challenge, complete the objectives, pass the evaluation, and receive your funded account.",
        },
        {
            q: "How long does payout review take?",
            a: "Most payout requests are reviewed within 24 hours after submission.",
        },
        {
            q: "Can I trade during news?",
            a: "Trading rules depend on the selected program. Always check the challenge rules before trading.",
        },
        {
            q: "What platforms are supported?",
            a: "Platform and server details will be shown inside your dashboard after account activation.",
        },
        {
            q: "Can I have multiple accounts?",
            a: "Yes, as long as your combined allocation follows Noor Funding account limits.",
        },
    ];

    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-4xl">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                        <HelpCircle className="h-4 w-4" />
                        Frequently Asked Questions
                    </div>

                    <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
                        Questions traders ask
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
                        Quick answers about challenges, payouts, rules and accounts.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.q}
                            className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 transition hover:border-violet-500/30"
                        >
                            <button
                                onClick={() => setOpen(open === index ? null : index)}
                                className="flex w-full items-center justify-between gap-4 p-6 text-left"
                            >
                                <span className="font-medium text-white">{faq.q}</span>

                                <ChevronDown
                                    className={`h-5 w-5 shrink-0 text-violet-400 transition-transform ${open === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {open === index && (
                                <div className="border-t border-white/10 px-6 py-5 text-sm leading-6 text-zinc-400">
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