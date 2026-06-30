"use client";

import { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import AppBackground from "@/components/layout/AppBackground";

export default function DashboardShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <AnnouncementBar />
            <Topbar />

            <div className="relative min-h-screen overflow-hidden bg-[#050509] pt-[114px] text-white">
                <AppBackground />

                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    onOpen={() => setSidebarOpen(true)}
                />

                <main className="relative z-10 pt-8 lg:ml-72">
                    <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}