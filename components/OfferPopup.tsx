"use client";

import { useEffect, useState } from "react";
import { X, Gift, Clock, Sparkles } from "lucide-react";

export default function OfferPopup() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const closed = sessionStorage.getItem("offerPopupClosed");

        if (!closed) {
            setShow(true);
        }
    }, []);

    const closePopup = () => {
        sessionStorage.setItem("offerPopupClosed", "true");
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950 via-zinc-950 to-black p-6 text-white shadow-2xl shadow-purple-500/20">
                <button
                    onClick={closePopup}
                    className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/40 p-2 text-gray-400 hover:bg-white/10 hover:text-white"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

                <div className="relative z-10">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                        <Sparkles className="h-4 w-4" />
                        Weekly Offer
                    </div>

                    <h2 className="text-3xl font-bold md:text-4xl">
                        Special Noor Funding Offer
                    </h2>

                    <p className="mt-3 text-gray-400">
                        Limited-time premium deal. Use promo code below before this offer ends.
                    </p>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                        <div className="flex items-center gap-3">
                            <Gift className="h-6 w-6 text-purple-400" />
                            <div>
                                <p className="text-sm text-gray-400">Promo Code</p>
                                <p className="text-2xl font-extrabold text-purple-300">NOOR20</p>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center gap-2 text-sm text-gray-300">
                            <Clock className="h-4 w-4 text-purple-400" />
                            Offer available for this week only
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}