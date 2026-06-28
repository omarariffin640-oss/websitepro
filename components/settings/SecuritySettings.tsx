import { CheckCircle } from "lucide-react";

type Props = {
    twoFactor: boolean;
    loginAlerts: boolean;
};

export default function SecuritySettings({
    twoFactor,
    loginAlerts,
}: Props) {
    return (
        <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6">
            <h2 className="mb-6 text-xl font-bold text-white">
                Security Status
            </h2>

            <div className="space-y-3">
                <Item active text="Email Verified" />
                <Item active={loginAlerts} text="Login Alerts" />
                <Item active={twoFactor} text="Two-Factor Authentication" />
                <Item active text="Password Protected" />
            </div>
        </div>
    );
}

function Item({
    active,
    text,
}: {
    active: boolean;
    text: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-3">
            <CheckCircle
                className={`h-4 w-4 ${active ? "text-emerald-400" : "text-zinc-500"
                    }`}
            />
            <span
                className={
                    active ? "text-zinc-300" : "text-zinc-500"
                }
            >
                {text}
            </span>
        </div>
    );
}