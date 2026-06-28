import { Button } from "@/components/ui/button";
import {
    Award,
    Trophy,
    Star,
    Calendar,
    Download,
} from "lucide-react";

export type Certificate = {
    id: number;
    user_email: string;
    name: string;
    type: "challenge" | "funded" | "achievement";
    created_at?: string;
    status: "active" | "expired";
    description?: string;
};

type Props = {
    certificate: Certificate;
};

export default function CertificateCard({ certificate }: Props) {
    const TypeIcon =
        certificate.type === "funded"
            ? Trophy
            : certificate.type === "achievement"
                ? Star
                : Award;

    return (
        <div className="w-full max-w-md rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-zinc-950 p-6 transition hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10">
            <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                    <TypeIcon className="h-7 w-7 text-violet-400" />
                </div>

                <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${certificate.status === "active"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-red-500/30 bg-red-500/10 text-red-400"
                        }`}
                >
                    {certificate.status.toUpperCase()}
                </span>
            </div>

            <h3 className="text-xl font-bold text-white">
                {certificate.name}
            </h3>

            <p className="mt-3 min-h-[72px] text-sm leading-6 text-zinc-500">
                {certificate.description || "Certificate issued by Noor Funding."}
            </p>

            <div className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-400">
                <Calendar className="h-4 w-4 text-violet-400" />
                Issued:{" "}
                {certificate.created_at
                    ? new Date(certificate.created_at).toLocaleDateString()
                    : "-"}
            </div>

            <Button
                variant="outline"
                className="mt-5 w-full rounded-xl border-violet-500/30 text-white hover:bg-violet-500/20"
            >
                <Download className="mr-2 h-4 w-4" />
                Download Certificate
            </Button>
        </div>
    );
}