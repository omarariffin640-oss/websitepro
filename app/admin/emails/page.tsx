"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Edit, CheckCircle, Trash2, Plus, X } from "lucide-react";
import { API_BASE } from "@/lib/api";

type EmailTemplate = {
    id: number;
    title: string;
    description?: string;
    subject?: string;
    body?: string;
    status?: string;
};

export default function EmailTemplatesPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [message, setMessage] = useState("");

    const [editingId, setEditingId] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const fetchTemplates = async () => {
        try {
            const res = await fetch(`${API_BASE}/admin/emails`);
            const data = await res.json();
            setTemplates(Array.isArray(data) ? data : []);
        } catch {
            setTemplates([]);
        }
    };

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetchTemplates();
        setLoading(false);
    }, [router]);

    const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
        setSubject("");
        setBody("");
    };

    const saveTemplate = async () => {
        if (!title || !subject || !body) {
            setMessage("Please fill title, subject and body.");
            return;
        }

        const url = editingId
            ? `${API_BASE}/admin/emails/${editingId}`
            : `${API_BASE}/admin/emails`;

        const method = editingId ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                description,
                subject,
                body,
                status: "active",
            }),
        });

        const data = await res.json();

        if (!data.success) {
            setMessage(data.message || "Failed to save template.");
            return;
        }

        setMessage(editingId ? "Template updated successfully." : "Template created successfully.");
        resetForm();
        fetchTemplates();
    };

    const editTemplate = (template: EmailTemplate) => {
        setEditingId(template.id);
        setTitle(template.title || "");
        setDescription(template.description || "");
        setSubject(template.subject || "");
        setBody(template.body || "");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const deleteTemplate = async (id: number) => {
        if (!confirm("Delete this email template?")) return;

        const res = await fetch(`${API_BASE}/admin/emails/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (!data.success) {
            setMessage(data.message || "Failed to delete template.");
            return;
        }

        setMessage("Template deleted successfully.");
        fetchTemplates();
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading email templates...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpen={() => setSidebarOpen(true)}
            />

            <main className="pt-6 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                    <section className="mb-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                            <Mail className="h-4 w-4" />
                            Email Templates
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">Email Management</h1>
                        <p className="mt-3 text-gray-400">
                            Create, edit and delete automated email templates.
                        </p>
                    </section>

                    {message && (
                        <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-400">
                            {message}
                        </div>
                    )}

                    <Card className="mb-6 border-white/10 bg-white/5">
                        <CardContent className="space-y-4 p-6">
                            <h2 className="text-lg font-semibold">
                                {editingId ? "Edit Template" : "Create Template"}
                            </h2>

                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Template title"
                                className="border-white/10 bg-black/40 text-white"
                            />

                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                className="border-white/10 bg-black/40 text-white"
                            />

                            <Input
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Email subject"
                                className="border-white/10 bg-black/40 text-white"
                            />

                            <Textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Email body"
                                rows={6}
                                className="border-white/10 bg-black/40 text-white"
                            />

                            <div className="flex gap-3">
                                <Button onClick={saveTemplate} className="bg-purple-600 hover:bg-purple-700">
                                    <Plus className="mr-2 h-4 w-4" />
                                    {editingId ? "Update Template" : "Create Template"}
                                </Button>

                                {editingId && (
                                    <Button onClick={resetForm} variant="ghost" className="text-gray-300">
                                        <X className="mr-2 h-4 w-4" />
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-5 md:grid-cols-2">
                        {templates.map((template) => (
                            <Card key={template.id} className="border-white/10 bg-white/5 hover:border-purple-500/40">
                                <CardContent className="p-6">
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">{template.title}</h2>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Template ID: #{template.id}
                                            </p>
                                            <p className="mt-2 text-sm text-gray-400">{template.description || "-"}</p>
                                            <p className="mt-3 text-sm text-purple-300">{template.subject || "-"}</p>
                                        </div>

                                        <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                                            <CheckCircle className="h-3.5 w-3.5" />
                                            {template.status || "active"}
                                        </span>
                                    </div>

                                    <p className="mb-4 rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-gray-300">
                                        {template.body || "No body"}
                                    </p>

                                    <div className="flex gap-2">
                                        <Button onClick={() => editTemplate(template)} className="bg-purple-600 hover:bg-purple-700">
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </Button>

                                        <Button
                                            onClick={() => deleteTemplate(template.id)}
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-400 hover:bg-red-500/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {templates.length === 0 && (
                            <p className="text-gray-400">No email templates found.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}