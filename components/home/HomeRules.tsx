import {
    ShieldCheck,
    TrendingUp,
    Clock3,
    Wallet,
    Calendar,
    BadgeCheck,
} from "lucide-react";

export default function HomeRules() {
    const rules = [
        { icon: TrendingUp, title: "Profit Target", value: "Up to 10%", desc: "Clear targets for every evaluation phase." },
        { icon: ShieldCheck, title: "Daily Loss", value: "5%", desc: "Built to encourage responsible risk control." },
        { icon: Wallet, title: "Overall Loss", value: "10%", desc: "Simple drawdown rules traders can follow." },
        { icon: Calendar, title: "Trading Period", value: "Unlimited", desc: "Trade without unnecessary deadline pressure." },
        { icon: Clock3, title: "Minimum Days", value: "4 Days", desc: "Show consistency before moving forward." },
        { icon: BadgeCheck, title: "Profit Split", value: "Up to 90%", desc: "Keep more from the profits you generate." },
    ];

    return (
        <section className="relative border-y border-white/10 bg-zinc-950/40 px-4 py-10 md:py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_65%)]" />

            <div className="relative mx-auto max-w-7xl">
                <div className="mx-auto mb-6 max-w-3xl text-center">
                    <p className="text-sm font-medium uppercase tracking-wider text-violet-400">
                        Trading Rules
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                        ...
                    </h2>

                    <p className="mt-3 text-zinc-400">
                        ...
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
                        Simple, fair and transparent
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
                        Clear funding rules designed for disciplined traders, with no
                        unnecessary complexity.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {rules.map((rule) => (
                        <div
                            key={rule.title}
                            className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/5"
                        >
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                                <rule.icon className="h-7 w-7 text-violet-400" />
                            </div>

                            <h3 className="text-lg font-semibold text-white">{rule.title}</h3>
                            <p className="mt-2 text-3xl font-bold text-violet-400">{rule.value}</p>
                            <p className="mt-4 text-sm leading-6 text-zinc-500">{rule.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}