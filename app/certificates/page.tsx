"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardShell from "@/components/DashboardShell";
import DashboardTopbar from "@/components/layout/DashboardTopbar";
import PageSkeleton from "@/components/layout/PageSkeleton";
import EmptyState from "@/components/layout/EmptyState";

import CertificatesHero from "@/components/certificates/CertificatesHero";
import CertificateGrid from "@/components/certificates/CertificateGrid";
import { Certificate } from "@/components/certificates/CertificateCard";

export default function CertificatesPage() {
    const router = useRouter();

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
            })
            .finally(() => setLoading(false));
    }, [router]);

    const activeCount = certificates.filter((c) => c.status === "active").length;
    const fundedCount = certificates.filter((c) => c.type === "funded").length;
    const achievementCount = certificates.filter(
        (c) => c.type === "achievement"
    ).length;

    if (loading) {
        return (
            <DashboardShell>
                <PageSkeleton />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <DashboardTopbar
                title="Certificates"
                description="View your funded, challenge and achievement certificates."
            />

            <CertificatesHero
                activeCount={activeCount}
                fundedCount={fundedCount}
                achievementCount={achievementCount}
            />

            {certificates.length === 0 ? (
                <EmptyState
                    title="No certificates yet"
                    description="Your funded, challenge and achievement certificates will appear here once available."
                />
            ) : (
                <CertificateGrid certificates={certificates} />
            )}
        </DashboardShell>
    );
}