import { Globe, ShieldCheck, Timer, Users } from "lucide-react";

export default function HomeStats() {
    const stats = [
        { icon: Users, value: "50,000+", label: "Traders Worldwide" },
        { icon: Globe, value: "180+", label: "Countries" },
        { icon: Timer, value: "24h", label: "Payout Review" },
        { icon: ShieldCheck, value: "99.9%", label: "Secure Platform" },
    ];

    return (
        <section className="border-y border-white/10 bg-white/[0.02] px-4 py-10">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5 text-center"
                    >
                        <stat.icon className="mx-auto mb-3 h-6 w-6 text-violet-400" />
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}