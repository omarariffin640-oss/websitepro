"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

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
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
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
        setUserEmail(email);
        setLoading(false);

        // Mock tickets - nanti connect ke backend
        setTickets([
            { id: 1, subject: "Login issue", message: "Can't login to account", status: "open", created_at: new Date().toISOString() },
            { id: 2, subject: "Withdrawal problem", message: "Payout pending for 3 days", status: "in_progress", created_at: new Date().toISOString() },
        ]);
    }, [router]);

    const submitTicket = async () => {
        if (!subject || !message) {
            setSubmitMessage("Please fill in all fields");
            return;
        }

        setSubmitMessage("Submitting...");

        // Mock submit - nanti connect ke backend
        const newTicket = {
            id: tickets.length + 1,
            subject,
            message,
            status: "open" as const,
            created_at: new Date().toISOString()
        };
        setTickets([newTicket, ...tickets]);
        setSubject("");
        setMessage("");
        setSubmitMessage("Ticket submitted successfully!");
        setTimeout(() => setSubmitMessage(""), 3000);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "open": return "text-green-500 bg-green-500/10";
            case "in_progress": return "text-yellow-500 bg-yellow-500/10";
            case "closed": return "text-red-500 bg-red-500/10";
            default: return "text-gray-500";
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-darknavy">
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-2">
                <div className="p-3">
                    <h1 className="text-2xl font-bold text-white mb-3">Support</h1>

                    {submitMessage && (
                        <div className={`mb-4 p-3 rounded-lg ${submitMessage.includes("successfully") ? "bg-green-500/20 border border-green-500" : "bg-yellow-500/20 border border-yellow-500"}`}>
                            <p className={submitMessage.includes("successfully") ? "text-green-500" : "text-yellow-500"}>{submitMessage}</p>
                        </div>
                    )}

                    {/* New Ticket Form */}
                    <Card className="bg-darkcard mb-6">
                        <CardHeader>
                            <CardTitle className="text-white">Create New Ticket</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-gray-300">Subject</Label>
                                <Input
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Brief description of your issue"
                                    className="bg-darknavy border-gray-700 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-300">Message</Label>
                                <Textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Detailed description of your issue..."
                                    rows={4}
                                    className="bg-darknavy border-gray-700 text-white"
                                />
                            </div>
                            <Button onClick={submitTicket} className="bg-orange-500 hover:bg-orange-600">
                                Submit Ticket
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Tickets List */}
                    <Card className="bg-darkcard">
                        <CardHeader>
                            <CardTitle className="text-white">My Tickets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {tickets.length === 0 ? (
                                <p className="text-gray-400 text-center">No tickets yet. Create one above.</p>
                            ) : (
                                <div className="space-y-3">
                                    {tickets.map((ticket) => (
                                        <div key={ticket.id} className="p-4 rounded-lg bg-darknavy/50">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold text-white">{ticket.subject}</h3>
                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                                                    {ticket.status.replace("_", " ").toUpperCase()}
                                                </span>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-2">{ticket.message}</p>
                                            <p className="text-gray-500 text-xs">{new Date(ticket.created_at).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}