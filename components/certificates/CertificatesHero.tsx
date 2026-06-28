import { FileBadge, CheckCircle2, Trophy, Star, ShieldCheck } from "lucide-react";

type Props = {
    activeCount: number;
    fundedCount: number;
    achievementCount: number;
};

export default function CertificatesHero({
    activeCount,
    fundedCount,
    achievementCount,
}: Props) {
    return (
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/40 via-zinc-950 to-black p-6 md:p-10">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                        <FileBadge className="h-4 w-4" />
                        Certificate Center
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-white md:text-5xl">
                        Your Trading Certificates
                    </h1>

                    <p className="mt-5 max-w-2xl leading-7 text-zinc-400">
                        View your challenge achievements, funded trader status, and official
                        Noor Funding milestones in one clean dashboard.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Badge icon={ShieldCheck} text="Verified Records" />
                        <Badge icon={Trophy} text="Funded Status" />
                        <Badge icon={Star} text="Milestones" />
                    </div>
                </div>

                <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                    <p className="text-sm text-zinc-400">Certificate Status</p>

                    <div className="mt-3 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        <span className="text-lg font-semibold text-emerald-400">
                            {activeCount} Active
                        </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <MiniStat label="Funded" value={fundedCount} />
                        <MiniStat label="Achievements" value={achievementCount} />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Badge({ icon: Icon, text }: { icon: any; text: string }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
            <Icon className="h-4 w-4 text-violet-400" />
            {text}
        </div>
    );
}

function MiniStat({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs text-zinc-500">{label}</p>
            <p className="mt-1 text-xl font-bold text-white">{value}</p>
        </div>
    );
}