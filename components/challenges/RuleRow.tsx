import { LucideIcon } from "lucide-react";

type RuleRowProps = {
    icon: LucideIcon;
    label: string;
    value: string;
    valueClass?: string;
};

export default function RuleRow({
    icon: Icon,
    label,
    value,
    valueClass = "text-white",
}: RuleRowProps) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:border-violet-500/30 hover:bg-violet-500/5">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                    <Icon className="h-5 w-5 text-violet-400" />
                </div>

                <span className="text-sm text-zinc-400">
                    {label}
                </span>
            </div>

            <span className={`text-sm font-semibold ${valueClass}`}>
                {value}
            </span>
        </div>
    );
}