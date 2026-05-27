"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { FileText, Download, Wand2, FileSignature, CheckCircle2 } from "lucide-react";

export default function DocumentGeneratorPage() {
    const [docType, setDocType] = useState("");
    const [generating, setGenerating] = useState(false);
    const [previewReady, setPreviewReady] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        courtName: "",
        clientName: "",
        opposingParty: "",
        firNo: "",
        policeStation: "",
        chequeNo: "",
        amount: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenerate = () => {
        // Basic validation
        if (!docType || !formData.courtName || !formData.clientName) return;

        setGenerating(true);
        setTimeout(() => {
            setGenerating(false);
            setPreviewReady(true);
        }, 1500);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Document Generator</h1>
                    <p className="text-[#a0a0a0]">Draft standardized legal petitions and applications instantly.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Form Builder / Selector */}
                <div className="space-y-6">
                    <Card className="bg-[#111] border-[#333]">
                        <CardHeader className="border-b border-[#222]">
                            <CardTitle className="text-lg text-white">Document Details</CardTitle>
                            <CardDescription className="text-[#888]">Select the template and fill the required variables.</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ccc]">Document Type *</label>
                                <select
                                    value={docType}
                                    onChange={(e) => {
                                        setDocType(e.target.value);
                                        setPreviewReady(false);
                                    }}
                                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#ffcc99] transition-colors"
                                >
                                    <option value="">Select Template...</option>
                                    <option value="bail">Regular Bail Application (u/s 439 CrPC)</option>
                                    <option value="ni138">Cheque Bounce Complaint (138 NI Act)</option>
                                    <option value="divorce">Mutual Consent Divorce Petition</option>
                                    <option value="exemption">Application for Exemption from Personal Appearance</option>
                                </select>
                            </div>

                            {docType && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#888]">Court Name *</label>
                                            <input
                                                name="courtName"
                                                value={formData.courtName}
                                                onChange={handleInputChange}
                                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ffcc99]"
                                                placeholder="e.g. Tis Hazari Courts, Delhi"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#888]">Client Name (Applicant) *</label>
                                            <input
                                                name="clientName"
                                                value={formData.clientName}
                                                onChange={handleInputChange}
                                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ffcc99]"
                                                placeholder="e.g. Rajesh Kumar"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-[#888]">Opposing Party (Respondent) *</label>
                                            <input
                                                name="opposingParty"
                                                value={formData.opposingParty}
                                                onChange={handleInputChange}
                                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ffcc99]"
                                                placeholder="e.g. State of NCT of Delhi"
                                            />
                                        </div>
                                    </div>

                                    {/* Dynamic Fields based on docType */}
                                    {docType === 'bail' && (
                                        <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#222] grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-[#888]">FIR No.</label>
                                                <input
                                                    name="firNo"
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ffcc99]"
                                                    placeholder="e.g. 124/2024"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-[#888]">Police Station</label>
                                                <input
                                                    name="policeStation"
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ffcc99]"
                                                    placeholder="e.g. Vasant Kunj"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {docType === 'ni138' && (
                                        <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#222] grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-[#888]">Cheque No.</label>
                                                <input
                                                    name="chequeNo"
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ffcc99]"
                                                    placeholder="e.g. 054321"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-[#888]">Amount (₹)</label>
                                                <input
                                                    name="amount"
                                                    type="number"
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ffcc99]"
                                                    placeholder="e.g. 500000"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-4 flex justify-end">
                                        <Button
                                            onClick={handleGenerate}
                                            disabled={generating || !formData.courtName || !formData.clientName}
                                            className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold w-full sm:w-auto"
                                        >
                                            {generating ? (
                                                <>Generating Magic...</>
                                            ) : (
                                                <><Wand2 className="h-4 w-4 mr-2" /> Generate Draft</>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Live Preview Panel */}
                <div className="h-full">
                    <Card className="bg-[#111] border-[#333] h-full flex flex-col min-h-[600px]">
                        <CardHeader className="border-b border-[#222] flex flex-row items-center justify-between pb-4">
                            <CardTitle className="text-lg text-white flex items-center gap-2">
                                <FileSignature className="h-5 w-5 text-[#ffcc99]" />
                                Document Preview
                            </CardTitle>
                            {previewReady && (
                                <Button className="h-8 px-3 py-1 text-sm bg-white text-black hover:bg-gray-200">
                                    <Download className="h-4 w-4 mr-2" /> Download PDF
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent className="flex-1 p-6 flex flex-col items-center justify-center bg-[#0a0a0a] rounded-b-xl overflow-hidden relative">

                            {!previewReady && !generating ? (
                                <div className="text-center space-y-4">
                                    <FileText className="h-16 w-16 text-[#333] mx-auto" />
                                    <p className="text-[#888] max-w-xs mx-auto text-sm">Fill out the template variables and click generate to see the drafted preview here.</p>
                                </div>
                            ) : generating ? (
                                <div className="text-center space-y-4 animate-pulse">
                                    <Wand2 className="h-12 w-12 text-[#ffcc99] mx-auto animate-spin-slow" />
                                    <p className="text-[#ffcc99] text-sm font-medium">Drafting the legal language...</p>
                                </div>
                            ) : (
                                <div className="w-full h-full bg-white rounded shadow-lg p-8 relative overflow-y-auto max-h-[500px] animate-in zoom-in-95 duration-500 text-black">
                                    <div className="absolute top-4 right-4 print:hidden">
                                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                                    </div>

                                    {/* Mock legal document styling */}
                                    <div className="font-serif space-y-6 text-sm">
                                        <div className="text-center font-bold uppercase underline underline-offset-4">
                                            IN THE COURT OF {formData.courtName || "[COURT NAME]"}
                                        </div>

                                        <div className="flex justify-between font-semibold mt-8">
                                            <div>IN RE:</div>
                                        </div>

                                        <div className="space-y-1 ml-8">
                                            <p className="uppercase font-bold">{formData.clientName || "[CLIENT NAME]"}</p>
                                            <p>...Applicant/Petitioner</p>
                                        </div>

                                        <div className="text-center font-bold italic my-4">VERSUS</div>

                                        <div className="space-y-1 ml-8">
                                            <p className="uppercase font-bold">{formData.opposingParty || "[OPPOSING PARTY]"}</p>
                                            <p>...Respondent/Defendant</p>
                                        </div>

                                        {docType === 'bail' && (
                                            <div className="mt-8 text-center font-bold underline underline-offset-4">
                                                APPLICATION U/S 439 CRPC FOR GRANT OF REGULAR BAIL IN FIR NO. {formData.firNo || "[X]"} P.S. {formData.policeStation || "[Y]"}
                                            </div>
                                        )}

                                        {docType === 'ni138' && (
                                            <div className="mt-8 text-center font-bold underline underline-offset-4">
                                                COMPLAINT UNDER SECTION 138 OF NEGOTIABLE INSTRUMENTS ACT IN RESPECT OF DISHONOUR OF CHEQUE NO. {formData.chequeNo || "[X]"} FOR RS. {formData.amount || "[Y]"}/-
                                            </div>
                                        )}

                                        <div className="mt-8 space-y-4 text-justify leading-relaxed">
                                            <p>MOST RESPECTFULLY SHOWETH:</p>
                                            <p>1. That the applicant/petitioner is a peace-loving citizen of India and has deep roots in society.</p>
                                            <p>2. That the present application is being filed enumerating the true and correct facts of the case avoiding all repetitions...</p>
                                            <hr className="my-8 border-dashed border-gray-300" />
                                            <p className="text-gray-400 italic text-center">Document truncated for preview.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
