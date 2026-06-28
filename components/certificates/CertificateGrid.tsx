import CertificateCard, { Certificate } from "./CertificateCard";
import { Award } from "lucide-react";

type Props = {
    certificates: Certificate[];
};

export default function CertificateGrid({ certificates }: Props) {
    if (certificates.length === 0) {
        return (
            <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-12 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
                    <Award className="h-8 w-8 text-violet-400" />
                </div>

                <h2 className="text-2xl font-bold text-white">
                    No Certificates Yet
                </h2>

                <p className="mt-3 text-zinc-500">
                    Complete a challenge or funded milestone to unlock your first
                    certificate.
                </p>
            </div>
        );
    }

    return (
        <section>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                    Your Certificates
                </h2>

                <p className="mt-2 text-zinc-500">
                    All certificates issued by Noor Funding are listed below.
                </p>
            </div>

            <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 xl:grid-cols-3">
                {certificates.map((certificate) => (
                    <CertificateCard
                        key={certificate.id}
                        certificate={certificate}
                    />
                ))}
            </div>
        </section>
    );
}