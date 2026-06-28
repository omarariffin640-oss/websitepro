import { Wallet, DollarSign, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
    totalPaid: number;
    pendingAmount: number;
    approvedAmount: number;
    onRequestPayout: () => void;
};

export default function PayoutHero({
    totalPaid,
    pendingAmount,
    approvedAmount,
    onRequestPayout,
}: Props) {
    return (
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/40 via-zinc-950 to-black p-6 md:p-10">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                        <Wallet className="h-4 w-4" />
                        Payout Center
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-white md:text-5xl">
                        Manage Your Payouts
                    </h1>

                    <p className="mt-5 max-w-2xl leading-7 text-zinc-400">
                        Track payout requests, approval status and paid rewards from your
                        Noor Funding account.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Badge icon={DollarSign} text={`Paid $${totalPaid.toLocaleString()}`} />
                        <Badge icon={Clock} text={`Pending $${pendingAmount.toLocaleString()}`} />
                        <Badge icon={ShieldCheck} text={`Approved $${approvedAmount.toLocaleString()}`} />
                    </div>
                </div>

                <Button
                    onClick={onRequestPayout}
                    className="h-12 rounded-xl bg-violet-600 px-6 hover:bg-violet-700"
                >
                    Request Payout
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </section>
    );
}

function Badge({
    icon: Icon,
    text,
}: {
    icon: any;
    text: string;
}) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
            <Icon className="h-4 w-4 text-violet-400" />
            {text}
        </div>
    );
}