import { User, Save, ShieldCheck, Mail, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

type Profile = {
    id: number;
    name: string | null;
    email: string;
    avatar_url: string | null;
    role: string;
};

type Props = {
    profile: Profile;
    saving: boolean;
    onSave: () => void;
};

export default function ProfileHero({ profile, saving, onSave }: Props) {
    return (
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/40 via-zinc-950 to-black p-6 md:p-10">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-violet-500/30 bg-violet-500/10">
                        {profile.avatar_url ? (
                            <img
                                src={profile.avatar_url}
                                alt="Profile avatar"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <User className="h-10 w-10 text-violet-400" />
                        )}
                    </div>

                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                            <User className="h-4 w-4" />
                            Profile Center
                        </div>

                        <h1 className="text-3xl font-bold text-white md:text-5xl">
                            {profile.name || "Noor Funding Trader"}
                        </h1>

                        <p className="mt-4 max-w-2xl text-zinc-400">
                            Manage your personal profile, avatar, account role and security details.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Badge icon={Mail} text={profile.email} />
                            <Badge icon={ShieldCheck} text={profile.role || "Trader"} />
                            <Badge icon={CalendarDays} text={`ID #${profile.id}`} />
                        </div>
                    </div>
                </div>

                <Button
                    onClick={onSave}
                    disabled={saving}
                    className="h-12 rounded-xl bg-violet-600 px-6 hover:bg-violet-700"
                >
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? "Saving..." : "Save Profile"}
                </Button>
            </div>
        </section>
    );
}

function Badge({
    icon: Icon,
    text,
}: {
    icon: any;
    text: string;
}) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
            <Icon className="h-4 w-4 text-violet-400" />
            {text}
        </div>
    );
}