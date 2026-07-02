import { Globe, ShieldCheck, Timer, Users, TrendingUp } from "lucide-react";

export default function HomeStats() {
    const stats = [
        {
            icon: Users,
            value: "50,000+",
            label: "Active Traders",
        },
        {
            icon: Globe,
            value: "180+",
            label: "Countries",
        },
        {
            icon: Timer,
            value: "24 Hours",
            label: "Payout Review",
        },
        {
            icon: ShieldCheck,
            value: "99.9%",
            label: "Platform Security",
        },
    ];

    return (
        <section className="relative border-y border-white/10 bg-white/[0.02] px-4 py-10 md:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_70%)]" />

            <div className="relative mx-auto max-w-7xl">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                        <TrendingUp className="h-4 w-4" />
                        Trusted by Traders Worldwide
                    </div>

                    <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                        Built for Professional Traders
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
                        Transparent funding, secure infrastructure and fast payouts for
                        traders around the world.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/5"
                        >
                            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                                <stat.icon className="h-7 w-7 text-violet-400" />
                            </div>

                            <h3 className="text-3xl font-bold text-white">
                                {stat.value}
                            </h3>

                            <p className="mt-2 text-sm text-zinc-500">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}