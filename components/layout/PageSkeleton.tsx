export default function PageSkeleton() {
    return (
        <div className="min-h-screen bg-[#050509] p-8 text-white">
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="h-32 animate-pulse rounded-3xl bg-white/5" />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                    <div className="h-28 animate-pulse rounded-2xl bg-white/5" />
                    <div className="h-28 animate-pulse rounded-2xl bg-white/5" />
                    <div className="h-28 animate-pulse rounded-2xl bg-white/5" />
                    <div className="h-28 animate-pulse rounded-2xl bg-white/5" />
                </div>

                <div className="h-80 animate-pulse rounded-3xl bg-white/5" />
            </div>
        </div>
    );
}