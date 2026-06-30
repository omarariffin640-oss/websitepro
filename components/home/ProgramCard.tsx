import { CheckCircle2, Sparkles } from "lucide-react";
import type { Program } from "./programs";
import ProgramSpecRow from "./ProgramSpecRow";

type Props = {
    program: Program;
};

export default function ProgramCard({ program }: Props) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/10">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                    <Sparkles className="h-3 w-3" />
                    {program.badge}
                </div>

                <h3 className="text-2xl font-bold text-white">{program.name}</h3>

                <p className="mt-2 text-3xl font-bold text-violet-300">
                    {program.price}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    {program.status}
                </div>

                <p className="mt-4 min-h-[48px] text-sm leading-6 text-zinc-400">
                    {program.highlight}
                </p>

                <div className="mt-6">
                    {program.specs.map((spec) => (
                        <ProgramSpecRow
                            key={spec.label}
                            label={spec.label}
                            value={spec.value}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}