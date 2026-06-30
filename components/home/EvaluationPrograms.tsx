import { TrendingUp } from "lucide-react";
import ProgramCard from "./ProgramCard";
import { programs } from "./programs";

export default function EvaluationPrograms() {
    return (
        <section className="mb-12">
            <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                    <TrendingUp className="h-4 w-4" />
                    Noor Funding Programs
                </div>

                <h2 className="mt-5 text-4xl font-bold text-white">
                    Compare Every Evaluation Program
                </h2>

                <p className="mt-3 max-w-3xl text-zinc-400">
                    Compare all Noor Funding programs in one place. Review account rules,
                    MT5 access, drawdown limits, payout eligibility, trading conditions,
                    and funding requirements before choosing the program that best suits
                    your trading style.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                {programs.map((program) => (
                    <ProgramCard
                        key={program.name}
                        program={program}
                    />
                ))}
            </div>
        </section>
    );
}