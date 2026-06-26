import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomeCTA() {
    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-7xl rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/20 via-zinc-950 to-cyan-500/10 p-8 text-center md:p-14">
                <p className="text-sm font-medium uppercase tracking-wider text-violet-300">
                    Start Your Funding Journey
                </p>

                <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold text-white md:text-5xl">
                    Ready to trade with Noor Funding?
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
                    Choose your challenge, follow the rules, and prove your trading skill.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link href="/register">
                        <Button className="h-12 rounded-xl bg-violet-600 px-6 text-white hover:bg-violet-700">
                            Start Challenge <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>

                    <Link href="/challenges">
                        <Button
                            variant="outline"
                            className="h-12 rounded-xl border-zinc-700 bg-zinc-950/60 px-6 text-white hover:bg-zinc-900"
                        >
                            View Challenges
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}