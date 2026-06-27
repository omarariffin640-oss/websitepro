"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import {
    ChevronDown,
    ChevronUp,
    HelpCircle,
    Shield,
    Wallet,
    Clock,
    Zap,
    Monitor,
} from "lucide-react";

type FAQItem = {
    question: string;
    answer: string;
    category: string;
};

const faqItems: FAQItem[] = [
    {
        category: "Rules",
        question: "What is the minimum trading days?",
        answer:
            "Minimum trading days is 5 days for each step. You must trade at least 5 days to complete the challenge.",
    },
    {
        category: "Risk",
        question: "What is the maximum daily loss?",
        answer:
            "Maximum daily loss is 5% of your starting balance. If you lose more than 5% in a single day, your challenge will be failed.",
    },
    {
        category: "Risk",
        question: "What is the maximum total loss?",
        answer:
            "Maximum total loss is 10% of your starting balance. If your total drawdown exceeds 10%, your challenge will be failed.",
    },
    {
        category: "Trading",
        question: "Can I use Expert Advisors (EA)?",
        answer:
            "Yes, Expert Advisors are allowed as long as they do not violate other trading rules.",
    },
    {
        category: "Trading",
        question: "Can I trade during news events?",
        answer:
            "Yes, news trading is allowed. However, traders should understand that news volatility can increase risk.",
    },
    {
        category: "Challenge",
        question: "How long does the challenge take?",
        answer:
            "Trading period is flexible depending on the account model. Step 1 requires the target profit, and Step 2 confirms consistency before funding.",
    },
    {
        category: "Payouts",
        question: "When can I request a payout?",
        answer:
            "After completing the requirements and becoming funded, payout requests are reviewed and processed as quickly as possible.",
    },
    {
        category: "Platform",
        question: "What platforms are supported?",
        answer:
            "Noor Funding supports modern trading platforms such as MetaTrader 5 and other supported trading environments.",
    },
];

const quickCards = [
    { icon: Shield, title: "Fair Rules", text: "Clear drawdown and target rules." },
    { icon: Wallet, title: "Fast Payouts", text: "Payout review built for speed." },
    { icon: Zap, title: "EAs Allowed", text: "Automated strategies are allowed." },
    { icon: Monitor, title: "MT5 Ready", text: "Trade using modern platforms." },
];

export default function FAQPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        setLoading(false);
    }, [router]);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading FAQ...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050509] text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />

            <main className="pt-8 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                    <section className="relative mb-8 overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
                        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative z-10">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                                <HelpCircle className="h-4 w-4" />
                                Help Center
                            </div>

                            <h1 className="text-3xl font-bold md:text-4xl">
                                Frequently Asked Questions
                            </h1>

                            <p className="mt-3 max-w-2xl text-gray-400">
                                Find answers about challenge rules, drawdown, payouts, platforms, and instant funding.
                            </p>
                        </div>
                    </section>

                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
                        {quickCards.map((item) => (
                            <Card key={item.title} className="border-white/10 bg-white/5">
                                <CardContent className="p-5">
                                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/20">
                                        <item.icon className="h-5 w-5 text-purple-400" />
                                    </div>
                                    <h3 className="font-semibold text-white">{item.title}</h3>
                                    <p className="mt-1 text-sm text-gray-400">{item.text}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <Card className="xl:col-span-2 border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-gray-950">
                            <CardContent className="p-4 md:p-6">
                                <div className="mb-5">
                                    <h2 className="text-xl font-bold text-white">
                                        Challenge Rules & Guidelines
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-400">
                                        Tap a question to expand the answer.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {faqItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="overflow-hidden rounded-xl border border-white/10 bg-black/40"
                                        >
                                            <button
                                                onClick={() => toggleFAQ(index)}
                                                className="flex w-full items-center justify-between gap-4 p-4 text-left transition hover:bg-purple-500/10"
                                            >
                                                <div>
                                                    <span className="mb-1 inline-block rounded-full bg-purple-500/10 px-2 py-0.5 text-xs text-purple-300">
                                                        {item.category}
                                                    </span>
                                                    <p className="font-medium text-white">{item.question}</p>
                                                </div>

                                                {openIndex === index ? (
                                                    <ChevronUp className="h-5 w-5 shrink-0 text-purple-400" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5 shrink-0 text-gray-400" />
                                                )}
                                            </button>

                                            {openIndex === index && (
                                                <div className="border-t border-white/10 px-4 pb-4 pt-3">
                                                    <p className="text-sm leading-relaxed text-gray-400">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-white/10 bg-zinc-950/70">
                            <CardContent className="p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                                    <Clock className="h-6 w-6 text-purple-400" />
                                </div>

                                <h3 className="text-xl font-bold text-white">
                                    Still need help?
                                </h3>

                                <p className="mt-2 text-sm text-gray-400">
                                    If you cannot find your answer here, contact support and we will help you review your account or challenge rules.
                                </p>

                                <div className="mt-5 space-y-3 text-sm text-gray-300">
                                    <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                                        Support available for challenge rules
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                                        Payout and account questions
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                                        Platform and trading setup
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}