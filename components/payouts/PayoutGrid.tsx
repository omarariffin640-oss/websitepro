import PayoutCard, { Payout } from "./PayoutCard";
import { Wallet } from "lucide-react";

type Props = {
    payouts: Payout[];
};

export default function PayoutGrid({ payouts }: Props) {
    if (payouts.length === 0) {
        return (
            <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-12 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
                    <Wallet className="h-8 w-8 text-violet-400" />
                </div>

                <h2 className="text-2xl font-bold text-white">
                    No Payout History
                </h2>

                <p className="mt-3 text-zinc-500">
                    Your payout requests will appear here once submitted.
                </p>
            </div>
        );
    }

    return (
        <section>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                    Payout History
                </h2>

                <p className="mt-2 text-zinc-500">
                    Track all payout requests and their current status.
                </p>
            </div>

            <div className="space-y-4">
                {payouts.map((payout) => (
                    <PayoutCard
                        key={payout.id}
                        payout={payout}
                    />
                ))}
            </div>
        </section>
    );
}