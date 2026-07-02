import Link from "next/link";
import {
    LayoutDashboard,
    FolderKanban,
    Wallet,
    Award,
    ClipboardList,
    Server,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePlatform() {
    const items = [
        {
            icon: LayoutDashboard,
            title: "Dashboard",
            desc: "Monitor balance, equity, drawdown and overall account performance.",
        },
        {
            icon: FolderKanban,
            title: "Accounts",
            desc: "Manage funded accounts and active challenges in one place.",
        },
        {
            icon: Wallet,
            title: "Payouts",
            desc: "Submit payout requests and track approval progress.",
        },
        {
            icon: Award,
            title: "Certificates",
            desc: "Access funding certificates and trader achievements.",
        },
        {
            icon: ClipboardList,
            title: "Orders",
            desc: "Review challenge purchases and account history.",
        },
        {
            icon: Server,
            title: "Trading Server",
            desc: "View MT platform login credentials and server information.",
        },
    ];

    return (
        <section className="px-4 py-10 md:py-14">
            <div className="mx-auto max-w-7xl">

                <div className="mx-auto mb-8 max-w-3xl text-center">
                    <p className="text-sm font-medium text-violet-400">
                        Platform Preview
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                        Everything you need after getting funded
                    </h2>

                    <p className="mt-4 text-zinc-400">
                        A modern trader dashboard designed to manage accounts, monitor
                        performance and request payouts from one secure platform.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/5"
                        >
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                                <item.icon className="h-7 w-7 text-violet-400" />
                            </div>

                            <h3 className="text-lg font-semibold text-white">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-zinc-500">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <Link href="/dashboard">
                        <Button className="rounded-xl bg-violet-600 hover:bg-violet-700">
                            Explore Dashboard
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}