import { CheckCircle2, Sparkles } from "lucide-react";
import type { Program } from "./programs";
import ProgramSpecRow from "./ProgramSpecRow";

type Props = {
    program: Program;
};

export default function ProgramCard({ program }: Props) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition-all duration-300 hover:border-violet-500/40 hover:bg-white/[0.06]">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                        <Sparkles className="h-3.5 w-3.5" />
                        {program.badge}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        {program.status}
                    </div>
                </div>

                <h3 className="mt-4 text-2xl font-bold text-white">
                    {program.name}
                </h3>

                <p className="mt-2 text-3xl font-extrabold text-violet-300">
                    {program.price}
                </p>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {program.highlight}
                </p>

                {/* Dua kolum supaya card lebih pendek */}
                <div className="mt-6 grid gap-x-6 gap-y-1 md:grid-cols-2">
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