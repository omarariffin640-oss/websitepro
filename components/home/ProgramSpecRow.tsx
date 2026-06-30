type Props = {
    label: string;
    value: string;
};

export default function ProgramSpecRow({
    label,
    value,
}: Props) {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-white/10 py-3">
            <span className="text-sm text-zinc-400">
                {label}
            </span>

            <span className="text-right text-sm font-medium text-white">
                {value}
            </span>
        </div>
    );
}