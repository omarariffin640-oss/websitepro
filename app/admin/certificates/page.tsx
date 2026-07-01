"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Mail, Calendar, PlusCircle } from "lucide-react";

type Certificate = {
    id: number;
    user_email: string;
    name: string;
    type: string;
    description?: string;
    status: string;
    created_at?: string;
};

export default function AdminCertificatesPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }

        fetchCertificates();
    }, [router]);

    const fetchCertificates = async () => {
        try {
            const res = await fetch("https://websitepro-d5cu.onrender.com/admin/certificates");
            const data = await res.json();
            setCertificates(Array.isArray(data) ? data : []);
        } catch {
            setCertificates([]);
        } finally {
            setLoading(false);
        }
    };

    const issueCertificate = async () => {
        const email = prompt("User email:");
        if (!email) return;

        const name = prompt("Certificate name:", "Funded Trader Certificate");
        if (!name) return;

        const res = await fetch("https://websitepro-d5cu.onrender.com/admin/certificates/issue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                name,
                type: "funded",
                description: "Certificate issued by Noor Funding",
            }),
        });

        const data = await res.json();

        if (data.success) {
            alert("Certificate issued.");
            fetchCertificates();
        } else {
            alert(data.message || "Failed to issue certificate.");
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading certificates...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />

            <main className="pt-6 lg:ml-74">
                <div className="mx-auto max-w-7xl px-4 pb-12 animate-fade-in">
                    <section className="mb-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                            <Award className="h-4 w-4" />
                            Admin Certificates
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold md:text-4xl">Certificate Management</h1>
                                <p className="mt-3 text-gray-400">
                                    Issue and manage trader certificates.
                                </p>
                            </div>

                            <Button onClick={issueCertificate} className="bg-purple-500 hover:bg-purple-600">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Issue Certificate
                            </Button>
                        </div>
                    </section>

                    <Card className="border-white/10 bg-white/5">
                        <CardHeader>
                            <CardTitle className="text-white">
                                All Certificates ({certificates.length})
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            {certificates.length === 0 ? (
                                <div className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-gray-400">
                                    No certificates found.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {certificates.map((cert) => (
                                        <div
                                            key={cert.id}
                                            className="rounded-xl border border-white/10 bg-black/40 p-4 transition hover:border-purple-500/40 hover:bg-purple-500/10"
                                        >
                                            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                                                <div>
                                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                                        <h3 className="text-lg font-bold text-white">
                                                            {cert.name}
                                                        </h3>
                                                        <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
                                                            {cert.status || "active"}
                                                        </Badge>
                                                    </div>

                                                    <p className="flex items-center gap-2 text-sm text-gray-400">
                                                        <Mail className="h-4 w-4 text-purple-400" />
                                                        {cert.user_email}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Certificate ID: #{cert.id}
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 xl:min-w-[420px]">
                                                    <Info label="Type" value={cert.type || "funded"} />
                                                    <Info
                                                        label="Issued"
                                                        value={
                                                            cert.created_at
                                                                ? new Date(cert.created_at).toLocaleDateString()
                                                                : "-"
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            {cert.description && (
                                                <p className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-gray-400">
                                                    {cert.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
            <div className="mb-1 flex items-center gap-2 text-gray-400">
                <Calendar className="h-4 w-4 text-purple-400" />
                <span>{label}</span>
            </div>
            <p className="font-medium text-white">{value}</p>
        </div>
    );
}