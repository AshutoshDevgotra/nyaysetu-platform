"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
    ArrowLeft,
    UploadCloud,
    FileSearch,
    Type,
    Search,
    AlertTriangle,
    CheckCircle2,
    BookOpen,
    Bot
} from "lucide-react";

export default function FIRAnalyzerPage() {
    const [activeTab, setActiveTab] = useState<"upload" | "text">("upload");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [hasResults, setHasResults] = useState(false);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setHasResults(false);
        setTimeout(() => {
            setIsAnalyzing(false);
            setHasResults(true);
        }, 2500);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" asChild className="p-2 text-[#888] hover:text-white hover:bg-[#1a1a1a]">
                        <Link href="/lawyer-dashboard/ai-tools">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <FileSearch className="h-6 w-6 text-blue-400" />
                            FIR Intelligence Analyzer
                        </h1>
                        <p className="text-[#888] text-sm">Automated extraction of penal codes and incident mapping.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Input Source */}
                <div className="space-y-6 flex flex-col h-full">
                    <Card className="bg-[#111] border-[#333] flex-1">
                        <CardHeader className="border-b border-[#222] pb-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg text-white">Input Document</CardTitle>
                                <div className="bg-[#1a1a1a] rounded-lg p-1 border border-[#333] flex">
                                    <button
                                        onClick={() => setActiveTab("upload")}
                                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${activeTab === 'upload' ? 'bg-[#333] text-white shadow-sm' : 'text-[#888] hover:text-[#ccc]'}`}
                                    >
                                        <UploadCloud className="h-4 w-4" /> PDF/Image
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("text")}
                                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${activeTab === 'text' ? 'bg-[#333] text-white shadow-sm' : 'text-[#888] hover:text-[#ccc]'}`}
                                    >
                                        <Type className="h-4 w-4" /> Raw Text
                                    </button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 h-[400px] flex flex-col justify-center">
                            {activeTab === 'upload' ? (
                                <div className="border-2 border-dashed border-[#333] hover:border-[#ffcc99] bg-[#0a0a0a] rounded-xl h-full flex flex-col items-center justify-center p-8 text-center transition-colors group cursor-pointer">
                                    <div className="p-4 bg-[#1a1a1a] rounded-full mb-4 group-hover:scale-110 transition-transform shadow-inner">
                                        <UploadCloud className="h-8 w-8 text-[#666] group-hover:text-[#ffcc99]" />
                                    </div>
                                    <p className="text-white font-medium mb-1 group-hover:text-[#ffcc99] transition-colors">Click to browse or drag PDF here</p>
                                    <p className="text-sm text-[#888] max-w-xs">Supports scanned FIR copies in English, Hindi, and Punjabi (via OCR).</p>
                                </div>
                            ) : (
                                <textarea
                                    placeholder="Paste the raw FIR text or translated transcript here for analysis..."
                                    className="w-full h-full bg-[#0a0a0a] border border-[#333] rounded-xl p-4 text-[#ccc] focus:outline-none focus:border-[#ffcc99] resize-none leading-relaxed transition-colors"
                                ></textarea>
                            )}
                        </CardContent>
                    </Card>

                    <Button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="w-full py-6 text-lg bg-[#1a1a1a] border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 font-semibold transition-all group"
                    >
                        {isAnalyzing ? (
                            <span className="flex items-center gap-3">
                                <Search className="h-5 w-5 animate-spin" />
                                Processing Document Structure...
                            </span>
                        ) : (
                            <span className="flex items-center gap-3">
                                <FileSearch className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                Run Intelligence Analysis
                            </span>
                        )}
                    </Button>
                </div>

                {/* Right Column: AI Results Panel */}
                <div className="h-full">
                    <Card className="bg-[#111] border-[#333] h-full flex flex-col min-h-[500px]">
                        <CardHeader className="border-b border-[#222] pb-4">
                            <CardTitle className="text-lg text-white">Extraction Results</CardTitle>
                            <CardDescription className="text-[#888]">AI-detected parameters will populate here post analysis.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 overflow-y-auto">
                            {!hasResults && !isAnalyzing ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-50">
                                    <Bot className="h-16 w-16 text-[#333]" />
                                    <p className="text-[#888]">Awaiting input sequence for processing.</p>
                                </div>
                            ) : isAnalyzing ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 border-t-2 border-blue-400 rounded-full animate-spin"></div>
                                        <div className="h-20 w-20 border-2 border-[#333] rounded-full"></div>
                                        <Bot className="h-8 w-8 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-blue-400 font-medium">Extracting Penal Codes...</p>
                                        <p className="text-[#666] text-sm">Identifying complainant and accused matrices</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 space-y-8 animate-in slide-in-from-bottom-4 duration-500">

                                    {/* Entity Summary */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333]">
                                            <p className="text-xs text-[#888] mb-1 font-medium">INCIDENT DATE</p>
                                            <p className="text-white font-semibold">12-August-2023</p>
                                            <p className="text-xs text-[#666]">21:45 Hours</p>
                                        </div>
                                        <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333]">
                                            <p className="text-xs text-[#888] mb-1 font-medium">POLICE STATION</p>
                                            <p className="text-white font-semibold">PS Vasant Kunj (South)</p>
                                            <p className="text-xs text-[#666]">New Delhi</p>
                                        </div>
                                    </div>

                                    {/* Detected Penal Codes */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold text-[#888] flex items-center gap-2">
                                            <BookOpen className="h-4 w-4" />
                                            INVOKED BNS/IPC SECTIONS
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="text-red-400 font-bold">Section 115(2) BNS</h4>
                                                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-semibold">Non-Bailable</span>
                                                </div>
                                                <p className="text-sm text-[#ccc] leading-relaxed">Voluntarily causing hurt. Replaces Section 323 of IPC.</p>
                                                <div className="mt-3 pt-3 border-t border-red-500/20 flex items-center gap-2 text-xs text-[#aaa]">
                                                    <AlertTriangle className="h-3 w-3 text-red-400" /> Max punishment: 1 year imprisonment or 10,000 INR fine.
                                                </div>
                                            </div>

                                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="text-amber-400 font-bold">Section 351(2) BNS</h4>
                                                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-semibold">Bailable</span>
                                                </div>
                                                <p className="text-sm text-[#ccc] leading-relaxed">Criminal Intimidation. Replaces Section 506 of IPC.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Identified Parties */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold text-[#888]">INVOLVED PARTIES</h3>
                                        <div className="border border-[#333] rounded-lg divide-y divide-[#222]">
                                            <div className="p-4 flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-[#888] mb-0.5">Complainant / Victim</p>
                                                    <p className="text-sm font-medium text-white">Shri Mukesh Verma</p>
                                                </div>
                                                <CheckCircle2 className="h-5 w-5 text-green-500/50" />
                                            </div>
                                            <div className="p-4 flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-[#888] mb-0.5">Accused 1</p>
                                                    <p className="text-sm font-medium text-white">Rahul (alias Rinku)</p>
                                                </div>
                                                <AlertTriangle className="h-5 w-5 text-amber-500/50" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <Button className="flex-1 bg-white text-black hover:bg-gray-200">
                                            Save to Case File
                                        </Button>
                                        <Button variant="outline" className="flex-1 border-[#333] text-white hover:bg-[#1a1a1a]">
                                            Export PDF Report
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
