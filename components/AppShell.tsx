"use client";

import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Topbar from "@/components/Topbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isDashboardRoute =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/accounts") ||
        pathname.startsWith("/payouts") ||
        pathname.startsWith("/certificates") ||
        pathname.startsWith("/profile") ||
        pathname.startsWith("/settings") ||
        pathname.startsWith("/instant-account") ||
        pathname.startsWith("/marketplace") ||
        pathname.startsWith("/challenges");

    if (isDashboardRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <AnnouncementBar />
            <Topbar />
            <main className="pt-[114px]">{children}</main>
        </>
    );
}