import { LucideIcon } from "lucide-react";

type StatCardProps = {
    title: string;
    value: string | number;
    icon: LucideIcon;
    iconClassName?: string;
    trend?: string;
};

export default function StatCard({
    title,
    value,
    icon: Icon,
    iconClassName = "text-purple-400",
    trend,
}: StatCardProps) {
    return (
        <div className="stat-card">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm text-gray-400">{title}</p>
                    <p className="mt-2 text-2xl font-bold text-white">{value}</p>
                    {trend && (
                        <p className="mt-1 text-xs text-gray-500">{trend}</p>
                    )}
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-2.5">
                    <Icon className={`h-5 w-5 ${iconClassName}`} />
                </div>
            </div>
        </div>
    );
}
