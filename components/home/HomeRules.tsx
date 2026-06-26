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
        {
            icon: TrendingUp,
            title: "Profit Target",
            value: "Up to 10%",
            desc: "Clear and transparent evaluation objectives.",
        },
        {
            icon: ShieldCheck,
            title: "Max Daily Loss",
            value: "5%",
            desc: "Protect your capital with responsible risk management.",
        },
        {
            icon: Wallet,
            title: "Max Overall Loss",
            value: "10%",
            desc: "Simple rules that are easy to follow.",
        },
        {
            icon: Calendar,
            title: "Trading Period",
            value: "Unlimited",
            desc: "No unnecessary time pressure on your trading.",
        },
        {
            icon: Clock3,
            title: "Minimum Trading Days",
            value: "4 Days",
            desc: "Enough activity to demonstrate consistency.",
        },
        {
            icon: BadgeCheck,
            title: "Profit Split",
            value: "Up to 90%",
            desc: "Keep more of the profits you generate.",
        },
    ];

    return (
        <section className="px-4 py-20 bg-zinc-950/40">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                    <p className="text-sm font-medium text-violet-400 uppercase tracking-wider">
                        Trading Rules
                    </p>

                    <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">
                        Simple, Fair & Transparent
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
                        Every Noor Funding challenge follows straightforward rules designed
                        to reward disciplined traders rather than punish them.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {rules.map((rule) => (
                        <div
                            key={rule.title}
                            className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 transition-all duration-300 hover:border-violet-500/40 hover:bg-zinc-900"
                        >
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                                <rule.icon className="h-7 w-7 text-violet-400" />
                            </div>

                            <h3 className="text-xl font-semibold text-white">
                                {rule.title}
                            </h3>

                            <p className="mt-2 text-3xl font-bold text-violet-400">
                                {rule.value}
                            </p>

                            <p className="mt-4 text-sm leading-6 text-zinc-500">
                                {rule.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}