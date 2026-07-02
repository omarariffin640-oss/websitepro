import { HelpCircle } from "lucide-react";

export default function HomeFAQ() {
    const faqs = [
        ["How do I get funded?", "Choose a challenge, pass the rules, and receive your funded account."],
        ["Is Free Trial available?", "Yes. Free Trial runs for 14 days and helps traders test the platform."],
        ["How fast are payouts?", "Most payout requests are reviewed within 24 hours."],
        ["Can I buy multiple accounts?", "Yes, as long as total allocation follows Noor Funding limits."],
        ["Do I need KYC?", "KYC may be required before payout approval."],
        ["Is there a time limit?", "Paid challenges have unlimited trading period."],
        ["What is profit split?", "Eligible funded traders can receive up to 90% reward split."],
        ["Can I trade news?", "Rules depend on the program selected. Always check challenge rules."],
        ["What happens after I pass?", "Your account is reviewed and upgraded based on program requirements."],
    ];

    return (
        <section className="px-4 py-8 md:py-10">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-6 max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                        <HelpCircle className="h-4 w-4" />
                        Trader FAQ
                    </div>

                    <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                        Frequently asked questions
                    </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {faqs.map(([q, a]) => (
                        <div
                            key={q}
                            className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/5"
                        >
                            <h3 className="text-lg font-semibold text-white">{q}</h3>
                            <p className="mt-3 text-sm leading-6 text-zinc-500">{a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};
