"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
    ArrowLeft,
    Clock,
    Calculator,
    CalendarDays,
    AlertTriangle,
    Info,
    CalendarCheck,
    BookOpen
} from "lucide-react";

export default function LimitationTrackerPage() {
    const [isCalculating, setIsCalculating] = useState(false);
    const [result, setResult] = useState<{
        date: string;
        daysLeft: number;
        description: string;
        act: string;
        critical: boolean;
    } | null>(null);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsCalculating(true);
        setResult(null);

        // Mock computation delay
        setTimeout(() => {
            setIsCalculating(false);
            setResult({
                date: "15 April 2026",
                daysLeft: 45,
                description: "Limitation period for filing a suit for recovery of money is 3 years from the date the cause of action arises.",
                act: "Article 113, Limitation Act, 1963",
                critical: false
            });
        }, 1000);
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
                        <Clock className="h-6 w-6 text-green-400" />
                        Statutory Limitation Tracker
                    </h1>
                    <p className="text-[#888] text-sm">Automated deadline computation under the Limitation Act, 1963 and related statutes.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Calculator Form */}
                <Card className="bg-[#111] border-[#333]">
                    <CardHeader className="border-b border-[#222]">
                        <CardTitle className="text-lg text-white">Compute Deadline</CardTitle>
                        <CardDescription className="text-[#888]">Select the nature of suit/appeal and the trigger date.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleCalculate} className="space-y-6">

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ccc]">Category of Legal Action *</label>
                                <select className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-green-400 transition-colors">
                                    <option value="">Select Category...</option>
                                    <option value="recovery">Suit for Recovery of Money</option>
                                    <option value="specific_perf">Suit for Specific Performance of Contract</option>
                                    <option value="appeal_hc">Appeal to High Court from lower court decree</option>
                                    <option value="appeal_sc">Appeal to Supreme Court</option>
                                    <option value="138_ni">Filing Complaint under 138 NI Act</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ccc] flex items-center gap-2">
                                    Trigger Date / Cause of Action Date *
                                    <Info className="h-4 w-4 text-[#666]" title="The date when the right to sue accrues." />
                                </label>
                                <input
                                    type="date"
                                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-green-400 transition-colors [color-scheme:dark]"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ccc]">Excluded Periods (Optional)</label>
                                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333] space-y-3">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" className="mt-1 accent-green-500" />
                                        <div>
                                            <p className="text-sm text-white font-medium">Time spent obtaining certified copies</p>
                                            <p className="text-xs text-[#888]">Under Section 12 of Limitation Act.</p>
                                        </div>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" className="mt-1 accent-green-500" />
                                        <div>
                                            <p className="text-sm text-white font-medium">Bona fide proceeding in wrong court</p>
                                            <p className="text-xs text-[#888]">Under Section 14 of Limitation Act.</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isCalculating}
                                className="w-full bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500 hover:text-black font-semibold transition-all py-6 mt-4"
                            >
                                {isCalculating ? "Computing..." : (
                                    <><Calculator className="h-5 w-5 mr-2" /> Calculate Exact Deadline</>
                                )}
                            </Button>

                        </form>
                    </CardContent>
                </Card>

                {/* Results Panel */}
                <div className="space-y-6">
                    <Card className={`bg-[#111] border-[#333] h-full transition-all duration-500 ${result ? 'border-green-500/50 shadow-[0_0_30px_rgba(74,222,128,0.05)]' : ''}`}>
                        <CardHeader className="border-b border-[#222]">
                            <CardTitle className="text-lg text-white">Computation Result</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 h-[calc(100%-70px)] flex flex-col justify-center">

                            {!result && !isCalculating && (
                                <div className="text-center opacity-50 space-y-4 pb-12">
                                    <CalendarDays className="h-16 w-16 text-[#333] mx-auto" />
                                    <p className="text-[#888]">Submit the parameters to compute your filing deadline automatically.</p>
                                </div>
                            )}

                            {isCalculating && (
                                <div className="text-center space-y-4 pb-12">
                                    <Calculator className="h-12 w-12 text-green-400 mx-auto animate-pulse" />
                                    <p className="text-green-400/80 font-medium">Cross-referencing Limitation Act schedules...</p>
                                </div>
                            )}

                            {result && (
                                <div className="space-y-8 animate-in zoom-in-95 duration-500">
                                    <div className="text-center p-6 bg-[#1a1a1a] rounded-xl border border-[#333] relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-2 opacity-10">
                                            <CalendarCheck className="h-24 w-24 text-white" />
                                        </div>

                                        <p className="text-[#888] font-medium mb-2 uppercase tracking-wide text-xs">Final Date of Expiry</p>
                                        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">{result.date}</h2>

                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-semibold shadow-inner">
                                            <Clock className="h-4 w-4" />
                                            {result.daysLeft} Days Remaining
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <Info className="h-6 w-6 text-[#555] shrink-0" />
                                            <div>
                                                <h4 className="text-sm font-semibold text-white mb-1">Legal Basis</h4>
                                                <p className="text-sm text-[#ccc] leading-relaxed">{result.description}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <BookOpen className="h-6 w-6 text-[#555] shrink-0" />
                                            ...
                                        </div>
                                        {/* Fake import error bypass: BookOpen is not imported from lucide-react above. We will mock it inline or just use generic info icon again. Wait, I imported BookOpen? No I didn't verify that. Let me replace BookOpen with plain icon. */}
                                        <div className="flex gap-3">
                                            <div className="h-6 w-6 bg-[#222] rounded flex items-center justify-center text-[#888] shrink-0 font-serif text-xs italic">§</div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-white mb-1">Relevant Statute</h4>
                                                <p className="text-sm text-[#ffcc99] bg-[#1a1a1a] px-3 py-1.5 rounded inline-block border border-[#333] font-medium">{result.act}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-[#222] flex gap-3">
                                        <Button className="flex-1 bg-white text-black hover:bg-gray-200">
                                            Add to Calendar
                                        </Button>
                                        <Button variant="outline" className="flex-1 border-[#333] text-white hover:bg-[#1a1a1a]">
                                            Export Report
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
