"use client";

import { Inbox } from "lucide-react";

type Props = {
    title: string;
    description: string;
};

export default function EmptyState({
    title,
    description,
}: Props) {
    return (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10">
                <Inbox className="h-8 w-8 text-violet-400" />
            </div>

            <h3 className="text-xl font-semibold text-white">
                {title}
            </h3>

            <p className="mt-2 text-zinc-400">
                {description}
            </p>
        </div>
    );
}