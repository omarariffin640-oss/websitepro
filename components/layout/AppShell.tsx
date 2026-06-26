"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

type AppShellProps = {
    children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpen={() => setSidebarOpen(true)}
            />
            <main className="pt-4 lg:ml-64 lg:pt-6">
                <div className="mx-auto max-w-7xl px-4 pb-12">{children}</div>
            </main>
        </div>
    );
}
