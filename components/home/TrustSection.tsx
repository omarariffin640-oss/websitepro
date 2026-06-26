import { ShieldCheck, Globe2, Wallet, MonitorUp, Star } from "lucide-react";

const items = [
    { icon: Star, value: "4.9/5", label: "Trader Rating" },
    { icon: Globe2, value: "180+", label: "Countries" },
    { icon: Wallet, value: "24H", label: "Payout Review" },
    { icon: ShieldCheck, value: "$200K", label: "Max Funding" },
    { icon: MonitorUp, value: "MT5", label: "Platform Ready" },
];

export default function TrustSection() {
    return (
        <section className="bg-black px-4 py-10 text-white">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-5">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center"
                    >
                        <item.icon className="mx-auto mb-3 h-5 w-5 text-purple-400" />
                        <p className="text-2xl font-bold">{item.value}</p>
                        <p className="mt-1 text-xs text-gray-400">{item.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}