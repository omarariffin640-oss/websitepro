type Props = {
    active: "1-Step Challenge" | "2-Step Challenge";
    onChange: (value: "1-Step Challenge" | "2-Step Challenge") => void;
};

export default function ChallengeTabs({ active, onChange }: Props) {
    const tabs: Props["active"][] = ["1-Step Challenge", "2-Step Challenge"];

    return (
        <div className="mb-6 flex flex-wrap gap-3">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    type="button"
                    onClick={() => onChange(tab)}
                    className={`rounded-full border px-5 py-2 text-sm font-medium transition ${active === tab
                            ? "border-violet-500 bg-violet-600 text-white"
                            : "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-violet-500/40 hover:text-white"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}