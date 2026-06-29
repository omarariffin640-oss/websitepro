"use client";

import { useState } from "react";
import { X, Sparkles, Clock, Gift, Star } from "lucide-react";

export default function FeaturedOfferCard() {
    const [show, setShow] = useState(true);

    if (!show) return null;

    return (
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/60 via-zinc-950 to-black p-6 shadow-2xl shadow-purple-500/10">
            <button
                onClick={() => setShow(false)}
                className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/40 p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
                <X className="h-4 w-4" />
            </button>

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative z-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm font-semibold text-purple-300">
                        <Sparkles className="h-4 w-4" />
                        Featured Weekly Offer
                    </div>

                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                        Premium Challenge Offer
                    </h2>

                    <p className="mt-3 max-w-xl text-gray-400">
                        Special weekly offer for traders. Limited-time featured deal shown inside your dashboard.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <OfferBadge icon={Gift} text="Special Deal" />
                        <OfferBadge icon={Clock} text="Weekly Promo" />
                        <OfferBadge icon={Star} text="Premium Offer" />
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-sm text-gray-400">This Week</p>

                    <div className="mt-2 flex items-end gap-3">
                        <p className="text-4xl font-extrabold text-white">$79</p>
                        <p className="pb-1 text-lg text-gray-500 line-through">$99</p>
                    </div>

                    <p className="mt-3 text-sm text-purple-300">
                        Use code <span className="font-bold">NOOR20</span>
                    </p>
                </div>
            </div>
        </section>
    );
}

function OfferBadge({ icon: Icon, text }: { icon: any; text: string }) {
    return (
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-300">
            <Icon className="h-4 w-4 text-purple-400" />
            {text}
        </div>
    );
}