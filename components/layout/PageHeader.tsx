"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

type PageHeaderProps = {
    title: string;
    description?: string;
    badge?: string;
    onMenuClick?: () => void;
    actions?: React.ReactNode;
};

export default function PageHeader({
    title,
    description,
    badge,
    onMenuClick,
    actions,
}: PageHeaderProps) {
    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
                {onMenuClick && (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onMenuClick}
                        className="mt-0.5 shrink-0 border-gray-800 bg-gray-950/80 lg:hidden"
                        aria-label="Open navigation menu"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                )}

                <div>
                    {badge && (
                        <span className="mb-2 inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                            {badge}
                        </span>
                    )}
                    <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-2 max-w-2xl text-sm text-gray-400 md:text-base">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
    );
}
