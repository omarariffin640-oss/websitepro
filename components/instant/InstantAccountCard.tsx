import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Wallet,
    DollarSign,
    CalendarDays,
    ShieldCheck,
    TrendingUp,
    Activity,
} from "lucide-react";

export type InstantAccount = {
    id: number;
    account_id: string;
    balance: number;
    status: string;
    created_at: string;
};

type Props = {
    account: InstantAccount | null;
    creating: boolean;
    onCreate: () => void;
};

export default function InstantAccountCard({
    account,
    creating,
    onCreate,
}: Props) {
    if (!account) {
        return (
            <Card className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-zinc-950">
                <CardContent className="p-10 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-500/10">
                        <Wallet className="h-10 w-10 text-violet-400" />
                    </div>

                    <h2 className="mt-6 text-3xl font-bold text-white">
                        No Instant Account
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl leading-7 text-zinc-400">
                        Purchase an instant funded account and start trading immediately
                        without completing an evaluation challenge.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        <Feature title="Activation" value="Instant" />
                        <Feature title="Profit Split" value="Up to 80%" />
                        <Feature title="Trading" value="Unlimited" />
                    </div>

                    <Button
                        onClick={onCreate}
                        disabled={creating}
                        className="mt-8 h-12 rounded-xl bg-violet-600 px-8 hover:bg-violet-700"
                    >
                        {creating ? "Creating Account..." : "Purchase Instant Account"}
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-zinc-950">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                    <Wallet className="h-5 w-5 text-violet-400" />
                    Instant Account Details
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <InfoCard
                        icon={Wallet}
                        label="Account ID"
                        value={account.account_id}
                        mono
                    />

                    <InfoCard
                        icon={DollarSign}
                        label="Balance"
                        value={`$${account.balance.toLocaleString()}`}
                        green
                    />

                    <InfoCard
                        icon={Activity}
                        label="Status"
                        value={account.status}
                        green
                    />

                    <InfoCard
                        icon={CalendarDays}
                        label="Created"
                        value={new Date(account.created_at).toLocaleDateString()}
                    />

                    <InfoCard
                        icon={TrendingUp}
                        label="Profit Split"
                        value="Up to 80%"
                    />

                    <InfoCard
                        icon={ShieldCheck}
                        label="Trading Period"
                        value="Unlimited"
                    />
                </div>
            </CardContent>
        </Card>
    );
}

function Feature({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-zinc-500">{title}</p>
            <p className="mt-2 text-lg font-semibold text-white">{value}</p>
        </div>
    );
}

function InfoCard({
    icon: Icon,
    label,
    value,
    mono,
    green,
}: {
    icon: any;
    label: string;
    value: string;
    mono?: boolean;
    green?: boolean;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-3 flex items-center gap-2">
                <Icon className="h-4 w-4 text-violet-400" />
                <span className="text-sm text-zinc-500">{label}</span>
            </div>

            <p
                className={`font-semibold ${mono ? "font-mono text-sm" : "text-xl"
                    } ${green ? "text-emerald-400" : "text-white"}`}
            >
                {value}
            </p>
        </div>
    );
}