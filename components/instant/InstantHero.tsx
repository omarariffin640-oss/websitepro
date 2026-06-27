import { Zap, ShieldCheck, Clock, TrendingUp, CheckCircle2 } from "lucide-react";

type InstantHeroProps = {
    hasAccount: boolean;
};

export default function InstantHero({
    hasAccount,
}: InstantHeroProps) {
    return (
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/40 via-zinc-950 to-black p-6 md:p-10">
            <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                        <Zap className="h-4 w-4" />
                        Instant Funding Program
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-white md:text-5xl">
                        Trade Without Evaluation
                    </h1>

                    <p className="mt-5 max-w-2xl leading-7 text-zinc-400">
                        Skip the evaluation process and get instant access to a funded
                        trading account with transparent rules, professional support and
                        fast account activation.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
                            <ShieldCheck className="h-4 w-4 text-violet-400" />
                            Secure Funding
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
                            <Clock className="h-4 w-4 text-violet-400" />
                            Instant Access
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
                            <TrendingUp className="h-4 w-4 text-violet-400" />
                            Up To 80% Profit Split
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                    <p className="text-sm text-zinc-400">
                        Account Status
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                        <CheckCircle2
                            className={`h-5 w-5 ${hasAccount ? "text-emerald-400" : "text-violet-400"
                                }`}
                        />

                        <span
                            className={`text-lg font-semibold ${hasAccount ? "text-emerald-400" : "text-violet-300"
                                }`}
                        >
                            {hasAccount
                                ? "Instant Account Active"
                                : "Ready To Purchase"}
                        </span>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <span className="text-zinc-500">
                                Activation
                            </span>

                            <span className="font-medium text-white">
                                Instant
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <span className="text-zinc-500">
                                Evaluation
                            </span>

                            <span className="font-medium text-emerald-400">
                                Not Required
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-zinc-500">
                                Profit Split
                            </span>

                            <span className="font-medium text-white">
                                Up to 80%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}