"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import ProgramCard from "./ProgramCard";
import ChallengeTabs from "./ChallengeTabs";
import {
    freeTrial,
    challengePrograms,
    instantFunding,
    noorFunding,
} from "./programs";

type ChallengeName = "1-Step Challenge" | "2-Step Challenge";

export default function EvaluationPrograms() {
    const [activeChallenge, setActiveChallenge] =
        useState<ChallengeName>("2-Step Challenge");

    const selectedChallenge =
        challengePrograms.find((program) => program.name === activeChallenge) ||
        challengePrograms[1];

    return (
        <section className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                        <TrendingUp className="h-4 w-4" />
                        Funding Programs
                    </div>

                    <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-white md:text-4xl">
                        Choose your preferred funding path
                    </h2>

                    <p className="mx-auto mt-3 max-w-3xl text-zinc-400">
                        Compare Free Trial, Challenges, Instant Funding and Noor Funding in
                        one clean section.
                    </p>
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                    <ProgramCard program={freeTrial} />

                    <div>
                        <div className="flex justify-center">
                            <ChallengeTabs
                                active={activeChallenge}
                                onChange={setActiveChallenge}
                            />
                        </div>

                        <ProgramCard program={selectedChallenge} />
                    </div>

                    <ProgramCard program={instantFunding} />
                    <ProgramCard program={noorFunding} />
                </div>
            </div>
        </section>
    );
}