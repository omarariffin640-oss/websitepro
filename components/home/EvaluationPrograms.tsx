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

type MainTab = "Free Trial" | "Challenges" | "Instant Funding" | "Noor Funding";
type ChallengeName = "1-Step Challenge" | "2-Step Challenge";

export default function EvaluationPrograms() {
    const [activeTab, setActiveTab] = useState<MainTab>("Challenges");
    const [activeChallenge, setActiveChallenge] =
        useState<ChallengeName>("2-Step Challenge");

    const selectedChallenge =
        challengePrograms.find((program) => program.name === activeChallenge) ||
        challengePrograms[1];

    const selectedProgram =
        activeTab === "Free Trial"
            ? freeTrial
            : activeTab === "Instant Funding"
                ? instantFunding
                : activeTab === "Noor Funding"
                    ? noorFunding
                    : selectedChallenge;

    const tabs: MainTab[] = [
        "Free Trial",
        "Challenges",
        "Instant Funding",
        "Noor Funding",
    ];

    return (
        <section className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                        <TrendingUp className="h-4 w-4" />
                        Funding Programs
                    </div>

                    <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-white md:text-4xl">
                        Choose your preferred funding path
                    </h2>

                    <p className="mx-auto mt-3 max-w-3xl text-zinc-400">
                        Compare all program rules in one clean section.
                    </p>
                </div>

                <div className="mb-6 flex flex-wrap justify-center gap-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`rounded-full border px-5 py-2 text-sm font-medium transition ${activeTab === tab
                                    ? "border-violet-500 bg-violet-600 text-white"
                                    : "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-violet-500/40 hover:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === "Challenges" && (
                    <div className="flex justify-center">
                        <ChallengeTabs
                            active={activeChallenge}
                            onChange={setActiveChallenge}
                        />
                    </div>
                )}

                <ProgramCard program={selectedProgram} />
            </div>
        </section>
    );
}