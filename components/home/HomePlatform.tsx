import Link from "next/link";
import {
    LayoutDashboard,
    FolderKanban,
    Wallet,
    Award,
    ClipboardList,
    Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePlatform() {
    const items = [
        { icon: LayoutDashboard, title: "Dashboard", desc: "Balance, equity, profit and drawdown overview." },
        { icon: FolderKanban, title: "Accounts", desc: "Track active challenges and funded accounts." },
        { icon: Wallet, title: "Payouts", desc: "Request and monitor payout status." },
        { icon: Award, title: "Certificates", desc: "View eligibility and trader certificates." },
        { icon: ClipboardList, title: "Orders", desc: "Challenge purchases and account history." },
        { icon: Server, title: "Account Server", desc: "Login, server and platform details." },
    ];

    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 max-w-2xl">
                    <p className="text-sm font-medium text-violet-400">Platform Preview</p>
                    <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl">
                        Built for real funded traders
                    </h2>
                    <p className="mt-4 text-zinc-400">
                        Everything a trader needs after joining Noor Funding, from account
                        tracking to payouts and certificates.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6"
                        >
                            <item.icon className="mb-4 h-7 w-7 text-violet-400" />
                            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                            <p className="mt-2 text-sm text-zinc-500">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <Link href="/dashboard">
                        <Button className="rounded-xl bg-violet-600 hover:bg-violet-700">
                            View Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}