"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";

import CertificatesHero from "@/components/certificates/CertificatesHero";
import CertificateGrid from "@/components/certificates/CertificateGrid";
import { Certificate } from "@/components/certificates/CertificateCard";

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

        fetch(
            `https://websitepro-d5cu.onrender.com/certificates?email=${email}`
        )
            .then((res) => res.json())
            .then((data) => {
                setCertificates(Array.isArray(data) ? data : []);
            })
            .finally(() => setLoading(false));
    }, [router]);

    const activeCount = certificates.filter(
        (c) => c.status === "active"
    ).length;

    const fundedCount = certificates.filter(
        (c) => c.type === "funded"
    ).length;

    const achievementCount = certificates.filter(
        (c) => c.type === "achievement"
    ).length;

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-zinc-400">Loading certificates...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050509] text-white">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpen={() => setSidebarOpen(true)}
            />

            <main className="pt-8 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">

                    <CertificatesHero
                        activeCount={activeCount}
                        fundedCount={fundedCount}
                        achievementCount={achievementCount}
                    />

                    <CertificateGrid
                        certificates={certificates}
                    />

                </div>
            </main>
        </div>
    );
}