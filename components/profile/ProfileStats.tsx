import { CheckCircle } from "lucide-react";

export default function ProfileStats() {
    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6">
                <h2 className="mb-5 text-xl font-bold text-white">
                    Account Statistics
                </h2>

                <div className="space-y-4">
                    <Stat title="Challenges Completed" value="3" />
                    <Stat title="Funded Accounts" value="1" />
                    <Stat title="Total Payouts" value="$2,500" />
                    <Stat title="Win Rate" value="67%" />
                </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6">
                <h2 className="mb-5 text-xl font-bold text-white">
                    Security
                </h2>

                <div className="space-y-3">
                    <Security text="Email Verified" />
                    <Security text="Secure Login Enabled" />
                    <Security text="Password Protected" />
                </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6">
                <h2 className="mb-5 text-xl font-bold text-white">
                    Account Benefits
                </h2>

                <div className="space-y-3">
                    <Benefit text="Up To 90% Profit Split" />
                    <Benefit text="Fast Payout Review" />
                    <Benefit text="No Consistency Rule" />
                    <Benefit text="Dedicated Support" />
                </div>
            </div>
        </div>
    );
}

function Stat({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <p className="text-sm text-zinc-400">{title}</p>
            <p className="mt-1 text-2xl font-bold text-violet-400">
                {value}
            </p>
        </div>
    );
}

function Security({
    text,
}: {
    text: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-3">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span>{text}</span>
        </div>
    );
}

function Benefit({
    text,
}: {
    text: string;
}) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
            ✓ {text}
        </div>
    );
}