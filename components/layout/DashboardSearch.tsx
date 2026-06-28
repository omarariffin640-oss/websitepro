"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { dashboardItems } from "@/lib/dashboardSearch";

type Props = {
    placeholder?: string;
};

export default function DashboardSearch({
    placeholder = "Search...",
}: Props) {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const results = dashboardItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    const goToPage = (href: string) => {
        setQuery("");
        router.push(href);
    };

    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && results[0]) {
                        goToPage(results[0].href);
                    }
                }}
                placeholder={placeholder}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500"
            />

            {query && (
                <div className="absolute left-0 right-0 top-14 z-50 rounded-2xl border border-white/10 bg-zinc-950 p-2 shadow-2xl shadow-black/40">
                    {results.length > 0 ? (
                        results.map((item) => (
                            <button
                                key={item.href}
                                onClick={() => goToPage(item.href)}
                                className="w-full rounded-xl px-3 py-3 text-left text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                            >
                                {item.title}
                            </button>
                        ))
                    ) : (
                        <p className="px-3 py-3 text-sm text-zinc-500">
                            No results found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}