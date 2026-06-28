import { CalendarDays, CheckCircle, Clock, ShieldCheck } from "lucide-react";

export type Payout = {
    id: number;
    amount: number;
    created_at: string;
    method: string;
    note: string;
    status: "pending" | "approved" | "paid" | "rejected";
};

type Props = {
    payout: Payout;
};

export default function PayoutCard({ payout }: Props) {
    const StatusIcon =
        payout.status === "paid"
            ? CheckCircle
            : payout.status === "approved"
                ? ShieldCheck
                : Clock;

    return (
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-950/70 p-5 transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                    <StatusIcon className="h-7 w-7 text-violet-400" />
                </div>

                <div>
                    <p className="text-2xl font-bold text-white">
                        ${Number(payout.amount || 0).toLocaleString()}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
                        <CalendarDays className="h-4 w-4" />
                        {payout.created_at
                            ? new Date(payout.created_at).toLocaleDateString()
                            : "-"}
                    </p>
                </div>
            </div>

            <span
                className={`w-fit rounded-full border px-3 py-1 text-xs font-medium ${payout.status === "paid"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : payout.status === "approved"
                            ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                            : payout.status === "rejected"
                                ? "border-red-500/30 bg-red-500/10 text-red-400"
                                : "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                    }`}
            >
                {payout.status.toUpperCase()}
            </span>
        </div>
    );
}