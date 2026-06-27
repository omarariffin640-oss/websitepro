import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Trophy,
    Sparkles,
    Target,
    ShieldAlert,
    CalendarDays,
    Timer,
} from "lucide-react";
import RuleRow from "./RuleRow";

export type ChallengeData = {
    id: number;
    step: number;
    target_profit: number;
    max_daily_loss: number;
    max_total_loss: number;
    min_trading_days: number;
};

type Props = {
    challenge: ChallengeData;
    disabled: boolean;
    onStart: (step: number) => void;
};

export default function ChallengeCard({
    challenge,
    disabled,
    onStart,
}: Props) {
    const recommended = challenge.step === 1;

    return (
        <Card
            className={`relative overflow-hidden rounded-3xl border transition duration-300 hover:-translate-y-1 hover:shadow-xl ${recommended
                    ? "border-violet-500/40 bg-gradient-to-b from-violet-500/10 to-zinc-950"
                    : "border-white/10 bg-zinc-950/70 hover:border-violet-500/30"
                }`}
        >
            {recommended && (
                <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-violet-600 px-3 py-1 text-xs text-white">
                    <Sparkles className="h-3 w-3" />
                    Recommended
                </div>
            )}

            <CardHeader>
                <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-300">
                        Step {challenge.step}
                    </div>

                    <Trophy className="h-5 w-5 text-violet-400" />
                </div>

                <CardTitle className="text-2xl text-white">
                    Challenge Step {challenge.step}
                </CardTitle>

                <p className="mt-2 text-sm text-zinc-500">
                    Professional evaluation with transparent trading rules.
                </p>
            </CardHeader>

            <CardContent className="space-y-4">

                <RuleRow
                    icon={Target}
                    label="Target Profit"
                    value={`${challenge.target_profit}%`}
                    valueClass="text-emerald-400"
                />

                <RuleRow
                    icon={ShieldAlert}
                    label="Daily Loss"
                    value={`${challenge.max_daily_loss}%`}
                    valueClass="text-red-400"
                />

                <RuleRow
                    icon={ShieldAlert}
                    label="Overall Loss"
                    value={`${challenge.max_total_loss}%`}
                    valueClass="text-red-400"
                />

                <RuleRow
                    icon={CalendarDays}
                    label="Minimum Days"
                    value={`${challenge.min_trading_days} Days`}
                />

                <RuleRow
                    icon={Timer}
                    label="Trading Period"
                    value="Unlimited"
                />

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-violet-300">
                        Included
                    </p>

                    <div className="space-y-2 text-sm text-zinc-400">
                        <p>✓ Dashboard Access</p>
                        <p>✓ Fast Review</p>
                        <p>✓ Up To 90% Reward Split</p>
                        <p>✓ Professional Support</p>
                    </div>
                </div>

                <Button
                    onClick={() => onStart(challenge.step)}
                    disabled={disabled}
                    className="w-full rounded-xl bg-violet-600 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {disabled
                        ? "Challenge In Progress"
                        : `Start Step ${challenge.step}`}
                </Button>
            </CardContent>
        </Card>
    );
}