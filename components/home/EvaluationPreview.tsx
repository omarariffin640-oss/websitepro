import { Star, TrendingUp } from "lucide-react";

const plans = [
    { name: "5K Starter", price: "$39" },
    { name: "10K Standard", price: "$69" },
    { name: "25K Pro", price: "$149", badge: "Most Popular" },
    { name: "50K Elite", price: "$299" },
    { name: "100K Prime", price: "$499", badge: "Best Value" },
];

export default function EvaluationPreview() {
    return (
        <section className="mb-8">
            <div className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                    <TrendingUp className="h-4 w-4" />
                    Evaluation Programs
                </div>

                <h2 className="mt-4 text-3xl font-bold text-white">
                    Choose the account that fits your goals
                </h2>

                <p className="mt-2 text-zinc-400">
                    Quick preview of Noor Funding evaluation account sizes.
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/10"
                    >
                        {plan.badge && (
                            <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-200">
                                <Star className="h-3 w-3" />
                                {plan.badge}
                            </div>
                        )}

                        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                        <p className="mt-2 text-3xl font-extrabold text-violet-300">
                            {plan.price}
                        </p>

                        <div className="mt-5 space-y-3 text-sm">
                            <Row label="Profit Target" value="8%" />
                            <Row label="Daily Drawdown" value="5%" />
                            <Row label="Max Drawdown" value="10%" />
                            <Row label="Phase" value="2-Step" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-zinc-500">{label}</span>
            <span className="font-semibold text-white">{value}</span>
        </div>
    );
}