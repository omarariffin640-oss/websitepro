"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Award,
    Download,
    Calendar,
    CheckCircle,
    Trophy,
    Star,
    FileBadge,
    ArrowUpRight,
} from "lucide-react";

type Certificate = {
    id: number;
    user_email: string;
    name: string;
    type: "challenge" | "funded" | "achievement";
    created_at?: string;
    status: "active" | "expired";
    description?: string;
};

export default function CertificatesPage() {
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [certificates, setCertificates] = useState<Certificate[]>([]);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetch(`https://websitepro-d5cu.onrender.com/certificates?email=${email}`)
            .then((res) => res.json())
            .then((data) => {
                setCertificates(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [router]);

    const activeCount = certificates.filter((cert) => cert.status === "active").length;
    const fundedCount = certificates.filter((cert) => cert.type === "funded").length;
    const achievementCount = certificates.filter((cert) => cert.type === "achievement").length;

    const getTypeBadge = (type: Certificate["type"]) => {
        switch (type) {
            case "challenge":
                return <Badge className="border-purple-500/30 bg-purple-500/20 text-purple-300">Challenge</Badge>;
            case "funded":
                return <Badge className="border-green-500/30 bg-green-500/20 text-green-400">Funded</Badge>;
            case "achievement":
                return <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">Achievement</Badge>;
            default:
                return <Badge className="border-gray-500/30 bg-gray-500/20 text-gray-400">Unknown</Badge>;
        }
    };

    const getTypeIcon = (type: Certificate["type"]) => {
        if (type === "funded") return Trophy;
        if (type === "achievement") return Star;
        return Award;
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading certificates...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050509] text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />

            <main className="pt-8 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                    <section className="relative mb-8 overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
                        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                                    <FileBadge className="h-4 w-4" />
                                    Certificate Center
                                </div>

                                <h1 className="text-3xl font-bold md:text-4xl">
                                    Your Certificates
                                </h1>

                                <p className="mt-3 max-w-2xl text-gray-400">
                                    View your challenge achievements, funded trader status, and performance milestones.
                                </p>
                            </div>

                            <Button className="rounded-xl bg-purple-500 px-6 py-6 text-white hover:bg-purple-600">
                                View All
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </section>

                    <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                        <SummaryCard icon={CheckCircle} title="Active Certificates" value={activeCount.toString()} color="text-green-400" />
                        <SummaryCard icon={Trophy} title="Funded Status" value={fundedCount.toString()} color="text-purple-400" />
                        <SummaryCard icon={Star} title="Achievements" value={achievementCount.toString()} color="text-yellow-400" />
                    </div>

                    {certificates.length === 0 ? (
                        <Card className="border-white/10 bg-zinc-950/70">
                            <CardContent className="p-8 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/20">
                                    <Award className="h-8 w-8 text-purple-400" />
                                </div>

                                <h2 className="text-2xl font-bold text-white">No Certificates Yet</h2>

                                <p className="mt-2 text-gray-400">
                                    Complete a challenge or milestone to unlock your first certificate.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {certificates.map((cert) => {
                                const TypeIcon = getTypeIcon(cert.type);

                                return (
                                    <Card
                                        key={cert.id}
                                        className="border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-gray-950 transition hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10"
                                    >
                                        <CardHeader>
                                            <div className="mb-4 flex items-start justify-between gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                                                    <TypeIcon className="h-6 w-6 text-purple-400" />
                                                </div>

                                                <Badge
                                                    className={
                                                        cert.status === "active"
                                                            ? "border-green-500/30 bg-green-500/20 text-green-400"
                                                            : "border-red-500/30 bg-red-500/20 text-red-400"
                                                    }
                                                >
                                                    {(cert.status || "active").toUpperCase()}
                                                </Badge>
                                            </div>

                                            <CardTitle className="text-white">{cert.name}</CardTitle>
                                            <div className="mt-2">{getTypeBadge(cert.type)}</div>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                            <p className="text-sm leading-relaxed text-gray-400">
                                                {cert.description || "Certificate issued by Noor Funding."}
                                            </p>

                                            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-gray-400">
                                                <Calendar className="h-4 w-4 text-purple-400" />
                                                Issued: {cert.created_at ? new Date(cert.created_at).toLocaleDateString() : "-"}
                                            </div>

                                            <Button
                                                variant="outline"
                                                className="w-full rounded-xl border-purple-500/30 text-white hover:bg-purple-500/20"
                                            >
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Certificate
                                            </Button>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

function SummaryCard({
    icon: Icon,
    title,
    value,
    color,
}: {
    icon: any;
    title: string;
    value: string;
    color: string;
}) {
    return (
        <Card className="border-white/10 bg-white/5 transition hover:border-purple-500/40 hover:bg-purple-500/10">
            <CardContent className="p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                    <Icon className={`h-6 w-6 ${color}`} />
                </div>

                <p className="text-sm text-gray-400">{title}</p>
                <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
            </CardContent>
        </Card>
    );
}