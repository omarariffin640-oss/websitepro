import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomeCTA() {
    return (
        <section className="px-4 py-20">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/20 via-zinc-950 to-cyan-500/10 p-8 text-center md:p-16">
                <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
                <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                        <Sparkles className="h-4 w-4" />
                        Start Your Funding Journey
                    </div>

                    <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold text-white md:text-5xl">
                        Ready to become a funded trader?
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
                        Join Noor Funding, complete your evaluation, and trade funded
                        accounts with transparent rules and fast payout reviews.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link href="/register">
                            <Button className="h-12 rounded-xl bg-violet-600 px-7 text-white hover:bg-violet-700">
                                Start Challenge
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>

                        <Link href="/challenges">
                            <Button
                                variant="outline"
                                className="h-12 rounded-xl border-white/10 bg-zinc-950/70 px-7 text-white hover:bg-white/5"
                            >
                                View Challenges
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}