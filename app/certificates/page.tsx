"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { Award, Download, Calendar, CheckCircle, Clock } from "lucide-react";

type Certificate = {
    id: number;
    name: string;
    type: "challenge" | "funded" | "achievement";
    issueDate: string;
    status: "active" | "expired";
    description: string;
};

export default function CertificatesPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        setLoading(false);
    }, [router]);

    const certificates: Certificate[] = [
        {
            id: 1,
            name: "Challenge Step 1 Completed",
            type: "challenge",
            issueDate: "2026-06-15",
            status: "active",
            description: "Successfully completed Step 1 challenge with 8% profit target"
        },
        {
            id: 2,
            name: "Funded Trader",
            type: "funded",
            issueDate: "2026-06-10",
            status: "active",
            description: "Approved for funding with $10,000 account"
        },
        {
            id: 3,
            name: "Consistent Profit Achievement",
            type: "achievement",
            issueDate: "2026-06-01",
            status: "active",
            description: "Achieved 5 consecutive profitable weeks"
        }
    ];

    const getTypeBadge = (type: string) => {
        switch (type) {
            case "challenge": return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Challenge</Badge>;
            case "funded": return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Funded</Badge>;
            case "achievement": return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Achievement</Badge>;
            default: return <Badge className="bg-gray-500/20 text-gray-400">Unknown</Badge>;
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
        <div className="min-h-screen bg-black">
            <Topbar onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-2">
                <div className="p-3 max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white">📜 Certificates</h1>
                            <p className="text-sm text-gray-400">View your achievements and certifications</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{certificates.length} Active</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {certificates.map((cert) => (
                            <Card key={cert.id} className="bg-[#1A1A1A] border-gray-800 hover:border-purple-500/30 transition-colors">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-purple-500/20">
                                                <Award className="h-5 w-5 text-purple-400" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-white text-base">{cert.name}</CardTitle>
                                                {getTypeBadge(cert.type)}
                                            </div>
                                        </div>
                                        <Badge className={cert.status === "active" ? "bg-green-500/20 text-green-500 border-green-500/30" : "bg-red-500/20 text-red-500 border-red-500/30"}>
                                            {cert.status.toUpperCase()}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-400 text-sm mb-3">{cert.description}</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <Calendar className="h-4 w-4" />
                                            <span>Issued: {cert.issueDate}</span>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                                            <Download className="h-4 w-4 mr-1" />
                                            Download
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}