import { Bell, Mail, Lock, Shield, User, LucideIcon } from "lucide-react";

type SettingsState = {
    notifications: boolean;
    emailAlerts: boolean;
    twoFactor: boolean;
    loginAlerts: boolean;
};

type Props = {
    settings: SettingsState;
    setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
};

type ToggleProps = {
    icon: LucideIcon;
    title: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
};

export default function PreferenceSettings({ settings, setSettings }: Props) {
    return (
        <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-b from-violet-500/10 to-zinc-950 p-6">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-white">
                <User className="h-5 w-5 text-violet-400" />
                Preferences
            </h2>

            <div className="space-y-4">
                <Toggle
                    icon={Bell}
                    title="Notifications"
                    description="Receive account, challenge, payout and trading activity notifications."
                    checked={settings.notifications}
                    onChange={(checked) =>
                        setSettings((prev) => ({ ...prev, notifications: checked }))
                    }
                />

                <Toggle
                    icon={Mail}
                    title="Email Alerts"
                    description="Get email alerts for important account updates."
                    checked={settings.emailAlerts}
                    onChange={(checked) =>
                        setSettings((prev) => ({ ...prev, emailAlerts: checked }))
                    }
                />

                <Toggle
                    icon={Lock}
                    title="Login Alerts"
                    description="Notify me when a new login is detected."
                    checked={settings.loginAlerts}
                    onChange={(checked) =>
                        setSettings((prev) => ({ ...prev, loginAlerts: checked }))
                    }
                />

                <Toggle
                    icon={Shield}
                    title="Two-Factor Authentication"
                    description="Add extra security to protect your account."
                    checked={settings.twoFactor}
                    onChange={(checked) =>
                        setSettings((prev) => ({ ...prev, twoFactor: checked }))
                    }
                />
            </div>
        </div>
    );
}

function Toggle({
    icon: Icon,
    title,
    description,
    checked,
    onChange,
}: ToggleProps) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                    <Icon className="h-5 w-5 text-violet-400" />
                </div>

                <div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm text-zinc-500">{description}</p>
                </div>
            </div>

            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-violet-600" : "bg-zinc-700"
                    }`}
            >
                <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? "left-6" : "left-1"
                        }`}
                />
            </button>
        </div>
    );
}