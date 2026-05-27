"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const caseSchema = z.object({
    clientName: z.string().min(2, "Client name is required"),
    opposingParty: z.string().min(2, "Opposing party is required"),
    courtName: z.string().min(2, "Court name is required"),
    caseType: z.string().min(2, "Case type is required"),
    caseNumber: z.string().optional(),
    filingDate: z.string().optional(),
    status: z.string().min(1, "Status is required"),
});

type CaseFormValues = z.infer<typeof caseSchema>;

export default function AddCasePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<CaseFormValues>({
        resolver: zodResolver(caseSchema),
        defaultValues: {
            clientName: "",
            opposingParty: "",
            courtName: "",
            caseType: "",
            caseNumber: "",
            filingDate: "",
            status: "draft",
        },
    });

    const onSubmit = async (data: CaseFormValues) => {
        setIsSubmitting(true);
        // Simulate API submission
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Mock submitted:", data);
        setIsSubmitting(false);
        router.push("/lawyer-dashboard/cases");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-4">
                <Button variant="ghost" className="p-2 text-[#888] hover:text-white hover:bg-[#1a1a1a]">
                    <Link href="/lawyer-dashboard/cases">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-white">Add New Case</h1>
                    <p className="text-sm text-[#a0a0a0]">Enter the details to register a new matter in your directory.</p>
                </div>
            </div>

            <Card className="bg-[#111] border-[#333]">
                <CardHeader className="border-b border-[#222]">
                    <CardTitle className="text-lg text-white">Case Details</CardTitle>
                    <CardDescription className="text-[#888]">All fields marked with an asterisk (*) are required.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ccc]">Client Name *</label>
                                <input
                                    {...form.register("clientName")}
                                    className={`w-full bg-[#1a1a1a] border ${form.formState.errors.clientName ? 'border-red-500' : 'border-[#333]'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#ffcc99] transition-colors`}
                                    placeholder="e.g. Rajesh Kumar"
                                />
                                {form.formState.errors.clientName && <p className="text-xs text-red-500">{form.formState.errors.clientName.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ccc]">Opposing Party *</label>
                                <input
                                    {...form.register("opposingParty")}
                                    className={`w-full bg-[#1a1a1a] border ${form.formState.errors.opposingParty ? 'border-red-500' : 'border-[#333]'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#ffcc99] transition-colors`}
                                    placeholder="e.g. State of Delhi"
                                />
                                {form.formState.errors.opposingParty && <p className="text-xs text-red-500">{form.formState.errors.opposingParty.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ccc]">Court Name *</label>
                                <input
                                    {...form.register("courtName")}
                                    className={`w-full bg-[#1a1a1a] border ${form.formState.errors.courtName ? 'border-red-500' : 'border-[#333]'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#ffcc99] transition-colors`}
                                    placeholder="e.g. Tis Hazari Court"
                                />
                                {form.formState.errors.courtName && <p className="text-xs text-red-500">{form.formState.errors.courtName.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ccc]">Case Type *</label>
                                <select
                                    {...form.register("caseType")}
                                    className={`w-full bg-[#1a1a1a] border ${form.formState.errors.caseType ? 'border-red-500' : 'border-[#333]'} rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#ffcc99] transition-colors`}
                                >
                                    <option value="">Select Type</option>
                                    <option value="civil">Civil Suit</option>
                                    <option value="criminal">Criminal</option>
                                    <option value="family">Family / Matrimonial</option>
                                    <option value="corporate">Corporate / NCLT</option>
                                    <option value="writ">Writ Petition</option>
                                </select>
                                {form.formState.errors.caseType && <p className="text-xs text-red-500">{form.formState.errors.caseType.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ccc]">Case Number <span className="text-[#666]">(If allotted)</span></label>
                                <input
                                    {...form.register("caseNumber")}
                                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#ffcc99] transition-colors"
                                    placeholder="e.g. CS/2024/001"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ccc]">Filing Date</label>
                                <input
                                    type="date"
                                    {...form.register("filingDate")}
                                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#ffcc99] transition-colors [color-scheme:dark]"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-[#ccc]">Current Status *</label>
                                <div className="flex gap-4">
                                    {['draft', 'active', 'stayed'].map((statusOption) => (
                                        <label key={statusOption} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                value={statusOption}
                                                {...form.register("status")}
                                                className="accent-[#ffcc99] h-4 w-4"
                                            />
                                            <span className="text-white capitalize text-sm">{statusOption}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-[#222] pt-6 flex justify-end gap-3">
                            <Button type="button" variant="outline" className="border-[#333] text-[#ccc] hover:bg-[#1a1a1a] hover:text-white">
                                <Link href="/lawyer-dashboard/cases">Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                {isSubmitting ? "Saving..." : "Save Case"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
