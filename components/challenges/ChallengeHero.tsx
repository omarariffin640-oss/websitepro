import { Trophy, CheckCircle2 } from "lucide-react";

type ChallengeHeroProps = {
    hasActiveChallenge: boolean;
};

export default function ChallengeHero({
    hasActiveChallenge,
}: ChallengeHeroProps) {
    return (
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/40 via-zinc-950 to-black p-6 md:p-10">
            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                        <Trophy className="h-4 w-4" />
                        Noor Funding Challenges
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-white md:text-5xl">
                        Choose Your Trading Challenge
                    </h1>

                    <p className="mt-5 max-w-2xl text-zinc-400 leading-7">
                        Select your preferred evaluation program, complete the trading
                        objectives and qualify for a funded trading account with transparent
                        rules.
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                    <p className="text-sm text-zinc-400">
                        Current Status
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-lg font-semibold">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />

                        <span
                            className={
                                hasActiveChallenge
                                    ? "text-emerald-400"
                                    : "text-violet-300"
                            }
                        >
                            {hasActiveChallenge
                                ? "Challenge In Progress"
                                : "Ready To Start"}
                        </span>
                    </div>

                    <p className="mt-4 text-sm text-zinc-500">
                        Complete your evaluation and unlock a funded trading account.
                    </p>
                </div>
            </div>
        </section>
    );
}