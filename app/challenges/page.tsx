"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import DashboardShell from "@/components/DashboardShell";
import HomePricing from "@/components/home/HomePricing";

export default function ChallengesPage() {
    const router = useRouter();

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
        }
    }, [router]);

    return (
        <DashboardShell>
            <section className="mb-10 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/30 via-zinc-950 to-black p-6 md:p-8">
                <p className="text-sm font-medium text-violet-400">
                    Evaluation Challenges
                </p>

                <h1 className="mt-2 text-3xl font-bold text-white md:text-5xl">
                    Choose Your Challenge
                </h1>

                <p className="mt-4 max-w-2xl text-zinc-400">
                    Start with Free Trial, Step 1 or Step 2. Pricing and account sizes match the Home page.
                </p>
            </section>

            <HomePricing programs={["Free Trial", "Step 1", "Step 2"]} />
        </DashboardShell>
    );
}