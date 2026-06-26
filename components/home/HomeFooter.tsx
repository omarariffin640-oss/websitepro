import Link from "next/link";

export default function HomeFooter() {
    return (
        <footer className="border-t border-white/10 px-4 py-12">
            <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
                <div>
                    <div className="mb-4 flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 font-bold text-white">
                            N
                        </div>
                        <span className="font-bold text-white">
                            NOOR <span className="text-violet-400">FUNDING</span>
                        </span>
                    </div>

                    <p className="text-sm leading-6 text-zinc-500">
                        Premium funded trading experience built for disciplined traders.
                    </p>
                </div>

                <div>
                    <h4 className="mb-4 font-semibold text-white">Platform</h4>
                    <ul className="space-y-2 text-sm text-zinc-500">
                        <li><Link href="/challenges" className="hover:text-white">Challenges</Link></li>
                        <li><Link href="/instant-account" className="hover:text-white">Instant Account</Link></li>
                        <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-4 font-semibold text-white">Trader</h4>
                    <ul className="space-y-2 text-sm text-zinc-500">
                        <li><Link href="/payouts" className="hover:text-white">Payouts</Link></li>
                        <li><Link href="/certificates" className="hover:text-white">Certificates</Link></li>
                        <li><Link href="/login" className="hover:text-white">Login</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-4 font-semibold text-white">Support</h4>
                    <ul className="space-y-2 text-sm text-zinc-500">
                        <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                        <li><Link href="/register" className="hover:text-white">Register</Link></li>
                        <li><Link href="/payouts" className="hover:text-white">Payout Info</Link></li>
                    </ul>
                </div>
            </div>

            <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-zinc-600 md:flex-row">
                <p>© 2026 Noor Funding. All rights reserved.</p>
                <p>Trade. Prove. Get Funded.</p>
            </div>
        </footer>
    );
}