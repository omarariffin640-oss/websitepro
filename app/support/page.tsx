"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Headset,
    MessageSquare,
    Clock,
    CheckCircle,
    AlertCircle,
    Mail,
    Send,
    ShieldQuestion,
    LifeBuoy,
} from "lucide-react";

type Ticket = {
    id: number;
    subject: string;
    message: string;
    status: "open" | "in_progress" | "closed";
    created_at: string;
};

export default function SupportPage() {
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitMessage, setSubmitMessage] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        setTickets([
            {
                id: 1,
                subject: "Login issue",
                message: "Can't login to account",
                status: "open",
                created_at: new Date().toISOString(),
            },
            {
                id: 2,
                subject: "Withdrawal problem",
                message: "Payout pending for 3 days",
                status: "in_progress",
                created_at: new Date().toISOString(),
            },
        ]);

        setLoading(false);
    }, [router]);

    const submitTicket = async () => {
        if (!subject.trim() || !message.trim()) {
            setSubmitMessage("Please fill in all fields.");
            return;
        }

        setSubmitMessage("Submitting ticket...");

        const newTicket: Ticket = {
            id: tickets.length + 1,
            subject,
            message,
            status: "open",
            created_at: new Date().toISOString(),
        };

        setTickets([newTicket, ...tickets]);
        setSubject("");
        setMessage("");
        setSubmitMessage("Ticket submitted successfully!");

        setTimeout(() => setSubmitMessage(""), 3000);
    };

    const getStatusBadge = (status: Ticket["status"]) => {
        switch (status) {
            case "open":
                return (
                    <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
                        Open
                    </Badge>
                );
            case "in_progress":
                return (
                    <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">
                        In Progress
                    </Badge>
                );
            case "closed":
                return (
                    <Badge className="border-red-500/30 bg-red-500/20 text-red-400">
                        Closed
                    </Badge>
                );
            default:
                return (
                    <Badge className="border-gray-500/30 bg-gray-500/20 text-gray-400">
                        Unknown
                    </Badge>
                );
        }
    };

    const openTickets = tickets.filter((ticket) => ticket.status === "open").length;
    const progressTickets = tickets.filter((ticket) => ticket.status === "in_progress").length;
    const closedTickets = tickets.filter((ticket) => ticket.status === "closed").length;

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading support...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />

            <main className="pt-6 lg:ml-64">
                <div className="mx-auto max-w-7xl px-4 pb-12">
                    <section className="relative mb-8 overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
                        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                                    <Headset className="h-4 w-4" />
                                    Support Center
                                </div>

                                <h1 className="text-3xl font-bold md:text-4xl">
                                    How Can We Help?
                                </h1>

                                <p className="mt-3 max-w-2xl text-gray-400">
                                    Create support tickets, track responses, and get help with accounts, challenges, payouts, and trading rules.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm">
                                <p className="text-gray-400">Support Status</p>
                                <p className="mt-1 flex items-center gap-2 font-semibold text-green-400">
                                    <CheckCircle className="h-4 w-4" />
                                    Online
                                </p>
                            </div>
                        </div>
                    </section>

                    {submitMessage && (
                        <div
                            className={`mb-6 rounded-xl border p-4 ${submitMessage.toLowerCase().includes("success")
                                    ? "border-green-500/30 bg-green-500/10 text-green-300"
                                    : "border-yellow-500/30 bg-yellow-500/10 text-yellow-300"
                                }`}
                        >
                            {submitMessage}
                        </div>
                    )}

                    <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                        <SummaryCard icon={MessageSquare} title="Open Tickets" value={openTickets.toString()} color="text-green-400" />
                        <SummaryCard icon={Clock} title="In Progress" value={progressTickets.toString()} color="text-yellow-400" />
                        <SummaryCard icon={CheckCircle} title="Closed Tickets" value={closedTickets.toString()} color="text-purple-400" />
                    </div>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <Card className="xl:col-span-1 border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-gray-950">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Send className="h-5 w-5 text-purple-400" />
                                    Create Ticket
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-gray-300">Subject</Label>
                                    <Input
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Brief description of your issue"
                                        className="rounded-xl border-gray-800 bg-black/50 text-white placeholder:text-gray-500 focus:border-purple-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-300">Message</Label>
                                    <Textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Describe your issue..."
                                        rows={6}
                                        className="rounded-xl border-gray-800 bg-black/50 text-white placeholder:text-gray-500 focus:border-purple-500"
                                    />
                                </div>

                                <Button
                                    onClick={submitTicket}
                                    className="w-full rounded-xl bg-purple-500 py-6 text-white hover:bg-purple-600"
                                >
                                    Submit Ticket
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="xl:col-span-2 border-white/10 bg-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <LifeBuoy className="h-5 w-5 text-purple-400" />
                                    My Tickets
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                {tickets.length === 0 ? (
                                    <div className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-gray-400">
                                        No tickets yet. Create one to contact support.
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {tickets.map((ticket) => (
                                            <div
                                                key={ticket.id}
                                                className="rounded-xl border border-white/10 bg-black/40 p-4 transition hover:border-purple-500/40 hover:bg-purple-500/10"
                                            >
                                                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-white">
                                                            {ticket.subject}
                                                        </h3>
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {new Date(ticket.created_at).toLocaleString()}
                                                        </p>
                                                    </div>

                                                    {getStatusBadge(ticket.status)}
                                                </div>

                                                <p className="text-sm leading-relaxed text-gray-400">
                                                    {ticket.message}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                        <HelpCard icon={Mail} title="Email Support" text="Get help with account and payout questions." />
                        <HelpCard icon={ShieldQuestion} title="Rules Support" text="Ask about drawdown, trading days, and challenge rules." />
                        <HelpCard icon={AlertCircle} title="Urgent Issues" text="Report login, payment, or account problems." />
                    </div>
                </div>
            </main>
        </div>
    );
}

function SummaryCard({
    icon: Icon,
    title,
    value,
    color,
}: {
    icon: any;
    title: string;
    value: string;
    color: string;
}) {
    return (
        <Card className="border-white/10 bg-white/5 transition hover:border-purple-500/40 hover:bg-purple-500/10">
            <CardContent className="p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                    <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
            </CardContent>
        </Card>
    );
}

function HelpCard({
    icon: Icon,
    title,
    text,
}: {
    icon: any;
    title: string;
    text: string;
}) {
    return (
        <Card className="border-white/10 bg-white/5 transition hover:border-purple-500/40 hover:bg-purple-500/10">
            <CardContent className="p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/20">
                    <Icon className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm text-gray-400">{text}</p>
            </CardContent>
        </Card>
    );
}