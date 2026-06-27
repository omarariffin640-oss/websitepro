import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Calendar, Target, Activity } from "lucide-react";

type ActiveChallenge = {
    step: number;
    target_profit: number;
    status: string;
    started_at: string;
};

type Props = {
    challenge: ActiveChallenge | null;
};

export default function ActiveChallengeCard({ challenge }: Props) {
    if (!challenge) return null;

    return (
        <Card className="mb-8 overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-zinc-950">
            <CardHeader className="border-b border-white/10">
                <CardTitle className="flex items-center gap-2 text-white">
                    <Zap className="h-5 w-5 text-violet-400" />
                    Active Challenge
                </CardTitle>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-4">

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-sm text-zinc-500">
                            Current Step
                        </p>

                        <p className="mt-2 text-3xl font-bold text-white">
                            {challenge.step}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-emerald-400" />
                            <p className="text-sm text-zinc-500">
                                Target Profit
                            </p>
                        </div>

                        <p className="mt-2 text-3xl font-bold text-emerald-400">
                            {challenge.target_profit}%
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-yellow-400" />
                            <p className="text-sm text-zinc-500">
                                Status
                            </p>
                        </div>

                        <p className="mt-2 text-lg font-semibold capitalize text-yellow-400">
                            {challenge.status}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-cyan-400" />
                            <p className="text-sm text-zinc-500">
                                Started
                            </p>
                        </div>

                        <p className="mt-2 text-lg font-semibold text-white">
                            {new Date(challenge.started_at).toLocaleDateString()}
                        </p>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}