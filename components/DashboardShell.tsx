"use client";

import { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

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

            <div className="min-h-screen bg-[#050509] pt-[114px] text-white">
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    onOpen={() => setSidebarOpen(true)}
                />

                <main className="pt-8 lg:ml-72">
                    <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}