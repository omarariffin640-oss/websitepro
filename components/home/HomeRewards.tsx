import { Gift, BadgePercent, RotateCcw, Wallet, Award } from "lucide-react";

export default function HomeRewards() {
    const rewards = [
        { icon: Gift, title: "Bonus Credit", desc: "Selected traders may receive extra account credit." },
        { icon: BadgePercent, title: "Fee Discount", desc: "Campaign discounts may be offered during promotions." },
        { icon: RotateCcw, title: "Free Retry", desc: "Some traders may qualify for a retry campaign." },
        { icon: Wallet, title: "Payout Boost", desc: "Extra payout rewards may be available in selected events." },
        { icon: Award, title: "Certificate Badge", desc: "Eligible traders may receive special achievement badges." },
    ];

    return (
        <section className="px-4 py-2 md:py-4">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <p className="text-sm font-medium text-violet-400">
                        Campaign Rewards
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
                        Extra rewards for selected traders
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
                        These rewards are campaign-based and are not guaranteed for every trader.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                    {rewards.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 text-center transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/5"
                        >
                            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
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
            </div>
        </section>
    );
}