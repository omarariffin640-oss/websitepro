import { Button } from "@/components/ui/button";
import {
    Mail,
    Shield,
    Trophy,
    Wallet,
    Calendar,
    Settings,
    ImagePlus,
    Trash2,
} from "lucide-react";

type Profile = {
    id: number;
    name: string | null;
    email: string;
    avatar_url: string | null;
    role: string;
};

type Props = {
    profile: Profile;
    name: string;
    setName: (value: string) => void;
    avatarFile: File | null;
    setAvatarFile: (file: File | null) => void;
    saving: boolean;
    onUpload: () => void;
    onDelete: () => void;
};

export default function ProfileCard({
    profile,
    name,
    setName,
    avatarFile,
    setAvatarFile,
    saving,
    onUpload,
    onDelete,
}: Props) {
    return (
        <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-b from-violet-500/10 to-zinc-950 p-6">
            <h2 className="mb-6 text-2xl font-bold text-white">
                Edit Profile
            </h2>

            <div className="space-y-5">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <label className="mb-2 block text-sm text-zinc-400">
                        Full Name
                    </label>

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 text-white outline-none focus:border-violet-500"
                    />
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <label className="mb-3 block text-sm text-zinc-400">
                        Upload Avatar
                    </label>

                    <div className="flex flex-col gap-3 md:flex-row">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setAvatarFile(e.target.files?.[0] || null)
                            }
                            className="w-full rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-white"
                        />

                        <Button
                            onClick={onUpload}
                            disabled={saving || !avatarFile}
                            className="bg-violet-600 hover:bg-violet-700"
                        >
                            <ImagePlus className="mr-2 h-4 w-4" />
                            Upload
                        </Button>
                    </div>

                    {profile.avatar_url && (
                        <Button
                            onClick={onDelete}
                            disabled={saving}
                            variant="outline"
                            className="mt-4 border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Avatar
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Info icon={Mail} label="Email" value={profile.email} />
                    <Info icon={Shield} label="Role" value={profile.role || "Trader"} green />
                    <Info icon={Trophy} label="Challenge Status" value="Active" />
                    <Info icon={Wallet} label="Account Type" value="Funded Trader" />
                    <Info icon={Calendar} label="Member Since" value="2026" />
                    <Info icon={Settings} label="Profile ID" value={`#${profile.id}`} />
                </div>
            </div>
        </div>
    );
}

function Info({
    icon: Icon,
    label,
    value,
    green,
}: {
    icon: any;
    label: string;
    value: string;
    green?: boolean;
}) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <div className="mb-2 flex items-center gap-2">
                <Icon className="h-4 w-4 text-violet-400" />
                <span className="text-sm text-zinc-400">{label}</span>
            </div>

            <p className={green ? "font-semibold text-emerald-400" : "font-semibold text-white"}>
                {value}
            </p>
        </div>
    );
}