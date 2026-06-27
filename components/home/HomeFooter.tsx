import Link from "next/link";
import { ShieldCheck, Globe, Mail } from "lucide-react";

export default function HomeFooter() {
    return (
        <footer className="border-t border-white/10 bg-[#050509] px-4 py-14">
            <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">

                <div>
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 font-bold text-white shadow-lg shadow-violet-600/30">
                            N
                        </div>

                        <div>
                            <p className="font-bold text-white">
                                NOOR <span className="text-violet-400">FUNDING</span>
                            </p>
                            <p className="text-xs text-zinc-500">
                                Premium Prop Firm
                            </p>
                        </div>
                    </div>

                    <p className="text-sm leading-7 text-zinc-500">
                        Noor Funding provides a modern funded trading experience with
                        transparent rules, fast payouts and professional trader support.
                    </p>

                    <div className="mt-6 flex items-center gap-4 text-zinc-500">
                        <ShieldCheck className="h-5 w-5 text-violet-400" />
                        <Globe className="h-5 w-5 text-violet-400" />
                        <Mail className="h-5 w-5 text-violet-400" />
                    </div>
                </div>

                <div>
                    <h4 className="mb-5 font-semibold text-white">
                        Platform
                    </h4>

                    <ul className="space-y-3 text-sm text-zinc-500">
                        <li><Link href="/challenges" className="transition hover:text-white">Challenges</Link></li>
                        <li><Link href="/instant-account" className="transition hover:text-white">Instant Account</Link></li>
                        <li><Link href="/dashboard" className="transition hover:text-white">Dashboard</Link></li>
                        <li><Link href="/marketplace" className="transition hover:text-white">Marketplace</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-5 font-semibold text-white">
                        Traders
                    </h4>

                    <ul className="space-y-3 text-sm text-zinc-500">
                        <li><Link href="/payouts" className="transition hover:text-white">Payouts</Link></li>
                        <li><Link href="/certificates" className="transition hover:text-white">Certificates</Link></li>
                        <li><Link href="/faq" className="transition hover:text-white">FAQ</Link></li>
                        <li><Link href="/login" className="transition hover:text-white">Login</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-5 font-semibold text-white">
                        Legal
                    </h4>

                    <ul className="space-y-3 text-sm text-zinc-500">
                        <li><Link href="/terms" className="transition hover:text-white">Terms & Conditions</Link></li>
                        <li><Link href="/privacy" className="transition hover:text-white">Privacy Policy</Link></li>
                        <li><Link href="/risk-disclosure" className="transition hover:text-white">Risk Disclosure</Link></li>
                        <li><Link href="/contact" className="transition hover:text-white">Contact Us</Link></li>
                    </ul>
                </div>

            </div>

            <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">

                <p className="text-sm text-zinc-600">
                    © 2026 Noor Funding. All rights reserved.
                </p>

                <p className="text-center text-xs leading-6 text-zinc-600 md:max-w-xl">
                    Trading involves risk. Past performance does not guarantee future
                    results. Please trade responsibly and understand the risks involved.
                </p>

            </div>
        </footer>
    );
}