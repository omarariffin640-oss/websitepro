import { ReactNode } from "react";

export function Section({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <section className={`bg-black px-4 py-16 md:py-20 ${className}`}>
            <div className="mx-auto max-w-7xl">{children}</div>
        </section>
    );
}

export function SectionHeader({
    eyebrow,
    title,
    description,
}: {
    eyebrow?: string;
    title: string;
    description?: string;
}) {
    return (
        <div className="mx-auto mb-10 max-w-3xl text-center">
            {eyebrow && (
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
                    {eyebrow}
                </p>
            )}

            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                {title}
            </h2>

            {description && (
                <p className="mt-4 text-lg leading-relaxed text-gray-400">
                    {description}
                </p>
            )}
        </div>
    );
}