"use client";

import { useEffect, useState } from "react";
import { X, Gift, Clock, Sparkles } from "lucide-react";

export default function OfferPopup() {
    const [show, setShow] = useState(false);
    const [isRunning] = useState(true);

    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 14,
        minutes: 36,
        seconds: 16,
    });

    useEffect(() => {
        const closed = sessionStorage.getItem("offerPopupClosed");
        if (!closed) setShow(true);
    }, []);

    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;

                seconds--;

                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }

                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                }

                if (hours < 0) {
                    hours = 23;
                    days--;
                }

                if (days < 0) {
                    clearInterval(timer);
                    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning]);

    const closePopup = () => {
        sessionStorage.setItem("offerPopupClosed", "true");
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950 via-zinc-950 to-black p-6 text-white shadow-2xl shadow-purple-500/20">
                <button
                    type="button"
                    onClick={closePopup}
                    className="absolute right-4 top-4 z-50 rounded-full border border-white/10 bg-black/60 p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

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
                                <p className="text-2xl font-extrabold text-purple-300">
                                    NOOR20
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-gray-300">
                            <Clock className="h-4 w-4 text-purple-400" />
                            <span>Ends in</span>

                            <span className="rounded-md bg-purple-500/20 px-2 py-1 font-mono text-white">
                                {String(timeLeft.days).padStart(2, "0")}d
                            </span>

                            <span className="rounded-md bg-purple-500/20 px-2 py-1 font-mono text-white">
                                {String(timeLeft.hours).padStart(2, "0")}h
                            </span>

                            <span className="rounded-md bg-purple-500/20 px-2 py-1 font-mono text-white">
                                {String(timeLeft.minutes).padStart(2, "0")}m
                            </span>

                            <span className="rounded-md bg-purple-500/20 px-2 py-1 font-mono text-white">
                                {String(timeLeft.seconds).padStart(2, "0")}s
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}