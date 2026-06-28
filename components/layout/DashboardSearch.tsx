"use client";

import { Search } from "lucide-react";

type Props = {
    placeholder?: string;
};

export default function DashboardSearch({
    placeholder = "Search...",
}: Props) {
    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

            <input
                type="text"
                placeholder={placeholder}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500"
            />
        </div>
    );
}