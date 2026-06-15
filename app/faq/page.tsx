"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

type FAQItem = {
    question: string;
    answer: string;
};

const faqItems: FAQItem[] = [
    {
        question: "What is the minimum trading days?",
        answer: "Minimum trading days is 5 days for each step. You must trade at least 5 days to complete the challenge."
    },
    {
        question: "What is the maximum daily loss?",
        answer: "Maximum daily loss is 5% of your starting balance. If you lose more than 5% in a single day, your challenge will be failed."
    },
    {
        question: "What is the maximum total loss?",
        answer: "Maximum total loss is 10% of your starting balance. If your total drawdown exceeds 10%, your challenge will be failed."
    },
    {
        question: "Can I use Expert Advisors (EA)?",
        answer: "Yes, Expert Advisors are allowed as long as they don't violate other rules."
    },
    {
        question: "Can I trade during news events?",
        answer: "Yes, news trading is allowed. However, be aware of increased volatility."
    },
    {
        question: "How long does the challenge take?",
        answer: "You have up to 30 days to complete each step. Step 1 requires 8% profit, Step 2 requires 5% profit."
    },
    {
        question: "When can I request a payout?",
        answer: "After completing both steps, you become funded. Payouts are processed within 24 hours."
    },
    {
        question: "What platforms are supported?",
        answer: "We support MetaTrader 5 (MT5) and cTrader."
    }
];

export default function FAQPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        setUserEmail(email);
        setLoading(false);
    }, [router]);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!mounted || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-darknavy">
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-16">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h1>

                    <Card className="bg-darkcard">
                        <CardHeader>
                            <CardTitle className="text-white">Challenge Rules & Guidelines</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {faqItems.map((item, index) => (
                                    <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => toggleFAQ(index)}
                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800/50 transition-colors"
                                        >
                                            <span className="text-white font-medium">{item.question}</span>
                                            {openIndex === index ? (
                                                <ChevronUp className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                        {openIndex === index && (
                                            <div className="p-4 pt-0 border-t border-gray-700">
                                                <p className="text-gray-400">{item.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}