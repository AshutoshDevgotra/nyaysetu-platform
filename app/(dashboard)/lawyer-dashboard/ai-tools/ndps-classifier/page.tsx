"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
    ArrowLeft,
    ShieldAlert,
    Scale,
    Biohazard,
    CheckCircle2,
    AlertTriangle,
    Lightbulb
} from "lucide-react";

export default function NDPSClassifierPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<{
        substance: string;
        quantity: string;
        category: "Small" | "Intermediate" | "Commercial";
        implications: string;
        bailProb: string;
    } | null>(null);

    const handleClassify = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setResult(null);

        // Mock AI classification
        setTimeout(() => {
            setIsProcessing(false);
            setResult({
                substance: "Heroin (Diacetylmorphine)",
                quantity: "20 Gms",
                category: "Intermediate",
                implications: "Exceeds the 'Small Quantity' threshold (5 gms) but is significantly below the 'Commercial Quantity' threshold (250 gms).",
                bailProb: "Section 37 rigors do not strictly apply. Bail is generally granted unless there are severe antecedents."
            });
        }, 1200);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" className="p-2 text-[#888] hover:text-white hover:bg-[#1a1a1a]" asChild>
                    <Link href="/lawyer-dashboard/ai-tools">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <ShieldAlert className="h-6 w-6 text-purple-400" />
                        NDPS Quantity Classifier
                    </h1>
                    <p className="text-[#888] text-sm">Determine statutory thresholds and bail implications instantly.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Input Form */}
                <Card className="bg-[#111] border-[#333]">
                    <CardHeader className="border-b border-[#222]">
                        <CardTitle className="text-lg text-white">Seizure Details</CardTitle>
                        <CardDescription className="text-[#888]">Enter the narcotic substance and exact recovered quantity.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleClassify} className="space-y-6">

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ccc]">Narcotic Substance / Psychotropic Substance *</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Heroin, Cocaine, Charas, Ganja, Tramadol..."
                                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400 transition-colors"
                                    required
                                    defaultValue="Heroin"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ccc]">Recovered Quantity *</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="Value (e.g. 20)"
                                        className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400 transition-colors"
                                        required
                                        defaultValue="20"
                                    />
                                    <select className="bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400">
                                        <option value="gm">Gms</option>
                                        <option value="kg">Kgs</option>
                                        <option value="mg">Mgs</option>
                                    </select>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500 hover:text-white font-semibold transition-all py-6 mt-4"
                            >
                                {isProcessing ? "Classifying Matrix..." : (
                                    <><Biohazard className="h-5 w-5 mr-2" /> Classify Quantity</>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Intelligence Panel */}
                <div className="space-y-6">
                    <Card className={`bg-[#111] border-[#333] h-full transition-all duration-500 ${result ? 'border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.05)]' : ''}`}>
                        <CardHeader className="border-b border-[#222]">
                            <CardTitle className="text-lg text-white">Statutory Intelligence</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 h-[calc(100%-70px)] flex flex-col justify-center">

                            {!result && !isProcessing && (
                                <div className="text-center opacity-50 space-y-4 pb-12">
                                    <Scale className="h-16 w-16 text-[#333] mx-auto" />
                                    <p className="text-[#888]">Results defining bail rigor will appear here.</p>
                                </div>
                            )}

                            {isProcessing && (
                                <div className="text-center space-y-4 pb-12">
                                    <Biohazard className="h-12 w-12 text-purple-400 mx-auto animate-pulse" />
                                    <p className="text-purple-400/80 font-medium">Querying NDPS Schedule Thresholds...</p>
                                </div>
                            )}

                            {result && (
                                <div className="space-y-6 animate-in zoom-in-95 duration-500">

                                    <div className={`text-center p-6 rounded-xl border relative overflow-hidden ${result.category === 'Commercial' ? 'bg-red-500/10 border-red-500/30' :
                                            result.category === 'Intermediate' ? 'bg-amber-500/10 border-amber-500/30' :
                                                'bg-green-500/10 border-green-500/30'
                                        }`}>
                                        <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${result.category === 'Commercial' ? 'text-red-400' :
                                                result.category === 'Intermediate' ? 'text-amber-400' :
                                                    'text-green-400'
                                            }`}>
                                            Official Classification
                                        </p>
                                        <h2 className={`text-3xl font-black tracking-tight ${result.category === 'Commercial' ? 'text-red-500' :
                                                result.category === 'Intermediate' ? 'text-amber-500' :
                                                    'text-green-500'
                                            }`}>
                                            {result.category} Quantity
                                        </h2>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="flex gap-3">
                                            <ShieldAlert className="h-5 w-5 text-[#888] shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="text-sm font-semibold text-white mb-1">Legal Implications</h4>
                                                <p className="text-sm text-[#ccc] leading-relaxed">{result.implications}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 bg-[#1a1a1a] p-4 rounded-lg border border-[#333]">
                                            <Lightbulb className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="text-sm font-semibold text-purple-400 mb-1">Bail Probability Analysis</h4>
                                                <p className="text-sm text-white leading-relaxed">{result.bailProb}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 flex gap-3">
                                        <Button className="flex-1 bg-white text-black hover:bg-gray-200" disabled>
                                            <CheckCircle2 className="h-4 w-4 mr-2" /> Verified by DB
                                        </Button>
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
