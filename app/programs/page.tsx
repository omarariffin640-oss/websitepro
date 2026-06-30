"use client";

import DashboardShell from "@/components/DashboardShell";
import DashboardTopbar from "@/components/layout/DashboardTopbar";

const programs = [
    {
        name: "Free Trial",
        price: "FREE",
        payout: "Not Eligible",
        profitTarget: "8%",
        dailyLoss: "5%",
        maxLoss: "10%",
        phase: "Practice",
        platform: "MT5",
        leverage: "1:100",
        ea: "Allowed",
        news: "Allowed",
        weekend: "Allowed",
        tradingDays: "Unlimited",
        refund: "No",
    },
    {
        name: "1-Step Challenge",
        price: "From $59",
        payout: "Up to 90%",
        profitTarget: "10%",
        dailyLoss: "5%",
        maxLoss: "10%",
        phase: "1-Step",
        platform: "MT5",
        leverage: "1:100",
        ea: "Allowed",
        news: "Allowed",
        weekend: "Allowed",
        tradingDays: "Unlimited",
        refund: "Yes",
    },
    {
        name: "2-Step Challenge",
        price: "From $39",
        payout: "Up to 90%",
        profitTarget: "8% / 5%",
        dailyLoss: "5%",
        maxLoss: "10%",
        phase: "2-Step",
        platform: "MT5",
        leverage: "1:100",
        ea: "Allowed",
        news: "Allowed",
        weekend: "Allowed",
        tradingDays: "Unlimited",
        refund: "Yes",
    },
    {
        name: "Instant Funding",
        price: "From $99",
        payout: "Up to 90%",
        profitTarget: "-",
        dailyLoss: "5%",
        maxLoss: "10%",
        phase: "Instant",
        platform: "MT5",
        leverage: "1:100",
        ea: "Allowed",
        news: "Allowed",
        weekend: "Allowed",
        tradingDays: "Unlimited",
        refund: "No",
    },
    {
        name: "Noor Funding",
        price: "Coming Soon",
        payout: "Up to 95%",
        profitTarget: "-",
        dailyLoss: "-",
        maxLoss: "-",
        phase: "Funded",
        platform: "MT5",
        leverage: "1:100",
        ea: "Allowed",
        news: "Allowed",
        weekend: "Allowed",
        tradingDays: "Unlimited",
        refund: "-",
    },
];

export default function ProgramsPage() {
    return (
        <DashboardShell>
            <DashboardTopbar
                title="Evaluation Programs"
                description="Compare all Noor Funding programs in one place."
            />

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {programs.map((program) => (
                    <div
                        key={program.name}
                        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
                    >
                        <h2 className="text-2xl font-bold text-white">
                            {program.name}
                        </h2>

                        <p className="mt-2 text-3xl font-bold text-violet-400">
                            {program.price}
                        </p>

                        <div className="mt-6 space-y-3 text-sm">
                            <Row title="Payout" value={program.payout} />
                            <Row title="Profit Target" value={program.profitTarget} />
                            <Row title="Daily Drawdown" value={program.dailyLoss} />
                            <Row title="Max Drawdown" value={program.maxLoss} />
                            <Row title="Phase" value={program.phase} />
                            <Row title="Platform" value={program.platform} />
                            <Row title="Leverage" value={program.leverage} />
                            <Row title="EA Allowed" value={program.ea} />
                            <Row title="News Trading" value={program.news} />
                            <Row title="Weekend Holding" value={program.weekend} />
                            <Row title="Trading Days" value={program.tradingDays} />
                            <Row title="Refund Fee" value={program.refund} />
                        </div>
                    </div>
                ))}
            </section>
        </DashboardShell>
    );
}

function Row({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-zinc-400">{title}</span>
            <span className="font-semibold text-white">{value}</span>
        </div>
    );
}