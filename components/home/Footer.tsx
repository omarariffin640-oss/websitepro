"use client";

import Link from "next/link";
import { Send, Twitter, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black px-4 py-12 text-white">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-600">
                                <span className="text-sm font-bold">NF</span>
                            </div>
                            <span className="font-bold">
                                NOOR <span className="text-purple-400">FUNDING</span>
                            </span>
                        </div>

                        <p className="text-sm leading-relaxed text-gray-400">
                            Empowering traders worldwide. Trade. Prove. Get Funded.
                        </p>
                    </div>

                    <FooterGroup
                        title="Platform"
                        links={[
                            ["Challenges", "/challenges"],
                            ["Instant Account", "/instant-account"],
                            ["Dashboard", "/dashboard"],
                            ["Payouts", "/payouts"],
                        ]}
                    />

                    <FooterGroup
                        title="Company"
                        links={[
                            ["News", "/news"],
                            ["Blog", "/blog"],
                            ["FAQ", "/faq"],
                            ["Support", "/support"],
                        ]}
                    />

                    <div>
                        <h3 className="mb-4 font-semibold">Community</h3>
                        <div className="flex gap-3">
                            {[Twitter, Youtube, Linkedin, Send].map((Icon, index) => (
                                <div
                                    key={index}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-300 transition hover:border-purple-500/40 hover:text-white"
                                >
                                    <Icon className="h-4 w-4" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6 text-sm text-gray-500">
                    © {new Date().getFullYear()} Noor Funding. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

function FooterGroup({
    title,
    links,
}: {
    title: string;
    links: [string, string][];
}) {
    return (
        <div>
            <h3 className="mb-4 font-semibold">{title}</h3>
            <div className="space-y-2">
                {links.map(([label, href]) => (
                    <Link
                        key={label}
                        href={href}
                        className="block text-sm text-gray-400 transition hover:text-white"
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </div>
    );
}