import { ShoppingBag, ShieldCheck, Zap, Star, CheckCircle2 } from "lucide-react";

export default function MarketplaceHero() {
    return (
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/40 via-zinc-950 to-black p-6 md:p-10">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                        <ShoppingBag className="h-4 w-4" />
                        Noor Marketplace
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-white md:text-5xl">
                        Trading Tools Marketplace
                    </h1>

                    <p className="mt-5 max-w-2xl leading-7 text-zinc-400">
                        Explore premium indicators, trading robots, tools, templates, merch and mentorship
                        designed to support your trading journey.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Badge icon={ShieldCheck} text="Secure Checkout" />
                        <Badge icon={Zap} text="Instant Access" />
                        <Badge icon={Star} text="Premium Tools" />
                    </div>
                </div>

                <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                    <p className="text-sm text-zinc-400">Marketplace Status</p>

                    <div className="mt-3 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        <span className="text-lg font-semibold text-emerald-400">
                            Available
                        </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-zinc-500">
                        Browse trader resources, tools and products directly from your dashboard.
                    </p>
                </div>
            </div>
        </section>
    );
}

function Badge({
    icon: Icon,
    text,
}: {
    icon: any;
    text: string;
}) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
            <Icon className="h-4 w-4 text-violet-400" />
            {text}
        </div>
    );
}