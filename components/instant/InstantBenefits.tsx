import {
    ShieldCheck,
    TrendingUp,
    Clock3,
    Zap,
    BarChart3,
    LifeBuoy,
} from "lucide-react";

export default function InstantBenefits() {
    const benefits = [
        {
            icon: Zap,
            title: "Instant Activation",
            desc: "Start trading immediately after your account is approved.",
        },
        {
            icon: TrendingUp,
            title: "Up To 80% Profit Split",
            desc: "Keep a high percentage of your trading profits.",
        },
        {
            icon: ShieldCheck,
            title: "Transparent Rules",
            desc: "Simple risk parameters with no hidden conditions.",
        },
        {
            icon: Clock3,
            title: "Fast Payout Review",
            desc: "Payout requests are reviewed as quickly as possible.",
        },
        {
            icon: BarChart3,
            title: "Professional Dashboard",
            desc: "Monitor your account, performance and trading progress.",
        },
        {
            icon: LifeBuoy,
            title: "Dedicated Support",
            desc: "Our support team is ready to help whenever you need it.",
        },
    ];

    return (
        <section className="mt-8">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-white">
                    Why Choose Instant Funding?
                </h2>

                <p className="mt-3 text-zinc-400">
                    Everything you need to start trading without completing an evaluation.
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {benefits.map((item) => (
                    <div
                        key={item.title}
                        className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/5"
                    >
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                            <item.icon className="h-7 w-7 text-violet-400" />
                        </div>

                        <h3 className="text-lg font-semibold text-white">
                            {item.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-zinc-500">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}