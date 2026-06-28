"use client";

import { Sparkles, Zap, Gift, ArrowRight } from "lucide-react";

export default function PromotionBanner() {
    return (
        <section className="mb-8 overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-950/50 via-zinc-950 to-black p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm text-violet-300">
                        <Gift className="h-4 w-4" />
                        Limited Promotion
                    </div>

                    <h2 className="text-2xl font-bold text-white md:text-3xl">
                        Get 20% OFF Your Next Challenge
                    </h2>

                    <p className="mt-2 text-zinc-400">
                        Use promo code <span className="font-semibold text-violet-300">NOOR20</span> at checkout.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Badge icon={Sparkles} text="Promo Code" />
                    <Badge icon={Zap} text="Instant Access" />
                    <Badge icon={ArrowRight} text="Upgrade Now" />
                </div>
            </div>
        </section>
    );
}

function Badge({ icon: Icon, text }: { icon: any; text: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
            <Icon className="mb-2 h-5 w-5 text-violet-400" />
            {text}
        </div>
    );
}